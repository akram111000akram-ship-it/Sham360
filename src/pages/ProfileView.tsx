import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "../services/router";
import { getProfileBySlug } from "../services/profileService";
import { lookupNFCToken, isNFCTokenIdentifier } from "../services/nfcTokenService";
import { Sham360ProfileView, Sham360ProfileData } from "../components/Sham360ProfileView";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Maximize2,
  Sparkles,
  Radio,
  Share2,
  Download,
  Copy,
  Check,
  MapPin,
  Compass,
  QrCode,
  ShieldCheck,
  Bot,
  MessageCircle,
  Phone,
  Navigation,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
  Zap,
  RotateCw,
  Eye,
  Sliders,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../services/LanguageContext";

interface ProfileViewProps {
  slugOverride?: string;
  previewModeProp?: boolean;
}

// Curated Syrian Smart Profiles for test switching (Akram as primary spotlight profile)
const CURATED_SMART_PROFILES = [
  { slug: "akram", labelAr: "م. أكرم دمشقي (الهوية الذكية)", labelEn: "Eng. Akram (Smart Identity)", icon: "👨‍💻", tagAr: "هندسة ذكية" },
  { slug: "al-yasmeen", labelAr: "مطعم وبيت الياسمين", labelEn: "Al-Yasmeen Palace", icon: "🍽️", tagAr: "ضيافة شامية" },
  { slug: "national-museum-damascus", labelAr: "متحف دمشق الوطني", labelEn: "Damascus National Museum", icon: "🏛️", tagAr: "تراث وثقافة" },
  { slug: "dr-khalid-cardiology", labelAr: "د. خالد النحاس (أمراض قلب)", labelEn: "Dr. Khalid (Cardiology)", icon: "🩺", tagAr: "نخبة طبية" },
  { slug: "naranj-restaurant", labelAr: "مطعم النارنج الدمشقي", labelEn: "Naranj Restaurant", icon: "🌸", tagAr: "دمشق القديمة" },
  { slug: "al-sham-technology", labelAr: "مؤسسة شام 360 للتقنيات", labelEn: "Sham360 Technologies", icon: "🏢", tagAr: "حلول رقمية" },
  { slug: "krak-des-chevaliers", labelAr: "قلعة الحصن بحمص", labelEn: "Krak des Chevaliers", icon: "🏰", tagAr: "تراث عالمي" }
];

