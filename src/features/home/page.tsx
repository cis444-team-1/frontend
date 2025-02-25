import { Example } from "./components/example";
import styles from "./styles/page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <p>HomePage</p>
      <Example />
    </div>
  );
}
