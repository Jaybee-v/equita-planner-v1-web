"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Notification from "@/types/Notification";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";

const getNotificationById = async (id: string) => {
  const request = await fetcher(`/notifications/${id}`, {});
  return request as {
    notification: Notification;
    rider: Rider | null;
    stable: Stable | null;
  };
};

export default getNotificationById;
