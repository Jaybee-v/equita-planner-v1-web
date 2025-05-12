"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RiderLevel, riderLevelOrder } from "@/enums/RiderLevel";
import Rider from "@/types/Rider";
import { Medal } from "lucide-react";
import { useState } from "react";
import { riderLevelTransformer } from "../utils/rider-level-transformer";

type UpdateRiderLevelProps = {
  rider: Rider;
};

export const UpdateRiderLevel = ({ rider }: UpdateRiderLevelProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <section className="flex items-center gap-2">
        <Medal />
        <span>{riderLevelTransformer(rider.level)}</span>
      </section>
      {rider.level !== RiderLevel.GALOP_7 && (
        <>
          <section className="flex items-center gap-2">
            <span>Valider un galop</span>
            <Switch checked={isChecked} onCheckedChange={setIsChecked} />
          </section>
          {isChecked && (
            <section className="flex items-center gap-2">
              <Select>
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
        </>
      )}
    </div>
  );
};
