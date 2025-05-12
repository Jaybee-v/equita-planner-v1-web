import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { NotificationsPageView } from "@/features/notification/components/NotificationsPageView";
import findNotificationsByUserId from "@/features/notification/services/find-notifications-by-user-id";
import { redirect } from "next/navigation";

export default async function StableNotificationsPage() {
  const { user, stable } = await isAuthenticated();

  if (!stable || !user) {
    redirect("/app");
  }

  const requestNotifications = await findNotificationsByUserId({
    page: 1,
    limit: 5,
    type: "",
  });

  if ("error" in requestNotifications) {
    redirect("/app");
  }

  const { notifications, totalCount } = requestNotifications;

  return (
    <div className="">
      <div className="flex flex-col gap-4 ">
        <NotificationsPageView
          notifications={notifications}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
