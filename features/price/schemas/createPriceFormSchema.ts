import { z } from "zod";

const createPriceFormSchema = z.object({
  label: z.string().min(1, {
    message: "Vous devez nommer votre tarif",
  }),
  price: z.string().min(1, {
    message: "Vous devez entrer un prix supérieur à 0",
  }),
  description: z.string().optional(),
  stableId: z.string().min(1, {
    message: "Vous n'êtes pas identifié ?",
  }),
});

export default createPriceFormSchema;
