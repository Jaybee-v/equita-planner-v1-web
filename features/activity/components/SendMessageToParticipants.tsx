"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export const SendMessageToParticipants = () => {
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpenMessageDialog(true)} className="w-full">
        <MessageCircle />
        Envoyer un message aux participants
      </Button>
      <Dialog open={openMessageDialog} onOpenChange={setOpenMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un message aux participants</DialogTitle>
          </DialogHeader>
          <section className="space-y-4">
            <Input placeholder="Titre de votre message" />
            <Textarea
              placeholder="Saisissez votre message"
              className="min-h-40"
            />
          </section>
          <DialogFooter className="grid grid-cols-3 gap-4">
            <Button variant="outline">Annuler</Button>
            <Button className="col-span-2">
              <Send />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
