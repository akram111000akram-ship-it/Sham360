import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../services/LanguageContext";
import { Logo } from "./Logo";
import { Sham360OfficialCard } from "./card/Sham360OfficialCard";
import { Sham360OfficialKeychain } from "./card/Sham360OfficialKeychain";
import { Sham360OfficialStand } from "./card/Sham360OfficialStand";
import { Sham360ProfileView, Sham360ProfileData } from "./Sham360ProfileView";
import {
  User,
  Share2,
  ExternalLink,
  Smartphone,
  BarChart3,
  Link2,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Star,
  Globe,
  Copy,
  Check,
  Plus,
  Trash2,
  Radio,
  CreditCard,
  Key,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  QrCode,
  Download,
  Eye,
  RefreshCw,
  Save,
  Lock,
  Unlock,
  AlertCircle,
  Compass,
  Languages,
  Zap
} from "lucide-react";

// ==============================================================================
// 1. INITIAL MOCK DATA (High Standard Syrian Digital Identity)
// ==============================================================================

const initialProfileData: Sham360ProfileData = {
  id: "akram-sham360",
  slug: "akram-engineer",
  type: "individual",
  name: "م. أكرم الحلبي",
  nameEn: "Eng. Akram Al-Halabi",
  titleOrCategory: "استشاري حلول رقمية وبطاقات الأعمال الذكية",
  jobTitle: "استشاري حلول رقمية وبطاقات الأعمال الذكية",
  companyName: "منظومة شام 360 للتحول الرقمي",
  bio: "مستشار تقني متخصص في أتمتة الأعمال، وحلول النقر الذكي NFC، وربط الشركات السورية بخرائط Google الرسمية والجولات الافتراضية 360°.",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  coverUrl:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  city: "دمشق - المزة",
  isVerified: true,
  directoryMember: true,
  contactInfo: {
    phone: "+963 933 888 999",
    whatsapp: "+963 933 888 999",
    email: "akram@sham360.online",
    website: "https://sham360.online",
    locationText: "دمشق - المزة",
    googleMapsUrl: "https://maps.google.com/?q=Damascus+Syria",
    googleReviewUrl: "https://g.page/r/sham360/review"
  },
  socialLinks: {
    instagram: "akram.tech.sy",
    whatsapp: "+963 933 888 999"
  },
  links: [
    {
      id: "link-1",
      label: "موقع المنظومة الرسمي",
      url: "https://sham360.online",
      iconName: "globe",
      isHighlight: true,
      description: "بوابة البطاقات الذكية الأولى في سوريا"
    },
    {
      id: "link-2",
      label: "كتالوج منتجات NFC 2026",
      url: "https://sham360.online/#hardware",
      iconName: "file",
      isHighlight: false,
      description: "تصفح أحدث بطاقات وحوامل الأكريليك"
    },
    {
      id: "link-3",
      label: "دليل الأعمال السوري الموثق",
      url: "https://sham360.online/directory",
      iconName: "compass",
      isHighlight: false,
      description: "استكشف الشركات والمهنيين المعتمدين"
    }
  ]
};

interface LinkedCard {
  id: string;
  name: string;
  type: "card" | "stand" | "sticker" | "keychain";
  serialNumber: string;
  status: "active" | "locked";
  lastTap: string;
  totalTaps: number;
  assignedProfileSlug: string;
}

const initialCards: LinkedCard[] = [
  {
    id: "card-1",
    name: "بطاقة الستانلس ستيل الفاخرة (Matte Black)",
    type: "card",
    serialNumber: "SHAM-NFC-9942",
    status: "active",
    lastTap: "منذ 8 دقائق (دمشق - كفرسوسة)",
    totalTaps: 842,
    assignedProfileSlug: "akram-engineer"
  },
  {
    id: "card-keychain",
    name: "ميدالية المفاتيح الأكريليكية الشفافة SHAM360",
    type: "keychain",
    serialNumber: "SHAM-KEY-8821",
    status: "active",
    lastTap: "منذ 18 دقيقة (مفاتيح السيارة)",
    totalTaps: 610,
    assignedProfileSlug: "akram-engineer"
  },
  {
    id: "card-2",
    name: "ستاند الطاولة الأكريليكي الأبيض L-Stand (NFC + QR)",
    type: "stand",
    serialNumber: "SHAM-STAND-1029",
    status: "active",
    lastTap: "منذ ساعتين (مكتب المزة)",
    totalTaps: 490,
    assignedProfileSlug: "akram-engineer"
  },
  {
    id: "card-3",
    name: "ملصق NFC الذكي للهاتف والمكتب",
    type: "sticker",
    serialNumber: "SHAM-TAG-4022",
    status: "locked",
    lastTap: "منذ 3 أيام",
    totalTaps: 150,
    assignedProfileSlug: "akram-engineer"
  }
];

