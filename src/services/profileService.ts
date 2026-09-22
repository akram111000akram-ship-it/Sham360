import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  limit,
  orderBy
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Sham360ProfileData, FirestoreProfile } from "../types";
import { mockBusinessProfile, mockIndividualProfile } from "../components/Sham360ProfileView";
import { DIRECTORY_DATA, DirectoryItem } from "../data/directoryData";

/**
 * Adapter converting a rich DirectoryItem into the component-ready Sham360ProfileData structure.
 */
export function mapDirectoryItemToProfileView(item: DirectoryItem): Sham360ProfileData {
  return {
    id: item.id,
    slug: item.slug,
    type: item.category === "freelancers" ? "individual" : "business",
    name: item.nameAr,
    nameEn: item.nameEn,
    titleOrCategory: item.titleAr,
    titleOrCategoryEn: item.titleEn,
    bio: item.bioAr,
    bioEn: item.bioEn,
    avatarUrl: item.avatarUrl,
    coverUrl: item.coverUrl,
    city: item.cityAr,
    cityEn: item.cityEn,
    category: item.categoryLabelAr,
    hasVrTour: item.hasVrTour,
    vrTourEmbedUrl: item.hasVrTour ? "https://my.matterport.com/show/?m=JGPnGQL8iZw&play=1" : undefined,
    hasGoogleMapsOptimization: true,
    rating: item.rating,
    reviewCount: item.reviewsCount,
    isVerified: true,
    directoryMember: true,
    primaryAction: {
      label: "محادثة عبر واتساب",
      labelEn: "Chat on WhatsApp",
      url: `https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "")}`,
      actionType: "whatsapp"
    },
    contactInfo: {
      phone: item.phone,
      whatsapp: item.whatsapp,
      email: item.email,
      locationText: `${item.addressAr} - ${item.cityAr}، سوريا`,
      locationTextEn: `${item.addressEn || item.addressAr} - ${item.cityEn}, Syria`,
      googleMapsUrl: item.googleMapsUrl
    },
    links: [
      {
        id: "nav",
        label: "توجيه Google Maps مباشر",
        labelEn: "Live Google Maps Navigation",
        url: item.googleMapsUrl,
        category: "custom",
        iconName: "navigation",
        isHighlight: true
      },
      ...(item.hasVrTour
        ? [
            {
              id: "vr",
              label: item.vrTourLabelAr || "جولة 360° الافتراضية 8K",
              labelEn: "8K 360° Virtual Tour",
              url: item.googleMapsUrl,
              category: "portfolio" as const,
              iconName: "vr",
              isHighlight: true
            }
          ]
        : []),
      {
        id: "call",
        label: `اتصال هاتفي (${item.phone})`,
        labelEn: `Direct Phone (${item.phone})`,
        url: `tel:${item.phone}`,
        category: "custom",
        iconName: "phone"
      },
      {
        id: "vcard",
        label: "حفظ جهة الاتصال (بطاقة NFC الرقمية)",
        labelEn: "Save Contact (NFC Digital Card)",
        url: "#vcard",
        category: "cv",
        iconName: "download"
      }
    ]
  };
}

/**
 * In-memory development fallback registry.
 * Guarantees that /p/al-yasmeen and /p/akram continue working offline or before Firestore is connected.
 */
const SAMPLE_PROFILES_REGISTRY: Record<string, Sham360ProfileData> = {
  "al-yasmeen": mockBusinessProfile,
  "yasmeen": mockBusinessProfile,
  "restaurant": mockBusinessProfile,
  "business": mockBusinessProfile,
  "akram": mockIndividualProfile,
  "eng-akram": mockIndividualProfile,
  "individual": mockIndividualProfile
};

/**
 * Adapter converting a Firestore profile document into the component-ready Sham360ProfileData structure.
 */
