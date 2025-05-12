"use client";
import { UserRole } from "@/enums/UserRole";
import { NavbarMenu as RiderNavbarMenu } from "@/features/rider/components/navigation/NavbarMenu";
import { NavbarMenu as StableNavbarMenu } from "@/features/stable/components/navigation/NavbarMenu";
import Notification from "@/types/Notification";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Logo } from "./Logo";

type NavbarProps = {
  auth: {
    user: User | null;
    rider: Rider | null;
    stable: Stable | null;
  };
};

export const Navbar = ({ auth }: NavbarProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotRead = async () => {
      if (auth && auth.user) {
        setNotifications(auth.user.notifications);
      }
    };
    fetchNotRead();
  }, [auth]);

  return (
    <div className="fixed max-sm:bottom-0 w-full z-40 bg-white/30 backdrop-blur-md py-2">
      <div className="max-w-7xl mx-auto flex md:justify-between items-center">
        {!auth.user && (
          <Link
            href={"/"}
            className="flex items-center gap-2 px-1 md:px-4 py-2 max-md:hidden"
          >
            <Logo size={36} />
            <span className="text-sm tracking-tighter font-bold hidden md:block">
              Equita-Planner
            </span>
          </Link>
        )}
        {auth.user && auth.user.role === UserRole.STABLE && (
          <StableNavbarMenu notifications={notifications} user={auth.user} />
        )}
        {auth.user && auth.user.role === UserRole.RIDER && <RiderNavbarMenu />}
        {!auth.user && (
          <section className="flex items-center gap-2 px-4 py-2">
            <Link href={"/auth/signup"}>
              <Button variant={"outline"}>S&apos;inscrire</Button>
            </Link>
            <Link href={"/auth/signin"}>
              <Button>Se connecter</Button>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};
