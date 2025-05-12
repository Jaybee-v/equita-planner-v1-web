"use server";

import { getRefreshToken, getToken, logout } from "@/lib/cookies";

export async function fetcher(url: string, options: RequestInit) {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  console.log(options.body);
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(process.env.BACKEND_URL + url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(
      process.env.BACKEND_URL + "/auth/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (refreshResponse.ok) {
      const { token: newToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();
      await fetch(process.env.APP_URL + "/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({
          token: newToken,
          refreshToken: newRefreshToken,
        }),
      });

      const newResponse = await fetch(process.env.BACKEND_URL + url, {
        ...options,
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${newToken}`,
        },
      });
      if (!newResponse.ok) {
        const errorResponse: { error: string } = await newResponse.json();
        console.log("errorResponse", errorResponse);
        await logout();
        throw new Error(errorResponse.error || "Une erreur est survenue");
      }
      return newResponse.json();
    }
  }

  if (!response.ok) {
    const errorResponse: { error: string; message?: string } =
      await response.json();
    console.log("ICI ERROR ?", errorResponse);
    if (errorResponse.message) {
      return { error: errorResponse.message };
    }
    throw new Error(errorResponse.error || "Une erreur est survenue");
  }

  return response.json();
}