export function mapFirestoreToProfileView(docData: FirestoreProfile): Sham360ProfileData {
  return {
    id: docData.id,
    slug: docData.slug,
    type: docData.profileType || "individual",
    name: docData.name || "SHAM360 Member",
    nameEn: docData.nameEn,
    titleOrCategory: docData.title || docData.category || docData.businessName || "",
    bio: docData.bio,
    avatarUrl: docData.profileImage || "/assets/images/default-avatar.png",
    coverUrl: docData.coverImage,
    logoUrl: docData.logoImage,
    city: docData.city,
    category: docData.category,
    hasVrTour: docData.hasVrTour,
    vrTourEmbedUrl: docData.vrTourEmbedUrl,
    hasGoogleMapsOptimization: docData.hasGoogleMapsOptimization,
    rating: docData.rating,
    reviewCount: docData.reviewCount,
    socialLinks: docData.socialLinks,
    isVerified: docData.isVerified ?? true,
    primaryAction: docData.whatsapp
      ? {
          label: "محادثة فورية (WhatsApp)",
          labelEn: "Instant Chat (WhatsApp)",
          url: `https://wa.me/${docData.whatsapp.replace(/[^0-9]/g, "")}`,
          actionType: "whatsapp",
          iconName: "MessageCircle"
        }
      : docData.website
      ? {
          label: "زيارة الموقع الإلكتروني",
          labelEn: "Visit Official Website",
          url: docData.website,
          actionType: "link",
          iconName: "Globe"
        }
      : undefined,
    contactInfo: {
      phone: docData.phone,
      whatsapp: docData.whatsapp,
      email: docData.email,
      website: docData.website,
      locationText: docData.location || (docData.city ? `${docData.city}، سوريا` : undefined),
      locationTextEn: docData.location || (docData.city ? `${docData.city}, Syria` : undefined),
      googleMapsUrl: docData.googleMapsUrl
    },
    direct_redirect_enabled: docData.direct_redirect_enabled ?? docData.directRedirectEnabled ?? false,
    direct_redirect_url: docData.direct_redirect_url || docData.directRedirectUrl || "",
    directRedirectEnabled: docData.direct_redirect_enabled ?? docData.directRedirectEnabled ?? false,
    directRedirectUrl: docData.direct_redirect_url || docData.directRedirectUrl || "",
    backgroundMusicEnabled: Boolean(docData.backgroundMusicEnabled),
    backgroundMusicPreset: docData.backgroundMusicPreset || "damascene_oud",
    backgroundMusicUrl: docData.backgroundMusicUrl || "",
    backgroundMusicTitle: docData.backgroundMusicTitle || "",
    shamCashNumber: docData.shamCashNumber || "",
    syriatelCashNumber: docData.syriatelCashNumber || "",
    shamCashQrUrl: docData.shamCashQrUrl || "",
    syriatelCashQrUrl: docData.syriatelCashQrUrl || "",
    paymentMethodsEnabled: docData.paymentMethodsEnabled ?? (Boolean(docData.shamCashNumber || docData.syriatelCashNumber || (docData.paymentMethods && docData.paymentMethods.length > 0))),
    paymentMethods: (docData.paymentMethods && docData.paymentMethods.length > 0)
      ? docData.paymentMethods
      : [
          ...(docData.shamCashNumber ? [{
            id: "pay_sham_cash",
            provider: "sham_cash" as const,
            title: "شام كاش (Sham Cash)",
            titleEn: "Sham Cash",
            accountNumber: docData.shamCashNumber,
            accountName: docData.businessName || docData.name || "",
            qrCodeUrl: docData.shamCashQrUrl || "",
            isActive: true
          }] : []),
          ...(docData.syriatelCashNumber ? [{
            id: "pay_syriatel_cash",
            provider: "syriatel_cash" as const,
            title: "سيريتل كاش (Syriatel Cash)",
            titleEn: "Syriatel Cash",
            accountNumber: docData.syriatelCashNumber,
            accountName: docData.businessName || docData.name || "",
            qrCodeUrl: docData.syriatelCashQrUrl || "",
            isActive: true
          }] : [])
        ],
    links: docData.links && docData.links.length > 0
      ? docData.links
      : [
          ...(docData.phone ? [{ id: "phone", label: "اتصال هاتفي مباشر", labelEn: "Direct Phone Call", url: `tel:${docData.phone}`, iconName: "Phone" }] : []),
          ...(docData.whatsapp ? [{ id: "wa", label: "محادثة واتساب سريعة", labelEn: "Quick WhatsApp Chat", url: `https://wa.me/${docData.whatsapp.replace(/[^0-9]/g, "")}`, iconName: "MessageCircle" }] : []),
          ...(docData.googleMapsUrl ? [{ id: "maps", label: "الموقع على خرائط جوجل", labelEn: "Google Maps Location", url: docData.googleMapsUrl, iconName: "MapPin" }] : []),
          ...(docData.website ? [{ id: "site", label: "الموقع الإلكتروني الرسمي", labelEn: "Official Website", url: docData.website, iconName: "Globe" }] : [])
        ]
  };
}

