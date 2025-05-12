import { Gender } from "@/enums/Gender";
import { z } from "zod";
export const instructorFormSchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(1),
  gender: z.nativeEnum(Gender),
  familyName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  stableId: z.string().optional(),
  isIndependent: z.boolean().optional(),
  color: z.string().optional(),
});

export type InstructorFormSchema = z.infer<typeof instructorFormSchema>;
