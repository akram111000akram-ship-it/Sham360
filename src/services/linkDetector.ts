// ==============================================================================
// SHAM360 Dynamic External Link & Document Detection Engine
// Detects link types, Google Drive CVs, Dropbox Portfolios, and Social Networks
// ==============================================================================

export type DetectedLinkType =
  | "googledrive"
  | "dropbox"
  | "cv"
  | "pdf"
  | "whatsapp"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "telegram"
  | "youtube"
  | "twitter"
  | "github"
  | "behance"
  | "calendar"
  | "menu"
  | "website";

export interface DetectedLinkInfo {
  type: DetectedLinkType;
  iconName: string;
  isDocumentOrCv: boolean;
  badgeLabelAr: string;
  badgeLabelEn: string;
  defaultTitleAr: string;
  defaultTitleEn: string;
  accentColor: string;
  subtleBg: string;
}

/**
 * Normalizes input URL by adding https:// protocol if missing
 */
export function normalizeExternalUrl(rawUrl: string): string {
  if (!rawUrl) return "";
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || /^tel:/i.test(trimmed) || /^mailto:/i.test(trimmed)) {
    return trimmed;
  }
  // Auto-detect whatsapp number format
  if (/^\+?[0-9]{7,15}$/.test(trimmed)) {
    const cleanNum = trimmed.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNum}`;
  }
  return `https://${trimmed}`;
}

/**
 * Detects metadata, icon, and document nature from a URL and optional label
 */
