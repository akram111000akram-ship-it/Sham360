import React, { useState } from "react";
import { FirestoreProfile, ProfileType, ProfileLinkItem } from "../../types";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  ShieldCheck,
  Compass,
  FileText,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import {
  detectLinkMetadata,
  LINK_PRESETS,
  LinkPresetItem
} from "../../services/linkDetector";

interface ProfileEditorProps {
  initialProfile: FirestoreProfile;
  onSave: (updated: FirestoreProfile) => Promise<void>;
  saving: boolean;
  onPreviewToggle?: () => void;
}

const SYRIAN_CITIES = [
  "دمشق",
  "ريف دمشق",
  "حلب",
  "حمص",
  "اللاذقية",
  "طرطوس",
  "حماة",
  "السويداء",
  "درعا",
  "دير الزور",
  "الحسكة",
  "الرقة",
  "إدلب",
  "القنيطرة"
];

const CATEGORY_PRESETS = [
  "مطاعم ومقاهي",
  "فنادق وسياحة",
  "خدمات طبية وعيادات",
  "هندسة وبرمجيات",
  "محاماة واستشارات قانونية",
  "عقارات ومقاولات",
  "تعليم وتدريب",
  "تجارة وتوزيع",
  "تصميم ودعاية وإعلان",
  "حرف وصناعات تقليدية",
  "أخرى"
];

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  initialProfile,
  onSave,
  saving,
  onPreviewToggle
}) => {
  const [profile, setProfile] = useState<FirestoreProfile>({
    ...initialProfile,
    links: initialProfile.links || []
  });

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleTypeChange = (type: ProfileType) => {
    setProfile((prev) => ({
      ...prev,
      profileType: type
    }));
  };

  const handleChange = (field: keyof FirestoreProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Dynamic link handlers with intelligent auto-detection
  const handleAddLink = () => {
    const newLink: ProfileLinkItem = {
      id: `link_${Date.now()}`,
      label: "",
      url: "",
      iconName: "Globe",
      isHighlight: false,
      category: "custom"
    };
    setProfile((prev) => ({
      ...prev,
      links: [...(prev.links || []), newLink]
    }));
  };

  const handleAddPresetLink = (preset: LinkPresetItem) => {
    const isDoc = preset.category === "cv" || preset.category === "portfolio" || preset.category === "document";
    const newLink: ProfileLinkItem = {
      id: `link_${Date.now()}`,
      label: preset.labelAr,
      url: preset.urlPlaceholder,
      iconName: preset.iconName,
      isHighlight: isDoc,
      category: preset.category,
      description: isDoc ? "مستند رسمي • فتح في نافذة جديدة" : ""
    };
    setProfile((prev) => ({
      ...prev,
      links: [...(prev.links || []), newLink]
    }));
  };

  const handleLinkChange = (index: number, key: keyof ProfileLinkItem, val: any) => {
    setProfile((prev) => {
      const updated = [...(prev.links || [])];
      const current = { ...updated[index], [key]: val };

      // Auto-detect metadata on URL input
      if (key === "url" && typeof val === "string" && val.length > 5) {
        const detected = detectLinkMetadata(val, current.label, current.iconName);
        current.iconName = detected.iconName;
        if (!current.label || current.label.trim() === "" || current.label === "رابط مخصص") {
          current.label = detected.defaultTitleAr;
        }
        if (detected.isDocumentOrCv) {
          current.isHighlight = true;
          current.category = "cv";
          if (!current.description) {
            current.description = "مستند رسمي • فتح في نافذة جديدة";
          }
        }
      }

      updated[index] = current;
      return { ...prev, links: updated };
    });
  };

  const handleRemoveLink = (index: number) => {
    setProfile((prev) => {
      const updated = [...(prev.links || [])];
      updated.splice(index, 1);
      return { ...prev, links: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      showToast("error", "يرجى إدخال الاسم الكامل أو اسم المنشأة.");
      return;
    }

    try {
      await onSave(profile);
      showToast("success", "تم حفظ وتحديث بيانات الملف الذكي بنجاح في قاعدة البيانات السحابية!");
    } catch (err: any) {
      console.error("Save error:", err);
      showToast("error", err.message || "حدث خطأ أثناء حفظ التعديلات.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans [direction:rtl] text-right">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-bold">{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-xs opacity-70 hover:opacity-100 px-2 py-1 cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* SECTION 1: PROFILE TYPE & IDENTITY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-[#0066FF]" />
            <span>نوع وهوية الملف الرقمي</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            اختر نوع الملف الذكي وحدد الاسم والمسمى الذي سيظهر فوراً لجهات الاتصال عند تمرير البطاقة.
          </p>
        </div>

        {/* Profile Type Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleTypeChange("individual")}
            className={`p-5 rounded-2xl border text-right transition-all flex items-start gap-4 cursor-pointer ${
              profile.profileType === "individual"
                ? "bg-blue-50/60 border-[#0066FF] text-slate-900 shadow-md shadow-blue-500/10"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                profile.profileType === "individual"
                  ? "bg-[#0066FF] text-white font-bold"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">ملف شخصي / فردي</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                مخصص للأطباء، المهندسين، المحامين، والمدراء التنفيذيين لتبادل جهات الاتصال وبطاقات vCard.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleTypeChange("business")}
            className={`p-5 rounded-2xl border text-right transition-all flex items-start gap-4 cursor-pointer ${
              profile.profileType === "business"
                ? "bg-blue-50/60 border-[#0066FF] text-slate-900 shadow-md shadow-blue-500/10"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                profile.profileType === "business"
                  ? "bg-[#0066FF] text-white font-bold"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">ملف تجاري / منشأة</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                مخصص للمطاعم، الشركات، الفنادق، والمتاجر مع إبراز الموقع، قوائم الطعام، والخدمات.
              </p>
            </div>
          </button>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              الاسم الكامل / اسم المنشأة <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="مثال: مطعم وبيت الياسمين الدمشقي"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              الاسم باللغة الإنجليزية (اختياري)
            </label>
            <input
              type="text"
              value={profile.nameEn || ""}
              onChange={(e) => handleChange("nameEn", e.target.value)}
              placeholder="e.g. Al Yasmeen Damascus"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors [direction:ltr]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              المسمى الوظيفي / النشاط الرئيسي <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="مثال: استشاري نظم ذكية / مطعم وتراث شامي"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              تصنيف النشاط
            </label>
            <select
              value={profile.category || "أخرى"}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
            >
              {CATEGORY_PRESETS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              المدينة السورية
            </label>
            <select
              value={profile.city || "دمشق"}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
            >
              {SYRIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              الرابط المخصص (Slug)
            </label>
            <div className="relative">
              <input
                type="text"
                value={profile.slug}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-xs font-mono [direction:ltr]"
              />
              <span className="absolute left-3 top-3 text-[11px] text-slate-400 font-mono">
                /p/
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              الرابط ثابت ومطبوع على بطاقتك الذكية لضمان دوام عملها.
            </p>
          </div>
        </div>

        {/* Bio Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            نبذة تعريفية مختصرة (Bio)
          </label>
          <textarea
            rows={3}
            value={profile.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="اكتب نبذة موجزة عن خبراتك أو خدمات منشأتك لتظهر في قمة البروفايل..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors leading-relaxed"
          />
        </div>
      </div>

      {/* SECTION 2: CONTACT DETAILS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#0066FF]" />
            <span>بيانات الاتصال والتواصل المباشر</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            هذه الأرقام ستُحفظ بضغطة زر واحدة في سجل جهات اتصال الهاتف المحمول للعملاء.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>رقم الهاتف المباشر (للاتصال العادي)</span>
            </label>
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+963 11 223 3445"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors [direction:ltr]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>رقم الواتساب (للمحادثة الفورية)</span>
            </label>
            <input
              type="text"
              value={profile.whatsapp || ""}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              placeholder="+963 944 112 233"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors [direction:ltr]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>البريد الإلكتروني الرسمي</span>
            </label>
            <input
              type="email"
              value={profile.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="contact@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors [direction:ltr]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>الموقع الإلكتروني الرسمي</span>
            </label>
            <input
              type="url"
              value={profile.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors [direction:ltr]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>العنوان الجغرافي التفصيلي</span>
            </label>
            <input
              type="text"
              value={profile.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="مثال: دمشق القديمة - باب توما - حارة الياسمين"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>رابط خرائط جوجل (Google Maps URL)</span>
            </label>
            <input
              type="url"
              value={profile.googleMapsUrl || ""}
              onChange={(e) => handleChange("googleMapsUrl", e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors [direction:ltr]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: CUSTOM LINKS & ACTIONS (DYNAMIC EXTERNAL LINKS & PRESETS) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#0066FF]" />
              <span>الروابط والمستندات الذكية (Google Drive, Dropbox, CV, Social)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              أضف روابط سريعة مع كشف تلقائي فوري للمنصة وأزرار مميزة للـ CV والمستندات بأسلوب Dark Glassmorphism الفاخر.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] font-bold text-xs border border-blue-200 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة رابط مخصص</span>
          </button>
        </div>

        {/* Quick Link Presets */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>نماذج سريعة جاهزة للإضافة الفورية بنقرة واحدة:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {LINK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleAddPresetLink(preset)}
                className="px-2.5 py-1 rounded-xl text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <span>+ {preset.labelAr}</span>
              </button>
            ))}
          </div>
        </div>

        {profile.links && profile.links.length > 0 ? (
          <div className="space-y-3">
            {profile.links.map((link, idx) => {
              const detected = detectLinkMetadata(link.url, link.label, link.iconName);
              return (
                <div
                  key={link.id || idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 transition-all hover:border-slate-300"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        عنوان الزر / المسمى
                      </label>
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleLinkChange(idx, "label", e.target.value)}
                        placeholder="مثال: السيرة الذاتية (Google Drive CV)"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center justify-between">
                        <span>الرابط الخارجي URL</span>
                        {link.url && (
                          <span
                            className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded"
                            style={{
                              backgroundColor: detected.subtleBg,
                              color: detected.accentColor === "#0F172A" ? "#475569" : detected.accentColor
                            }}
                          >
                            {detected.badgeLabelAr}
                          </span>
                        )}
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleLinkChange(idx, "url", e.target.value)}
                        placeholder="https://drive.google.com/... أو https://dropbox.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-mono [direction:ltr] focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-4 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="حذف الرابط"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Secondary row: Description and Glassmorphic Highlight Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-slate-200/60">
                    <div className="sm:col-span-7">
                      <input
                        type="text"
                        value={link.description || ""}
                        onChange={(e) => handleLinkChange(idx, "description", e.target.value)}
                        placeholder="وصف إضافي اختياري (مثال: فتح الوثيقة في نافذة جديدة بدقة عالية)"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs focus:outline-none focus:border-[#0066FF]"
                      />
                    </div>
                    <div className="sm:col-span-5 flex items-center justify-end">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={Boolean(link.isHighlight || detected.isDocumentOrCv)}
                          onChange={(e) => handleLinkChange(idx, "isHighlight", e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-[#0066FF] focus:ring-0 cursor-pointer"
                        />
                        <span className="font-bold text-[11px] text-slate-800">
                          تمييز كبطاقة زجاجية فاخرة (Dark Glass)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
            لم يتم إضافة روابط مخصصة بعد. انقر على أحد النماذج السريعة أعلاه أو على "إضافة رابط مخصص".
          </div>
        )}
      </div>

      {/* DIRECT TAP REDIRECT MODE (نمط التوجيه المباشر) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-blue-500/30 shadow-lg shadow-blue-500/5 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 font-black">
              <Zap className="w-6 h-6 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 mb-1">
                Direct Tap Mode / نمط التوجيه المباشر (Google Rating / Direct Link)
              </h4>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                عند تفعيل هذا الخيار، سيتم توجيه أي شخص ينقر بطاقة NFC الذكية فوراً إلى الرابط المباشر (مثل تقييم Google) بدلاً من فتح صفحة الملف الكاملة. للمعاينة بدون توجيه، استخدم <span className="font-mono text-[#0066FF] font-bold">?preview=true</span>.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={Boolean(profile.direct_redirect_enabled ?? profile.directRedirectEnabled)}
              onChange={(e) => {
                const checked = e.target.checked;
                handleChange("direct_redirect_enabled", checked);
                handleChange("directRedirectEnabled", checked);
                if (checked && !profile.direct_redirect_url) {
                  const defaultUrl = profile.googleMapsUrl || "https://g.page/r/your-google-review-link";
                  handleChange("direct_redirect_url", defaultUrl);
                  handleChange("directRedirectUrl", defaultUrl);
                }
              }}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0066FF] border border-slate-300"></div>
          </label>
        </div>

        {(profile.direct_redirect_enabled ?? profile.directRedirectEnabled) && (
          <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
            <label className="block text-xs font-black text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Target URL / رابط التوجيه المباشر</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">مثال: تقييم Google أو TripAdvisor</span>
            </label>
            <input
              type="url"
              value={profile.direct_redirect_url || profile.directRedirectUrl || ""}
              onChange={(e) => {
                handleChange("direct_redirect_url", e.target.value);
                handleChange("directRedirectUrl", e.target.value);
              }}
              placeholder="https://g.page/r/your-google-review-link"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] focus:bg-white text-xs font-mono font-bold text-slate-900 outline-none dir-ltr text-left"
            />
          </div>
        )}
      </div>

      {/* SECTION 4: DIRECTORY VISIBILITY TOGGLE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              الإدراج في دليل الأعمال السوري (SHAM360 Directory)
            </h4>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              عند تفعيل هذا الخيار، سيظهر ملفك في صفحة الدليل العام <span className="text-[#0066FF] font-mono">/directory</span> ليتيح لآلاف الزوار السوريين والمغتربين العثور على نشاطك وخدماتك وتفاصيل التواصل المباشرة.
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={Boolean(profile.directoryEnabled)}
            onChange={(e) => handleChange("directoryEnabled", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0066FF] border border-slate-300"></div>
        </label>
      </div>

      {/* SUBMIT BUTTON BAR */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white/95 border border-slate-200/80 sticky bottom-4 z-20 shadow-xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>يتم تشفير وتحديث التغييرات السحابية فور الحفظ.</span>
        </div>

        <div className="flex items-center gap-3">
          {onPreviewToggle && (
            <button
              type="button"
              onClick={onPreviewToggle}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#0066FF]" />
              <span>معاينة حية للبطاقة</span>
            </button>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-black flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "جاري الحفظ السحابي..." : "حفظ التغييرات في السحابة"}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
