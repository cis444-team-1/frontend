import { Link } from "react-router";
import { Playlist } from "../../types/playlist";
// import styles from "./styles.module.css";
import { Play } from "lucide-react";

export const VerticalPlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <div>
      <div>
        <img src={playlist.imageSrc} />
        <div>
          <Link to={`/playlist/${playlist.id}`}>
            <Play fill="white" />
          </Link>
        </div>
      </div>
      <p>{playlist.name}</p>
      <p>
        {playlist.userId} • {playlist.songs.length} tracks
      </p>
      <p></p>
    </div>
  );
};
