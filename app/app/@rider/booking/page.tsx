import { Status } from "@/enums/Status";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { MyStableCard } from "@/features/rider/components/MyStableCard";
import findSlotsRequestByRiderId from "@/features/slot-request/services/find-by-rider-id";
import { RiderSlotRequestByStatus } from "@/features/slot-request/views/RiderSlotRequestByStatus";
import { RiderSlotRequestViewPage } from "@/features/slot-request/views/RiderSlotRequestViewPage";
import { Info, PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function RiderBookingPage() {
  const { user, rider } = await isAuthenticated();

  if (!user || !rider || rider.affiliationRequests.length === 0) {
    redirect("/");
  }

  const stable = rider.affiliationRequests[0].stable;

  const request = await findSlotsRequestByRiderId(rider.id);

  if ("error" in request) {
    redirect("/");
  }

  const { pendingRequest, approvedRequest, rejectedRequest } = request;

  return (
    <div className="space-y-2 lg:grid grid-cols-3 gap-4">
      <section className="col-span-3 md:flex justify-between w-full relative py-4 bg-background p-6 rounded drop-shadow-2xl">
        <section className="absolute bottom-0 right-0"></section>
        <section className="leading-5">
          <h2 className="font-bold md:text-2xl flex items-center gap-2">
            <Info />
            Toutes mes réservations
          </h2>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>

      <aside className="col-span-3 bg-background p-6 rounded drop-shadow-2xl w-full space-y-2 md:space-y-4">
        <section>
          <h3 className="font-bold">Demandes en attente</h3>
          <RiderSlotRequestByStatus
            status={Status.PENDING}
            slotRequests={pendingRequest.slotRequests}
            count={pendingRequest.count}
            riderId={rider.id}
          />
        </section>
        <section>
          <h3 className="font-bold">Demandes acceptées</h3>
          <RiderSlotRequestByStatus
            status={Status.APPROVED}
            slotRequests={approvedRequest.slotRequests}
            count={approvedRequest.count}
            riderId={rider.id}
          />
        </section>
        <section>
          <h3 className="font-bold">Demandes refusées</h3>
          <RiderSlotRequestByStatus
            riderId={rider.id}
            status={Status.REJECTED}
            slotRequests={rejectedRequest.slotRequests}
            count={rejectedRequest.count}
          />
        </section>
      </aside>
      <section className="col-span-3 md:flex justify-between w-full relative py-4 bg-background p-6 rounded drop-shadow-2xl">
        <section className="absolute bottom-0 right-0"></section>
        <section className="leading-5">
          <h2 className="font-bold md:text-2xl flex items-center gap-2">
            <PlusCircle />
            Je réserve un créneau pour une leçon
          </h2>
          <p>Tu peux réserver un créneau pour une leçon</p>
        </section>
        <section>
          <p className="text-muted-foreground text-sm font-light max-md:mt-6">
            Aujourd&apos;hui:{" "}
            <span className="capitalize">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </section>
      </section>

      <aside className="">
        <MyStableCard stable={stable} />
      </aside>
      <aside
        className="col-span-2 bg-background p-6 rounded drop-shadow-2xl w-full"
        id="reservation-card"
      >
        <RiderSlotRequestViewPage
          params={{
            stableId: stable.id,
            riderId: rider.id,
          }}
        />
      </aside>
    </div>
  );
}
