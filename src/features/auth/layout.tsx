import { Outlet } from "react-router-dom";
import styles from "./styles/page.module.css";

export default function AuthLayout() {
  return (
    <div className={styles.layoutContainer}>
      <Outlet />
    </div>
  );
}
