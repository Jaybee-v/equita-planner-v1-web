import { StableCalendar } from "@/features/activity/components/StableCalendar";
import { findByStableIdAndWeek } from "@/features/activity/services/find-by-stable-id-and-week";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { redirect } from "next/navigation";

export default async function StableInstructorActivitiesPage() {
  const { user, instructor } = await isAuthenticated();

  if (!user || !instructor || !instructor.stable) {
    return redirect("/");
  }

  const currentDate = new Date();

  const activities = await findByStableIdAndWeek(
    instructor.stable.id,
    currentDate
  );

  return (
    <div className="w-full ">
      <StableCalendar
        activities={activities}
        date={currentDate}
        stable={instructor.stable}
      />
    </div>
  );
}
