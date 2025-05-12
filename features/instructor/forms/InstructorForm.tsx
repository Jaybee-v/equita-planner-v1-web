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
import { Gender } from "@/enums/Gender";
import {
  InstructorFormSchema,
  instructorFormSchema,
} from "@/features/instructor/schemas/instructorFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createInstructorForStable from "../services/create-instructor-for-stable";

type InstructorFormProps = {
  stableId?: string;
};

export const InstructorForm = ({ stableId }: InstructorFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof instructorFormSchema>>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      stableId: stableId,
      name: "",
      familyName: "",
      gender: Gender.N,
      phone: "",
      email: undefined,
      isIndependent: false,
      color: undefined,
    },
  });

  const onSubmit = async (values: InstructorFormSchema) => {
    console.log(values);
    const response = await createInstructorForStable(values);
    if ("error" in response) {
      toast.error("Une erreur est survenue", {
        description: response.error,
        ...errorSonnerVariant,
      });
      return;
    }
    toast.success("Nouveau moniteur créé", {
      description: `${response.instructor.name} ${response.instructor.familyName} a été créé avec succès`,
      ...successSonnerVariant,
    });
    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <FormField
          control={form.control}
          name="familyName"
          render={({ field }) => (
            <InputWithLabel label="Nom" field={field} required />
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <InputWithLabel label="Prénom" field={field} required />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputWithLabel label="Adresse email" field={field} required />
          )}
        />
        <section className="grid grid-cols-3 gap-4">
          <article className="col-span-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <InputWithLabel
                  label="Téléphone"
                  field={field}
                  required
                  className=""
                />
              )}
            />
          </article>
          <article>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Calendar size={18} />
                    Couleur
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Aucune" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="#dc2626">
                        <span className="h-6 w-6 bg-red-600"></span>
                      </SelectItem>
                      <SelectItem value="#facc15">
                        <span className="h-6 w-6 bg-yellow-400"></span>
                      </SelectItem>
                      <SelectItem value="#6ee7b7">
                        <span className="h-6 w-6 bg-emerald-300"></span>
                      </SelectItem>
                      <SelectItem value="#0ea5e9">
                        <span className="h-6 w-6 bg-sky-500"></span>
                      </SelectItem>
                      <SelectItem value="#7c3aed">
                        <span className="h-6 w-6 bg-violet-600"></span>
                      </SelectItem>
                      <SelectItem value="#c026d3">
                        <span className="h-6 w-6 bg-fuchsia-400"></span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </article>
        </section>
        <Button type="submit">
          <Save />
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};
