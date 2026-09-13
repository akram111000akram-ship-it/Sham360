// ==========================================
// SHAM360 Unified Type Definitions
// ==========================================

export * from "../components/Sham360ProfileView";
export * from "./profile";

export type RoutePath = "/" | "/p/:slug" | "/directory" | "/dashboard" | "/admin";

export type SupportedLanguage = "ar" | "en";

// Directory Item Definition for Future Expansion
export interface DirectoryListing {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  categorySlug: string;
  city: string;
  description: string;
  avatarUrl: string;
  coverUrl?: string;
  isVerified: boolean;
  hasVrTour: boolean;
  profileSlug?: string;
  googleMapsUrl?: string;
  phone?: string;
  whatsapp?: string;
  rating?: number;
  reviewCount?: number;
}

// User Account Definition for Future Auth & Dashboard
export interface UserAccount {
  id: string;
  email: string;
  role: "customer" | "admin";
  profileId?: string;
  createdAt: string;
}
