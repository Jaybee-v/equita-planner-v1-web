"use server";
import { fetcher } from "@/features/auth/utils/fetcher";

const applyActivity = async (data: { activityId: string; riderId: string }) => {
  const { activityId, riderId } = data;
  if (!activityId) {
    return { error: "Nous ne trouvons pas cette activité" };
  }

  if (!riderId) {
    return {
      error: "Vous devez être connecté pour vous inscrire à une activité",
    };
  }

  const request = await fetcher("/activity-participant", {
    method: "POST",
    body: JSON.stringify({
      activityId,
      riderId,
    }),
  });

  return request;
};

export default applyActivity;
