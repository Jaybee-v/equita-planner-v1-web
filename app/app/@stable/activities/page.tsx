import { StableCalendar } from "@/features/activity/components/StableCalendar";
import { findByStableIdAndWeek } from "@/features/activity/services/find-by-stable-id-and-week";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { CreateStableCard } from "@/features/stable/components/CreateStableCard";
import { redirect } from "next/navigation";

export default async function StableActivitiesPage() {
  const { user, stable } = await isAuthenticated();

  if (!user) {
    return redirect("/");
  }

  const currentDate = new Date();
  if (!stable) {
    return (
      <div className="flex justify-center items-center">
        <CreateStableCard userId={user.id} />
      </div>
    );
  }

  const activities = await findByStableIdAndWeek(stable.id, currentDate);

  return (
    <div className="w-full">
      <StableCalendar
        activities={activities}
        date={currentDate}
        stable={stable}
      />
    </div>
  );
}
