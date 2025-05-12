"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const defineTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,

    maxAge: 60 * 60,
    path: "/",
  });
};

export const defineRefreshToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("refresh_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });
};

export const getToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
};

export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("refresh_token")?.value;
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

export const removeRefreshToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
};

export const logout = async () => {
  await removeToken();
  await removeRefreshToken();
  redirect("/");
};
