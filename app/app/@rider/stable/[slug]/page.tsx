import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { StableRiderView } from "@/features/stable/views/StableRiderView";
import { redirect } from "next/navigation";

export default async function StablePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user, rider } = await isAuthenticated();

  if (!user || !rider) {
    redirect("/");
  }

  return (
    <div>
      <StableRiderView slug={slug} user={user} rider={rider} />
    </div>
  );
}