/**
 * Retrieves a smart profile by its unique public slug (e.g. /p/akram or /p/al-yasmeen).
 * Queries Cloud Firestore first if configured; falls back safely to local registry.
 */
export async function getProfileBySlug(slug: string): Promise<Sham360ProfileData | null> {
  const normalizedSlug = (slug || "").toLowerCase().trim();

  // 1. Attempt Firestore query if Firebase is configured
  if (isFirebaseConfigured && db) {
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(
        profilesRef,
        where("slug", "==", normalizedSlug),
        where("isActive", "==", true),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const rawData = { id: docSnap.id, ...docSnap.data() } as FirestoreProfile;
        return mapFirestoreToProfileView(rawData);
      }
    } catch (error) {
      console.warn(
        `[SHAM360] Firestore query for slug "${normalizedSlug}" failed. Falling back to development dataset:`,
        error
      );
    }
  }

  // 2. Safe development fallback for sample profiles
  if (!normalizedSlug || normalizedSlug === "profile") {
    return SAMPLE_PROFILES_REGISTRY["akram"] || mockIndividualProfile;
  }

  if (SAMPLE_PROFILES_REGISTRY[normalizedSlug]) {
    return SAMPLE_PROFILES_REGISTRY[normalizedSlug];
  }

  // Check sample directory profiles
  const dirMatch = SAMPLE_DIRECTORY_PROFILES.find((p) => p.slug === normalizedSlug);
  if (dirMatch) {
    return mapFirestoreToProfileView(dirMatch);
  }

  // Check comprehensive Syrian Directory dataset
  const directoryItemMatch = DIRECTORY_DATA.find((item) => item.slug === normalizedSlug);
  if (directoryItemMatch) {
    return mapDirectoryItemToProfileView(directoryItemMatch);
  }

  // Tolerant keyword matching during preview
  if (normalizedSlug.includes("akram") || normalizedSlug.includes("indiv")) {
    return mockIndividualProfile;
  }
  if (normalizedSlug.includes("yasmeen") || normalizedSlug.includes("busin")) {
    return mockBusinessProfile;
  }

  return null;
}

/**
 * Retrieves a smart profile by its internal document ID.
 */
export async function getProfileById(id: string): Promise<Sham360ProfileData | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "profiles", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const rawData = { id: snapshot.id, ...snapshot.data() } as FirestoreProfile;
        return mapFirestoreToProfileView(rawData);
      }
    } catch (error) {
      console.error(`[SHAM360] Failed to fetch profile with ID ${id}:`, error);
    }
  }

  // Fallback check across sample profiles
  const sample = Object.values(SAMPLE_PROFILES_REGISTRY).find((p) => p.id === id);
  return sample || null;
}

/**
 * Retrieves a smart profile raw Firestore document by its internal document ID.
 */
export async function getFirestoreProfileById(id: string): Promise<FirestoreProfile | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "profiles", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as FirestoreProfile;
      }
    } catch (error) {
      console.error(`[SHAM360] Failed to fetch raw profile with ID ${id}:`, error);
    }
  }

  const sample = Object.values(SAMPLE_PROFILES_REGISTRY).find((p) => p.id === id);
  if (sample) {
    return {
      id: sample.id,
      slug: sample.id === "1" ? "al-yasmeen" : "akram",
      profileType: sample.type,
      name: sample.name,
      nameEn: sample.nameEn,
      title: sample.titleOrCategory,
      bio: sample.bio,
      profileImage: sample.avatarUrl,
      coverImage: sample.coverUrl,
      logoImage: sample.logoUrl,
      phone: sample.contactInfo?.phone,
      whatsapp: sample.contactInfo?.whatsapp,
      email: sample.contactInfo?.email,
      location: sample.contactInfo?.locationText,
      googleMapsUrl: sample.contactInfo?.googleMapsUrl,
      directoryEnabled: true,
      isActive: true,
      isVerified: sample.isVerified,
      createdAt: null,
      updatedAt: null
    };
  }
  return null;
}

