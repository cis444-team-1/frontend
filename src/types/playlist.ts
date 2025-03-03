import { Song, songs } from "./song";

export interface Playlist {
  id: string;
  name: string;
  imageSrc?: string;
  createdAt: Date;
  updatedAt: Date;
  songs: Song[]; // Not part of the API, but will be appended by the client
  userId?: string;
}

const testImage = "https://picsum.photos/2000/2000";

export const playlists: Playlist[] = [
  {
    id: "1",
    name: "Playlist One",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "2",
    name: "Playlist Two",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "3",
    name: "Playlist Three",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "4",
    name: "Playlist Four",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
  {
    id: "5",
    name: "Playlist Five",
    imageSrc: testImage,
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: [...songs],
  },
];
