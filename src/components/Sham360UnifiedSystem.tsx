import React, { useState, useEffect, useMemo, useCallback } from "react";
import QRCode from "qrcode";
import {
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Instagram,
  MapPin,
  Star,
  CheckCircle2,
  QrCode,
  Share2,
  Check,
  X,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  SlidersHorizontal,
  Navigation,
  Compass,
  CreditCard,
  Building2,
  UserCheck,
  ArrowUpRight,
  Copy
} from "lucide-react";
import { useLanguage } from "../services/LanguageContext";

// ==============================================================================
// 1. UNIFIED TYPE DEFINITIONS & SCHEMAS
// ==============================================================================

export type Sham360Category =
  | "all"
  | "nfc_cards"
  | "verified_business"
  | "smart_profile";

export interface Sham360ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  location?: string;
  googleMapsUrl?: string;
  googleReviewUrl?: string;
}

export interface Sham360SocialLinks {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  tiktok?: string;
}

export interface Sham360Profile {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  title: string;
  companyName?: string;
  bio?: string;
  avatarUrl: string;
  coverUrl: string;
  isVerified: boolean;
  city: string;
  category: Sham360Category;
  categoryLabelAr: string;
  rating?: number;
  reviewCount?: number;
  hasVrTour?: boolean;
  contactInfo: Sham360ContactInfo;
  socialLinks?: Sham360SocialLinks;
}

// ==============================================================================
// 2. MOCK DATASETS (TESTING COMPLETE VS CONDITIONAL LINK REMOVAL)
// ==============================================================================

