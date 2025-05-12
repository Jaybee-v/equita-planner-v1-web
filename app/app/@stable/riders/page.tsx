import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { StableRiderList } from "@/features/rider/components/StableRiderList";
import getStableRiders from "@/features/rider/services/get-stable-riders";
import { PendingRidersList } from "@/features/stable/components/PendingRidersList";
import { redirect } from "next/navigation";

export default async function StableRidersPage() {
  const { user, stable } = await isAuthenticated();

  if (!user || !stable) {
    redirect("/");
  }

  const request = await getStableRiders({
    stableId: stable.id,
    page: 1,
    limit: 10,
  });

  if ("error" in request) {
    return <div>{request.error}</div>;
  }

  const { waiting, approved, total } = request.data;

  const riders = approved.map((affiliation) => affiliation.rider);

  return (
    <div className="max-w-7xl mx-auto p-2 space-y-2 md:space-y-4">
      <PendingRidersList affiliations={waiting} />

      <StableRiderList riders={riders} total={total} stable={stable} />
    </div>
  );
}
