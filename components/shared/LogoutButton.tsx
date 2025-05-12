"use client";
import { logout } from "@/lib/cookies";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  return (
    <Button
      variant={"ghost"}
      className="border-none shadow-none text-red-600 flex flex-col items-center gap-1 w-fit"
      onClick={async () => await logout()}
    >
      <LogOut size={30} />
      <span className="text-[10px] hidden md:block">Se déconnecter</span>
    </Button>
  );
};