// Preset Syrian Cities
const SYRIAN_CITIES = [
  { ar: "دمشق - المزة", en: "Damascus - Mazzeh" },
  { ar: "دمشق - المالكي وأبو رمانة", en: "Damascus - Malki & Abu Roummaneh" },
  { ar: "دمشق - كفرسوسة", en: "Damascus - Kafr Sousa" },
  { ar: "دمشق - القصاع وباب توما", en: "Damascus - Qassaa & Bab Touma" },
  { ar: "ريف دمشق - جرمانا وصحنايا", en: "Rural Damascus - Jaramana & Sahnaya" },
  { ar: "حلب - الشهباء والسبيل", en: "Aleppo - Shahbaa & Sabil" },
  { ar: "حمص - المحطة والإنشاءات", en: "Homs - Mahatta & Insha'at" },
  { ar: "حماة - وسط المدينة", en: "Hama - City Center" },
  { ar: "اللاذقية - الكورنيش الغربي", en: "Latakia - Western Corniche" },
  { ar: "طرطوس - الكورنيش البحري", en: "Tartous - Sea Corniche" },
  { ar: "السويداء - طريق دمشق", en: "As-Suwayda - Damascus Highway" }
];

// Preset Avatar options
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
];

// Preset Cover options
const PRESET_COVERS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
];

// ==============================================================================
// 2. MAIN COMPONENT: Sham360Dashboard
// ==============================================================================

