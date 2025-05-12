"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Stable from "@/types/Stable";
import { Pen } from "lucide-react";
import { useState } from "react";
import { StableForm } from "../forms/StableForm";
import { UploadImages } from "./UploadImages";

type StableDataCardProps = {
  stable: Stable;
};

export const StableDataCard = ({ stable }: StableDataCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informations sur votre compte</CardTitle>
      </CardHeader>
      <CardContent className="md:flex justify-between">
        <UploadImages
          logo={stable.logoUrl}
          images={[stable.picture1, stable.picture2, stable.picture3]}
          stableId={stable.id}
        />
        <section className="space-y-2">
          <article>
            <p className="text-sm font-medium">Nom</p>
            <p>{stable.name}</p>
          </article>
          <article>
            <p className="text-sm font-medium">Adresse</p>
            <p>
              {stable.numStreet} {stable.street}
            </p>
            <p>
              {stable.zip} {stable.city}
            </p>
          </article>
          <article>
            <p className="text-sm font-medium">Téléphone</p>
            <p>{stable.phone}</p>
          </article>
        </section>
        <section className="flex justify-end items-end">
          <Button variant={"secondary"} onClick={() => setIsEditing(true)}>
            <Pen className="size-4 mr-2" />
            Modifier mes informations
          </Button>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier mes informations</DialogTitle>
              </DialogHeader>
              <StableForm stable={stable} userId={stable.userId} />
            </DialogContent>
          </Dialog>
        </section>
      </CardContent>
    </Card>
  );
};
