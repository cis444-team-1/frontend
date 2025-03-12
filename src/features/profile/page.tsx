import styles from "./styles/page.module.css";
import profileStyles from "./styles/profile-header.module.css";
import { PublicUserView } from "./components/public-user-view";
import { PrivateUserView } from "./components/private-user-view";
import { ArtistView } from "./components/artist-user-view";
import { users } from "../../types/user";
import { useState } from "react";
import { Button } from "../../components/button/button";

export default function ProfilePage() {
  const user = users[0];

  const [state, setState] = useState<1 | 2 | 3 | null>(null);
  const randomBackground = "https://picsum.photos/1920/1080";

  return (
    <div style={{ position: "relative", display: "contents" }}>
      {state && (
        <>
          <img
            src={randomBackground}
            alt="background"
            className={profileStyles.backgroundImage}
          />
          <div className={profileStyles.gradient}></div>
        </>
      )}
      <div className={styles.pageContainer}>
        {/** TODO: REMOVE ONCE DEVELOPMENT IS DONE */}
        {state === null && (
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <h1 style={{ marginTop: "10rem" }}>
              Development: Choose Profile Type
            </h1>
            <Button size="xlarge" onClick={() => setState(1)}>
              Public Profile View
            </Button>
            <Button size="xlarge" onClick={() => setState(2)}>
              Private Profile View
            </Button>
            <Button size="xlarge" onClick={() => setState(3)}>
              Artist Profile View
            </Button>
          </div>
        )}

        {state === 1 && <PublicUserView user={user} />}
        {state === 2 && <PrivateUserView user={user} />}
        {state === 3 && <ArtistView user={user} />}
      </div>
    </div>
  );
}
