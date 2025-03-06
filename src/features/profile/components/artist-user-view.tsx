import { Button } from "../../../components/button/button";
import { VerticalPlaylistCard } from "../../../components/playlist-card/vertical-card";
import {
  ScrollArea,
  ScrollBar,
} from "../../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../../components/song-card/long-song-card";
import { playlists } from "../../../types/playlist";
import { songs } from "../../../types/song";
import { User } from "../../../types/user";
import styles from "../styles/page.module.css";
import { ProfileHeader } from "./profile-header";

export const ArtistView = ({ user }: { user: User }) => {
  return (
    <>
      <ProfileHeader user={user} isArtist />

      <div className={styles.sectionContainer}>
        <h1 className={styles.pageTitle}>About this artist</h1>
        <p className={styles.pageDescription}>{user.bio}</p>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="Songs">
          <div className={styles.songContainer}>
            {songs.slice(0, 5).map((song) => (
              <>
                <LongHorizontalSongCard song={song} />
              </>
            ))}
          </div>
          <Button
            type="outline"
            rounded
            size="large"
            style={{ marginTop: "1rem" }}
          >
            Show all
          </Button>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Albums">
          <div className={styles.playlistContainer}>
            {playlists.map((playlist) => (
              <VerticalPlaylistCard playlist={playlist} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
