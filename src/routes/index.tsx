
import { createBrowserRouter, RouteObject } from "react-router-dom";

// Layouts
import RootLayout from "@/layouts/RootLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Public Pages
import LandingPage from "@/pages/Landing";
import BlogPage from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";
import TemplatesPage from "@/pages/Templates";
import TemplateDetailPage from "@/pages/TemplateDetail";
import NotFound from "@/pages/NotFound";

// Auth Pages
import LoginPage from "@/features/auth/pages/Login";

// Admin Pages
import DashboardPage from "@/features/dashboard/pages/Dashboard";
import BlogManagementPage from "@/features/blog/pages/BlogManagement";
import BlogEditorPage from "@/features/blog/pages/BlogEditor";
import TemplatesManagementPage from "@/features/templates/pages/TemplatesManagement";
import TemplateEditorPage from "@/features/templates/pages/TemplateEditor";
import SettingsPage from "@/features/settings/pages/Settings";

// Auth Provider
import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import { ThemeProvider } from "@/features/theme/providers/ThemeProvider";

// Routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ThemeProvider>
        <RootLayout />
      </ThemeProvider>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "templates/:id", element: <TemplateDetailPage /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <ThemeProvider>
        <AuthProvider>
          <AuthLayout />
        </AuthProvider>
      </ThemeProvider>
    ),
    children: [{ path: "login", element: <LoginPage /> }],
  },
  {
    path: "/admin",
    element: (
      <ThemeProvider>
        <AuthProvider>
          <AdminLayout />
        </AuthProvider>
      </ThemeProvider>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "blog", element: <BlogManagementPage /> },
      { path: "blog/new", element: <BlogEditorPage /> },
      { path: "blog/edit/:id", element: <BlogEditorPage /> },
      { path: "templates", element: <TemplatesManagementPage /> },
      { path: "templates/new", element: <TemplateEditorPage /> },
      { path: "templates/edit/:id", element: <TemplateEditorPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
