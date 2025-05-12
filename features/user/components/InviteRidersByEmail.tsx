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
import { Input } from "@/components/ui/input";
import { Info, Plus, Send, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export const InviteRidersByEmail = () => {
  const [isOpenInviteRidersByEmailDialog, setIsOpenInviteRidersByEmailDialog] =
    useState(false);
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }, [email]);
  return (
    <section>
      <Button onClick={() => setIsOpenInviteRidersByEmailDialog(true)}>
        <Send />
        Inviter des cavaliers
      </Button>
      <Dialog
        open={isOpenInviteRidersByEmailDialog}
        onOpenChange={setIsOpenInviteRidersByEmailDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inviter des cavaliers</DialogTitle>
            <DialogDescription>
              Vous avez la possibilité d&apos;inviter vos cavaliers à vous
              rejoindre sur <br />{" "}
              <span className="font-bold">Equita-Planner</span> afin qu&apos;ils
              bénéficient de la plateforme.
            </DialogDescription>
          </DialogHeader>
          <Alert variant={"warning"}>
            <Info className="h-4 w-4" />
            <AlertTitle>
              Vous ne pouvez pas inviter plus de 6 cavaliers
            </AlertTitle>
            <AlertDescription>
              Pour inviter plus de 6 cavaliers, vous devez renouveler
              l&apos;opération
            </AlertDescription>
          </Alert>
          <section className="flex flex-col gap-2">
            <section className="relative">
              <Input
                type="email"
                placeholder="Email du cavalier"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailList.length >= 6}
              />
              {isValidEmail && (
                <section className="flex gap-2 absolute right-2 top-1/2 -translate-y-1/2">
                  <Button className="bg-red-600 hover:bg-red-700" size="icon">
                    <Trash />
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    size="icon"
                    onClick={() => {
                      setEmailList([...emailList, email]);
                      setEmail("");
                    }}
                  >
                    <Plus />
                  </Button>
                </section>
              )}
            </section>
            <Button disabled={emailList.length === 0}>Inviter</Button>
            <section className="grid grid-cols-2 gap-2">
              {emailList.map((email) => (
                <section
                  key={email}
                  className="border border-gray-300 rounded-md p-2 text-center relative flex items-center justify-between"
                >
                  <p>{email}</p>
                  <Button
                    className="bg-red-600 h-fit w-fit hover:bg-red-700"
                    type="button"
                    onClick={() => {
                      setEmailList(emailList.filter((e) => e !== email));
                    }}
                  >
                    <Trash />
                  </Button>
                </section>
              ))}
            </section>
          </section>
        </DialogContent>
      </Dialog>
    </section>
  );
};
