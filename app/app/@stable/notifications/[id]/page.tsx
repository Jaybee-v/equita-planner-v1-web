import NotificationStatus from "@/enums/NotificationStatus";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import NotificationActions from "@/features/notification/components/NotificationActions";
import getNotificationById from "@/features/notification/services/get-notification-by-id";
import updateNotificationStatus from "@/features/notification/services/update-notification-status";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import { redirect } from "next/navigation";

export default async function StableNotificationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { user, stable } = await isAuthenticated();

  if (!user || !stable) {
    return redirect("/");
  }

  const request = await getNotificationById(id);
  const {
    notification,
    rider: receivedRider,
    stable: receivedStable,
  } = request;

  if (notification.status === NotificationStatus.UNREAD) {
    await updateNotificationStatus(notification.id);
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <section className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {notification.title}
          </h1>
          <p className="text-gray-600">{notification.message}</p>
        </section>

        {receivedRider && (
          <section className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Le cavalier
            </h2>
            <p className="text-gray-600">
              {receivedRider?.name} {receivedRider?.familyName}
            </p>
            <p>{riderLevelTransformer(receivedRider.level)}</p>
          </section>
        )}

        {receivedStable && (
          <section className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Le club
            </h2>
            <p className="text-gray-600">{receivedStable?.name}</p>
          </section>
        )}

        <section>
          <p className="text-gray-600 text-sm text-end">
            Demande reçue{" "}
            {new Date(notification.createdAt).toLocaleDateString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </section>

        <section className="flex justify-end">
          <NotificationActions notificationId={notification.id} />
        </section>
      </section>
    </div>
  );
}
