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

// ==============================================================================
// Syrian Digital Payments & Wallets Type Definitions
// ==============================================================================

export type SyrianPaymentProvider =
  | "sham_cash"       // شام كاش
  | "syriatel_cash"   // سيريتل كاش
  | "mtn_cash"        // كاش موبايل
  | "al_baraka"       // بنك البركة سورية
  | "bemo"            // بنك بيمو السعودي الفرنسي
  | "cbs"             // المصرف التجاري السوري
  | "revolut"         // ريفولوت Revolut (@Revtag / Link)
  | "wise"            // وايز Wise (Email / Account)
  | "iban"            // تحويل بنكي دولي (IBAN / SWIFT)
  | "crypto"          // عملات رقمية / USDT (TRC20 / ERC20)
  | "paypal"          // بايبال PayPal (me/link)
  | "bank_transfer"   // تحويل مصرفي عام
  | "custom";         // وسيلة دفع مخصصة

export interface PaymentMethodItem {
  id: string;
  provider: SyrianPaymentProvider;
  title: string;
  titleEn?: string;
  accountName?: string;     // اسم المستفيد / صاحب الحساب
  accountNumber: string;    // رقم الحساب أو معرف المحفظة أو عنوان المحفظة أو IBAN
  qrCodeUrl?: string;       // صورة رمز QR المرفوعة أو Base64
  instructions?: string;    // تعليمات وملاحظات التحويل
  instructionsEn?: string;
  currency?: string;        // SYP, USD, EUR, USDT, etc.
  isActive: boolean;
}

export type AudioPresetType =
  | "damascene_oud"       // تقاسيم عود شامي هادئ
  | "courtyard_fountain"  // خرير ماء ونسيم باحة دمشقية
  | "rain_ambient"        // زخات مطر دمشقية هادئة
  | "chill_ambient"       // أجواء مشرقية مهدئة
  | "soundhelix_ambient"  // نغمة استرخاء سحابية
  | "embedded_track"      // مسار مدمج (YouTube / SoundCloud / Spotify / Direct)
  | "custom";

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

  // Background Music / نغمة البروفايل والخلفية الصوتية المدمجة
  backgroundMusicEnabled?: boolean;
  backgroundMusicPreset?: AudioPresetType;
  backgroundMusicUrl?: string; // YouTube, SoundCloud, Spotify, or direct audio link
  backgroundMusicTitle?: string;

  // Syrian Payment Methods & Digital Wallets (شام كاش، سيريتل كاش، الحسابات المصرفية)
  paymentMethodsEnabled?: boolean;
  paymentMethods?: PaymentMethodItem[];
  shamCashNumber?: string;
  syriatelCashNumber?: string;
  shamCashQrUrl?: string;
  syriatelCashQrUrl?: string;
  
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
