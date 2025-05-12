"use server";
import { Status } from "@/enums/Status";
import { fetcher } from "@/features/auth/utils/fetcher";

const updateSlotRequestStatus = async (params: {
  slotRequestId: string;
  status: Status;
}) => {
  const response: { message: string } | { error: string } = await fetcher(
    `/slot-request/${params.slotRequestId}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status: params.status }),
    }
  );

  return response;
};

export default updateSlotRequestStatus;
