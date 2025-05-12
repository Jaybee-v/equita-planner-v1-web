import { TextareaHTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

type TextareaWithLabelProps = {
  label: string;
  required?: boolean;
  field: ControllerRenderProps<any, any>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaWithLabel = ({
  label,
  required,
  field,
  ...textareaProps
}: TextareaWithLabelProps) => {
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <Textarea {...field} {...textareaProps} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
