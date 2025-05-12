import { Button } from "@/components/ui/button";
import { AffiliationRequestStatus } from "@/enums/AffiliationRequest";
import { ActivityParticipationCard } from "@/features/activity/components/ActivityParticipationCard";
import findRiderActivities from "@/features/activity/services/find-rider-activities";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { WaitingAffiliationResponse } from "@/features/rider/components/navigation/WaitingAffiliationResponse";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ActivitiesRiderPage() {
  const { rider, user } = await isAuthenticated();

  if (!rider || !user) {
    redirect("/");
  }

  if (rider.affiliationRequests.length === 0) {
    redirect("/app");
  }

  if (
    rider.affiliationRequests.length > 0 &&
    rider.affiliationRequests[0].status === AffiliationRequestStatus.PENDING
  ) {
    return <WaitingAffiliationResponse rider={rider} />;
  }

  const activities = await findRiderActivities(rider.id);

  if ("error" in activities) {
    return <div>{activities.error}</div>;
  }

  const { waiting, validated, past } = activities;

  return (
    <div className="py-4">
      <div className="bg-slate-50 rounded drop-shadow-2xl space-y-4 p-4">
        <h1 className="text-2xl font-bold text-center">Mes activités</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href={"/app/explore"}>
            <Button variant={"outline"}>
              <Search size={16} />
              <span>Explorer les activités de mon club</span>
            </Button>
          </Link>
          <Button>
            <PlusCircle size={16} />
            <span>
              Réserver{" "}
              <span className="max-md:hidden">/ faire une demande de</span>{" "}
              créneau
            </span>
          </Button>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-bold ps-2 md:ps-10">Je suis inscrit à</h2>
          <section className="flex overflow-x-auto w-full gap-4 border-b pb-4">
            {validated.length > 0 ? (
              validated.map((participation) => (
                <ActivityParticipationCard
                  type="validated"
                  key={participation.id}
                  participation={participation}
                />
              ))
            ) : (
              <div className="w-fit mx-auto bg-slate-200 px-4 py-2 rounded-lg italic text-sm text-gray-700">
                Aucune activité validée
              </div>
            )}
          </section>
          <h2 className="text-lg font-bold ps-2 md:ps-10">
            J&apos;attends une réponse pour
          </h2>
          <section className="flex overflow-x-auto w-full gap-4 border-b pb-4">
            {waiting.length > 0 ? (
              waiting.map((participation) => (
                <ActivityParticipationCard
                  type="waiting"
                  key={participation.id}
                  participation={participation}
                />
              ))
            ) : (
              <div className="w-fit mx-auto bg-slate-200 px-4 py-2 rounded-lg italic text-sm text-gray-700">
                Aucune réponse en attente
              </div>
            )}
          </section>
          <h2 className="text-lg font-bold ps-2 md:ps-10">
            J&apos;ai participé à
          </h2>
          <section className="flex overflow-x-auto w-full gap-4 pb-4">
            {past.length > 0 ? (
              past.map((participation) => (
                <ActivityParticipationCard
                  type="past"
                  key={participation.id}
                  participation={participation}
                />
              ))
            ) : (
              <div className="w-fit mx-auto bg-slate-200 px-4 py-2 rounded-lg italic text-sm text-gray-700">
                Aucune activité passée
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}
