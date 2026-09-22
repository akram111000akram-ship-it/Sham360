import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ar" | "en";

export interface LanguageContextType {
  language: Language;
  isAr: boolean;
  dir: "rtl" | "ltr";
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultVal?: string) => string;
}

export const TRANSLATIONS = {
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      products: "منتجات NFC",
      profile: "البروفايل الذكي",
      directory: "دليل الأعمال",
      dashboard: "لوحة التحكم",
      orderCard: "اطلب بطاقتك الآن",
      ecosystem: "أقسام المنظومة الذكية",
      switchLang: "Switch to English",
      langLabel: "EN"
    },
    // Common actions & statuses
    common: {
      search: "بحث...",
      filter: "تصفية",
      all: "الكل",
      saveContact: "حفظ جهة الاتصال (.vcf)",
      saveContactShort: "حفظ جهة",
      share: "مشاركة",
      copyLink: "نسخ الرابط",
      copied: "تم النسخ!",
      viewProfile: "عرض البروفايل",
      directions: "الاتجاهات",
      googleMaps: "Google Maps 📍",
      googleMapsNav: "ملاحة Google 📍",
      whatsapp: "واتساب",
      call: "اتصال",
      email: "بريد",
      website: "الموقع",
      qrCode: "رمز QR",
      qrPoster: "ملصق QR",
      openNow: "مفتوح الآن 🟢",
      closedNow: "مغلق حالياً 🔴",
      verifiedNfc: "عضو موثق NFC ⚡",
      verifiedHeritage: "معلم ثقافي موثق 🏛️",
      interactions: "تفاعل",
      loading: "جاري التحميل...",
      backHome: "العودة للرئيسية",
      close: "إغلاق",
      print: "طباعة",
      cancel: "إلغاء",
      submit: "إرسال",
      confirm: "تأكيد"
    },
    // Directory Page
    directory: {
      headerTitle: "دليل شام 360 الذكي للأعمال والمعالم السورية",
      headerBadge: "NFC • VR 360° • LIVE GPS",
      addListing: "إدراج منشأة جديدة",
      searchPlaceholder: "ابحث عن معلم تاريخي، متحف، طبيب، شركة، أو مدينة (مثال: دمشق، حلب، تدمر...)",
      tabAll: "⚡ الكل",
      tabMuseums: "🏛️ متاحف ومعالم أثرية",
      tabRestaurants: "🍔 مطاعم وكافيهات",
      tabFreelancers: "🛠️ مستقلون وخبراء",
      tabClinics: "🩺 عيادات ومراكز طبية",
      tabBusinesses: "🏢 شركات ومتاجر",
      viewGrid: "شبكة البطاقات",
      viewMap: "خريطة سوريا التفاعلية",
      showingCount: "عرض {count} منشأة ومعلم سوري موثق",
      clearFilter: "إلغاء تصفية المحافظة",
      noResults: "لم يتم العثور على منشآت مطابقة للبحث",
      noResultsDesc: "جرّب تغيير كلمات البحث أو اختيار تصنيف مختلف من القائمة أعلاه.",
      exploreCities: "استكشف المحافظات:"
    },
    // Syria Vector Map
    map: {
      title: "خريطة الجمهورية العربية السورية الجغرافية التفاعلية",
      precisionBadge: "Vector Precision 1:1",
      subtitle: "تصفح معالم ومتاحف ومنشآت المحافظات السورية جغرافياً بدقة متناهية",
      instruction: "انقر أو مرر المؤشر على أي محافظة أو نقطة استدلال لاستعراض المعالم والمنشآت المعتمدة بنظام NFC و 360° VR",
      showAll: "عرض كل المحافظات ({count} منشأة)",
      verifiedCount: "{count} منشأة موثقة",
      keySites: "أبرز المعالم والآثار:",
      filterCity: "تصفية منشآت المدينة",
      clearSelection: "إلغاء التحديد",
      navGmaps: "ملاحة Google 📍",
      keyGovernorates: "المحافظات الرئيسية:",
      seaName: "البحر الأبيض المتوسط • MEDITERRANEAN SEA",
      desertName: "بـاديـة الـشـام • SYRIAN DESERT",
      euphratesName: "نهر الفرات • Euphrates River",
      orontesName: "نهر العاصي • Orontes River",
      lakeAssad: "بحيرة الأسد",
      cities: {
        damascus: "دمشق القديمة & المركز",
        aleppo: "حلب الشهباء",
        latakia: "اللاذقية & الساحل",
        tartus: "طرطوس & أرواد",
        hama: "حماة & العاصي",
        homs: "حمص & قلعة الحصن",
        palmyra: "تدمر & البادية",
        deir_ezzor: "دير الزور & الفرات"
      },
      governorates: {
        damascus: "دمشق وريف دمشق",
        aleppo: "محافظة حلب",
        homs: "محافظة حمص وتدمر",
        hama: "محافظة حماة",
        latakia: "محافظة اللاذقية",
        tartus: "محافظة طرطوس",
        idlib: "محافظة إدلب",
        raqqa: "محافظة الرقة",
        deir_ezzor: "محافظة دير الزور",
        hasakah: "محافظة الحسكة",
        daraa: "محافظة درعا",
        sweida: "محافظة السويداء"
      }
    },
    // QR Stand Poster Modal
    posterModal: {
      title: "ملصق طاولة QR ذكي للطباعة الفورية (Swiss Stand Poster)",
      brandHeader: "SHAM360 SMART POSTER",
      statusBadge: "NFC & QR READY",
      scanPrompt: "امسح الكود بكاميرا هاتفك أو قرّب بطاقتك الذكية",
      scanSub: "لفتح البروفايل، حجز الموعد، أو الملاحة الجغرافية المباشرة",
      printBtn: "طباعة الملصق الآن (Print Poster)",
      copyBtn: "نسخ الرابط",
      copiedBtn: "تم نسخ الرابط!"
    },
    // Smart Profile View
    profile: {
      verifiedOfficial: "هوية رقمية معتمدة وموثقة",
      directoryMember: "عضو موثق في دليل الأعمال",
      saveVCard: "حفظ جهة الاتصال (.vcf)",
      saved: "تم الحفظ في الهاتف!",
      share: "مشاركة",
      qrCode: "رمز QR",
      virtualTour: "جولة 360° VR",
      googleReview: "اكتب تقييماً على Google Maps ⭐️",
      quickContact: "قنوات التواصل السريعة",
      linksHeader: "الروابط والمستندات الذكية",
      officialDocBadge: "مستند رسمي • فتح في نافذة جديدة",
      cvBadge: "السيرة الذاتية (CV)",
      portfolioBadge: "معرض الأعمال",
      openDoc: "عرض المستند بدقة عالية",
      openLink: "فتح الرابط الخارجي",
      paletteStyle: "نمط التصميم والألوان",
      qrModalTitle: "رمز الاستجابة السريع للبروفايل",
      qrModalDesc: "امسح الرمز بكاميرا أي هاتف لفتح هذا البروفايل فوراً",
      downloadQr: "تحميل صورة QR",
      backToDirectory: "العودة إلى الدليل",
      notFoundTitle: "الملف الرقمي غير متوفر",
      notFoundDesc: "لم يتم العثور على ملف رقمي مسجل بهذا المعرّف."
    },
    // Products & NFC Hardware Storefront
    products: {
      subBanner: "عتاد الهوية الرقمية الذكية (Smart NFC Products)",
      usp1: "بدون أي تطبيق مطلوب من العميل",
      usp2: "توافق شامل مع iPhone و Android",
      usp3: "مراكز تسليم في دمشق وحلب وشحن للمحافظات",
      heroBadge: "بطاقة SHAM360 الذكية الرسمية (Front & Back) • عتاد الهوية الرقمية في سوريا",
      heroTitle: "بطاقة الأعمال الذكية الرسمية",
      heroTitleHighlight: "بوجهين تدمج كافة وسائل التواصل بلمسة واحدة.",
      heroDesc: "الهوية الرقمية المعتمدة لرجال الأعمال والشركات: وجه أمامي كحلي فاخر بنقر NFC فوري، ووجه خلفي تفاعلي يجمع كافة منصات التواصل الاجتماعي وموقعك الجغرافي ورمز QR، مع ستاندات الطاولات وميداليات المفاتيح التفاعلية.",
      catAll: "جميع المنتجات",
      catCards: "بطاقات NFC الذكية",
      catStands: "ستاندات الطاولات",
      catKeychains: "ميداليات المفاتيح",
      orderWhatsApp: "اطلب عبر واتساب",
      customizeCard: "تخصيص البطاقة باسمك",
      featuresTitle: "الميزات والمواصفات الفنية:",
      benefitsTitle: "المزايا الحصرية لمنشأتك:",
      tapSimulate: "محاكاة تلامس البطاقة بالهاتف (NFC Tap)",
      tapSuccessTitle: "تم قراءة الهوية الرقمية بنجاح!",
      tapSuccessDesc: "فتح البروفايل الرقمي مباشرة على هاتف العميل دون أي تطبيق."
    },
    // Auth & Dashboard Modals
    auth: {
      loginTitle: "تسجيل الدخول إلى لوحة التحكم",
      registerTitle: "إنشاء حساب جديد في SHAM360",
      loginSubtitle: "إدارة وتحديث هويتك الرقمية وبطاقاتك الذكية",
      registerSubtitle: "انضم إلى شبكة الهوية الرقمية الأحدث في سوريا",
      fullName: "الاسم الكامل / اسم المنشأة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      loginBtn: "تسجيل الدخول",
      registerBtn: "إنشاء الحساب",
      googleBtn: "الدخول بواسطة Google",
      demoBtn: "تجربة سريعة كضيف (Demo Mode)",
      forgotPassword: "نسيت كلمة المرور؟",
      resetTitle: "إعادة تعيين كلمة المرور",
      resetDesc: "أدخل بريدك الإلكتروني وسنرسل لك رابط استعادة كلمة المرور.",
      sendReset: "إرسال رابط الاستعادة",
      haveAccount: "لديك حساب بالفعل؟ سجل دخولك",
      noAccount: "ليس لديك حساب؟ أنشئ حسابك الآن"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      products: "NFC Products",
      profile: "Smart Profile",
      directory: "Directory",
      dashboard: "Dashboard",
      orderCard: "Order Your Card",
      ecosystem: "Ecosystem Pages",
      switchLang: "التبديل إلى العربية",
      langLabel: "عربي"
    },
    // Common actions & statuses
    common: {
      search: "Search...",
      filter: "Filter",
      all: "All",
      saveContact: "Save Contact (.vcf)",
      saveContactShort: "Save Contact",
      share: "Share",
      copyLink: "Copy Link",
      copied: "Copied!",
      viewProfile: "View Profile",
      directions: "Directions",
      googleMaps: "Google Maps 📍",
      googleMapsNav: "Google Maps 📍",
      whatsapp: "WhatsApp",
      call: "Call",
      email: "Email",
      website: "Website",
      qrCode: "QR Code",
      qrPoster: "QR Poster",
      openNow: "Open Now 🟢",
      closedNow: "Closed Now 🔴",
      verifiedNfc: "Verified NFC Member ⚡",
      verifiedHeritage: "Verified Cultural Heritage 🏛️",
      interactions: "Interactions",
      loading: "Loading...",
      backHome: "Back to Home",
      close: "Close",
      print: "Print",
      cancel: "Cancel",
      submit: "Submit",
      confirm: "Confirm"
    },
    // Directory Page
    directory: {
      headerTitle: "SHAM360 Smart Directory for Syrian Businesses & Heritage",
      headerBadge: "NFC • VR 360° • LIVE GPS",
      addListing: "Add New Listing",
      searchPlaceholder: "Search historic sites, museums, doctors, companies, or cities (e.g., Damascus, Aleppo, Palmyra...)",
      tabAll: "⚡ All",
      tabMuseums: "🏛️ Museums & Heritage",
      tabRestaurants: "🍔 Restaurants & Cafes",
      tabFreelancers: "🛠️ Freelancers & Experts",
      tabClinics: "🩺 Clinics & Medical",
      tabBusinesses: "🏢 Companies & Stores",
      viewGrid: "Card Grid",
      viewMap: "Syria Interactive Map",
      showingCount: "Showing {count} verified Syrian listings & sites",
      clearFilter: "Clear Governorate Filter",
      noResults: "No matching listings found",
      noResultsDesc: "Try adjusting your search query or select another category from the tabs above.",
      exploreCities: "Explore Governorates:"
    },
    // Syria Vector Map
    map: {
      title: "Syrian Arab Republic Interactive Vector Map",
      precisionBadge: "Vector Precision 1:1",
      subtitle: "Explore Syrian governorates, cultural sites & verified entities with geographic precision",
      instruction: "Click or hover on any governorate or city hotspot to inspect NFC & 360° VR verified listings",
      showAll: "Show All Governorates ({count} listings)",
      verifiedCount: "{count} Verified Listings",
      keySites: "Key Heritage & Landmarks:",
      filterCity: "Filter City Listings",
      clearSelection: "Clear Selection",
      navGmaps: "Google Maps Navigation 📍",
      keyGovernorates: "Key Governorates:",
      seaName: "MEDITERRANEAN SEA • البحر الأبيض المتوسط",
      desertName: "SYRIAN DESERT • بـاديـة الـشـام",
      euphratesName: "Euphrates River • نهر الفرات",
      orontesName: "Orontes River • نهر العاصي",
      lakeAssad: "Lake Assad",
      cities: {
        damascus: "Old Damascus & Center",
        aleppo: "Aleppo",
        latakia: "Latakia & Coast",
        tartus: "Tartus & Arwad",
        hama: "Hama & Orontes",
        homs: "Homs & Fortress",
        palmyra: "Palmyra & Desert",
        deir_ezzor: "Deir ez-Zor & Euphrates"
      },
      governorates: {
        damascus: "Damascus & Rural Damascus",
        aleppo: "Aleppo Governorate",
        homs: "Homs & Palmyra Governorate",
        hama: "Hama Governorate",
        latakia: "Latakia Governorate",
        tartus: "Tartus Governorate",
        idlib: "Idlib Governorate",
        raqqa: "Raqqa Governorate",
        deir_ezzor: "Deir ez-Zor Governorate",
        hasakah: "Al-Hasakah Governorate",
        daraa: "Daraa Governorate",
        sweida: "As-Suwayda Governorate"
      }
    },
    // QR Stand Poster Modal
    posterModal: {
      title: "Smart Stand Printable QR Poster (Swiss Stand Poster)",
      brandHeader: "SHAM360 SMART POSTER",
      statusBadge: "NFC & QR READY",
      scanPrompt: "Scan with your phone camera or tap your smart card",
      scanSub: "For instant profile, appointment booking, or direct GPS navigation",
      printBtn: "Print Poster Now (Print Poster)",
      copyBtn: "Copy Link",
      copiedBtn: "Link Copied!"
    },
    // Smart Profile View
    profile: {
      verifiedOfficial: "Officially Verified Digital Profile",
      directoryMember: "Verified Directory Member",
      saveVCard: "Save Contact (.vcf)",
      saved: "Saved to Contacts!",
      share: "Share",
      qrCode: "QR Code",
      virtualTour: "360° VR Tour",
      googleReview: "Write a Review on Google Maps ⭐️",
      quickContact: "Quick Contact Channels",
      linksHeader: "Smart Links & Documents",
      officialDocBadge: "Official Document • Opens in new tab",
      cvBadge: "Executive CV / Resume",
      portfolioBadge: "Portfolio Showcase",
      openDoc: "Open Document in High Resolution",
      openLink: "Open External Link",
      paletteStyle: "Theme Palette & Accent",
      qrModalTitle: "Smart Profile QR Code",
      qrModalDesc: "Scan with any smartphone camera to open this profile immediately",
      downloadQr: "Download QR Image",
      backToDirectory: "Back to Directory",
      notFoundTitle: "Profile Not Found",
      notFoundDesc: "No digital profile was found matching this slug."
    },
    // Products & NFC Hardware Storefront
    products: {
      subBanner: "Smart NFC Hardware & Digital Identity Products",
      usp1: "Zero app required for clients",
      usp2: "100% iPhone & Android compatible",
      usp3: "Pickup in Damascus & Aleppo, shipping across Syria",
      heroBadge: "SHAM360 Official Smart NFC Card (Front & Back) • Syrian Digital Hardware",
      heroTitle: "Official Smart NFC Business Card",
      heroTitleHighlight: "with Instant Double-Sided Social Tap & QR.",
      heroDesc: "The certified digital identity for business executives and companies: luxury navy front with instant NFC tap, and an interactive back combining all social networks, QR code, website, and GPS location.",
      catAll: "All Products",
      catCards: "Smart NFC Cards",
      catStands: "Table Stands",
      catKeychains: "Keychains",
      orderWhatsApp: "Order via WhatsApp",
      customizeCard: "Personalize with Your Name",
      featuresTitle: "Technical Specs & Features:",
      benefitsTitle: "Key Advantages for Your Entity:",
      tapSimulate: "Simulate Phone Tap (NFC Tap)",
      tapSuccessTitle: "Smart Profile Read Successfully!",
      tapSuccessDesc: "Instant digital profile launched directly on client's phone without any app."
    },
    // Auth & Dashboard Modals
    auth: {
      loginTitle: "Sign in to Dashboard",
      registerTitle: "Create New SHAM360 Account",
      loginSubtitle: "Manage and update your digital identity & smart cards",
      registerSubtitle: "Join Syria's premier digital identity network",
      fullName: "Full Name / Organization Name",
      email: "Email Address",
      password: "Password",
      loginBtn: "Sign In",
      registerBtn: "Create Account",
      googleBtn: "Continue with Google",
      demoBtn: "Try Guest Demo Mode",
      forgotPassword: "Forgot password?",
      resetTitle: "Reset Password",
      resetDesc: "Enter your email address and we'll send you a recovery link.",
      sendReset: "Send Recovery Link",
      haveAccount: "Already have an account? Sign in",
      noAccount: "Don't have an account? Sign up now"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage, default to Arabic
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("sham360_language");
      if (saved === "en" || saved === "ar") {
        return saved;
      }
    } catch {
      // localStorage might be unavailable in sandboxed iframes
    }
    return "ar";
  });

  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("sham360_language", lang);
    } catch {
      // Ignored
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  // Sync document root attributes whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [language, dir]);

  // Helper function to resolve nested keys like "nav.home"
  const t = (key: string, defaultVal?: string): string => {
    const keys = key.split(".");
    let current: any = TRANSLATIONS[language];
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        return defaultVal || key;
      }
    }
    return typeof current === "string" ? current : defaultVal || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isAr,
        dir,
        toggleLanguage,
        setLanguage,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
