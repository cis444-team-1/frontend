import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./features/home/page";
import { ThemeProvider } from "./context/theme-context";

const mainRoutes = {
  path: "/",
  element: (
    <div>
      <Outlet />
    </div>
  ),
  children: [
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <div>About page!</div> },
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
