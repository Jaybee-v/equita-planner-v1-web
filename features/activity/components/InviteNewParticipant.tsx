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
import Rider from "@/types/Rider";
import { Plus, Send } from "lucide-react";
import { useState } from "react";

export const InviteNewParticipant = () => {
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<Rider[]>([]);

  return (
    <div>
      <Button onClick={() => setOpenInviteDialog(true)}>
        <Plus />
        Inviter un participant
      </Button>
      <Dialog open={openInviteDialog} onOpenChange={setOpenInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Sélectionner le ou les participants <br /> que vous souhaitez
              inviter
            </DialogTitle>
            <DialogDescription>
              Une fois votre liste prête, cliquez sur le bouton
              &quot;Inviter&quot;.
              <br />
              Les utilisateurs sélectionnés recevront un email avec le lien de
              l&apos;activité.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-3 gap-4">
            <Button variant="outline">Annuler</Button>
            <Button className="col-span-2">
              <Send />
              Inviter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
