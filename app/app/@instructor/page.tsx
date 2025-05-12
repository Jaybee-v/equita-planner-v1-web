import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { findByStableIdAndWeek } from "@/features/activity/services/find-by-stable-id-and-week";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { NotificationsHub2 } from "@/features/notification/components/NotificationsHub2";
import { MyStableCard } from "@/features/rider/components/MyStableCard";
import { TodayActivities } from "@/features/stable/components/TodayActivities";
import { UpdatePasswordForm } from "@/features/user/forms/UpdatePasswordForm";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";

export default async function InstructorHomePage() {
  const { user, instructor } = await isAuthenticated();

  if (!user) {
    redirect("/");
  }

  if (!instructor) {
    redirect("/");
  }

  if (user.mustChangePassword) {
    return (
      <div className="bg-white rounded drop-shadow-2xl p-6 space-y-4">
        <h1 className="text-lg font-semibold flex items-center gap-2 border-b py-5 px-6">
          <Bell />
          Bienvenue sur <span className="font-bold">Equita-Planner</span>
        </h1>
        <p className="p-6">
          Votre compte a été créé par{" "}
          <span className="font-bold">{instructor.stable?.name}</span>.
        </p>
        <Alert variant={"warning"} className="max-w-md mx-auto">
          <AlertTitle className="">
            Vous devez changer votre mot de passe
          </AlertTitle>
          <AlertDescription>
            Votre mot de passe est temporaire. Veuillez le changer pour accéder
            à votre compte.
          </AlertDescription>
        </Alert>
        <section className="max-w-sm mx-auto">
          <UpdatePasswordForm user={user} />
        </section>
      </div>
    );
  }

  const activities = await findByStableIdAndWeek(
    instructor!.stable!.id,
    new Date()
  );
  console.log(activities);
  if ("error" in activities) {
    return <div>{activities.error}</div>;
  }
  const todayActivities = activities.filter(
    (activity) =>
      new Date(activity.date).toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0]
  );

  return (
    <div className="space-y-2 md:gap-4">
      <WelcomeHeader auth={{ user, instructor, rider: null, stable: null }} />
      <section className="flex justify-between w-full gap-4">
        <aside className="min-w-sm">
          <MyStableCard stable={instructor.stable!} />
        </aside>
        <aside className="w-full">
          <section className="p-4 md:p-6 space-y-6 border bg-gray-50 border-gray-200 shadow h-fit w-full rounded">
            <TodayActivities activities={todayActivities} />
          </section>
        </aside>
        <aside className="w-full">
          <NotificationsHub2 user={user} />
        </aside>
      </section>
    </div>
  );
}
