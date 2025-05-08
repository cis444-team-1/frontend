import styles from "./styles/page.module.css";
import { Headphones, Music, Tag } from "lucide-react";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { User } from "../../types/user";
import { AnalyticsCard } from "../../components/analytic-card/card";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { songs } from "../../types/song";
// import { ListeningTrends } from "./components/listening-trends";
import { useSession } from "../../hooks/session-hook";
import { Header } from "../base/components/header";
import { useTheme } from "../../hooks/theme";
import { Navigate } from "react-router";
import { useGetPlayhistory } from "../../api/tracks";
import { Loader } from "../../components/loader/loader";
import { VerticalSongCard } from "../../components/song-card/vertical-song-card";
export default function HomePage() {
  const { session } = useSession();
  const { theme } = useTheme();
  const user: User = session?.user as User;
  const history = useGetPlayhistory();

  if (!session) {
    return <Navigate to="/explore" />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Header />
      </div>

      {session && (
        <div className={styles.sectionContainer}>
          <div className={styles.userContainer}>
            <img
              className={styles.image}
              src={user.user_metadata.avatar || "/user.png"}
              alt={user.user_metadata.username + " profile image"}
            />
            <div>
              <h1>{user.user_metadata.username}</h1>
              <p>Listen Again</p>
            </div>
          </div>
          {history.isPending ? (
            <Loader />
          ) : !history.data ? (
            <p>
              Welcome to Melo! Start listening to personalize your experience.
            </p>
          ) : (
            <ScrollArea>
              <div className={styles.playlistContainer}>
                {history.data.map((song, index) => (
                  <VerticalSongCard song={song} key={index} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </div>
      )}

      {session && (
        <div className={styles.sectionContainer}>
          <p className={styles.pageTitle}>Listening Stats</p>
          <div className={styles.cards}>
            <AnalyticsCard
              label="Listening time"
              value="32 hours"
              sublabel="+12% from last week"
              icon={<Headphones color="gray" />}
              color={theme === "light" ? "#d1d1d1" : "#202020"}
            />
            <AnalyticsCard
              label="Most played genre"
              value="Hip-hop"
              icon={<Tag color="gray" />}
              color={theme === "light" ? "#d1d1d1" : "#202020"}
            />
            <AnalyticsCard
              label="Total songs played"
              value="234"
              sublabel="+32% from last week"
              icon={<Music color="gray" />}
              color={theme === "light" ? "#d1d1d1" : "#202020"}
            />
          </div>
        </div>
      )}

      {session && (
        <>
          <div className={styles.sectionContainer}>
            <ScrollArea showControls title="Most Played">
              <div className={styles.songContainer}>
                {songs.map((song, index) => (
                  <HorizontalSongCard
                    song={song}
                    ranking={index + 1}
                    key={index}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          {/* <div className={styles.sectionContainer}>
            <p className={styles.pageTitle}>Your Listening Trends</p>
            <ListeningTrends />
          </div> */}
        </>
      )}
    </div>
  );
}
