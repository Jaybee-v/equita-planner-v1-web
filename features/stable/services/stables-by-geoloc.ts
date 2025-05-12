"use server";

import { fetcher } from "@/features/auth/utils/fetcher";

const findStablesByCoordinates = async (coordinates: [number, number]) => {
  const response = await fetcher(
    `/stables/by-geoloc?latitude=${coordinates[0]}&longitude=${coordinates[1]}`,
    {}
  );

  return response;
};

export default findStablesByCoordinates;
