"use client";

import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/enums/Gender";
import { RiderLevel } from "@/enums/RiderLevel";
import { logout } from "@/lib/cookies";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import riderFormSchema from "../schemas/riderFormSchema";
import createRider from "../services/create-rider";
import { riderLevelTransformer } from "../utils/rider-level-transformer";

type RiderFormProps = {
  userId: string;
  creation?: boolean;
};
export const RiderForm = ({ userId, creation = false }: RiderFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof riderFormSchema>>({
    resolver: zodResolver(riderFormSchema),
    defaultValues: {
      userId: userId,
      name: "",
      familyName: "",
      level: RiderLevel.BEGINNER,
      gender: Gender.N,
    },
  });

  const onSubmit = async (values: z.infer<typeof riderFormSchema>) => {
    console.log(values);
    if (creation) {
      const response = await createRider(values);
      if ("error" in response) {
        toast.error(response.error, {
          ...errorSonnerVariant,
        });
        return;
      }
      toast.success("Félicitations !", {
        description: "Ton compte a été créé avec succès",
        ...successSonnerVariant,
      });
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <section className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputWithLabel
                label="Prénom"
                placeholder="Prénom"
                field={field}
                required
              />
            )}
          />
          <FormField
            control={form.control}
            name="familyName"
            render={({ field }) => (
              <InputWithLabel
                label="Nom"
                placeholder="Nom"
                field={field}
                required
              />
            )}
          />
        </section>

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Niveau requis</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionne ton niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RiderLevel).map((level) => (
                    <SelectItem key={level} value={level}>
                      {riderLevelTransformer(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex justify-evenly space-y-1"
                >
                  <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Gender.N} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <section className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                        <X className="h-10 w-10" color="red" />
                      </section>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Gender.M} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <section className=" rounded-full bg-gray-300">
                        <Image
                          src="/svg/boy.svg"
                          alt="male"
                          width={24}
                          height={24}
                          className="h-20 w-20"
                        />
                      </section>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Gender.F} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <section className="rounded-full bg-gray-300">
                        <Image
                          src="/svg/girl.svg"
                          alt="female"
                          width={24}
                          height={24}
                          className="h-20 w-20"
                        />
                      </section>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {creation && (
          <section className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={async () => logout()}
            >
              <X />
              <span>Annuler</span>
            </Button>
            <Button>
              <span>Passer à l&apos;étape suivante</span> <ChevronRight />
            </Button>
          </section>
        )}
      </form>
    </Form>
  );
};
