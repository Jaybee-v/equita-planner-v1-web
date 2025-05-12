"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createSlotRequest from "../services/create-slot-request";

type SlotRequestFormProps = {
  stableId: string;
  riderId: string;
  preferredStartDate: Date;
  preferredEndDate: Date;
};

export const SlotRequestForm = ({
  stableId,
  riderId,
  preferredStartDate,
  preferredEndDate,
}: SlotRequestFormProps) => {
  const router = useRouter();

  const onSubmit = async () =>
    // data: z.infer<typeof createSlotRequestFormSchema>
    {
      console.log("Hello world");
      if (!stableId || !riderId || !preferredStartDate || !preferredEndDate) {
        toast.error("Veuillez remplir tous les champs", {
          ...errorSonnerVariant,
        });
        return;
      }

      const response = await createSlotRequest({
        stableId,
        riderId,
        preferredStartDate,
        preferredEndDate,
        message: "",
      });
      if ("error" in response) {
        console.error(response.error);
        toast.error(
          "Une erreur est survenue lors de la création de la réservation",
          {
            description: response.error,
            ...errorSonnerVariant,
          }
        );
      } else {
        console.log(response);
        toast.success("Réservation créée avec succès", {
          description:
            "Vous recevrez une notification lorsque votre réservation sera acceptée",
          ...successSonnerVariant,
        });

        router.push("/app");
      }
    };

  return (
    <div className="space-y-4">
      <section className="space-y-1">
        <Label>Message</Label>
        <Textarea
          placeholder="Message"
          className=" min-h-20"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />

        <p className="text-sm text-muted-foreground italic text-end">
          L&apos;ajout d&apos;un message est facultatif.
        </p>
      </section>

      <Button type="submit" onClick={onSubmit}>
        <Check />
        Confirmer ma réservation
      </Button>
    </div>
  );
};
