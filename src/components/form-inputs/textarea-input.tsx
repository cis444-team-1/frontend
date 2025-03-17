import { FormControl, FormField, FormItem, FormLabel } from "../form/form";
import { Textarea } from "../textarea/textarea";
import { useFormContext } from "react-hook-form";
import styles from "./textarea-input.module.css";

export const TextAreaFormInput = ({
  name,
  placeholder,
  label,
  required = false,
  limit = 250,
}: {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  limit?: number;
}) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={styles.item}>
          <FormLabel>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </FormLabel>
          <FormControl className={styles.control}>
            <div className={styles.container}>
              <Textarea
                className={styles.textarea}
                placeholder={placeholder}
                maxLength={limit}
                {...field}
              />
              <p role="region" aria-live="polite">
                {field.value
                  ? `${field.value.length} / ${limit}`
                  : `0 / ${limit}`}
              </p>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
