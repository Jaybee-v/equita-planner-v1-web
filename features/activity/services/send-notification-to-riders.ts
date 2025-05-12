"use server";
import { SelectRiderLevelRequestForNotification } from "@/enums/SelectRiderLevelRequest";
import { fetcher } from "@/features/auth/utils/fetcher";

const sendNotificationToRiders = async (data: {
  activityId: string;
  stableId: string;
  riderLevel: SelectRiderLevelRequestForNotification;
}) => {
  const request = await fetcher(`/activities/stable/send-notification`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = request;
  return response;
};

export default sendNotificationToRiders;
