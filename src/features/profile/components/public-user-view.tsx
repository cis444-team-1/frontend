import { useState } from "react";
import { useGetPersonalPlaylists } from "../../../api/playlist";
import { useGetUserPrivateUploads } from "../../../api/tracks";
import { Button } from "../../../components/button/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../../components/dialog/dialog";
import { Loader } from "../../../components/loader/loader";
import { VerticalPlaylistCard } from "../../../components/playlist-card/vertical-card";
import {
  ScrollArea,
  ScrollBar,
} from "../../../components/scrollarea/scroll-area";
import { LongHorizontalSongCard } from "../../../components/song-card/long-song-card";
import { PublicUser } from "../../../types/user";
import styles from "../styles/page.module.css";
import { ProfileHeader } from "./profile-header";
import { HorizontalSongCard } from "../../../components/song-card/song-card";

export const PublicUserView = ({ user }: { user: PublicUser }) => {
  const uploads = useGetUserPrivateUploads();
  const playlists = useGetPersonalPlaylists();

  const [showAllSongsModal, setShowAllSongsModal] = useState(false);

  return (
    <>
      <ProfileHeader user={user} />
      <div className={styles.sectionContainer}>
        {playlists.isPending ? (
          <Loader />
        ) : !playlists.data ? (
          <p>No playlists</p>
        ) : (
          <ScrollArea showControls title="Playlists">
            <div className={styles.playlistContainer}>
              {playlists.data.map((playlist) => (
                <VerticalPlaylistCard playlist={playlist} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>

      <div className={styles.sectionContainer}>
        {uploads.isPending ? (
          <Loader />
        ) : !uploads.data ? (
          <p>No uploads</p>
        ) : (
          <ScrollArea title="Uploads">
            <div className={styles.songContainer}>
              {uploads.data.slice(0, 5).map((song) => (
                <LongHorizontalSongCard song={song} />
              ))}
            </div>
            <Button
              type="outline"
              rounded
              size="large"
              style={{ marginTop: "1rem" }}
              onClick={() => setShowAllSongsModal(true)}
            >
              Show all
            </Button>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>

      {showAllSongsModal && uploads.data && (
        <Dialog open={showAllSongsModal} onOpenChange={setShowAllSongsModal}>
          <DialogContent>
            <DialogHeader className={styles.dialogHeader}>Uploads</DialogHeader>
            <div className={styles.songContainer}>
              {uploads.data.map((song, index) => (
                <ScrollArea>
                  <HorizontalSongCard key={index} song={song} />
                  {index < uploads.data.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </ScrollArea>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
