"use client";
import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { WelcomeHeader } from "@/components/shared/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormDescription, FormField } from "@/components/ui/form";
import forgotPasswordSchema from "@/features/auth/schemas/forgot-password.schema";
import requestResetPassword from "@/features/auth/services/request-reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log(values);
    const request = await requestResetPassword(values.email);

    if (request.success) {
      toast.success("Un lien de réinitialisation a été envoyé à votre email");
      form.reset();
    } else {
      toast.error(
        "Une erreur est survenue lors de la demande de réinitialisation"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 max-w-4xl mx-auto gap-4">
      <WelcomeHeader
        isForgotPasswordPage
        auth={{ user: null, rider: null, instructor: null, stable: null }}
      />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mot de passe oublié</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <InputWithLabel label="Email" type="email" field={field} />
                )}
              />
              <FormDescription>
                Entrez votre adresse email pour recevoir un lien de
                réinitialisation
              </FormDescription>
              <section className="flex justify-end">
                <Button type="submit" className="w-fit">
                  <Key /> Recevoir le lien
                </Button>
              </section>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
