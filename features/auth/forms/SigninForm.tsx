"use client";

import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import signinSchema from "../schemas/signin.schema";
import { signin } from "../services/signin";

export default function SigninForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    console.log(values);
    const response = await signin(values);
    console.log(response);
    if ("error" in response) {
      toast.error(response.error, {
        description: "Vérifiez vos identifiants",
        ...errorSonnerVariant,
      });
      return;
    }
    const { user, rider, stable, instructor } = response;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (rider) {
      localStorage.setItem("rider", JSON.stringify(rider));
    }
    if (stable) {
      localStorage.setItem("stable", JSON.stringify(stable));
    }
    if (instructor) {
      localStorage.setItem("instructor", JSON.stringify(instructor));
    }
    toast.success("Connexion réussie", {
      description: "Vous êtes connecté avec succès",
      ...successSonnerVariant,
    });
    router.push("/app");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputWithLabel
              label="Adresse email"
              field={field}
              placeholder="Mon email de connexion"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <InputWithLabel
              label="Mot de passe"
              field={field}
              type={"password"}
              placeholder="Mon mot de passe"
            />
          )}
        />
        <section className="flex justify-end">
          <Link href="/auth/forgot-password">
            <Button variant="link" className="" size={"sm"}>
              <Key /> Mot de passe oublié ?
            </Button>
          </Link>
        </section>
        <Button type="submit">Se connecter</Button>
      </form>
    </Form>
  );
}
