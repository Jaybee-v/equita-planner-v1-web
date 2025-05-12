"use server";
import { Status } from "@/enums/Status";
import { fetcher } from "@/features/auth/utils/fetcher";

const updateAffiliationStatus = async (id: string, status: Status) => {
  const response = await fetcher(`/affiliation-requests/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  return response as { status: boolean; message: string } | { error: string };
};

export default updateAffiliationStatus;
