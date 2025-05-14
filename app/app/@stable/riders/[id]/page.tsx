import { BackButton } from "@/components/shared/BackButton";
import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ActivityCard } from "@/features/activity/components/ActivityCard";
import { RiderAvatar } from "@/features/rider/components/RiderAvatar";
import { UpdateRiderLevel } from "@/features/rider/components/UpdateRiderLevel";
import findRiderById from "@/features/rider/services/find-rider-by-id";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { FaHelmetSafety } from "react-icons/fa6";

export default async function StableRiderByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const request = await findRiderById(id);

  if ("error" in request) {
    return <div>{request.error}</div>;
  }

  const rider = request;

  console.log(rider);

  return (
    <div className="md:grid md:grid-cols-3 gap-4 max-md:space-y-2">
      <WelcomeHeader
        isRiderPage
        auth={{ user: null, rider: rider, instructor: null, stable: null }}
      />
      <aside className="bg-white h-fit rounded drop-shadow-md p-4  gap-2 grid col-span-3 lg:hidden">
        <BackButton />
        <Link href="/app/riders">
          <Button>
            <FaHelmetSafety />
            Tous mes cavaliers
          </Button>
        </Link>
        <Link href="/app/activities" className="text-sm text-gray-500">
          <Button variant="outline">
            <Calendar className="w-4 h-4" />
            Mon planning
          </Button>
        </Link>
      </aside>
      <aside className="col-span-3 lg:col-span-2 bg-gray-100 rounded drop-shadow-md p-4">
        <section className="flex items-center gap-4">
          <RiderAvatar rider={rider} />
          <Label className="text-2xl font-bold">
            <span>
              {rider.name} {rider.familyName}
            </span>
          </Label>
        </section>

        <UpdateRiderLevel rider={rider} />
        <section className="p-4">
          {rider.activityParticipants.length > 0 ? (
            <section className="md:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {rider.activityParticipants.map((a) => (
                <section key={a.id}>
                  <h4 className="font-semibold capitalize">
                    {new Date(a.activity.date).toLocaleDateString("fr-Fr", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <ActivityCard simple a={a.activity} />
                </section>
              ))}
            </section>
          ) : (
            <section>
              <p>Pas d&apos; actvitiés</p>
            </section>
          )}
        </section>
      </aside>
      <aside className="bg-white h-fit rounded drop-shadow-md p-4  gap-2 hidden lg:grid">
        <BackButton />
        <Link href="/app/riders">
          <Button>
            <FaHelmetSafety />
            Tous mes cavaliers
          </Button>
        </Link>
        <Link href="/app/activities" className="text-sm text-gray-500">
          <Button variant="outline">
            <Calendar className="w-4 h-4" />
            Mon planning
          </Button>
        </Link>
      </aside>
    </div>
  );
}
