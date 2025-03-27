import { Button } from "../../../components/button/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog/dialog";
import { useSession } from "../../../hooks/session-hook";
import { User } from "../../../types/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/form/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { TextAreaFormInput } from "../../../components/form-inputs/textarea-input";
import { ProfileImageInput } from "../../../components/form-inputs/profile-image-input";
import { useState } from "react";
import { ModalData } from "../../../context/modal-context";

import styles from "../styles/modal.module.css";
import { Switch } from "../../switch/switch";

const onboardingSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
  tags: z.array(
    z
      .string()
      .min(2, "Tag must be at least 2 characters")
      .max(50, "Tag must be less than 50 characters")
  ),
  avatar: z.instanceof(File).optional(),
  visibility: z.boolean(),
  isOnboarded: z.boolean(),
  role: z.enum(["user", "artist", "admin"]),
});

export const EditUser = ({ data }: { data: ModalData | null }) => {
  const { session } = useSession();
  const user: User = session?.user as User;
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: data?.formData.username || "",
      bio: data?.formData.bio || "",
      tags: data?.formData.tags || [],
      avatar: data?.formData.avatar || undefined,
      visibility: data?.formData.visibility || false,
      isOnboarded: data?.formData.is_onboarded || false,
      role: data?.formData.role || "user",
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    "/placeholder.svg"
  );

  if (!user || !session) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent className={styles.dialog}>
      <DialogHeader>
        <div className={styles.header}>
          <DialogTitle>
            <img src="/logo.png" alt="Melo" style={{ width: "2rem" }} />
            {data?.title || "Unknown Modal"}
          </DialogTitle>
        </div>
      </DialogHeader>

      <DialogDescription>
        {data?.description || "Unknown description"}
      </DialogDescription>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <ProfileImageInput
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />

          <SimpleFormInput
            name="username"
            placeholder="Enter your username"
            label="Username"
            required
          />

          <TextAreaFormInput
            name="bio"
            placeholder="Enter your bio"
            label="Bio"
            limit={200}
          />

          <SimpleFormInput
            name="tags"
            placeholder="Enter your tags"
            label="Tags"
          />

          <FormField
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Visibility</FormLabel>
                <FormControl>
                  <div className={styles.switchContainer}>
                    <p>Private</p>
                    <Switch value={field.value} onChange={field.onChange} />
                    <p>Public</p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="isOnboarded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Onboarded</FormLabel>
                <FormControl>
                  <div className={styles.switchContainer}>
                    <p>False</p>
                    <Switch value={field.value} onChange={field.onChange} />
                    <p>True</p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button htmlType="submit" size="medium" block>
            Update
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};
