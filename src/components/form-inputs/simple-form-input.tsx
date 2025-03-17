import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form/form";
import { Input } from "../input/input";

export const SimpleFormInput = ({
  name,
  label,
  required = false,
  className,
  placeholder,
  inputClassName,
}: {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className={inputClassName}
              size="large"
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
