"use server";

import { fetcher } from "@/features/auth/utils/fetcher";

const postPreRegistration = async (email: string) => {
  try {
    const response = await fetcher("/pre-registration", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    console.log("RESPONSE ===", response);

    return response;
  } catch (error) {
    console.error("Erreur lors de la requête POST:", error);
    throw error;
  }
};

export default postPreRegistration;
