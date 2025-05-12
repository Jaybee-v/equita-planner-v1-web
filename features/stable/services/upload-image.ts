"use server";
import { getRefreshToken, getToken } from "@/lib/cookies";

export const uploadImage = async (formData: FormData) => {
  const token = await getToken();

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(
    process.env.BACKEND_URL + "/stables/upload-image",
    {
      method: "POST",
      body: formData,
      headers,
    }
  );
  if (response.status === 401) {
    const refreshToken = await getRefreshToken();

    const refreshTokenRequest = await fetch(
      `${process.env.BACKEND_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (refreshTokenRequest.ok) {
      console.log("On a reçu un nouveau token");

      const { token: newToken, refreshToken: newRefreshToken } =
        await refreshTokenRequest.json();
      await fetch(process.env.APP_URL + "/api/auth/set-token", {
        method: "POST",
        body: JSON.stringify({
          token: newToken,
          refreshToken: newRefreshToken,
        }),
      });

      const newResponse = await fetch(
        process.env.BACKEND_URL + "/stables/upload-image",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
      if (!newResponse.ok) {
        const errorData = await newResponse.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }
      const jsonResponse: { message: string; url: string } =
        await newResponse.json();
      return jsonResponse;
    }
  }
  if (!response.ok) {
    const errorResponse: { error: string } = await response.json();
    throw new Error(errorResponse.error || "Une erreur est survenue");
  }
  const jsonResponse: { message: string; url: string } = await response.json();
  return jsonResponse;
};
