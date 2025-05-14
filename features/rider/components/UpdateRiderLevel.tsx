"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RiderLevel, riderLevelOrder } from "@/enums/RiderLevel";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Rider from "@/types/Rider";
import { Ban, Check, Medal } from "lucide-react";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { toast } from "sonner";
import updateRiderLevel from "../services/update-rider-level";
import { riderLevelTransformer } from "../utils/rider-level-transformer";

type UpdateRiderLevelProps = {
  rider: Rider;
};

export const UpdateRiderLevel = ({ rider }: UpdateRiderLevelProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<RiderLevel>(rider.level);

  const onSubmit = async () => {
    const response = await updateRiderLevel({
      riderId: rider.id,
      level: selectedLevel,
      riderLevel: rider.level,
    });

    if ("error" in response) {
      toast.error(response.error, {
        ...errorSonnerVariant,
      });
      return;
    }

    if (response.status === 200) {
      toast.success(response.message, {
        ...successSonnerVariant,
      });
      setIsOpenDialog(false);
      rider.level = selectedLevel;
    }
  };

  return (
    <div className="space-y-4">
      <section className="flex items-center justify-center gap-2">
        <Medal />
        <span>{riderLevelTransformer(rider.level)}</span>
      </section>
      {rider.level !== RiderLevel.GALOP_7 && (
        <section className="border p-4 w-fit mx-auto rounded shadow drop-shadow-md bg-white">
          <section>
            <section className="flex items-center justify-center gap-2">
              <span>Valider un galop</span>
              <Switch checked={isChecked} onCheckedChange={setIsChecked} />
            </section>
            <article className="text-sm text-gray-500">
              <p>
                Vous avez la possibilité de valider un galop pour votre
                cavalier.
              </p>
              <p>
                Il aura ainsi accès à des activités du niveau que vous lui
                attribuerez.
              </p>
            </article>
          </section>
          {isChecked && (
            <section className="flex items-center justify-center gap-2 pt-4">
              <Select
                value={selectedLevel}
                onValueChange={(value) => {
                  setSelectedLevel(value as RiderLevel);
                  setIsOpenDialog(true);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un galop" />
                </SelectTrigger>
                <SelectContent>
                  {riderLevelOrder.map((level) => {
                    if (
                      riderLevelOrder.indexOf(level) >
                      riderLevelOrder.indexOf(rider.level)
                    ) {
                      return (
                        <SelectItem key={level} value={level}>
                          {riderLevelTransformer(level)}
                        </SelectItem>
                      );
                    }
                  })}
                </SelectContent>
              </Select>
            </section>
          )}
        </section>
      )}
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Valider un galop</DialogTitle>
            <DialogDescription>
              Vous avez la possibilité de valider un galop pour votre cavalier.
            </DialogDescription>
          </DialogHeader>
          <section>
            <Alert variant={"warning"}>
              <IoWarning />
              <AlertTitle>
                Vous êtes sur le point de valider le{" "}
                {riderLevelTransformer(selectedLevel)} de {rider.name}
              </AlertTitle>
              <AlertDescription className="flex">
                Le niveau actuel de {rider.name} est
                <span className="font-semibold">
                  {riderLevelTransformer(rider.level)}
                </span>
                .
              </AlertDescription>
            </Alert>
            <section className="flex items-center justify-center gap-2 py-4">
              <IoWarning color="red" />
              <p className="text-sm text-amber-600 jc italic">
                Une fois que vous aurez validé, <br /> vous ne pourrez pas
                valider un galop inférieur.
              </p>
            </section>
          </section>
          <DialogFooter className="grid md:grid-cols-2 gap-2">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                setIsOpenDialog(false);
                setSelectedLevel(rider.level);
              }}
            >
              <Ban /> Annuler
            </Button>
            <Button
              variant={"success"}
              onClick={() => {
                onSubmit();
              }}
            >
              <Check />
              Valider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
