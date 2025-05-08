import { useGetPersonalPlaylists } from "../../../api/playlist";
import { useGetPlayhistory } from "../../../api/tracks";
import { VerticalArtistCard } from "../../../components/artist-card/vertical-card";
import { Loader } from "../../../components/loader/loader";
import { VerticalPlaylistCard } from "../../../components/playlist-card/vertical-card";
import {
  ScrollArea,
  ScrollBar,
} from "../../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../../components/song-card/long-song-card";
import { useSession } from "../../../hooks/session-hook";
import { User, users } from "../../../types/user";
import styles from "../styles/page.module.css";
import { ProfileHeader } from "./profile-header";

export const PrivateUserView = () => {
  const { session } = useSession();
  const recentSongs = useGetPlayhistory();
  const playlists = useGetPersonalPlaylists();

  const user = session?.user as User;

  return (
    <>
      <ProfileHeader user={user} showSubscribe={false} showEdit />

      <div className={styles.sectionContainer}>
        <p className={styles.sectionTitle}>Recent • Private</p>
        <ScrollArea title="Songs on repeat">
          <div className={styles.songContainer}>
            {recentSongs.isPending ? (
              <Loader />
            ) : !recentSongs.data ? (
              <p>No songs</p>
            ) : (
              recentSongs.data
                .slice(0, 5)
                .map((song) => <LongHorizontalSongCard song={song} />)
            )}
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
          {playlists.isPending ? (
            <Loader />
          ) : !playlists.data ? (
            <p>No playlists</p>
          ) : (
            <div className={styles.playlistContainer}>
              {playlists.data.map((playlist) => (
                <VerticalPlaylistCard playlist={playlist} />
              ))}
            </div>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.sectionTitle}>Your Public</p>
        <ScrollArea showControls title="Playlists">
          {playlists.isPending ? (
            <Loader />
          ) : !playlists.data ? (
            <p>No playlists</p>
          ) : (
            <div className={styles.playlistContainer}>
              {playlists.data.map((playlist) => (
                <VerticalPlaylistCard playlist={playlist} />
              ))}
            </div>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
