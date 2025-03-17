import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form/form";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { Input } from "../input/input";
import clsx from "clsx";
import styles from "./new-password.module.css";
import { Button } from "../button/button";
import { NewPasswordSchema } from "../../features/auth/schemas/auth-schemas";
import { z } from "zod";

export const NewPasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useFormContext<z.infer<typeof NewPasswordSchema>>();

  const checkMatchingPassword = (password: string, confirmPassword: string) => {
    if (password === "" || confirmPassword === "") return false;
    return password === confirmPassword;
  };

  const passwordMatched = checkMatchingPassword(
    form.watch("password"),
    form.watch("confirmPassword")
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const checkStrength = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));
  };

  const strength = checkStrength(form.watch("password") || "");

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return styles.default;
    if (score <= 1) return styles.bad;
    if (score <= 2) return styles.medium;
    if (score === 3) return styles.almost;
    return styles.good;
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <>
      <FormField
        control={form.control}
        name="password"
        rules={{
          required: "Password is required",
          validate: (value) => {
            const strength = checkStrength(value);
            const score = strength.filter((req) => req.met).length;
            if (score < 4) {
              return "Password does not meet all requirements";
            }
            return true;
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Password <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <div className={styles.passwordContainer}>
              <div>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    size="large"
                  />
                </FormControl>
                <Button
                  htmlType="button"
                  type="text"
                  onClick={toggleShowPassword}
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

              {/* Password strength indicator */}
              <div
                className={styles.strengthIndicator}
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
              >
                <div
                  className={getStrengthColor(strengthScore)}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                />
              </div>

              {/* Password strength description */}
              <p className={styles.strengthDescription}>
                {getStrengthText(strengthScore)}. Must contain:
              </p>

              {/* Requirements list */}
              <ul className={styles.requirements}>
                {strength.map((req, index) => (
                  <li key={index}>
                    {req.met ? (
                      <Check size={16} className={styles.textSuccess} />
                    ) : (
                      <X size={16} className={styles.textNotMet} />
                    )}
                    <span
                      className={
                        req.met ? styles.textSuccess : styles.textNotMet
                      }
                    >
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div
                className={clsx(
                  styles.confirmPasswordLabel,
                  passwordMatched ? styles.textSuccess : ""
                )}
              >
                {passwordMatched ? "Password matches" : "Confirm password"}
                {passwordMatched ? <Check size={16} /> : null}
              </div>
            </FormLabel>

            <div className={styles.passwordContainer}>
              <div>
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    aria-invalid={
                      form.formState.errors.confirmPassword ? true : false
                    }
                    size="large"
                  />
                </FormControl>
                <Button
                  type="text"
                  htmlType="button"
                  onClick={toggleShowConfirmPassword}
                  className={styles.toggleVisibility}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm-password"
                      : "Show confirm-password"
                  }
                  icon={
                    showPassword ? (
                      <EyeOff size={16} strokeWidth={2} />
                    ) : (
                      <Eye size={16} strokeWidth={2} />
                    )
                  }
                />
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
