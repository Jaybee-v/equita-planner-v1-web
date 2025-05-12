"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import User from "@/types/User";
import { z } from "zod";
import userFormSchema from "../schema/userFormSchema";

const createUser = async (data: z.infer<typeof userFormSchema>) => {
  const validatedFields = userFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const request = await fetcher("/users", {
    method: "POST",
    body: JSON.stringify({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      role: validatedFields.data.role,
    }),
  });

  const response: User | { error: string } = request;

  return response;
};

export default createUser;
