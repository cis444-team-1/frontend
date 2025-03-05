import { Link } from "react-router";
import { NewReleasePlaylist } from "../../../types/newreleaseplaylist";
import styles from "../styles/newreleases.module.css";
import { Play } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/button/button";

export const NewReleases = ({ playlist }: { playlist: NewReleasePlaylist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    // TODO : Make the design of the new releases section cleaner and more appealing
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
        {playlist.artistName} • {playlist.totalTracks} Tracks
      </p>
      <div></div>
    </div>
  );
};
