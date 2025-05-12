"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectRiderLevelRequestForNotification } from "@/enums/SelectRiderLevelRequest";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import Activity from "@/types/Activity";
import { Send } from "lucide-react";
import { useState } from "react";
import sendNotificationToRiders from "../services/send-notification-to-riders";

type InviteAllRidersProps = {
  activity: Activity;
};

export const InviteAllRiders = ({ activity }: InviteAllRidersProps) => {
  const [selectedRiderLevel, setSelectedRiderLevel] =
    useState<SelectRiderLevelRequestForNotification>(
      SelectRiderLevelRequestForNotification.ALL_RIDERS
    );
  const [openInviteAllRidersDialog, setOpenInviteAllRidersDialog] =
    useState(false);

  const handleSubmit = async () => {
    const request = await sendNotificationToRiders({
      activityId: activity.id,
      stableId: activity.stableId,
      riderLevel: selectedRiderLevel,
    });

    console.log(request);
  };

  return (
    <div>
      <Button onClick={() => setOpenInviteAllRidersDialog(true)}>
        <Send />
        Inviter tous mes cavaliers
      </Button>
      <Dialog
        open={openInviteAllRidersDialog}
        onOpenChange={setOpenInviteAllRidersDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Vous souhaitez inviter tous vos cavaliers ?
            </DialogTitle>
            <DialogDescription>
              Nous automatisons la sélection des cavaliers qui peuvent
              participer à l&apos;activité.
            </DialogDescription>
          </DialogHeader>
          <section>
            <h3>Cavaliers qui peuvent participer</h3>
            <RadioGroup defaultValue="all-riders">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="all-riders"
                  id="all-riders"
                  checked={selectedRiderLevel === "all-riders"}
                  onClick={() =>
                    setSelectedRiderLevel(
                      SelectRiderLevelRequestForNotification.ALL_RIDERS
                    )
                  }
                />
                <Label htmlFor="all-riders">Tous les cavaliers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="required-level"
                  id="required-level"
                  checked={selectedRiderLevel === "required-level"}
                  onClick={() =>
                    setSelectedRiderLevel(
                      SelectRiderLevelRequestForNotification.REQUIRED_LEVEL
                    )
                  }
                />
                <Label htmlFor="required-level">
                  Uniquement les cavaliers{" "}
                  {riderLevelTransformer(activity.requiredLevel)}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="required-level-and-above"
                  id="required-level-and-above"
                  checked={selectedRiderLevel === "required-level-and-above"}
                  onClick={() =>
                    setSelectedRiderLevel(
                      SelectRiderLevelRequestForNotification.REQUIRED_LEVEL_AND_ABOVE
                    )
                  }
                />
                <Label htmlFor="required-level-and-above">
                  Tous les cavaliers de niveau{" "}
                  {riderLevelTransformer(activity.requiredLevel)} et au dessus
                </Label>
              </div>
            </RadioGroup>
          </section>
          <DialogFooter className="grid grid-cols-3 gap-4">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button className="col-span-2" onClick={handleSubmit}>
              <Send />
              Inviter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
