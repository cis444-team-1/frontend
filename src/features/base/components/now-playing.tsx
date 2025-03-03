import { usePlayback } from "../../../hooks/use-playback";
import styles from "../styles.module.css";

export function NowPlaying() {
  const { currentTrack } = usePlayback();

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.nowPlayingContainer}>
      <h2 className={styles.nowPlayingTitle}>Now Playing</h2>
      <div className={styles.nowPlayingImageContainer}>
        <img
          src={currentTrack.imageUrl || "/placeholder.svg"}
          alt={currentTrack.title}
          className={styles.nowPlayingImage}
        />
      </div>
      <div className={styles.nowPlayingInfoContainer}>
        <div>
          <p className={styles.nowPlayingInfoLabel}>Title</p>
          <p className={styles.nowPlayingInfoText}>{currentTrack.title}</p>
        </div>
        <div>
          <p className={styles.nowPlayingInfoLabel}>Artist</p>
          <p className={styles.nowPlayingInfoText}>{currentTrack.artist}</p>
        </div>
        <div>
          <p className={styles.nowPlayingInfoLabel}>Album</p>
          <p className={styles.nowPlayingInfoText}>{currentTrack.album}</p>
        </div>
        <div>
          <p className={styles.nowPlayingInfoLabel}>Tags</p>
          <p className={styles.nowPlayingInfoText}>{currentTrack.genre}</p>
        </div>
        <div>
          <p className={styles.nowPlayingInfoLabel}>Uploaded</p>
          <p className={styles.nowPlayingInfoText}>
            {currentTrack.createdAt.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
