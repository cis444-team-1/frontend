import styles from "./styles/page.module.css";
import { TrackTable } from "../../components/track-table/track-table";
import { playlists } from "../../types/playlist";

export default function HistoryPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Play history</h1>

      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>Today</h1>

        <TrackTable playlist={playlists[0]} />
      </section>

      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>Yesterday</h1>

        <TrackTable playlist={playlists[1]} />
      </section>

      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>This week</h1>

        <TrackTable playlist={playlists[2]} />
      </section>

      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>This month</h1>

        <TrackTable playlist={playlists[3]} />
      </section>

      <section className={styles.sectionContainer}>
        <h1 className={styles.sectionTitle}>{new Date().getFullYear()}</h1>

        <TrackTable playlist={playlists[4]} />
      </section>
    </div>
  );
}