/**
 * Retrieves a raw FirestoreProfile by slug for editing in the dashboard.
 */
export async function getFirestoreProfileBySlug(slug: string): Promise<FirestoreProfile | null> {
  const normalizedSlug = (slug || "").toLowerCase().trim();

  if (isFirebaseConfigured && db) {
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("slug", "==", normalizedSlug), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as FirestoreProfile;
      }
    } catch (error) {
      console.warn(`[SHAM360] Firestore query for slug "${normalizedSlug}" failed:`, error);
    }
  }

  // Fallback demo profile mapping
  const isIndividual = normalizedSlug.includes("akram") || normalizedSlug.includes("indiv");
  const sample = isIndividual ? mockIndividualProfile : mockBusinessProfile;
  return {
    id: isIndividual ? "akram-demo" : "al-yasmeen-demo",
    slug: normalizedSlug || (isIndividual ? "akram" : "al-yasmeen"),
    profileType: sample.type,
    name: sample.name,
    nameEn: sample.nameEn,
    title: sample.titleOrCategory,
    businessName: isIndividual ? undefined : sample.name,
    bio: sample.bio,
    city: "دمشق",
    category: isIndividual ? "هندسة وبرمجيات" : "مطاعم وضيافة",
    profileImage: sample.avatarUrl,
    coverImage: sample.coverUrl,
    logoImage: sample.logoUrl,
    phone: sample.contactInfo?.phone,
    whatsapp: sample.contactInfo?.whatsapp,
    email: sample.contactInfo?.email,
    website: sample.links?.[0]?.url,
    location: sample.contactInfo?.locationText,
    googleMapsUrl: sample.contactInfo?.googleMapsUrl,
    socialLinks: {},
    links: sample.links,
    directoryEnabled: true,
    isActive: true,
    isVerified: sample.isVerified,
    createdAt: null,
    updatedAt: null
  };
}

/**
 * Retrieves all profiles owned by an authenticated user UID.
 */
export async function getProfilesByOwner(ownerUid: string): Promise<FirestoreProfile[]> {
  if (isFirebaseConfigured && db && ownerUid) {
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("ownerUid", "==", ownerUid));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as FirestoreProfile[];
      }
    } catch (error) {
      console.error("[SHAM360] Failed to fetch profiles by owner:", error);
    }
  }

  // Check local storage for demo/offline changes
  const localSaved = localStorage.getItem(`sham360_profile_${ownerUid}`);
  if (localSaved) {
    try {
      return [JSON.parse(localSaved)];
    } catch {
      // Ignored
    }
  }

  return [];
}

/**
 * Rich curated list of verified Syrian businesses across governorates and sectors.
 */
