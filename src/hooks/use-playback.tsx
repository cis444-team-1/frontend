import { useContext } from "react";
import { PlaybackContext } from "../context/playback-context";

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (context === undefined) {
    throw new Error("usePlayback must be used within a PlaybackProvider");
  }
  return context;
}
