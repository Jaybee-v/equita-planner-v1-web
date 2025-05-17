"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { errorSonnerVariant } from "@/lib/sonner-variants";
import Stable from "@/types/Stable";
import { Info } from "lucide-react";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { toast } from "sonner";
import { CreatePriceForm } from "../forms/CreatePriceForm";

type NoPriceDefineProps = {
  stable: Stable;
};

export const NoPriceDefine = ({ stable }: NoPriceDefineProps) => {
  const [isOpen, setIsOpen] = useState(stable.prices.length === 0);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() =>
        toast.error("Vous devez renseigner un tarif", {
          ...errorSonnerVariant,
          description:
            "Veuillez renseigner un tarif pour pouvoir commencer à gérer vos activités équestres",
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoWarning className="text-yellow-500" />
            Vous n&apos;avez pas encore renseigné de tarif
          </DialogTitle>
        </DialogHeader>

        <section className="space-y-4">
          <Alert>
            <Info />
            <AlertTitle>
              {" "}
              Pour débuter sur <span>Equita-Planner</span>, renseignez un tarif
            </AlertTitle>
            <AlertDescription>
              Vos tarifs seront par la suite consutables et mofifiables depuis
              la page &quot;Mes tarifs&quot;
            </AlertDescription>
          </Alert>
          <CreatePriceForm stable={stable} />
        </section>
      </DialogContent>
    </Dialog>
  );
};
