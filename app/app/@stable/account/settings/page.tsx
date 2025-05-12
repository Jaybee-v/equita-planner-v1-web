import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { AccountDataCard } from "@/features/user/components/AccountDataCard";
import { DeleteAccountCard } from "@/features/user/components/DeleteAccountCard";
import { UpdatePasswordCard } from "@/features/user/components/UpdatePasswordCard";
import { redirect } from "next/navigation";

export default async function StableSettingsPage() {
  const { user, stable } = await isAuthenticated();

  if (!user || !stable) {
    redirect("/");
  }
  return (
    <div className="space-y-2 md:space-y-4">
      <section className="xl:grid xl:grid-cols-2 gap-4">
        <AccountDataCard user={user} />
        <UpdatePasswordCard user={user} />
      </section>
      <DeleteAccountCard />
    </div>
  );
}
