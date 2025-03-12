import { Song, songs } from "./song";

export interface Playlist {
  id: string;
  name: string;
  imageSrc?: string;
  createdAt: Date;
  updatedAt: Date;
  songs: Song[]; // Not part of the API, but will be appended by the client
  userId?: string;
  visbility: "public" | "private";
}

const getTestImage = () => {
  return `https://picsum.photos/id/${Math.floor(
    Math.random() * 300
  )}/2000/2000`;
};

export const playlists: Playlist[] = [
  {
    id: "1",
    name: "Liked Songs",
    imageSrc: "liked-songs.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "DextrousSafe",
  },
  {
    id: "2",
    name: "Playlist Two",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "public",
    userId: "JamesBond",
  },
  {
    id: "3",
    name: "Playlist Three",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "public",
    userId: "JamesBond",
  },
  {
    id: "4",
    name: "Playlist Four",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "Batman123",
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "Batman123",
  },
  {
    id: "6",
    name: "Playlist Six",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "Batman123",
  },
  {
    id: "7",
    name: "Playlist Seven",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "Batman123",
  },
  {
    id: "8",
    name: "Playlist Eight",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "Batman123",
  },
  {
    id: "9",
    name: "Playlist Nine",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
    visbility: "private",
    userId: "Batman123",
  },
];
