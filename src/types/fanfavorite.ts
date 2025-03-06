import { Song, songs } from "./song";

export interface FanFavorites {
  id: string;
  name: string;
  imageSrc?: string;
  artistName: string;
  createdAt: Date;
  updatedAt: Date;
  songs: Song[];
}

const getTestImage = () => {
  return `https://picsum.photos/id/${Math.floor(
    Math.random() * 300
  )}/2000/2000`;
};

export const fanfavorites: FanFavorites[] = [
  {
    id: "1",
    name: "Fan Favorite",
    imageSrc: getTestImage(),
    artistName: "Artist",
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 8),
  },
  {
    id: "2",
    name: "Fan Favorite",
    imageSrc: getTestImage(),
    artistName: "Artist",
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 10),
  },
  {
    id: "3",
    name: "Fan Favorite",
    imageSrc: getTestImage(),
    artistName: "Artist",
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 5),
  },
  {
    id: "4",
    name: "Fan Favorite",
    imageSrc: getTestImage(),
    artistName: "Artist",
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 2),
  },
  {
    id: "5",
    name: "Fan Favorite",
    imageSrc: getTestImage(),
    artistName: "Artist",
    createdAt: new Date(),
    updatedAt: new Date(),
    songs: songs.slice(0, 20),
  },
];
