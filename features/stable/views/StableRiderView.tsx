"use client";

import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import findStableBySlug from "../services/find-by-slug";

type StableRiderViewProps = {
  slug: string;
  user: User;
  rider: Rider;
};

export const StableRiderView = ({
  slug,
  user,
  rider,
}: StableRiderViewProps) => {
  const params = useSearchParams();
  const id = params.get("id");
  const [stable, setStable] = useState<Stable | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStable = async () => {
      const stable = await findStableBySlug({ slug, id: id as string });
      if ("error" in stable) {
        return;
      }
      setStable(stable);
      setIsLoading(false);
    };
    fetchStable();
  }, [slug, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <WelcomeHeader
        auth={{ user: null, instructor: null, rider: rider, stable }}
      />
    </div>
  );
};
