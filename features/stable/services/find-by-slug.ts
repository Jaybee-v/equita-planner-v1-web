"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Stable from "@/types/Stable";

const findStableBySlug = async (params: { slug: string; id: string }) => {
  const response: Stable | { error: string } = await fetcher(
    `/stables/by-slug/${params.slug}?id=${params.id}`,
    {}
  );
  return response;
};

export default findStableBySlug;
