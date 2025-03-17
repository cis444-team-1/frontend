import { useSession } from "../../../hooks/session-hook";
import { User } from "../../../types/user";
import { Link } from "react-router";
import { Button } from "../../../components/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/dropdown-menu.tsx/dropdown-menu";
import { History, LogOut, Moon, Settings, Sun, Users } from "lucide-react";
import supabase from "../../../supabase";
import { useTheme } from "../../../hooks/theme";
import styles from "../styles/user-button.module.css";

export const UserButton = () => {
  const { session } = useSession();
  const { setTheme, theme } = useTheme();
  const user: User = session?.user as User;

  if (!session || !user) {
    return (
      <>
        <Button
          type="text"
          size="small"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          icon={theme === "light" ? <Moon /> : <Sun />}
        />
        <Link to="/auth/login">
          <Button type="default" size="xlarge" className={styles.loginButton}>
            Login
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Button
        type="text"
        size="small"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        icon={theme === "light" ? <Moon /> : <Sun />}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="text"
            rounded
            size="large"
            className={styles.userButton}
            icon={
              <img
                src={user.user_metadata.avatar || "/placeholder.svg"}
                className={styles.avatar}
              />
            }
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" style={{ width: "14rem" }}>
          <Link to={`/profile/${user.id}`}>
            <DropdownMenuItem>
              <img
                src={user.user_metadata.avatar || "/placeholder.svg"}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <h1>{user.user_metadata.username || "Anonymous User"}</h1>
                <p>{user.email}</p>
              </div>
            </DropdownMenuItem>
          </Link>

          <div className={styles.divider} />

          <Link to="/history">
            <DropdownMenuItem>
              <History /> History
            </DropdownMenuItem>
          </Link>
          <Link to="/settings">
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
          </Link>
          <Link to="/admin/users">
            <DropdownMenuItem>
              <Users />
              Users
            </DropdownMenuItem>
          </Link>

          <div className={styles.divider} />

          <DropdownMenuItem
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
