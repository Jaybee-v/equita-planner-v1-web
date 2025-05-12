// app/api/auth/set-token/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { token, refreshToken } = body;
  console.log("BODY === ", body);

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ success: true });
}