export const ProfileView: React.FC<ProfileViewProps> = ({ slugOverride, previewModeProp }) => {
  const { currentRoute, navigate } = useRouter();
  const slug = slugOverride || currentRoute.params.slug || "akram";
  const [profile, setProfile] = useState<Sham360ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAr, toggleLanguage } = useLanguage();

  // Smart UI Controls
  const [previewDeviceMode, setPreviewDeviceMode] = useState<"phone" | "card">("phone");
  const [isNfcTapping, setIsNfcTapping] = useState(false);
  const [nfcSuccessNotice, setNfcSuccessNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  // Direct Tap Redirect State
  const [isRedirectCancelled, setIsRedirectCancelled] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(1);
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if owner is previewing via query parameter `?preview=true` or prop
  const isPreviewMode = useMemo(() => {
    if (previewModeProp) return true;
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("preview") === "true" || window.location.hash.includes("preview")) {
        return true;
      }
    }
    return currentRoute.params.preview === "true";
  }, [previewModeProp, currentRoute.params]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadTargetProfile() {
      let resolvedSlug = slug;

      // Check if the identifier is an NFC card token (e.g. sham_a8f9b1c2d3)
      if (isNFCTokenIdentifier(slug)) {
        const token = await lookupNFCToken(slug);
        if (token) {
          if (token.status === "unassigned" || !token.profileId) {
            // Unregistered token - redirect directly to secure activation flow!
            navigate(`/activateCardPage?token=${encodeURIComponent(token.token)}`);
            return;
          } else if (token.profileSlug || token.profileId) {
            resolvedSlug = token.profileSlug || token.profileId;
          }
        } else {
          // Hardware token not in DB yet - redirect to activateCardPage for Google binding
          navigate(`/activateCardPage?token=${encodeURIComponent(slug)}`);
          return;
        }
      }

      const data = await getProfileBySlug(resolvedSlug);
      if (!isMounted) return;
      setProfile(data);
      setLoading(false);

      // Evaluate Direct Tap Redirect Mode
      if (data) {
        const isRedirectEnabled = Boolean(
          data.direct_redirect_enabled ?? data.directRedirectEnabled
        );
        const redirectUrl = (
          data.direct_redirect_url || data.directRedirectUrl || ""
        ).trim();

        // Validate URL
        const isValidUrl =
          redirectUrl.startsWith("http://") ||
          redirectUrl.startsWith("https://");

        if (isRedirectEnabled && isValidUrl && !isPreviewMode && !isRedirectCancelled) {
          setIsRedirecting(true);

          // Fast instant redirect with fallback cancel window
          redirectTimerRef.current = setTimeout(() => {
            if (typeof window !== "undefined") {
              window.location.href = redirectUrl;
            }
          }, 400);
        }
      }
    }

    loadTargetProfile();

    return () => {
      isMounted = false;
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, [slug, isPreviewMode, isRedirectCancelled, navigate]);

  // Cancel redirect and remain on full profile preview
  const handleCancelRedirect = () => {
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
    }
    setIsRedirecting(false);
    setIsRedirectCancelled(true);
  };

  // Simulate physical NFC Tap on the Smart Profile
  const triggerNfcTapSimulation = () => {
    setIsNfcTapping(true);
    setNfcSuccessNotice(false);

    setTimeout(() => {
      setIsNfcTapping(false);
      setNfcSuccessNotice(true);
      setTimeout(() => setNfcSuccessNotice(false), 3500);
    }, 1200);
  };

  // Copy Profile Link
  const handleCopyLink = (withPreviewParam = false) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://sham360.online";
    const fullUrl = withPreviewParam
      ? `${baseUrl}/p/${slug}?preview=true`
      : `${baseUrl}/p/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Download Contact (.vcf)
  const handleDownloadVCard = () => {
    if (!profile) return;
    const vCardLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${profile.name}`,
      `TITLE:${profile.titleOrCategory || ""}`,
      profile.contactInfo?.phone ? `TEL;TYPE=CELL:${profile.contactInfo.phone}` : "",
      profile.contactInfo?.email ? `EMAIL:${profile.contactInfo.email}` : "",
      profile.contactInfo?.locationText ? `ADR;TYPE=WORK:;;${profile.contactInfo.locationText};;;Syria` : "",
      `URL:${window.location.href}`,
      `NOTE:SHAM360 Verified Smart NFC Identity - الجمهورية العربية السورية`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n");

    const blob = new Blob([vCardLines], { type: "text/vcard;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${slug}-sham360.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // AI Instant Smart Answer for profile
  const handleAiAsk = (query: string) => {
    if (!profile) return;
    setIsAiConsultantOpen(true);

    if (query === "hours") {
      setAiAnswer(
        isAr
          ? `المنشأة "${profile.name}" ترحب بكم وتعمل وفق جدول منتظم. يرجى التواصل عبر واتساب لتأكيد الحجوزات والمواعيد الحالية.`
          : `"${profile.name}" is open and accepting verified visitors. You can message them on WhatsApp to confirm immediate availability.`
      );
    } else if (query === "location") {
      setAiAnswer(
        isAr
          ? `الموقع مسجل بدقة في ${profile.city || "سوريا"} (${profile.contactInfo?.locationText || "وسط المدينة"}). يمكنك النقر على زر خرائط جوجل للتوجيه الفوري خطوة بخطوة.`
          : `Located in ${profile.city || "Syria"}. You can tap the Google Maps button for live step-by-step navigation.`
      );
    } else if (query === "services") {
      setAiAnswer(
        isAr
          ? `يقدم بروفايل "${profile.name}" بطاقة NFC الذكية، جولات 360° الافتراضية، وقنوات تواصل معتمدة وموثقة 100%.`
          : `"${profile.name}" provides verified services, smart NFC connectivity, 8K 360° VR views, and instant WhatsApp support.`
      );
    }
  };

  // Direct Tap Mode values
  const hasDirectRedirect = Boolean(
    profile &&
    (profile.direct_redirect_enabled ?? profile.directRedirectEnabled) &&
    (profile.direct_redirect_url || profile.directRedirectUrl)
  );
  const targetRedirectUrl = (
    profile?.direct_redirect_url || profile?.directRedirectUrl || ""
  ).trim();

  // 1. Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-slate-700">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-[#0066FF] rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-700 font-sans">
          {isAr ? "جاري تحميل بطاقة الهوية الرقمية الذكية..." : "Loading Smart NFC Profile..."}
        </p>
      </div>
    );
  }

  // 2. Direct Tap Redirecting Interstitial Screen (for instant visitor tap)
  if (isRedirecting && hasDirectRedirect && !isRedirectCancelled) {
    return (
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white flex flex-col items-center justify-center p-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900/90 border border-blue-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6"
        >
          {/* Glowing background halo */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Active Direct Tap Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{isAr ? "نمط التوجيه المباشر بنقرة واحدة (Direct Tap)" : "Direct Tap Redirect Mode Active"}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? "جاري توجيهك فوراً..." : "Redirecting Instantly..."}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? `يقوم ${profile?.name} بتحويل زوار بطاقة NFC مباشرة إلى:`
                : `${profile?.name} is redirecting NFC visitors directly to:`}
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-emerald-400 break-all text-left dir-ltr">
              {targetRedirectUrl}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <a
              href={targetRedirectUrl}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25"
            >
              <span>{isAr ? "المتابعة للرابط الآن" : "Continue to Link Now"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={handleCancelRedirect}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? "إلغاء التوجيه ومعاينة الملف الشخصي الكامل" : "Cancel & View Full SHAM360 Profile"}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-mono">
            SHAM360 Smart NFC Engine • Swiss Precision Redirect
          </p>
        </motion.div>
      </div>
    );
  }

  // 3. Profile Not Found
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-slate-900 text-center">
        <div className="bg-white border border-slate-200/90 p-8 rounded-3xl max-w-md w-full shadow-xl">
          <Globe className="w-12 h-12 text-[#0066FF] mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-slate-900">
            {isAr ? "الملف الرقمي غير متوفر" : "Profile Not Found"}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            {isAr
              ? `لم يتم العثور على ملف رقمي مسجل بالمعرّف: "${slug}"`
              : `No digital profile found matching: "${slug}"`}
          </p>
          <button
            type="button"
            onClick={() => navigate("/directory")}
            className="w-full py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            {isAr ? "تصفح دليل سوريا الذكي" : "Explore Syria Smart Directory"}
          </button>
        </div>
      </div>
    );
  }

  // 4. Normal Profile Screen (with Owner Preview Notice if Direct Tap is Active)
  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 selection:bg-blue-600 selection:text-white"
    >
      {/* DIRECT TAP REDIRECT MODE NOTICE BANNER (Displayed in Preview Mode or Cancelled State) */}
      {hasDirectRedirect && (
        <div className="bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-amber-500/15 border-b border-amber-300/40 text-slate-800 py-3 px-4 sticky top-0 z-30 backdrop-blur-md shadow-2xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-bold">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>{isAr ? "نمط التوجيه المباشر مفعّل (Direct Tap Active)" : "Direct Tap Redirect Mode Active"}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {isAr ? "وضع المعاينة" : "Preview Mode"}
                  </span>
                </p>
                <p className="text-[11px] text-slate-600 line-clamp-1">
                  {isAr
                    ? `زوار بطاقة NFC يتم تحويلهم تلقائياً إلى: ${targetRedirectUrl}`
                    : `NFC card visitors are redirected to: ${targetRedirectUrl}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={targetRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <span>{isAr ? "تجربة الرابط المباشر" : "Test Direct Link"}</span>
                <ExternalLink className="w-3 h-3 text-[#0066FF]" />
              </a>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-3 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <Sliders className="w-3 h-3" />
                <span>{isAr ? "إعدادات التوجيه" : "Edit Settings"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar: Curated Profiles Switcher & Admin / Preview Actions */}
      <div className="bg-white/90 border-b border-slate-200/90 py-2.5 px-4 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-black text-slate-500 shrink-0 uppercase tracking-wider">
              {isAr ? "نماذج معتمدة:" : "Verified Profiles:"}
            </span>
            {CURATED_SMART_PROFILES.map((p) => {
              const isActive = p.slug === slug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => navigate(`/profile/${p.slug}${hasDirectRedirect ? "?preview=true" : ""}`)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#0066FF] text-white shadow-2xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{isAr ? p.labelAr : p.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title={isAr ? "لوحة التحكم" : "Dashboard"}
            >
              <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="hidden sm:inline">{isAr ? "لوحة التحكم" : "Dashboard"}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/directory")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title={isAr ? "دليل الأعمال" : "Directory"}
            >
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">{isAr ? "الدليل" : "Directory"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyLink(hasDirectRedirect)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title={isAr ? "نسخ رابط الملف" : "Copy Profile Link"}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{isAr ? "تم النسخ" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{isAr ? "نسخ الرابط" : "Share"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadVCard}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>{isAr ? "تحميل vCard" : "vCard"}</span>
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Viewport */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative">
          {/* Main Public Profile Component */}
          <Sham360ProfileView
            profile={profile}
            isAr={isAr}
            onNavigateToSales={() => navigate("/products")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
