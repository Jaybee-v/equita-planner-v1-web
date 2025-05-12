"use server";

import { fetcher } from "@/features/auth/utils/fetcher";
import Rider from "@/types/Rider";

const findRiderById = async (id: string) => {
  const response: Rider | { error: string } = await fetcher(
    `/riders/${id}`,
    {}
  );

  return response;
};

export default findRiderById;
