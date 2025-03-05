import { Link } from "react-router";
import { FanFavorites } from "../../../types/fanfavorite";
import styles from "../styles/fanfavorite.module.css";
import { Play } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/button/button";

export const FanFavorite = ({ playlist }: { playlist: FanFavorites }) => {
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
          style={{ display: imageLoaded ? "block" : "none" }}
        />

        {!imageLoaded && <div className={styles.skeleton}></div>}

        <Button
          icon={<Play fill="white" color="white" />}
          className={styles.playButton}
          type="success"
        />
      </Link>
      <p className={styles.playlistTitle}>{playlist.name}</p>
      <p className={styles.playlistInfo}>
        {playlist.artistName} • {playlist.songs.length} Tracks
      </p>
      <div></div>
    </div>
  );
};
