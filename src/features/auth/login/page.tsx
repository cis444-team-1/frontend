import { LoginModal } from "../components/login-modal";
import styles from "../styles/page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.modal}>
      <LoginModal />
    </div>
  );
}
