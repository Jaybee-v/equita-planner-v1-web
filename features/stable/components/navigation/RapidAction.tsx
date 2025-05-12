"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddActivityButton } from "@/features/activity/components/AddActivityButton";
import Stable from "@/types/Stable";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaHorseHead } from "react-icons/fa";

type StableRapidActionProps = {
  stable: Stable;
};

export const StableRapidAction = ({ stable }: StableRapidActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="block lg:hidden  absolute top-4 right-4 z-50">
      <Button className="w-fit" onClick={() => setIsOpen(true)}>
        <Plus />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actions rapides</DialogTitle>
          </DialogHeader>
          <section className="">
            <section className="grid gap-4">
              <AddActivityButton stable={stable} isMenu />
              <Link href="/app/riders">
                <Button>
                  <FaHorseHead />
                  Gérer mes cavaliers
                </Button>
              </Link>
              <Link href="/app/notifications">
                <Button>
                  <Bell />
                  Mes notifications
                </Button>
              </Link>
            </section>
          </section>
        </DialogContent>
      </Dialog>
    </section>
  );
};
