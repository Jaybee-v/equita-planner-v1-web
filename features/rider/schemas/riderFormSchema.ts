import { Gender } from "@/enums/Gender";
import { RiderLevel } from "@/enums/RiderLevel";
import { z } from "zod";

const riderFormSchema = z.object({
  userId: z.string().min(1, { message: "Vous devez être connecté" }),
  name: z.string().min(1, { message: "Le nom est requis" }),
  familyName: z.string().min(1, { message: "Le nom de famille est requis" }),
  level: z.nativeEnum(RiderLevel),
  gender: z.nativeEnum(Gender),
});

export default riderFormSchema;
