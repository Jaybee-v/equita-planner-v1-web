"use server";
import { fetcher } from "@/features/auth/utils/fetcher";

const updateNotificationStatus = async (id: string) => {
  const request = await fetcher(`/notifications/${id}/read`, {
    method: "PUT",
  });
  return request as { success: boolean; message: string };
};

export default updateNotificationStatus;