export const SAMPLE_DIRECTORY_PROFILES: FirestoreProfile[] = [
  {
    id: "al-yasmeen",
    slug: "al-yasmeen",
    profileType: "business",
    name: "مطعم وبيت الياسمين الدمشقي",
    nameEn: "Al Yasmeen Palace & Restaurant",
    title: "مطعم وتراث شامي عريق في دمشق القديمة",
    category: "مطاعم وكافيهات",
    city: "دمشق",
    location: "دمشق القديمة - باب توما - حارة الياسمين",
    bio: "أرقى المأكولات الشامية والشرقية في دار دمشقية أثرية، مع باحة رخامية وبحرة تاريخية وجولة افتراضية بتقنية 8K.",
    profileImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=80",
    phone: "+963112233445",
    whatsapp: "+963944112233",
    googleMapsUrl: "https://maps.google.com/?q=Old+Damascus+Bab+Touma",
    hasVrTour: true,
    hasGoogleMapsOptimization: true,
    rating: 4.9,
    reviewCount: 142,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "akram",
    slug: "akram",
    profileType: "individual",
    name: "م. أكرم دمشقي",
    nameEn: "Eng. Akram Dimashqi",
    title: "استشاري نظم ذكية وبطاقات رقمية وحلول برمجية",
    category: "مصممون ومبرمجون",
    city: "دمشق",
    location: "دمشق - تنظيم كفرسوسة - برج الأعمال",
    bio: "هندسة البرمجيات السحابية، أتمتة الأعمال، ونشر البطاقات الذكية بتقنيات NFC مع تحسين التواجد الرقمي عبر خرائط Google.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    phone: "+963991234567",
    whatsapp: "+963991234567",
    googleMapsUrl: "https://maps.google.com/?q=Kafarsouseh+Damascus",
    hasVrTour: false,
    hasGoogleMapsOptimization: true,
    rating: 5.0,
    reviewCount: 88,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "sham-palace",
    slug: "sham-palace",
    profileType: "business",
    name: "فندق قصر الشام التراثي",
    nameEn: "Sham Palace Heritage Boutique Hotel",
    title: "ضيافة دمشقية خمس نجوم وأجنحة أندلسية",
    category: "فنادق وسياحة",
    city: "دمشق",
    location: "دمشق القديمة - قرب الجامع الأموي",
    bio: "تجربة إقامة فاخرة تجمع بين روح العمارة الأموية الأصيلة وأعلى معايير الراحة العصرية مع جولة 360° بانورامية لكل جناح.",
    profileImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    phone: "+963113344556",
    whatsapp: "+963955223344",
    googleMapsUrl: "https://maps.google.com/?q=Old+Damascus+Umayyad",
    hasVrTour: true,
    hasGoogleMapsOptimization: true,
    rating: 4.8,
    reviewCount: 96,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "sham-medical",
    slug: "sham-medical",
    profileType: "business",
    name: "مركز الشام الطبي الاستشاري",
    nameEn: "Sham Specialized Medical Center",
    title: "مركز استشاري لجراحة اليوم الواحد والتصوير الرقمي",
    category: "عيادات وطب",
    city: "دمشق",
    location: "دمشق - المزرعة - ساحة الشهبندر",
    bio: "أحدث التقنيات التشخيصية والعلاجية ونخبة من أطباء الاختصاص السوريين، مع حجز مواعيد فوري وبطاقات رقمية للتاريخ الطبي.",
    profileImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    phone: "+963114422110",
    whatsapp: "+963966334455",
    googleMapsUrl: "https://maps.google.com/?q=Shahbandar+Damascus",
    hasVrTour: false,
    hasGoogleMapsOptimization: true,
    rating: 4.9,
    reviewCount: 115,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "shahba-engineering",
    slug: "shahba-engineering",
    profileType: "business",
    name: "مجموعة الشهباء للاستشارات الهندسية",
    nameEn: "Al Shahba Engineering & Contracting",
    title: "تصاميم معمارية وإشراف هندسي وترميم المباني الأثرية",
    category: "عقارات ومقاولات",
    city: "حلب",
    location: "حلب - السليمانية - شارع الفيلات",
    bio: "خبرة تفوق 25 عاماً في التصميم المعماري الإنشائي وإعادة تأهيل المعالم العمرانية والتطوير العقاري الحديث في حلب وسائر المحافظات.",
    profileImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    phone: "+963212211445",
    whatsapp: "+963933445566",
    googleMapsUrl: "https://maps.google.com/?q=Sulaimaniyah+Aleppo",
    hasVrTour: false,
    hasGoogleMapsOptimization: false,
    rating: 4.7,
    reviewCount: 64,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "sahel-pearl",
    slug: "sahel-pearl",
    profileType: "business",
    name: "منتجع وسبا لؤلؤة الساحل",
    nameEn: "Sahel Pearl Beach Resort & Spa",
    title: "إطلالات بحرية بانورامية وأنشطة استجمام ساحلية",
    category: "فنادق وسياحة",
    city: "اللاذقية",
    location: "اللاذقية - الشاطئ الأزرق",
    bio: "أروع شواطئ البحر الأبيض المتوسط مع مرافق شاطئية متكاملة، مطاعم بحرية، ومسابح أولمبية مع جولة 360° تفاعلية.",
    profileImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    phone: "+963414433221",
    whatsapp: "+963988112233",
    googleMapsUrl: "https://maps.google.com/?q=Blue+Beach+Latakia",
    hasVrTour: true,
    hasGoogleMapsOptimization: true,
    rating: 4.8,
    reviewCount: 180,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "rawda-cafe",
    slug: "rawda-cafe",
    profileType: "business",
    name: "مقهى ومطعم الروضة التراثي",
    nameEn: "Al Rawda Traditional Cafe & Lounge",
    title: "ملتقى الأدباء والقهوة الحمصية الأصيلة",
    category: "مطاعم وكافيهات",
    city: "حمص",
    location: "حمص - شارع الدبلان",
    bio: "جلسات هادئة، فطور حمصي تقليدي، وحلويات شامية طازجة في قلب شارع الدبلان الشهير.",
    profileImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    phone: "+963312244668",
    whatsapp: "+963944778899",
    googleMapsUrl: "https://maps.google.com/?q=Dablan+Homs",
    hasVrTour: false,
    hasGoogleMapsOptimization: true,
    rating: 4.7,
    reviewCount: 92,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "amana-realestate",
    slug: "amana-realestate",
    profileType: "business",
    name: "مكتب الأمانة للوساطة والتطوير العقاري",
    nameEn: "Al Amana Real Estate & Development",
    title: "شقق سكنية وشاليهات وفلل بحرية موثقة",
    category: "عقارات ومقاولات",
    city: "طرطوس",
    location: "طرطوس - الكورنيش البحري الجنوبي",
    bio: "خدمات بيع وإيجار العقارات والشاليهات السياحية مع توثيق إلكتروني كامل وضمان قانوني موثوق.",
    profileImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    phone: "+96343321144",
    whatsapp: "+963955667788",
    googleMapsUrl: "https://maps.google.com/?q=Corniche+Tartus",
    hasVrTour: false,
    hasGoogleMapsOptimization: false,
    rating: 4.6,
    reviewCount: 53,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "next-digital",
    slug: "next-digital",
    profileType: "business",
    name: "وكالة نكست ديجيتال للدعاية والحلول الرقمية",
    nameEn: "Next Digital Marketing & Branding",
    title: "إدارة الهوية الرقمية وتحسين محركات البحث وخرائط جوجل",
    category: "شركات وخدمات",
    city: "دمشق",
    location: "دمشق - أبو رمانة - شارع الجلاء",
    bio: "خبراء معتمدون في تجهيز البطاقات الذكية، تحسين تقييمات Google Maps، وبناء استراتيجيات تسويق متكاملة للمنشآت السورية.",
    profileImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    phone: "+963113322119",
    whatsapp: "+963999887766",
    googleMapsUrl: "https://maps.google.com/?q=Abu+Rummaneh+Damascus",
    hasVrTour: false,
    hasGoogleMapsOptimization: true,
    rating: 4.9,
    reviewCount: 77,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  },
  {
    id: "assi-clinic",
    slug: "assi-clinic",
    profileType: "business",
    name: "مجمع العاصي التخصصي لطب وجراحة الأسنان",
    nameEn: "Al Assi Dental & Orthodontics Polyclinic",
    title: "تجميل وزراعة الأسنان الرقمية الفورية",
    category: "عيادات وطب",
    city: "حماة",
    location: "حماة - ساحة العاصي - برج النواعير",
    bio: "أرقى معايير طب الأسنان التجميلي وزراعة الأسنان الرقمية ثلاثية الأبعاد بإشراف نخبة من الأطباء الاستشاريين.",
    profileImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    phone: "+963332255880",
    whatsapp: "+963966554433",
    googleMapsUrl: "https://maps.google.com/?q=Assi+Square+Hama",
    hasVrTour: false,
    hasGoogleMapsOptimization: true,
    rating: 4.8,
    reviewCount: 84,
    directoryEnabled: true,
    isActive: true,
    isVerified: true,
    createdAt: null,
    updatedAt: null
  }
];

