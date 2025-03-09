import { RegisterModal } from "../components/register-modal";
import styles from "../styles/page.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.modal}>
      <RegisterModal />
    </div>
  );
}
