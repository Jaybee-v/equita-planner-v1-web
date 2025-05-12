import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { InstructorDataCard } from "@/features/instructor/components/InstructorDataCard";
import { redirect } from "next/navigation";

export default async function InstructorAccountPage() {
  const { instructor, user } = await isAuthenticated();

  if (!instructor || !user) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <InstructorDataCard instructor={instructor} />
    </div>
  );
}
