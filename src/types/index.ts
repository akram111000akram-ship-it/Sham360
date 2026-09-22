// ==========================================
// SHAM360 Unified Type Definitions
// ==========================================

export * from "../components/Sham360ProfileView";
export * from "./profile";

export type RoutePath = "/" | "/p/:slug" | "/directory" | "/dashboard" | "/admin" | "/activate" | "/products";

export type SupportedLanguage = "ar" | "en";

// Directory Item Definition for Dynamic Firestore Listings
export interface DirectoryListing {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  categorySlug: string;
  city: string;
  cityEn?: string;
  description: string;
  descriptionEn?: string;
  avatarUrl: string;
  coverUrl?: string;
  isVerified: boolean;
  hasVrTour: boolean;
  vrTourEmbedUrl?: string;
  profileSlug?: string;
  googleMapsUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  tags?: string[];
  createdAt?: any;
}

// Cultural & Public Event Definition
export interface SyrianEvent {
  id: string;
  titleAr: string;
  titleEn: string;
  dateText: string;
  startDate: string; // ISO date format YYYY-MM-DD
  endDate?: string;
  time: string;
  city: string;
  cityEn?: string;
  venueAr: string;
  venueEn: string;
  category: "cultural" | "business" | "heritage" | "arts" | "tourism";
  coverImage: string;
  descriptionAr: string;
  descriptionEn: string;
  googleMapsUrl: string;
  organizerAr: string;
  organizerEn?: string;
  priceAr: string;
  priceEn: string;
  whatsappRsvp?: string;
  isFeatured: boolean;
  status: "upcoming" | "ongoing" | "past";
  tags: string[];
  createdAt?: any;
}

// NFC Store Hardware Item Definition
export interface StoreProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  category: "cards" | "stands" | "keychains" | "tags";
  stockStatus: "in_stock" | "low_stock" | "out_of_stock" | "pre_order";
  stockCount: number;
  imageSrc: string;
  badgeAr?: string;
  badgeEn?: string;
  badgeColor?: string;
  featuresAr: string[];
  featuresEn: string[];
  idealForAr: string;
  idealForEn: string;
  descriptionAr: string;
  descriptionEn: string;
  isFeatured?: boolean;
  createdAt?: any;
}

// Cryptographic NFC Card Token Definition
export interface NFCToken {
  id: string; // token string e.g. "sham_a8f9b1c2d3"
  token: string;
  pinHash: string; // Security PIN (e.g. "4829")
  status: "unassigned" | "active" | "revoked";
  profileId?: string;
  profileSlug?: string;
  ownerUid?: string;
  ownerEmail?: string;
  cardType: "metal" | "wood" | "pvc_matte" | "mirror" | "keychain" | "tag";
  batchNumber: string;
  notes?: string;
  createdAt: any;
  activatedAt?: any;
}

// User Account Definition for Auth & Admin Dashboard
export interface UserAccount {
  id: string;
  email: string;
  role: "customer" | "admin";
  profileId?: string;
  createdAt: string;
}

