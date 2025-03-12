import { Link } from "react-router";
import { Playlist } from "../../types/playlist";
import styles from "./vertical-card.module.css";
import { Play } from "lucide-react";
import Badge from "../badge/badge";
import { useState } from "react";
import { Button } from "../button/button";

export const VerticalPlaylistCard = ({
  playlist,
  showVisibility = false,
}: {
  playlist: Playlist;
  showVisibility?: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div>
      <Link
        to={`/playlist/${playlist.id}?play=true`}
        className={styles.imageContainer}
      >
        <img
          src={playlist.imageSrc}
          alt={playlist.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            display: imageLoaded ? "block" : "none",
            borderRadius: "0.25rem",
          }}
        />

        {!imageLoaded && <div className={styles.skeleton}></div>}

        <Button
          icon={<Play fill="white" color="white" />}
          className={styles.playButton}
          type="success"
        />

        {showVisibility && (
          <Badge
            label={playlist.visbility}
            size="tiny"
            variant="full"
            color="primary"
            borderRadius={999}
            className={styles.visibilityBadge}
          />
        )}
      </Link>
      <p className={styles.playlistTitle}>{playlist.name}</p>
      <p className={styles.playlistInfo}>
        {playlist.userId} • {playlist.songs.length} Tracks
      </p>
      <div></div>
    </div>
  );
};
