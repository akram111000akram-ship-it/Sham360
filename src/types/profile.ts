// ==============================================================================
// SHAM360 Smart Profile Type Definitions
// ==============================================================================

export type ProfileType = "individual" | "business";

export interface ProfileLinkItem {
  id: string;
  label: string;
  url: string;
  iconName?: string;
  isHighlight?: boolean;
  description?: string;
  category?: "document" | "cv" | "portfolio" | "social" | "custom";
}

export interface ProfileContactDetails {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  location?: string;
  googleMapsUrl?: string;
}

/**
 * Firestore storage representation of a SHAM360 Smart Profile.
 */
export interface FirestoreProfile {
  id: string;
  slug: string;
  profileType: ProfileType;
  name: string;
  nameEn?: string;
  title: string;
  businessName?: string;
  bio?: string;
  
  // Categorization & Directory attributes
  category?: string;       // e.g. "مطاعم", "عيادات طبية", "فنادق", "هندسة وبرمجة"
  categorySlug?: string;   // e.g. "restaurants", "medical", "hotels", "engineering"
  city?: string;           // e.g. "دمشق", "حلب", "اللاذقية", "حمص"
  directoryEnabled: boolean;
  
  // Media & Visual Assets
  profileImage: string;
  coverImage?: string;
  logoImage?: string;
  hasVrTour?: boolean;
  vrTourEmbedUrl?: string;
  hasGoogleMapsOptimization?: boolean;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  
  // Contact & Social
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  location?: string;
  googleMapsUrl?: string;
  socialLinks?: Record<string, string>;
  links?: ProfileLinkItem[];

  // Direct Tap Redirect Mode (نمط التوجيه المباشر)
  direct_redirect_enabled?: boolean;
  direct_redirect_url?: string;
  directRedirectEnabled?: boolean;
  directRedirectUrl?: string;

  // Background Music / نغمة البروفايل والخلفية الصوتية
  backgroundMusicEnabled?: boolean;
  backgroundMusicPreset?: "damascene_oud" | "chill_ambient" | "courtyard_fountain" | "soundhelix_ambient" | "custom";
  backgroundMusicUrl?: string;
  backgroundMusicTitle?: string;
  
  // Status & Metadata
  isActive: boolean;
  isVerified?: boolean;
  ownerUid?: string;       // Firebase Auth User UID of the owner
  createdAt: any;
  updatedAt: any;
}

/**
 * Helper to validate if a slug is URL-safe and standard
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
