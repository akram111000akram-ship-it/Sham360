import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Download,
  Sparkles,
  MessageCircle,
  Star,
  QrCode,
  Copy,
  Check,
  Navigation,
  Compass,
  Building2,
  X,
  Languages,
  Utensils,
  Calendar,
  FileText,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  Github,
  Store,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Palette,
  ExternalLink,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  MousePointerClick,
  Wallet
} from "lucide-react";
import { LogoIcon } from "../Logo";
import { DamasceneVR360Showcase } from "../DamasceneVR360Showcase";
import { ProfileAudioPlayer, AudioPresetType } from "./ProfileAudioPlayer";
import { SyrianPaymentModal, PaymentMethodItem } from "./SyrianPaymentModal";
import {
  RealWhatsappIcon,
  RealPhoneIcon,
  RealEmailIcon,
  RealWebsiteIcon,
  RealGoogleMapsIcon,
  RealInstagramIcon,
  RealGoogleGIcon,
  RealVr360Icon,
  RealFacebookIcon,
  RealLinkedinIcon,
  RealTwitterXIcon,
  RealYoutubeIcon,
  RealTelegramIcon,
  RealMenuIcon,
  RealCalendarIcon,
  RealDocumentIcon,
  RealGoogleDriveIcon,
  RealDropboxIcon,
  RealCvIcon,
  RealGithubIcon,
  RealBehanceIcon
} from "./RealBrandIcons";
import {
  detectLinkMetadata,
  normalizeExternalUrl
} from "../../services/linkDetector";
import { useLanguage } from "../../services/LanguageContext";

// ==============================================================================
// 1. TypeScript Interfaces & Theme Palettes (Matching exact aesthetics of image.png)
// ==============================================================================

export interface ProfileLink {
  id: string;
  label: string;
  labelEn?: string;
  url: string;
  iconName?: string;
  isHighlight?: boolean;
  description?: string;
  descriptionEn?: string;
  category?: "document" | "cv" | "portfolio" | "social" | "custom";
}

export interface Sham360ProfileData {
  id: string;
  slug?: string;
  type: "individual" | "business";
  name: string;
  nameEn?: string;
  titleOrCategory: string;
  titleOrCategoryEn?: string;
  jobTitle?: string;
  jobTitleEn?: string;
  companyName?: string;
  companyNameEn?: string;
  businessName?: string;
  businessNameEn?: string;
  bio?: string;
  bioEn?: string;
  avatarUrl: string;
  coverUrl?: string;
  logoUrl?: string;
  isVerified?: boolean;
  directoryMember?: boolean;
  city?: string;
  cityEn?: string;
  category?: string;
  categoryEn?: string;
  hasVrTour?: boolean;
  vrTourEmbedUrl?: string;
  hasGoogleMapsOptimization?: boolean;
  rating?: number;
  reviewCount?: number;
  googleReviewUrl?: string;
  socialLinks?: Record<string, string>;
  primaryAction?: {
    label: string;
    labelEn?: string;
    url: string;
    iconName?: string;
    actionType: "whatsapp" | "menu" | "link" | "call";
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
    website?: string;
    locationText?: string;
    locationTextEn?: string;
    googleMapsUrl?: string;
    googleReviewUrl?: string;
  };
  links: ProfileLink[];
  direct_redirect_enabled?: boolean;
  direct_redirect_url?: string;
  directRedirectEnabled?: boolean;
  directRedirectUrl?: string;
  backgroundMusicEnabled?: boolean;
  backgroundMusicPreset?: AudioPresetType;
  backgroundMusicUrl?: string;
  backgroundMusicTitle?: string;
  shamCashNumber?: string;
  syriatelCashNumber?: string;
  shamCashQrUrl?: string;
  syriatelCashQrUrl?: string;
  paymentMethodsEnabled?: boolean;
  paymentMethods?: PaymentMethodItem[];
}

export interface Sham360ProfileViewProps {
  profile?: Sham360ProfileData;
  isAr?: boolean;
  onNavigateToSales?: () => void;
  className?: string;
}

// 5 Signature Palette Styles inspired by the 5 profiles in the reference image:
// 1. Sky Blue (Sophie Jones / SHAM360 Default)
// 2. Terracotta / Crimson (Cole Mercer - AEREN Parfum)
// 3. Olive Sage / Forest (Grant Sullivan - Common Earth)
// 4. Rose / Berry Pink (Charli Berkley - Harvey)
// 5. Warm Burgundy / Chocolate (Steph Kim - Offset Artisan)
// 6. Royal Amber Gold (Executive Gold Edition)
export type ThemePaletteId = "blue" | "crimson" | "olive" | "rose" | "burgundy" | "gold";

export interface ThemePaletteConfig {
  id: ThemePaletteId;
  nameAr: string;
  nameEn: string;
  persona: string;
  primary: string;
  primaryHover: string;
  badgeHex: string;
  textHex: string;
  subtleBg: string;
}

export const THEME_PALETTES: Record<ThemePaletteId, ThemePaletteConfig> = {
  blue: {
    id: "blue",
    nameAr: "أزرق كلاسيك",
    nameEn: "Sky Blue",
    persona: "Sophie Jones Style",
    primary: "#0066FF",
    primaryHover: "#0052CC",
    badgeHex: "#0066FF",
    textHex: "#0066FF",
    subtleBg: "rgba(0, 102, 255, 0.08)"
  },
  crimson: {
    id: "crimson",
    nameAr: "قرميدي فاخر",
    nameEn: "Terracotta",
    persona: "Cole Mercer Style",
    primary: "#B83E2D",
    primaryHover: "#9E3223",
    badgeHex: "#B83E2D",
    textHex: "#B83E2D",
    subtleBg: "rgba(184, 62, 45, 0.08)"
  },
  olive: {
    id: "olive",
    nameAr: "زيتوني غابي",
    nameEn: "Olive Sage",
    persona: "Grant Sullivan Style",
    primary: "#3D6647",
    primaryHover: "#315439",
    badgeHex: "#3D6647",
    textHex: "#3D6647",
    subtleBg: "rgba(61, 102, 71, 0.08)"
  },
  rose: {
    id: "rose",
    nameAr: "وردي ناعم",
    nameEn: "Rose Pink",
    persona: "Charli Berkley Style",
    primary: "#DB4C77",
    primaryHover: "#C43A64",
    badgeHex: "#DB4C77",
    textHex: "#DB4C77",
    subtleBg: "rgba(219, 76, 119, 0.08)"
  },
  burgundy: {
    id: "burgundy",
    nameAr: "عنابي دافئ",
    nameEn: "Warm Burgundy",
    persona: "Steph Kim Style",
    primary: "#6B2D26",
    primaryHover: "#55211B",
    badgeHex: "#6B2D26",
    textHex: "#6B2D26",
    subtleBg: "rgba(107, 45, 38, 0.08)"
  },
  gold: {
    id: "gold",
    nameAr: "ذهبي ملكي",
    nameEn: "Royal Amber",
    persona: "Executive Amber Style",
    primary: "#D97706",
    primaryHover: "#B45309",
    badgeHex: "#D97706",
    textHex: "#D97706",
    subtleBg: "rgba(217, 119, 6, 0.08)"
  }
};

