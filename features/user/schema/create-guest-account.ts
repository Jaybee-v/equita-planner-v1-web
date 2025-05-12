import { UserRole } from "@/enums/UserRole";
import { z } from "zod";

const createGuestAccountSchema = z.object({
  role: z.nativeEnum(UserRole).nullable(),
});

export default createGuestAccountSchema;
