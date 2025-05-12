"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";
import { z } from "zod";
import { filterFormSchema } from "../schema/filterFormSchema";

const findActivitiesByWeekWithFilters = async (
  data: z.infer<typeof filterFormSchema>
) => {
  console.log(data);
  const request = await fetcher("/activities/stable/rider", {
    method: "POST",
    body: JSON.stringify({ ...data, date: new Date(data.date) }),
  });

  const response: Activity[] | { error: string } = request;
  return response;
};

export default findActivitiesByWeekWithFilters;
