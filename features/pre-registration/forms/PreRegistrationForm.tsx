"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { preRegistrationFormSchema } from "../schemas/preRegistrationFormSchema";
import postPreRegistration from "../services/postPreRegistration";

export const PreRegistrationForm = () => {
  const form = useForm<z.infer<typeof preRegistrationFormSchema>>({
    resolver: zodResolver(preRegistrationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof preRegistrationFormSchema>
  ) => {
    console.log(values);
    const response = await postPreRegistration(values.email);
    console.log("RESPONSE WEB===", response);
    if ("error" in response) {
      toast.error("Une erreur est survenue", {
        description: response.error,
        ...errorSonnerVariant,
      });
      return;
    }

    toast.success("Votre inscription a été enregistrée", {
      ...successSonnerVariant,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex items-center gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input
                  placeholder="Votre email"
                  type="email"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-2 w-fit ">
          <Check size={30} />
          Je m&apos;inscris
        </Button>
      </form>
    </Form>
  );
};
