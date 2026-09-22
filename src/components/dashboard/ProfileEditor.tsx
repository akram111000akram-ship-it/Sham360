import React, { useState } from "react";
import { FirestoreProfile, ProfileType, ProfileLinkItem } from "../../types";
import { useRouter } from "../../services/router";
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
  Star,
  Upload,
  Image as ImageIcon,
  Camera,
  Music,
  Headphones,
  Copy,
  Check,
  Wallet,
  QrCode,
  Radio,
  ArrowRight,
  ArrowLeft,
  X,
  CreditCard,
  DollarSign
} from "lucide-react";
import {
  detectLinkMetadata,
  LINK_PRESETS,
  LinkPresetItem
} from "../../services/linkDetector";
import {
  uploadProfileAvatar,
  uploadProfileCover,
  uploadPaymentQrImage
} from "../../services/storageService";
import { parseEmbeddedAudioUrl } from "../../services/embeddedAudioParser";
import { PaymentMethodItem, SyrianPaymentProvider, AudioPresetType } from "../../types/profile";

interface ProfileEditorProps {
  initialProfile: FirestoreProfile;
  onSave: (updated: FirestoreProfile) => Promise<void>;
  saving: boolean;
  onPreviewToggle?: () => void;
  onBack?: () => void;
  onExit?: () => void;
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
  onPreviewToggle,
  onBack,
  onExit
}) => {
  const { navigate } = useRouter();
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

  // Dynamic Universal & Syrian Payment Methods State
  const [customPaymentMethods, setCustomPaymentMethods] = useState<PaymentMethodItem[]>(() => {
    return (initialProfile.paymentMethods || []).filter(
      (m) => m.provider !== "sham_cash" && m.provider !== "syriatel_cash"
    );
  });
  const [uploadingQrMap, setUploadingQrMap] = useState<Record<string, boolean>>({});

  const handleAddPaymentMethod = (presetProvider: SyrianPaymentProvider = "custom") => {
    const newId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    let defaultTitle = "وسيلة دفع رقمية";
    let defaultCurrency = "USD";
    let defaultTitleEn = "Payment Method";

    if (presetProvider === "revolut") {
      defaultTitle = "ريفولوت (Revolut)";
      defaultTitleEn = "Revolut";
      defaultCurrency = "EUR";
    } else if (presetProvider === "wise") {
      defaultTitle = "وايز (Wise)";
      defaultTitleEn = "Wise";
      defaultCurrency = "USD";
    } else if (presetProvider === "iban") {
      defaultTitle = "آيبان دولي (IBAN)";
      defaultTitleEn = "IBAN Wire";
      defaultCurrency = "USD";
    } else if (presetProvider === "crypto") {
      defaultTitle = "عملات رقمية (USDT TRC20)";
      defaultTitleEn = "Crypto USDT";
      defaultCurrency = "USDT";
    } else if (presetProvider === "paypal") {
      defaultTitle = "بايبال (PayPal)";
      defaultTitleEn = "PayPal";
      defaultCurrency = "USD";
    } else if (presetProvider === "mtn_cash") {
      defaultTitle = "كاش موبايل (MTN Cash)";
      defaultTitleEn = "MTN Cash";
      defaultCurrency = "SYP";
    }

    const newItem: PaymentMethodItem = {
      id: newId,
      provider: presetProvider,
      title: defaultTitle,
      titleEn: defaultTitleEn,
      accountNumber: "",
      accountName: profile.businessName || profile.name || "",
      instructions: "",
      currency: defaultCurrency,
      isActive: true
    };

    setCustomPaymentMethods((prev) => [...prev, newItem]);
  };

  const handleUpdatePaymentMethod = (id: string, updates: Partial<PaymentMethodItem>) => {
    setCustomPaymentMethods((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemovePaymentMethod = (id: string) => {
    setCustomPaymentMethods((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCustomQrUpload = async (file: File, itemId: string, provider: string) => {
    try {
      setUploadingQrMap((prev) => ({ ...prev, [itemId]: true }));
      const url = await uploadPaymentQrImage(file, profile.id || profile.slug || "user", provider);
      handleUpdatePaymentMethod(itemId, { qrCodeUrl: url });
      showToast("success", "تم رفع وتحديث رمز QR للوسيلة بنجاح.");
    } catch (err: any) {
      showToast("error", err.message || "فشل رفع رمز QR.");
    } finally {
      setUploadingQrMap((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const handleAvatarFile = async (file: File) => {
    try {
      setUploadingAvatar(true);
      const url = await uploadProfileAvatar(file, profile.id || profile.slug || "user");
      handleChange("profileImage", url);
      showToast("success", "تم رفع وتحديث الصورة الشخصية بنجاح عبر Firebase Storage.");
    } catch (err: any) {
      showToast("error", err.message || "فشل رفع الصورة الشخصية.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCoverFile = async (file: File) => {
    try {
      setUploadingCover(true);
      const url = await uploadProfileCover(file, profile.id || profile.slug || "user");
      handleChange("coverImage", url);
      showToast("success", "تم رفع وتحديث صورة الغلاف بنجاح عبر Firebase Storage.");
    } catch (err: any) {
      showToast("error", err.message || "فشل رفع صورة الغلاف.");
    } finally {
      setUploadingCover(false);
    }
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

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [uploadingShamQr, setUploadingShamQr] = useState(false);
  const [uploadingSyriatelQr, setUploadingSyriatelQr] = useState(false);

  const handleCopyTest = (text: string, fieldId: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleShamQrFile = async (file: File) => {
    try {
      setUploadingShamQr(true);
      const url = await uploadPaymentQrImage(file, profile.id || profile.slug || "user", "sham_cash");
      handleChange("shamCashQrUrl", url);
      showToast("success", "تم رفع وتحديث رمز QR لشام كاش بنجاح.");
    } catch (err: any) {
      showToast("error", err.message || "فشل رفع رمز QR لشام كاش.");
    } finally {
      setUploadingShamQr(false);
    }
  };

  const handleSyriatelQrFile = async (file: File) => {
    try {
      setUploadingSyriatelQr(true);
      const url = await uploadPaymentQrImage(file, profile.id || profile.slug || "user", "syriatel_cash");
      handleChange("syriatelCashQrUrl", url);
      showToast("success", "تم رفع وتحديث رمز QR لسيريتل كاش بنجاح.");
    } catch (err: any) {
      showToast("error", err.message || "فشل رفع رمز QR لسيريتل كاش.");
    } finally {
      setUploadingSyriatelQr(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      showToast("error", "يرجى إدخال الاسم الكامل أو اسم المنشأة.");
      return;
    }

    try {
      // Synchronize Syrian & Universal payment methods array
      const updatedPaymentMethods: PaymentMethodItem[] = [
        ...(profile.shamCashNumber
          ? [
              {
                id: "pay_sham_cash",
                provider: "sham_cash" as const,
                title: "شام كاش (Sham Cash)",
                titleEn: "Sham Cash",
                accountNumber: profile.shamCashNumber,
                accountName: profile.businessName || profile.name || "",
                qrCodeUrl: profile.shamCashQrUrl || "",
                currency: "SYP",
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
                accountName: profile.businessName || profile.name || "",
                qrCodeUrl: profile.syriatelCashQrUrl || "",
                currency: "SYP",
                isActive: true
              }
            ]
          : []),
        ...customPaymentMethods
      ];

      const toSave: FirestoreProfile = {
        ...profile,
        paymentMethods: updatedPaymentMethods,
        paymentMethodsEnabled:
          profile.paymentMethodsEnabled ??
          Boolean(profile.shamCashNumber || profile.syriatelCashNumber || updatedPaymentMethods.length > 0)
      };

      await onSave(toSave);
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

      {/* TOP HEADER & ROUTING NAVIGATION BAR */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (onBack) onBack();
              else navigate("/dashboard");
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="العودة للوحة التحكم"
          >
            <ArrowRight className="w-4 h-4 text-slate-600" />
            <span>العودة للوحة التحكم</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="hidden sm:block">
            <h3 className="text-xs font-black text-slate-900 leading-tight">
              محرر الملف الرقمي الذكي
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              /profile/{profile.slug || "user"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/profile/${profile.slug || "akram"}?preview=true`)}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0066FF] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة الملف الحي</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onExit) onExit();
              else if (onBack) onBack();
              else navigate("/dashboard");
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
            title="إلغاء وخروج"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

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

      {/* SECTION: MEDIA & IMAGE UPLOADS (FIREBASE STORAGE) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#0066FF]" />
            <span>الصور والوسائط الرقمية (Firebase Storage)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ارفع صورتك الشخصية وصورة غلاف البروفايل بدقة عالية. يتم ضغط الصور تلقائياً لتناسب شبكات الجوال في سوريا وتخزينها سحابياً.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avatar Upload */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>الصورة الشخصية / الشعار (Avatar)</span>
              {uploadingAvatar && (
                <span className="text-[11px] text-[#0066FF] animate-pulse font-medium">جاري الرفع السحابي...</span>
              )}
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shrink-0 shadow-sm relative group">
                <img
                  src={profile.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs transition-all">
                  <Upload className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{uploadingAvatar ? "جاري المعالجة..." : "اختيار صورة من جهازك"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingAvatar}
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAvatarFile(file);
                    }}
                  />
                </label>
                <p className="text-[10px] text-slate-500">
                  يدعم JPG, PNG, WebP (يُفضل صورة مربعة 500×500)
                </p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">أو رابط مباشر للصورة:</label>
              <input
                type="url"
                value={profile.profileImage || ""}
                onChange={(e) => handleChange("profileImage", e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs [direction:ltr]"
              />
            </div>
          </div>

          {/* Cover Photo Upload */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>صورة غلاف البطاقة (Cover Banner)</span>
              {uploadingCover && (
                <span className="text-[11px] text-[#0066FF] animate-pulse font-medium">جاري الرفع السحابي...</span>
              )}
            </label>

            <div className="w-full h-24 rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-sm relative">
              <img
                src={profile.coverImage || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs transition-all">
                <Upload className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{uploadingCover ? "جاري المعالجة..." : "اختيار صورة غلاف جديدة"}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingCover}
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCoverFile(file);
                  }}
                />
              </label>
              <p className="text-[10px] text-slate-500">
                يدعم JPG, PNG, WebP (يُفضل دقة أفقية 1400×700)
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">أو رابط مباشر لغلاف البطاقة:</label>
              <input
                type="url"
                value={profile.coverImage || ""}
                onChange={(e) => handleChange("coverImage", e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs [direction:ltr]"
              />
            </div>
          </div>
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

      {/* SECTION: BACKGROUND MUSIC & AUDIO EMBED (YOUTUBE / SOUNDCLOUD) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 font-black">
              <Headphones className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-black text-slate-900">
                  خلفية البروفايل الموسيقية (YouTube / SoundCloud / Ambient)
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                  Zero Storage Cost
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                أضف مقطعاً صوتياً مهدئاً يعمل عند تفاعل الزائر مع البروفايل عبر رابط YouTube أو SoundCloud بدون استهلاك أي مساحة تخزين.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={Boolean(profile.backgroundMusicEnabled)}
              onChange={(e) => handleChange("backgroundMusicEnabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 border border-slate-300"></div>
          </label>
        </div>

        {profile.backgroundMusicEnabled && (
          <div className="pt-5 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
            {/* YouTube / SoundCloud URL Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-800 flex items-center gap-2">
                  <Music className="w-4 h-4 text-indigo-600" />
                  <span>رابط التضمين (YouTube / SoundCloud / Spotify / MP3 URL)</span>
                </label>
                {profile.backgroundMusicUrl && (
                  (() => {
                    const info = parseEmbeddedAudioUrl(profile.backgroundMusicUrl);
                    return (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-indigo-600 animate-pulse" />
                        <span>{info.providerLabelAr}</span>
                      </span>
                    );
                  })()
                )}
              </div>
              <div className="relative">
                <input
                  type="url"
                  value={profile.backgroundMusicUrl || ""}
                  onChange={(e) => handleChange("backgroundMusicUrl", e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... أو https://soundcloud.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white text-xs font-mono font-bold text-slate-900 outline-none dir-ltr text-left"
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                يدعم روابط المقاطع من YouTube وSoundCloud وSpotify أو ملفات الصوت المباشرة (.mp3).
              </p>
            </div>

            {/* Presets & Ambient Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800">
                أو اختر نمطاً صوتياً دمشقياً جاهزاً (Audio Ambience Preset):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "damascene_oud", nameAr: "تقاسيم عود شامي", desc: "أصالة دمشقية" },
                  { id: "courtyard_fountain", nameAr: "خرير بحرة دمشقية", desc: "أجواء الباحات العتيقة" },
                  { id: "chill_ambient", nameAr: "مطر شامي هادئ", desc: "استرخاء وهدوء" },
                  { id: "soundhelix_ambient", nameAr: "موسيقى حديثة هادئة", desc: "Modern Ambient" }
                ].map((p) => {
                  const isSelected = profile.backgroundMusicPreset === p.id && !profile.backgroundMusicUrl;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        handleChange("backgroundMusicPreset", p.id);
                        handleChange("backgroundMusicUrl", "");
                        handleChange("backgroundMusicTitle", p.nameAr);
                      }}
                      className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20"
                          : "border-slate-200 bg-slate-50 hover:bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-black mb-0.5">{p.nameAr}</div>
                      <div className="text-[10px] text-slate-400">{p.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Track Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                عنوان النغمة الظاهر في البروفايل (اختياري)
              </label>
              <input
                type="text"
                value={profile.backgroundMusicTitle || ""}
                onChange={(e) => handleChange("backgroundMusicTitle", e.target.value)}
                placeholder="مثال: نغمة استرخاء دمشقية • عود هادئ"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white text-xs font-medium text-slate-900 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION: SYRIAN PAYMENT METHODS & DIGITAL WALLETS (SHAM CASH & SYRIATEL CASH) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 font-black">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-black text-slate-900">
                  وسائل الدفع والمحافظ الإلكترونية السورية (شام كاش وسيريتل كاش)
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Syrian Digital Payments
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                أتح لعملائك الدفع والتحويل المالي المباشر عبر المحافظ الرقمية السورية بنقرة زر واحدة مع إمكانية مسح وتحميل رمز QR للتاجر ورقم الحساب.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={
                profile.paymentMethodsEnabled ??
                Boolean(profile.shamCashNumber || profile.syriatelCashNumber || (profile.paymentMethods && profile.paymentMethods.length > 0))
              }
              onChange={(e) => handleChange("paymentMethodsEnabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600 border border-slate-300"></div>
          </label>
        </div>

        {(profile.paymentMethodsEnabled ?? Boolean(profile.shamCashNumber || profile.syriatelCashNumber)) && (
          <div className="pt-5 border-t border-slate-100 space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. SHAM CASH (شام كاش) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                      شام
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">شام كاش (Sham Cash)</h5>
                      <span className="text-[10px] text-slate-500 font-mono">حساب التاجر / Wallet ID</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    مباشر
                  </span>
                </div>

                {/* Account Number Field with One-Click Copy */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>رقم حساب شام كاش:</span>
                    {copiedField === "sham_cash" && (
                      <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> تم النسخ بنجاح!
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={profile.shamCashNumber || ""}
                      onChange={(e) => handleChange("shamCashNumber", e.target.value)}
                      placeholder="مثال: SHAM-789012 أو 011-8899"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-600 text-xs font-mono font-bold text-slate-900 outline-none dir-ltr text-left"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyTest(profile.shamCashNumber || "", "sham_cash")}
                      disabled={!profile.shamCashNumber}
                      title="نسخ رقم الحساب"
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      {copiedField === "sham_cash" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>نسخ</span>
                    </button>
                  </div>
                </div>

                {/* QR Code Upload for Sham Cash */}
                <div className="space-y-2 pt-2 border-t border-emerald-100">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                      <span>صورة رمز QR لشام كاش (Scan QR Code):</span>
                    </span>
                    {uploadingShamQr && (
                      <span className="text-emerald-700 text-[10px] font-bold animate-pulse">جاري الرفع...</span>
                    )}
                  </label>

                  {profile.shamCashQrUrl ? (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-emerald-200">
                      <img
                        src={profile.shamCashQrUrl}
                        alt="Sham Cash QR"
                        className="w-14 h-14 rounded-lg object-contain border border-slate-200 bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 truncate">رمز QR معتمد لشام كاش</p>
                        <p className="text-[10px] text-slate-400">جاهز للمسح من كاميرا تطبيق شام كاش</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange("shamCashQrUrl", "")}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        title="حذف الرمز"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-emerald-200 bg-white/60 hover:bg-emerald-50/50 hover:border-emerald-400 cursor-pointer transition-all text-center group">
                      <Upload className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-emerald-900">انقر لرفع صورة QR الخاصة بحسابك</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">JPG أو PNG حتى 5 ميجابايت</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleShamQrFile(file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* 2. SYRIATEL CASH (سيريتل كاش) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50/50 to-white border border-red-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                      سيريتل
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">سيريتل كاش (Syriatel Cash)</h5>
                      <span className="text-[10px] text-slate-500 font-mono">كود *303# ورقم المحفظة</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                    مباشر
                  </span>
                </div>

                {/* Mobile / Account Number Field with One-Click Copy */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>رقم محفظة سيريتل كاش (موبايل):</span>
                    {copiedField === "syriatel_cash" && (
                      <span className="text-red-600 text-[10px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> تم النسخ بنجاح!
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={profile.syriatelCashNumber || ""}
                      onChange={(e) => handleChange("syriatelCashNumber", e.target.value)}
                      placeholder="مثال: 0933123456"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-red-600 text-xs font-mono font-bold text-slate-900 outline-none dir-ltr text-left"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyTest(profile.syriatelCashNumber || "", "syriatel_cash")}
                      disabled={!profile.syriatelCashNumber}
                      title="نسخ رقم المحفظة"
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-800 border border-slate-200 hover:border-red-300 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      {copiedField === "syriatel_cash" ? (
                        <Check className="w-4 h-4 text-red-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>نسخ</span>
                    </button>
                  </div>
                </div>

                {/* QR Code Upload for Syriatel Cash */}
                <div className="space-y-2 pt-2 border-t border-red-100">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-red-700" />
                      <span>صورة رمز QR لسيريتل كاش (Scan QR Code):</span>
                    </span>
                    {uploadingSyriatelQr && (
                      <span className="text-red-700 text-[10px] font-bold animate-pulse">جاري الرفع...</span>
                    )}
                  </label>

                  {profile.syriatelCashQrUrl ? (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-red-200">
                      <img
                        src={profile.syriatelCashQrUrl}
                        alt="Syriatel Cash QR"
                        className="w-14 h-14 rounded-lg object-contain border border-slate-200 bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 truncate">رمز QR معتمد لسيريتل كاش</p>
                        <p className="text-[10px] text-slate-400">جاهز للمسح عبر تطبيق أقرب إليك / سيريتل</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange("syriatelCashQrUrl", "")}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        title="حذف الرمز"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-red-200 bg-white/60 hover:bg-red-50/50 hover:border-red-400 cursor-pointer transition-all text-center group">
                      <Upload className="w-5 h-5 text-red-600 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-red-900">انقر لرفع صورة QR الخاصة بحسابك</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">JPG أو PNG حتى 5 ميجابايت</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleSyriatelQrFile(file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* 3. UNIVERSAL & INTERNATIONAL PAYMENT METHODS (DYNAMIC LIST) */}
            <div className="pt-6 border-t border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#0066FF]" />
                    <span>وسائل الدفع العالمية والمخصصة (Revolut, Wise, IBAN, Crypto, PayPal)</span>
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    أضف خيارات دفع إضافية بحساباتك الدولية أو العملات الرقمية مع صور QR وأرقام IBAN لزبائنك حول العالم.
                  </p>
                </div>

                {/* Quick Add Preset Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleAddPaymentMethod("revolut")}
                    className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Revolut</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPaymentMethod("wise")}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Wise</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPaymentMethod("iban")}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>IBAN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPaymentMethod("crypto")}
                    className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>USDT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPaymentMethod("paypal")}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPaymentMethod("custom")}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>وسيلة مخصصة</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Method Cards List */}
              {customPaymentMethods.length === 0 ? (
                <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-600">لم تقم بإضافة وسائل دفع عالمية بعد</p>
                  <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                    اضغط على أحد الأزرار بالأعلى (Revolut, Wise, IBAN, USDT, PayPal) لتسهيل استلام التحويلات من زبائنك بالخارج.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customPaymentMethods.map((item, idx) => {
                    const isUploadingQr = Boolean(uploadingQrMap[item.id]);
                    const isCopied = copiedField === item.id;

                    return (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 relative"
                      >
                        {/* Top Bar of Card */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center text-[10px] font-black">
                              {idx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[10px] font-bold uppercase font-mono">
                              {item.provider}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.isActive ?? true}
                                onChange={(e) =>
                                  handleUpdatePaymentMethod(item.id, { isActive: e.target.checked })
                                }
                                className="w-3.5 h-3.5 rounded text-[#0066FF] accent-[#0066FF]"
                              />
                              <span>مفعل</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => handleRemovePaymentMethod(item.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                              title="حذف وسيلة الدفع"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Grid Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {/* Title Arabic */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              اسم الوسيلة (بالعربية):
                            </label>
                            <input
                              type="text"
                              value={item.title || ""}
                              onChange={(e) =>
                                handleUpdatePaymentMethod(item.id, { title: e.target.value })
                              }
                              placeholder="مثال: حساب وايز بالدولار"
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] text-xs text-slate-900 outline-none"
                            />
                          </div>

                          {/* Title English */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              اسم الوسيلة (بالإنجليزية):
                            </label>
                            <input
                              type="text"
                              value={item.titleEn || ""}
                              onChange={(e) =>
                                handleUpdatePaymentMethod(item.id, { titleEn: e.target.value })
                              }
                              placeholder="e.g. Wise USD Account"
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] text-xs text-slate-900 outline-none dir-ltr text-left"
                            />
                          </div>

                          {/* Currency */}
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              العملة:
                            </label>
                            <select
                              value={item.currency || "USD"}
                              onChange={(e) =>
                                handleUpdatePaymentMethod(item.id, { currency: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] text-xs text-slate-900 outline-none cursor-pointer"
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="USDT">USDT (Tether)</option>
                              <option value="SYP">ليرة سورية (SYP)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="AED">AED (درهم إماراتي)</option>
                              <option value="SAR">SAR (ريال سعودي)</option>
                              <option value="TRY">TRY (ليرة تركية)</option>
                            </select>
                          </div>
                        </div>

                        {/* Account Number / IBAN / Wallet with Test Copy Button */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                            <span>رقم الحساب / الآيبان / عنوان المحفظة:</span>
                            {isCopied && (
                              <span className="text-emerald-600 text-[10px] flex items-center gap-1">
                                <Check className="w-3 h-3" /> تم النسخ بنجاح!
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.accountNumber || ""}
                              onChange={(e) =>
                                handleUpdatePaymentMethod(item.id, { accountNumber: e.target.value })
                              }
                              placeholder="مثال: IBAN, @revtag, TRC20 Wallet Address, or Email"
                              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] text-xs font-mono font-bold text-slate-900 outline-none dir-ltr text-left"
                            />
                            <button
                              type="button"
                              onClick={() => handleCopyTest(item.accountNumber || "", item.id)}
                              disabled={!item.accountNumber}
                              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0066FF] border border-slate-200 hover:border-blue-300 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                              title="اختبار زر النسخ"
                            >
                              {isCopied ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                              <span>نسخ</span>
                            </button>
                          </div>
                        </div>

                        {/* Beneficiary Name & Notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              اسم المستفيد / صاحب الحساب:
                            </label>
                            <input
                              type="text"
                              value={item.accountName || ""}
                              onChange={(e) =>
                                handleUpdatePaymentMethod(item.id, { accountName: e.target.value })
                              }
                              placeholder="الاسم الكامل كما هو مسجل في البنك / المحفظة"
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] text-xs text-slate-900 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">
                              ملاحظات أو إرشادات التحويل (اختياري):
                            </label>
                            <input
                              type="text"
                              value={item.instructions || ""}
                              onChange={(e) =>
                                handleUpdatePaymentMethod(item.id, { instructions: e.target.value })
                              }
                              placeholder="مثال: يرجى التحويل على شبكة Tron TRC-20 فقط"
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0066FF] text-xs text-slate-900 outline-none"
                            />
                          </div>
                        </div>

                        {/* QR Code Upload for this Method */}
                        <div className="pt-2 border-t border-slate-100">
                          <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between mb-1.5">
                            <span className="flex items-center gap-1.5">
                              <QrCode className="w-3.5 h-3.5 text-[#0066FF]" />
                              <span>صورة رمز QR لهذه الوسيلة (اختياري):</span>
                            </span>
                            {isUploadingQr && (
                              <span className="text-[#0066FF] text-[10px] font-bold animate-pulse">
                                جاري الرفع...
                              </span>
                            )}
                          </label>

                          {item.qrCodeUrl ? (
                            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                              <img
                                src={item.qrCodeUrl}
                                alt={`${item.title} QR`}
                                className="w-12 h-12 rounded-lg object-contain border border-slate-200 bg-white"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-slate-800 truncate">
                                  رمز QR مرفوع وجاهز
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  سيظهر في النافذة التفاعلية للزبائن عند النقر
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleUpdatePaymentMethod(item.id, { qrCodeUrl: "" })}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                                title="حذف رمز QR"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all text-center">
                              <Upload className="w-4 h-4 text-[#0066FF]" />
                              <span className="text-xs font-bold text-slate-700">
                                رفع صورة رمز QR (JPG أو PNG)
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleCustomQrUpload(file, item.id, item.provider);
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              if (onBack) onBack();
              else navigate("/dashboard");
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 text-slate-600" />
            <span>العودة للوحة التحكم</span>
          </button>

          {onPreviewToggle && (
            <button
              type="button"
              onClick={onPreviewToggle}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-all cursor-pointer"
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
