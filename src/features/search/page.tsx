import styles from "./styles/page.module.css";
import { Button } from "../../components/button/button";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { Header } from "../base/components/header";
import { useSearch } from "../../api/search";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "../../components/loader/loader";
import { HorizontalPlaylistCard } from "../../components/playlist-card/horizontal-card";
import { Dialog, DialogContent } from "../../components/dialog/dialog";
import { ScrollArea } from "../../components/scrollarea/scroll-area";
import { FeaturedPlaylistCard } from "../../components/playlist-card/featured-card";
import { FeaturedSongCard } from "../../components/song-card/featured-card";
import { usePlayback } from "../../hooks/use-playback";

export default function SearchPage() {
  const searchQuery = useLocation().search.split("=")[1];
  const search = useSearch(searchQuery);
  const playback = usePlayback();
  const navigate = useNavigate();

  const [showAllSongsModal, setShowAllSongsModal] = useState(false);
  const [showAllPlaylistsModal, setShowAllPlaylistsModal] = useState(false);

  useEffect(() => {
    search.refetch();
  }, [searchQuery, search]);

  if (!searchQuery) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <Header />
        </div>
        <p style={{ padding: "1rem" }}>
          Search for songs, playlists, and users!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Top Results</p>

        {search.data?.playlists && search.data?.playlists[0] && (
          <FeaturedPlaylistCard
            playlist={search.data.playlists[0]}
            onPlay={() =>
              navigate(`/playlist/${search.data.playlists[0].playlist_id}`)
            }
            onSave={() => {}}
          />
        )}
        {search.data?.tracks && search.data?.tracks[0] && (
          <FeaturedSongCard
            isPlaying={
              playback.isPlaying &&
              playback.currentTrack?.title === search.data.tracks[0].title
            }
            onPlay={() => {
              if (
                playback.currentTrack?.title === search.data.tracks[0].title &&
                playback.isPlaying
              ) {
                playback.togglePlayPause();
                return;
              }

              playback.playTrack(search.data.tracks[0]);
            }}
            song={search.data.tracks[0]}
          />
        )}
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Songs</p>

        {search.isPending ? (
          <Loader />
        ) : !search.data || !search.data?.tracks ? (
          <p>No songs found</p>
        ) : (
          <>
            <div className={styles.songContainer}>
              {search.data.tracks.map((song, index) => (
                <>
                  <HorizontalSongCard key={index} song={song} />
                  {index < search.data.tracks.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </>
              ))}
            </div>

            <Button
              type="outline"
              rounded
              size="large"
              style={{ marginTop: "1rem", width: "fit-content" }}
              onClick={() => setShowAllSongsModal(true)}
            >
              Show all
            </Button>
          </>
        )}
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Playlists</p>

        {search.isPending ? (
          <Loader />
        ) : !search.data || !search.data.playlists ? (
          <p>No playlists found</p>
        ) : (
          <>
            <div className={styles.songContainer}>
              {search.data.playlists.map((playlist, index) => (
                <>
                  <HorizontalPlaylistCard playlist={playlist} />
                  {index < search.data.playlists.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </>
              ))}
            </div>

            <Button
              type="outline"
              rounded
              size="large"
              style={{ marginTop: "1rem", width: "fit-content" }}
              onClick={() => setShowAllPlaylistsModal(true)}
            >
              Show all
            </Button>
          </>
        )}
      </div>

      {showAllSongsModal && search.data?.tracks && (
        <Dialog open={showAllSongsModal} onOpenChange={setShowAllSongsModal}>
          <DialogContent>
            <div className={styles.songContainer}>
              {search.data.tracks.map((song, index) => (
                <ScrollArea>
                  <HorizontalSongCard key={index} song={song} />
                  {index < search.data.tracks.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </ScrollArea>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showAllPlaylistsModal && search.data?.playlists && (
        <Dialog
          open={showAllPlaylistsModal}
          onOpenChange={setShowAllPlaylistsModal}
        >
          <DialogContent>
            <div className={styles.songContainer}>
              {search.data.playlists.map((playlist, index) => (
                <ScrollArea>
                  <HorizontalPlaylistCard playlist={playlist} />
                  {index < search.data.playlists.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </ScrollArea>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 
      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Profiles</p>

        <div className={styles.songContainer}>
          {songs.slice(0, 3).map((song, index) => (
            <>
              <HorizontalSongCard song={song} />
              {index < 2 && <div className={styles.divider} />}
            </>
          ))}
        </div>

        <Button
          type="outline"
          rounded
          size="large"
          style={{ marginTop: "1rem", width: "fit-content" }}
        >
          Show all
        </Button>
      </div> */}
    </div>
  );
}
