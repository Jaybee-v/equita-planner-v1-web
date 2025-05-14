"use server";

import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";

export const findByStableIdAndThreeDays = async (
  stableId: string,
  date: Date
) => {
  const response = await fetcher(
    `/activities/stable/${stableId}/three-days/${date.toISOString()}`,
    {
      method: "GET",
    }
  );

  return response as Activity[] | { error: string };
};
