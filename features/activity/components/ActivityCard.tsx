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
import { ActivityVisibility } from "@/enums/ActivityVisibility";
import { RiderLevel, riderLevelOrder } from "@/enums/RiderLevel";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Activity from "@/types/Activity";
import Rider from "@/types/Rider";
import {
  Ban,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  Eye,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMedalOutline } from "react-icons/io5";
import { MdEuro } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { toast } from "sonner";
import applyActivity from "../services/apply-activity";
import riderDeleteApply from "../services/rider-delete-apply";
import { activityTypeTransformer } from "../utils/activity-type-transformer";

type ActivityCardProps = {
  a: Activity;
  top?: number;
  height?: number;
  simple?: boolean;
  riderView?: boolean;
  rider?: Rider;
};

export const ActivityCard = ({
  a,
  riderView,
  top,
  height,
  simple,
  rider,
}: ActivityCardProps) => {
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const router = useRouter();
  if (riderView && rider) {
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
      <section className="relative w-full rounded-lg border shadow-md p-6 bg-white hover:bg-white transition-all duration-300">
        <section className="absolute top-2 right-2 grid gap-2">
          {a.visibility !== ActivityVisibility.PRIVATE && (
            <>
              {new Date(a.createdAt) <
                new Date(new Date().setDate(new Date().getDate() + 1)) && (
                <article className="bg-yellow-500 rounded-full w-fit mx-auto text-white px-4 py-1 text-xs shadow-md flex items-center gap-1 animate-pulse">
                  <Star size={16} />
                  Nouveau
                </article>
              )}
            </>
          )}
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
          {a.visibility !== ActivityVisibility.PRIVATE && (
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
                  {isOpenToMoreLevels ? " et +" : null}
                </span>
              </article>
            </section>
          )}
          {a.visibility !== ActivityVisibility.PRIVATE && (
            <section className="flex justify-end">
              <article
                className={`flex justify-end w-fit items-center gap-1 border rounded-full px-2 py-1 text-xs shadow-md`}
              >
                <MdEuro size={16} />
                <span className="text-[11px]">{a.price.price} €</span>
              </article>
            </section>
          )}
        </section>
        <div className="space-y-4">
          <h3>{a.title}</h3>
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
            {a.visibility !== ActivityVisibility.PRIVATE &&
              a.instructorId &&
              a.instructor && (
                <section className="flex items-center gap-1">
                  <TiUser size={20} />
                  <span className="text-xs text-muted-foreground">
                    {a.instructor.name}
                  </span>
                </section>
              )}
          </section>

          <p className="text-xs">{a.description}</p>
          {a.visibility !== ActivityVisibility.PRIVATE && (
            <section className="flex flex-col items-center gap-2">
              <article
                className={`flex items-center gap-1 ${
                  isFull ? "bg-red-500" : "bg-green-600"
                } rounded-full px-6 py-1 text-xs shadow-md w-fit mx-auto text-white`}
              >
                {isFull ? <Ban /> : <CheckCheck />}
                <span className="text-xs">
                  {isFull
                    ? "Complet"
                    : `${a.maxParticipants - participants} places restantes`}
                </span>
              </article>
              <Link href={`/app/activities/${a.id}`}>
                <Button variant={"link"}>
                  <Eye /> Détails
                </Button>
              </Link>
            </section>
          )}
          <section>
            {!isApplied ? (
              <>
                {a.requiredLevel === rider.level ? (
                  <Button
                    type="button"
                    onClick={() => setOpenApplyDialog(true)}
                  >
                    <TbHandClick />
                    <span>Je m&apos;inscris</span>
                  </Button>
                ) : a.openToMoreLevel &&
                  riderLevelOrder.indexOf(a.requiredLevel) <
                    riderLevelOrder.indexOf(rider.level) &&
                  a.requiredLevel !== RiderLevel.ALL ? (
                  <Button
                    type="button"
                    onClick={() => setOpenApplyDialog(true)}
                  >
                    <TbHandClick />
                    <span>Je m&apos;inscris</span>
                  </Button>
                ) : a.requiredLevel === RiderLevel.ALL ? (
                  <Button
                    type="button"
                    onClick={() => setOpenApplyDialog(true)}
                  >
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
                En t&apos;inscrivant à cette activité, ton inscription sera
                analysée par {rider.affiliationRequests[0].stable.name}. <br />
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
      </section>
    );
  }

  if (simple) {
    return (
      <Link
        href={`/app/activities/${a.id}`}
        className={`rounded px-2 py-1 flex flex-col gap-2 relative h-fit text-xs shadow-md border-s-6 rounded-s-md cursor-pointer hover:bg-primary/10 transition-all 
 duration-300 bg-white ${
   a.type === ActivityType.PRIVATE
     ? "border-[#d97706]"
     : a.type === ActivityType.PUBLIC
     ? "border-[#16a34a]"
     : a.type === ActivityType.EVENT
     ? "border-[#075985]"
     : a.type === ActivityType.STABLE_EVENT
     ? "border-[#8b5cf6]"
     : "border-[#636e72]"
 }`}
        style={{
          top: top ?? 0,
          height: height ?? 70,
        }}
      >
        <strong>{a.title}</strong>
        <p
          className="text-xs text-white absolute top-2 right-2 px-2 py-1 rounded-full "
          style={{ backgroundColor: a.instructor?.color ?? "var(--border)" }}
        >
          {a.instructor?.name}
        </p>
        <div className="text-[10px]">{a.description}</div>
        <article className="flex gap-2">
          <div className="text-[10px]">
            {new Date(a.startDate).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-[10px]">
            {new Date(a.endDate).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/app/activities/${a.id}`}
      className={`absolute left-0 right-0 mx-1 rounded px-2 py-1 text-xs shadow-md border-s-6 rounded-s-md cursor-pointer hover:bg-primary/10 transition-all 
 duration-300 bg-white ${
   a.type === ActivityType.PRIVATE
     ? "border-[#d97706]"
     : a.type === ActivityType.PUBLIC
     ? "border-[#16a34a]"
     : a.type === ActivityType.EVENT
     ? "border-[#075985]"
     : a.type === ActivityType.STABLE_EVENT
     ? "border-[#8b5cf6]"
     : "border-[#636e72]"
 }`}
      style={{
        top: top ?? 0,
        height: height ?? 0,
      }}
    >
      <strong>{a.title}</strong>
      <div className="text-[10px]">{a.description}</div>
      <article className="flex gap-2">
        <div className="text-[10px]">
          {new Date(a.startDate).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="text-[10px]">
          {new Date(a.endDate).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </article>
    </Link>
  );
};
