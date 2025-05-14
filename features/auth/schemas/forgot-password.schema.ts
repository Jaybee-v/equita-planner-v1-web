import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
});

export default forgotPasswordSchema;
