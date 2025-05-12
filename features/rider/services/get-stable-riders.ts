"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import AffiliationRequest from "@/types/AffiliationRequest";

const getStableRiders = async (params: {
  stableId: string;
  page: number;
  limit: number;
}) => {
  const response = await fetcher(
    `/affiliation-requests/stable/${params.stableId}?page=${params.page}&limit=${params.limit}`,
    {}
  );
  const responseJson:
    | {
        message: string;
        success: boolean;
        data: {
          waiting: AffiliationRequest[];
          approved: AffiliationRequest[];
          total: number;
        };
      }
    | { error: string } = await response;

  return responseJson;
};

export default getStableRiders;
