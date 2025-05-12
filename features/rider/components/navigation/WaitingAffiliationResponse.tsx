import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StableImagesDisplayer } from "@/features/stable/components/StableImagesDisplayer";
import Rider from "@/types/Rider";
import { Ban } from "lucide-react";

type WaitingAffiliationResponseProps = {
  rider: Rider;
};

export const WaitingAffiliationResponse = ({
  rider,
}: WaitingAffiliationResponseProps) => {
  return (
    <Card className="bg-amber-100 border-2 border-amber-700 max-w-lg w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-amber-700">
          Ta demande pour rejoindre{" "}
          <span className="font-bold">
            {rider.affiliationRequests[0].stable.name}{" "}
          </span>
          est en attente
        </CardTitle>
        <CardDescription className="text-amber-700 text-sm italic">
          Demande envoyée le{" "}
          {new Date(
            rider.affiliationRequests[0].createdAt
          ).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="space-y-8">
          <article className="flex flex-col gap-2 leading-3">
            <span className="font-bold pb-2">
              {rider.affiliationRequests[0].stable.name}
            </span>
            <span>
              {rider.affiliationRequests[0].stable.numStreet}{" "}
              {rider.affiliationRequests[0].stable.street}
            </span>
            <span>
              {rider.affiliationRequests[0].stable.zip}{" "}
              {rider.affiliationRequests[0].stable.city}
            </span>
          </article>
          <StableImagesDisplayer
            images={[
              rider.affiliationRequests[0].stable.picture1,
              rider.affiliationRequests[0].stable.picture2,
              rider.affiliationRequests[0].stable.picture3,
            ]}
            name={rider.affiliationRequests[0].stable.name}
          />
        </section>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">
          <Ban />
          <span>Annuler ma demande</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
