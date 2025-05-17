import { ActivityType } from "@/enums/ActivityType";
import { ActivityVisibility } from "@/enums/ActivityVisibility";
import { RiderLevel } from "@/enums/RiderLevel";
import { ValidationOption } from "@/enums/ValidationOption";
import { z } from "zod";

const createActivityFormSchema = z.object({
  stableId: z.string().min(1),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  type: z.nativeEnum(ActivityType),
  visibility: z.nativeEnum(ActivityVisibility),
  requiredLevel: z.nativeEnum(RiderLevel),
  maxParticipants: z.number().min(1),
  validationParticipantOption: z.nativeEnum(ValidationOption),
  openToMoreLevel: z.boolean(),
  instructorId: z.string().optional(),
  priceId: z.string({
    required_error: "Veuillez sélectionner un tarif",
  }),
});

export default createActivityFormSchema;
