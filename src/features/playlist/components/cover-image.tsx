"use client";

export function CoverImage({ imageSrc }: { imageSrc: string }) {
  return (
    <img
      src={imageSrc}
      alt="Playlist cover"
      style={{
        width: "6rem",
        height: "6rem",
        objectFit: "cover",
        borderRadius: "0.25rem",
      }}
    />
  );
}
