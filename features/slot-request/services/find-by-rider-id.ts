import { fetcher } from "@/features/auth/utils/fetcher";
import SlotRequest from "@/types/SlotRequest";

const findSlotsRequestByRiderId = async (riderId: string) => {
  const response:
    | {
        pendingRequest: { slotRequests: SlotRequest[]; count: number };
        approvedRequest: { slotRequests: SlotRequest[]; count: number };
        rejectedRequest: { slotRequests: SlotRequest[]; count: number };
      }
    | { error: string } = await fetcher(`/slot-request/rider/${riderId}`, {});

  return response;
};

export default findSlotsRequestByRiderId;
