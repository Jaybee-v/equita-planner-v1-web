import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type EmptySlotCardProps = {
  start: Date;
  end: Date;
  selected: {
    start: Date;
    end: Date;
  } | null;
  onClick: () => void;
  isSelected?: boolean;
};

export const EmptySlotCard = ({
  start,
  end,
  selected,
  onClick,
  isSelected,
}: EmptySlotCardProps) => {
  return (
    <div className="bg-slate-100 p-4 rounded-lg shadow-md h-fit">
      <p className="capitalize text-sm font-semibold">
        {new Date(start).toLocaleString("fr-FR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "2-digit",
        })}
      </p>
      <section className="flex gap-2 text-sm text-muted-foreground">
        <p>
          {new Date(start).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          {new Date(end).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </section>
      {!isSelected && (
        <section className="flex justify-end">
          <Button
            className="w-fit h-fit"
            disabled={!!selected}
            onClick={onClick}
          >
            <PlusCircle />
            Réserver
          </Button>
        </section>
      )}
    </div>
  );
};
