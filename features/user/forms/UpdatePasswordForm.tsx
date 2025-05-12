"use client";
import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import User from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import updatePasswordSchema from "../schema/updatePasswordSchema";
import updatePassword from "../services/update-password";

type UpdatePasswordFormProps = {
  user: User;
};

export const UpdatePasswordForm = ({ user }: UpdatePasswordFormProps) => {
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      userId: user.id,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    const response = await updatePassword(data);

    if ("error" in response) {
      toast.error(response.error);
      return;
    } else {
      toast.success(response.message);
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
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
};
