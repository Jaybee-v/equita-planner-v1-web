"use server";
import { Period } from "@/enums/Period";
import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";

const getStableStats = async (stableId: string, period: Period) => {
  const response:
    | { affiliatedRiderCount: number; activites: Activity[] }
    | { error: string } = await fetcher(
    `/stables/stats/${stableId}?period=${period}`,
    {
      method: "GET",
    }
  );

  return response;
};

export default getStableStats;
