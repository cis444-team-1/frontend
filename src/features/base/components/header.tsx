import { Input } from "../../../components/input/input";
import { AlignJustify, Search } from "lucide-react";
import styles from "../styles/header.module.css";
import { UserButton } from "./user-button";
import { Button } from "../../../components/button/button";
import { useNavigate } from "react-router";
import { useState } from "react";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.mobileMenu}>
        <Button type="text" rounded size="large" icon={<AlignJustify />} />
      </div>

      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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
