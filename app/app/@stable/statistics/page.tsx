import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoConstruct } from "react-icons/io5";

export default async function StableStatisticsPage() {
  const { user, stable } = await isAuthenticated();

  if (!stable || !user) {
    redirect("/");
  }

  // const stats = await getStableStats(stable.id, Period.YEAR);

  return (
    <div className="flex justify-center items-center h-full">
      <section className="flex flex-col gap-4 w-full max-w-2xl bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-amber-600 flex items-center gap-2">
          <IoConstruct /> Cette page est encore en construction
        </h1>
        <p className="text-amber-900">
          Nous travaillons pour vous offrir des statistiques précises et
          fiables.
        </p>
        <Link href="/app" className="">
          <Button variant={"secondary"}>Retour à l&apos;accueil</Button>
        </Link>
      </section>
    </div>
  );
}
