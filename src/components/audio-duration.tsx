import { useEffect, useRef, useState } from "react";

export function AudioDuration({ src }: { src: string }) {
  const [duration, setDuration] = useState<string>("...");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const onLoad = () => {
      const dur = audio.duration;
      const minutes = Math.floor(dur / 60);
      const seconds = Math.floor(dur % 60)
        .toString()
        .padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    };

    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("error", () => setDuration("0:00"));

    return () => {
      audio.removeEventListener("loadedmetadata", onLoad);
    };
  }, [src]);

  return <>{duration}</>;
}
