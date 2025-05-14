"use client";
import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { successSonnerVariant } from "@/lib/sonner-variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import publicUpdatePasswordFormSchema from "../schema/publicUpdatePasswordShema";
import resetPassword from "../services/reset-password";

type PublicUpdatePasswordFormProps = {
  token: string;
  refreshToken: string;
};

export const PublicUpdatePasswordForm = ({
  token,
  refreshToken,
}: PublicUpdatePasswordFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof publicUpdatePasswordFormSchema>>({
    resolver: zodResolver(publicUpdatePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof publicUpdatePasswordFormSchema>
  ) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    const response = await resetPassword({
      token,
      refreshToken,
      password,
    });

    if ("error" in response) {
      toast.error(response.error);
      return;
    } else {
      toast.success("Mot de passe mis à jour", {
        ...successSonnerVariant,
        description:
          "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe",
      });
      router.push("/auth/signin");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <InputWithLabel
              label="Mot de passe"
              required={true}
              placeholder="********"
              type="password"
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <InputWithLabel
              label="Confirmer le mot de passe"
              required={true}
              placeholder="********"
              type="password"
              field={field}
            />
          )}
        />
        <Button variant={"secondary"} type="submit">
          <Pen />
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Form>
  );
};
