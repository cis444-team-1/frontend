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
    id: "1",
    email: "drake@example.com",
    user_metadata: {
      username: "Drake",
      bio: "Canadian rapper, singer, and songwriter. Known for hits like 'NOKIA' and 'Somebody Loves Me'.",
      avatar: getTestImage(),
      tags: ["rap", "hip-hop", "pop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "2",
    email: "kendrick@example.com",
    user_metadata: {
      username: "Kendrick Lamar",
      bio: "American rapper and songwriter. Known for his lyrical depth and storytelling.",
      avatar: getTestImage(),
      tags: ["rap", "hip-hop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "3",
    email: "pitbull@example.com",
    user_metadata: {
      username: "Pitbull",
      bio: "American rapper and singer. Known for party anthems like 'Time Of Our Lives'.",
      avatar: getTestImage(),
      tags: ["pop", "dance"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "4",
    email: "lilwayne@example.com",
    user_metadata: {
      username: "Lil Wayne",
      bio: "American rapper and record executive. Known for hits like 'Mirror'.",
      avatar: getTestImage(),
      tags: ["rap", "hip-hop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "5",
    email: "partynextdoor@example.com",
    user_metadata: {
      username: "PARTYNEXTDOOR",
      bio: "Canadian singer, songwriter, and record producer. Known for collaborations with Drake.",
      avatar: getTestImage(),
      tags: ["r&b", "pop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "6",
    email: "50cent@example.com",
    user_metadata: {
      username: "50 Cent",
      bio: "American rapper, actor, and entrepreneur. Known for 'In Da Club'.",
      avatar: getTestImage(),
      tags: ["rap", "hip-hop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "7",
    email: "shakira@example.com",
    user_metadata: {
      username: "Shakira",
      bio: "Colombian singer and songwriter. Known for 'Waka Waka'.",
      avatar: getTestImage(),
      tags: ["pop", "dance"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "8",
    email: "rihanna@example.com",
    user_metadata: {
      username: "Rihanna",
      bio: "Barbadian singer, actress, and businesswoman. Known for 'We Found Love'.",
      avatar: getTestImage(),
      tags: ["pop", "dance"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "9",
    email: "chiefkeef@example.com",
    user_metadata: {
      username: "Chief Keef",
      bio: "American rapper and record producer. Known for 'Love Sosa'.",
      avatar: getTestImage(),
      tags: ["rap", "hip-hop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "10",
    email: "kanyewest@example.com",
    user_metadata: {
      username: "Kanye West",
      bio: "American rapper, singer, and fashion designer. Known for 'Runaway'.",
      avatar: getTestImage(),
      tags: ["rap", "hip-hop"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
  {
    id: "11",
    email: "farruko@example.com",
    user_metadata: {
      username: "Farruko",
      bio: "Puerto Rican singer and songwriter. Known for 'Pepas'.",
      avatar: getTestImage(),
      tags: ["reggaeton", "latin"],
    },
    created_at: new Date().toDateString(),
    app_metadata: {},
    aud: "authenticated",
  },
];
