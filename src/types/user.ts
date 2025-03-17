import { User as SupabaseUser } from "@supabase/supabase-js";

// TODO: Remove once development is done, just for testing
export interface OldUser {
  id: string;
  username: string;
  email: string;
  bio?: string;
  imageSrc?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface UserMetadata {
  is_onboarded?: boolean;
  bio?: string;
  avatar?: string;
  tags?: string[];
  role?: "user" | "artist" | "admin";
  username?: string;
}

export interface User extends SupabaseUser {
  user_metadata: UserMetadata;
}

const getTestImage = () => {
  return `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 50)}`;
};

export const users: User[] = [
  {
    id: "2",
    email: "mysticWave@example.com",
    user_metadata: {
      username: "MysticWave",
      bio: "Poet by night, coder by day. I find inspiration in the ocean waves and the rhythm of the universe. Always searching for meaning in the little things.",
      avatar: getTestImage(),
      tags: ["poetry", "coding", "nature"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "3",
    email: "quantumQuest@example.com",
    user_metadata: {
      username: "QuantumQuest",
      bio: "Physics enthusiast and lifelong learner. I enjoy discussing quantum mechanics, AI ethics, and sci-fi theories. Let's explore the unknown together!",
      avatar: getTestImage(),
      tags: ["physics", "AI", "sci-fi"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "4",
    email: "stellarVibes@example.com",
    user_metadata: {
      username: "StellarVibes",
      bio: "Music producer and space nerd. I create beats inspired by the cosmos and love geeking out about astronomy and deep space exploration.",
      avatar: getTestImage(),
      tags: ["music", "space", "production"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "5",
    email: "arcadeRebel@example.com",
    user_metadata: {
      username: "ArcadeRebel",
      bio: "Retro gaming addict and pixel artist. Always up for a challenge in old-school platformers and designing pixel-perfect art.",
      avatar: getTestImage(),
      tags: ["gaming", "art", "retro"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "6",
    email: "ecoWanderer@example.com",
    user_metadata: {
      username: "EcoWanderer",
      bio: "Nature lover, sustainability advocate, and wildlife photographer. Passionate about preserving our planet and capturing its beauty through my lens.",
      avatar: getTestImage(),
      tags: ["nature", "photography", "sustainability"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
];
