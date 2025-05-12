"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import ActivityParticipant from "@/types/ActivityParticipant";

const findRiderActivities = async (riderId: string) => {
  const request = await fetcher(`/activity-participant/rider/${riderId}`, {
    method: "GET",
  });

  const response:
    | {
        waiting: ActivityParticipant[];
        validated: ActivityParticipant[];
        past: ActivityParticipant[];
      }
    | { error: string } = request;

  return response;
};

export default findRiderActivities;
