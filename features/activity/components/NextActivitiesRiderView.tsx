"use client";

import { RiderLevel, riderLevelOrder } from "@/enums/RiderLevel";
import Activity from "@/types/Activity";
import Rider from "@/types/Rider";
import { Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import findActivitiesByWeekWithFilters from "../services/find-activities-by-week-with-filters";
import { ActivityCard } from "./ActivityCard";

type NextActivitiesRiderViewProps = {
  stableId: string;
  rider: Rider;
};

export const NextActivitiesRiderView = ({
  stableId,
  rider,
}: NextActivitiesRiderViewProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      const request = await findActivitiesByWeekWithFilters({
        date: new Date().toISOString(),
        stableId,
      });

      if ("error" in request) {
        console.error(request.error);
        return;
      }

      const _activities: Activity[] = [];
      for (const activity of request) {
        console.log(activity);
        if (
          new Date(activity.date).toISOString().split("T")[0] ===
          new Date().toISOString().split("T")[0]
        ) {
          if (
            activity.openToMoreLevel &&
            riderLevelOrder.indexOf(activity.requiredLevel) <=
              riderLevelOrder.indexOf(rider.level) &&
            activity.requiredLevel !== RiderLevel.ALL
          ) {
            _activities.push(activity);
          }
          if (activity.requiredLevel === RiderLevel.ALL) {
            _activities.push(activity);
          }
        }
      }

      setActivities(_activities);
      setIsLoading(false);
    };

    fetchActivities();
  }, [stableId, rider]);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold flex items-center gap-2 border-b py-5 px-6 w-full">
        <Calendar size={20} /> Les cours aujourd&apos;hui
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center max-h-96 h-full">
          <Loader2 className="animate-spin" size={60} />
        </div>
      ) : (
        <section className="p-2 md:p-4">
          {activities.length > 0 ? (
            <section className="grid grid-cols-1 gap-2">
              {activities.map((activity) => (
                <ActivityCard
                  riderView
                  key={activity.id}
                  a={activity}
                  rider={rider}
                />
              ))}
            </section>
          ) : (
            <p className="text-center text-gray-500">
              Aucun cours / aucune activité aujourd&apos;hui
            </p>
          )}
        </section>
      )}
    </div>
  );
};
