import { Dispatch, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormLabel } from "../form/form";
import styles from "./image-input.module.css";

export const ImageInput = ({
  imagePreview,
  setImagePreview,
  name,
  title,
}: {
  imagePreview: string | null;
  setImagePreview: Dispatch<React.SetStateAction<string | null>>;
  name: string;
  title: string;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext();

  return (
    <div>
      <FormLabel htmlFor={name}>{title}</FormLabel>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={imagePreview || "/placeholder.svg"} alt={name} />
        </div>

        <Controller
          name={name}
          control={form.control}
          render={(field) => (
            <div>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                className={styles.input}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const objectUrl = URL.createObjectURL(file);
                    setImagePreview(objectUrl);
                    form.setValue(name, file);
                  }
                }}
              />

              {field.fieldState.error && (
                <p className={styles.error}>{field.fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