export const MOCK_PROFILES: Sham360Profile[] = [
  {
    id: "yasmeen-01",
    slug: "al-yasmeen",
    name: "مطعم وفندق قصر الياسمين",
    nameEn: "Al-Yasmeen Palace Hotel & Restaurant",
    title: "ضيافة دمشقية عريقة & مأكولات شرقية",
    companyName: "مجموعة الياسمين السياحية",
    bio: "أجواء شامية أصيلة في قلب دمشق القديمة، نقدم تجربة طعام فريدة وغرف فندقية بإطلالات ساحرة على الجامع الأموي.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    city: "دمشق القديمة - باب توما",
    category: "verified_business",
    categoryLabelAr: "أعمال وشركات موثقة",
    rating: 4.9,
    reviewCount: 342,
    hasVrTour: true,
    contactInfo: {
      phone: "+963 11 223 4567",
      whatsapp: "+963944111222",
      email: "contact@alyasmeen-damascus.sy",
      website: "https://alyasmeen-damascus.sy",
      location: "دمشق القديمة، حارة الجوانية، مقابل بيت جبري",
      googleMapsUrl: "https://maps.google.com/?q=Old+Damascus",
      googleReviewUrl: "https://g.page/r/sample-google-review-booster"
    },
    socialLinks: {
      instagram: "https://instagram.com/alyasmeen_syria"
    }
  },
  {
    id: "eng-akram-02",
    slug: "akram-engineer",
    name: "م. أكرم الحلبي",
    nameEn: "Eng. Akram Al-Halabi",
    title: "كبير مهندسي الحلول الذكية & IoT",
    companyName: "تقنيات المستقبل الذكية",
    bio: "متخصص في أتمتة المنشآت وبطاقات NFC المدمجة مع أنظمة إدارة الوصول والملفات الذكية.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    city: "دمشق - المزة أوتوستراد",
    category: "smart_profile",
    categoryLabelAr: "ملفات رقمية ذكية",
    rating: 5.0,
    reviewCount: 48,
    hasVrTour: false,
    contactInfo: {
      phone: "+963 933 888 999",
      whatsapp: "+963933888999",
      email: "akram@smart-syria.com",
      // WEBSITE AND REVIEW BOOSTER DELIBERATELY OMITTED TO TEST AUTO-HIDE CONDITIONAL RENDERING!
      location: "دمشق، المزة، برج تبارك التجاري، الطابق 6",
      googleMapsUrl: "https://maps.google.com/?q=Mezzeh+Damascus"
    },
    socialLinks: {
      instagram: "https://instagram.com/akram.tech.sy"
    }
  },
  {
    id: "nfc-store-03",
    slug: "sham-nfc-store",
    name: "متجر بطاقات SHAM360 NFC",
    nameEn: "SHAM360 Hardware Cards",
    title: "بطاقات الأعمال الذكية وحلول النقر الفوري",
    companyName: "SHAM360 Hardware Labs",
    bio: "الجيل الجديد من بطاقات الأعمال المعدنية والخشبية المجهزة بشرائح NTAG216 المشفرة لتمرير بياناتك بلمسة واحدة.",
    avatarUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    city: "دمشق - الشعلان",
    category: "nfc_cards",
    categoryLabelAr: "بطاقات NFC الذكية",
    rating: 4.8,
    reviewCount: 196,
    hasVrTour: true,
    contactInfo: {
      phone: "+963 11 332 0000",
      whatsapp: "+963988777666",
      email: "orders@sham360.online",
      website: "https://sham360.online",
      location: "دمشق، الشعلان، مقابل حديقة السبكي",
      googleMapsUrl: "https://maps.google.com/?q=Shaalan+Damascus",
      googleReviewUrl: "https://g.page/r/sham360-reviews"
    },
    socialLinks: {
      instagram: "https://instagram.com/sham360.online"
    }
  },
  {
    id: "dr-noor-04",
    slug: "dr-noor-aesthetic",
    name: "د. نور الهدى كنعان",
    nameEn: "Dr. Noor Al-Huda",
    title: "استشارية الجلدية والتجميل الطبي غير الجراحي",
    companyName: "عيادات راديانس كلينك",
    bio: "أحدث التقنيات الطبية المعترف بها دولياً للعناية بالبشرة وتجديد الشباب بأمان واحترافية تامة.",
    avatarUrl:
      "https://images.unsplash.com/photo-1594824813511-20a7b4618e1d?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    city: "حلب - الشهباء الجديدة",
    category: "verified_business",
    categoryLabelAr: "أعمال وشركات موثقة",
    rating: 4.9,
    reviewCount: 215,
    hasVrTour: false,
    contactInfo: {
      phone: "+963 21 267 8900",
      whatsapp: "+963955444333",
      email: "booking@dr-noor.sy",
      // WEBSITE OMITTED TO TEST CONDITIONAL ROW HIDING
      location: "حلب، الشهباء الجديدة، مجمع الشفاء الطبي",
      googleMapsUrl: "https://maps.google.com/?q=Aleppo+Shahbaa",
      googleReviewUrl: "https://g.page/r/dr-noor-reviews"
    },
    socialLinks: {
      instagram: "https://instagram.com/dr.noor.aesthetic"
    }
  }
];

// ==============================================================================
// 3. OFFLINE VCARD GENERATOR HELPER (.vcf with UTF-8 BOM)
// ==============================================================================

