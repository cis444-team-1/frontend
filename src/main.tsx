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
import LoginPage from "./features/auth/login/page";
import AuthLayout from "./features/auth/layout";
import RegisterPage from "./features/auth/register/page";
import ForgotPasswordPage from "./features/auth/forgot-password/page";
import ResetPasswordPage from "./features/auth/reset-password/page";
import VerifyEmailPage from "./features/auth/verify-email/page";
import AdminLayout from "./features/admin/layout";
import { UsersPage } from "./features/admin/users";
import { SessionProvider } from "./context/session-context";
import { Toaster } from "sonner";
import SettingsPage from "./features/settings/page";
import { ModalProvider } from "./context/modal-context";
import { ModalRenderer } from "./components/modals/modal-renderer";
import TermsAndConditionsPage from "./features/terms/page";
import PrivacyPolicyPage from "./features/privacy/page";
import TrackPage from "./features/track/page";

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
    { path: "/playlist/:playlistId", element: <PlaylistPage /> },
    { path: "/library", element: <LibraryPage /> },
    { path: "/explore", element: <ExplorePage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/profile/:userId", element: <ProfilePage /> },
    { path: "/history", element: <HistoryPage /> },
    { path: "/search", element: <SearchPage /> }, // Supports query params, i.e. /search?q=Imagine+Dragons
    { path: "/settings", element: <SettingsPage /> },
    { path: "/terms", element: <TermsAndConditionsPage /> },
    { path: "/privacy", element: <PrivacyPolicyPage /> },
    { path: "/track/:id", element: <TrackPage /> },
    { path: "*", element: <Navigate to="/" /> }, // Catch-all route for unknown routes
  ],
};

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [{ path: "/admin/users", element: <UsersPage /> }],
};

/**
 * These routes are used for authentication. Signed in users cannot access these routes.
 *
 */
const authRoutes = {
  path: "/auth",
  element: <AuthLayout />, // Make sure user isn't logged in for these.
  children: [
    { path: "/auth", element: <Navigate to="/auth/login" /> },
    { path: "/auth/login", element: <LoginPage /> },
    { path: "/auth/register", element: <RegisterPage /> },
    { path: "/auth/reset-password", element: <ResetPasswordPage /> }, // Requires query param token ?token=<id>
    { path: "/auth/verify-email", element: <VerifyEmailPage /> }, // Requires query param token ?token=<id>
    { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },
  ],
};

const router = createBrowserRouter([mainRoutes, authRoutes, adminRoutes], {
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
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModalProvider>
            <RouterProvider router={router} />
            <Toaster
              richColors
              theme={localStorage.getItem("vite-ui-theme") as "light" | "dark"}
            />
            <ModalRenderer />
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  </StrictMode>
);
