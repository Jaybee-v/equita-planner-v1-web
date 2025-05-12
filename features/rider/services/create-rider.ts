"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Rider from "@/types/Rider";
import { z } from "zod";
import riderFormSchema from "../schemas/riderFormSchema";

const createRider = async (data: z.infer<typeof riderFormSchema>) => {
  const validatedFields = riderFormSchema.safeParse(data);
  if (!validatedFields.success) throw new Error("Invalid fields");

  const request = await fetcher("/riders", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const response: Rider | { error: string } = request;

  return response;
};

export default createRider;
