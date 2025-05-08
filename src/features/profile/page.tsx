import styles from "./styles/page.module.css";
import profileStyles from "./styles/profile-header.module.css";
import { PublicUserView } from "./components/public-user-view";
import { PrivateUserView } from "./components/private-user-view";
import { useSession } from "../../hooks/session-hook";
import { useLocation } from "react-router";
import { useGetPublicUser } from "../../api/user";
import { Loader } from "../../components/loader/loader";

export default function ProfilePage() {
  const { session } = useSession();
  const userId = useLocation().pathname.split("/")[2];
  const user = useGetPublicUser(userId);

  const isPersonal = userId === session?.user.id;

  const randomBackground = "https://picsum.photos/1920/1080";

  return (
    <div style={{ position: "relative", display: "contents" }}>
      <>
        <img
          src={randomBackground}
          alt="background"
          className={profileStyles.backgroundImage}
        />
        <div className={profileStyles.gradient}></div>
      </>

      <div className={styles.pageContainer}>
        {user.isPending ? (
          <Loader />
        ) : !user.data ? (
          <p>User not found</p>
        ) : isPersonal ? (
          <PrivateUserView />
        ) : (
          <PublicUserView user={user.data} />
        )}
      </div>
    </div>
  );
}
