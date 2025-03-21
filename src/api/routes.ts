export const routes = {
  uploadFile: "/generate-presigned-url",
  createPlaylist: "/playlist",
  getUserPlaylists: (id: string) => `/playlist?user_id=${id}`,
  getPlaylist: (id: string) => `/playlist/${id}`,
};
