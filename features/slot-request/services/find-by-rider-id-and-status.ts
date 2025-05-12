import { Status } from "@/enums/Status";
import { fetcher } from "@/features/auth/utils/fetcher";
import SlotRequest from "@/types/SlotRequest";

const findSlotsRequestByRiderIdAndStatus = async (params: {
  riderId: string;
  status: Status;
  page: number;
}) => {
  const response:
    | {
        slotRequests: SlotRequest[];
        count: number;
      }
    | { error: string } = await fetcher(
    `/slot-request/rider/${params.riderId}/status/${params.status}?page=${params.page}`,
    {}
  );

  return response;
};

export default findSlotsRequestByRiderIdAndStatus;
