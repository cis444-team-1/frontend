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
          src={user.imageSrc}
          alt="https://i.pravatar.cc/300"
          onLoad={() => setImageLoaded(true)}
          style={{
            display: imageLoaded ? "block" : "none",
            borderRadius: "999px",
          }}
        />

        {!imageLoaded && <div className={styles.skeleton}></div>}
      </Link>
      <p className={styles.userTitle}>{user.username}</p>
      <p className={styles.userInfo}>123 followers</p>
      <div></div>
    </div>
  );
};
