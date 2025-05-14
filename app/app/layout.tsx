import { AuthHeader } from "@/components/shared/AuthHeader";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserRole } from "@/enums/UserRole";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { GuestCreateAccount } from "@/features/user/components/GuestCreateAccount";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  rider,
  stable,
  instructor,
}: {
  rider: React.ReactNode;
  stable: React.ReactNode;
  instructor: React.ReactNode;
}) {
  const auth = await isAuthenticated();

  if (!auth.user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar auth={auth} />
      <main className="w-full px-2 py-20 bg-primary relative">
        <AuthHeader auth={auth} />
        {auth.user.role === UserRole.GUEST && (
          <GuestCreateAccount user={auth.user} />
        )}
        {auth.user.role === UserRole.STABLE && stable}
        {auth.user.role === UserRole.RIDER && rider}
        {auth.user.role === UserRole.INSTRUCTOR && instructor}
      </main>
    </SidebarProvider>
  );
}
