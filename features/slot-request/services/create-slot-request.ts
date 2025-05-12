"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import SlotRequest from "@/types/SlotRequest";

const createSlotRequest = async (data: {
  stableId: string;
  riderId: string;
  preferredStartDate: Date;
  preferredEndDate: Date;
  message: string;
}) => {
  console.log(data);
  // const validatedFields = createSlotRequestFormSchema.safeParse(data);

  // console.log(validatedFields);
  // if (!validatedFields.success) {
  // return { error: "Invalid fields" };
  // }

  const response: SlotRequest | { error: string } = await fetcher(
    "/slot-request",
    {
      method: "POST",
      body: JSON.stringify({
        ...data,
        preferredStartDate: new Date(data.preferredStartDate),
        preferredEndDate: new Date(data.preferredEndDate),
      }),
    }
  );

  return response;
};

export default createSlotRequest;
