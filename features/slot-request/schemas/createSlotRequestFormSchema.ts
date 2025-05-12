import { z } from "zod";

const createSlotRequestFormSchema = z.object({
  stableId: z.string(),
  riderId: z.string(),
  message: z.string().optional(),
  preferredStartDate: z.date(),
  preferredEndDate: z.date(),
});

export default createSlotRequestFormSchema;
