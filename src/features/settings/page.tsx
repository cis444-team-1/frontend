import { z } from "zod";
import { Form } from "../../components/form/form";
import styles from "./styles/page.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleFormInput } from "../../components/form-inputs/simple-form-input";
import { useSession } from "../../hooks/session-hook";
import { User } from "../../types/user";
import { TextAreaFormInput } from "../../components/form-inputs/textarea-input";
import { Button } from "../../components/button/button";
import { ProfileImageInput } from "../../components/form-inputs/profile-image-input";
import { useState } from "react";

const SettingsSchema = z.object({
  username: z.string(),
  bio: z.string(),
  avatar: z.instanceof(File),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  banner: z.instanceof(File),
});

export default function SettingsPage() {
  const { session } = useSession();
  const user: User = session?.user as User;
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.user_metadata.avatar || "/placeholder.svg"
  );
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      username: user.user_metadata.username || "",
      bio: user.user_metadata.bio || "",
      avatar: undefined,
      tags: [],
      isPublic: false,
      banner: undefined,
    },
  });

  const handleSubmit = (data: z.infer<typeof SettingsSchema>) => {
    console.log(data);
  };

  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.divider} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <section id="avatar" className={styles.settingsSection}>
            <div>
              <h2>Email</h2>
              <p>Your email associated with your account</p>
            </div>

            <div className={styles.email}>
              <p>{user.email}</p>
            </div>
          </section>

          <div className={styles.divider} />
          <section id="avatar" className={styles.settingsSection}>
            <div>
              <h2>Avatar</h2>
              <p>Change your profile picture</p>
            </div>

            <ProfileImageInput
              showLabel={false}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </section>

          <section id="username" className={styles.settingsSection}>
            <div>
              <h2>Username</h2>
              <p>Change your username</p>
            </div>

            <SimpleFormInput
              name="username"
              label=""
              placeholder={user.user_metadata.username || ""}
              className={styles.username}
            />
          </section>

          <section id="bio" className={styles.settingsSection}>
            <div>
              <h2>Bio</h2>
              <p>
                Change your bio that appears on your profile. Maximum 250
                characters.
              </p>
            </div>

            <TextAreaFormInput
              name="bio"
              label=""
              placeholder={user.user_metadata.bio || ""}
            />
          </section>

          <section id="tags" className={styles.settingsSection}>
            <div>
              <h2>Tags</h2>
              <p>Change your genres</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section id="visibility" className={styles.settingsSection}>
            <div>
              <h2>Visibility</h2>
              <p>Set who can see your profile</p>
            </div>
          </section>

          <section id="sessions" className={styles.settingsSection}>
            <div>
              <h2>Active Sessions</h2>
              <p>Your currently logged in sessions across different devices.</p>
            </div>

            <div>
              <ul className={styles.sessionList}>
                <li>
                  <p>Chrome on windows</p>
                  <p>{session?.expires_at}</p>
                </li>
                <li>
                  <p>Safari on iphone</p>
                  <p>{session?.expires_at}</p>
                </li>
              </ul>
            </div>
          </section>

          <div className={styles.divider} />

          <section id="sessions" className={styles.settingsSection}>
            <div>
              <h2>Socials & Connections</h2>
              <p>
                Manage your social network. See who you're following and who's
                following you.
              </p>
            </div>
          </section>

          <div className={styles.divider} />

          <div className={styles.buttonContainer}>
            <Button htmlType="submit" size="large">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
