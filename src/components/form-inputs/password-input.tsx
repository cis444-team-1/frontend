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
import { Button } from "../button/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordFormInput = ({
  name,
  placeholder,
  label,
  required = false,
  className,
  inputClassName,
  hideForgotPassword = false,
}: {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  hideForgotPassword?: boolean;
}) => {
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

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
            {!hideForgotPassword && (
              <a href="/auth/forgot-password" className={styles.forgotPassword}>
                Forgot your password?
              </a>
            )}
          </div>

          <FormControl>
            <div className={styles.passwordContainer}>
              <Input
                {...field}
                placeholder={placeholder}
                className={inputClassName}
                required={required}
                aria-invalid={form.formState.errors[name] ? "true" : "false"}
                size="large"
                type={showPassword ? "text" : "password"}
              />
              <Button
                htmlType="button"
                type="text"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={
                  showPassword ? (
                    <EyeOff size={16} strokeWidth={2} />
                  ) : (
                    <Eye size={16} strokeWidth={2} />
                  )
                }
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
