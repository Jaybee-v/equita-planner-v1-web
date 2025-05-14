import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { InstructorCard } from "@/features/instructor/components/InstructorCard";
import { CreateStableCard } from "@/features/stable/components/CreateStableCard";
import { PendingRidersList } from "@/features/stable/components/PendingRidersList";
import { StableDataCard } from "@/features/stable/components/StableDataCard";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaHorseHead } from "react-icons/fa";
import { PiUserFocusDuotone } from "react-icons/pi";

export default async function StableAccountPage() {
  const { stable, user } = await isAuthenticated();

  if (!user) {
    redirect("/");
  }

  if (!stable) {
    return (
      <div className="flex justify-center items-center">
        <CreateStableCard userId={user.id} />
      </div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <StableDataCard stable={stable} />
      <section className="flex flex-col-reverse lg:grid grid-cols-2 gap-4">
        <section className="rounded bg-white drop-shadow-2xl">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b py-5 px-6">
            Mes Moniteurs
          </h2>
          <section className="grid md:grid-cols-2 gap-4 p-6">
            {stable.instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </section>
          <section className="px-6 pb-6">
            <Link href="/app/instructors">
              <Button>
                <PiUserFocusDuotone />
                Gérer mes moniteurs
              </Button>
            </Link>
          </section>
        </section>
        <section className="rounded bg-white drop-shadow-2xl p-6 h-fit flex flex-col gap-4">
          <PendingRidersList affiliations={stable.affiliationRequests} />
          <Link href="/app/riders">
            <Button>
              <FaHorseHead />
              Gérer mes cavaliers
            </Button>
          </Link>
        </section>
      </section>
    </div>
  );
}
