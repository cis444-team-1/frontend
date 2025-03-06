export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  imageSrc?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

const getTestImage = () => {
  return `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 50)}`;
};

export const users: User[] = [
  {
    id: "1",
    username: "SkyWalker_92",
    email: "8o5vH@example.com",
    bio: "Adventure seeker, sci-fi lover, and coffee addict. I'm a part-time artist and full-time daydreamer. I'm passionate about exploring new places and meeting new people. I'm a sucker for a good pun and a fan of the Oxford comma. I'm always looking for new collaborators and mentors to help me grow as an artist. ",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["travel", "sci-fi", "coffee"],
  },
  {
    id: "2",
    username: "PixelPioneer",
    email: "9o6eA@example.com",
    bio: "Game dev enthusiast exploring the digital world.",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["gamedev", "tech", "indie"],
  },
  {
    id: "3",
    username: "LunarEcho",
    email: "ZL2k9@example.com",
    bio: "Dreamer with a passion for astronomy and poetry.",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["space", "poetry", "dreams"],
  },
  {
    id: "4",
    username: "ByteBender",
    email: "KXq4M@example.com",
    bio: "Software engineer turning coffee into code.",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["coding", "tech", "debugging"],
  },
  {
    id: "5",
    username: "NeonNomad",
    email: "KXq4M@example.com",
    bio: "Exploring cyberpunk aesthetics and urban culture.",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["cyberpunk", "art", "design"],
  },
  {
    id: "6",
    username: "EchoWanderer",
    email: "KXq4M@example.com",
    bio: "Wandering through ideas, stories, and distant lands.",
    imageSrc: getTestImage(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["travel", "philosophy", "stories"],
  },
];
