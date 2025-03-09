import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form/form";
import { Input } from "../input/input";
import styles from "./password.module.css";

export const PasswordFormInput = ({
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

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className={styles.passwordLabel}>
            <FormLabel>
              {label} {required && <span style={{ color: "red" }}>*</span>}
            </FormLabel>
            <a href="/auth/forgot-password" className={styles.forgotPassword}>
              Forgot your password?
            </a>
          </div>

          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className={inputClassName}
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={`${id}-description`}
              required={required}
              size="large"
              type="password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
