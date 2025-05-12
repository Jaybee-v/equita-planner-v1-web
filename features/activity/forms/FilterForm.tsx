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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiderLevel } from "@/enums/RiderLevel";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { filterFormSchema } from "../schema/filterFormSchema";

type FilterFormProps = {
  filters: {
    search: string;
    date: string;
    requiredLevel: RiderLevel;
  };
  setFilters: (filters: {
    search: string;
    date: string;
    requiredLevel: RiderLevel;
  }) => void;
};

export const FilterForm = ({ filters, setFilters }: FilterFormProps) => {
  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: filters.search,
      date: new Date(filters.date).toISOString().split("T")[0],
      requiredLevel: filters.requiredLevel,
    },
  });

  const handleChange = (
    key: keyof z.infer<typeof filterFormSchema>,
    value: z.infer<typeof filterFormSchema>[typeof key]
  ) => {
    let formattedValue = value;
    if (key === "date" && value) {
      formattedValue = new Date(value).toISOString().split("T")[0];
    }
    form.setValue(key, formattedValue);
    setFilters({ ...filters, [key]: formattedValue });
  };

  const handleReset = () => {
    form.reset();
    setFilters({
      search: "",
      date: new Date().toISOString().split("T")[0],
      requiredLevel: RiderLevel.ALL,
    });
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-4">
        <section className="flex items-center justify-center gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => handleChange("search", e.target.value)}
                    placeholder="Rechercher une activité par mot-clé ou ..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button size={"icon"}>
            <Search />
          </Button>
        </section>
        <section className="flex items-end justify-center gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <InputWithLabel
                label="Date"
                field={field}
                required={false}
                type="date"
                className="w-fit"
                onChange={(e) => handleChange("date", e.target.value)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="requiredLevel"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Niveau requis</FormLabel>
                <Select
                  onValueChange={(value) =>
                    handleChange("requiredLevel", value)
                  }
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionne un niveau" />
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

          <Button
            variant={"outline"}
            onClick={() => handleReset()}
            type="button"
            className="w-fit"
          >
            <X /> <span>Réinitialiser</span>
          </Button>
        </section>
      </form>
    </Form>
  );
};
