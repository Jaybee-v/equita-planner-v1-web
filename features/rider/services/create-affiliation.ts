"use server";
import { fetcher } from "@/features/auth/utils/fetcher";

const createAffiliation = async (data: {
  stableId: string;
  riderId: string;
}) => {
  console.log("DATA ===", data);
  const { stableId, riderId } = data;

  const request = await fetcher("/affiliation-requests", {
    method: "POST",
    body: JSON.stringify({
      stableId,
      riderId,
    }),
  });

  return request as { message: string; success: boolean } | { error: string };
};

export default createAffiliation;
