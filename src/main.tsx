import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./context/theme-context";
import PlaylistPage from "./features/playlist/page";
import PlaybackLayout from "./features/base/components/playback-layout";
import LibraryPage from "./features/library/page";
import ExplorePage from "./features/explore/page";
import ProfilePage from "./features/profile/page";
import HomePage from "./features/home/page";
import HistoryPage from "./features/history/page";
import SearchPage from "./features/search/page";

/**
 * These routes are used by the playback layout.
 * See `src/features/base/components/playback-layout.tsx`
 *
 * This means that there is music on these routes that can be played.
 */
const mainRoutes = {
  path: "/",
  element: <PlaybackLayout />,
  children: [
    { path: "/", element: <HomePage /> },
    { path: "/playlist", element: <PlaylistPage /> },
    { path: "/library", element: <LibraryPage /> },
    { path: "/explore", element: <ExplorePage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/profile/:userId", element: <ProfilePage /> },
    { path: "/history", element: <HistoryPage /> },
    { path: "/search", element: <SearchPage /> }, // Supports query params, i.e. /search?q=Imagine+Dragons
    { path: "*", element: <Navigate to="/" /> }, // Catch-all route for unknown routes
  ],
};

/**
 * These routes are not used by the playback layout. Meaning that there is no music to be played.
 *
 */
const nonPlaybackRoutes = {
  element: <div>NonPlayback</div>,
  children: [
    { path: "/privacy", element: <div>Privacy</div> },
    { path: "/about", element: <div>About</div> },
    { path: "/contact", element: <div>Contact</div> },
    { path: "/terms", element: <div>Terms</div> },
    { path: "/settings", element: <div>Settings</div> },
  ],
};

const adminRoutes = {
  path: "/admin",
  children: [{ path: "users", element: <div>Users</div> }],
};

/**
 * These routes are used for authentication. Signed in users cannot access these routes.
 *
 */
const authRoutes = {
  path: "/auth",
  element: <div>Auth</div>, // Make sure user isn't logged in for these.
  children: [
    { path: "login", element: <div>Login</div> },
    { path: "register", element: <div>Register</div> },
    { path: "reset-password", element: <div>Reset Password</div> },
    { path: "verify-email", element: <div>Verify Email</div> },
    { path: "forgot-password", element: <div>Forgot Password</div> },
  ],
};

const router = createBrowserRouter(
  [mainRoutes, nonPlaybackRoutes, authRoutes, adminRoutes],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
