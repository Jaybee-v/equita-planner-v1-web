"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Status } from "@/enums/Status";
import updateAffiliationStatus from "@/features/affiliation-request/services/update-status";
import { RiderDataCard } from "@/features/rider/components/RiderDataCard";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import AffiliationRequest from "@/types/AffiliationRequest";
import { Ban, Check, Eye, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PendingRidersListProps {
  affiliations: AffiliationRequest[];
}

export const PendingRidersList = ({
  affiliations: receivedAffiliations,
}: PendingRidersListProps) => {
  const [affiliations, setAffiliations] =
    useState<AffiliationRequest[]>(receivedAffiliations);
  const [isOpenRider, setIsOpenRider] = useState(false);
  const [isOpenValidateDialog, setIsOpenValidateDialog] = useState(false);
  const [isOpenRefuseDialog, setIsOpenRefuseDialog] = useState(false);

  const handleRefuseAffiliation = async (affiliation: AffiliationRequest) => {
    const response = await updateAffiliationStatus(
      affiliation.id,
      Status.REJECTED
    );
    if ("error" in response) {
      toast.error(response.error, {
        ...errorSonnerVariant,
      });
      return;
    }
    toast.success(response.message, {
      ...successSonnerVariant,
    });
    reduceAffiliations(affiliation);
    setIsOpenRefuseDialog(false);
  };

  const handleValidAffiliation = async (affiliation: AffiliationRequest) => {
    const response = await updateAffiliationStatus(
      affiliation.id,
      Status.APPROVED
    );

    if ("error" in response) {
      toast.error(response.error, {
        ...errorSonnerVariant,
      });
      return;
    }

    toast.success(response.message, {
      ...successSonnerVariant,
    });

    reduceAffiliations(affiliation);
    setIsOpenValidateDialog(false);
  };

  const reduceAffiliations = (affiliation: AffiliationRequest) => {
    // ici je souhaite retiré l'affiliation de la liste

    const newData = affiliations.filter((a) => {
      if (a.id === affiliation.id) {
        return false;
      }
      return true;
    });

    setAffiliations(newData);
  };

  return (
    <Card
      className={`${
        affiliations.length > 0 ? "bg-amber-100 border-amber-100" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-amber-700">
          Demandes d&apos;adhésion en attente
        </CardTitle>
        <CardDescription>
          Vous avez {affiliations.length} demande
          {affiliations.length > 1 ? "s" : ""} en attente
        </CardDescription>
      </CardHeader>
      <CardContent>
        {affiliations.length > 0 ? (
          <>
            <section className="flex items-center justify-between ps-4 pe-1 pb-1">
              <p className="text-xs">Prénom - Nom</p>
              <article className="flex gap-3 text-xs">
                <p>Voir</p>
                <p>Refuser</p>
                <p>Accepter</p>
              </article>
            </section>
            <section>
              {affiliations.map((affiliation) => (
                <section
                  key={affiliation.id}
                  className="border px-4 py-2 rounded-md shadow-md flex items-center justify-between bg-gray-50"
                >
                  <p>
                    {affiliation.rider.name} {affiliation.rider.familyName}
                  </p>
                  <section className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsOpenRider(true)}
                    >
                      <Eye />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-red-500 text-white border-none hover:scale-110 transition-all duration-300 hover:bg-red-600 hover:text-white"
                      onClick={() => setIsOpenRefuseDialog(true)}
                    >
                      <Ban />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-green-500 text-white border-none hover:scale-110 transition-all duration-300 hover:bg-green-600 hover:text-white"
                      onClick={() => setIsOpenValidateDialog(true)}
                    >
                      <Check />
                    </Button>
                  </section>
                  {isOpenValidateDialog && (
                    <AlertDialog
                      open={isOpenValidateDialog}
                      onOpenChange={setIsOpenValidateDialog}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-green-600">
                            Accepter l&apos;adhésion de {affiliation.rider.name}{" "}
                            {affiliation.rider.familyName} ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {affiliation.rider.name} va être informé de cette
                            décision.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="grid grid-cols-3 gap-2">
                          <AlertDialogCancel className="">
                            <X />
                            <span>Annuler</span>
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-green-500 text-white border-none transition-all duration-300 hover:bg-green-600 hover:text-white col-span-2"
                            onClick={() => handleValidAffiliation(affiliation)}
                          >
                            <Check />
                            <span>Accepter</span>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {isOpenRefuseDialog && (
                    <AlertDialog
                      open={isOpenRefuseDialog}
                      onOpenChange={setIsOpenRefuseDialog}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-600">
                            Refuser l&apos;adhésion de {affiliation.rider.name}{" "}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Vous êtes sur le point de refuser l&apos;adhésion de{" "}
                            {affiliation.rider.name}{" "}
                            {affiliation.rider.familyName}.
                            <br />
                            Le cavalier va être informé de cette décision.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="grid grid-cols-3 gap-2">
                          <AlertDialogCancel className="">
                            <X />
                            <span>Annuler</span>
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 text-white border-none transition-all duration-300 hover:bg-red-600 hover:text-white col-span-2"
                            onClick={() => handleRefuseAffiliation(affiliation)}
                          >
                            <Ban />
                            <span>Refuser</span>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {isOpenRider && (
                    <Dialog open={isOpenRider} onOpenChange={setIsOpenRider}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Connaissez-vous {affiliation.rider.name}{" "}
                            {affiliation.rider.familyName} ?
                          </DialogTitle>
                        </DialogHeader>
                        <section>
                          <RiderDataCard rider={affiliation.rider} />
                        </section>
                        <DialogFooter className="grid grid-cols-3 gap-2">
                          <Button
                            variant={"outline"}
                            onClick={() => setIsOpenRider(false)}
                          >
                            <X />
                            <span>Fermer</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-red-500 text-white border-none transition-all duration-300 hover:bg-red-600 hover:text-white"
                            onClick={() => handleRefuseAffiliation(affiliation)}
                          >
                            <Ban />
                            <span>Refuser</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-green-500 text-white border-none transition-all duration-300 hover:bg-green-600 hover:text-white"
                            onClick={() => handleValidAffiliation(affiliation)}
                          >
                            <Check />
                            <span>Accepter</span>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </section>
              ))}
            </section>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
