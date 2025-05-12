"use client";
import NotificationStatus from "@/enums/NotificationStatus";
import { UserRole } from "@/enums/UserRole";
import { NotificationsHub } from "@/features/notification/components/NotificationsHub";
import { RiderAvatar } from "@/features/rider/components/RiderAvatar";
import { cn } from "@/lib/utils";
import { Instructor } from "@/types/Instructor";
import Notification from "@/types/Notification";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";

type AuthHeaderProps = {
  auth: {
    user: User | null;
    stable: Stable | null;
    rider: Rider | null;
    instructor: Instructor | null;
  };
};

export const AuthHeader = ({ auth }: AuthHeaderProps) => {
  const path = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState<
    Notification[]
  >([]);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);

  useEffect(() => {
    if (auth.user) {
      setUnreadNotifications(
        auth.user.notifications.filter(
          (notification) => notification.status === NotificationStatus.UNREAD
        ) || []
      );
    }
  }, [auth.user]);

  if (auth.user) {
    return (
      <div className="fixed top-0 left-0 w-full z-40 bg-white/60 backdrop-blur-md px-2 md:pe-6 md:ps-72 max-h-16">
        <section className="flex justify-between items-center">
          <article className="flex gap-4 items-center">
            <SidebarTrigger />
            <section className="w-full">
              {path === "/app" && (
                <p>
                  <span className="font-semibold">Accueil</span>
                </p>
              )}
              {path === "/app/activities" && (
                <p>
                  {auth.user.role === UserRole.STABLE && (
                    <span className="font-semibold">Mon Planning</span>
                  )}
                  {auth.user.role === UserRole.RIDER && (
                    <span className="font-semibold">Mes Cours</span>
                  )}
                  {auth.user.role === UserRole.INSTRUCTOR && (
                    <span className="font-semibold">
                      {auth.instructor && auth.instructor.stable
                        ? "Planning de " + auth.instructor.stable.name
                        : "Planning du club"}
                    </span>
                  )}
                </p>
              )}
              {path === "/app/my-calendar" &&
                auth.user.role === UserRole.INSTRUCTOR && (
                  <span className="font-semibold">Mon planning</span>
                )}
              {path === "/app/explore" && (
                <p>
                  <span className="font-semibold">Explorer les cours</span>
                </p>
              )}
              {path === "/app/account" &&
                auth.user.role === UserRole.STABLE && (
                  <p>
                    <span className="font-semibold">Mon écurie</span>
                  </p>
                )}
              {path === "/app/account" && auth.user.role === UserRole.RIDER && (
                <p>
                  <span className="font-semibold">Mon compte</span>
                </p>
              )}
              {path === "/app/instructors" && (
                <p>
                  <span className="font-semibold">Mes moniteurs</span>
                </p>
              )}
              {path === "/app/account/settings" && (
                <p>
                  <span className="font-semibold">Paramètres</span>
                </p>
              )}
              {path === "/app/notifications" && (
                <p>
                  <span className="font-semibold">Mes Notifications</span>
                </p>
              )}
              {path === "/app/booking" && (
                <p>
                  <span className="font-semibold">
                    Je gère mes réservations
                  </span>
                </p>
              )}
              {path === "/app/booking#reservation-card" && (
                <p>
                  <span className="font-semibold">Je réserve un créneau</span>
                </p>
              )}
            </section>
          </article>

          <section className="flex items-center gap-2">
            <div
              className={cn(
                isOpenNotifications &&
                  "text-white bg-primary/30 rounded-md p-2",
                "relative cursor-pointer"
              )}
              onClick={() => setIsOpenNotifications(!isOpenNotifications)}
            >
              <Bell />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-2 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center animate-caret-blink">
                  <span className="text-white text-sm font-bold">
                    {unreadNotifications.length}
                  </span>
                </span>
              )}
            </div>
            {isOpenNotifications && (
              <NotificationsHub
                notifications={unreadNotifications}
                setIsOpenNotifications={setIsOpenNotifications}
                user={auth.user}
              />
            )}
            {auth.user && auth.user.role === UserRole.STABLE && auth.stable && (
              // <StableNavbarMenu notifications={notifications} user={auth.user} />
              <section className="flex justify-end w-full gap-2 md:px-12 py-3">
                <article className="flex items-center gap-2 w-full">
                  {auth.stable && auth.stable.logoUrl && (
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        auth.stable.logoUrl
                      }
                      alt={auth.stable.name}
                      width={300}
                      height={300}
                      className="rounded-full object-cover h-10 w-10"
                    />
                  )}
                  <p className="font-semibold tracking-tighter w-full hidden md:block">
                    {auth.stable?.name}
                  </p>
                </article>
              </section>
            )}
            {auth.user && auth.user.role === UserRole.RIDER && (
              <section className="flex justify-end w-full gap-2 md:px-12 py-3">
                <article className="flex items-center gap-2 w-full">
                  {auth.rider && <RiderAvatar rider={auth.rider} />}
                  <p className="font-semibold tracking-tighter w-full hidden md:block">
                    {auth.rider?.name}
                  </p>
                </article>
              </section>
            )}
            {auth.user && auth.user.role === UserRole.INSTRUCTOR && (
              <section className="flex justify-end w-full gap-2 md:px-12 py-3">
                <article className="flex items-center gap-2 w-full">
                  {/* <RiderAvatar gender={auth.instructor?.gender} /> */}
                  <p className="font-semibold tracking-tighter w-full hidden md:block">
                    {auth.instructor?.name}
                  </p>
                </article>
              </section>
            )}
          </section>
        </section>
      </div>
    );
  }
};
