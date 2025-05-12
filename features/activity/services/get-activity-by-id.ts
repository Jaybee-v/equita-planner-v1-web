"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";

const getActivityById = async (id: string) => {
  const request = await fetcher(`/activities/${id}`, {});

  return request as Activity | { error: string };
};

export default getActivityById;
