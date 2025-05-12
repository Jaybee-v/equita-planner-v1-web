import { Button } from "@/components/ui/button";
import User from "@/types/User";
import { Bell } from "lucide-react";
import Link from "next/link";
import { NotificationCard } from "./NotificationCard";

type RiderNotificationsHubProps = {
  user: User;
};

export const NotificationsHub2 = ({ user }: RiderNotificationsHubProps) => {
  const notifications = user.notifications;
  return (
    <div className="bg-white rounded drop-shadow-2xl">
      <h2 className="text-lg font-semibold flex items-center gap-2 border-b py-5 px-6">
        <Bell />
        Notifications
      </h2>

      <section className="space-y-2 w-full">
        {notifications.map((notification, index) => (
          <section
            key={notification.id}
            className={`py-2 ${
              index === notifications.length - 1
                ? ""
                : "border-b border-gray-100"
            }`}
          >
            <NotificationCard
              key={notification.id}
              notification={notification}
              simple
            />
          </section>
        ))}
      </section>
      {notifications.length === 0 && (
        <section className="p-6">
          <p className="text-muted-foreground">
            Aucune notification pour le moment
          </p>
        </section>
      )}
      {notifications.length > 0 && (
        <section className="flex justify-center">
          <Link href={"/app/notifications"}>
            <Button variant={"link"} className="w-fit">
              <Bell /> <span>Voir toutes mes notifications</span>
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
};
