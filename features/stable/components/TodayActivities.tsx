import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/features/activity/components/ActivityCard";
import Activity from "@/types/Activity";
import { Calendar } from "lucide-react";
import Link from "next/link";

type TodayActivitiesProps = {
  activities: Activity[];
};

export const TodayActivities = ({ activities }: TodayActivitiesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Planning du jour</h2>
      <section className="space-y-2">
        {activities.map((activity) => (
          <ActivityCard simple key={activity.id} a={activity} />
        ))}
        {activities.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            Aucune activité aujourd&apos;hui
          </p>
        )}
      </section>
      <Link href="/app/activities" className="text-sm text-gray-500">
        <Button variant="outline">
          <Calendar className="w-4 h-4" />
          Voir le planning complet
        </Button>
      </Link>
    </div>
  );
};
