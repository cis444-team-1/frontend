export const routes = {
  uploadFile: "/generate-presigned-url",
  createPlaylist: "/playlists",
  getUserPlaylists: "/playlists",
  getPublicPlaylists: (id: string) => `/playlists/user/${id}`,
  getPlaylistById: (id: string) => `/playlists/${id}`,
  getPlaylistTracks: (id: string) => `/playlists/${id}/tracks`,
  createTrack: "/tracks",
  getUserPrivateUploads: "/tracks/uploads",
  getPublicUser: (id: string) => `/users/${id}`,
  getPublicUsers: "/users/many",
  addSongToPlaylist: (id: string) => `/playlists/${id}/tracks`,
  removeSongFromPlaylist: (id: string) => `/playlists/${id}/tracks`,
  search: (query: string) => `/search?q=${query}`,
  getPlayHistory: "/tracks/history",
  addToPlayHistory: (id: string) => `/tracks/history/${id}`,
  removeFromPlayHistory: (id: string) => `/tracks/history/${id}`,
  trending: "/tracks/trending",
  topCharts: "/tracks/top-charts",
  newReleases: "/playlists/new-releases",
  getTrackById: (id: string) => `/tracks/${id}`,
  deleteTrack: (id: string) => `/tracks/${id}`,
};
