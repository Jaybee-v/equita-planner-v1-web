import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Rider from "@/types/Rider";
import { Pen, User } from "lucide-react";
import { riderLevelTransformer } from "../utils/rider-level-transformer";
import { AvatarFileUploader } from "./AvatarFileUploader";
type RiderDataCardProps = {
  rider: Rider;
  isEditable?: boolean;
};

export const RiderDataCard = ({
  rider,
  isEditable = false,
}: RiderDataCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {" "}
          <User className="size-6" />
          Informations personnelles
        </CardTitle>
      </CardHeader>
      <CardContent className="md:flex justify-between">
        <section className="space-y-2 grid grid-cols-2 gap-4">
          <AvatarFileUploader
            riderId={rider.id}
            image={rider.imageUrl !== "" ? rider.imageUrl : null}
          />
          <section>
            <article>
              <p className="text-sm font-medium">Nom et prénom</p>
              <p>
                {rider.familyName} {rider.name}
              </p>
            </article>
            <article>
              <p className="text-sm font-medium">Niveau équestre</p>
              <p>{riderLevelTransformer(rider.level)}</p>
            </article>
          </section>
        </section>
        <section className="flex justify-end items-end">
          {isEditable && (
            <Button variant={"secondary"}>
              <Pen className="size-4 mr-2" />
              Modifier mes informations
            </Button>
          )}
        </section>
      </CardContent>
    </Card>
  );
};
