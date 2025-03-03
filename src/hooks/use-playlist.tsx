import React, { createContext, useContext } from "react";
import { Playlist } from "../types/playlist";

type PlaylistContextType = {
  playlists: Playlist[];
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export function PlaylistProvider({
  children,
  playlists,
}: {
  children: React.ReactNode;
  playlists: Playlist[];
}) {
  return (
    <PlaylistContext.Provider value={{ playlists }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
}
