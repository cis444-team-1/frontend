import { Pencil, Share } from "lucide-react";
import styles from "../styles/page.module.css";
import profileStyles from "../styles/profile-header.module.css";
import { User } from "../../../types/user";
import { Button } from "../../../components/button/button";
import { Header } from "../../base/components/header";

export const ProfileHeader = ({
  user,
  showSubscribe = true,
  showEdit = false,
  isArtist = false,
}: {
  user: User;
  showSubscribe?: boolean;
  showEdit?: boolean;
  isArtist?: boolean;
}) => {
  return (
    <div className={styles.sectionContainer}>
      <Header />

      <div className={profileStyles.container}>
        <img
          className={profileStyles.image}
          src={user.user_metadata.avatar || "/placeholder.svg"}
          alt={user.user_metadata.username + " profile image"}
        />

        <div className={profileStyles.info}>
          {isArtist && <p className={profileStyles.artistTitle}>Artist</p>}

          <h1 className={profileStyles.username}>
            {user.user_metadata.username}
          </h1>
          <div className={profileStyles.buttons}>
            {showSubscribe && (
              <Button
                size="large"
                type="primary"
                style={{ minWidth: "fit-content", paddingInline: "2rem" }}
              >
                Subscribe{" "}
                <span className={profileStyles.subscribers}>14.7K</span>
              </Button>
            )}
            <Button size="large" icon={<Share />} type="outline">
              Share
            </Button>
            {showEdit && (
              <Button size="large" icon={<Pencil />} type="outline">
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
