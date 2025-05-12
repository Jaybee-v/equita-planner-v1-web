"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Stable from "@/types/Stable";
import { CalendarPlus, Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityForm } from "../forms/CreateActivityForm";

type AddActivityButtonProps = {
  stable: Stable;
  isMenu?: boolean;
};

export const AddActivityButton = ({
  stable,
  isMenu,
}: AddActivityButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="">
      <Button onClick={() => setOpen(true)} className="">
        {isMenu ? (
          <CalendarPlus className="size-6" />
        ) : (
          <Plus className="size-6" />
        )}
        {!isMenu ? <span>Ajouter un créneau</span> : "Créer une activité"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Créer un créneau</DialogTitle>
            <DialogDescription>
              Créez un créneau pour ajouter une activité.
            </DialogDescription>
          </DialogHeader>
          <CreateActivityForm
            stable={stable}
            day={null}
            hour={null}
            endHour={null}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};
