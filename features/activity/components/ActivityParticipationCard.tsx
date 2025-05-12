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
import { ActivityType } from "@/enums/ActivityType";
import { RiderLevel } from "@/enums/RiderLevel";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import ActivityParticipant from "@/types/ActivityParticipant";
import { Ban, Calendar, Clock, Eye, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoMedalOutline } from "react-icons/io5";
import { TbHandClick } from "react-icons/tb";
import { toast } from "sonner";
import riderDeleteApply from "../services/rider-delete-apply";
import { activityTypeTransformer } from "../utils/activity-type-transformer";

type ActivityParticipationCardProps = {
  participation: ActivityParticipant;
  type: "validated" | "waiting" | "past";
};

export const ActivityParticipationCard = ({
  participation,
  type,
}: ActivityParticipationCardProps) => {
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  if (!participation.activity) {
    return null;
  }

  const a = participation.activity;

  const handleCancel = async () => {
    const request = await riderDeleteApply(participation.id);
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
      // router.refresh();
    }
  };

  return (
    <div className="bg-slate-200 rounded-lg p-4 relative min-w-[250px] shadow-md">
      <h3>{participation.activity?.title}</h3>
      <section className="flex justify-between items-center lg:absolute top-2 right-2 lg:grid gap-2 max-md:py-1">
        <article
          className={` ${
            a.type === ActivityType.PRIVATE
              ? "border-[#d97706] bg-[#d97706]/10"
              : a.type === ActivityType.PUBLIC
              ? "border-[#16a34a] bg-[#16a34a]/10"
              : a.type === ActivityType.EVENT
              ? "border-[#075985] bg-[#075985]/10"
              : a.type === ActivityType.STABLE_EVENT
              ? "border-[#8b5cf6] bg-[#8b5cf6]/10"
              : "border-[#636e72] bg-[#636e72]/10"
          } rounded-full px-2 py-1 text-xs shadow-md border-s-6 rounded-s-md hover:bg-primary/10 transition-all 
  duration-300 `}
        >
          <span>{activityTypeTransformer(a.type)}</span>
        </article>
        <section className="flex justify-end">
          <article
            className={`flex justify-end w-fit items-center gap-1 ${
              a.requiredLevel === RiderLevel.ALL
                ? " bg-[#636e72]/10"
                : " bg-[#8b5cf6]/10"
            } rounded-full px-2 py-1 text-xs shadow-md`}
          >
            <IoMedalOutline size={16} />
            <span className="text-[11px]">
              {riderLevelTransformer(a.requiredLevel)}{" "}
            </span>
          </article>
        </section>
      </section>
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
      <p className="text-xs">{a.description}</p>
      {type !== "past" && (
        <section className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => setOpenCancelDialog(true)}
          >
            <Ban size={16} />
            <span>Annuler</span>
          </Button>
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
          <Link href={`/app/activities/${a.id}`}>
            <Button variant="link" className="w-full">
              <Eye size={16} />
              <span>Détails</span>
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
};
