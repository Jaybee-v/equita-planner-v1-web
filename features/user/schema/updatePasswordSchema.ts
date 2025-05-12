import { z } from "zod";

const updatePasswordSchema = z
  .object({
    userId: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export default updatePasswordSchema;
