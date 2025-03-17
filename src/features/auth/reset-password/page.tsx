import { ResetPasswordCard } from "../components/reset-password-card";
import styles from "../styles/page.module.css";

export default function ResetPasswordPage() {
  return (
    <div className={styles.modal}>
      <ResetPasswordCard />
    </div>
  );
}
