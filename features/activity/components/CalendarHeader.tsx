import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Stable from "@/types/Stable";
import { fr } from "date-fns/locale";
import { Calendar1Icon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { AddActivityButton } from "./AddActivityButton";
type CalendarHeaderProps = {
  date: Date;
  setDate: (date: Date) => void;
  week: Date[];
  stable: Stable;
};

export const CalendarHeader = ({
  date,
  setDate,
  week,
  stable,
}: CalendarHeaderProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const isToday = (day: Date) => {
    return day.toDateString() === new Date().toDateString();
  };

  return (
    <>
      <div className="sticky top-20 z-30 bg-white px-6 w-full">
        <div>
          <article className="grid lg:grid-cols-6 md:grid-cols-3 w-full gap-2 py-4 px-8">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <Calendar1Icon className={"size-4"} />
              <span>Selectionnez une date</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setDate(new Date())}
              className={`${
                isToday(date) ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              Aujourd&apos;hui
            </Button>
            <AddActivityButton stable={stable} />
          </article>
        </div>

        <section className="flex items-center w-full justify-between gap-2 px-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() - 7);
              setDate(newDate);
            }}
          >
            <ChevronLeft className={"size-4"} />
          </Button>

          <section className="grid grid-cols-7 w-full rounded-lg border-b">
            {week.map((day) => (
              <div
                key={day.toISOString()}
                className={`py-2 border-t  rounded-lg ${
                  day.getDate() === new Date().getDate()
                    ? "bg-sky-600 text-white"
                    : ""
                }`}
              >
                <p className="text-xs font-medium capitalize text-center">
                  {day.toLocaleDateString("fr-FR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            ))}
          </section>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() + 7);
              setDate(newDate);
            }}
          >
            <ChevronRight className={"size-4"} />
          </Button>
        </section>
      </div>
      {showCalendar && (
        <section
          className="flex justify-center items-center fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-screen w-screen bg-black/50 z-40"
          onClick={() => setShowCalendar(false)}
        >
          <section
            className="bg-white rounded-md relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => {
                setDate(day as Date);
                setShowCalendar(false);
              }}
              className="rounded-md w-fit border"
              locale={fr}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowCalendar(false)}
              className="absolute -top-6 -right-6"
            >
              <X className={"size-4"} color="red" />
            </Button>
          </section>
        </section>
      )}
    </>
  );
};
