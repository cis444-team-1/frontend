import { Input } from "../../../components/input/input";
import { AlignJustify, Search } from "lucide-react";
import styles from "../styles/header.module.css";
import { UserButton } from "./user-button";
import { Button } from "../../../components/button/button";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.mobileMenu}>
        <Button type="text" rounded size="large" icon={<AlignJustify />} />
      </div>

      <Input
        placeholder="Search music, artists, albums, or playlists..."
        size="xlarge"
        icon={<Search />}
        className={styles.searchInput}
        containerClassName={styles.searchInputContainer}
      />

      <UserButton />
    </header>
  );
};
