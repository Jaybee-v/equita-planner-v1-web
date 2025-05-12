"use client";

import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { successSonnerVariant } from "@/lib/sonner-variants";
import Stable from "@/types/Stable";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import stableFormSchema from "../schemas/stableSchema";
import createStable from "../services/create-stable";

type StableFormProps = {
  stable?: Stable;
  userId: string;
};

export const StableForm = ({ stable, userId }: StableFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof stableFormSchema>>({
    resolver: zodResolver(stableFormSchema),
    defaultValues: {
      userId: userId,
      name: stable?.name || "",
      numStreet: stable?.numStreet.toString() || "",
      street: stable?.street || "",
      zip: stable?.zip || "",
      city: stable?.city || "",
      country: stable?.country || "France",
      phone: stable?.phone || "",
      website: stable?.website || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof stableFormSchema>) => {
    console.log(data);
    if (!stable) {
      const response = await createStable(data);
      console.log(response);
      // if ("error" in response) {
      // toast.error(response.error, {
      // ...errorSonnerVariant,
      // });
      // return;
      // }

      toast.success("Club créé avec succès", {
        ...successSonnerVariant,
      });
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <InputWithLabel
              required={true}
              label="Nom"
              field={field}
              placeholder="Ex: Les écuries de la Licorne"
            />
          )}
        />
        <section className="grid grid-cols-8 gap-2">
          <article className="col-span-2">
            <FormField
              control={form.control}
              name="numStreet"
              render={({ field }) => (
                <InputWithLabel
                  required={true}
                  label="N°"
                  field={field}
                  placeholder="200"
                />
              )}
            />
          </article>
          <article className="col-span-6">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <InputWithLabel
                  required={true}
                  label="Rue"
                  field={field}
                  placeholder="Ex: Avenue des Champs Elysées"
                />
              )}
            />
          </article>
        </section>
        <section className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <InputWithLabel
                required={true}
                label="Code postal"
                field={field}
                placeholder="Ex: 75000"
              />
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <InputWithLabel
                required={true}
                label="Ville"
                field={field}
                placeholder="Ex: Paris"
              />
            )}
          />
        </section>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <InputWithLabel
              required={true}
              label="Pays"
              field={field}
              placeholder="Ex: France"
            />
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <InputWithLabel
              required={true}
              label="Téléphone"
              field={field}
              placeholder="Ex: 06 06 06 06 06"
            />
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <InputWithLabel
              label="Site web"
              field={field}
              placeholder="Ex: https://www.lesecuriesdelalicorne.fr"
            />
          )}
        />
        <Button type="submit">
          <Save />
          {stable ? "Modifier" : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};
