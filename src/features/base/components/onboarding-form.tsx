import { Button } from "../../../components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/dialog/dialog";
import { useSession } from "../../../hooks/session-hook";
import supabase from "../../../supabase";
import { User } from "../../../types/user";
import styles from "../styles/onboarding.module.css";
import { Form } from "../../../components/form/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleFormInput } from "../../../components/form-inputs/simple-form-input";
import { TextAreaFormInput } from "../../../components/form-inputs/textarea-input";
import { ProfileImageInput } from "../../../components/form-inputs/profile-image-input";
import { useState } from "react";
import { useOnboarding } from "../../../api/auth";

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
});

export const OnboardingForm = () => {
  const { session } = useSession();
  const user: User = session?.user as User;
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      bio: "",
      tags: [],
      avatar: undefined,
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    "/placeholder.svg"
  );
  const onboarding = useOnboarding();

  if (!user || !session) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    onboarding.mutate({
      username: values.username,
      bio: values.bio || "",
      avatarImage: values.avatar ?? null,
      tags: [],
    });
  };

  return (
    <Dialog open>
      <DialogContent showClose={false} className={styles.dialog}>
        <DialogHeader>
          <div className={styles.header}>
            <DialogTitle>
              <img src="/logo.png" alt="Melo" style={{ width: "2rem" }} />
              Welcome to Melo
            </DialogTitle>
            <Button
              size="medium"
              type="outline"
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </Button>
          </div>
        </DialogHeader>

        <DialogDescription>
          Before we get started, we need to get you set up with some basic
          information.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <DialogFooter>
              <Button
                type="default"
                loading={onboarding.isPending}
                htmlType="submit"
                size="medium"
              >
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
