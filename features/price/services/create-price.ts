"use server";

import { fetcher } from "@/features/auth/utils/fetcher";
import Price from "@/types/Price";
import { z } from "zod";
import createPriceFormSchema from "../schemas/createPriceFormSchema";

const createPrice = async (values: z.infer<typeof createPriceFormSchema>) => {
  const { label, description, price, stableId } = values;
  const response:
    | { message: string; status: number; data: Price }
    | { error: string } = await fetcher("/prices", {
    method: "POST",
    body: JSON.stringify({
      label,
      description,
      price: parseInt(price),
      stableId,
    }),
  });

  return response;
};

export default createPrice;
