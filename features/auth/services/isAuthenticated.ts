"use server";

import { Instructor } from "@/types/Instructor";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { fetcher } from "../utils/fetcher";

export async function isAuthenticated(): Promise<{
  user: User | null;
  rider: Rider | null;
  stable: Stable | null;
  instructor: Instructor | null;
}> {
  try {
    const checkAuth = await fetcher("/auth/me", {
      method: "GET",
    });
    console.log("checkAuth === ", checkAuth);
    return checkAuth as {
      user: User;
      rider: Rider | null;
      stable: Stable | null;
      instructor: Instructor | null;
    };
  } catch (error) {
    console.log(error);
    return { user: null, rider: null, stable: null, instructor: null };
  }
}
