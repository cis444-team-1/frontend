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
  id,
  name,
  placeholder,
  label,
  required = false,
  className,
  inputClassName,
}: {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}) => {
  const form = useFormContext();

  const emailType = name === "email" ? "email" : "text";

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
              placeholder={placeholder}
              className={inputClassName}
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={`${id}-description`}
              required={required}
              size="large"
              type={emailType}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
