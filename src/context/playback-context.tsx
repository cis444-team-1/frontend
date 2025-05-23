import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { Song } from "../types/song";
import { useSession } from "../hooks/session-hook";
import { useAddToPlayHistory } from "../api/tracks";

type Panel = "sidebar" | "tracklist";

type PlaybackContextType = {
  isPlaying: boolean;
  currentTrack: Song | null;
  currentTime: number;
  duration: number;
  togglePlayPause: () => void;
  playTrack: (track: Song) => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlaylist: (songs: Song[]) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  activePanel: Panel;
  setActivePanel: (panel: Panel) => void;
  registerPanelRef: (panel: Panel, ref: React.RefObject<HTMLElement>) => void;
  handleKeyNavigation: (e: React.KeyboardEvent, panel: Panel) => void;
};

export const PlaybackContext = createContext<PlaybackContextType | undefined>(
  undefined
);

function useKeyboardNavigation() {
  const [activePanel, setActivePanel] = useState<Panel>("sidebar");
  const panelRefs = useRef<Record<Panel, React.RefObject<HTMLElement> | null>>({
    sidebar: null,
    tracklist: null,
  });

  const registerPanelRef = useCallback(
    (panel: Panel, ref: React.RefObject<HTMLElement>) => {
      panelRefs.current[panel] = ref;
    },
    []
  );

  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent, panel: Panel) => {
      const currentRef = panelRefs.current[panel];
      if (!currentRef?.current) return;

      const items = Array.from(
        currentRef.current.querySelectorAll('[tabindex="0"]')
      );
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case "ArrowDown":
        case "j":
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          (items[nextIndex] as HTMLElement).focus();
          break;
        case "ArrowUp":
        case "k":
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + items.length) % items.length;
          (items[prevIndex] as HTMLElement).focus();
          break;
        case "h":
          if (panel === "tracklist") {
            e.preventDefault();
            setActivePanel("sidebar");
            const sidebarFirstItem =
              panelRefs.current.sidebar?.current?.querySelector(
                '[tabindex="0"]'
              ) as HTMLElement | null;
            sidebarFirstItem?.focus();
          }
          break;
        case "l":
          if (panel === "sidebar") {
            e.preventDefault();
            setActivePanel("tracklist");
            const tracklistFirstItem =
              panelRefs.current.tracklist?.current?.querySelector(
                '[tabindex="0"]'
              ) as HTMLElement | null;
            tracklistFirstItem?.focus();
          }
          break;
      }
    },
    []
  );

  return { activePanel, setActivePanel, registerPanelRef, handleKeyNavigation };
}

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { session } = useSession();
  const addToPlayHistory = useAddToPlayHistory();

  const { activePanel, setActivePanel, registerPanelRef, handleKeyNavigation } =
    useKeyboardNavigation();

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const playTrack = useCallback(
    (track: Song) => {
      if (session) {
        console.log("Adding to play history");
        addToPlayHistory.mutate({ trackId: track.track_id });
      }

      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);
      if (audioRef.current) {
        console.log(track.title + " is playing now.");
        audioRef.current.src = getAudioSrc(track.audio_src as string);
        audioRef.current.play();
      }
      setActivePanel("tracklist");
    },
    [setActivePanel, addToPlayHistory, session]
  );

  const playNextTrack = useCallback(() => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        (track) => track.track_id === currentTrack.track_id
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      playTrack(playlist[nextIndex]);
    }
  }, [currentTrack, playlist, playTrack]);

  const playPreviousTrack = useCallback(() => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        (track) => track.track_id === currentTrack.track_id
      );
      const previousIndex =
        (currentIndex - 1 + playlist.length) % playlist.length;
      playTrack(playlist[previousIndex]);
    }
  }, [currentTrack, playlist, playTrack]);

  const getAudioSrc = (url: string) => {
    if (url.startsWith("file://")) {
      const filename = url.split("/").pop();
      return `/api/audio/${encodeURIComponent(filename || "")}`;
    }
    return url;
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
      }
      //   else if (e.key === "/") {
      //     e.preventDefault();
      //     const searchInput = document.querySelector(
      //       'input[type="search"]'
      //     ) as HTMLInputElement | null;
      //     searchInput?.focus();
      //   }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [togglePlayPause]);

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        togglePlayPause,
        playTrack,
        playNextTrack,
        playPreviousTrack,
        setCurrentTime,
        setDuration,
        setPlaylist,
        // @ts-ignore
        audioRef,
        activePanel,
        setActivePanel,
        registerPanelRef,
        handleKeyNavigation,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}
