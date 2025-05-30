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
  const { currentTrack } = usePlayback();

  return (
    <div className={styles.trackInfoContainer}>
      {currentTrack && (
        <>
          <img
            src={currentTrack.image_src || "/placeholder.svg"}
            alt="Now playing"
            className={styles.trackInfoImage}
          />
          <div className={styles.trackInfoTextContainer}>
            <div className={styles.trackTitle}>{currentTrack.title}</div>
            <div className={styles.trackArtist}>{currentTrack.artist_name}</div>
          </div>
          <Button type="text" icon={<Heart />} />
        </>
      )}
    </div>
  );
}

export function PlaybackButtons() {
  const {
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
        className={styles.playbackButton}
      />
      <Button
        type="text"
        size="medium"
        icon={isPlaying ? <Pause /> : <Play />}
        onClick={togglePlayPause}
        disabled={!currentTrack}
        className={styles.playbackButton}
      />
      <Button
        type="text"
        size="small"
        icon={<SkipForward />}
        onClick={playNextTrack}
        disabled={!currentTrack}
        className={styles.playbackButton}
      />
    </div>
  );
}

export function ProgressBar() {
  const { currentTime, duration, audioRef, setCurrentTime, isPlaying } =
    usePlayback();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressChange(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      handleProgressChange(e as unknown as React.MouseEvent<HTMLDivElement>); // Type assertion
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (progressBarRef.current) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, progressBarRef]);

  return (
    <div className={styles.progressBarContainer}>
      <span className={styles.progressBarText}>{formatTime(currentTime)}</span>

      <div
        ref={progressBarRef}
        className={styles.progressBarOuter}
        onMouseDown={handleMouseDown}
      >
        <div
          className={styles.progressBarInner}
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        >
          {(isPlaying || currentTime > 0) && (
            <div className={styles.progressBarDot} />
          )}
        </div>
      </div>

      <span className={styles.progressBarText}>{formatTime(duration)}</span>
    </div>
  );
}

export function Volume() {
  const { audioRef, currentTrack } = usePlayback();
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioRef]);

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeBarRef.current) {
      const rect = volumeBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setVolume(percentage);
      if (audioRef.current) {
        audioRef.current.volume = percentage / 100;
      }
      setIsMuted(percentage === 0);
    }
  };

  const toggleMute = () => {
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

  const toggleVolumeVisibility = () => {
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
  const {
    currentTrack,
    audioRef,
    setCurrentTime,
    setDuration,
    playPreviousTrack,
    playNextTrack,
    togglePlayPause,
  } = usePlayback();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleTrackEnd = () => playNextTrack();

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleTrackEnd);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleTrackEnd);
      };
    }
  }, [audioRef, setCurrentTime, setDuration, playNextTrack]);

  useEffect(() => {
    if ("mediaSession" in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist_name,
        album: currentTrack.album_title || undefined,
        artwork: [
          {
            src: currentTrack.image_src!,
            sizes: "512x512",
            type: "image/jpeg",
          },
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
