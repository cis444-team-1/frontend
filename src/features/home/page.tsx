import { newrelease } from "../../types/newreleaseplaylist";
import { fanfavorites } from "../../types/fanfavorite";
import { playlists } from "../../types/playlist";
import styles from "./styles/page.module.css";
import { VerticalPlaylistCard } from "../../components/playlist-card/vertical-card";
import { NewReleases } from "./components/newreleases";
import { FanFavorite } from "./components/fanfavorite";
import { Input } from "../../components/input/input";
import { Headphones, Music, Search, Tag } from "lucide-react";
import { ScrollArea, ScrollBar } from "../../components/scrollarea/scroll-area";
import { users } from "../../types/user";
import { AnalyticsCard } from "../../components/analytic-card/card";
import { HorizontalSongCard } from "../../components/song-card/song-card";
import { songs } from "../../types/song";
import { ListeningTrends } from "./components/listening-trends";
import { VerticalArtistCard } from "../../components/artist-card/vertical-card";
export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <Input
          placeholder="Search music, artists, albums, or playlists..."
          size="xlarge"
          icon={<Search />}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.userContainer}>
          <img
            className={styles.image}
            src={users[0].imageSrc}
            alt={users[0].username}
          />
          <div>
            <h1>{users[0].username}</h1>
            <p>Listen Again</p>
          </div>
        </div>
        <ScrollArea>
          <div className={styles.playlistContainer}>
            {[...playlists, ...playlists].map((playlist, index) => (
              <VerticalPlaylistCard playlist={playlist} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Listening Stats</p>
        <div className={styles.cards}>
          <AnalyticsCard
            label="listening time"
            value="32 hours"
            sublabel="+12% from last week"
            icon={<Headphones color="gray" />}
            color="#202020"
          />
          <AnalyticsCard
            label="most played genre"
            value="Hip-hop"
            icon={<Tag color="gray" />}
            color="#202020"
          />
          <AnalyticsCard
            label="total songs played"
            value="234"
            sublabel="+32% from last week"
            icon={<Music color="gray" />}
            color="#202020"
          />
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="New Releases for You" showControls>
          <div className={styles.playlistContainer}>
            {newrelease.map((playlist, index) => (
              <NewReleases playlist={playlist} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="Bruno Mars Fans Love" showControls>
          <div className={styles.playlistContainer}>
            {fanfavorites.map((playlist, index) => (
              <FanFavorite playlist={playlist} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea showControls title="Most Played">
          <div className={styles.songContainer}>
            {songs.map((song, index) => (
              <HorizontalSongCard song={song} ranking={index + 1} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className={styles.sectionContainer}>
        <p className={styles.pageTitle}>Your Listening Trends</p>
        <ListeningTrends />
      </div>

      <div className={styles.sectionContainer}>
        <ScrollArea title="Following" showControls>
          <div className={styles.playlistContainer}>
            {users.map((user, index) => (
              <VerticalArtistCard user={user} key={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
