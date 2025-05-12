"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import User from "@/types/User";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { GuestCreateAccountForm } from "../forms/GuestCreateAccountForm";

type GuestCreateAccountProps = {
  user: User;
};

export const GuestCreateAccount = ({ user }: GuestCreateAccountProps) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            Bienvenue sur <span>Equita-planner</span>
          </CardTitle>
          <CardDescription>
            <p>Vous venez de vous inscrire sur notre plateforme.</p>
            <p>Nous avons besoin d&apos;savoir plus sur vous.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <section className="flex flex-col gap-2 justify-center items-center">
                <p className="text-muted-foreground">Votre email</p>
                <p className="font-semibold">{user.email}</p>
              </section>
              <section className="w-fit mx-auto">
                <Button className="gap-2" onClick={() => setStep(2)}>
                  Passer à la suite
                  <ArrowRight />
                </Button>
              </section>
            </div>
          )}
          {step === 2 && (
            <div>
              <GuestCreateAccountForm userId={user.id} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
