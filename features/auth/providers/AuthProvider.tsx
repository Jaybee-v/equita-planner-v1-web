"use client";

import { AuthContext } from "@/context/AuthContext";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { ReactNode } from "react";

export default function AuthProvider({
  children,
  user,
  rider,
  stable,
}: {
  children: ReactNode;
  user: User | null;
  rider: Rider | null;
  stable: Stable | null;
}) {
  return (
    <AuthContext.Provider value={{ user, rider, stable }}>
      {children}
    </AuthContext.Provider>
  );
}
