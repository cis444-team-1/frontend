import { Outlet } from "react-router";
import { PlaybackProvider } from "../../../context/playback-context";
import { PlaylistProvider } from "../../../hooks/use-playlist";
import { PlaybackControls } from "./playback-controls";
import { playlists } from "../../../types/playlist";
import { Sidebar } from "./sidebar";
import styles from "../styles.module.css";
import { NowPlaying } from "./now-playing";

export default function PlaybackLayout() {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.background}></div>

      <PlaybackProvider>
        <PlaylistProvider playlists={playlists}>
          <Sidebar />
          <Outlet />
        </PlaylistProvider>
        <NowPlaying />
        <PlaybackControls />
      </PlaybackProvider>
    </div>
  );
}
