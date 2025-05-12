import { UserRole } from "@/enums/UserRole";
import { z } from "zod";

const userFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole).nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export default userFormSchema;
