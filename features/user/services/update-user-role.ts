"use server";

import { UserRole } from "@/enums/UserRole";
import { fetcher } from "@/features/auth/utils/fetcher";

const updateUserRole = async (params: { userId: string; role: UserRole }) => {
  const { userId, role } = params;

  const response: { message: string; status: number } | { error: string } =
    await fetcher(`/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({
        role,
      }),
    });

  return response;
};

export default updateUserRole;
