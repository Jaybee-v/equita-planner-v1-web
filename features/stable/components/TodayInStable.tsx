"use client";
import Activity from "@/types/Activity";
import { useEffect, useState } from "react";

type TodayInStableProps = {
  activities: Activity[];
};

export const TodayInStable = ({ activities }: TodayInStableProps) => {
  const [waitingRiders, setWaitingRiders] = useState<number>(0);

  useEffect(() => {
    const waitingRiders = activities.filter((activity) => {
      return activity.participants?.length;
    });
    setWaitingRiders(waitingRiders.length);
  }, [activities]);

  return (
    <article className="space-y-4 border bg-amber-600/30 p-4 rounded-md flex flex-col justify-between">
      <p className="text-xs">Cavaliers attendus</p>
      <p className="text-4xl font-bold text-end">{waitingRiders}</p>
    </article>
  );
};
