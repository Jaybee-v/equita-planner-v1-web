"use client";

import { InputWithLabel } from "@/components/shared/InputWithLabel";
import { TextareaWithLabel } from "@/components/shared/TextareaWithLabel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ActivityType } from "@/enums/ActivityType";
import { ActivityVisibility } from "@/enums/ActivityVisibility";
import { RiderLevel } from "@/enums/RiderLevel";
import { ValidationOption } from "@/enums/ValidationOption";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import {
  errorSonnerVariant,
  successSonnerVariant,
} from "@/lib/sonner-variants";
import Stable from "@/types/Stable";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import createActivityFormSchema from "../schema/createActivityFormSchema";
import createActivity from "../services/create-activity";
import { activityTypeTransformer } from "../utils/activity-type-transformer";
import { activityValidationOptionTransformer } from "../utils/activity-validation-option-transformer";

type CreateActivityFormProps = {
  stable: Stable;
  day: Date | null;
  hour: string | null;
  endHour: string | null;
  onSuccess: () => void;
};

export const CreateActivityForm = ({
  stable,
  day,
  hour,
  endHour,
  onSuccess,
}: CreateActivityFormProps) => {
  const [selectionMode, setSelectionMode] = useState("preset");

  // État local pour l'input personnalisé
  const [customValue, setCustomValue] = useState("");

  const form = useForm<z.infer<typeof createActivityFormSchema>>({
    resolver: zodResolver(createActivityFormSchema),
    defaultValues: {
      stableId: stable.id,
      title: "",
      description: "",
      date:
        day?.toISOString().split("T")[0] ||
        new Date().toISOString().split("T")[0],
      startDate: hour || new Date().toISOString().split("T")[1],
      endDate: endHour || new Date().toISOString().split("T")[1],
      type: ActivityType.PUBLIC,
      visibility: ActivityVisibility.PUBLIC,
      requiredLevel: RiderLevel.BEGINNER,
      maxParticipants: 10,
      validationParticipantOption: ValidationOption.AUTOMATIC,
      openToMoreLevel: true,
      instructorId: undefined,
      priceId: "",
    },
  });
  useEffect(() => {
    const maxParticipants = form.watch("maxParticipants");
    if (typeof maxParticipants === "string") {
      const value = parseInt(maxParticipants);
      if (value > 10) {
        setCustomValue(value.toString());
      }
    }
  }, [form]);

  const handleModeChange = (value: "preset" | "custom") => {
    setSelectionMode(value);

    // Réinitialiser la valeur du champ selon le mode
    if (value === "preset") {
      const value = form.watch("maxParticipants");
      if (value > 10) {
        setCustomValue(value.toString());
      }
    } else {
      form.setValue("maxParticipants", parseInt(customValue) || 11); // Valeur minimale pour custom
    }
  };

  // Gestionnaire pour le Select (valeurs préréglées 1-10)
  const handleSelectChange = (value: string) => {
    form.setValue("maxParticipants", parseInt(value));
  };

  // Gestionnaire pour l'Input (valeurs > 10)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomValue(value);

    // Mettre à jour le champ uniquement si c'est un nombre valide
    if (value && !isNaN(parseInt(value))) {
      form.setValue("maxParticipants", parseInt(value));
    }
  };

  async function onSubmit(values: z.infer<typeof createActivityFormSchema>) {
    console.log(values);
    const request = await createActivity(values);
    if ("error" in request) {
      toast.error(request.error, {
        ...errorSonnerVariant,
      });
      return;
    }
    if ("success" in request && request.success) {
      toast.success(request.message, {
        ...successSonnerVariant,
      });
      form.reset();
      onSuccess();
    }
    // console.log(request);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <InputWithLabel
              label="Titre"
              field={field}
              required={true}
              placeholder="Ex: Cours de CSO ou Concours à ..."
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextareaWithLabel
              label="Description"
              placeholder="Ex: Activité de préparation à un concours ou Activité ouverte à tous les niveaux"
              field={field}
              required={true}
            />
          )}
        />
        <section className="flex gap-2 w-full justify-between">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <InputWithLabel
                label="Date"
                value={field.value}
                field={field}
                type={"date"}
                required={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <InputWithLabel
                label="H début"
                value={field.value}
                field={field}
                type={"time"}
                required={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <InputWithLabel
                label="H fin"
                field={field}
                type={"time"}
                required={true}
              />
            )}
          />
        </section>
        <section className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  Type <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ActivityType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {activityTypeTransformer(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {form.watch("type") !== ActivityType.PRIVATE && (
            <FormField
              control={form.control}
              name="requiredLevel"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    Niveau requis <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionnez un type" />
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
          )}
        </section>
        <FormField
          control={form.control}
          name="priceId"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>
                Tarif <span className="text-red-600">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez un tarif" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stable.prices.map((price) => (
                    <SelectItem key={price.id} value={price.id}>
                      {price.price} €
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructorId"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Attribuer à un moniteur</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez un moniteur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stable.instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                      <section
                        className="h-6 w-6 rounded-full"
                        style={{
                          backgroundColor: instructor.color ?? "var(--border)",
                        }}
                      ></section>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {form.watch("type") !== ActivityType.PRIVATE && (
          <>
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Nombre de participants (max)</FormLabel>

                  <RadioGroup
                    value={selectionMode}
                    onValueChange={handleModeChange}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="preset" id="preset" />
                      <Label htmlFor="preset">
                        Choisir dans la liste (1-10)
                      </Label>
                    </div>

                    {selectionMode === "preset" && (
                      <div className="ml-6">
                        <Select
                          onValueChange={handleSelectChange}
                          value={field.value.toString()}
                          disabled={selectionMode !== "preset"}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Sélectionnez un nombre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from(
                              { length: 10 },
                              (_, index) => index + 1
                            ).map((value) => (
                              <SelectItem key={value} value={value.toString()}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">
                        Entrer un nombre personnalisé ({">"} 10)
                      </Label>
                    </div>

                    {selectionMode === "custom" && (
                      <div className="ml-6">
                        <Input
                          type="number"
                          min="11"
                          placeholder="Entrez un nombre supérieur à 10"
                          value={customValue}
                          onChange={handleInputChange}
                          disabled={selectionMode !== "custom"}
                        />
                      </div>
                    )}
                  </RadioGroup>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openToMoreLevel"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Ouvert aux niveaux supérieurs</FormLabel>
                    <FormDescription>
                      Les cavaliers de niveau supérieur à celui requis pourront
                      participer à l&apos;activité.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <section className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Non</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                      <span className="text-sm text-muted-foreground">Oui</span>
                    </section>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validationParticipantOption"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Validation des participants</FormLabel>
                    <FormDescription>
                      Choisissez comment les participants seront validés pour
                      cette activité.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <section className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {activityValidationOptionTransformer(
                          ValidationOption.MANUAL
                        )}
                      </span>
                      <Switch
                        checked={field.value === ValidationOption.AUTOMATIC}
                        onClick={() => {
                          field.onChange(
                            field.value === ValidationOption.AUTOMATIC
                              ? ValidationOption.MANUAL
                              : ValidationOption.AUTOMATIC
                          );
                        }}
                        aria-readonly
                      />
                      <span className="text-sm text-muted-foreground">
                        {activityValidationOptionTransformer(
                          ValidationOption.AUTOMATIC
                        )}
                      </span>
                    </section>
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit">
          <Save className="size-4 mr-2" />
          Créer
        </Button>
      </form>
    </Form>
  );
};
