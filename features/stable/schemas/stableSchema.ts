import { z } from "zod";

const stableFormSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  numStreet: z.string().min(1),
  street: z.string().min(1),
  zip: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  website: z.string().optional(),
});

export default stableFormSchema;
