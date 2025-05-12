"use server";
import { NotificationType } from "@/enums/NotificationType";
import { fetcher } from "@/features/auth/utils/fetcher";
import Notification from "@/types/Notification";

const findNotificationsByUserId = async (data: {
  page: number;
  limit: number;
  type: NotificationType | "";
}) => {
  const { page, limit, type } = data;
  const request = await fetcher(
    `/notifications/stable/all?page=${page}&limit=${limit}&type=${type}`,
    {
      method: "GET",
    }
  );
  const response:
    | {
        notifications: Notification[];
        totalCount: number;
      }
    | { error: string } = request;

  return response;
};

export default findNotificationsByUserId;