// ==============================================================================
// 2. Offline vCard (.vcf) Generator with UTF-8 BOM
// ==============================================================================

export function generateAndDownloadVCard(profile: Sham360ProfileData, isArabic = true) {
  const isBusiness = profile.type === "business";
  const fullName = (isArabic ? profile.name : (profile.nameEn || profile.name)) || "SHAM360 Contact";
  const company = isArabic
    ? (profile.companyName || profile.businessName || (isBusiness ? profile.name : "منظومة شام 360 للحلول الذكية"))
    : (profile.companyNameEn || profile.businessNameEn || profile.companyName || (isBusiness ? (profile.nameEn || profile.name) : "SHAM360 Smart Solutions Network"));
  const jobTitle = isArabic
    ? (profile.jobTitle || profile.titleOrCategory || "")
    : (profile.jobTitleEn || profile.titleOrCategoryEn || profile.jobTitle || profile.titleOrCategory || "");
  const phone = profile.contactInfo?.phone || "";
  const whatsapp = profile.contactInfo?.whatsapp || "";
  const email = profile.contactInfo?.email || "";
  const location = isArabic
    ? (profile.contactInfo?.locationText || (profile.city ? `${profile.city}، سوريا` : ""))
    : (profile.contactInfo?.locationTextEn || (profile.cityEn || profile.city ? `${profile.cityEn || "Damascus"}, Syria` : ""));
  const note = (isArabic ? profile.bio : (profile.bioEn || profile.bio)) ? (isArabic ? profile.bio : (profile.bioEn || profile.bio))!.replace(/\r?\n/g, " ") : "";
  const website =
    profile.contactInfo?.website ||
    profile.primaryAction?.url ||
    (typeof window !== "undefined" ? window.location.href : "https://sham360.online");

  // Collect custom social & document URLs into vCard lines
  const extraUrls: string[] = [];
  if (profile.links && Array.isArray(profile.links)) {
    profile.links.forEach((l) => {
      if (l.url) {
        const rawLabel = isArabic ? l.label : (l.labelEn || l.label);
        const cleanLabel = (rawLabel || "LINK").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        extraUrls.push(`URL;TYPE=${cleanLabel || "CUSTOM"}:${l.url}`);
      }
    });
  }

  // Social links map
  if (profile.socialLinks) {
    if (profile.socialLinks.linkedin) {
      extraUrls.push(`X-SOCIALPROFILE;TYPE=linkedin:${profile.socialLinks.linkedin}`);
    }
    if (profile.socialLinks.instagram) {
      extraUrls.push(`X-SOCIALPROFILE;TYPE=instagram:${profile.socialLinks.instagram}`);
    }
    if (profile.socialLinks.facebook) {
      extraUrls.push(`X-SOCIALPROFILE;TYPE=facebook:${profile.socialLinks.facebook}`);
    }
    if (profile.socialLinks.twitter) {
      extraUrls.push(`X-SOCIALPROFILE;TYPE=twitter:${profile.socialLinks.twitter}`);
    }
  }

  const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN;CHARSET=UTF-8:${fullName}`,
    `ORG;CHARSET=UTF-8:${company}`,
    jobTitle ? `TITLE;CHARSET=UTF-8:${jobTitle}` : "",
    whatsapp ? `TEL;TYPE=CELL,VOICE,PREF:${whatsapp}` : "",
    phone && phone !== whatsapp ? `TEL;TYPE=WORK,VOICE:${phone}` : "",
    email ? `EMAIL;TYPE=INTERNET:${email}` : "",
    location ? `ADR;TYPE=WORK;CHARSET=UTF-8:;;${location};;;;` : "",
    website ? `URL;TYPE=WORK:${website}` : "",
    ...extraUrls,
    note ? `NOTE;CHARSET=UTF-8:${note}` : "",
    "X-SHAM360-PLATFORM:VERIFIED-SMART-NFC",
    `PRODID:-//SHAM360 Smart NFC Digital Profile//${isArabic ? "AR" : "EN"}`,
    "END:VCARD"
  ]
    .filter(Boolean)
    .join("\r\n");

  // UTF-8 BOM (\uFEFF) ensures flawless Arabic character decoding in Apple Contacts & Android Contacts
  const blob = new Blob(["\uFEFF" + vCardLines], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const safeFilename = ((isArabic ? profile.name : (profile.nameEn || profile.name)) || "contact").replace(/[^a-zA-Z0-9\u0600-\u06FF_-]/g, "_");
  link.download = `${safeFilename}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Helper to extract Instagram username handle
function getInstagramHandle(url?: string): string {
  if (!url) return "@sham360.online";
  try {
    const cleaned = url.replace(/\/$/, "");
    const parts = cleaned.split("/");
    const last = parts[parts.length - 1];
    return last ? `@${last.replace("@", "")}` : "@sham360.online";
  } catch {
    return "@sham360.online";
  }
}

// Dynamic Icon Resolver for custom links & actions with Authentic "Real Icon View"
function renderProfileIcon(iconName?: string, className = "w-7 h-7") {
  switch (iconName?.toLowerCase()) {
    case "googledrive":
    case "drive":
    case "gdrive":
      return <RealGoogleDriveIcon className={className} />;
    case "dropbox":
      return <RealDropboxIcon className={className} />;
    case "cv":
    case "resume":
    case "curriculum":
      return <RealCvIcon className={className} />;
    case "whatsapp":
    case "messagecircle":
      return <RealWhatsappIcon className={className} />;
    case "phone":
    case "call":
      return <RealPhoneIcon className={className} />;
    case "mail":
    case "email":
      return <RealEmailIcon className={className} />;
    case "map":
    case "location":
    case "mappin":
    case "navigation":
    case "directions":
      return <RealGoogleMapsIcon className={className} />;
    case "menu":
    case "utensils":
      return <RealMenuIcon className={className} />;
    case "calendar":
    case "booking":
      return <RealCalendarIcon className={className} />;
    case "instagram":
      return <RealInstagramIcon className={className} />;
    case "facebook":
      return <RealFacebookIcon className={className} />;
    case "linkedin":
      return <RealLinkedinIcon className={className} />;
    case "twitter":
    case "x":
      return <RealTwitterXIcon className={className} />;
    case "youtube":
      return <RealYoutubeIcon className={className} />;
    case "telegram":
      return <RealTelegramIcon className={className} />;
    case "file":
    case "pdf":
    case "catalog":
    case "document":
      return <RealDocumentIcon className={className} />;
    case "github":
      return <RealGithubIcon className={className} />;
    case "behance":
    case "portfolio":
      return <RealBehanceIcon className={className} />;
    case "compass":
    case "vr":
    case "360":
      return <RealVr360Icon className={className} />;
    case "globe":
    case "website":
    default:
      return <RealWebsiteIcon className={className} />;
  }
}

// ==============================================================================
// 3. Main Component: Sham360ProfileView (Faithful to image.png)
// ==============================================================================

export const Sham360ProfileView: React.FC<Sham360ProfileViewProps> = ({
  profile = mockIndividualProfile,
  isAr: propIsAr,
  onNavigateToSales,
  className = ""
}) => {
  const { isAr: contextIsAr, toggleLanguage } = useLanguage();
  const isAr = propIsAr !== undefined ? propIsAr : contextIsAr;

  // Active theme palette (defaults to classic SHAM360 Sky Blue like Sophie Jones)
  const [paletteId, setPaletteId] = useState<ThemePaletteId>("blue");
  const [showPaletteMenu, setShowPaletteMenu] = useState<boolean>(false);
  const [useBrandColors, setUseBrandColors] = useState<boolean>(false);

  const activePalette = THEME_PALETTES[paletteId] || THEME_PALETTES.blue;

  // UI Interactive States
  const [copied, setCopied] = useState(false);
  const [savedContact, setSavedContact] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showVrModal, setShowVrModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedPayment, setCopiedPayment] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const handleCopyPayment = (text: string, provider: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedPayment(provider);
    setTimeout(() => setCopiedPayment(null), 2500);
  };

  const isBusiness = profile.type === "business";
  const displayName = isAr ? profile.name : (profile.nameEn || profile.name);
  const displaySecondaryName = isAr
    ? profile.nameEn
    : (profile.nameEn && profile.nameEn !== profile.name ? profile.name : undefined);
  const displayCompany = isAr
    ? (profile.companyName || profile.businessName || (isBusiness ? profile.titleOrCategory : "منظومة شام 360 للحلول الذكية"))
    : (profile.companyNameEn || profile.businessNameEn || profile.companyName || (isBusiness ? (profile.titleOrCategoryEn || profile.titleOrCategory) : "SHAM360 Smart Solutions Network"));
  const displayJobTitle = isAr
    ? (profile.jobTitle || profile.titleOrCategory)
    : (profile.jobTitleEn || profile.titleOrCategoryEn || profile.jobTitle || profile.titleOrCategory);
  const displayBio = isAr ? profile.bio : (profile.bioEn || profile.bio);
  const displayLocationText = isAr
    ? (profile.contactInfo?.locationText || (profile.city ? `${profile.city}، سوريا` : undefined))
    : (profile.contactInfo?.locationTextEn || (profile.cityEn || profile.city ? `${profile.cityEn || "Damascus"}, Syria` : undefined));
  const isDirectoryMember = profile.directoryMember ?? true;

  // Clean Communication Channels
  const cleanWhatsapp = profile.contactInfo?.whatsapp
    ? profile.contactInfo.whatsapp.replace(/[^0-9]/g, "")
    : "";
  const phoneCall = profile.contactInfo?.phone || profile.contactInfo?.whatsapp;
  const emailContact = profile.contactInfo?.email;
  const websiteUrl = profile.contactInfo?.website || profile.primaryAction?.url;
  const mapsUrl =
    profile.contactInfo?.googleMapsUrl ||
    (profile.city
      ? `https://maps.google.com/?q=${encodeURIComponent((isAr ? profile.city : (profile.cityEn || profile.city)) + (isAr ? " سوريا" : " Syria"))}`
      : "https://maps.google.com");
  const googleReviewTargetUrl =
    profile.googleReviewUrl ||
    profile.contactInfo?.googleReviewUrl ||
    profile.contactInfo?.googleMapsUrl ||
    `https://www.google.com/search?q=${encodeURIComponent(
      (displayName || "SHAM360") + (isAr ? " دمشق خرائط جوجل" : " Damascus Google Maps")
    )}`;

  const instagramUrl =
    profile.socialLinks?.instagram || "https://instagram.com/sham360.online";
  const instagramHandle = getInstagramHandle(instagramUrl);

  const hasSyrianPayments =
    profile.paymentMethodsEnabled !== false &&
    Boolean(
      profile.shamCashNumber ||
      profile.syriatelCashNumber ||
      (profile.paymentMethods && profile.paymentMethods.length > 0)
    );

  const synthesizedPaymentMethods: PaymentMethodItem[] =
    profile.paymentMethods && profile.paymentMethods.length > 0
      ? profile.paymentMethods
      : [
          ...(profile.shamCashNumber
            ? [
                {
                  id: "pay_sham_cash",
                  provider: "sham_cash" as const,
                  title: "شام كاش (Sham Cash)",
                  titleEn: "Sham Cash",
                  accountNumber: profile.shamCashNumber,
                  accountName: displayCompany || displayName,
                  qrCodeUrl: profile.shamCashQrUrl || "",
                  isActive: true
                }
              ]
            : []),
          ...(profile.syriatelCashNumber
            ? [
                {
                  id: "pay_syriatel_cash",
                  provider: "syriatel_cash" as const,
                  title: "سيريتل كاش (Syriatel Cash)",
                  titleEn: "Syriatel Cash",
                  accountNumber: profile.syriatelCashNumber,
                  accountName: displayCompany || displayName,
                  qrCodeUrl: profile.syriatelCashQrUrl || "",
                  isActive: true
                }
              ]
            : [])
        ];

  // Quick Contact Actions Dock (Call, WhatsApp, Email, Website next to each other with Authentic Real Icon View)
  const quickContactActions = [
    phoneCall
      ? {
          id: "call",
          label: isAr ? "اتصال" : "Call",
          tooltip: phoneCall,
          href: `tel:${phoneCall}`,
          renderRealIcon: () => <RealPhoneIcon className="w-11 h-11 sm:w-12 sm:h-12" />,
          isExternal: false
        }
      : null,
    cleanWhatsapp
      ? {
          id: "whatsapp",
          label: isAr ? "واتساب" : "WhatsApp",
          tooltip: profile.contactInfo?.whatsapp || cleanWhatsapp,
          href: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
            isAr
              ? `مرحباً ${profile.name}، أتواصل معك عبر بطاقتك الذكية SHAM360.`
              : `Hello ${displayName}, connecting via your SHAM360 smart profile.`
          )}`,
          renderRealIcon: () => <RealWhatsappIcon className="w-11 h-11 sm:w-12 sm:h-12" />,
          isExternal: true
        }
      : null,
    emailContact
      ? {
          id: "email",
          label: isAr ? "إيميل" : "Email",
          tooltip: emailContact,
          href: `mailto:${emailContact}`,
          renderRealIcon: () => <RealEmailIcon className="w-11 h-11 sm:w-12 sm:h-12" />,
          isExternal: false
        }
      : null,
    websiteUrl
      ? {
          id: "website",
          label: isAr ? "الموقع" : "Website",
          tooltip: websiteUrl,
          href: websiteUrl,
          renderRealIcon: () => <RealWebsiteIcon className="w-11 h-11 sm:w-12 sm:h-12" />,
          isExternal: true
        }
      : null
  ].filter(Boolean) as Array<{
    id: string;
    label: string;
    tooltip: string;
    href: string;
    renderRealIcon: () => React.ReactNode;
    isExternal: boolean;
  }>;

  // Dynamic QR Code Generator matching exact profile URL
  useEffect(() => {
    const profileUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://sham360.online/p/${profile.slug || profile.id}`;

    QRCode.toDataURL(profileUrl, {
      margin: 1,
      width: 400,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF"
      }
    })
      .then((dataUrl) => setQrCodeDataUrl(dataUrl))
      .catch((err) => console.warn("Failed to generate QR Code:", err));
  }, [profile.slug, profile.id]);

  // Share Profile Handler
  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://sham360.online/p/${profile.slug || profile.id}`;

    const shareData = {
      title: `${profile.name} | SHAM360`,
      text: profile.bio || profile.titleOrCategory,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Ignored
    }
  };

  // Programmatic .vcf vCard Download
  const handleSaveContact = () => {
    generateAndDownloadVCard(profile, isAr);
    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 3200);
  };

  // Copy Profile Link Helper
  const handleCopyLinkOnly = async () => {
    try {
      const shareUrl =
        typeof window !== "undefined"
          ? window.location.href
          : `https://sham360.online/p/${profile.slug || profile.id}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Ignored
    }
  };

  // Download QR Code PNG image
  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement("a");
    a.href = qrCodeDataUrl;
    a.download = `sham360-qr-${profile.slug || profile.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Fallback Cover & Avatar Images
  const coverImageSrc =
    profile.coverUrl ||
    (isBusiness
      ? "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=80"
      : "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80");

  const avatarImageSrc =
    profile.avatarUrl ||
    profile.logoUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

  // Helper to determine circular badge background
  const getBadgeStyle = (brandHex?: string) => {
    if (useBrandColors && brandHex) {
      return { backgroundColor: brandHex };
    }
    return { backgroundColor: activePalette.badgeHex };
  };

  return (
    <div
      className={`w-full max-w-[390px] mx-auto my-2 sm:my-4 font-sans transition-all duration-300 ${
        isAr ? "text-right [direction:rtl]" : "text-left [direction:ltr]"
      } ${className}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* =========================================================================
          MAIN CONTAINER CARD
          Aesthetic from reference image.png:
          - Pure white card body
          - Rounded corners (rounded-[32px] sm:rounded-[36px])
          - High quality photo header banner
          - Start-aligned overlapping avatar with thick white border
          - Clean, elegant start-aligned typography
          - Pure solid circular icon badges next to crisp text rows
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_16px_45px_rgba(0,0,0,0.08)] border border-slate-200/70 overflow-hidden max-w-[390px] w-full mx-auto select-none relative"
      >
        {/* -----------------------------------------------------------------------
            HEADER & COVER BANNER
            - Full-width image cover banner (h-48 sm:h-52)
            - Corner brand sticker pill (Like "Better Connected Co" or "Harvey" in image.png)
            - Floating Quick Controls (QR Code, Share, Language, and Palette switcher)
            ----------------------------------------------------------------------- */}
        <div className="relative">
          {/* Cover Graphic Banner */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
            <img
              src={coverImageSrc}
              alt={profile.name}
              className="h-full w-full object-cover brightness-[0.96] contrast-[1.03]"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient overlay so buttons remain readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25" />

            {/* Brand Sticker Pill in Corner (Identical to "Better Connected Co" / "Harvey" in image.png) */}
            <div className="absolute top-3 end-3 z-20 max-w-[44%] flex justify-end">
              {isDirectoryMember ? (
                <a
                  href="/directory"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-slate-800 text-[10.5px] font-bold shadow-xs backdrop-blur-md border border-white/60 transition-all group max-w-full min-w-0"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: activePalette.primary }}
                  />
                  <span className="truncate max-w-[85px] xs:max-w-[105px] sm:max-w-[125px]">
                    {isAr ? (profile.companyName || "SHAM360") : (profile.companyNameEn || profile.companyName || "SHAM360")}
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-slate-800 text-[10.5px] font-bold shadow-xs backdrop-blur-md border border-white/60 max-w-full min-w-0">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: activePalette.primary }}
                  />
                  <span className="truncate max-w-[95px] xs:max-w-[115px]">{displayCompany}</span>
                </div>
              )}
            </div>

            {/* Floating Top Controls on Start Side (QR, Share, Language, Palette) */}
            <div className="absolute top-3 start-3 z-20 flex items-center gap-0.5 sm:gap-1 bg-white/95 hover:bg-white backdrop-blur-md border border-white/60 shadow-xs rounded-full p-1 max-w-[54%] transition-all">
              {/* QR Code Modal Trigger */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                type="button"
                onClick={() => setShowQr(true)}
                aria-label="Show QR Code"
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-colors cursor-pointer flex-shrink-0"
                title={isAr ? "عرض رمز QR" : "Show QR Code"}
              >
                <QrCode className="w-3.5 h-3.5" />
              </motion.button>

              {/* Share Profile */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                type="button"
                onClick={handleShare}
                aria-label="Share Profile"
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-colors cursor-pointer flex-shrink-0"
                title={isAr ? "مشاركة البروفايل" : "Share Profile"}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
              </motion.button>

              {/* Theme Palette Switcher (allowing users to experience all 5 card styles from image.png) */}
              <div className="relative flex-shrink-0">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  type="button"
                  onClick={() => setShowPaletteMenu(!showPaletteMenu)}
                  aria-label="Change Color Theme"
                  className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                  title={isAr ? "تغيير طابع اللون (ستايل الصورة)" : "Change Color Palette"}
                >
                  <Palette className="w-3.5 h-3.5" style={{ color: activePalette.primary }} />
                </motion.button>

                {/* Palette Popover Menu */}
                <AnimatePresence>
                  {showPaletteMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      className="absolute top-9 start-0 z-40 bg-white rounded-2xl p-2.5 shadow-xl border border-slate-200 min-w-[200px]"
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 text-start">
                        {isAr ? "ألوان البطاقات (الصورة المرجعية)" : "Reference Card Colors"}
                      </p>
                      <div className="space-y-1">
                        {(Object.keys(THEME_PALETTES) as ThemePaletteId[]).map((id) => {
                          const pal = THEME_PALETTES[id];
                          const isSelected = paletteId === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                setPaletteId(id);
                                setShowPaletteMenu(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-start cursor-pointer ${
                                isSelected
                                  ? "bg-slate-100 text-slate-900"
                                  : "hover:bg-slate-50 text-slate-600"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs"
                                  style={{ backgroundColor: pal.primary }}
                                />
                                <span>{isAr ? pal.nameAr : pal.nameEn}</span>
                              </div>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5" style={{ color: pal.primary }} />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="border-t border-slate-100 mt-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setUseBrandColors(!useBrandColors)}
                          className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          <span>{isAr ? "أيقونات بألوانها الأصلية" : "Brand Icon Colors"}</span>
                          <span
                            className={`w-7 h-4 rounded-full transition-colors flex items-center px-0.5 ${
                              useBrandColors ? "bg-[#0066FF]" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`w-3 h-3 rounded-full bg-white transition-transform ${
                                useBrandColors ? "translate-x-3 rtl:-translate-x-3" : ""
                              }`}
                            />
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Switch */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                type="button"
                onClick={() => toggleLanguage()}
                className="h-7 px-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer flex items-center gap-1 flex-shrink-0"
                title={isAr ? "Switch to English" : "تبديل للغة العربية"}
              >
                <Languages className="w-3 h-3" style={{ color: activePalette.primary }} />
                <span className="font-mono text-[10.5px] font-bold">{isAr ? "EN" : "عربي"}</span>
              </motion.button>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              AVATAR & IDENTITY SECTION (Start-Aligned like in image.png)
              - Avatar sits on the START side (left for LTR, right for RTL)
              - Overlaps cover header with thick white circular border
              - Below avatar: Name, Title, Company start-aligned
              ------------------------------------------------------------------- */}
          <div className="px-6 relative">
            <div className="-mt-12 sm:-mt-14 relative z-10 inline-block">
              {/* Circular profile photo with crisp white ring */}
              <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full border-[3.5px] border-white shadow-md overflow-hidden bg-white">
                <img
                  src={avatarImageSrc}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Verified Badge attached to corner of avatar */}
              {(profile.isVerified ?? true) && (
                <div
                  className="absolute bottom-0 end-0 z-20 w-6 h-6 rounded-full border-2 border-white text-white flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: activePalette.primary }}
                  title={isAr ? "موثّق رسمياً في شبكة SHAM360" : "SHAM360 Verified"}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3.2] text-white" />
                </div>
              )}
            </div>

            {/* Typography Hierarchy (Start-Aligned directly below avatar) */}
            <div className="mt-2.5 space-y-0.5 text-start">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-slate-900 text-2xl sm:text-[25px] font-bold tracking-tight leading-tight">
                  {displayName}
                </h1>
                {(profile.isVerified ?? true) && (
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: activePalette.primary }}
                  />
                )}
              </div>

              {displaySecondaryName && (
                <p className="text-xs text-slate-400 font-mono tracking-wide pt-0.5" dir="ltr">
                  {displaySecondaryName}
                </p>
              )}

              {/* Job Title / Role */}
              {displayJobTitle && (
                <p className="text-slate-600 text-[13px] sm:text-sm font-medium leading-snug pt-0.5">
                  {displayJobTitle}
                </p>
              )}

              {/* Company */}
              {displayCompany && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-[13px] font-normal leading-snug pt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate max-w-[280px]">{displayCompany}</span>
                </div>
              )}

              {/* Bio Paragraph */}
              {displayBio && (
                <p className="text-slate-500 text-xs mt-2 leading-relaxed max-w-sm font-normal">
                  {displayBio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            PRIMARY CALL-TO-ACTION: SAVE CONTACT (.vcf)
            - Pill button with active theme color
            - Downloads offline vCard with UTF-8 BOM
            ----------------------------------------------------------------------- */}
        <div className="px-6 pt-4 pb-2 space-y-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSaveContact}
            style={{ backgroundColor: activePalette.primary }}
            className="text-white font-bold py-3 px-6 rounded-full w-full shadow-sm text-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:opacity-95"
          >
            {savedContact ? (
              <>
                <div
                  className="w-4 h-4 rounded-full bg-white flex items-center justify-center"
                  style={{ color: activePalette.primary }}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{isAr ? "تم حفظ جهة الاتصال في هاتفك!" : "Contact Saved to Phone!"}</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-white" />
                <span>{isAr ? "حفظ جهة الاتصال (.vcf)" : "Save Contact (.vcf)"}</span>
              </>
            )}
          </motion.button>

          {profile.primaryAction && (
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              href={profile.primaryAction.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-200/90 hover:border-slate-300 bg-white text-slate-800 hover:text-slate-950 font-bold py-2.5 px-5 rounded-full w-full shadow-xs text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: activePalette.primary }} />
              <span>{isAr ? profile.primaryAction.label : (profile.primaryAction.labelEn || profile.primaryAction.label)}</span>
            </motion.a>
          )}
        </div>

        {/* -----------------------------------------------------------------------
            QUICK CONTACT ACTIONS DOCK (Executive Side-by-Side Bar)
            - Call, WhatsApp, Email, Website placed next to each other
            - Highly attractive, sleek dock with tactile micro-interactions
            - Beautiful icon badges with responsive labels
            ----------------------------------------------------------------------- */}
        {quickContactActions.length > 0 && (
          <div className="px-5 pt-2 pb-1">
            <div className="bg-slate-50/90 rounded-2xl p-2 sm:p-2.5 border border-slate-200/70 shadow-xs">
              <div
                className="grid gap-1.5 sm:gap-2"
                style={{
                  gridTemplateColumns: `repeat(${quickContactActions.length}, minmax(0, 1fr))`
                }}
              >
                {quickContactActions.map((action) => {
                  return (
                    <motion.a
                      key={action.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      href={action.href}
                      target={action.isExternal ? "_blank" : undefined}
                      rel={action.isExternal ? "noopener noreferrer" : undefined}
                      className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl hover:bg-white hover:shadow-xs transition-all duration-200 group cursor-pointer text-center min-w-0"
                      title={action.tooltip}
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform group-hover:scale-105 mb-1.5 flex-shrink-0 drop-shadow-xs">
                        {action.renderRealIcon()}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-slate-950 block truncate max-w-full leading-tight">
                        {action.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------------
            DETAILED LOCATION & MEDIA ROWS (Authentic Real Icon View)
            - High-value rich cards (Google Maps, Instagram, Reviews, 360 Tour)
            - Spacious, borderless rows with soft hover pill effect
            ----------------------------------------------------------------------- */}
        <div className="px-5 py-2 space-y-1">
          {/* 5. Google Maps Location & Directions */}
          {mapsUrl && (
            <motion.a
              whileTap={{ scale: 0.98 }}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer text-start"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs">
                  <RealGoogleMapsIcon className="w-9 h-9" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-slate-950 block truncate">
                    {isAr ? "الموقع والاتجاهات (Google Maps)" : "Location & Directions (Google Maps)"}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {displayLocationText || (isAr ? "انقر للملاحة على الخريطة" : "Click for navigation on Google Maps")}
                  </span>
                </div>
              </div>
              <div className="text-slate-300 group-hover:text-slate-600 flex-shrink-0">
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </motion.a>
          )}

          {/* 6. Instagram Account (@username) */}
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer text-start"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs">
                <RealInstagramIcon className="w-9 h-9" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-slate-950 block truncate">
                  Instagram
                </span>
                <span className="text-[11px] text-slate-500 font-mono block truncate" dir="ltr">
                  {instagramHandle}
                </span>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-slate-600 flex-shrink-0">
              {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </motion.a>

          {/* 7. Google 5-Star Reviews Booster Card */}
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={googleReviewTargetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-amber-50/60 transition-colors group cursor-pointer text-start"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs">
                <RealGoogleGIcon className="w-9 h-9" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-amber-900 truncate">
                    {isAr ? "تقييم 5 نجوم على Google" : "Google 5-Star Reviews"}
                  </span>
                  <span className="text-amber-500 text-[11px] font-bold">★★★★★</span>
                </div>
                <span className="text-[11px] text-slate-500 block truncate">
                  {profile.rating
                    ? `${profile.rating.toFixed(1)} / 5.0 (${profile.reviewCount || 90}+ ${isAr ? "تقييم معتمد" : "verified reviews"})`
                    : isAr
                    ? "ادعمنا بتقييم 5 نجوم على Google"
                    : "Leave a 5-star review on Google"}
                </span>
              </div>
            </div>
            <div className="text-amber-500 flex-shrink-0">
              {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </motion.a>

          {/* 8. 360° Virtual Tour Row (if available) */}
          {profile.hasVrTour && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowVrModal(true)}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer text-start"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs">
                  <RealVr360Icon className="w-9 h-9" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-slate-950 block truncate">
                    {isAr ? "جولة 360° تفاعلية بدقة 8K" : "360° Interactive 8K VR Tour"}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {isAr ? "استكشف المكان افتراضياً بتقنية 360 درجة" : "Explore venue virtually in 360-degree 8K"}
                  </span>
                </div>
              </div>
              <div className="text-slate-300 group-hover:text-slate-600 flex-shrink-0">
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </motion.button>
          )}

          {/* 8.5 Syrian & Universal Payments & Digital Wallets Card */}
          {hasSyrianPayments && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-200/80 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 leading-tight">
                      {isAr ? "وسائل الدفع والمحافظ الإلكترونية" : "Digital Wallets & Payments"}
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      {isAr ? "شام كاش • سيريتل • Revolut • Wise • Crypto" : "Sham Cash • Syriatel • Revolut • Wise • Crypto"}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{isAr ? "رموز QR والحسابات" : "QR & Accounts"}</span>
                </motion.button>
              </div>

              {/* Dynamic copy chips for active payment methods */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                {synthesizedPaymentMethods
                  .filter((m) => m.isActive !== false)
                  .slice(0, 4)
                  .map((method) => {
                    const isCopied = copiedPayment === method.id;
                    const badgeColor =
                      method.provider === "sham_cash"
                        ? "bg-emerald-600 text-white"
                        : method.provider === "syriatel_cash"
                        ? "bg-red-600 text-white"
                        : method.provider === "mtn_cash"
                        ? "bg-amber-600 text-white"
                        : method.provider === "revolut"
                        ? "bg-blue-600 text-white"
                        : method.provider === "wise"
                        ? "bg-teal-700 text-white"
                        : method.provider === "crypto"
                        ? "bg-emerald-700 text-white"
                        : method.provider === "paypal"
                        ? "bg-sky-600 text-white"
                        : "bg-slate-800 text-white";

                    return (
                      <div
                        key={method.id}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`px-1.5 py-0.5 rounded-md font-black text-[9px] shrink-0 uppercase ${badgeColor}`}
                          >
                            {isAr
                              ? method.title || method.provider
                              : method.titleEn || method.title || method.provider}
                          </span>
                          <span
                            className="font-mono text-xs font-bold text-slate-800 truncate"
                            dir="ltr"
                          >
                            {method.accountNumber}
                          </span>
                          {method.currency && (
                            <span className="text-[9px] font-mono text-slate-400 font-bold">
                              {method.currency}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyPayment(method.accountNumber, method.id)}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                          title={isAr ? "نسخ الرقم أو المعرّف" : "Copy Account/ID"}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">{isAr ? "تم" : "Copied"}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{isAr ? "نسخ" : "Copy"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}

                {synthesizedPaymentMethods.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="text-center py-1 text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    {isAr
                      ? `+ عرض باقي وسائل الدفع (${synthesizedPaymentMethods.length - 4} أخرى)`
                      : `+ View ${synthesizedPaymentMethods.length - 4} more payment options`}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 9. Dynamic Extended Custom & Document Links (Swiss Minimalist Dark Glassmorphism) */}
          {profile.links && profile.links.length > 0 && (
            <div className="space-y-2 pt-1">
              {profile.links.map((link) => {
                const detected = detectLinkMetadata(link.url, link.label, link.iconName);
                const isDocOrCv =
                  link.category === "cv" ||
                  link.category === "document" ||
                  link.category === "portfolio" ||
                  link.isHighlight ||
                  detected.isDocumentOrCv;
                const finalUrl = normalizeExternalUrl(link.url);
                const activeIconName = link.iconName || detected.iconName;

                // Dedicated "CV / Document / Portfolio" Button Styling (Refined White Luxury Aesthetic)
                if (isDocOrCv) {
                  return (
                    <motion.a
                      key={link.id}
                      whileHover={{ y: -2, scale: 1.008 }}
                      whileTap={{ scale: 0.98 }}
                      href={finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden rounded-2xl p-3.5 bg-white hover:bg-slate-50/90 text-slate-900 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm flex items-center justify-between gap-3 group cursor-pointer transition-all duration-200"
                    >
                      {/* Subtle Ambient Accent Tint */}
                      <div
                        className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none transition-opacity group-hover:opacity-20"
                        style={{ backgroundColor: detected.accentColor }}
                      />
                      
                      <div className="flex items-center gap-3.5 min-w-0 relative z-10">
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs">
                          {renderProfileIcon(activeIconName, "w-10 h-10")}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[13px] sm:text-sm font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors truncate">
                              {isAr ? (link.label || detected.defaultTitleAr) : (link.labelEn || link.label || detected.defaultTitleEn)}
                            </span>
                            <span
                              className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0"
                              style={{
                                backgroundColor: detected.subtleBg,
                                color: detected.accentColor === "#0F172A" ? "#334155" : detected.accentColor
                              }}
                            >
                              {isAr ? detected.badgeLabelAr : detected.badgeLabelEn}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {isAr
                              ? (link.description || "فتح المستند الرسمي مباشرة في نافذة جديدة")
                              : (link.descriptionEn || link.description || "Open official document in a new tab")}
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-[#0066FF] transition-colors flex-shrink-0 relative z-10 shadow-2xs">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </motion.a>
                  );
                }

                // Standard Swiss Minimalist Link Row with Auto-Detected Brand Icon
                return (
                  <motion.a
                    key={link.id}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href={finalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all group cursor-pointer text-start"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 drop-shadow-xs">
                        {renderProfileIcon(activeIconName, "w-8 h-8")}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-slate-950 block truncate">
                            {isAr ? (link.label || detected.defaultTitleAr) : (link.labelEn || link.label || detected.defaultTitleEn)}
                          </span>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.2 rounded-md transition-colors"
                            style={{
                              backgroundColor: detected.subtleBg,
                              color: detected.accentColor === "#0F172A" ? "#475569" : detected.accentColor
                            }}
                          >
                            {isAr ? detected.badgeLabelAr : detected.badgeLabelEn}
                          </span>
                        </div>
                        {(isAr ? link.description : (link.descriptionEn || link.description)) && (
                          <span className="text-[11px] text-slate-500 block truncate">
                            {isAr ? link.description : (link.descriptionEn || link.description)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-slate-300 group-hover:text-slate-600 flex-shrink-0">
                      {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>

        {/* -----------------------------------------------------------------------
            FOOTER: POWERED BY SHAM360
            - Subtle, prestigious badge that respects the customer's profile as the true star
            - Strictly NO annoying ad copy like "make your own" / "احصل على بطاقتك"
            - Features clean "POWERED BY SHAM360" with a smart interactive press icon
            ----------------------------------------------------------------------- */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/70 text-center">
          <motion.button
            id="sham360-profile-powered-badge"
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onNavigateToSales || (() => (window.location.href = "/"))}
            className="group inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300/80 text-slate-600 hover:text-slate-950 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer max-w-full"
            title={isAr ? "انقر لاستكشاف منصة SHAM360" : "Click to explore SHAM360"}
          >
            {/* Sham360 Brand Icon Mark */}
            <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/90 border border-blue-200/70 flex items-center justify-center p-0.5 flex-shrink-0 group-hover:border-[#0066FF]/40 group-hover:shadow-2xs transition-all">
              <LogoIcon size={18} />
            </div>

            {/* Pure Brand Watermark (No pushy sales copy) */}
            <div className="flex items-center gap-1.5 font-mono text-start">
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-bold flex-shrink-0">
                POWERED BY
              </span>
              <span
                className="text-[12px] font-black tracking-tight font-mono transition-colors"
                style={{ color: activePalette.primary }}
              >
                SHAM360
              </span>
            </div>

            {/* Smart Interactive Press Indicator */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50/80 group-hover:bg-blue-100/80 border border-blue-200/60 group-hover:border-blue-300 text-[#0066FF] transition-all flex-shrink-0">
              <MousePointerClick className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" />
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>
        </div>

        {/* =======================================================================
            INTERACTIVE FULLSCREEN DYNAMIC QR CODE MODAL
            ======================================================================= */}
        <AnimatePresence>
          {showQr && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              dir={isAr ? "rtl" : "ltr"}
              className={`fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 ${
                isAr ? "[direction:rtl]" : "[direction:ltr]"
              }`}
              onClick={() => setShowQr(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl text-slate-900 text-center border border-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setShowQr(false)}
                  className="absolute top-4 start-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* QR Code Canvas */}
                <div className="relative bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mx-auto mb-4 w-60 h-60 flex items-center justify-center">
                  {qrCodeDataUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={qrCodeDataUrl}
                        alt="SHAM360 QR Code"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className="text-white px-2.5 py-1 rounded-lg border-2 border-white shadow-md flex items-center justify-center"
                          style={{ backgroundColor: activePalette.primary }}
                        >
                          <span className="font-black text-xs font-mono">S360</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <QrCode className="w-16 h-16 text-slate-300 animate-pulse" />
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1">
                  {displayName}
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  {isAr
                    ? "امسح الرمز بكاميرا هاتفك لفتح البروفايل وحفظ جهة الاتصال"
                    : "Scan with your phone camera to view profile and save contact"}
                </p>

                <div className="flex items-center gap-2 justify-center flex-wrap">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleDownloadQr}
                    style={{ backgroundColor: activePalette.primary }}
                    className="px-4 py-2.5 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hover:opacity-90"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isAr ? "تحميل الرمز (PNG)" : "Download PNG"}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCopyLinkOnly}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" style={{ color: activePalette.primary }} />
                    <span>
                      {copied ? (isAr ? "تم النسخ!" : "Copied!") : isAr ? "نسخ الرابط" : "Copy Link"}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =======================================================================
            8K 360° VIRTUAL TOUR MODAL
            ======================================================================= */}
        <AnimatePresence>
          {showVrModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              dir={isAr ? "rtl" : "ltr"}
              className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm ${
                isAr ? "[direction:rtl]" : "[direction:ltr]"
              }`}
              onClick={() => setShowVrModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-slate-900"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: activePalette.subtleBg,
                        color: activePalette.primary
                      }}
                    >
                      <Compass className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        {displayName} - {isAr ? "جولة 360° تفاعلية" : "360° Virtual Tour"}
                      </h3>
                      <p
                        className="text-[11px] flex items-center gap-1 mt-0.5 font-bold"
                        style={{ color: activePalette.primary }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isAr ? "تقنية التصوير البانورامي 8K فائق الدقة" : "Ultra-HD 8K Panoramic Tour"}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowVrModal(false)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-slate-50">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-inner">
                    <DamasceneVR360Showcase isAr={isAr} compact={false} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>
                      {isAr
                        ? "اسحب للتجول بحرية في المكان بدقة 8K"
                        : "Drag to explore in 360-degree 8K"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowVrModal(false)}
                      className="hover:underline font-bold cursor-pointer"
                      style={{ color: activePalette.primary }}
                    >
                      {isAr ? "العودة للبروفايل" : "Back to Profile"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Syrian Payment & Digital Wallet Interactive Modal */}
        <SyrianPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          methods={synthesizedPaymentMethods}
          businessName={displayCompany || displayName}
          whatsappNumber={profile.contactInfo?.whatsapp || profile.socialLinks?.whatsapp}
          isAr={isAr}
          primaryColor={activePalette.primary}
        />

        {/* Floating Lightweight Background Music Player */}
        <ProfileAudioPlayer
          enabled={profile.backgroundMusicEnabled}
          preset={profile.backgroundMusicPreset}
          audioUrl={profile.backgroundMusicUrl}
          audioTitle={profile.backgroundMusicTitle}
          isAr={isAr}
          primaryColor={activePalette.primary}
        />
      </motion.div>
    </div>
  );
};

// ==============================================================================
// 4. Mock Data Fallbacks (Rich Syrian Real-World Archetypes)
// ==============================================================================

export const mockIndividualProfile: Sham360ProfileData = {
  id: "akram",
  slug: "akram",
  type: "individual",
  name: "م. أكرم دمشقي",
  nameEn: "Eng. Akram Dimashqi",
  titleOrCategory: "استشاري تحول رقمي ومصوّر 360° معتمد",
  titleOrCategoryEn: "Digital Transformation Consultant & Certified 360° Photographer",
  backgroundMusicEnabled: true,
  backgroundMusicPreset: "damascene_oud",
  backgroundMusicTitle: "تقاسيم عود شامي أصيل",
  paymentMethodsEnabled: true,
  shamCashNumber: "SHAM-908214",
  syriatelCashNumber: "0933888999",
  jobTitle: "استشاري نظم ذكية وبطاقات NFC المعتمدة",
  jobTitleEn: "Smart NFC Solutions & Digital Identity Consultant",
  companyName: "منظومة شام 360 للحلول الذكية",
  companyNameEn: "SHAM360 Smart Solutions Network",
  directoryMember: true,
  city: "دمشق",
  cityEn: "Damascus",
  category: "هندسة وتقنية ونظم ذكية",
  categoryEn: "Engineering, Tech & Smart Systems",
  bio: "مساعدتك في ترقية حضورك الرقمي وبناء هويتك المؤسسية عبر بطاقات NFC الذكية، وتوثيق خرائط Google، وتصوير الجولات الافتراضية 360° بدقة 8K.",
  bioEn: "Helping businesses and professionals elevate their digital presence with smart NFC cards, Google Maps local SEO, and ultra-high-definition 8K 360° virtual tours.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  isVerified: true,
  rating: 5.0,
  reviewCount: 94,
  googleReviewUrl: "https://maps.google.com/?q=Damascus+Syria",
  hasVrTour: false,
  hasGoogleMapsOptimization: true,
  socialLinks: {
    instagram: "https://instagram.com/sham360.online",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    twitter: "https://x.com"
  },
  primaryAction: {
    label: "احجز استشارة رقمية عبر واتساب",
    labelEn: "Book Digital Consultation on WhatsApp",
    url: "https://wa.me/963933888999",
    actionType: "whatsapp",
    iconName: "whatsapp"
  },
  contactInfo: {
    phone: "+963 933 888 999",
    whatsapp: "+963933888999",
    email: "admin@sham360.online",
    website: "https://sham360.online",
    locationText: "شارع فخري البارودي، دمشق، سوريا",
    locationTextEn: "Fakhri Al Baroudi St, Damascus, Syria",
    googleMapsUrl: "https://maps.google.com/?q=Fakhri+Al+Baroudi+St,+Damascus,+Syria",
    googleReviewUrl: "https://maps.google.com/?q=Fakhri+Al+Baroudi+St,+Damascus,+Syria"
  },
  links: [
    {
      id: "l_drive_cv",
      label: "السيرة الذاتية (Google Drive CV)",
      labelEn: "Professional CV / Resume (Google Drive)",
      description: "فتح وثيقة الـ CV الرسمية بدقة عالية ومحدثة عبر Google Drive",
      descriptionEn: "Open verified official CV document via Google Drive",
      url: "https://drive.google.com/file/d/1demo-akram-cv-sham360/view",
      iconName: "googledrive",
      category: "cv",
      isHighlight: true
    },
    {
      id: "l_dropbox_portfolio",
      label: "معرض المشاريع والشهادات (Dropbox Portfolio)",
      labelEn: "Portfolio & Verified Credentials (Dropbox)",
      description: "استعراض سابقة الأعمال ونماذج التصوير والاعتمادات الرسمية",
      descriptionEn: "Browse completed case studies, certifications, and photography showcase",
      url: "https://www.dropbox.com/scl/fo/sham360-portfolio-showcase",
      iconName: "dropbox",
      category: "portfolio",
      isHighlight: true
    },
    {
      id: "l1",
      label: "دليل شام 360 للأعمال المعتمدة",
      labelEn: "SHAM360 Verified Business Directory",
      description: "استكشف أبرز الفعاليات الاقتصادية والخدمية في سوريا",
      descriptionEn: "Explore verified commercial, industrial, and tourism businesses in Syria",
      url: "https://sham360.online/directory",
      iconName: "compass",
      isHighlight: false
    },
    {
      id: "l2",
      label: "كتالوج منتجات وبطاقات NFC الذكية",
      labelEn: "Smart NFC Cards & Products Catalog",
      description: "بطاقات معدنية وخشبية وبلاستيكية مع شريحة ذكية",
      descriptionEn: "Premium metallic, wooden, and PVC cards with contactless smart chips",
      url: "https://sham360.online/#nfc-storefront",
      iconName: "file",
      isHighlight: false
    }
  ]
};

export const mockBusinessProfile: Sham360ProfileData = {
  id: "al-yasmeen",
  slug: "al-yasmeen",
  type: "business",
  name: "مطعم وبيت الياسمين الدمشقي",
  nameEn: "Al Yasmeen Damascene Restaurant & Palace",
  titleOrCategory: "مطعم شرقي عريق وقصر تراثي دمشقي",
  titleOrCategoryEn: "Historic Damascene Oriental Restaurant & Heritage Palace",
  backgroundMusicEnabled: true,
  backgroundMusicPreset: "courtyard_fountain",
  backgroundMusicTitle: "خرير ماء ونسيم باحة دمشقية",
  jobTitle: "إدارة الضيافة والمناسبات التراثية",
  jobTitleEn: "Hospitality & Heritage Events Management",
  companyName: "مجموعة الياسمين السياحية",
  companyNameEn: "Al Yasmeen Tourism & Hospitality Group",
  directoryMember: true,
  city: "دمشق",
  cityEn: "Damascus",
  category: "مطاعم وكافيهات وسياحة",
  categoryEn: "Restaurants, Cafes & Tourism",
  bio: "أشهى المأكولات الشامية الأصيلة في قلب دمشق القديمة مع أجواء البحرة والياسمين والجلسات التراثية الفاخرة وجولة افتراضية بدقة 8K.",
  bioEn: "Authentic Damascene gastronomy in the historic heart of Old Damascus, featuring courtyard fountains, jasmine trees, luxury heritage seating, and an 8K virtual tour.",
  avatarUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
  coverUrl: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=80",
  logoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
  isVerified: true,
  rating: 4.9,
  reviewCount: 168,
  googleReviewUrl: "https://maps.google.com/?q=Old+Damascus+Bab+Touma",
  hasVrTour: true,
  vrTourEmbedUrl: "https://sham360.online/vr/al-yasmeen",
  hasGoogleMapsOptimization: true,
  socialLinks: {
    instagram: "https://instagram.com/alyasmeen.rest",
    facebook: "https://facebook.com/alyasmeen.damascus"
  },
  primaryAction: {
    label: "🍽️ تصفح قائمة الطعام والأسعار (Menu)",
    labelEn: "🍽️ View Menu & Pricing (Digital Menu)",
    url: "https://sham360.online/menu",
    actionType: "menu",
    iconName: "menu"
  },
  contactInfo: {
    phone: "+963 11 223 3445",
    whatsapp: "+963933888999",
    email: "info@alyasmeen-rest.sy",
    website: "https://sham360.online/p/al-yasmeen",
    locationText: "دمشق القديمة - باب توما - حارة الياسمين",
    locationTextEn: "Old Damascus - Bab Touma - Jasmine Alley",
    googleMapsUrl: "https://maps.google.com/?q=Old+Damascus+Bab+Touma",
    googleReviewUrl: "https://maps.google.com/?q=Old+Damascus+Bab+Touma"
  },
  links: [
    {
      id: "bl1",
      label: "قائمة الطعام والوجبات الخاصة (PDF Menu)",
      labelEn: "Food & Beverage Specials Menu (PDF Menu)",
      description: "تصفح أحدث المأكولات الشرقية والمقبلات الشامية",
      descriptionEn: "Browse traditional Oriental specialties, grills, and Damascene appetizers",
      url: "https://sham360.online/menu",
      iconName: "utensils",
      isHighlight: true
    },
    {
      id: "bl2",
      label: "حجز طاولة أو مناسبة عائلية مسبقاً",
      labelEn: "Reserve a Table or Family Event",
      description: "تأكيد فوري للحجوزات والمناسبات عبر واتساب",
      descriptionEn: "Instant reservation and event inquiry confirmation via WhatsApp",
      url: "https://wa.me/963933888999",
      iconName: "calendar",
      isHighlight: false
    }
  ]
};

export default Sham360ProfileView;
