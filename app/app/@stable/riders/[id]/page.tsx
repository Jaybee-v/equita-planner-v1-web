import { BackButton } from "@/components/shared/BackButton";
import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RiderAvatar } from "@/features/rider/components/RiderAvatar";
import { UpdateRiderLevel } from "@/features/rider/components/UpdateRiderLevel";
import findRiderById from "@/features/rider/services/find-rider-by-id";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { FaHorseHead } from "react-icons/fa";

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

  return (
    <div className="md:grid md:grid-cols-3 gap-4 max-md:space-y-2">
      <WelcomeHeader
        isRiderPage
        auth={{ user: null, rider: rider, instructor: null, stable: null }}
      />
      <aside className="col-span-2 bg-white rounded drop-shadow-md p-4">
        <section className="flex items-center gap-4">
          <RiderAvatar rider={rider} />
          <Label>
            <span>
              {rider.name} {rider.familyName}
            </span>
          </Label>
        </section>

        <UpdateRiderLevel rider={rider} />
      </aside>
      <aside className="bg-white rounded drop-shadow-md p-4 grid gap-2">
        <BackButton />
        <Link href="/app/riders">
          <Button>
            <FaHorseHead />
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
