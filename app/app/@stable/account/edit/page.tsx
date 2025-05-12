import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/enums/UserRole";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { StableForm } from "@/features/stable/forms/StableForm";
import { redirect } from "next/navigation";

export default async function EditStableAccountPage() {
  const { stable, user } = await isAuthenticated();

  if (!stable || !user || user.role !== UserRole.STABLE) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Modifier mes informations</h1>
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle>Modifier mes informations</CardTitle>
        </CardHeader>
        <CardContent>
          <StableForm stable={stable} userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
