import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { StoreProduct } from "../types";
import {
  officialSmartCardImg,
  mirrorSmartCardImg,
  standCloseupImg,
  keychainCloseupImg,
  phoneStickerImg
} from "../data/productsCatalogData";

export const INITIAL_STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "prod-matte-card",
    nameAr: "بطاقة SHAM360 المعدنية والمطفية الفاخرة (Matte Pro)",
    nameEn: "SHAM360 Matte Pro NFC Smart Business Card",
    subtitleAr: "البطاقة الأكثر طلباً للمدراء التنفيذيين والأطباء والمهندسين في سوريا",
    subtitleEn: "Flagship executive business card with high-speed NFC microchip",
    category: "cards",
    stockStatus: "in_stock",
    stockCount: 45,
    imageSrc: officialSmartCardImg,
    badgeAr: "الأكثر مبيعاً",
    badgeEn: "Best Seller",
    badgeColor: "#0066FF",
    featuresAr: [
      "شريحة NTAG216 مشفرة ومحمية من التلف",
      "طباعة حرارية ليزرية مقاومة للماء والخدش",
      "رمز QR ديناميكي دائم على الجانب الخلفي",
      "تحديث مجاني غير محدود لبيانات الملف السحابي مدى الحياة"
    ],
    featuresEn: [
      "High capacity encrypted NTAG216 microchip",
      "Waterproof, scratch-resistant laser UV finish",
      "Dynamic permanent QR code on reverse side",
      "Lifetime unlimited cloud data updates"
    ],
    idealForAr: "المهندسين، الأطباء، المدراء، وأصحاب المهن الحرة",
    idealForEn: "Executives, doctors, engineers, and consultants",
    descriptionAr: "بطاقة عمل ذكية تدعم اللمس الفوري (NFC Tap) على جميع أجهزة الآيفون والأندرويد دون الحاجة لأي تطبيق.",
    descriptionEn: "Instant tap smart card compatible with all modern smartphones without requiring any client app.",
    isFeatured: true
  },
  {
    id: "prod-mirror-card",
    nameAr: "بطاقة المرآة الملكية الفاخرة (Royal Mirror Silver & Gold)",
    nameEn: "Royal Mirror NFC Smart Luxury Card",
    subtitleAr: "إصدار النخبة المصقول بلمعة المرآة العاكسة وشعار محفور بدقة",
    subtitleEn: "Reflective mirror finish luxury card with precision engraving",
    category: "cards",
    stockStatus: "in_stock",
    stockCount: 22,
    imageSrc: mirrorSmartCardImg,
    badgeAr: "إصدار ملكي",
    badgeEn: "Royal Edition",
    badgeColor: "#F59E0B",
    featuresAr: [
      "وجه عاكس فاخر بتأثير المرآة الفضية أو الذهبية",
      "حواف دائرية ناعمة مصقولة بالليزر",
      "توافق فوري فائق الحساسية مع هواتف iPhone و Samsung",
      "رابط تشفيري مقاوم للنسخ"
    ],
    featuresEn: [
      "Reflective mirror silver/gold finish",
      "Laser polished ergonomic edges",
      "Ultra-sensitive instant tap sensor",
      "Cryptographic anti-cloning token"
    ],
    idealForAr: "كبار الشخصيات، رجال الأعمال، ومؤسسو الشركات",
    idealForEn: "VIPs, business leaders, and founders",
    descriptionAr: "إصدار متميز بتصميم يعكس الفخامة والأناقة في اللقاءات الرسمية واجتماعات الأعمال.",
    descriptionEn: "Premium luxury edition designed to impress during executive meetings and formal events.",
    isFeatured: true
  },
  {
    id: "prod-acrylic-stand",
    nameAr: "ستاند الطاولات والمكاتب التفاعلي (Interactive NFC & QR Counter Stand)",
    nameEn: "Interactive Tabletop NFC & QR Countertop Stand",
    subtitleAr: "لزيادة تقييمات Google Maps ومتابعي السوشال ميديا بنقرة هاتف واحدة",
    subtitleEn: "Instant Google Maps reviews & social follow stand for counters",
    category: "stands",
    stockStatus: "in_stock",
    stockCount: 30,
    imageSrc: standCloseupImg,
    badgeAr: "للمطاعم والمتاجر",
    badgeEn: "For Venues",
    badgeColor: "#10B981",
    featuresAr: [
      "أكريليك مصفح عالي الشفافية ومقاوم للصدمات",
      "نواة NFC مزدوجة لاستشعار الهاتف من أي زاوية",
      "رمز QR مركزي ملون بدقة عالية",
      "قاعدة ثابتة مصممة لمكاتب الاستقبال وطاولات المطاعم"
    ],
    featuresEn: [
      "High transparency impact-resistant acrylic",
      "Dual NFC core for 360-degree angle tap",
      "High resolution central colored QR code",
      "Weighted anti-slip base for restaurant tables and counters"
    ],
    idealForAr: "المطاعم، المقاهي، العيادات، الفنادق، وصالات العرض",
    idealForEn: "Restaurants, cafes, clinics, hotels, and boutiques",
    descriptionAr: "الحل الأمثل لمضاعفة تقييمات Google خمس نجوم وزيادة المبيعات بضغطة زر واحدة من الزبائن.",
    descriptionEn: "The ultimate tool to accelerate 5-star Google reviews and customer engagement on counter tops.",
    isFeatured: true
  },
  {
    id: "prod-smart-keychain",
    nameAr: "ميدالية المفاتيح الذكية المقاومة للماء (Compact Smart Keychain)",
    nameEn: "Compact Waterproof NFC Smart Keychain",
    subtitleAr: "هويتك الرقمية وبطاقة تواصلك معك في كل مكان على مدار اليوم",
    subtitleEn: "Pocket-sized digital identity always attached to your keys",
    category: "keychains",
    stockStatus: "in_stock",
    stockCount: 60,
    imageSrc: keychainCloseupImg,
    badgeAr: "خفيف وعملي",
    badgeEn: "Everyday Carry",
    badgeColor: "#6366F1",
    featuresAr: [
      "هيكل راتنجي إيبوكسي مقاوم للماء والصدمات 100%",
      "حلقة معدنية متينة سهلة التعليق بالمفاتيح أو الحقيبة",
      "وزن خفيف جداً (أقل من 8 غرامات)",
      "شريحة NFC مدمجة تعمل دون بطارية مدى الحياة"
    ],
    featuresEn: [
      "100% waterproof shockproof epoxy resin",
      "Sturdy metallic ring for bags and car keys",
      "Ultra lightweight under 8 grams",
      "Battery-free lifetime passive NFC chip"
    ],
    idealForAr: "المطورين، الشباب، الرياضيين، ورواد الأعمال الدائمي التنقل",
    idealForEn: "Athletes, dynamic professionals, and frequent travelers",
    descriptionAr: "ميدالية مفاتيح مدمجة تخزن جميع تفاصيلك وتتيح مشاركتها فور ملامستها لأي هاتف محمول.",
    descriptionEn: "Compact EDC keychain that holds your full profile and shares it upon contact with any phone.",
    isFeatured: false
  },
  {
    id: "prod-phone-tag",
    nameAr: "ستيكر التاغ الذكي خلف الهواتف (Smart Phone Back Tag)",
    nameEn: "Micro Adhesive Smart Phone Back NFC Tag",
    subtitleAr: "يلتصق خلف هاتفك المحمول أو الكفر لتبادل بياناتك دون حمل بطاقة",
    subtitleEn: "Adhesive micro tag attached directly to your smartphone case",
    category: "tags",
    stockStatus: "in_stock",
    stockCount: 80,
    imageSrc: phoneStickerImg,
    badgeAr: "فائق الصغر",
    badgeEn: "Ultra Slim",
    badgeColor: "#EC4899",
    featuresAr: [
      "سماكة نحيفة جداً (أقل من 0.4 مم)",
      "طبقة حماية عازلة للتداخل المغناطيسي (Anti-Metal Layer)",
      "لاصق 3M قوي جداً لا يترك أثراً عند الإزالة",
      "يعمل من فوق كفرات الحماية البلاستيكية والجلدية"
    ],
    featuresEn: [
      "Ultra-thin profile under 0.4mm",
      "Anti-metal magnetic isolation layer",
      "Residue-free industrial 3M adhesive",
      "Transmits effortlessly through phone cases"
    ],
    idealForAr: "الجميع - يحول هاتفك إلى جهاز إرسال بطاقة عمل ذكية",
    idealForEn: "Everyone - turns any smartphone into an active digital business card transmitter",
    descriptionAr: "تاغ لاصق مصمم بعازل مغناطيسي خاص ليعمل بدقة وكفاءة عند إلصاقه مباشرة على ظهر الهاتف.",
    descriptionEn: "Specialized anti-metal tag designed to work seamlessly on the rear of any smartphone.",
    isFeatured: false
  }
];

