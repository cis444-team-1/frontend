import { Pencil, Share } from "lucide-react";
import styles from "../styles/page.module.css";
import profileStyles from "../styles/profile-header.module.css";
import { PublicUser } from "../../../types/user";
import { Button } from "../../../components/button/button";
import { Header } from "../../base/components/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog/dialog";
import { Link } from "react-router";
import { toast } from "sonner";

export const ProfileHeader = ({
  user,
  // showSubscribe = true,
  showEdit = false,
  isArtist = false,
}: {
  user: PublicUser;
  showSubscribe?: boolean;
  showEdit?: boolean;
  isArtist?: boolean;
}) => {
  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

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
            {/* {showSubscribe && (
              <Button
                size="large"
                type="primary"
                style={{ minWidth: "fit-content", paddingInline: "2rem" }}
              >
                Subscribe{" "}
                <span className={profileStyles.subscribers}>14.7K</span>
              </Button>
            )} */}
            <Dialog>
              <DialogContent>
                <DialogHeader className={profileStyles.dialogHeader}>
                  Share
                </DialogHeader>
                <DialogDescription>
                  <div className={profileStyles.shareCard}>
                    <div className={profileStyles.linkText}>
                      https://youtu.be/ZWDSoHEoBvY?si=LNXIqiMPbGiIy
                    </div>
                    <Button onClick={handleCopy} size="large">
                      Copy
                    </Button>
                  </div>
                </DialogDescription>
              </DialogContent>

              <DialogTrigger asChild>
                <Button size="large" icon={<Share />} type="outline">
                  Share
                </Button>
              </DialogTrigger>
            </Dialog>
            {showEdit && (
              <Link to="/settings">
                <Button size="large" icon={<Pencil />} type="outline">
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
