import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { RiderDataCard } from "@/features/rider/components/RiderDataCard";
import { redirect } from "next/navigation";

export default async function RiderAccountPage() {
  const { rider, user } = await isAuthenticated();

  if (!rider || !user) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <RiderDataCard rider={rider} isEditable />
    </div>
  );
}
