"use server";
import { fetcher } from "@/features/auth/utils/fetcher";

export const deleteImage = async (imageUrl: string, stableId: string) => {
  const response = await fetcher("/stables/delete-image", {
    method: "DELETE",
    body: JSON.stringify({ imageUrl, stableId }),
  });

  return response;
};
