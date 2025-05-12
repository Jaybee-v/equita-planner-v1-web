"use server";
import { fetcher } from "@/features/auth/utils/fetcher";

const riderDeleteApply = async (participantId: string) => {
  const request = await fetcher(
    `/activity-participant/rider/${participantId}`,
    {
      method: "DELETE",
    }
  );
  const response:
    | {
        success: boolean;
        message: string;
      }
    | { error: string } = request;
  return response;
};

export default riderDeleteApply;
