import { Link } from "react-router";
import styles from "./vertical-card.module.css";
import { useState } from "react";
import { User } from "../../types/user";

export const VerticalArtistCard = ({ user }: { user: User }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div>
      <Link to={`/artist/123`} className={styles.imageContainer}>
        <img
          src={user.user_metadata.avatar || "/placeholder.svg"}
          alt={user.user_metadata.username + " profile image"}
          onLoad={() => setImageLoaded(true)}
          style={{
            display: imageLoaded ? "block" : "none",
            borderRadius: "999px",
          }}
        />

        {!imageLoaded && <div className={styles.skeleton}></div>}
      </Link>
      <p className={styles.userTitle}>{user.user_metadata.username}</p>
      <p className={styles.userInfo}>1.1M Followers</p>
      <div></div>
    </div>
  );
};
