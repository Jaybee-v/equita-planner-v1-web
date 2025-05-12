"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { InstructorForm } from "../forms/InstructorForm";

type CreateInstructorDialogProps = {
  stableId: string;
};

export const CreateInstructorDialog = ({
  stableId,
}: CreateInstructorDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <Button onClick={() => setIsOpen(true)}>
        <PlusCircle />
        Créer un nouveau moniteur
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau moniteur</DialogTitle>
          </DialogHeader>
          <InstructorForm stableId={stableId} />
        </DialogContent>
      </Dialog>
    </section>
  );
};
