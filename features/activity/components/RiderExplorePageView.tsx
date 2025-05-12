"use client";
import { Button } from "@/components/ui/button";
import { RiderLevel } from "@/enums/RiderLevel";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import Activity from "@/types/Activity";
import Rider from "@/types/Rider";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IoMedalOutline } from "react-icons/io5";
import { FilterForm } from "../forms/FilterForm";
import findActivitiesByWeekWithFilters from "../services/find-activities-by-week-with-filters";
import anonymizeActivities from "../utils/anonymate-activities";
import { ActivityCard } from "./ActivityCard";

type RiderExplorePageViewProps = {
  stableId: string;
  now: Date;
  rider: Rider;
};

export const RiderExplorePageView = ({
  stableId,
  now,
  rider,
}: RiderExplorePageViewProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<{
    search: string;
    date: string;
    requiredLevel: RiderLevel;
  }>({
    search: "",
    date: new Date().toISOString().split("T")[0],
    requiredLevel: RiderLevel.ALL,
  });

  useEffect(() => {
    const fetchActivities = async () => {
      if (filters.search === "" || filters.search.length >= 3) {
        setIsLoading(true);
        const _activities = await findActivitiesByWeekWithFilters({
          search: filters.search,
          date: filters.date,
          requiredLevel: filters.requiredLevel,
          stableId,
        });
        if ("error" in _activities) {
          return;
        } else {
          console.log(_activities);
          const todayActivities = _activities.filter(
            (activity) =>
              new Date(activity.date).toISOString().split("T")[0] ===
              filters.date
          );
          const anonymizedActivities = anonymizeActivities(todayActivities);
          setActivities(anonymizedActivities);

          setIsLoading(false);
        }
      }
    };
    fetchActivities();
  }, [filters, stableId, now]);

  const handleNextDay = () => {
    const newDate = new Date(filters.date);
    newDate.setDate(newDate.getDate() + 1);
    console.log(newDate);
    setFilters({
      ...filters,
      date: newDate.toISOString().split("T")[0],
    });
  };

  const handlePreviousDay = () => {
    const newDate = new Date(filters.date);
    newDate.setDate(newDate.getDate() - 1);
    setFilters({
      ...filters,
      date: newDate.toISOString().split("T")[0],
    });
  };
  return (
    <div className="bg-white drop-shadow-2xl rounded">
      <section className="max-w-xl mx-auto space-y-4 py-4">
        <FilterForm filters={filters} setFilters={setFilters} />
        <section>
          <section className="flex items-center gap-2 py-1">
            {filters.search.length >= 3 && (
              <article className="flex items-center gap-2 bg-blue-400/20 rounded-full px-2 py-1 w-fit">
                <Search size={16} />
                <span className="capitalize text-sm">{filters.search}</span>
              </article>
            )}

            {filters.requiredLevel !== RiderLevel.ALL && (
              <article className="flex items-center gap-2 bg-amber-400/20 rounded-full px-2 py-1 w-fit">
                <IoMedalOutline size={16} />
                <span className="text-sm">
                  {riderLevelTransformer(filters.requiredLevel)}
                </span>
              </article>
            )}
          </section>
        </section>
      </section>
      <section className="bg-slate-100 py-8 space-y-4 rounded-b-lg">
        <section className="flex justify-center lg:grid lg:grid-cols-3 gap-2">
          <article className="flex md:justify-end items-center">
            <Button
              variant={"outline"}
              className="w-12 h-12"
              onClick={handlePreviousDay}
            >
              <ChevronLeft size={60} />
            </Button>
          </article>
          <article className="flex flex-col items-center justify-center p-4">
            <div
              role="status"
              aria-label={
                filters.date !== new Date().toISOString().split("T")[0]
                  ? `Date sélectionnée : ${new Date(
                      filters.date
                    ).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  : "Date sélectionnée : Aujourd'hui"
              }
              className={`flex items-center gap-3 rounded-xl px-6 py-3 shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary ${
                filters.date !== new Date().toISOString().split("T")[0]
                  ? "bg-green-500/20 text-green-900"
                  : "bg-amber-300/30 text-amber-900"
              }`}
            >
              <Clock size={18} className="shrink-0" aria-hidden="true" />
              <span className="capitalize text-lg font-medium tracking-wide">
                {filters.date !== new Date().toISOString().split("T")[0]
                  ? new Date(filters.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Aujourd'hui"}
              </span>
            </div>
            {filters.date !== new Date().toISOString().split("T")[0] && (
              <Button
                variant={"outline"}
                className="w-fit mt-2"
                size="sm"
                onClick={() => {
                  setFilters({
                    ...filters,
                    date: new Date().toISOString().split("T")[0],
                  });
                }}
              >
                <Calendar size={18} />
                <span className="text-sm">Aujourd&apos;hui</span>
              </Button>
            )}
          </article>
          <article className="flex justify-end md:justify-start items-center">
            <Button
              variant={"outline"}
              className="w-12 h-12"
              onClick={handleNextDay}
            >
              <ChevronRight size={60} />
            </Button>
          </article>
        </section>
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <>
            {activities.length > 0 && (
              <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-8">
                {activities.map((activity) => (
                  <ActivityCard
                    a={activity}
                    key={activity.id}
                    riderView
                    rider={rider}
                  />
                ))}
              </section>
            )}
            {activities.length === 0 && (
              <section className="flex justify-center items-center py-12">
                <p className="text-2xl italic bg-primary/20 px-10 py-4 text-gray-500 rounded-lg">
                  Aucune activité trouvée
                </p>
              </section>
            )}
          </>
        )}
      </section>
    </div>
  );
};
