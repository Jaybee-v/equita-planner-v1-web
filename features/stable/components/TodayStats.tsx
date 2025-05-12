"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Activity from "@/types/Activity";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

type TodayStatsProps = {
  activities: Activity[];
  type: "today" | "week";
};

const chartConfig = {
  places: {
    label: "Places disponibles",
    color: "bg-blue-500",
  },
  registeredRiders: {
    label: "Cavaliers inscrits",
    color: "bg-red-500",
  },
} satisfies ChartConfig;

export const ActivitiesStatsChart = ({ activities, type }: TodayStatsProps) => {
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [totalRegisteredRiders, setTotalRegisteredRiders] = useState(0);

  useEffect(() => {
    const filterData = () => {
      const totalMaxParticipants = activities.reduce(
        (acc, activity) => acc + activity.maxParticipants,
        0
      );
      const totalRegisteredRiders = activities.reduce(
        (acc, activity) => acc + (activity.participants?.length ?? 0),
        0
      );
      setTotalPlaces(totalMaxParticipants);
      setTotalRegisteredRiders(totalRegisteredRiders);
    };
    filterData();
  }, [activities]);

  const data = [
    {
      name: "Places disponibles",
      value: totalPlaces,
    },
    {
      name: "Cavaliers inscrits",
      value: totalRegisteredRiders,
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold">
        Statistiques {type === "today" ? "du jour" : "de la semaine"}
      </h3>
      <section>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {(
                            (totalRegisteredRiders / totalPlaces) *
                            100
                          ).toFixed(1)}
                          %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          d&apos;inscription
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </section>
    </div>
  );
};
