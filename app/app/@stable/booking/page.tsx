import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { SlotRequestCard } from "@/features/slot-request/components/SlotRequestCard";
import { Ticket } from "lucide-react";
import { redirect } from "next/navigation";

export default async function StableBookingPage() {
  const { user, stable } = await isAuthenticated();

  if (!user || !stable) {
    redirect("/");
  }

  const slotRequests = stable.slotRequests;

  return (
    <div className="space-y-2 md:space-y-4">
      <section className="col-span-3 md:flex justify-between w-full relative py-4 bg-background p-6 rounded drop-shadow-2xl">
        <section className="absolute bottom-0 right-0"></section>
        <section className="space-y-5">
          <h1 className="font-bold md:text-2xl flex items-center gap-2">
            <Ticket />
            Mes réservations
          </h1>
          <p className="text-center py-1 px-6 bg-secondary rounded-full text-white animate-bounce font-bold">
            {slotRequests.length} demande{slotRequests.length > 1 ? "s" : ""} en
            attente
          </p>
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
      <section className="bg-slate-200 rounded p-6 drop-shadow-2xl">
        <h2 className="text-lg font-bold">Demandes en attente</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {slotRequests.map((slot) => (
            <SlotRequestCard key={slot.id} slotRequest={slot} />
          ))}
        </section>
      </section>
    </div>
  );
}
