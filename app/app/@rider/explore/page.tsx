import { RiderExplorePageView } from "@/features/activity/components/RiderExplorePageView";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { CreateRiderCard } from "@/features/rider/components/CreateRiderCard";
import { redirect } from "next/navigation";

export default async function RiderExplorePage() {
  const { user, rider, stable } = await isAuthenticated();

  if (!user) {
    return redirect("/");
  }

  if (user && stable) return redirect("/app");

  if (!rider) {
    return (
      <div className="flex justify-center items-center">
        <CreateRiderCard userId={user.id} />
      </div>
    );
  }
  // if (stable) return redirect("/app");

  const _stable = rider.affiliationRequests[0].stable;

  const now = new Date();

  return (
    <div className="">
      <RiderExplorePageView stableId={_stable.id} now={now} rider={rider} />
    </div>
  );
}
