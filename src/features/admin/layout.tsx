import { Navigate, Outlet } from "react-router";
import styles from "./styles/page.module.css";
import { Sidebar } from "../base/components/sidebar";
import { PlaylistProvider } from "../../hooks/use-playlist";
import { PlaybackProvider } from "../../context/playback-context";
import { useSession } from "../../hooks/session-hook";

export default function AdminLayout() {
  const { session } = useSession();

  // const isAdmin = session?.user.role === "admin";
  // TODO: Add admin check later
  const isAdmin = true;

  if (!session || !isAdmin) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={styles.layoutContainer}>
      <PlaybackProvider>
        <PlaylistProvider playlists={[]}>
          <Sidebar />
        </PlaylistProvider>
      </PlaybackProvider>
      <Outlet />
    </div>
  );
}
