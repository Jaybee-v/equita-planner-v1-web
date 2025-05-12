import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { MapView } from "@/features/map/components/MapView";

export default async function ExploreStablesPage() {
  const { rider } = await isAuthenticated();
  return (
    <div>
      <MapView rider={rider} />
    </div>
  );
}
