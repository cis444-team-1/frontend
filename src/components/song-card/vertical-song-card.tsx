import { Link } from "react-router";
import styles from "./vertical-song-card.module.css";
import { Play } from "lucide-react";
import { useState } from "react";
import { Song } from "../../types/song";

export const VerticalSongCard = ({ song }: { song: Song }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div>
      <Link to={`/track/${song.track_id}`} className={styles.imageContainer}>
        <img
          src={song.image_src || "/placeholder.svg"}
          alt={song.title}
          onLoad={() => setImageLoaded(true)}
          className={imageLoaded ? styles.image : ""}
          style={!imageLoaded ? { display: "none" } : {}}
        />

        {!imageLoaded && <div className={styles.skeleton}></div>}

        <div className={styles.playButton}>
          <Play fill="white" color="white" />
        </div>
      </Link>
      <p className={styles.playlistTitle}>{song.title}</p>
      <p className={styles.playlistInfo}>
        {song.artist_name || "Unknown Artist"}{" "}
        {song.album_title && `• ${song.album_title}`}
      </p>
    </div>
  );
};
