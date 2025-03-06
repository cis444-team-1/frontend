import { VerticalArtistCard } from "../../../components/artist-card/vertical-card";
import { VerticalPlaylistCard } from "../../../components/playlist-card/vertical-card";
import {
  ScrollArea,
  ScrollBar,
} from "../../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../../components/song-card/long-song-card";
import { playlists } from "../../../types/playlist";
import { songs } from "../../../types/song";
import { User, users } from "../../../types/user";
import styles from "../styles/page.module.css";
import { ProfileHeader } from "./profile-header";

export const PrivateUserView = ({ user }: { user: User }) => {
  return (
    <>
      <ProfileHeader user={user} showSubscribe={false} showEdit />

      <div className={styles.sectionContainer}>
        <p className={styles.sectionTitle}>Recent • Private</p>
        <ScrollArea title="Songs on repeat">
          <div className={styles.songContainer}>
            {songs.slice(0, 5).map((song) => (
              <LongHorizontalSongCard song={song} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.sectionTitle}>Recent • Private</p>
        <ScrollArea showControls title="Artists on repeat">
          <div className={styles.playlistContainer}>
            {users.map((user) => (
              <VerticalArtistCard user={user} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.sectionTitle}>Recent • Private</p>
        <ScrollArea showControls title="Playlists on repeat">
          <div className={styles.playlistContainer}>
            {playlists.map((playlist) => (
              <VerticalPlaylistCard playlist={playlist} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.sectionTitle}>Your Public</p>
        <ScrollArea showControls title="Playlists">
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