export function detectLinkMetadata(rawUrl: string, manualLabel = "", manualIcon?: string): DetectedLinkInfo {
  const url = (rawUrl || "").toLowerCase();
  const label = (manualLabel || "").toLowerCase();

  // 1. Google Drive & Google Docs (CV, Resume, Portfolio, PDF, Spreadsheets)
  if (url.includes("drive.google.com") || url.includes("docs.google.com") || manualIcon === "googledrive" || manualIcon === "drive") {
    const isCv = label.includes("cv") || label.includes("سيرة") || label.includes("resume") || label.includes("ذاتية");
    return {
      type: "googledrive",
      iconName: "googledrive",
      isDocumentOrCv: true,
      badgeLabelAr: isCv ? "Google Drive CV" : "Google Drive",
      badgeLabelEn: isCv ? "Google Drive CV" : "Google Drive",
      defaultTitleAr: isCv ? "السيرة الذاتية (Google Drive CV)" : "مستند جوجل درايف",
      defaultTitleEn: isCv ? "Curriculum Vitae (Google Drive)" : "Google Drive Document",
      accentColor: "#4285F4",
      subtleBg: "rgba(66, 133, 244, 0.12)"
    };
  }

  // 2. Dropbox (Portfolio, Design Assets, Large PDF files)
  if (url.includes("dropbox.com") || manualIcon === "dropbox") {
    return {
      type: "dropbox",
      iconName: "dropbox",
      isDocumentOrCv: true,
      badgeLabelAr: "Dropbox Cloud",
      badgeLabelEn: "Dropbox Cloud",
      defaultTitleAr: "معرض الأعمال (Dropbox Portfolio)",
      defaultTitleEn: "Dropbox Portfolio / Assets",
      accentColor: "#0061FE",
      subtleBg: "rgba(0, 97, 254, 0.12)"
    };
  }

  // 3. Direct PDF file or explicit CV / Resume
  if (
    url.endsWith(".pdf") ||
    url.includes("/pdf") ||
    label.includes("pdf") ||
    label.includes("سيرة ذاتية") ||
    label.includes("resume") ||
    label.includes("cv") ||
    label.includes("سيرتي") ||
    manualIcon === "cv" ||
    manualIcon === "pdf"
  ) {
    const isExplicitPdf = url.endsWith(".pdf") || label.includes("pdf");
    return {
      type: isExplicitPdf ? "pdf" : "cv",
      iconName: isExplicitPdf ? "pdf" : "cv",
      isDocumentOrCv: true,
      badgeLabelAr: isExplicitPdf ? "PDF Document" : "Executive CV",
      badgeLabelEn: isExplicitPdf ? "PDF Document" : "Executive CV",
      defaultTitleAr: isExplicitPdf ? "تحميل ملف PDF" : "السيرة الذاتية الرسمية (CV)",
      defaultTitleEn: isExplicitPdf ? "Download PDF Document" : "Curriculum Vitae (CV)",
      accentColor: isExplicitPdf ? "#EF4444" : "#0066FF",
      subtleBg: isExplicitPdf ? "rgba(239, 68, 68, 0.12)" : "rgba(0, 102, 255, 0.12)"
    };
  }

  // 4. WhatsApp
  if (url.includes("wa.me") || url.includes("whatsapp.com") || manualIcon === "whatsapp") {
    return {
      type: "whatsapp",
      iconName: "whatsapp",
      isDocumentOrCv: false,
      badgeLabelAr: "واتساب",
      badgeLabelEn: "WhatsApp",
      defaultTitleAr: "محادثة واتساب مباشرة",
      defaultTitleEn: "Chat on WhatsApp",
      accentColor: "#25D366",
      subtleBg: "rgba(37, 211, 102, 0.12)"
    };
  }

  // 5. LinkedIn
  if (url.includes("linkedin.com") || manualIcon === "linkedin") {
    return {
      type: "linkedin",
      iconName: "linkedin",
      isDocumentOrCv: false,
      badgeLabelAr: "لينكد إن",
      badgeLabelEn: "LinkedIn",
      defaultTitleAr: "الملف المهني على لينكد إن (LinkedIn)",
      defaultTitleEn: "LinkedIn Professional Profile",
      accentColor: "#0A66C2",
      subtleBg: "rgba(10, 102, 194, 0.12)"
    };
  }

  // 6. Instagram
  if (url.includes("instagram.com") || manualIcon === "instagram") {
    return {
      type: "instagram",
      iconName: "instagram",
      isDocumentOrCv: false,
      badgeLabelAr: "انستغرام",
      badgeLabelEn: "Instagram",
      defaultTitleAr: "حساب انستغرام الرسمي",
      defaultTitleEn: "Official Instagram Profile",
      accentColor: "#E1306C",
      subtleBg: "rgba(225, 48, 108, 0.12)"
    };
  }

  // 7. Facebook
  if (url.includes("facebook.com") || url.includes("fb.com") || url.includes("fb.me") || manualIcon === "facebook") {
    return {
      type: "facebook",
      iconName: "facebook",
      isDocumentOrCv: false,
      badgeLabelAr: "فيسبوك",
      badgeLabelEn: "Facebook",
      defaultTitleAr: "صفحة فيسبوك الرسمية",
      defaultTitleEn: "Official Facebook Page",
      accentColor: "#1877F2",
      subtleBg: "rgba(24, 119, 242, 0.12)"
    };
  }

  // 8. Telegram
  if (url.includes("t.me") || url.includes("telegram.org") || url.includes("telegram.me") || manualIcon === "telegram") {
    return {
      type: "telegram",
      iconName: "telegram",
      isDocumentOrCv: false,
      badgeLabelAr: "تيليغرام",
      badgeLabelEn: "Telegram",
      defaultTitleAr: "قناة أو محادثة تيليغرام",
      defaultTitleEn: "Telegram Channel / Chat",
      accentColor: "#229ED9",
      subtleBg: "rgba(34, 158, 217, 0.12)"
    };
  }

  // 9. YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be") || manualIcon === "youtube") {
    return {
      type: "youtube",
      iconName: "youtube",
      isDocumentOrCv: false,
      badgeLabelAr: "يوتيوب",
      badgeLabelEn: "YouTube",
      defaultTitleAr: "قناة يوتيوب الرسمية",
      defaultTitleEn: "Official YouTube Channel",
      accentColor: "#FF0000",
      subtleBg: "rgba(255, 0, 0, 0.12)"
    };
  }

  // 10. Twitter / X
  if (url.includes("twitter.com") || url.includes("x.com") || manualIcon === "twitter" || manualIcon === "x") {
    return {
      type: "twitter",
      iconName: "x",
      isDocumentOrCv: false,
      badgeLabelAr: "منصة X",
      badgeLabelEn: "X Platform",
      defaultTitleAr: "حساب تويتر / X",
      defaultTitleEn: "X (Twitter) Profile",
      accentColor: "#0F172A",
      subtleBg: "rgba(15, 23, 42, 0.12)"
    };
  }

  // 11. GitHub
  if (url.includes("github.com") || manualIcon === "github") {
    return {
      type: "github",
      iconName: "github",
      isDocumentOrCv: false,
      badgeLabelAr: "جيت هاب",
      badgeLabelEn: "GitHub",
      defaultTitleAr: "مستودع أو حساب GitHub",
      defaultTitleEn: "GitHub Repository",
      accentColor: "#181717",
      subtleBg: "rgba(24, 23, 23, 0.12)"
    };
  }

  // 12. Behance
  if (url.includes("behance.net") || manualIcon === "behance") {
    return {
      type: "behance",
      iconName: "behance",
      isDocumentOrCv: true,
      badgeLabelAr: "بيهانس",
      badgeLabelEn: "Behance",
      defaultTitleAr: "معرض أعمال بيهانس (Behance)",
      defaultTitleEn: "Behance Design Portfolio",
      accentColor: "#1769FF",
      subtleBg: "rgba(23, 105, 255, 0.12)"
    };
  }

  // 13. Default Web
  return {
    type: "website",
    iconName: manualIcon || "website",
    isDocumentOrCv: false,
    badgeLabelAr: "رابط خارجي",
    badgeLabelEn: "External Link",
    defaultTitleAr: "زيارة الموقع الإلكتروني",
    defaultTitleEn: "Visit Website",
    accentColor: "#0066FF",
    subtleBg: "rgba(0, 102, 255, 0.08)"
  };
}