export const downloadVCard = (profile: Sham360Profile) => {
  const cleanPhone = profile.contactInfo.phone?.trim() || "";
  const cleanWhatsapp = profile.contactInfo.whatsapp?.trim() || "";
  const cleanEmail = profile.contactInfo.email?.trim() || "";
  const cleanWebsite = profile.contactInfo.website?.trim() || "";
  const cleanLocation = profile.contactInfo.location?.trim() || "";
  const cleanOrg = profile.companyName?.trim() || "SHAM360 Verified";
  const cleanTitle = profile.title?.trim() || "";
  const cleanBio = profile.bio?.trim() || "";

  // Split name for vCard N property
  const nameParts = profile.name.trim().split(/\s+/);
  const firstName = nameParts[0] || profile.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  const vCardContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN;CHARSET=UTF-8:${profile.name}`,
    `N;CHARSET=UTF-8:${lastName};${firstName};;;`,
    cleanOrg ? `ORG;CHARSET=UTF-8:${cleanOrg}` : "",
    cleanTitle ? `TITLE;CHARSET=UTF-8:${cleanTitle}` : "",
    cleanPhone ? `TEL;TYPE=CELL,VOICE:${cleanPhone}` : "",
    cleanWhatsapp && cleanWhatsapp !== cleanPhone
      ? `TEL;TYPE=WORK,VOICE:${cleanWhatsapp}`
      : "",
    cleanEmail ? `EMAIL;TYPE=INTERNET,WORK:${cleanEmail}` : "",
    cleanWebsite ? `URL;TYPE=WORK:${cleanWebsite}` : "",
    cleanLocation ? `ADR;TYPE=WORK;CHARSET=UTF-8:;;;${cleanLocation};;;` : "",
    cleanBio ? `NOTE;CHARSET=UTF-8:${cleanBio}` : "",
    "REV:" + new Date().toISOString(),
    "END:VCARD"
  ]
    .filter(Boolean)
    .join("\r\n");

  // UTF-8 Byte Order Mark (BOM) prevents Arabic character corruption on iOS & Android
  const blob = new Blob(["\uFEFF" + vCardContent], {
    type: "text/vcard;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${profile.slug || "sham360-contact"}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ==============================================================================
// 4. COMPONENT 1: Sham360ProfileView (Swiss Minimalist / Modern-Style Full Profile)
// ==============================================================================

export interface Sham360ProfileViewProps {
  profile?: Sham360Profile;
  onNavigateToDirectory?: () => void;
  className?: string;
}

export const Sham360ProfileView: React.FC<Sham360ProfileViewProps> = ({
  profile = MOCK_PROFILES[0],
  onNavigateToDirectory,
  className = ""
}) => {
  const { isAr, dir } = useLanguage();
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate Profile Direct URL
  const currentProfileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/p/${profile.slug}`
      : `https://sham360.online/p/${profile.slug}`;

  // Generate QR Code data URL
  useEffect(() => {
    QRCode.toDataURL(
      currentProfileUrl,
      {
        width: 480,
        margin: 2,
        color: {
          dark: "#0066FF",
          light: "#FFFFFF"
        }
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [currentProfileUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentProfileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: `${profile.title} - بطاقة ذكية موثقة من SHAM360`,
          url: currentProfileUrl
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // Clean WhatsApp phone number for direct wa.me link
  const rawWhatsapp =
    profile.contactInfo.whatsapp || profile.contactInfo.phone || "";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  // Safe Instagram handle extractor
  const getInstagramHandle = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:instagram\.com\/)([^/?#&]+)/i);
    return match ? `@${match[1]}` : "@instagram";
  };

  return (
    <div
      dir={dir}
      className={`min-h-screen bg-[#F4F5F7] text-slate-900 py-6 sm:py-10 px-3 sm:px-6 flex flex-col items-center font-sans antialiased selection:bg-[#0066FF] selection:text-white ${className}`}
    >
      {/* -----------------------------------------------------------------
          TOP MINI HEADER BAR (SHAM360 Ecosystem Navigation)
         ----------------------------------------------------------------- */}
      <div className="w-full max-w-[440px] flex items-center justify-between mb-4 px-2">
        {onNavigateToDirectory ? (
          <button
            type="button"
            onClick={onNavigateToDirectory}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0066FF] transition-colors py-1.5 px-3 rounded-full hover:bg-white/80 border border-transparent hover:border-slate-200"
          >
            <ChevronRight className="w-4 h-4" />
            <span>العودة لدليل SHAM360</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span>منظومة SHAM360 الذكية</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            aria-label="عرض رمز QR"
            title="عرض رمز الاستجابة السريعة"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#0066FF]" />
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label="مشاركة البطاقة"
            title="مشاركة الرابط"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          SWISS MINIMALIST PROFILE CARD (MODERN-STYLE SPECIFICATION)
          - Pure White background
          - Rounded-36px corners
          - Crisp 1px border
          - Soft, diffuse elevation shadow
         ----------------------------------------------------------------- */}
      <div className="w-full max-w-[440px] bg-white rounded-[36px] shadow-xl border border-slate-200/80 overflow-hidden relative transition-all">
        {/* Cover Header Banner */}
        <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={profile.coverUrl}
            alt={profile.name}
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Top Brand Sticker in Banner Corner */}
          <div className="absolute top-3.5 end-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold shadow-xs border border-white/80">
              <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
              <span className="truncate max-w-[130px]">
                {profile.companyName || "SHAM360"}
              </span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </span>
          </div>
        </div>

        {/* Overlapping Avatar Section */}
        <div className="px-6 pt-0 pb-4 relative">
          <div className="-mt-16 sm:-mt-20 mb-3 flex items-end justify-between">
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-white shadow-lg border border-slate-100">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover bg-slate-50"
                />
              </div>

              {/* Electric Blue (#0066FF) Verified Badge */}
              {profile.isVerified && (
                <div
                  className="absolute bottom-1 end-1 bg-white rounded-full p-1 shadow-md"
                  title="عضو موثق في دليل SHAM360"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0066FF] flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              )}
            </div>

            {/* City & Rating Pill on the other side */}
            <div className="flex flex-col items-end gap-1.5 pb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{profile.city}</span>
              </span>
              {typeof profile.rating === "number" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-mono">{profile.rating.toFixed(1)}</span>
                  {profile.reviewCount && (
                    <span className="text-[10px] text-amber-600/80 font-normal">
                      ({profile.reviewCount})
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Profile Name & Identity Typography */}
          <div className="space-y-1 mb-4 text-start">
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-[#0066FF]">{profile.title}</p>
            {profile.companyName && (
              <p className="text-xs text-slate-500 font-medium">
                {profile.companyName}
              </p>
            )}

            {profile.bio && (
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100 mt-2">
                {profile.bio}
              </p>
            )}
          </div>

          {/* -------------------------------------------------------------
              PRIMARY ELECTRIC BLUE BUTTON: "حفظ جهة الاتصال (.vcf)"
              - Dynamic offline vCard generator
              - Tactile micro-interaction
             ------------------------------------------------------------- */}
          <div className="mt-4 mb-5">
            <button
              type="button"
              onClick={() => downloadVCard(profile)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0066FF] hover:bg-[#0055D4] active:bg-[#0047B8] text-white font-bold text-base shadow-lg shadow-[#0066FF]/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer group"
            >
              <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              <span>حفظ جهة الاتصال (.vcf)</span>
            </button>
          </div>

          {/* -------------------------------------------------------------
              QUICK ACTION GRID (3 Columns: WhatsApp, Call, Email)
              - Solid, tactile circular badges
              - Clean single-line labels
             ------------------------------------------------------------- */}
          <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/70 mb-5">
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* 1. WhatsApp */}
              {cleanWhatsapp ? (
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                    `مرحباً ${profile.name}، أتواصل معك عبر بطاقتك الذكية في SHAM360.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white hover:shadow-xs transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs mb-1.5 transition-transform group-hover:scale-105">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">واتساب</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                    محادثة فورية
                  </span>
                </a>
              ) : (
                <div className="opacity-40 pointer-events-none flex flex-col items-center justify-center p-2">
                  <div className="w-12 h-12 rounded-full bg-slate-300 text-white flex items-center justify-center mb-1.5">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">واتساب</span>
                </div>
              )}

              {/* 2. Phone Call */}
              {profile.contactInfo.phone ? (
                <a
                  href={`tel:${profile.contactInfo.phone}`}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white hover:shadow-xs transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-xs mb-1.5 transition-transform group-hover:scale-105">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">اتصال</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                    مكالمة هاتفية
                  </span>
                </a>
              ) : (
                <div className="opacity-40 pointer-events-none flex flex-col items-center justify-center p-2">
                  <div className="w-12 h-12 rounded-full bg-slate-300 text-white flex items-center justify-center mb-1.5">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">اتصال</span>
                </div>
              )}

              {/* 3. Email */}
              {profile.contactInfo.email ? (
                <a
                  href={`mailto:${profile.contactInfo.email}`}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white hover:shadow-xs transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs mb-1.5 transition-transform group-hover:scale-105">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">إيميل</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                    بريد إلكتروني
                  </span>
                </a>
              ) : (
                <div className="opacity-40 pointer-events-none flex flex-col items-center justify-center p-2">
                  <div className="w-12 h-12 rounded-full bg-slate-300 text-white flex items-center justify-center mb-1.5">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">إيميل</span>
                </div>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------------
              DYNAMIC LINK ROWS (MODERN-STYLE LIST)
              - Strict conditional rendering: Hides completely if missing
             ------------------------------------------------------------- */}
          <div className="space-y-2 text-start">
            {/* ROW 1: Instagram (Conditional) */}
            {profile.socialLinks?.instagram && (
              <a
                href={profile.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      إنستغرام
                    </span>
                    <span
                      className="text-[11px] text-slate-500 font-mono block truncate"
                      dir="ltr"
                    >
                      {getInstagramHandle(profile.socialLinks.instagram)}
                    </span>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0" />
              </a>
            )}

            {/* ROW 2: Official Website (Conditional) */}
            {profile.contactInfo.website && (
              <a
                href={profile.contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      الموقع الرسمي
                    </span>
                    <span
                      className="text-[11px] text-slate-500 font-mono block truncate"
                      dir="ltr"
                    >
                      {profile.contactInfo.website
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700 flex-shrink-0" />
              </a>
            )}

            {/* ROW 3: Google Maps Location & Directions (Conditional) */}
            {profile.contactInfo.googleMapsUrl && (
              <a
                href={profile.contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      الموقع الجغرافي والاتجاهات
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {profile.contactInfo.location || profile.city}
                    </span>
                  </div>
                </div>
                <Navigation className="w-4 h-4 text-rose-500 group-hover:translate-x-[-2px] transition-transform flex-shrink-0" />
              </a>
            )}

            {/* ROW 4: Google Review 5-Star Booster (Conditional) */}
            {profile.contactInfo.googleReviewUrl && (
              <a
                href={profile.contactInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3.5 rounded-2xl bg-amber-50/70 hover:bg-amber-50 border border-amber-200/80 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Star className="w-4 h-4 fill-white text-white" />
                    </div>
                    <span className="text-xs font-bold text-amber-950">
                      تقييمات Google المعتمدة
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-amber-900 font-medium">
                  <span>شاركنا تجربتك وتقييمك بـ 5 نجوم على خرائط جوجل</span>
                  <span className="font-bold text-[#0066FF] group-hover:underline flex items-center gap-1">
                    تقييم الآن
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* Footer Certified Tag */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col items-center justify-center text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>عضو موثق في دليل SHAM360</span>
            </span>
            <p className="text-[10px] text-slate-400">
              مدعوم بتقنية بطاقات النقر الفوري NFC والملفات الرقمية الذكية
            </p>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          FULLSCREEN QR CODE MODAL
         ----------------------------------------------------------------- */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl border border-slate-200 text-center relative animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 start-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              رمز الاستجابة السريعة (QR)
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              امسح الرمز بكاميرا الهاتف للوصول الفوري للملف الرقمي لـ {profile.name}
            </p>

            {qrDataUrl && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 inline-block mb-5 shadow-inner">
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  className="w-56 h-56 rounded-xl mx-auto"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>

              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`${profile.slug}-qrcode.png`}
                  className="py-2.5 px-3 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>تنزيل الصورة</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// 5. COMPONENT 2: DirectoryCard (Matches Profile Modern Aesthetic Exactly)
// ==============================================================================

export interface Sham360DirectoryCardProps {
  profile: Sham360Profile;
  onSelectProfile: (profile: Sham360Profile) => void;
}

export const Sham360DirectoryCard: React.FC<Sham360DirectoryCardProps> = ({
  profile,
  onSelectProfile
}) => {
  const cleanPhone = profile.contactInfo.phone?.replace(/[^0-9]/g, "");
  const cleanWhatsapp =
    profile.contactInfo.whatsapp?.replace(/[^0-9]/g, "") || cleanPhone;

  return (
    <div className="w-full bg-white rounded-[32px] border border-slate-200/80 hover:border-[#0066FF]/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group font-sans text-start">
      <div>
        {/* Top Cover Banner */}
        <div className="relative h-32 sm:h-36 w-full bg-slate-100 overflow-hidden">
          <img
            src={profile.coverUrl}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

          {/* Top Category Badge */}
          <div className="absolute top-3 start-3">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-xs border border-white/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>{profile.categoryLabelAr}</span>
            </span>
          </div>

          {/* Rating Badge */}
          {typeof profile.rating === "number" && (
            <div className="absolute top-3 end-3">
              <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-amber-700 shadow-xs border border-white/80 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-mono">{profile.rating.toFixed(1)}</span>
              </span>
            </div>
          )}
        </div>

        {/* Overlapping Avatar & Identity Header */}
        <div className="px-5 pt-0 pb-3 relative">
          <div className="-mt-10 mb-2 flex items-end justify-between">
            <div className="relative">
              <div className="w-18 h-18 rounded-full p-1 bg-white shadow-md border border-slate-100">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover bg-slate-50"
                />
              </div>

              {/* Electric Blue Verified Checkmark Badge */}
              {profile.isVerified && (
                <div
                  className="absolute bottom-0 end-0 bg-white rounded-full p-0.5 shadow-sm"
                  title="عضو موثق في دليل SHAM360"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center text-white">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              )}
            </div>

            {/* City Tag */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
              <MapPin className="w-3 h-3 text-rose-500" />
              <span className="truncate max-w-[130px]">{profile.city}</span>
            </span>
          </div>

          {/* Name & Title */}
          <div className="space-y-0.5 mb-3">
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-1">
              {profile.name}
            </h3>
            <p className="text-xs font-semibold text-slate-600 line-clamp-1">
              {profile.title}
            </p>
            {profile.companyName && (
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {profile.companyName}
              </p>
            )}
          </div>

          {/* "عضو موثق في دليل SHAM360" Tag */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] font-bold text-[#0066FF]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>عضو موثق في دليل SHAM360</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Quick WhatsApp & Call Action Icons */}
        <div className="flex items-center gap-1.5">
          {cleanWhatsapp && (
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل عبر واتساب"
              title="تواصل عبر واتساب"
              className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          {profile.contactInfo.phone && (
            <a
              href={`tel:${profile.contactInfo.phone}`}
              aria-label="اتصال هاتفي مباشر"
              title="اتصال هاتفي مباشر"
              className="w-8 h-8 rounded-full bg-blue-50 hover:bg-[#0066FF] text-[#0066FF] hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* View Profile Button */}
        <button
          type="button"
          onClick={() => onSelectProfile(profile)}
          className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-[#0066FF] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>عرض الملف</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// ==============================================================================
// 6. COMPONENT 3: Sham360DirectoryView (Search, Category Tabs, SHAM360 Grid)
// ==============================================================================

export interface Sham360DirectoryViewProps {
  profiles?: Sham360Profile[];
  onSelectProfile: (profile: Sham360Profile) => void;
  className?: string;
}

export const Sham360DirectoryView: React.FC<Sham360DirectoryViewProps> = ({
  profiles = MOCK_PROFILES,
  onSelectProfile,
  className = ""
}) => {
  const { isAr, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Sham360Category>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  // Category Tabs matching requirement
  const CATEGORY_TABS: Array<{
    id: Sham360Category;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "all", label: "جميع الأنشطة", icon: SlidersHorizontal },
    { id: "nfc_cards", label: "بطاقات NFC الذكية", icon: CreditCard },
    { id: "verified_business", label: "أعمال وشركات موثقة", icon: Building2 },
    { id: "smart_profile", label: "ملفات رقمية شخصية", icon: UserCheck }
  ];

  // Filter profiles based on search and selected tabs
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Category match
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // City match
      if (selectedCity !== "all" && !p.city.includes(selectedCity)) {
        return false;
      }
      // Search keyword match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCompany = p.companyName?.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        return matchesName || matchesTitle || matchesCompany || matchesCity;
      }
      return true;
    });
  }, [profiles, selectedCategory, selectedCity, searchQuery]);

  return (
    <div
      dir={dir}
      className={`min-h-screen bg-[#F4F5F7] text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-[#0066FF] selection:text-white ${className}`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Directory Hero Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white shadow-xs border border-slate-200 text-xs font-bold text-[#0066FF]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>دليل الأعمال والملفات الذكية الموثقة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            دليل SHAM360 الرقمي الموحد
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            استكشف وتواصل فورياً مع رواد الأعمال، الشركات المعتمدة، وحاملي بطاقات
            NFC الذكية في الجمهورية العربية السورية.
          </p>
        </div>

        {/* -------------------------------------------------------------
            SEARCH BAR & CATEGORY TABS
           ------------------------------------------------------------- */}
        <div className="bg-white rounded-[32px] p-4 sm:p-5 shadow-sm border border-slate-200/80 space-y-4">
          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 start-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المهنة، النشاط، أو المدينة..."
              className="w-full ps-12 pe-10 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 -translate-y-1/2 end-3 p-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    isActive
                      ? "bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/20"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Results Header */}
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-bold text-slate-500">
            عرض {filteredProfiles.length} ملف ذكي موثق
          </p>
          <span className="text-[11px] text-slate-400 font-mono">
            SHAM360 Verified Directory
          </span>
        </div>

        {/* -------------------------------------------------------------
            DIRECTORY CARDS GRID (Modern Aesthetic)
           ------------------------------------------------------------- */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((p) => (
              <Sham360DirectoryCard
                key={p.id}
                profile={p}
                onSelectProfile={onSelectProfile}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[32px] p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              جرّب تغيير كلمات البحث أو اختيار تبويب آخر لعرض الملفات المتاحة.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==============================================================================
// 7. MASTER UNIFIED SHOWCASE COMPONENT
//    (Allows instantaneous testing between Full Profile View & Directory Page)
// ==============================================================================

export const Sham360UnifiedSystem: React.FC = () => {
  // Navigation & View Mode State
  const [activeView, setActiveView] = useState<"profile" | "directory">(
    "profile"
  );
  const [selectedProfile, setSelectedProfile] = useState<Sham360Profile>(
    MOCK_PROFILES[0]
  );

  const handleSelectFromDirectory = (profile: Sham360Profile) => {
    setSelectedProfile(profile);
    setActiveView("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] font-sans">
      {/* Interactive Top Viewport Switcher Banner */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0066FF]" />
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">
              SHAM360
            </span>
            <span className="text-xs text-slate-400 font-mono">| Swiss Minimalist System</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveView("profile")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === "profile"
                  ? "bg-white text-[#0066FF] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              معاينة الملف الشخصي (Profile View)
            </button>
            <button
              type="button"
              onClick={() => setActiveView("directory")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === "directory"
                  ? "bg-white text-[#0066FF] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              دليل SHAM360 الذكي (Directory Grid)
            </button>
          </div>

          {/* Mock Profile Quick Switcher (Tests conditional link hiding) */}
          {activeView === "profile" && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-bold hidden sm:inline">
                تبديل نموذج الاختبار:
              </span>
              <select
                value={selectedProfile.id}
                onChange={(e) => {
                  const found = MOCK_PROFILES.find((p) => p.id === e.target.value);
                  if (found) setSelectedProfile(found);
                }}
                className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              >
                {MOCK_PROFILES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.categoryLabelAr})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>

      {/* Main View Port */}
      <main>
        {activeView === "profile" ? (
          <Sham360ProfileView
            profile={selectedProfile}
            onNavigateToDirectory={() => setActiveView("directory")}
          />
        ) : (
          <Sham360DirectoryView
            profiles={MOCK_PROFILES}
            onSelectProfile={handleSelectFromDirectory}
          />
        )}
      </main>
    </div>
  );
};

export default Sham360UnifiedSystem;
