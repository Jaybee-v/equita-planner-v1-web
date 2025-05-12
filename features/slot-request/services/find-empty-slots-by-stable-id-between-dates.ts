"use server";
import { fetcher } from "@/features/auth/utils/fetcher";

const findEmptySlotsByStableIdBetweenDates = async (params: {
  stableId: string;
  date: Date;
  period: "day" | "week" | "month";
}) => {
  const response: { start: Date; end: Date }[] | { error: string } =
    await fetcher(
      `/activities/stable/empty-slots/${
        params.stableId
      }?date=${params.date.toISOString()}&period=${params.period}`,
      {}
    );

  return response;
};

export default findEmptySlotsByStableIdBetweenDates;
