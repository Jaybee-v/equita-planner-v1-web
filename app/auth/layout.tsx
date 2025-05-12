import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await isAuthenticated();

  if (auth.user) {
    redirect("/app");
  }

  return <main className="bg-primary">{children}</main>;
}