/**
 * Retrieves directory-enabled profiles for the Syrian Business Directory (/directory).
 */
export async function getDirectoryProfiles(options?: {
  category?: string;
  city?: string;
  searchKeyword?: string;
  limitCount?: number;
}): Promise<FirestoreProfile[]> {
  let fetched: FirestoreProfile[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const profilesRef = collection(db, "profiles");
      const constraints: any[] = [
        where("isActive", "==", true),
        where("directoryEnabled", "==", true)
      ];

      if (options?.category && options.category !== "الكل") {
        constraints.push(where("category", "==", options.category));
      }
      if (options?.city && options.city !== "جميع المحافظات") {
        constraints.push(where("city", "==", options.city));
      }
      constraints.push(limit(options?.limitCount || 50));

      const q = query(profilesRef, ...constraints);
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        fetched = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as FirestoreProfile[];
      }
    } catch (error) {
      console.warn("[SHAM360] Firestore directory query failed. Falling back to sample directory items:", error);
    }
  }

  // Combine Firestore results with sample profiles to ensure vibrant directory listings
  const combinedMap = new Map<string, FirestoreProfile>();
  
  // Add sample directory items
  for (const sample of SAMPLE_DIRECTORY_PROFILES) {
    combinedMap.set(sample.slug, sample);
  }

  // Add or override with live Firestore profiles
  for (const item of fetched) {
    combinedMap.set(item.slug || item.id, item);
  }

  let results = Array.from(combinedMap.values());

  // Apply filters in-memory for comprehensive Arabic substring and token search
  if (options?.category && options.category !== "الكل") {
    results = results.filter((p) => p.category?.toLowerCase() === options.category?.toLowerCase());
  }

  if (options?.city && options.city !== "جميع المحافظات") {
    results = results.filter((p) => p.city?.toLowerCase() === options.city?.toLowerCase());
  }

  if (options?.searchKeyword && options.searchKeyword.trim()) {
    const kw = options.searchKeyword.toLowerCase().trim();
    results = results.filter((p) => {
      return (
        (p.name && p.name.toLowerCase().includes(kw)) ||
        (p.nameEn && p.nameEn.toLowerCase().includes(kw)) ||
        (p.title && p.title.toLowerCase().includes(kw)) ||
        (p.category && p.category.toLowerCase().includes(kw)) ||
        (p.city && p.city.toLowerCase().includes(kw)) ||
        (p.bio && p.bio.toLowerCase().includes(kw)) ||
        (p.location && p.location.toLowerCase().includes(kw))
      );
    });
  }

  return results;
}

