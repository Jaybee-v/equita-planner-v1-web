"use client";

import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  user: User | null;
  rider: Rider | null;
  stable: Stable | null;
}>({ user: null, rider: null, stable: null });

export function useAuth() {
  return useContext(AuthContext);
}
