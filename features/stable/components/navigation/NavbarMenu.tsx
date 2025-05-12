import { LogoutButton } from "@/components/shared/LogoutButton";
import { NavbarMenuLink } from "@/components/shared/NavbarMenuLink";
import NotificationStatus from "@/enums/NotificationStatus";
import { NotificationsHub } from "@/features/notification/components/NotificationsHub";
import { cn } from "@/lib/utils";
import Notification from "@/types/Notification";
import User from "@/types/User";
import {
  Bell,
  Calendar,
  LucideLayoutDashboard,
  MessageSquare,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type NavbarMenuProps = {
  notifications: Notification[];
  user: User;
};

export const NavbarMenu = ({ notifications, user }: NavbarMenuProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState<
    Notification[]
  >([]);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);

  useEffect(() => {
    setUnreadNotifications(
      notifications.filter(
        (notification) => notification.status === NotificationStatus.UNREAD
      )
    );
  }, [notifications]);

  return (
    <nav className="md:hidden flex gap-4 justify-between items-center w-full md:w-1/2 px-2 md:px-6 py-2">
      <NavbarMenuLink
        href={"/app"}
        icon={<LucideLayoutDashboard className="w-8 h-8" />}
        label="Accueil"
      />
      <NavbarMenuLink
        href={"/app/activities"}
        icon={<Calendar className="w-8 h-8" />}
        label="Mon Planning"
      />

      <NavbarMenuLink
        href={"/app/messages"}
        icon={<MessageSquare className="w-8 h-8" />}
        label="Messages"
      />
      <section className="">
        <section className="">
          <div
            className={cn(
              isOpenNotifications && "text-white bg-primary/30 rounded-md p-2",
              "flex flex-col items-center gap-1 text-xs relative cursor-pointer"
            )}
            onClick={() => setIsOpenNotifications(!isOpenNotifications)}
          >
            <Bell className="w-8 h-8" />
            <span className="hidden md:block">Notifications</span>
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-2 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-caret-blink">
                <span className="text-white text-sm font-bold">
                  {unreadNotifications.length}
                </span>
              </span>
            )}
          </div>
          {isOpenNotifications && (
            <NotificationsHub
              notifications={notifications}
              setIsOpenNotifications={setIsOpenNotifications}
              user={user}
            />
          )}
        </section>
      </section>
      <NavbarMenuLink
        href={"/app/account"}
        icon={<UserIcon className="w-8 h-8" />}
        label="Mon compte"
      />
      <LogoutButton />
    </nav>
  );
};
