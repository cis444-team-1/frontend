import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog/dialog";
// import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../button/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../form/form";
import { SimpleFormInput } from "../../form-inputs/simple-form-input";
import { TextAreaFormInput } from "../../form-inputs/textarea-input";
import { ImageInput } from "../../form-inputs/image-input";
// import { Alert, AlertDescription, AlertTitle } from "../../alert/alert";
import { ModalData } from "../../../context/modal-context";

import styles from "../styles/modal.module.css";
import { z } from "zod";
import { AudioUploadInput } from "../../form-inputs/audio-upload-input";
import { AudioUpload } from "../../../features/base/schemas/audio-upload-schema";
import { useCreateTrack } from "../../../api/tracks";
import { Alert, AlertDescription, AlertTitle } from "../../alert/alert";
import { AlertCircle } from "lucide-react";

export const MutateSong = ({
  data,
  onCancel,
}: {
  data: ModalData | null;
  onCancel: () => void;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const createTrack = useCreateTrack();

  const form = useForm<z.infer<typeof AudioUpload>>({
    resolver: zodResolver(AudioUpload),
    defaultValues: {
      audioSrc: null,
      title: "",
      description: "",
      imageSrc: null,
      artist: "",
      album: "",
    },
  });

  useEffect(() => {
    form.reset();
    setImagePreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (createTrack.isSuccess) onCancel();
  }, [createTrack.isSuccess, onCancel]);

  const onSubmit = (values: z.infer<typeof AudioUpload>) => {
    createTrack.mutate(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            {createTrack.isError && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{createTrack.error.error}</AlertDescription>
              </Alert>
            )}

            <AudioUploadInput />

            <ImageInput
              name="imageSrc"
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              title="Cover image"
            />

            <SimpleFormInput
              name="title"
              label="Title"
              placeholder="Enter song title"
              inputClassName={styles.formInputPlaceholder}
            />

            <TextAreaFormInput
              name="description"
              label="Description"
              placeholder="Enter playlist description"
            />

            <SimpleFormInput
              name="artist"
              label="Artist"
              placeholder="Enter artist"
              inputClassName={styles.formInputPlaceholder}
            />

            <SimpleFormInput
              name="album"
              label="Album"
              placeholder="Enter album"
              inputClassName={styles.formInputPlaceholder}
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
              loading={createTrack.isPending}
            >
              {/** If there is formData, then we are updating the song */}
              {data?.formData ? "Update" : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
