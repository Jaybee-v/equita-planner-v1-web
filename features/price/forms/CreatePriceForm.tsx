"use client";

import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { TextareaWithLabel } from "@/components/shared/TextareaWithLabel";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Stable from "@/types/Stable";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import createPriceFormSchema from "../schemas/createPriceFormSchema";
import createPrice from "../services/create-price";

type CreatePriceFormProps = {
  stable: Stable;
};

export const CreatePriceForm = ({ stable }: CreatePriceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createPriceFormSchema>>({
    resolver: zodResolver(createPriceFormSchema),
    defaultValues: {
      label: "",
      price: "",
      description: "",
      stableId: stable.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof createPriceFormSchema>) => {
    setIsLoading(true);
    console.log(values);
    const response = await createPrice(values);
    console.log(response);
    if ("error" in response) {
      toast.error(response.error, {
        ...errorSonnerVariant,
      });
      setIsLoading(false);
      return;
    }
    toast.success(response.message, {
      ...successSonnerVariant,
    });

    form.reset();
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <InputWithLabel
              label="Nom du tarif"
              placeholder="Ex: Cours particulier - 1h"
              required
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextareaWithLabel
              label="Description"
              placeholder="Ex: Tarif de leçon particulière"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <InputWithLabel label="Prix (en €)" field={field} />
          )}
        />
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
          Nouveau tarif
        </Button>
      </form>
    </Form>
  );
};
