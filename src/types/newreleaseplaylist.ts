import { Song, songs } from "./song";

export interface NewReleasePlaylist {
  id: string;
  name: string;
  imageSrc?: string;
  artistName: string; // Renamed from userId
  releaseType: "album" | "single" | "EP"; // Added
  releaseDate: Date; // Added
  totalTracks: number; // Added
  createdAt: Date;
  updatedAt: Date;
  songs: Song[]; // List of songs in this release
}

const getTestImage = () => {
  return `https://picsum.photos/id/${Math.floor(
    Math.random() * 300
  )}/2000/2000`;
};

export const newrelease: NewReleasePlaylist[] = [
  {
    id: "1",
    name: "New Album",
    imageSrc: getTestImage(),
    artistName: "Artist 1",
    releaseType: "album",
    releaseDate: new Date("2024-03-01"),
    totalTracks: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 12),
  },
  {
    id: "2",
    name: "New Single",
    imageSrc: getTestImage(),
    artistName: "Artist 2",
    releaseType: "single",
    releaseDate: new Date("2024-03-05"),
    totalTracks: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 1),
  },
  {
    id: "3",
    name: "New EP",
    imageSrc: getTestImage(),
    artistName: "Artist 3",
    releaseType: "EP",
    releaseDate: new Date("2024-03-10"),
    totalTracks: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 5),
  },
  {
    id: "4",
    name: "New Album",
    imageSrc: getTestImage(),
    artistName: "Artist 4",
    releaseType: "album",
    releaseDate: new Date("2024-03-07"),
    totalTracks: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 8),
  },
  {
    id: "5",
    name: "New Single",
    imageSrc: getTestImage(),
    artistName: "Artist 5",
    releaseType: "single",
    releaseDate: new Date("2024-03-02"),
    totalTracks: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 1),
  },
];
