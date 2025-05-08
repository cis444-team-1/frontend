import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";
import { AlertCircle } from "lucide-react";
import { Label } from "../../label/label";
import { useEffect, useState } from "react";
import { Checkbox } from "../../checkbox/checkbox";
import { Button } from "../../button/button";
import { useForm } from "react-hook-form";
import { PlaylistSchema } from "../../../features/base/schemas/playlist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../../form/form";
import { SimpleFormInput } from "../../form-inputs/simple-form-input";
import { TextAreaFormInput } from "../../form-inputs/textarea-input";
import { ImageInput } from "../../form-inputs/image-input";
import { useCreatePlaylist } from "../../../api/playlist";
import { Alert, AlertDescription, AlertTitle } from "../../alert/alert";
import { ModalData } from "../../../context/modal-context";

import styles from "../styles/modal.module.css";

export const MutatePlaylist = ({
  data,
  onCancel,
}: {
  data: ModalData | null;
  onCancel: () => void;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const createPlaylist = useCreatePlaylist();

  const form = useForm<PlaylistSchema>({
    resolver: zodResolver(PlaylistSchema),
    defaultValues: {
      title: data?.formData?.title || "",
      description: data?.formData?.description || "",
      isPublic: data?.formData?.is_public || false,
      imageSrc: data?.formData?.image_src || null,
    },
  });

  useEffect(() => {
    form.reset();
    setImagePreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCreatePlaylist = (values: PlaylistSchema) => {
    createPlaylist.mutate(values);

    if (createPlaylist.isSuccess) onCancel();
  };

  return (
    <DialogContent className={styles.dialogContent}>
      <DialogHeader>
        <DialogTitle>
          <img src="/logo.png" alt="Melo" style={{ width: "2rem" }} />{" "}
          {data?.title || "Unknown Modal"}
        </DialogTitle>
        <DialogDescription>
          {data?.description || "This action cannot be undone"}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreatePlaylist)}>
          <div className={styles.formContainer}>
            {createPlaylist.isError && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {createPlaylist.error.error}
                </AlertDescription>
              </Alert>
            )}

            <ImageInput
              name="imageSrc"
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              title="Cover image"
            />

            <SimpleFormInput
              name="title"
              label="Title"
              placeholder="Enter playlist title"
              inputClassName={styles.formInputPlaceholder}
            />

            <TextAreaFormInput
              name="description"
              label="Description"
              placeholder="Add a playlist description"
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <div className={styles.optionsContainer}>
                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="isPublic"
                      checked={field.value}
                      onClick={() => {
                        field.onChange(!field.value);
                      }}
                    />
                    <Label
                      htmlFor="isPublic"
                      className={styles.checkboxLabel}
                      onClick={() => field.onChange(!field.value)}
                    >
                      Make playlist public
                    </Label>
                  </div>
                </div>
              )}
            />
          </div>

          <DialogFooter className={styles.footer}>
            <Button
              type="default"
              htmlType="button"
              size="medium"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              size="medium"
              loading={createPlaylist.isPending}
            >
              {/** If there is formData, then we are updating a playlist */}
              {data?.formData ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
