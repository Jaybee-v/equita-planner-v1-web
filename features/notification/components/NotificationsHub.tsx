import { Button } from "@/components/ui/button";
import Notification from "@/types/Notification";
import User from "@/types/User";
import { Bell, X } from "lucide-react";
import Link from "next/link";
import { NotificationCard } from "./NotificationCard";

type NotificationsHubProps = {
  notifications: Notification[];
  setIsOpenNotifications: (isOpen: boolean) => void;
  user: User;
};

export const NotificationsHub = ({
  notifications,
  setIsOpenNotifications,
  user,
}: NotificationsHubProps) => {
  if (!user) {
    return null;
  }

  return (
    <section
      className="absolute top-0 right-0 w-full h-screen bg-black/40 backdrop-blur-xs z-50 "
      onClick={() => setIsOpenNotifications(false)}
    >
      <section className="relative flex justify-end items-start p-20 h-full">
        <section className="w-full max-w-md bg-white rounded-lg p-4 relative">
          <Link href={"/app/notifications"}>
            <Button variant={"link"} className="w-fit">
              <Bell /> <span>Voir toutes mes notifications</span>
            </Button>
          </Link>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute top-0 right-0"
            onClick={() => setIsOpenNotifications(false)}
          >
            <X />
          </Button>
          {notifications.length > 0 && (
            <section className="flex flex-col gap-2">
              {notifications.map((notification) => (
                <section key={notification.id} className="border-b py-1">
                  <NotificationCard
                    onClick={() => setIsOpenNotifications(false)}
                    notification={notification}
                    simple
                  />
                </section>
              ))}
            </section>
          )}
        </section>
      </section>
    </section>
  );
};
