import { Outlet } from "react-router";
import { PlaybackProvider } from "../../../context/playback-context";
import { PlaylistProvider } from "../../../hooks/use-playlist";
import { PlaybackControls } from "./playback-controls";
import { Sidebar } from "./sidebar";
import styles from "../styles.module.css";
import { NowPlaying } from "./now-playing";
import { useSession } from "../../../hooks/session-hook";
import { User } from "../../../types/user";
import { OnboardingForm } from "./onboarding-form";

export default function PlaybackLayout() {
  const { session } = useSession();
  const user: User = session?.user as User;

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.background}></div>

      <PlaybackProvider>
        <PlaylistProvider playlists={[]}>
          <Sidebar />
          <Outlet />
        </PlaylistProvider>
        <NowPlaying />
        <PlaybackControls />
      </PlaybackProvider>

      {session && user && !user.user_metadata.is_onboarded && (
        <OnboardingForm />
      )}
    </div>
  );
}
