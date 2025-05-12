"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RiderLevel, riderLevelOrder } from "@/enums/RiderLevel";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Activity from "@/types/Activity";
import Rider from "@/types/Rider";
import { Ban, Calendar, Check, Clock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbHandClick } from "react-icons/tb";
import { toast } from "sonner";
import applyActivity from "../services/apply-activity";
import riderDeleteApply from "../services/rider-delete-apply";

type RiderActivityMenuProps = {
  a: Activity;
  rider: Rider;
};

export const RiderActivityMenu = ({ a, rider }: RiderActivityMenuProps) => {
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const router = useRouter();

  const isOpenToMoreLevels =
    a.openToMoreLevel &&
    riderLevelOrder.indexOf(a.requiredLevel) <=
      riderLevelOrder.indexOf(rider.level) &&
    a.requiredLevel !== RiderLevel.ALL;
  const participants = a.participants?.length ?? 0;
  const isFull = a.maxParticipants && participants >= a.maxParticipants;
  const isApplied =
    a.participants &&
    a.participants.length > 0 &&
    a.participants.some((p) => p.riderId === rider.id);

  const participant = a.participants?.find((p) => p.riderId === rider.id);
  const handleApply = async () => {
    const request = await applyActivity({
      activityId: a.id,
      riderId: rider.id,
    });
    if ("error" in request) {
      toast.error(request.error, {
        ...errorSonnerVariant,
      });
      return;
    }
    toast.success("Inscription validée", {
      ...successSonnerVariant,
    });
    setOpenApplyDialog(false);
    router.refresh();
  };
  const handleCancel = async () => {
    if (isApplied && participant) {
      const request = await riderDeleteApply(participant.id);
      if ("error" in request) {
        toast.error(request.error, {
          ...errorSonnerVariant,
        });
        return;
      }
      if (request.success) {
        toast.success("Inscription annulée", {
          ...successSonnerVariant,
        });
        setOpenCancelDialog(false);
        router.refresh();
      }
    }
  };

  return (
    <div>
      <section>
        {!isApplied ? (
          <>
            {a.requiredLevel === rider.level ? (
              <Button type="button" onClick={() => setOpenApplyDialog(true)}>
                <TbHandClick />
                <span>Je m&apos;inscris</span>
              </Button>
            ) : a.openToMoreLevel &&
              riderLevelOrder.indexOf(a.requiredLevel) <
                riderLevelOrder.indexOf(rider.level) &&
              a.requiredLevel !== RiderLevel.ALL ? (
              <Button type="button" onClick={() => setOpenApplyDialog(true)}>
                <TbHandClick />
                <span>Je m&apos;inscris</span>
              </Button>
            ) : a.requiredLevel === RiderLevel.ALL ? (
              <Button type="button" onClick={() => setOpenApplyDialog(true)}>
                <TbHandClick />
                <span>Je m&apos;inscris</span>
              </Button>
            ) : (
              <Button variant={"outline"} disabled>
                <Ban />
                <span>Tu ne peux pas t&apos;inscrire</span>
              </Button>
            )}
          </>
        ) : (
          <section className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setOpenCancelDialog(true)}
            >
              <X />
              <span>J&apos;annule</span>
            </Button>
            <Button type="button" variant={"secondary"} disabled>
              <Check />
              <span>Je suis inscrit</span>
            </Button>
          </section>
        )}
      </section>
      <Dialog open={openApplyDialog} onOpenChange={setOpenApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Je m&apos;inscris à <span>{a.title}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            En t&apos;inscrivant à cette activité, ton inscription sera analysée
            par {rider.affiliationRequests[0].stable.name}. <br />
            Une notification te sera envoyée lorsque ton inscription sera
            validée.
          </DialogDescription>
          <section>
            <section className="flex items-center gap-1">
              <Calendar size={16} />
              <span className="capitalize font-semibold">
                {new Date(a.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </section>
            <section className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-xs">
                {new Date(a.startDate).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                -
                {new Date(a.endDate).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </section>
          </section>
          <section className="text-sm italic text-center bg-slate-100 p-2 rounded-md">
            {isOpenToMoreLevels && (
              <p>
                Cette activité est ouverte{" "}
                <span className="underline underline-offset-4">
                  à partir du{" "}
                  <span className="font-bold">
                    {riderLevelTransformer(a.requiredLevel)}
                  </span>
                </span>
              </p>
            )}
            {!isOpenToMoreLevels && (
              <p>
                Cette activité{" "}
                <span className="font-bold">
                  uniquement aux cavaliers ayant
                </span>{" "}
                <span className="font-bold">
                  {riderLevelTransformer(a.requiredLevel)}
                </span>
              </p>
            )}
          </section>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenApplyDialog(false)}
            >
              <X />
              <span>Annuler</span>
            </Button>
            <Button type="button" onClick={handleApply}>
              <TbHandClick />
              <span>Je valide</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
        <DialogContent className="bg-red-50">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              J&apos;annule <span>{a.title}</span>
            </DialogTitle>
            <DialogDescription className="text-red-400">
              Tu es sur le point d&apos;annuler ton inscription à cette
              activité.
              <br />
              Une fois ton inscription annulée, ta place sera libérée et un
              autre cavalier pourra s&apos;inscrire
            </DialogDescription>
          </DialogHeader>
          <section>
            <section className="flex items-center gap-1">
              <Calendar size={16} />
              <span className="capitalize font-semibold">
                {new Date(a.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </section>
            <section className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-xs">
                {new Date(a.startDate).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                -
                {new Date(a.endDate).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </section>
          </section>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenCancelDialog(false)}
            >
              <X />
              <span>Annuler</span>
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant={"destructive"}
            >
              <TbHandClick />
              <span>J&apos;annule mon inscription</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
