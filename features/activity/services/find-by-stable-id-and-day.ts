"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";

const findByStableIdAndDay = async (stableId: string, day: string) => {
  const request = await fetcher(`/activities/stable/${stableId}?day=${day}`, {
    method: "GET",
  });

  return request as Activity[];
};

export default findByStableIdAndDay;
