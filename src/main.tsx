import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/theme-context";
import PlaylistPage from "./features/playlist/page";
import PlaybackLayout from "./features/base/components/playback-layout";
import LibraryPage from "./features/library/page";
import ExplorePage from "./features/explore/page";
import HomePage from "./features/home/page";

const mainRoutes = {
  path: "/",
  element: <PlaybackLayout />,
  children: [
    { path: "/", element: <HomePage /> },
    { path: "/playlist", element: <PlaylistPage /> },
    { path: "/library", element: <LibraryPage /> },
    { path: "/explore", element: <ExplorePage /> },
  ],
};

const router = createBrowserRouter([mainRoutes], {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

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