/**
 * 1-Click Link Presets for Dashboard
 */
export interface LinkPresetItem {
  id: string;
  labelAr: string;
  labelEn: string;
  iconName: string;
  urlPlaceholder: string;
  category: "document" | "cv" | "portfolio" | "social" | "custom";
}

export const LINK_PRESETS: LinkPresetItem[] = [
  {
    id: "gdrive_cv",
    labelAr: "السيرة الذاتية (Google Drive CV)",
    labelEn: "CV / Resume (Google Drive)",
    iconName: "googledrive",
    urlPlaceholder: "https://drive.google.com/file/d/...",
    category: "cv"
  },
  {
    id: "dropbox_portfolio",
    labelAr: "معرض الأعمال (Dropbox Portfolio)",
    labelEn: "Portfolio (Dropbox)",
    iconName: "dropbox",
    urlPlaceholder: "https://www.dropbox.com/scl/fo/...",
    category: "portfolio"
  },
  {
    id: "pdf_catalog",
    labelAr: "كتالوج أو قائمة PDF",
    labelEn: "PDF Catalog / Brochure",
    iconName: "pdf",
    urlPlaceholder: "https://example.com/catalog.pdf",
    category: "document"
  },
  {
    id: "linkedin_profile",
    labelAr: "لينكد إن (LinkedIn)",
    labelEn: "LinkedIn Profile",
    iconName: "linkedin",
    urlPlaceholder: "https://linkedin.com/in/username",
    category: "social"
  },
  {
    id: "whatsapp_chat",
    labelAr: "محادثة واتساب (WhatsApp)",
    labelEn: "WhatsApp Chat",
    iconName: "whatsapp",
    urlPlaceholder: "https://wa.me/9639XXXXXXXX",
    category: "social"
  },
  {
    id: "instagram_profile",
    labelAr: "انستغرام (Instagram)",
    labelEn: "Instagram Account",
    iconName: "instagram",
    urlPlaceholder: "https://instagram.com/username",
    category: "social"
  },
  {
    id: "telegram_channel",
    labelAr: "تيليغرام (Telegram)",
    labelEn: "Telegram Channel",
    iconName: "telegram",
    urlPlaceholder: "https://t.me/username",
    category: "social"
  },
  {
    id: "youtube_channel",
    labelAr: "قناة يوتيوب (YouTube)",
    labelEn: "YouTube Channel",
    iconName: "youtube",
    urlPlaceholder: "https://youtube.com/@channel",
    category: "social"
  },
  {
    id: "behance_portfolio",
    labelAr: "معرض بيهانس (Behance)",
    labelEn: "Behance Portfolio",
    iconName: "behance",
    urlPlaceholder: "https://behance.net/username",
    category: "portfolio"
  },
  {
    id: "github_repo",
    labelAr: "حساب جيت هاب (GitHub)",
    labelEn: "GitHub Profile",
    iconName: "github",
    urlPlaceholder: "https://github.com/username",
    category: "social"
  }
];
