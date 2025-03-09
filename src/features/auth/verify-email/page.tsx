import { VerifyEmailCard } from "../components/verify-email-card";
import styles from "../styles/page.module.css";

export default function VerifyEmailPage() {
  return (
    <div className={styles.modal}>
      <VerifyEmailCard email="m@example.com" />
    </div>
  );
}
