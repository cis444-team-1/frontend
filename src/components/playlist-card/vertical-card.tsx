import { Link } from "react-router";
import { Playlist } from "../../types/playlist";
import styles from "./vertical-card.module.css";
import { Play } from "lucide-react";
import Badge from "../badge/badge";
import { useState } from "react";

export const VerticalPlaylistCard = ({
  playlist,
  username,
  showVisibility = false,
}: {
  playlist: Playlist;
  showVisibility?: boolean;
  username?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div>
      <Link
        to={`/playlist/${playlist.playlist_id}?play=true`}
        className={styles.imageContainer}
      >
        <img
          src={playlist.image_src || "/placeholder.svg"}
          alt={playlist.title}
          onLoad={() => setImageLoaded(true)}
          className={imageLoaded ? styles.image : ""}
          style={!imageLoaded ? { display: "none" } : {}}
        />

        {!imageLoaded && <div className={styles.skeleton}></div>}

        <div className={styles.playButton}>
          <Play fill="white" color="white" />
        </div>

        {showVisibility && (
          <Badge
            label={playlist.is_public ? "Public" : "Private"}
            size="tiny"
            variant="full"
            color="primary"
            borderRadius={999}
            className={styles.visibilityBadge}
          />
        )}
      </Link>
      <p className={styles.playlistTitle}>{playlist.title}</p>
      <p className={styles.playlistInfo}>{username || "Unknown user"}</p>
    </div>
  );
};
