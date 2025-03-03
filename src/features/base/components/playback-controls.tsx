import { useEffect, useState, useRef } from "react";

import {
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayback } from "../../../hooks/use-playback";
import { Button } from "../../../components/button/button";
import styles from "../styles.module.css";

export function TrackInfo() {
  let { currentTrack } = usePlayback();

  return (
    <div className={styles.trackInfoContainer}>
      {currentTrack && (
        <>
          <img
            src={currentTrack.imageUrl || "/placeholder.svg"}
            alt="Now playing"
            className={styles.trackInfoImage}
          />
          <div className={styles.trackInfoTextContainer}>
            <div className={styles.trackTitle}>{currentTrack.title}</div>
            <div className={styles.trackArtist}>{currentTrack.artist}</div>
          </div>
          <Button type="text" icon={<Heart />} />
        </>
      )}
    </div>
  );
}

export function PlaybackButtons() {
  let {
    isPlaying,
    togglePlayPause,
    playPreviousTrack,
    playNextTrack,
    currentTrack,
  } = usePlayback();

  return (
    <div className={styles.playbackButtonsContainer}>
      <Button
        type="text"
        size="small"
        icon={<SkipBack />}
        onClick={playPreviousTrack}
        disabled={!currentTrack}
      />
      <Button
        type="text"
        size="medium"
        icon={isPlaying ? <Pause /> : <Play />}
        onClick={togglePlayPause}
        disabled={!currentTrack}
      />
      <Button
        type="text"
        size="small"
        icon={<SkipForward />}
        onClick={playNextTrack}
        disabled={!currentTrack}
      />
    </div>
  );
}

export function ProgressBar() {
  let { currentTime, duration, audioRef, setCurrentTime } = usePlayback();
  let progressBarRef = useRef<HTMLDivElement>(null);

  let formatTime = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  let handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      let rect = progressBarRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      let newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className={styles.progressBarContainer}>
      <span className={styles.progressBarText}>{formatTime(currentTime)}</span>

      <div
        ref={progressBarRef}
        className={styles.progressBarOuter}
        onClick={handleProgressChange}
      >
        <div
          className={styles.progressBarInner}
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        ></div>
      </div>

      <span className={styles.progressBarText}>{formatTime(duration)}</span>
    </div>
  );
}

export function Volume() {
  let { audioRef, currentTrack } = usePlayback();
  let [volume, setVolume] = useState(100);
  let [isMuted, setIsMuted] = useState(false);
  let [isVolumeVisible, setIsVolumeVisible] = useState(false);
  let volumeBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioRef]);

  let handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeBarRef.current) {
      let rect = volumeBarRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setVolume(percentage);
      if (audioRef.current) {
        audioRef.current.volume = percentage / 100;
      }
      setIsMuted(percentage === 0);
    }
  };

  let toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        volumeBarRef.current &&
        !volumeBarRef.current.contains(event.target as Node)
      ) {
        setIsVolumeVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        type="text"
        size="large"
        onClick={() => {
          toggleMute();
          toggleVolumeVisibility();
        }}
        disabled={!currentTrack}
        icon={isMuted ? <VolumeX /> : <Volume2 />}
      />
      {isVolumeVisible && (
        <div className={styles.volumeVisibleContainer}>
          <div
            ref={volumeBarRef}
            className={styles.volumeBarOuter}
            onClick={handleVolumeChange}
          >
            <div
              className={styles.volumeBarInner}
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PlaybackControls() {
  let {
    currentTrack,
    audioRef,
    setCurrentTime,
    setDuration,
    playPreviousTrack,
    playNextTrack,
    togglePlayPause,
  } = usePlayback();

  useEffect(() => {
    let audio = audioRef.current;
    if (audio) {
      let updateTime = () => setCurrentTime(audio.currentTime);
      let updateDuration = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioRef, setCurrentTime, setDuration]);

  useEffect(() => {
    if ("mediaSession" in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album || undefined,
        artwork: [
          { src: currentTrack.imageUrl!, sizes: "512x512", type: "image/jpeg" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play();
        togglePlayPause();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
        togglePlayPause();
      });

      navigator.mediaSession.setActionHandler(
        "previoustrack",
        playPreviousTrack
      );
      navigator.mediaSession.setActionHandler("nexttrack", playNextTrack);

      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (audioRef.current && details.seekTime !== undefined) {
          audioRef.current.currentTime = details.seekTime;
          setCurrentTime(details.seekTime);
        }
      });

      const updatePositionState = () => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
          try {
            navigator.mediaSession.setPositionState({
              duration: audioRef.current.duration,
              playbackRate: audioRef.current.playbackRate,
              position: audioRef.current.currentTime,
            });
          } catch (error) {
            console.error("Error updating position state:", error);
          }
        }
      };

      const handleLoadedMetadata = () => {
        updatePositionState();
      };

      audioRef.current?.addEventListener("timeupdate", updatePositionState);
      audioRef.current?.addEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      return () => {
        audioRef.current?.removeEventListener(
          "timeupdate",
          updatePositionState
        );
        audioRef.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("previoustrack", null);
        navigator.mediaSession.setActionHandler("nexttrack", null);
        navigator.mediaSession.setActionHandler("seekto", null);
      };
    }
  }, [
    currentTrack,
    playPreviousTrack,
    playNextTrack,
    togglePlayPause,
    audioRef,
    setCurrentTime,
  ]);

  return (
    <div className={styles.playbackControlsContainer}>
      <audio ref={audioRef} />
      <TrackInfo />
      <div className={styles.playbackControlsLeft}>
        <PlaybackButtons />
        <ProgressBar />
      </div>
      <div className={styles.playbackControlsRight}>
        <Volume />
      </div>
    </div>
  );
}
