"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";
import { z } from "zod";
import createActivityFormSchema from "../schema/createActivityFormSchema";

const createActivity = async (
  data: z.infer<typeof createActivityFormSchema>
) => {
  const {
    stableId,
    title,
    description,
    date,
    startDate,
    endDate,
    type,
    visibility,
    requiredLevel,
    maxParticipants,
    validationParticipantOption,
    openToMoreLevel,
    instructorId,
  } = data;

  const _data = {
    stableId,
    title,
    description,
    date: new Date(date),
    startDate: new Date(date + "T" + startDate),
    endDate: new Date(date + "T" + endDate),
    type,
    visibility,
    requiredLevel,
    maxParticipants,
    validationParticipantOption,
    openToMoreLevel,
    instructorId,
  };

  console.log(_data);

  const request = await fetcher("/activities", {
    method: "POST",
    body: JSON.stringify(_data),
  });
  console.log(request);

  const response = {
    message: "Activité créée avec succès",
    success: true,
    activity: request,
  };

  return response as
    | { message: string; success: boolean; activity: Activity }
    | { error: string };
};

export default createActivity;
