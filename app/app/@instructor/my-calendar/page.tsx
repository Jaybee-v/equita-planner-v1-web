import { InstructorCalendar } from "@/features/activity/components/InstructorCalendar";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { redirect } from "next/navigation";

export default async function InstructorMyCalendarPage() {
  const { user, instructor } = await isAuthenticated();
  if (!user || !instructor || !instructor.stable) {
    return redirect("/");
  }
  const currentDate = new Date();

  return (
    <div className="w-full ">
      <InstructorCalendar
        activities={[]}
        instructorId={instructor.id}
        date={currentDate}
        stable={instructor.stable}
      />
    </div>
  );
}
