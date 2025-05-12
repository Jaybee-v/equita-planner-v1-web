"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserRole } from "@/enums/UserRole";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import createGuestAccountSchema from "../schema/create-guest-account";
import updateUserRole from "../services/update-user-role";

type GuestCreateAccountFormProps = {
  userId: string;
};

export const GuestCreateAccountForm = ({
  userId,
}: GuestCreateAccountFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createGuestAccountSchema>>({
    resolver: zodResolver(createGuestAccountSchema),
    defaultValues: {
      role: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof createGuestAccountSchema>) => {
    if (!values.role) {
      return;
    }
    const response = await updateUserRole({
      userId,
      role: values.role,
    });

    if ("error" in response) {
      toast.error(response.error, {
        ...errorSonnerVariant,
      });
      return;
    }

    toast.success("Bienvenue sur Equita-planner", {
      ...successSonnerVariant,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid grid-cols-2 gap-4">
          <aside
            className={`border border-border rounded-md flex flex-col items-center justify-center gap-2 transition-all duration-300 p-4 cursor-pointer ${
              form.watch("role") === UserRole.RIDER
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/20"
            }`}
            onClick={() => form.setValue("role", UserRole.RIDER)}
          >
            <Image src="/svg/rider.svg" alt="rider" width={100} height={100} />
            <h2 className="text-sm font-bold text-center">Je suis cavalier</h2>
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
          <Button disabled={form.watch("role") === null}>
            <Check /> Continuer
          </Button>
        </section>
      </form>
    </Form>
  );
};
