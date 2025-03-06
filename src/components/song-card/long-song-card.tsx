import { EllipsisVertical, Pause, Play } from "lucide-react";
import { Song } from "../../types/song";
import { Button } from "../button/button";

import styles from "./long-song-card.module.css";
import { usePlayback } from "../../hooks/use-playback";
import { AudioLinesIcon } from "../audio-lines/audio-lines";

export const LongHorizontalSongCard = ({ song }: { song: Song }) => {
  const {
    currentTrack,
    playTrack,
    togglePlayPause,
    isPlaying,
    setActivePanel,
  } = usePlayback();

  const isCurrentTrack = currentTrack?.title === song.title;

  function onClickCard(e: React.MouseEvent) {
    e.preventDefault();
    setActivePanel("tracklist");
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(song);
    }
  }

  return (
    <div className={styles.container} onClick={onClickCard}>
      <img src={song.imageUrl} alt={song.title} className={styles.image} />

      <div className={styles.textContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{song.title}</p>
        </div>

        <div className={styles.infoContainer}>
          <p className={styles.info}>{song.artist} • 10 plays</p>
          <p className={styles.info}>{song.album}</p>
          <p className={styles.smallInfo}>
            {song.artist} • 10 plays • {song.album}
          </p>
        </div>
      </div>

      <Button
        type="text"
        size="medium"
        className={
          isCurrentTrack && isPlaying ? styles.pauseButton : styles.playButton
        }
        icon={
          isCurrentTrack && isPlaying ? (
            <Pause />
          ) : (
            <Play fill="white" color="white" />
          )
        }
      />

      <Button
        type="text"
        size="medium"
        className={
          isCurrentTrack && isPlaying ? styles.audioButton : styles.noShow
        }
        icon={<AudioLinesIcon />}
      />

      <Button
        type="text"
        size="medium"
        className={styles.moreButton}
        icon={<EllipsisVertical />}
      />
    </div>
  );
};
