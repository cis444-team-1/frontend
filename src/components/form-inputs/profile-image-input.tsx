import { Dispatch, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./profile-image-input.module.css";
import { FormLabel } from "../form/form";

export const ProfileImageInput = ({
  showLabel = true,
  imagePreview,
  setImagePreview,
}: {
  showLabel?: boolean;
  imagePreview: string | null;
  setImagePreview: Dispatch<React.SetStateAction<string | null>>;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext();

  return (
    <div>
      {showLabel && <FormLabel htmlFor="avatar">Profile image</FormLabel>}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={imagePreview || ""} alt="avatar" />
        </div>

        <Controller
          name="avatar"
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
                    form.setValue("avatar", file);
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