/**
 * Creates a new profile record in the Firestore 'profiles' collection.
 */
export async function createProfile(
  data: Omit<FirestoreProfile, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const generatedId = `profile_${Date.now()}`;
  const payload: FirestoreProfile = {
    ...data,
    id: generatedId,
    directoryEnabled: data.directoryEnabled ?? false,
    isActive: data.isActive ?? true,
    isVerified: data.isVerified ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const profilesRef = collection(db, "profiles");
      const newDocRef = doc(profilesRef);
      payload.id = newDocRef.id;
      payload.createdAt = serverTimestamp();
      payload.updatedAt = serverTimestamp();
      await setDoc(newDocRef, payload);
      return newDocRef.id;
    } catch (error) {
      console.warn("[SHAM360] Firestore write failed, saving locally:", error);
    }
  }

  // Local fallback storage
  if (data.ownerUid) {
    localStorage.setItem(`sham360_profile_${data.ownerUid}`, JSON.stringify(payload));
  }
  return payload.id;
}

/**
 * Updates an existing profile record in the Firestore 'profiles' collection.
 */
export async function updateProfile(id: string, data: Partial<FirestoreProfile>): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "profiles", id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return;
    } catch (error) {
      console.warn(`[SHAM360] Firestore update failed for ${id}, syncing locally:`, error);
    }
  }

  // Local fallback storage for offline/demo operation
  if (data.ownerUid) {
    const existing = localStorage.getItem(`sham360_profile_${data.ownerUid}`);
    const parsed = existing ? JSON.parse(existing) : { id };
    const updated = { ...parsed, ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(`sham360_profile_${data.ownerUid}`, JSON.stringify(updated));
  }
}

/**
 * Lists sample slugs for UI quick-testing and development.
 */
export function getAllSampleSlugs(): { slug: string; label: string; type: "business" | "individual" }[] {
  return [
    { slug: "al-yasmeen", label: "مطعم وبيت الياسمين (Business)", type: "business" },
    { slug: "akram", label: "م. أكرم دمشقي (Individual)", type: "individual" }
  ];
}
