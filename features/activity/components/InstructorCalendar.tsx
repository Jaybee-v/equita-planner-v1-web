"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getWeekDates } from "@/lib/get-week";
import Activity from "@/types/Activity";
import Stable from "@/types/Stable";
import { useEffect, useState } from "react";
import { CreateActivityForm } from "../forms/CreateActivityForm";
import findActivitiesByInstructorIdAndWeek from "../services/find-by-instructor-id-week";
import { ActivityCard } from "./ActivityCard";
import { CalendarHeader } from "./CalendarHeader";
type InstructorCalendarProps = {
  activities: Activity[] | { error: string };
  date: Date;
  instructorId: string;
  stable: Stable;
};

export const InstructorCalendar = ({
  activities: thisWeekActivities,
  date,
  instructorId,
  stable,
}: InstructorCalendarProps) => {
  const [errorLoadingMessage, setErrorLoadingMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [week, setWeek] = useState<Date[]>(getWeekDates(date));
  const [isOpenAddActivity, setIsOpenAddActivity] = useState(false);
  const [dateSelection, setDateSelection] = useState<{
    date: Date;
    hour: string;
  } | null>(null);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate) return;
      const weekDates = getWeekDates(selectedDate);
      console.log(weekDates);

      if (weekDates.includes(selectedDate)) {
        console.log("INCLUS");
        if (thisWeekActivities && "error" in thisWeekActivities) {
          setErrorLoadingMessage(thisWeekActivities.error);
          setActivities([]);
        } else {
          setActivities(thisWeekActivities);
        }
      } else {
        const response = await findActivitiesByInstructorIdAndWeek({
          instructorId,
          date: selectedDate,
        });
        setActivities(response as Activity[]);
      }
      setWeek(weekDates);
    };
    fetchData();
  }, [date, instructorId, thisWeekActivities, selectedDate]);

  const renderActivities = (day: Date) => {
    const dayActivities = activities.filter((a) => {
      const activityDate = new Date(a.date);
      return (
        activityDate.getFullYear() === day.getFullYear() &&
        activityDate.getMonth() === day.getMonth() &&
        activityDate.getDate() === day.getDate()
      );
    });

    if (dayActivities.length === 0) return null;

    // On trie par début pour simplifier
    const sortedActivities = [...dayActivities].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const positionedActivities: {
      a: Activity;
      top: number;
      height: number;
      column: number;
      totalColumns: number;
    }[] = [];

    sortedActivities.forEach((activity) => {
      const start = new Date(activity.startDate);
      const end = new Date(activity.endDate);

      const startHour = start.getHours() + start.getMinutes() / 60;
      const endHour = end.getHours() + end.getMinutes() / 60;

      const top = (startHour - 6) * 96;
      const height = (endHour - startHour) * 96;

      // Cherche les activités qui se chevauchent avec celle-ci
      const overlapping = positionedActivities.filter((pa) => {
        const paStart = pa.top;
        const paEnd = pa.top + pa.height;
        return !(paEnd <= top || paStart >= top + height);
      });

      const column = overlapping.length; // Chaque chevauchement prend une colonne supplémentaire
      const totalColumns = Math.max(1, overlapping.length + 1);

      positionedActivities.push({
        a: activity,
        top,
        height,
        column,
        totalColumns,
      });
    });

    return positionedActivities.map(
      ({ a, top, height, column, totalColumns }) => {
        const width = 100 / totalColumns;
        const left = column * width;

        return (
          <div
            key={a.id}
            className="absolute p-0.5"
            style={{
              top,
              left: `${left}%`,
              width: `${width}%`,
              height,
            }}
          >
            <ActivityCard a={a} top={0} height={height} />
          </div>
        );
      }
    );
  };

  const handleCreateActivity = () => {
    window.location.reload();
    setIsOpenAddActivity(false);
  };

  if (!selectedDate) return null;

  return (
    <div className="w-full bg-white">
      <CalendarHeader
        date={selectedDate}
        setDate={setSelectedDate}
        week={week}
        stable={stable}
      />
      {errorLoadingMessage !== "" && <div>{errorLoadingMessage}</div>}
      <section className="flex items-center w-full justify-between gap-2 px-6 pt-6">
        <div className="size-9 px-4"></div>

        <section className="flex w-full">
          {/* Colonne des heures */}
          <div className="flex flex-col border-r border-gray-300">
            {Array.from({ length: 18 }).map((_, hour) => {
              return (
                <div key={hour} className={`h-24 relative`}>
                  <span className="text-xs text-gray-500 absolute -top-2 -left-6">
                    {hour + 6}:00
                  </span>
                </div>
              );
            })}
          </div>

          {/* Grille des jours */}
          <section className="grid grid-cols-7 w-full bg-gray-50">
            {week.map((day) => (
              <div key={day.toISOString()} className="flex flex-col relative">
                {Array.from({ length: 18 }).map((_, hour) => (
                  <section
                    key={day.toISOString() + hour}
                    className="group relative"
                  >
                    <div
                      className="h-24 border-b border-e border-gray-200 hover:shadow-sm cursor-pointer transition-all duration-300"
                      onClick={() => {
                        setDateSelection({
                          date: new Date(
                            new Date(day).setDate(new Date(day).getDate() + 1)
                          ),
                          hour: `${hour + 6}:00`,
                        });
                        setIsOpenAddActivity(true);
                      }}
                    />
                    <p
                      onClick={() => {
                        setDateSelection({
                          date: new Date(
                            new Date(day).setDate(new Date(day).getDate() + 1)
                          ),
                          hour: `${hour + 6}:00`,
                        });
                        setIsOpenAddActivity(true);
                      }}
                      className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block hidden transition-all duration-300 bg-green-50 text-green-600 px-2 py-1 rounded-md opacity-60 cursor-pointer"
                    >
                      Créer un créneau
                    </p>
                  </section>
                ))}
                {renderActivities(day)}
              </div>
            ))}
          </section>
        </section>

        <div className="size-9 px-4"></div>
      </section>
      <Dialog open={isOpenAddActivity} onOpenChange={setIsOpenAddActivity}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une activité</DialogTitle>
          </DialogHeader>
          <CreateActivityForm
            stable={stable}
            day={dateSelection?.date || null}
            hour={dateSelection?.hour || null}
            endHour={
              dateSelection?.hour
                ? `${parseInt(dateSelection.hour.split(":")[0]) + 1}:00`
                : null
            }
            onSuccess={handleCreateActivity}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
