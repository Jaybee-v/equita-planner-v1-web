"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { EmptySlotCard } from "../components/EmptySlotCard";
import { SlotRequestForm } from "../forms/SlotRequestForm";
import findEmptySlotsByStableIdBetweenDates from "../services/find-empty-slots-by-stable-id-between-dates";

type RiderSlotRequestViewPageProps = {
  params: {
    stableId: string;
    riderId: string;
  };
};

export const RiderSlotRequestViewPage = ({
  params,
}: RiderSlotRequestViewPageProps) => {
  const [emptySlots, setEmptySlots] = useState<
    {
      start: Date;
      end: Date;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [openEditSlotDialog, setOpenEditSlotDialog] = useState(false);

  useEffect(() => {
    const fetchEmptySlots = async () => {
      setIsLoading(true);
      const response = await findEmptySlotsByStableIdBetweenDates({
        stableId: params.stableId,
        date: selectedDate,
        period: "day",
      });
      if ("error" in response) {
        console.error(response.error);
      } else {
        setEmptySlots(response);
      }
      setIsLoading(false);
    };
    fetchEmptySlots();
  }, [selectedDate, params.stableId]);

  return (
    <div className="flex flex-col gap-4 justify-center h-full w-full">
      <section className="flex flex-col gap-2 justify-center items-center">
        <Label>Je choisis une date</Label>
        <Input
          type="date"
          className="w-fit mx-auto"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => {
            setSelectedDate(new Date(e.target.value));
          }}
          min={new Date().toISOString().split("T")[0]}
        />
      </section>
      <p className="text-sm text-muted-foreground">
        Voici les créneaux disponibles pour la journée du{" "}
        <span className="font-bold capitalize">
          {selectedDate.toLocaleString("fr-FR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "2-digit",
          })}
        </span>
        .
      </p>
      {isLoading ? (
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-muted-foreground">
            Nous recherchons les créneaux disponibles...
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {emptySlots.map((slot) => (
            <EmptySlotCard
              key={`${slot.start}-${slot.end}`}
              start={slot.start}
              end={slot.end}
              selected={selectedSlot}
              onClick={() => {
                setSelectedSlot(slot);
                setOpenEditSlotDialog(true);
              }}
            />
          ))}
        </section>
      )}
      {selectedSlot && (
        <Dialog
          open={openEditSlotDialog}
          onOpenChange={() => {
            setOpenEditSlotDialog(false);
            setSelectedSlot(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Je souhaite réserver mon créneau</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <section className="">
              <article className="space-y-4">
                <EmptySlotCard
                  start={selectedSlot!.start}
                  end={selectedSlot!.end}
                  selected={selectedSlot}
                  onClick={() => setSelectedSlot(null)}
                  isSelected={true}
                />
                <section className="flex justify-end">
                  <Button
                    variant="outline"
                    className="w-fit"
                    type="button"
                    onClick={() => {
                      setSelectedSlot(null);
                      setOpenEditSlotDialog(true);
                    }}
                  >
                    <Pencil />
                    Modifier
                  </Button>
                </section>
              </article>
              <SlotRequestForm
                stableId={params.stableId}
                riderId={params.riderId}
                preferredStartDate={selectedSlot.start}
                preferredEndDate={selectedSlot.end}
              />
            </section>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
