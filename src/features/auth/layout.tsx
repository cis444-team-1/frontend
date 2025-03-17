import { Navigate, Outlet, useLocation } from "react-router-dom";
import styles from "./styles/page.module.css";
import { useSession } from "../../hooks/session-hook";

export default function AuthLayout() {
  const { session } = useSession();
  const pathname = useLocation().pathname;

  // Supabase automatically logs in user when they click on the email link
  const userLoggedInPaths = ["/auth/reset-password", "/auth/verify-email"];
  const userLoggedOutPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];

  // Redirect to home if non-user trying to access user-only routes
  if (!session && pathname in userLoggedInPaths) {
    return <Navigate to="/" />;
  }

  // Redirect to home if logged in but not when trying to access user-only routes
  if (session && pathname in userLoggedOutPaths) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.layoutContainer}>
      <Outlet />
    </div>
  );
}