let memoryProducts: StoreProduct[] = [...INITIAL_STORE_PRODUCTS];

/**
 * Fetches all products from Firestore with fallback to default catalog.
 */
export async function getAllStoreProducts(): Promise<StoreProduct[]> {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "products");
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const firestoreList: StoreProduct[] = [];
        snap.forEach((docSnap) => {
          firestoreList.push({ id: docSnap.id, ...docSnap.data() } as StoreProduct);
        });
        const idMap = new Map<string, StoreProduct>();
        INITIAL_STORE_PRODUCTS.forEach((p) => idMap.set(p.id, p));
        firestoreList.forEach((p) => idMap.set(p.id, p));
        memoryProducts = Array.from(idMap.values());
        return memoryProducts;
      }
    } catch (err) {
      console.warn("[SHAM360 Products] Firestore fetch error:", err);
    }
  }

  return memoryProducts;
}

/**
 * Saves or updates a product in Firestore and local memory.
 */
export async function saveStoreProduct(product: StoreProduct): Promise<StoreProduct> {
  const safeId = product.id || `prod-${Date.now()}`;
  const record: StoreProduct = { ...product, id: safeId };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "products", safeId);
      await setDoc(docRef, record, { merge: true });
    } catch (err) {
      console.warn("[SHAM360 Products] Firestore save error:", err);
    }
  }

  const idx = memoryProducts.findIndex((p) => p.id === safeId);
  if (idx >= 0) {
    memoryProducts[idx] = record;
  } else {
    memoryProducts.unshift(record);
  }

  return record;
}

/**
 * Deletes a product from Firestore and local memory.
 */
export async function deleteStoreProduct(productId: string): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "products", productId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("[SHAM360 Products] Firestore delete error:", err);
    }
  }

  memoryProducts = memoryProducts.filter((p) => p.id !== productId);
  return true;
}
