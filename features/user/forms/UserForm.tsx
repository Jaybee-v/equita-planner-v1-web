"use client";

import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { UserRole } from "@/enums/UserRole";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import userFormSchema from "../schema/userFormSchema";
import createUser from "../services/create-user";

export const UserForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: null,
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      toast.error("Les mots de passe sont différents", {
        ...errorSonnerVariant,
      });
      return;
    }

    const response = await createUser(values);

    if ("error" in response) {
      toast.error(response.error, {
        ...errorSonnerVariant,
      });
      return;
    }

    toast.success("Compte créé avec succès", {
      ...successSonnerVariant,
    });
    form.reset();
    router.push("/auth/signin/success");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 && (
          <div>
            <section className="grid grid-cols-2 gap-4">
              <aside
                className={`border border-border rounded-md flex flex-col items-center justify-center gap-2 transition-all duration-300 p-4 cursor-pointer ${
                  form.watch("role") === UserRole.RIDER
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/20"
                }`}
                onClick={() => form.setValue("role", UserRole.RIDER)}
              >
                <Image
                  src="/svg/rider.svg"
                  alt="rider"
                  width={100}
                  height={100}
                />
                <h2 className="text-sm font-bold text-center">
                  Je suis cavalier
                </h2>
              </aside>
              <aside
                className={`border border-border rounded-md flex flex-col items-center justify-center cursor-pointer gap-2 transition-all duration-300 p-4 ${
                  form.watch("role") === UserRole.STABLE
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/20"
                }`}
                onClick={() => form.setValue("role", UserRole.STABLE)}
              >
                <Image
                  src="/svg/stable.svg"
                  alt="stable"
                  width={100}
                  height={100}
                />
                <h2 className="text-sm font-bold text-center">
                  Je gère un établissement équestre
                </h2>
              </aside>
            </section>
            <section className="flex justify-center items-center mt-6">
              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={form.watch("role") === null}
              >
                <Check /> Continuer
              </Button>
            </section>
          </div>
        )}
        {step === 2 && (
          <section className="space-y-2">
            <Button
              variant={"ghost"}
              type="button"
              size="icon"
              onClick={() => setStep(1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <InputWithLabel
                  label="Email"
                  placeholder="Email"
                  field={field}
                  required
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputWithLabel
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  type="password"
                  field={field}
                  required
                />
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <InputWithLabel
                  label="Confirmer le mot de passe"
                  placeholder="Confirmer le mot de passe"
                  type="password"
                  field={field}
                  required
                />
              )}
            />
            <Button type="submit" className="mt-2">
              <Save />
              Créer mon compte
            </Button>
          </section>
        )}
      </form>
    </Form>
  );
};
