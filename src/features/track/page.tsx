import styles from "./styles/page.module.css";
import { Header } from "../base/components/header";
import { useLocation } from "react-router";
import { useGetTrack } from "../../api/tracks";
import { Button } from "../../components/button/button";
import { Pause, Play } from "lucide-react";
import { songs } from "../../types/song";
import { LongHorizontalSongCard } from "../../components/song-card/long-song-card";
import { usePlayback } from "../../hooks/use-playback";
import { AudioLinesIcon } from "../../components/audio-lines/audio-lines";

export default function TrackPage() {
  const trackId = useLocation().pathname.split("/")[2];
  const track = useGetTrack(trackId);
  const playback = usePlayback();

  const handlePlay = () => {
    if (!track || !track.data) return;
    playback.playTrack(track.data);
  };

  const handlePause = () => {
    if (!track || !track.data) return;
    playback.togglePlayPause();
  };

  if (!track || !track.data) {
    return (
      <div>
        <p>Track not found</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.songInfo}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={track.data.image_src}
              alt={track.data.title + " album art"}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                <div>
                  <h1>{track.data.title}</h1>
                  {playback.isPlaying && <AudioLinesIcon />}
                </div>
                <p>
                  {track.data.artist_name} test • test{track.data.album_title}
                </p>
              </div>
              <Button
                icon={
                  playback.isPlaying ? (
                    <Pause fill="white" color="white" />
                  ) : (
                    <Play fill="white" color="white" />
                  )
                }
                type="success"
                rounded
                size="large"
                style={{ paddingInline: "2.5rem", color: "white" }}
                onClick={playback.isPlaying ? handlePause : handlePlay}
              >
                {playback.isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
            <div className={styles.divider} />
            <p>
              {track.data.description} Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Totam nobis dolores illum nulla eaque esse,
              architecto quas iste repudiandae harum qui, nesciunt quam vel
              cumque nisi praesentium non? Hic, pariatur.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Similar Songs</p>
        <div className={styles.songContainer}>
          {songs.map((song) => (
            <LongHorizontalSongCard song={song} />
          ))}
        </div>
      </div>
    </div>
  );
}
