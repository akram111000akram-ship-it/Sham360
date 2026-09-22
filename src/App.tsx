import React from "react";
import { RouterProvider, useRouter } from "./services/router";
import { LanguageProvider } from "./services/LanguageContext";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { DirectoryPage } from "./pages/DirectoryPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";
import { ActivateCardPage } from "./pages/ActivateCardPage";

function AppContent() {
  const { currentRoute } = useRouter();
  const isPublicProfileView = currentRoute.route === "profile";

  const renderCurrentPage = () => {
    switch (currentRoute.route) {
      case "products":
        return <ProductsPage />;
      case "profile":
        return <ProfilePage />;
      case "activate":
        return <ActivateCardPage />;
      case "directory":
        return <DirectoryPage />;
      case "dashboard":
        return <DashboardPage />;
      case "admin":
        return <AdminPage />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Ecosystem Top Navigation Bar - strictly removed from public smart profile view */}
      {!isPublicProfileView && <Header />}

      {/* Dynamic Route Viewport */}
      <div className="flex-1">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
}
