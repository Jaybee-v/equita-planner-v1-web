import { z } from "zod";

export const accountSettingsSchema = z.object({
  userId: z.string(),
  allStableNotifications: z.boolean(),
  emailNotifications: z.boolean(),
});
