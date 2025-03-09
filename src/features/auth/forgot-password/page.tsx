import { ForgotPasswordCard } from "../components/forgot-password-card";
import styles from "../styles/page.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.modal}>
      <ForgotPasswordCard />
    </div>
  );
}
