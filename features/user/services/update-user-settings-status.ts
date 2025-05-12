"use server";

import { fetcher } from "@/features/auth/utils/fetcher";

const updateUserSettingsStatus = async (
  id: string,
  type: "allstableNotifications" | "emailNotifications"
) => {
  const request = await fetcher(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      type,
      id,
    }),
  });
  const response:
    | {
        message: string;
      }
    | { error: string } = request;
  if ("error" in response) {
    throw new Error(response.error);
  }
  return response.message;
};

export default updateUserSettingsStatus;
