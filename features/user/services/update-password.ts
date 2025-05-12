"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import { z } from "zod";
import updatePasswordSchema from "../schema/updatePasswordSchema";

const updatePassword = async (data: z.infer<typeof updatePasswordSchema>) => {
  const { password, userId } = data;

  const validatedData = updatePasswordSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Les mots de passe ne correspondent pas" };
  }

  const response: { message: string } | { error: string } = await fetcher(
    "/auth/update-password",
    {
      method: "PUT",
      body: JSON.stringify({ password, userId }),
    }
  );

  return response;
};

export default updatePassword;
