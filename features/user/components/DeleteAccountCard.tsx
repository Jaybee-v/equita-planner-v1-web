"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertCircle, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
export const DeleteAccountCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full h-fit border-s-6 border-s-red-500">
      <CardHeader className="space-y-2">
        <CardTitle className="text-red-600 flex items-center gap-2">
          <Trash2 className="size-6" />
          Suppression du compte
        </CardTitle>
        <CardDescription>
          <Alert variant={"destructive"}>
            <AlertCircle />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              En supprimant votre compte, vous ne pourrez plus accéder à votre
              compte Equita-Planner et toutes les données associées à votre
              compte seront perdues.
            </AlertDescription>
          </Alert>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          variant={"destructive"}
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Trash />
          Supprimer mon compte
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-red-50">
            <DialogHeader>
              <DialogTitle className="text-red-600">
                Vous êtes sur le point de supprimer votre compte
              </DialogTitle>
              <DialogDescription>
                Cette action est irréversible. Cela supprimera définitivement
                votre compte et toutes les données associées à votre compte.
              </DialogDescription>
            </DialogHeader>
            <section className="space-y-2">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant={"destructive"}
                className="w-full"
                disabled={password.length < 3}
              >
                <Trash />
                Supprimer mon compte
              </Button>
            </section>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
