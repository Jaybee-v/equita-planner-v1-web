import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { AddActivityButton } from "@/features/activity/components/AddActivityButton";
import { findByStableIdAndWeek } from "@/features/activity/services/find-by-stable-id-and-week";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { NotificationsHub2 } from "@/features/notification/components/NotificationsHub2";
import { CreateStableCard } from "@/features/stable/components/CreateStableCard";
import { StableRapidAction } from "@/features/stable/components/navigation/RapidAction";
import { PendingRidersList } from "@/features/stable/components/PendingRidersList";
import { TodayActivities } from "@/features/stable/components/TodayActivities";
import { TodayInStable } from "@/features/stable/components/TodayInStable";
import { ActivitiesStatsChart } from "@/features/stable/components/TodayStats";
import { Bell } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaHorseHead } from "react-icons/fa";

export default async function StableHomePage() {
  const { user, stable } = await isAuthenticated();

  if (!user) {
    return redirect("/");
  }

  if (!stable) {
    return (
      <div className="flex justify-center items-center">
        <CreateStableCard userId={user.id} />
      </div>
    );
  }

  const activities = await findByStableIdAndWeek(stable.id, new Date());

  console.log(activities);

  if ("error" in activities) {
    return <div>{activities.error}</div>;
  }

  const todayActivities = activities.filter(
    (activity) =>
      new Date(activity.date).toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0]
  );
  console.log(user.notifications);

  return (
    <div className="grid md:grid-cols-3 gap-4 px-2 py-2 md:px-4 w-full">
      <WelcomeHeader
        auth={{ user, rider: null, instructor: null, stable: stable }}
      />

      <aside className="col-span-3 lg:col-span-2 bg-background md:grid md:grid-cols-2 gap-4 rounded shadow drop-shadow-xl p-2 md:p-6 h-fit space-y-2 md:space-y-4 w-full relative">
        <StableRapidAction stable={stable} />
        <section className="p-4 md:p-6 space-y-6 border bg-gray-50 border-gray-200 shadow h-fit w-full rounded-2xl">
          <h3 className="text-lg font-bold">Aujourd&apos;hui au club</h3>
          <section className="grid md:grid-cols-2 gap-4 w-full">
            <article className="space-y-4 border bg-primary/30 p-4 rounded-md flex flex-col justify-between w-full">
              <p className="text-xs">Activités aujourd&apos;hui</p>
              <p className="text-4xl font-bold text-end">
                {todayActivities.length}
              </p>
            </article>
            <TodayInStable activities={todayActivities} />
          </section>
          <TodayActivities activities={todayActivities} />
        </section>
        <NotificationsHub2 user={user} />
        <section className="grid md:grid-cols-2 gap-4 h-fit col-span-2 w-full">
          <section className="p-6 space-y-6 border bg-gray-50 border-gray-200 shadow h-fit w-full rounded-2xl">
            <ActivitiesStatsChart type="today" activities={todayActivities} />
          </section>
          <section className="p-6 space-y-6 border bg-gray-50 border-gray-200 shadow h-fit w-full rounded-2xl">
            <ActivitiesStatsChart type="week" activities={activities} />
          </section>
        </section>
      </aside>
      <aside className="col-span-1 space-y-4 hidden lg:block">
        <section className="w-full bg-white rounded shadow drop-shadow-xl p-6 space-y-6">
          <h3>Actions rapides</h3>
          <section className="grid gap-4">
            <AddActivityButton stable={stable} isMenu />

            <Link href="/app/riders">
              <Button>
                <FaHorseHead />
                Gérer mes cavaliers
              </Button>
            </Link>
            <Link href="/app/notifications">
              <Button>
                <Bell />
                Mes notifications
              </Button>
            </Link>
          </section>
        </section>
        <PendingRidersList affiliations={stable.affiliationRequests} />
      </aside>
    </div>
  );
}
