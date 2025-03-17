import { playlists } from "../../types/playlist";
import { TrackTable } from "../../components/track-table/track-table";
import { PlaylistInfo } from "./components/playlist-info";
import styles from "./styles/page.module.css";
import { useSession } from "../../hooks/session-hook";
import { Navigate } from "react-router";
import { Header } from "../base/components/header";

export default function PlaylistPage() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/auth/login" />;
  }

  const playlist = playlists[0];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <PlaylistInfo playlist={playlist} />

      <div style={{ minWidth: "100%" }}>
        <TrackTable playlist={playlist} />
      </div>
    </div>
  );
}
