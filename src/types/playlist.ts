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

// TODO: MAKE THIS THE MAIN PLAYLIST LATER, THIS IS FROM API
export interface PlaylistAPIRequest {
  playlist_id?: string;
  user_id?: string;
  title: string;
  description?: string;
  is_public: boolean;
  image_src?: string;
  created_at?: Date;
  songs?: Song[]; // Not part of the entity, but will be appended by the api
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
