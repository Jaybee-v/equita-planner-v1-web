import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AffiliationRequestStatus } from "@/enums/AffiliationRequest";
import { NextActivitiesRiderView } from "@/features/activity/components/NextActivitiesRiderView";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { MapView } from "@/features/map/components/MapView";
import { NotificationsHub2 } from "@/features/notification/components/NotificationsHub2";
import { CreateRiderCard } from "@/features/rider/components/CreateRiderCard";
import { MyStableCard } from "@/features/rider/components/MyStableCard";
import { WaitingAffiliationResponse } from "@/features/rider/components/navigation/WaitingAffiliationResponse";
import { redirect } from "next/navigation";

export default async function RiderHomePage() {
  const { user, rider } = await isAuthenticated();

  if (!user) {
    redirect("/");
  }

  if (!rider) {
    return (
      <div className="flex justify-center items-center">
        <CreateRiderCard userId={user.id} />
      </div>
    );
  }

  if (rider.affiliationRequests.length === 0) {
    return (
      <div className="">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Bienvenue sur <span>Equita-planner</span>
            </CardTitle>
            <CardDescription>
              <p>Tu es inscrit sur notre plateforme en tant que cavalier.</p>
              <p>
                Pour t&apos;aider au mieux, et te proposer les activités de ton
                club,
              </p>
              <p>
                recherche le club de ton choix dans nos partenaires inscrits sur
                la plateforme.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapView rider={rider} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (rider.affiliationRequests.length > 0) {
    return (
      <div className="md:grid w-full md:grid-cols-3 space-y-2 md:gap-4">
        <WelcomeHeader auth={{ user, rider, instructor: null, stable: null }} />
        {rider.affiliationRequests[0].status ===
          AffiliationRequestStatus.PENDING && (
          <div className="flex justify-center items-center">
            <WaitingAffiliationResponse rider={rider} />
          </div>
        )}

        <aside className="col-span-2 space-y-2 md:space-y-4">
          <NotificationsHub2 user={user} />
        </aside>
        <aside className="col-span-1 w-full space-y-4">
          {rider.affiliationRequests[0].status ===
            AffiliationRequestStatus.APPROVED && (
            <>
              <MyStableCard stable={rider.affiliationRequests[0].stable} />
              <section className="bg-white rounded space-y-4 drop-shadow-2xl">
                <NextActivitiesRiderView
                  stableId={rider.affiliationRequests[0].stable.id}
                  rider={rider}
                />
              </section>
            </>
          )}
        </aside>
      </div>
    );
  }
}
