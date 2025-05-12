import { InputHTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type InputWithLabelProps = {
  label: string;
  required?: boolean;
  field: ControllerRenderProps<any, any>;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = ({
  label,
  field,
  required = false,
  ...inputProps
}: InputWithLabelProps) => {
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <Input {...field} {...inputProps} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
