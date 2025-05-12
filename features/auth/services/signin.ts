"use server";

import { defineRefreshToken, defineTokenCookie } from "@/lib/cookies";
import { Instructor } from "@/types/Instructor";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { z } from "zod";
import signinSchema from "../schemas/signin.schema";

export async function signin(values: z.infer<typeof signinSchema>) {
  const validatedFields = signinSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const request = await fetch(process.env.BACKEND_URL + "/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!request.ok) {
    const jsonResponse = await request.json();
    return { error: jsonResponse.message };
  }

  const data: {
    token: string;
    refreshToken: string;
    user: User;
    rider: Rider | null;
    stable: Stable | null;
    instructor: Instructor | null;
  } = await request.json();

  await defineTokenCookie(data.token);
  await defineRefreshToken(data.refreshToken);

  return data;
}
