import { BackButton } from "@/components/shared/BackButton";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { CreateInstructorDialog } from "@/features/instructor/components/CreateInstructorDialog";
import { InstructorCard } from "@/features/instructor/components/InstructorCard";
import { redirect } from "next/navigation";

export default async function StableInstructorsPage() {
  const { user, stable } = await isAuthenticated();

  if (!stable || !user) {
    redirect("/app/account");
  }

  return (
    <div>
      <section className="md:grid grid-cols-3 gap-4">
        <aside className="md:col-span-2 bg-background rounded shadow drop-shadow-xl p-2 md:p-6 h-fit space-y-2 md:space-y-4 w-full">
          <h1 className="text-lg font-bold">Mes moniteurs</h1>
          <section className="grid grid-cols-2 gap-4">
            {stable.instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </section>
        </aside>
        <aside className="bg-background gap-4 rounded shadow drop-shadow-xl p-2 md:p-6 h-fit space-y-2 md:space-y-4 w-full">
          <BackButton />
          <h2 className="text-lg font-bold">Que faire ?</h2>
          <CreateInstructorDialog stableId={stable.id} />
        </aside>
      </section>
    </div>
  );
}