export const Sham360Dashboard: React.FC<{
  onViewLiveProfile?: (slug: string) => void;
}> = ({ onViewLiveProfile }) => {
  const { isAr, toggleLanguage, t } = useLanguage();
  // Navigation Tabs State
  type DashboardTab = "profile" | "links" | "nfc" | "analytics";
  const [activeTab, setActiveTab] = useState<DashboardTab>("profile");

  // Profile Form State
  const [profile, setProfile] = useState<Sham360ProfileData>(initialProfileData);
  const [cards, setCards] = useState<LinkedCard[]>(initialCards);

  // UI States
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewDeviceMode, setPreviewDeviceMode] = useState<"phone" | "expanded">("phone");
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [activeHardwareSimulator, setActiveHardwareSimulator] = useState<"card" | "keychain" | "stand">("card");

  // New Link Input State for Tab 2
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkDesc, setNewLinkDesc] = useState("");
  const [newLinkIcon, setNewLinkIcon] = useState("globe");

  // Handle Input Changes
  const handleProfileChange = (field: keyof Sham360ProfileData, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (
    field: "phone" | "whatsapp" | "email" | "website" | "locationText" | "googleMapsUrl" | "googleReviewUrl",
    value: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      contactInfo: {
        ...(prev.contactInfo || {}),
        [field]: value
      }
    }));
  };

  const handleSocialChange = (network: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {}),
        [network]: value
      }
    }));
  };

  // Add Custom Link
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkLabel.trim() || !newLinkUrl.trim()) return;

    const newLink = {
      id: `link-${Date.now()}`,
      label: newLinkLabel.trim(),
      url: newLinkUrl.trim().startsWith("http") ? newLinkUrl.trim() : `https://${newLinkUrl.trim()}`,
      iconName: newLinkIcon,
      isHighlight: false,
      description: newLinkDesc.trim() || undefined
    };

    setProfile((prev) => ({
      ...prev,
      links: [...(prev.links || []), newLink]
    }));

    setNewLinkLabel("");
    setNewLinkUrl("");
    setNewLinkDesc("");
    triggerSaveToast(isAr ? "تمت إضافة الرابط بنجاح!" : "Link added successfully!");
  };

  // Delete Custom Link
  const handleDeleteLink = (linkId: string) => {
    setProfile((prev) => ({
      ...prev,
      links: (prev.links || []).filter((l) => l.id !== linkId)
    }));
    triggerSaveToast(isAr ? "تم حذف الرابط." : "Link deleted.");
  };

  // Toggle Card Lock/Active Status
  const handleToggleCardStatus = (cardId: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              status: card.status === "active" ? "locked" : "active"
            }
          : card
      )
    );
    triggerSaveToast(isAr ? "تم تحديث حالة أمان البطاقة بنجاح!" : "Card security status updated successfully!");
  };

  // Trigger Save Notification
  const triggerSaveToast = (msg?: string) => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  // Copy Profile Link
  const handleCopyLink = () => {
    const fullUrl = `https://sham360.online/p/${profile.slug || "akram-engineer"}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Live profile link
  const profilePublicUrl = `https://sham360.online/p/${profile.slug || "akram-engineer"}`;

  // Analytics Stats calculations
  const analyticsTotals = useMemo(() => {
    const totalTaps = cards.reduce((acc, c) => acc + c.totalTaps, 0);
    const profileViews = Math.round(totalTaps * 2.18);
    const vCardDownloads = Math.round(profileViews * 0.38);
    const directCalls = Math.round(profileViews * 0.22);
    return { totalTaps, profileViews, vCardDownloads, directCalls };
  }, [cards]);

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F4F5F7] text-slate-900 font-sans antialiased selection:bg-[#0066FF] selection:text-white"
    >
      {/* =========================================================================
          1. TOP NAVIGATION HEADER
          - Consistent Brand Logo (with Smart Digital Presence span)
          - User Profile Status Badge ("عضو موثق")
          - Live View CTA Button & Save Status
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Logo iconSize={36} isAr={isAr} light={false} />
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] text-[11px] font-bold border border-blue-100">
              <Sparkles className="w-3 h-3 text-[#0066FF]" />
              <span>{isAr ? "لوحة التحكم وإدارة NFC" : "Dashboard & NFC Management"}</span>
            </span>
          </div>

          {/* User Status, Share & Live Preview CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Profile Mini Badge */}
            <div className="flex items-center gap-2 p-1 sm:pe-3 bg-slate-100/90 rounded-full border border-slate-200/80">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white shadow-2xs">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex flex-col text-start">
                <span className="text-xs font-black text-slate-900 leading-tight">
                  {isAr ? profile.name : (profile.nameEn || profile.name)}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isAr ? "عضو موثق SHAM360" : "SHAM360 Verified Member"}
                </span>
              </div>
            </div>

            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              title={isAr ? "Switch to English" : "التبديل إلى العربية"}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200/80 shadow-2xs"
            >
              <Languages className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-semibold">{isAr ? "EN" : "عربي"}</span>
            </button>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              title={isAr ? "نسخ رابط البروفايل المباشر" : "Copy Live Profile URL"}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200/80"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-700">{isAr ? "تم النسخ" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">{isAr ? "نسخ الرابط" : "Copy Link"}</span>
                </>
              )}
            </button>

            {/* Live Profile CTA */}
            <button
              type="button"
              onClick={() => {
                if (onViewLiveProfile) {
                  onViewLiveProfile(profile.slug || "akram-engineer");
                } else {
                  window.open(profilePublicUrl, "_blank");
                }
              }}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-bold shadow-md shadow-[#0066FF]/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isAr ? "معاينة البروفايل المباشر" : "View Live Profile"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Save Success Alert Notification */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-slate-950 text-white rounded-full shadow-2xl border border-slate-800 flex items-center gap-2 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? "تم حفظ جميع التغييرات بنجاح وبشكل فوري على السحابة ⚡" : "All changes saved successfully and synced to cloud ⚡"}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          2. MAIN CONTENT AREA: 2-COLUMN LAYOUT
          - Column 1: Tabs Navigation + Editor Forms / Cards / Analytics
          - Column 2: Sticky Live Mini-Preview Phone Screen (Modern Inspired)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* -------------------------------------------------------------------
              LEFT COLUMN (Ar: Right): TABS & WORKSPACE (lg:col-span-7)
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tab Navigation Bar (Swiss Pill Style) */}
            <div className="bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#0066FF] text-white shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{isAr ? "تعديل الملف" : "Edit Profile"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("links")}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "links"
                    ? "bg-[#0066FF] text-white shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>{isAr ? "روابط التواصل" : "Contact & Links"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("nfc")}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "nfc"
                    ? "bg-[#0066FF] text-white shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>{isAr ? `بطاقاتي الذكية (${cards.length})` : `Smart Cards (${cards.length})`}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("analytics")}
                className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "analytics"
                    ? "bg-[#0066FF] text-white shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{isAr ? "الإحصائيات" : "Analytics"}</span>
              </button>
            </div>

            {/* -----------------------------------------------------------------
                TAB 1: تعديل الملف الشخصي (Profile Details)
               ----------------------------------------------------------------- */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[28px] border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 text-start"
              >
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {isAr ? "بيانات الهوية والملف الشخصي" : "Identity & Digital Profile Data"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isAr
                      ? "هذه المعلومات ستظهر فوراً لأي شخص ينقر بطاقتك الذكية أو يمسح رمز QR."
                      : "This information appears instantly when someone taps your smart card or scans your QR code."}
                  </p>
                </div>

                {/* Avatar & Cover Pickers */}
                <div className="space-y-4 pt-2">
                  <label className="block text-xs font-extrabold text-slate-700">
                    {isAr ? "صورة الغلاف (Cover Banner)" : "Cover Banner Image"}
                  </label>
                  <div className="relative h-28 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={profile.coverUrl}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-xs">
                        {isAr ? "اختر من النماذج أدناه أو أدخل رابطاً" : "Choose from preset covers below or enter link"}
                      </span>
                    </div>
                  </div>
                  {/* Preset Covers Carousel */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_COVERS.map((cov, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleProfileChange("coverUrl", cov)}
                        className={`w-16 h-10 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                          profile.coverUrl === cov
                            ? "border-[#0066FF] scale-105"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={cov} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Avatar Picker */}
                  <div className="pt-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">
                      {isAr ? "الصورة الشخصية (Avatar Photo)" : "Profile Avatar Photo"}
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#0066FF] shadow-sm flex-shrink-0">
                        <img
                          src={profile.avatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {PRESET_AVATARS.map((av, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleProfileChange("avatarUrl", av)}
                            className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${
                              profile.avatarUrl === av
                                ? "border-[#0066FF] ring-2 ring-[#0066FF]/30 scale-105"
                                : "border-slate-200 opacity-75 hover:opacity-100"
                            }`}
                          >
                            <img src={av} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Name Ar */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700">
                      {isAr ? "الاسم الكامل (بالعربية) *" : "Full Name (Arabic) *"}
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      placeholder={isAr ? "مثال: م. أكرم الحلبي" : "e.g. Eng. Akram Al-Halabi"}
                    />
                  </div>

                  {/* Name En */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700">
                      {isAr ? "الاسم بالإنجليزية (English Name)" : "Full Name (English)"}
                    </label>
                    <input
                      type="text"
                      value={profile.nameEn || ""}
                      onChange={(e) => handleProfileChange("nameEn", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left"
                      placeholder="e.g. Eng. Akram Al-Halabi"
                    />
                  </div>

                  {/* Title / Profession */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700">
                      {isAr ? "المسمى المهني / التخصص *" : "Professional Title / Specialization *"}
                    </label>
                    <input
                      type="text"
                      value={profile.titleOrCategory}
                      onChange={(e) => {
                        handleProfileChange("titleOrCategory", e.target.value);
                        handleProfileChange("jobTitle", e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      placeholder={isAr ? "مثال: استشاري حلول رقمية وبطاقات الأعمال الذكية" : "e.g. Digital Solutions & Smart Business Cards Consultant"}
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700">
                      {isAr ? "الشركة أو النشاط التجاري" : "Company or Organization"}
                    </label>
                    <input
                      type="text"
                      value={profile.companyName || ""}
                      onChange={(e) => handleProfileChange("companyName", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      placeholder={isAr ? "مثال: شام 360 للتحول الرقمي" : "e.g. SHAM360 Digital Solutions"}
                    />
                  </div>

                  {/* City Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700">
                      {isAr ? "المدينة والمنطقة *" : "City & Region *"}
                    </label>
                    <select
                      value={profile.city || SYRIAN_CITIES[0].ar}
                      onChange={(e) => handleProfileChange("city", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all cursor-pointer"
                    >
                      {SYRIAN_CITIES.map((city) => (
                        <option key={city.ar} value={city.ar}>
                          {isAr ? city.ar : city.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bio Textarea */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700">
                      {isAr ? "نبذة تعريفية مختصرة (Bio)" : "Brief Bio / Summary"}
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bio || ""}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all leading-relaxed"
                      placeholder={isAr ? "اكتب نبذة مهنية عن خبراتك وخدماتك..." : "Write a professional summary of your expertise and services..."}
                    />
                  </div>
                </div>

                {/* Save Button Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isAr ? "التحديثات تظهر مباشرة على المعاينة الجانبية." : "Updates appear live on the side preview."}
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerSaveToast()}
                    className="px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-bold shadow-md shadow-[#0066FF]/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isAr ? "حفظ التعديلات" : "Save Changes"}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* -----------------------------------------------------------------
                TAB 2: روابط التواصل والشبكات (Links & Socials)
               ----------------------------------------------------------------- */}
            {activeTab === "links" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[28px] border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 text-start"
              >
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {isAr ? "أرقام الاتصال وروابط التواصل السريع" : "Contact Numbers & Quick Links"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isAr
                      ? "تتيح للعملاء حفظ جهة اتصالك (.vcf) أو الاتصال ومراسلتك على واتساب بلمسة واحدة."
                      : "Allows clients to save your contact card (.vcf) or call and message you on WhatsApp with a single tap."}
                  </p>
                </div>

                {/* Direct Communications Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{isAr ? "رقم الهاتف المباشر *" : "Direct Phone Number *"}</span>
                    </label>
                    <input
                      type="text"
                      value={profile.contactInfo?.phone || ""}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left font-mono"
                      placeholder="+963 933 888 999"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isAr ? "رقم الواتساب للمحادثة الفورية *" : "Instant WhatsApp Number *"}</span>
                    </label>
                    <input
                      type="text"
                      value={profile.contactInfo?.whatsapp || ""}
                      onChange={(e) => {
                        handleContactChange("whatsapp", e.target.value);
                        handleSocialChange("whatsapp", e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left font-mono"
                      placeholder="+963 933 888 999"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      <span>{isAr ? "البريد الإلكتروني الرسمي" : "Official Email Address"}</span>
                    </label>
                    <input
                      type="email"
                      value={profile.contactInfo?.email || ""}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left"
                      placeholder="info@yourcompany.com"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      <span>{isAr ? "حساب انستغرام" : "Instagram Account"}</span>
                    </label>
                    <input
                      type="text"
                      value={profile.socialLinks?.instagram || ""}
                      onChange={(e) => handleSocialChange("instagram", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left"
                      placeholder="username"
                    />
                  </div>

                  {/* Google Maps Location */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{isAr ? "رابط موقعك على خرائط Google" : "Google Maps Location Link"}</span>
                    </label>
                    <input
                      type="text"
                      value={profile.contactInfo?.googleMapsUrl || ""}
                      onChange={(e) => handleContactChange("googleMapsUrl", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>

                  {/* Google Reviews Direct Link */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>{isAr ? "رابط تقييمات Google 5-Stars المباشر" : "Google 5-Star Reviews Direct Link"}</span>
                    </label>
                    <input
                      type="text"
                      value={profile.googleReviewUrl || profile.contactInfo?.googleReviewUrl || ""}
                      onChange={(e) => {
                        handleProfileChange("googleReviewUrl", e.target.value);
                        handleContactChange("googleReviewUrl", e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all text-left"
                      placeholder="https://g.page/r/your-id/review"
                    />
                  </div>
                </div>

                {/* DIRECT TAP REDIRECT MODE (نمط التوجيه المباشر) */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="p-5 sm:p-6 rounded-3xl bg-blue-50/50 border-2 border-blue-500/30 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                          <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900">
                            {isAr
                              ? "Direct Tap Mode / نمط التوجيه المباشر (Google Rating / Direct Link)"
                              : "Direct Tap Mode / نمط التوجيه المباشر (Google Rating / Direct Link)"}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {isAr
                              ? "تحويل الزوار عند نقر بطاقة NFC مباشرة إلى رابط محدد (مثل تقييم Google) بدلاً من البروفايل."
                              : "Instantly redirect visitors upon NFC tap to a target link instead of your profile."}
                          </p>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                        <input
                          type="checkbox"
                          checked={Boolean(profile.direct_redirect_enabled ?? profile.directRedirectEnabled)}
                          onChange={(e) => {
                            const val = e.target.checked;
                            handleProfileChange("direct_redirect_enabled", val);
                            handleProfileChange("directRedirectEnabled", val);
                            triggerSaveToast(
                              isAr
                                ? `تم ${val ? "تفعيل" : "إيقاف"} نمط التوجيه المباشر بنجاح.`
                                : `Direct Tap Mode ${val ? "enabled" : "disabled"}.`
                            );
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0066FF] border border-slate-300 transition-colors"></div>
                      </label>
                    </div>

                    {(profile.direct_redirect_enabled ?? profile.directRedirectEnabled) && (
                      <div className="pt-3 border-t border-blue-200/60 space-y-2 animate-in fade-in duration-200">
                        <label className="block text-xs font-black text-slate-800">
                          {isAr ? "Target URL / رابط التوجيه المباشر" : "Target URL / رابط التوجيه المباشر"}
                        </label>
                        <input
                          type="url"
                          value={profile.direct_redirect_url || profile.directRedirectUrl || ""}
                          onChange={(e) => {
                            handleProfileChange("direct_redirect_url", e.target.value);
                            handleProfileChange("directRedirectUrl", e.target.value);
                          }}
                          placeholder="https://g.page/r/your-google-review-link"
                          className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-[#0066FF] text-xs font-mono font-bold text-slate-900 text-left dir-ltr outline-none"
                        />
                        <p className="text-[11px] text-slate-500">
                          {isAr
                            ? "ملاحظة: يمكنك دائماً معاينة وتعديل ملفك دون توجيه بإضافة ?preview=true للرابط."
                            : "Note: You can preview without redirect anytime by adding ?preview=true to the URL."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Custom Links Section */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {isAr
                        ? `الروابط والقنوات المخصصة (${profile.links?.length || 0})`
                        : `Custom Links & Channels (${profile.links?.length || 0})`}
                    </h3>
                  </div>

                  {/* Existing Links List */}
                  <div className="space-y-2.5">
                    {profile.links && profile.links.length > 0 ? (
                      profile.links.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0066FF]">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{link.label}</p>
                              <p className="text-[11px] text-slate-500 font-mono line-clamp-1 text-left">
                                {link.url}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title={isAr ? "حذف الرابط" : "Delete link"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        {isAr
                          ? "لا توجد روابط مخصصة حالياً. أضف روابطك بالأسفل."
                          : "No custom links added yet. Add your links below."}
                      </p>
                    )}
                  </div>

                  {/* Add New Link Card */}
                  <form
                    onSubmit={handleAddLink}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-dashed border-slate-300 space-y-3"
                  >
                    <p className="text-xs font-black text-slate-800">
                      {isAr
                        ? "+ إضافة رابط جديد (موقع، كتالوج، قناة تيليغرام...)"
                        : "+ Add New Link (Website, Catalog, Telegram...)"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newLinkLabel}
                        onChange={(e) => setNewLinkLabel(e.target.value)}
                        placeholder={isAr ? "عنوان الرابط (مثال: كتالوج الخدمات)" : "Link Title (e.g. Services Catalog)"}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0066FF]"
                      />
                      <input
                        type="text"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder={isAr ? "الرابط URL (https://...)" : "Link URL (https://...)"}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0066FF] text-left"
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#0066FF] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isAr ? "إضافة الرابط للبروفايل" : "Add Link to Profile"}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Save CTA */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => triggerSaveToast()}
                    className="px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-bold shadow-md shadow-[#0066FF]/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isAr ? "حفظ بيانات التواصل" : "Save Contact Info"}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* -----------------------------------------------------------------
                TAB 3: بطاقاتي الذكية (NFC Cards Management)
               ----------------------------------------------------------------- */}
            {activeTab === "nfc" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[28px] border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 text-start"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      {isAr ? "البطاقات وحوامل NFC المرتبطة بملفك" : "NFC Cards & Hardware Linked to Profile"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {isAr
                        ? "تحكم بجميع أجهزة NFC الفيزيائية المرتبطة برابطك الموثق."
                        : "Manage all physical NFC devices linked to your verified profile."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAr ? "طلب بطاقة إضافية" : "Order Additional Card"}</span>
                  </button>
                </div>

                {/* Official Enhanced Hardware 3D Showcase (Card / Keychain) */}
                <div className="p-6 rounded-[28px] bg-slate-950 border border-slate-800 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
                  {/* Top Bar: Selector & Chip Spec */}
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-6 gap-3 px-2">
                    {/* Device Selector Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setActiveHardwareSimulator("card")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeHardwareSimulator === "card"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{isAr ? "البطاقة الذكية" : "Smart Card"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveHardwareSimulator("keychain")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeHardwareSimulator === "keychain"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>{isAr ? "ميدالية المفاتيح الكريستالية" : "Crystal Keychain"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveHardwareSimulator("stand")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeHardwareSimulator === "stand"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{isAr ? "ستاند الطاولة الأكريليكي" : "Acrylic Stand"}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800">
                        NXP NTAG216 • 888 Bytes
                      </span>
                    </div>
                  </div>

                  {/* Active Simulator Render */}
                  {activeHardwareSimulator === "card" ? (
                    <Sham360OfficialCard
                      size="lg"
                      interactive={true}
                      showFlipButton={true}
                      cardHolderName={isAr ? profile.name : (profile.nameEn || profile.name)}
                      cardHolderTitle={profile.jobTitle}
                      companyName={profile.company}
                      serialNumber={cards[0]?.serialNumber || "SHAM-360-SY-8891"}
                    />
                  ) : activeHardwareSimulator === "keychain" ? (
                    <div className="py-2">
                      <Sham360OfficialKeychain
                        size="md"
                        interactive={true}
                        showDetails={true}
                        backgroundTheme="dark"
                        serialNumber={cards.find((c) => c.type === "keychain")?.serialNumber || "SHAM-KEY-8821"}
                        targetUrl={`https://sham360.online/p/${profile.slug}`}
                      />
                    </div>
                  ) : (
                    <div className="py-2">
                      <Sham360OfficialStand
                        size="md"
                        interactive={true}
                        showDetails={true}
                        backgroundTheme="dark"
                        serialNumber="SHAM-STAND-L-9042"
                        title={isAr ? "بروفايلي الرقمي" : "My Digital Profile"}
                        subtitle="Scan  •  Tap  •  Connect"
                        ctaText={isAr ? "المس بالهاتف أو امسح الرمز للتواصل" : "Tap & Scan to Connect with Us"}
                        qrUrl={`https://sham360.online/p/${profile.slug}`}
                      />
                    </div>
                  )}
                </div>

                {/* Linked Hardware Cards List */}
                <div className="space-y-4 pt-2">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="p-5 rounded-[24px] border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs ${
                            card.status === "active" ? "bg-slate-900" : "bg-slate-400"
                          }`}
                        >
                          {card.type === "keychain" ? (
                            <Key className="w-6 h-6 text-cyan-400" />
                          ) : card.type === "stand" ? (
                            <Layers className="w-6 h-6 text-blue-400" />
                          ) : (
                            <Radio className="w-6 h-6 text-[#0066FF]" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-extrabold text-slate-900">
                              {card.name}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                card.status === "active"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {card.status === "active"
                                ? (isAr ? "نشطة ⚡" : "Active ⚡")
                                : (isAr ? "مقفلة 🔒" : "Locked 🔒")}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {isAr
                              ? `الرقم التسلسلي: ${card.serialNumber} • ${card.totalTaps} نقرة`
                              : `Serial: ${card.serialNumber} • ${card.totalTaps} taps`}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {isAr ? `آخر نقرة: ${card.lastTap}` : `Last tap: ${card.lastTap}`}
                          </p>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => handleToggleCardStatus(card.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                            card.status === "active"
                              ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {card.status === "active" ? (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>{isAr ? "قفل مؤقت" : "Lock Device"}</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>{isAr ? "تنشيط البطاقة" : "Activate Device"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Syrian NFC Technology Note */}
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900 space-y-1 leading-relaxed">
                    <p className="font-extrabold">
                      {isAr
                        ? "حماية سحابية مشفرة وتقنية NFC معتمدة عالمياً 13.56MHz"
                        : "Encrypted Cloud Security & Globally Certified 13.56MHz NFC"}
                    </p>
                    <p className="text-blue-700 text-[11px]">
                      {isAr
                        ? "في حال فقدان أي بطاقة، يمكنك قفلها فوراً بنقرة واحدة لمنع وصول أي طرف آخر لبياناتك. التوصيل السريع متاح في كافة المحافظات السورية."
                        : "If any card is lost, you can lock it immediately with one click to prevent unauthorized access. Express delivery available across all Syrian governorates."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* -----------------------------------------------------------------
                TAB 4: الإحصائيات الذكية (Analytics & Tap Insights)
               ----------------------------------------------------------------- */}
            {activeTab === "analytics" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[28px] border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 text-start"
              >
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {isAr ? "إحصائيات التفاعل ونقرات NFC" : "Interaction & NFC Tap Analytics"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isAr
                      ? "تقارير حية ومباشرة عن تفاعل العملاء مع بطاقتك الذكية في سوريا."
                      : "Live real-time reporting on customer engagement with your smart card across Syria."}
                  </p>
                </div>

                {/* Stat Metric Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                  {/* Metric 1 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-start space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      {isAr ? "نقرات NFC المادية" : "Physical NFC Taps"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                      {analyticsTotals.totalTaps.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{isAr ? "+18% هذا الأسبوع" : "+18% this week"}</span>
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-start space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      {isAr ? "زيارات البروفايل" : "Profile Views"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-[#0066FF] font-mono">
                      {analyticsTotals.profileViews.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{isAr ? "+24% تفاعل نشط" : "+24% active rate"}</span>
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-start space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      {isAr ? "حفظ جهة الاتصال" : "Saved Contacts"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
                      {analyticsTotals.vCardDownloads.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {isAr ? "تحميل ملف vCard" : "vCard downloads"}
                    </span>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-start space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      {isAr ? "نقرات واتساب ومكالمات" : "WhatsApp & Direct Calls"}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
                      {analyticsTotals.directCalls.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {isAr ? "تواصل مباشر" : "Direct conversions"}
                    </span>
                  </div>
                </div>

                {/* Recent Taps Log Table */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    {isAr ? "سجل آخر التفاعلات المباشرة" : "Recent Real-Time Activity Log"}
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        action: isAr ? "نقرة NFC على بطاقة الستانلس ستيل" : "NFC Tap on Matte Stainless Card",
                        device: "Apple iPhone 15 Pro",
                        city: isAr ? "دمشق - المزة" : "Damascus - Mazzeh",
                        time: isAr ? "منذ 8 دقائق" : "8 mins ago",
                        type: "nfc"
                      },
                      {
                        action: isAr ? "حفظ جهة الاتصال vCard" : "Downloaded Contact Card (vCard)",
                        device: "Samsung Galaxy S24 Ultra",
                        city: isAr ? "دمشق - كفرسوسة" : "Damascus - Kafr Sousa",
                        time: isAr ? "منذ 42 دقيقة" : "42 mins ago",
                        type: "vcard"
                      },
                      {
                        action: isAr ? "محادثة واتساب مباشرة من البروفايل" : "Direct WhatsApp chat initiated",
                        device: "Xiaomi Redmi Note 13",
                        city: isAr ? "حلب - الشهباء" : "Aleppo - Al Shahbaa",
                        time: isAr ? "منذ ساعتين" : "2 hours ago",
                        type: "whatsapp"
                      },
                      {
                        action: isAr ? "نقرة على حامل الأكريليك للتقييمات" : "Tap on Acrylic Stand for Google Reviews",
                        device: "Apple iPhone 13",
                        city: isAr ? "دمشق - المالكي" : "Damascus - Al Malki",
                        time: isAr ? "منذ 3 ساعات" : "3 hours ago",
                        type: "stand"
                      }
                    ].map((log, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                          <div>
                            <p className="font-bold text-slate-900">{log.action}</p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {log.device} • {log.city}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">
                          {log.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN (Ar: Left): STICKY LIVE MINI-PREVIEW PHONE PANEL
              - Real Smartphone Screen Bezel
              - Live Reactive Sham360ProfileView
              - Live Real-time Sync Indicator
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            {/* Header / Live Indicator Controls */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {isAr ? "معاينة حية في الوقت الفعلي" : "Live Real-Time Preview"}
                </span>
              </div>

              <span className="text-[11px] text-slate-400 font-mono">
                {profile.slug}.sham360.online
              </span>
            </div>

            {/* Modern Phone Bezel Frame (Swiss Minimalist Container) */}
            <div className="relative mx-auto w-full max-w-[375px] bg-[#0F172A] p-3 sm:p-3.5 rounded-[46px] shadow-2xl border-4 border-slate-800">
              {/* Top Speaker / Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 w-24 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-900 me-2" />
                <div className="w-10 h-1 bg-slate-900 rounded-full" />
              </div>

              {/* Inner Phone Screen Content with Custom Scrollbar */}
              <div className="relative w-full h-[620px] bg-[#F4F5F7] rounded-[36px] overflow-y-auto overflow-x-hidden pt-6 scrollbar-thin scrollbar-thumb-slate-300">
                {/* Live Real-time Embedded Sham360ProfileView */}
                <div className="transform scale-[0.92] origin-top -mt-2 -mb-8">
                  <Sham360ProfileView profile={profile} isAr={isAr} />
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2 mb-1" />
            </div>

            {/* Quick Actions Under Preview */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{isAr ? "عرض رمز QR" : "Show QR Code"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onViewLiveProfile) {
                    onViewLiveProfile(profile.slug || "akram-engineer");
                  } else {
                    window.open(profilePublicUrl, "_blank");
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isAr ? "فتح في نافذة كاملة" : "Open Full Page"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          3. ORDER NEW CARD MODAL
          ========================================================================= */}
      <AnimatePresence>
        {orderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-[28px] p-6 shadow-2xl border border-slate-200 text-start space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#0066FF]" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    {isAr ? "طلب بطاقة NFC أو حامل طاولة إضافي" : "Order Additional NFC Card or Stand"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOrderModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? `اختر نوع المنتج الذكي الإضافي لربطه فورياً بحسابك الموثق (${profile.name}):`
                  : `Choose an additional smart hardware device to instantly link to your verified account (${isAr ? profile.name : (profile.nameEn || profile.name)}):`}
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    title: isAr ? "بطاقة الستانلس ستيل الفاخرة Matte Black" : "Luxury Stainless Steel Card (Matte Black)",
                    badge: isAr ? "حفر ليزري مخصص" : "Laser Engraved",
                    desc: isAr ? "حفر ليزري مخصص باسمك ورقمك الذكي" : "Custom laser engraved with your name & digital ID"
                  },
                  {
                    title: isAr ? "حامل طاولة الأكريليك للمراجعات والتقييمات" : "Acrylic Table Stand for Google Reviews",
                    badge: isAr ? "أكريليك فاخر" : "Premium Acrylic",
                    desc: isAr ? "مخصص لكاونترات الشركات والمطاعم لفتح تقييمات Google" : "For reception counters and restaurants to collect 5-star reviews"
                  },
                  {
                    title: isAr ? "ملصق NFC الذكي للمكتب أو الهاتف" : "Smart NFC Epoxy Sticker for Desk or Phone",
                    badge: isAr ? "لاصق رفيع 3M" : "3M Thin Adhesive",
                    desc: isAr ? "ملصق مقاوم للماء عالي الحساسية" : "Waterproof high-sensitivity micro-tag"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.desc}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/963933888999?text=${encodeURIComponent(
                    isAr
                      ? `مرحباً SHAM360، أنا العضو الموثق (${profile.name})، أود طلب بطاقة/حامل NFC إضافي لربطه بملفي الذكي.`
                      : `Hello SHAM360, I am verified member (${profile.nameEn || profile.name}), I would like to order an additional NFC card/stand for my smart profile.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0066FF]/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "تأكيد الطلب المباشر عبر واتساب" : "Confirm Direct Order via WhatsApp"}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sham360Dashboard;
