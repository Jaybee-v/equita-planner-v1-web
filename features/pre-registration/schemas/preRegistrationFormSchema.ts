import { z } from "zod";

export const preRegistrationFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Ceci n'est pas une adresse email valide" }),
});
