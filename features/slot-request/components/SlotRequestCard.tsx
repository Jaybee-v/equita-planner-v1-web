"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Status } from "@/enums/Status";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import SlotRequest from "@/types/SlotRequest";
import { Ban, Check, Info, Mail, Medal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import updateSlotRequestStatus from "../services/update-slot-request-status";
import statusTranformer from "../utils/statusTranformer";

type SlotRequestCardProps = {
  slotRequest: SlotRequest;
  riderView?: boolean;
};

export const SlotRequestCard = ({
  slotRequest,
  riderView,
}: SlotRequestCardProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(Status.PENDING);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleUpdateSlotRequestStatus = async () => {
    const response = await updateSlotRequestStatus({
      slotRequestId: slotRequest.id,
      status,
    });

    if ("error" in response) {
      toast.error("Une erreur est survenue", {
        description: response.error,
        ...errorSonnerVariant,
      });
      return;
    }

    if ("message" in response) {
      toast.success("La demande a été mise à jour", {
        description: response.message,
        ...successSonnerVariant,
      });
    }
    router.refresh();
  };

  if (riderView) {
    return (
      <div className="border rounded-lg p-4 shadow bg-background drop-shadow-lg space-y-2">
        <h3 className="flex items-center  justify-center font-semibold">
          {slotRequest.stable.name}
        </h3>
        <p className="text-muted-foreground capitalize font-semibold">
          {new Date(slotRequest.preferredStartDate).toLocaleDateString(
            "fr-FR",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </p>
        <p className="text-center">
          {new Date(slotRequest.preferredStartDate).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(slotRequest.preferredEndDate).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p
          className={`${
            slotRequest.status === Status.PENDING
              ? "bg-slate-400 text-white opacity-70"
              : slotRequest.status === Status.APPROVED
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } py-2 px-4 rounded-lg text-center font-semibold italic tracking-wide text-sm`}
        >
          {statusTranformer(slotRequest.status)}
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 shadow bg-background">
      <article className="space-y-2">
        <h3>{slotRequest.rider.name}</h3>
        <p className="flex items-center gap-2">
          <Medal />
          {riderLevelTransformer(slotRequest.rider.level)}
        </p>
        <p className="text-muted-foreground capitalize font-semibold">
          {new Date(slotRequest.preferredStartDate).toLocaleDateString(
            "fr-FR",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </p>
        <p className="text-center">
          {new Date(slotRequest.preferredStartDate).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(slotRequest.preferredEndDate).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>{slotRequest.message}</p>
      </article>
      <section className="grid grid-cols-2 gap-4 py-2">
        <Button
          variant={"destructive"}
          type="button"
          onClick={() => {
            setStatus(Status.REJECTED);
            setIsOpenDialog(true);
          }}
        >
          <Ban />
          Non
        </Button>
        <Button
          variant={"success"}
          type="button"
          onClick={() => {
            setStatus(Status.APPROVED);
            setIsOpenDialog(true);
          }}
        >
          <Check />
          Oui
        </Button>
      </section>
      <Button variant={"outline"}>
        <Mail />
        Envoyer un message
      </Button>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            {status === Status.REJECTED ? (
              <DialogTitle className="flex items-center gap-2">
                <Ban />
                Refuser la demande
              </DialogTitle>
            ) : (
              <DialogTitle className="flex items-center gap-2">
                <Check />
                Accepter la demande
              </DialogTitle>
            )}
          </DialogHeader>
          <DialogDescription>
            Vous êtes sur le point de{" "}
            {status === Status.REJECTED ? "refuser" : "accepter"}
            la demande de {slotRequest.rider.name}.
          </DialogDescription>
          <section className="space-y-4">
            <Alert variant={"warning"}>
              <Info className="w-4 h-4" />
              <AlertTitle>Vérfier les informations</AlertTitle>
              <AlertDescription>
                Vérifiez les informations de la demande avant de confirmer ou
                refuser
              </AlertDescription>
            </Alert>
            <article className="flex flex-col justify-center items-center">
              <h4>
                {slotRequest.rider.name} {slotRequest.rider.familyName}
              </h4>
              <p className="text-muted-foreground capitalize font-semibold">
                {new Date(slotRequest.preferredStartDate).toLocaleDateString(
                  "fr-FR",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="text-muted-foreground ">
                <span className="">de </span>
                <span className="font-semibold capitalize">
                  {new Date(slotRequest.preferredStartDate).toLocaleString(
                    "fr-FR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>

                <span className=""> à </span>
                <span className="font-semibold capitalize">
                  {new Date(slotRequest.preferredEndDate).toLocaleString(
                    "fr-FR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </p>
            </article>
            {status === Status.REJECTED ? (
              <section>
                <p className="text-amber-600">
                  Vous êtes sur le point de refuser la demande de{" "}
                  {slotRequest.rider.name}.
                </p>
                <article className="grid grid-cols-2 gap-4">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setIsOpenDialog(false)}
                  >
                    <X /> Retour
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={handleUpdateSlotRequestStatus}
                  >
                    <Ban />
                    Refuser
                  </Button>
                </article>
              </section>
            ) : null}
            {status === Status.APPROVED ? (
              <section>
                <p className="text-muted-foreground">
                  Vous êtes sur le point d&apos;accepter la demande de{" "}
                  {slotRequest.rider.name}.
                </p>
                <article className="grid grid-cols-2 gap-4">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setIsOpenDialog(false)}
                  >
                    <X /> Retour
                  </Button>
                  <Button
                    variant={"success"}
                    onClick={handleUpdateSlotRequestStatus}
                  >
                    <Check />
                    Accepter
                  </Button>
                </article>
              </section>
            ) : null}
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};
