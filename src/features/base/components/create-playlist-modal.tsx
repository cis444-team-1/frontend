import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/dialog/dialog";
import { AlertCircle, Plus } from "lucide-react";
import styles from "../styles.module.css";
import { Label } from "../../../components/label/label";
import { useEffect, useState } from "react";
import { Checkbox } from "../../../components/checkbox/checkbox";
import { Button } from "../../../components/button/button";
import { useForm } from "react-hook-form";
import { PlaylistSchema } from "../schemas/playlist-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../../../components/form/form";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { TextAreaFormInput } from "../../../components/form-inputs/textarea-input";
import { ImageInput } from "../../../components/form-inputs/image-input";
import { useCreatePlaylist } from "../../../api/playlist";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/alert/alert";

export const CreatePlaylistModal = () => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const createPlaylist = useCreatePlaylist();

  const form = useForm<PlaylistSchema>({
    resolver: zodResolver(PlaylistSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: false,
      imageSrc: null,
    },
  });

  useEffect(() => {
    form.reset();
    setImagePreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCreatePlaylist = (values: PlaylistSchema) => {
    createPlaylist.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={styles.navItem}
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
        >
          <Plus size={18} className={styles.navIcon} />
          <span>Create Playlist</span>
        </div>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Create Playlist</DialogTitle>
          <DialogDescription>
            Create a new playlist to organize your music.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreatePlaylist)}>
            <div className={styles.formContainer}>
              {createPlaylist.isError && open && (
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
                placeholder="Add a playlist title"
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
                  e.preventDefault(); // prevent form submission
                  setOpen(false);
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
