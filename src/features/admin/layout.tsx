import { Outlet } from "react-router";
import styles from "./styles/page.module.css";
import { Sidebar } from "../base/components/sidebar";
import { PlaylistProvider } from "../../hooks/use-playlist";
import { playlists } from "../../types/playlist";
import { PlaybackProvider } from "../../context/playback-context";

export default function AdminLayout() {
  return (
    <div className={styles.layoutContainer}>
      <PlaybackProvider>
        <PlaylistProvider playlists={playlists}>
          <Sidebar />
        </PlaylistProvider>
      </PlaybackProvider>
      <Outlet />
    </div>
  );
}
