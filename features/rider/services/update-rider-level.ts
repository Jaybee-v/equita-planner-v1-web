import { RiderLevel, riderLevelOrder } from "@/enums/RiderLevel";
import { fetcher } from "@/features/auth/utils/fetcher";

const updateRiderLevel = async (params: {
  riderId: string;
  level: RiderLevel;
  riderLevel: RiderLevel;
}) => {
  const { riderId, level, riderLevel } = params;

  if (riderLevelOrder.indexOf(level) < riderLevelOrder.indexOf(riderLevel)) {
    throw new Error("Vous ne pouvez pas valider un galop inférieur");
  }

  const response: { message: string; status: number } | { error: string } =
    await fetcher(`/riders/${riderId}/level`, {
      method: "PATCH",
      body: JSON.stringify({
        level,
      }),
    });

  return response;
};

export default updateRiderLevel;
