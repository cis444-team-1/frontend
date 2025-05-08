export interface Playlist {
  playlist_id?: string;
  user_id?: string;
  title: string;
  description?: string;
  is_public: boolean;
  image_src?: string;
  created_at?: Date;
  created_by?: string;
}

export interface PlaylistAPIRequest {
  playlist_id?: string;
  user_id?: string;
  title: string;
  description?: string;
  is_public: boolean;
  image_src?: string;
  created_at?: Date;
  created_by?: string;
}
