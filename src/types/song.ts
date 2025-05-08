export interface SongAPIRequest {
  track_id: string;
  title: string;
  image_src: string;
  audio_src: string;
  created_at: string;
  updated_at: string;
  uploaded_id: string;
  artist_name: string;
  album_title: string;
  description: string;
  duration_seconds: number;
}

export interface Song {
  track_id: string;
  title: string;
  image_src: string;
  audio_src: string;
  created_at: string;
  updated_at: string;
  uploaded_id: string;
  artist_name: string;
  album_title: string;
  description: string;
  duration_seconds: number;
}

export const MUSIC_TYPES: string[] = [
  // Moods
  "Happy",
  "Sad",
  "Relaxing",
  "Energetic",
  "Romantic",
  "Melancholic",
  "Chill",
  "Uplifting",
  "Dark",
  "Epic",
  "Calm",
  "Motivational",
  "Mysterious",
  "Groovy",
  "Euphoric",
  "Peaceful",
  "Aggressive",
  "Nostalgic",
  "Dreamy",
  "Somber",
  "Soulful",
  "Reflective",
  "Playful",
  "Hypnotic",
  "Sensual",

  // Genres
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Jazz",
  "Blues",
  "Classical",
  "Electronic",
  "House",
  "Techno",
  "Trance",
  "Reggae",
  "Salsa",
  "Country",
  "Folk",
  "Metal",
  "Punk",
  "Indie",
  "Alternative",
  "Funk",
  "Soul",
  "Gospel",
  "Ambient",
  "Lo-Fi",
  "Soundtrack",
] as const;

const getTestImage = () => {
  return `https://picsum.photos/id/${Math.floor(
    Math.random() * 300
  )}/2000/2000`;
};

const audioFiles = [
  "/songs/DRAKE-NOKIA.mp3",
  "/songs/KENDRICKLAMAR-NOTLIKEUS.mp3",
  "/songs/Pitbull-Time Of Our Lives.mp3",
  "/songs/Lil Wayne-Mirror ft. Bruno Mars.mp3",
  "/songs/PARTYNEXTDOOR & DRAKE - SOMEBODY LOVES ME.mp3",
  "/songs/50 Cent - In Da Club (Official Music Video).mp3",
  "/songs/Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song).mp3",
  "/songs/Kanye West - Runaway (Extended Video Version) ft. Pusha T.mp3",
  "/songs/Taylor Swift - You Belong With Me.mp3",
  "/songs/Farruko - Pepas (Official Video).mp3",
  "/songs/Chief Keef - Love Sosa.mp3",
  "/songs/Rihanna - We Found Love ft. Calvin Harris.mp3",
];

export const songs: Song[] = [
  {
    track_id: "1",
    title: "NOKIA",
    image_src: getTestImage(),
    audio_src: audioFiles[0],
    artist_name: "Drake",
    album_title: "",
    description: "Description of NOKIA",
    duration_seconds: 265,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "2",
    title: "Not Like Us",
    image_src: getTestImage(),
    audio_src: audioFiles[1],
    artist_name: "Kendrick Lamar",
    album_title: "",
    description: "This is a description of Not Like US.",
    duration_seconds: 273,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "3",
    title: "Time Of Our Lives",
    image_src: getTestImage(),
    audio_src: audioFiles[2],
    artist_name: "Pitbull",
    album_title: "",
    description: "This is a description of Time Of Our Lives.",
    duration_seconds: 281,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "4",
    title: "Mirror",
    image_src: getTestImage(),
    audio_src: audioFiles[3],
    artist_name: "Lil Wayne",
    album_title: "",
    description: "This is a description of Mirror.",
    duration_seconds: 242,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "5",
    title: "Somebody Loves Me",
    image_src: getTestImage(),
    audio_src: audioFiles[4],
    artist_name: "PARTYNEXTDOOR",
    album_title: "",
    description: "This is a description of Somebody Loves Me.",
    duration_seconds: 182,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "6",
    title: "In Da Club",
    image_src: getTestImage(),
    audio_src: audioFiles[5],
    artist_name: "50 Cent",
    album_title: "",
    description: "This is a description of In Da Club.",
    duration_seconds: 247,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "7",
    title: "Waka Waka",
    image_src: getTestImage(),
    audio_src: audioFiles[6],
    artist_name: "Shakira",
    album_title: "",
    description: "This is a description of Waka Waka.",
    duration_seconds: 210,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "8",
    title: "Runaway",
    image_src: getTestImage(),
    audio_src: audioFiles[7],
    artist_name: "Kanye West",
    album_title: "",
    description: "This is a description of Runaway.",
    duration_seconds: 408,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "9",
    title: "You Belong With Me",
    image_src: getTestImage(),
    audio_src: audioFiles[8],
    artist_name: "Taylor Swift",
    album_title: "",
    description: "This is a description of You Belong With Me.",
    duration_seconds: 228,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "10",
    title: "Pepas",
    image_src: getTestImage(),
    audio_src: audioFiles[9],
    artist_name: "Farruko",
    album_title: "",
    description: "This is a description of Pepas.",
    duration_seconds: 293,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "11",
    title: "Love Sosa",
    image_src: getTestImage(),
    audio_src: audioFiles[10],
    artist_name: "Chief Keef",
    album_title: "",
    description: "This is a description of Love Sosa.",
    duration_seconds: 218,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
  {
    track_id: "12",
    title: "We Found Love",
    image_src: getTestImage(),
    audio_src: audioFiles[11],
    artist_name: "Rihanna",
    album_title: "",
    description: "This is a description of We Found Love.",
    duration_seconds: 276,
    created_at: "",
    updated_at: "",
    uploaded_id: "",
  },
];
