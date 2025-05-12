import { RiderLevel } from "@/enums/RiderLevel";
import { z } from "zod";

export const filterFormSchema = z.object({
  stableId: z.string(),
  search: z.string().optional(),
  date: z.string(),
  requiredLevel: z.nativeEnum(RiderLevel).optional(),
});
