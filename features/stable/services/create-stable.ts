"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Stable from "@/types/Stable";
import { z } from "zod";
import stableFormSchema from "../schemas/stableSchema";

const createStable = async (data: z.infer<typeof stableFormSchema>) => {
  const validatedFields = stableFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Les champs sont invalides" };
  }

  const request = await fetcher("/stables", {
    method: "POST",
    body: JSON.stringify({ ...data, numStreet: parseInt(data.numStreet) }),
  });

  const response: Stable | { error: string } = request;

  return response;
};

export default createStable;
