import React, { useState, useEffect } from "react";
import { useRouter } from "../services/router";
import { useLanguage } from "../services/LanguageContext";
import {
  subscribeToAuthChanges,
  logout,
  getCurrentUser
} from "../services/authService";
import {
  getProfilesByOwner,
  createProfile,
  updateProfile,
  getFirestoreProfileBySlug,
  getProfileBySlug
} from "../services/profileService";
import { updateProfileInSupabase, isSupabaseConfigured } from "../services/supabase";
import { FirestoreProfile, Sham360ProfileData } from "../types";
import { Sham360ProfileView } from "../components/Sham360ProfileView";
import { Logo } from "../components/Logo";
import {
  User,
  LogOut,
  ExternalLink,
  Edit3,
  QrCode,
  Smartphone,
  CheckCircle,
  Copy,
  Check,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Star,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Share2,
  Radio,
  Sliders,
  Save,
  RotateCcw,
  Database
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const { navigate } = useRouter();
  const { isAr } = useLanguage();

  // Authentication State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true); // Default to demo/active edit for immediate preview

  // Active Tab
  type DashboardTab = "settings" | "links" | "nfc" | "analytics" | "preview";
  const [activeTab, setActiveTab] = useState<DashboardTab>("settings");

  // Profile State
  const [profile, setProfile] = useState<FirestoreProfile>({
    id: "akram-engineer",
    slug: "akram",
    profileType: "individual",
    name: "م. أكرم دمشقي",
    nameEn: "Eng. Akram",
    title: "استشاري حلول NFC وإنترنت الأشياء والذكاء الاصطناعي",
    bio: "أصمم بطاقات الهوية الرقمية الذكية وحلول الربط المباشر NFC لقطاع الأعمال في الجمهورية العربية السورية.",
    city: "دمشق",
    category: "هندسة وبرمجيات",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
    phone: "+963 933 888 999",
    whatsapp: "+963933888999",
    email: "akram@sham360.online",
    website: "https://sham360.online",
    googleMapsUrl: "https://maps.google.com/?q=Damascus+Syria",
    
    // Direct Tap Redirect Mode dynamic fields
    direct_redirect_enabled: false,
    direct_redirect_url: "",
    
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null,
    links: [
      {
        id: "l-1",
        label: "الملف المهني في معرض الأعمال",
        url: "https://sham360.online",
        iconName: "Globe"
      },
      {
        id: "l-2",
        label: "تقييم 5 نجوم على خرائط Google",
        url: "https://g.page/r/your-google-review-link",
        iconName: "Star"
      }
    ]
  });

  // UI state
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<string>("");

  // New Link inputs
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  // Listen to Auth Changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        setIsDemoMode(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch profile
  useEffect(() => {
    let isMounted = true;
    const loadProfileData = async () => {
      try {
        if (currentUser?.uid) {
          const owned = await getProfilesByOwner(currentUser.uid);
          if (owned && owned.length > 0 && isMounted) {
            setProfile(owned[0]);
            return;
          }
        }
        // Fallback to sample profile
        const sample = await getFirestoreProfileBySlug("akram");
        if (sample && isMounted) {
          setProfile(sample);
        }
      } catch (err) {
        console.warn("Could not fetch remote profile, using active default state:", err);
      }
    };

    loadProfileData();
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Direct toggle change for Direct Tap Redirect Mode
  const handleToggleDirectRedirect = async (enabled: boolean) => {
    const updatedProfile = {
      ...profile,
      direct_redirect_enabled: enabled,
      directRedirectEnabled: enabled
    };
    setProfile(updatedProfile);

    // If enabled and URL is empty, prefill with a helpful template or Google Review link
    if (enabled && !updatedProfile.direct_redirect_url) {
      const suggestedUrl = profile.googleMapsUrl || "https://g.page/r/your-google-review-link";
      updatedProfile.direct_redirect_url = suggestedUrl;
      updatedProfile.directRedirectUrl = suggestedUrl;
      setProfile(updatedProfile);
    }

    // Auto-save to Supabase & Firestore immediately
    await saveProfileChanges(updatedProfile, false);
  };

  // URL input change for Direct Tap Redirect Mode
  const handleDirectRedirectUrlChange = (url: string) => {
    setProfile((prev) => ({
      ...prev,
      direct_redirect_url: url,
      directRedirectUrl: url
    }));
  };

  // Preset selector for target URL
  const applyPresetUrl = async (presetUrl: string) => {
    const updatedProfile = {
      ...profile,
      direct_redirect_enabled: true,
      directRedirectEnabled: true,
      direct_redirect_url: presetUrl,
      directRedirectUrl: presetUrl
    };
    setProfile(updatedProfile);
    await saveProfileChanges(updatedProfile, true);
  };

  // Universal save handler for profile changes (updates Supabase & Firestore)
  const saveProfileChanges = async (profileDataToSave = profile, notify = true) => {
    setSaving(true);
    try {
      // 1. Sync to Supabase directly
      const supabaseResult = await updateProfileInSupabase(
        profileDataToSave.slug || profileDataToSave.id,
        {
          direct_redirect_enabled: Boolean(profileDataToSave.direct_redirect_enabled),
          direct_redirect_url: profileDataToSave.direct_redirect_url || "",
          name: profileDataToSave.name,
          title: profileDataToSave.title,
          phone: profileDataToSave.phone,
          whatsapp: profileDataToSave.whatsapp,
          email: profileDataToSave.email,
          city: profileDataToSave.city
        }
      );

      // 2. Sync to Firestore / Local Storage via profileService
      await updateProfile(profileDataToSave.id, {
        ...profileDataToSave,
        ownerUid: currentUser?.uid || "demo-user"
      });

      if (notify) {
        if (isSupabaseConfigured) {
          showToast(
            isAr
              ? "تم حفظ التغييرات وتحديث حالة التوجيه بنجاح في Supabase والسحابة!"
              : "Saved & Direct Tap Mode successfully updated in Supabase & Cloud!"
          );
        } else {
          showToast(
            isAr
              ? "تم حفظ نمط التوجيه المباشر بنجاح ومزامنته سحابياً!"
              : "Direct Tap Redirect Mode saved and synced successfully!"
          );
        }
      }
    } catch (error) {
      console.error("Save failed:", error);
      if (notify) {
        showToast(isAr ? "حدث خطأ أثناء الحفظ." : "Error saving changes.", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  // Copy Public Link (with optional ?preview=true)
  const handleCopyPublicUrl = (withPreview = false) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://sham360.online";
    const url = withPreview
      ? `${origin}/p/${profile.slug}?preview=true`
      : `${origin}/p/${profile.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showToast(isAr ? "تم نسخ الرابط إلى الحافظة" : "Link copied to clipboard");
  };

  // Add Custom Link
  const handleAddLink = () => {
    if (!newLinkLabel.trim() || !newLinkUrl.trim()) return;
    const linkItem = {
      id: `link-${Date.now()}`,
      label: newLinkLabel.trim(),
      url: newLinkUrl.trim().startsWith("http") ? newLinkUrl.trim() : `https://${newLinkUrl.trim()}`,
      iconName: "Globe"
    };

    const updated = {
      ...profile,
      links: [...(profile.links || []), linkItem]
    };
    setProfile(updated);
    setNewLinkLabel("");
    setNewLinkUrl("");
    saveProfileChanges(updated, true);
  };

  // Delete Custom Link
  const handleDeleteLink = (id: string) => {
    const updated = {
      ...profile,
      links: (profile.links || []).filter((l) => l.id !== id)
    };
    setProfile(updated);
    saveProfileChanges(updated, true);
  };

  // Quick logout
  const handleLogout = async () => {
    await logout();
    navigate("/profile");
  };

  // Convert to Sham360ProfileData for live preview
  const previewProfileData: Sham360ProfileData = {
    id: profile.id,
    slug: profile.slug,
    type: profile.profileType,
    name: profile.name,
    nameEn: profile.nameEn,
    titleOrCategory: profile.title,
    bio: profile.bio,
    avatarUrl: profile.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    coverUrl: profile.coverImage,
    city: profile.city,
    category: profile.category,
    isVerified: profile.isVerified,
    direct_redirect_enabled: profile.direct_redirect_enabled,
    direct_redirect_url: profile.direct_redirect_url,
    contactInfo: {
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      email: profile.email,
      website: profile.website,
      googleMapsUrl: profile.googleMapsUrl
    },
    links: (profile.links || []).map((l) => ({
      id: l.id,
      label: l.label,
      url: l.url,
      iconName: l.iconName
    }))
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white ${
              toastMessage.type === "error"
                ? "bg-rose-600"
                : toastMessage.type === "info"
                ? "bg-blue-600"
                : "bg-emerald-600"
            }`}
          >
            {toastMessage.type === "error" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Top Header / Brand Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo iconSize={36} light={false} isAr={isAr} />
            <div className="hidden sm:block border-s border-slate-200 ps-3">
              <h1 className="text-xs font-black text-slate-900">
                {isAr ? "لوحة تحكم المنظومة الذكية" : "SHAM360 Control Center"}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                {isAr ? "إدارة بطاقات NFC وأنماط التوجيه المباشر" : "NFC & Direct Tap Mode Management"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Tap Active Pill Indicator */}
            {profile.direct_redirect_enabled && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-800 text-[11px] font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
                <span>{isAr ? "التوجيه المباشر مفعّل" : "Direct Tap Active"}</span>
              </div>
            )}

            {/* Public Link Copy Button */}
            <button
              type="button"
              onClick={() => handleCopyPublicUrl(false)}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
              )}
              <span className="hidden sm:inline">{isAr ? "مشاركة الرابط" : "Share"}</span>
            </button>

            {/* View Live Profile Button */}
            <a
              href={`/profile/${profile.slug}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0066FF] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isAr ? "معاينة الملف" : "Preview"}</span>
            </a>

            {/* Manual Save Button */}
            <button
              type="button"
              onClick={() => saveProfileChanges(profile, true)}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 active:scale-98 disabled:opacity-50 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-xs shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ التغييرات" : "Save")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "settings"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>{isAr ? "إعدادات الهوية والتوجيه المباشر" : "Identity & Direct Tap Settings"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("links")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "links"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? `الروابط والقنوات (${profile.links?.length || 0})` : `Links (${profile.links?.length || 0})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("nfc")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "nfc"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-blue-500" />
            <span>{isAr ? "بطاقات NFC المربوطة" : "Linked NFC Devices"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "analytics"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? "إحصائيات النقرات" : "Tap Analytics"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "preview"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-600" />
            <span>{isAr ? "المعاينة التفاعلية" : "Interactive Preview"}</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: SETTINGS & DIRECT TAP REDIRECT MODE (CORE USER REQUIREMENT)
           ========================================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* -------------------------------------------------------------
                SECTION: DIRECT TAP REDIRECT MODE (THE SPECIFIED FEATURE)
               ------------------------------------------------------------- */}
            <div className="bg-white rounded-3xl border-2 border-blue-500/30 p-6 sm:p-8 shadow-md relative overflow-hidden space-y-6">
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-[#0066FF] to-emerald-400" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-black">
                      <Zap className="w-5 h-5 fill-amber-500 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900">
                        Direct Tap Mode / نمط التوجيه المباشر (Google Rating / Direct Link)
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        {isAr
                          ? "توجيه الزوار بنقرة NFC مباشرة إلى تقييم Google 5-Stars أو رابط مخصص بدلاً من صفحة الملف."
                          : "Instantly redirect NFC visitors to a 5-star Google review or custom URL upon tap."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* THE MODERN TOGGLE SWITCH */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600">
                    {profile.direct_redirect_enabled
                      ? (isAr ? "مفعّل (Active)" : "Enabled")
                      : (isAr ? "معطّل (Off)" : "Disabled")}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(profile.direct_redirect_enabled)}
                      onChange={(e) => handleToggleDirectRedirect(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0066FF] border border-slate-300 transition-colors"></div>
                  </label>
                </div>
              </div>

              {/* REVEALED INPUT FIELD WHEN TOGGLE IS ACTIVATED */}
              {profile.direct_redirect_enabled && (
                <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span>Target URL / رابط التوجيه المباشر</span>
                        <span className="text-rose-500">*</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {isAr ? "يدعم بروتوكول http / https" : "Requires valid URL"}
                      </span>
                    </label>

                    <div className="relative">
                      <input
                        type="url"
                        value={profile.direct_redirect_url || ""}
                        onChange={(e) => handleDirectRedirectUrlChange(e.target.value)}
                        onBlur={() => saveProfileChanges(profile, true)}
                        placeholder="https://g.page/r/your-google-review-link"
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-slate-300 focus:border-[#0066FF] focus:bg-white text-xs font-mono font-bold text-slate-900 outline-none transition-all dir-ltr text-left"
                      />
                      {profile.direct_redirect_url && (
                        <a
                          href={profile.direct_redirect_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute end-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-[11px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <span>{isAr ? "اختبار" : "Test"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* QUICK POPULAR PRESETS */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      {isAr ? "قوالب سريعة شائعة للتوجيه المباشر:" : "Quick Suggested Presets:"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => applyPresetUrl("https://g.page/r/your-google-review-link")}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                        <span>{isAr ? "تقييم 5-Stars على خرائط Google" : "Google 5-Star Reviews"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPresetUrl(profile.googleMapsUrl || "https://maps.google.com/?q=Damascus+Syria")}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-rose-600" />
                        <span>{isAr ? "موقع المنشأة على الخريطة" : "Google Maps Location"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPresetUrl("https://www.tripadvisor.com/UserReview")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-600" />
                        <span>TripAdvisor</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPresetUrl("https://instagram.com")}
                        className="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        <span>Instagram Channel</span>
                      </button>
                    </div>
                  </div>

                  {/* Operational Notes & Preview Link */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {isAr ? (
                          <>
                            <strong>كيف يعمل التوجيه المباشر؟</strong> عند نقر بطاقة NFC الذكية، سيتم توجيه العميل فوراً إلى الرابط المحدد أعلاه بدلاً من فتح الملف الرقمي.
                            لمعاينة ملفك الرقمي دون توجيه، يمكنك فتح الرابط مرفقاً بـ{" "}
                            <code className="px-1.5 py-0.5 bg-white rounded border border-blue-200 font-mono text-[#0066FF]">?preview=true</code>.
                          </>
                        ) : (
                          <>
                            <strong>How Direct Tap works:</strong> When a customer taps your physical NFC card, they are redirected instantly to this target link instead of your profile page.
                            To preview your full profile without redirecting, open the URL with{" "}
                            <code className="px-1.5 py-0.5 bg-white rounded border border-blue-200 font-mono text-[#0066FF]">?preview=true</code>.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`/profile/${profile.slug}?preview=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0066FF] hover:underline font-bold text-xs inline-flex items-center gap-1"
                      >
                        <span>{isAr ? "افتح رابط المعاينة الكاملة الآن" : "Open full preview with ?preview=true"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* General Profile Identity Settings Form */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
                {isAr ? "البيانات الأساسية للملف الرقمي" : "General Profile Identity"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isAr ? "الاسم الكامل / اسم المنشأة" : "Full Name / Business Name"}
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isAr ? "المسمى الوظيفي / النشاط" : "Professional Title / Industry"}
                  </label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isAr ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white dir-ltr text-left"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isAr ? "رقم الواتساب المعتمد" : "WhatsApp Number"}
                  </label>
                  <input
                    type="tel"
                    value={profile.whatsapp || ""}
                    onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white dir-ltr text-left"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700">
                    {isAr ? "النبذة التعريفية (Bio)" : "Biography / Introduction"}
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => saveProfileChanges(profile, true)}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ التعديلات في السحابة" : "Save Changes to Cloud")}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: CUSTOM LINKS
           ========================================================================= */}
        {activeTab === "links" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {isAr ? "الروابط والقنوات التفاعلية" : "Interactive Links & Channels"}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? "أضف أزرار سريعة للوثائق، المواقع، أو حسابات التواصل." : "Add buttons for documents, portfolios, or social links."}
                </p>
              </div>
            </div>

            {/* Add New Link Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-800">
                {isAr ? "إضافة رابط جديد:" : "Add New Link:"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <input
                  type="text"
                  placeholder={isAr ? "مسمى الزر (مثال: السيرة الذاتية)" : "Button Label (e.g. Portfolio)"}
                  value={newLinkLabel}
                  onChange={(e) => setNewLinkLabel(e.target.value)}
                  className="sm:col-span-4 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="sm:col-span-6 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-900 dir-ltr text-left"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="sm:col-span-2 py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? "إضافة" : "Add"}</span>
                </button>
              </div>
            </div>

            {/* Links List */}
            <div className="space-y-2.5">
              {profile.links && profile.links.length > 0 ? (
                profile.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0066FF]">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{link.label}</p>
                        <p className="text-[11px] text-slate-500 font-mono text-left dir-ltr line-clamp-1">{link.url}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  {isAr ? "لا توجد روابط مخصصة بعد." : "No custom links added yet."}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: NFC HARDWARE DEVICES
           ========================================================================= */}
        {activeTab === "nfc" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-sm font-black text-slate-900">
              {isAr ? "الأجهزة والبطاقات الذكية المربوطة" : "Linked Physical NFC Devices"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-400">SHAM360-CARD-A1</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    {isAr ? "نشطة وجاهزة للنقر" : "Active & Ready"}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-black">{profile.name}</h4>
                  <p className="text-xs text-slate-400">{profile.title}</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                  <span>NFC NTAG216 (888 Bytes)</span>
                  <span className="font-mono">Damascus, SY</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-800">
                  {isAr ? "حالة الأمان وسلوك النقر:" : "NFC Behavior & Security:"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {profile.direct_redirect_enabled
                        ? (isAr ? "سلوك النقر: توجيه فوري للرابط المباشر." : "Tap behavior: Direct link redirect.")
                        : (isAr ? "سلوك النقر: فتح بطاقة الملف الرقمي الكاملة." : "Tap behavior: Open full profile page.")}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isAr ? "التشفير: متوافق مع كافة أجهزة iPhone و Android دون أي تطبيق." : "Compatibility: All iPhones & Androids without any app."}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ANALYTICS
           ========================================================================= */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500">{isAr ? "إجمالي النقرات NFC" : "Total NFC Taps"}</span>
              <p className="text-2xl font-black text-slate-900">4,281</p>
              <span className="text-[11px] text-emerald-600 font-bold">+18% {isAr ? "هذا الشهر" : "this month"}</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500">{isAr ? "تحميلات بطاقة جهة الاتصال (vCard)" : "vCard Downloads"}</span>
              <p className="text-2xl font-black text-[#0066FF]">1,624</p>
              <span className="text-[11px] text-slate-400 font-medium">38% {isAr ? "معدل حفظ فوري" : "conversion rate"}</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500">
                {profile.direct_redirect_enabled
                  ? (isAr ? "نقرات التوجيه المباشر" : "Direct Tap Redirects")
                  : (isAr ? "محادثات واتساب المباشرة" : "WhatsApp Inquiries")}
              </span>
              <p className="text-2xl font-black text-emerald-600">892</p>
              <span className="text-[11px] text-emerald-600 font-bold">{isAr ? "نشاط ممتاز" : "Excellent velocity"}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: LIVE INTERACTIVE PREVIEW
           ========================================================================= */}
        {activeTab === "preview" && (
          <div className="max-w-md mx-auto">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-md">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span>{isAr ? "معاينة الملف كما يظهر للزوار" : "Visitor Profile View"}</span>
                {profile.direct_redirect_enabled && (
                  <span className="text-amber-600 font-bold text-[11px]">
                    {isAr ? "⚡ التوجيه المباشر نشط" : "⚡ Direct Tap Active"}
                  </span>
                )}
              </div>
              <Sham360ProfileView
                profile={previewProfileData}
                isAr={isAr}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
