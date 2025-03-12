import { EllipsisVertical, Pause, Play } from "lucide-react";
import { formatDuration } from "../../lib/utils";
import { Song } from "../../types/song";
import { Button } from "../button/button";

import styles from "./song-card.module.css";
import { usePlayback } from "../../hooks/use-playback";
import { AudioLinesIcon } from "../audio-lines/audio-lines";

export const HorizontalSongCard = ({
  song,
  ranking,
}: {
  song: Song;
  ranking?: number;
}) => {
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
      {ranking && <p className={styles.ranking}>{ranking}</p>}

      <div className={styles.imageWrapper}>
        <img src={song.imageUrl} alt={song.title} className={styles.image} />

        <Button
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
      </div>

      <div>
        <p className={styles.title}>{song.title}</p>
        <p className={styles.info}>
          {song.artist} • {song.album} • {formatDuration(song.durationSeconds)}
        </p>
      </div>

      <Button
        type="text"
        size="medium"
        className={styles.moreButton}
        icon={<EllipsisVertical />}
      />
    </div>
  );
};
