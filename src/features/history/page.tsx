import styles from "./styles/page.module.css";
import { TrackTable } from "../../components/track-table/track-table";
import { Navigate } from "react-router";
import { useSession } from "../../hooks/session-hook";
import { useGetPlayhistory } from "../../api/tracks";
import { Loader } from "../../components/loader/loader";
import { Song } from "../../types/song";

export default function HistoryPage() {
  const { session } = useSession();
  const songs = useGetPlayhistory();

  if (!session) {
    return <Navigate to="/auth/login" />;
  }

  function getDateCategory(date: Date): string {
    const now = new Date();
    const played = new Date(date);

    const isToday = played.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = played.toDateString() === yesterday.toDateString();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    const isThisWeek = played >= startOfWeek;

    const isThisMonth =
      played.getMonth() === now.getMonth() &&
      played.getFullYear() === now.getFullYear();

    const isThisYear = played.getFullYear() === now.getFullYear();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    if (isThisWeek) return "This week";
    if (isThisMonth) return "This month";
    if (isThisYear) return String(now.getFullYear());

    return "Older";
  }

  const groupedSongs = songs.data?.reduce<Record<string, Song[]>>(
    (acc, song) => {
      const category = getDateCategory(song.played_at);
      if (!acc[category]) acc[category] = [];
      acc[category].push(song);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.pageContainer}>
      {songs.isPending ? (
        <Loader />
      ) : !songs.data || !groupedSongs ? (
        <p>No songs</p>
      ) : (
        Object.entries(groupedSongs).map(([section, songs]) => (
          <section key={section} className={styles.sectionContainer}>
            <h1 className={styles.sectionTitle}>{section}</h1>
            <TrackTable songs={songs} />
          </section>
        ))
      )}
    </div>
  );
}
