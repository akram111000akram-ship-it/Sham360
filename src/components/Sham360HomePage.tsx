import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Instagram,
  Facebook,
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
  Navigation,
  CreditCard,
  Building2,
  UserCheck,
  ArrowUpRight,
  Copy,
  ShieldCheck,
  Zap,
  Radio,
  Layers,
  Smartphone,
  Send,
  Menu,
  CheckCircle,
  Truck,
  Crown,
  Eye,
  Wifi,
  Sliders
} from "lucide-react";
import { useRouter } from "../services/router";
import { useLanguage } from "../services/LanguageContext";
import { Logo } from "./Logo";
import { Sham360OfficialCard, CardMaterialTheme } from "./card/Sham360OfficialCard";
import { HeroNFCTapSimulation } from "./HeroNFCTapSimulation";
import { Sham360HeroNFCExperience } from "./Sham360HeroNFCExperience";
import cardOnStandImg from "../assets/images/sham360_card_on_stand_1788910850957.jpg";
import officialSmartCardImg from "../assets/images/sham360_official_smart_card_1788815373165.jpg";
import mirrorSmartCardImg from "../assets/images/sham360_mirror_smart_card_1788907318921.jpg";
import standCloseupImg from "../assets/images/sham360_desktop_stand_closeup_1788814392502.jpg";
import keychainCloseupImg from "../assets/images/sham360_keychain_closeup_1788814408393.jpg";
import phoneStickerImg from "../assets/images/sham360_phone_sticker_1788906961886.jpg";

// ==============================================================================
// 1. DATA MODELS & MOCK DATA
// ==============================================================================

export interface HardwareProduct {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  materials: string[];
  materialsEn?: string[];
  specs: string[];
  specsEn?: string[];
  badge?: string;
  badgeEn?: string;
  badgeColor?: string;
  imageUrl: string;
  accentColor: string;
  popular?: boolean;
  category: "cards" | "stands" | "keychains" | "stickers";
  idealFor: string;
  idealForEn?: string;
  interactionType: string;
  interactionTypeEn?: string;
  frontDescription?: string;
  frontDescriptionEn?: string;
  backDescription?: string;
  backDescriptionEn?: string;
}

export interface DirectoryItem {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  title: string;
  titleEn?: string;
  companyName?: string;
  companyNameEn?: string;
  avatarUrl: string;
  coverUrl: string;
  isVerified: boolean;
  city: string;
  cityEn?: string;
  categoryLabel: string;
  categoryLabelEn?: string;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
  email?: string;
  website?: string;
  location?: string;
  instagram?: string;
}

export const HARDWARE_PRODUCTS: HardwareProduct[] = [
  {
    id: "card-sham360-official",
    name: "بطاقة الأعمال الذكية الرسمية SHAM360 (الوجهين)",
    nameEn: "SHAM360 Dual-Sided Official Smart Card",
    subtitle: "الوجه الأمامي: كحلي ملكي بشعار SHAM360 • الوجه الخلفي: أبيض ناصع بمنصات التواصل ونقر NFC فوري",
    subtitleEn: "Front: Royal Navy with SHAM360 Logo • Back: Crisp White with Social Platforms & Instant NFC Tap",
    description:
      "البطاقة الذكية الأساسية والأكثر طلباً لرواد الأعمال والمدراء. تمتاز بوجه كحلي ملكي راقٍ يحمل الشعار وهوية العمل مع شريحة NFC المدمجة، ووجه خلفي ناصع البياض يضم منصات وقنوات التواصل المباشر وهوية رقمية معتمدة تعمل بالنقر الفوري NFC بلمسة واحدة.",
    descriptionEn:
      "The premier certified smart NFC card for executives and business leaders. Features a luxurious royal navy front with the official logo and embedded NFC chip, paired with a crisp white back displaying direct social platforms and instant one-touch contactless NFC tap.",
    materials: ["بلاستيك غير لامع فاخر (Matte PVC)", "طباعة حرارية UV مضادة للبهتان والخدوش", "شريحة NTAG216 مشفرة 888 بايت"],
    materialsEn: ["Matte Luxury PVC", "UV Thermal Scratch-Resistant Print", "Encrypted NTAG216 Chip (888 Bytes)"],
    specs: [
      "الوجه الأمامي: كحلي ملكي مع شعار SHAM360 الفضي وهوائي NFC مدمج",
      "الوجه الخلفي: أبيض ناصع يضم شبكات التواصل الرسمية بهوية رقمية متكاملة",
      "شريحة NTAG216 مشفرة تستجيب بنقر NFC فوري بلمسة واحدة خلال 0.1 ثانية",
      "زر حفظ جهة الاتصال المباشر (vCard) داخل هاتف العميل بدون تطبيقات",
      "تعديل البيانات والروابط مجاناً سحابياً في أي وقت مدى الحياة"
    ],
    specsEn: [
      "Front Face: Royal Navy with silver SHAM360 insignia & embedded NFC antenna",
      "Back Face: Crisp white featuring verified official social channels and digital profiles",
      "Encrypted NTAG216 chip responding to instant contactless NFC tap in 0.1 seconds",
      "One-touch 'Save Contact' (.vcf) directly into client's phone address book",
      "Free lifetime cloud data updates anytime without reprinting"
    ],
    badge: "البطاقة الرسمية الأكثر طلباً",
    badgeEn: "Official Best-Seller",
    badgeColor: "bg-blue-600/10 text-blue-700 border-blue-200",
    imageUrl: officialSmartCardImg,
    accentColor: "#0066FF",
    popular: true,
    category: "cards",
    idealFor: "رواد الأعمال، الأطباء، المحامين، المهندسين، والمدراء التنفيذيين",
    idealForEn: "Entrepreneurs, Physicians, Attorneys, Engineers, and C-Level Executives",
    interactionType: "نقر NFC فوري ذكي",
    interactionTypeEn: "Instant Smart NFC Tap",
    frontDescription: "واجهة رسمية كحلية ملكية بشعار SHAM360 وهوية عملك مع شريحة NFC للنقر الفوري",
    frontDescriptionEn: "Executive royal navy face with SHAM360 insignia & instant NFC contactless tap",
    backDescription: "واجهة بيضاء أنيقة تضم منصات وقنوات التواصل المباشر وتعمل بالنقر الفوري NFC بلمسة واحدة",
    backDescriptionEn: "Clean white face featuring direct social channels and verified identity operating via instant NFC tap"
  },
  {
    id: "card-sham360-mirror",
    name: "بطاقة المرآة الذكية الفاخرة (Luxury Mirror Edition)",
    nameEn: "SHAM360 Posh Mirror NFC Smart Card",
    subtitle: "الوجه الأمامي: كحلي ملكي رسمي • الوجه الخلفي: مرآة كرومية نقية وعملية (Posh & Luxurious)",
    subtitleEn: "Front: Royal Navy Official • Back: Chrome Reflective Mirror (Posh & Luxurious)",
    description:
      "إصدار أرستقراطي فخم وجديد كلياً. يمنحك الواجهة الرسمية الكحلية الأنيقة بشعار SHAM360 ونقر NFC من الأمام، بينما الوجه الخلفي عبارة عن مرآة زجاجية كرومية نقية وعاكسة تماماً لتعديل المظهر الشخصي في أي لحظة مع تقنية النقر الفوري الذكي.",
    descriptionEn:
      "A prestigious, ultra-luxury edition. Provides the executive navy front face with NFC tap, and an ultra-pure chrome reflective mirror on the back for personal grooming and touch-ups on the go, powered by instant smart tap technology.",
    materials: ["زجاج كرومي مقسى عاكس 100% ومضاد للخدش", "شريحة NTAG داخلية فائقة العزل", "حواف ليزرية مصقولة بملمس ناعم"],
    materialsEn: ["100% Scratch-Resistant Tempered Chrome Glass", "Internally Shielded NTAG Chip", "Diamond-Polished Laser Edges"],
    specs: [
      "الوجه الأمامي: كحلي ملكي رسمي يحمل هويتك وشعار SHAM360 الفضي",
      "الوجه الخلفي: مرآة كرومية عاكسة فائقة النقاء تفيد في تعديل المظهر الشخصي",
      "تقنية النقر الذاتي الفوري المتطورة لمشاركة جهات الاتصال والملفات بلمسة واحدة",
      "مظهر فاخر وأنيق جداً (Posh) يخطف الأنظار في الاجتماعات والمناسبات الراقية",
      "شريحة ذكية مبرمجة سحابياً متوافقة مع جميع أجهزة iPhone و Android"
    ],
    specsEn: [
      "Front: Royal navy business face with silver SHAM360 branding",
      "Back: High-clarity chrome reflective mirror for executive appearance touch-ups",
      "Instant contactless tap technology for direct sharing of contacts and profiles",
      "Distinguished Posh luxury design commanding attention in VIP meetings",
      "Cloud-programmed smart chip compatible with all iPhones and Androids"
    ],
    badge: "إصدار المرآة الفاخر (Posh)",
    badgeEn: "Posh Mirror Edition",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-300",
    imageUrl: mirrorSmartCardImg,
    accentColor: "#D97706",
    popular: true,
    category: "cards",
    idealFor: "الشخصيات الراقية، سيدات ورجال الأعمال، واللقاءات والمناسبات الرسمية",
    idealForEn: "VIP Executives, Business Leaders, Diplomats, and Prestigious Events",
    interactionType: "نقر NFC فوري + مرآة عاكسة نقية",
    interactionTypeEn: "Instant NFC Tap + Pure Chrome Mirror",
    frontDescription: "واجهة كحلية ملكية رسمية بشعار SHAM360 لمشاركة بروفايلك وبيانات اتصالك بنقرة",
    frontDescriptionEn: "Royal navy face with SHAM360 logo for one-tap contact and profile sharing",
    backDescription: "مرآة كرومية نقية 100% وعاكسة للاستخدام الشخصي اليومي مع هوية رقمية ذكية بالنقر الفوري",
    backDescriptionEn: "100% crystal chrome mirror for everyday grooming with instant contactless smart tap"
  },
  {
    id: "stand-sham360-acrylic",
    name: "ستاند المكاتب والمطاعم الذكي (Desk & Counter Stand)",
    nameEn: "Smart NFC Counter & Table Stand",
    subtitle: "أكريليك نقي مقوى بقاعدة خشب زان لتقييمات Google والمنيو الرقمي",
    subtitleEn: "Reinforced Acrylic with Beech Wood Base for Google Reviews & Digital Menu",
    description:
      "ضاعف تقييمات Google بـ 5 نجوم واعرض قائمة طعامك أو بروفايل منشأتك بلمسة هاتف واحدة على الكاونتر أو طاولة الاستقبال في المطاعم والعيادات والشركات.",
    descriptionEn:
      "Multiply your 5-star Google Maps reviews and display your digital menu or verified business profile with a single phone tap on reception desks and dining tables.",
    materials: ["أكريليك بلوري شفاف عالي النقاء 4 مم", "قاعدة خشبية طبيعية فاخرة", "طباعة UV ليزرية مقاومة للرطوبة والتعقيم"],
    materialsEn: ["4mm High-Clarity Crystal Acrylic", "Natural Hardwood Base", "UV Moisture & Sanitizer-Proof Print"],
    specs: [
      "شريحتان مدمجتان لتقييمات Google الفورية وتصفح المنيو الرقمي",
      "رمز QR احتياطي عالي الدقة بالليزر لكافة الكاميرات",
      "زيادة تقييمات خرائط Google بأكثر من 300%",
      "مقاومة تامة للزيوت والرطوبة وسهلة التعقيم اليومي",
      "لا يحتاج شحن أو أسلاك نهائياً مدى الحياة"
    ],
    specsEn: [
      "Dual embedded chips for instant Google 5-Star Reviews & digital menu",
      "Backup high-resolution laser QR code for all smartphone cameras",
      "Increases Google Maps reviews and local SEO ranking by over 300%",
      "Complete resistance to moisture, oils, and daily hospitality sanitation",
      "100% wireless, zero charging or battery cables required"
    ],
    badge: "للكافيهات والمطاعم والعيادات",
    badgeEn: "For Cafes, Clinics & Tables",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
    imageUrl: standCloseupImg,
    accentColor: "#10B981",
    popular: true,
    category: "stands",
    idealFor: "المطاعم، الكافيهات، صالونات التجميل، الفنادق، ومكاتب الاستقبال",
    idealForEn: "Restaurants, Cafes, Beauty Salons, Hotels, and Corporate Reception Desks",
    interactionType: "نقر NFC على الكاونتر + مسح QR",
    interactionTypeEn: "Counter NFC Tap + Instant QR Scan",
    frontDescription: "واجهة أكريليك فاخرة لتقييمات Google والمنيو الرقمي",
    frontDescriptionEn: "Premium acrylic display for Google Reviews & interactive digital profile",
    backDescription: "قاعدة خشبية صلبة وشريحة اتصال ذكية تدوم مدى الحياة",
    backDescriptionEn: "Solid wooden base with lifetime passive contactless induction chip"
  },
  {
    id: "tag-sham360-keychain",
    name: "الميدالية الذكية للتنقل (NFC Smart Keychain)",
    nameEn: "SHAM360 Portable Smart Keychain",
    subtitle: "خفيفة وعملية للمفاتيح أو الحقيبة مع حلقة معدنية فاخرة",
    subtitleEn: "Compact & durable for keys or backpack with premium metal ring",
    description:
      "ميدالية ذكية أنيقة ترافقك في كل مكان لنقل ملفك الشخصي وبياناتك خلال ثوانٍ في المؤتمرات والفعاليات دون الحاجة لإخراج محفظتك أو بطاقتك.",
    descriptionEn:
      "A stylish, portable NFC smart tag that stays on your keychain. Share your digital contact info and profile in seconds at expos and meetings without opening your wallet.",
    materials: ["إيبوكسي صلب مقاوم للماء والصدمات", "حلقة فولاذية مضادة للصدأ", "شريحة NTAG مدمجة عازلة للمعادن"],
    materialsEn: ["Waterproof Shock-Resistant Hard Epoxy", "Stainless Steel Key Ring", "Anti-Metal Shielded NTAG Chip"],
    specs: [
      "نقر فوري 0.1 ثانية لمشاركة بروفايلك في الفعاليات والمؤتمرات",
      "حجم مدمج ومتين لا يتأثر بالسقوط أو الرطوبة",
      "لا تحتاج لأي بطارية أو شحن إطلاقاً",
      "متوافقة مع 100% من الهواتف الذكية الحديثة"
    ],
    specsEn: [
      "0.1-second contactless tap for instant networking at conferences",
      "Ultra-compact, drop-proof, and fully waterproof construction",
      "Zero battery, zero maintenance, lifetime passive induction",
      "100% compatible with modern iPhones and Android smartphones"
    ],
    badge: "خفيفة ومثالية للتنقل",
    badgeEn: "Compact & Portable",
    badgeColor: "bg-indigo-500/10 text-indigo-700 border-indigo-300",
    imageUrl: keychainCloseupImg,
    accentColor: "#6366F1",
    popular: false,
    category: "keychains",
    idealFor: "المسافرين، المندوبين، طلاب الجامعات، والمحترفين دائمي الحركة",
    idealForEn: "Travelers, Field Representatives, University Students, and Mobile Professionals",
    interactionType: "نقر NFC سريع مع المفاتيح",
    interactionTypeEn: "Fast Keychain NFC Tap",
    frontDescription: "شعار SHAM360 مع هوائي ذكي لنقل الملفات بلمسة",
    frontDescriptionEn: "SHAM360 emblem with tuned antenna for one-touch profile sharing",
    backDescription: "خامة إيبوكسي صلبة مضادة للصدمات والماء",
    backDescriptionEn: "Hardened epoxy shell resistant to drops, dust, and water"
  },
  {
    id: "sticker-sham360-phone",
    name: "ستيكر ولاصق الهواتف الذكي (NFC Phone Tag)",
    nameEn: "SHAM360 NFC Phone Back Sticker",
    subtitle: "لاصق رفيع 3M مع طبقة عزل كهرومغناطيسية توضع خلف هاتفك",
    subtitleEn: "Ultra-slim 3M adhesive with ferrite anti-metal shielding for phone back",
    description:
      "حول هاتفك الذكي نفسه إلى بطاقة أعمال! ألصق التاغ على ظهر هاتفك أو الكفر وشاركه فوراً مع أي هاتف آخر بمجرد الملامسة.",
    descriptionEn:
      "Transform your own smartphone into a smart business card! Attach this shielded NFC tag to the back of your phone or case for immediate contactless sharing.",
    materials: ["لاصق 3M أصلي قوي وقابل للإزالة دون أثر", "طبقة Ferrite عازلة للمعادن والبطارية", "سطح راتنجي ناعم واقٍ"],
    materialsEn: ["Genuine 3M Residue-Free Adhesive", "Ferrite Anti-Interference Barrier", "Protective Matte Dome"],
    specs: [
      "عزل تام عن إشارات بطارية ومعدن الهاتف يضمن دقة النقر",
      "مشاركة فورية دون فتح تطبيقات أو برامج",
      "سمك نحيف جداً أقل من 1 مم لا يشوه مظهر الهاتف",
      "متوافق مع جميع أجهزة iPhone و Android"
    ],
    specsEn: [
      "Complete anti-metal shielding ensures reliable tap through phone cases",
      "Instant tap-and-share with zero apps required",
      "Ultra-thin profile under 1mm preserves phone ergonomics",
      "Compatible with all iPhones and Android smartphones"
    ],
    badge: "سريع وعملي للهاتف",
    badgeEn: "Quick Phone Tap",
    badgeColor: "bg-rose-500/10 text-rose-700 border-rose-300",
    imageUrl: phoneStickerImg,
    accentColor: "#EC4899",
    popular: false,
    category: "stickers",
    idealFor: "من يفضل مشاركة ملفه من هاتفه مباشرة دون حمل بطاقة",
    idealForEn: "Anyone preferring to share identity directly from their phone with no physical card",
    interactionType: "نقر NFC ملصق على ظهر الهاتف",
    interactionTypeEn: "Phone-Mounted Contactless NFC Tap",
    frontDescription: "شعار SHAM360 الذكي المدمج في لاصق الهاتف",
    frontDescriptionEn: "SHAM360 smart micro-antenna embedded inside protective dome",
    backDescription: "لاصق 3M قوي مضاد للحرارة مع طبقة عزل كهرومغناطيسية",
    backDescriptionEn: "High-grade 3M adhesive layer with ferrite interference shield"
  }
];

export const TEASER_DIRECTORY: DirectoryItem[] = [
  {
    id: "yasmeen-01",
    slug: "al-yasmeen",
    name: "مطعم وفندق قصر الياسمين",
    nameEn: "Al-Yasmeen Palace Hotel & Restaurant",
    title: "ضيافة دمشقية عريقة & مأكولات شرقية",
    titleEn: "Heritage Damascene Hospitality & Fine Dining",
    companyName: "مجموعة الياسمين السياحية",
    companyNameEn: "Al-Yasmeen Hospitality Group",
    avatarUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    isVerified: true,
    city: "دمشق القديمة - باب توما",
    cityEn: "Old Damascus - Bab Touma",
    categoryLabel: "أعمال وشركات موثقة",
    categoryLabelEn: "Verified Businesses",
    rating: 4.9,
    reviewCount: 342,
    phone: "+963 11 223 4567",
    whatsapp: "+963944111222",
    email: "contact@alyasmeen-damascus.sy",
    website: "https://alyasmeen-damascus.sy",
    location: "دمشق القديمة، حارة الجوانية",
    instagram: "https://instagram.com/alyasmeen_syria"
  },
  {
    id: "eng-akram-02",
    slug: "akram-engineer",
    name: "م. أكرم الحلبي",
    nameEn: "Eng. Akram Al-Halabi",
    title: "كبير مهندسي الأنظمة الذكية & IoT",
    titleEn: "Lead Smart Systems & IoT Architect",
    companyName: "تقنيات المستقبل الذكية",
    companyNameEn: "Future Smart Technologies",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    isVerified: true,
    city: "دمشق - المزة أوتوستراد",
    cityEn: "Damascus - Mazzeh Highway",
    categoryLabel: "ملفات رقمية ذكية",
    categoryLabelEn: "Smart Digital Profiles",
    rating: 5.0,
    reviewCount: 48,
    phone: "+963 933 888 999",
    whatsapp: "+963933888999",
    email: "akram@smart-syria.com",
    location: "دمشق، برج تبارك التجاري",
    instagram: "https://instagram.com/akram.tech.sy"
  },
  {
    id: "dr-noor-04",
    slug: "dr-noor-aesthetic",
    name: "د. نور الهدى كنعان",
    nameEn: "Dr. Nour Al-Huda Kanaan",
    title: "استشارية الجلدية والتجميل الطبي",
    titleEn: "Consultant Dermatologist & Aesthetic Specialist",
    companyName: "عيادات راديانس كلينك",
    companyNameEn: "Radiance Medical Clinics",
    avatarUrl:
      "https://images.unsplash.com/photo-1594824813511-20a7b4618e1d?auto=format&fit=crop&w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    isVerified: true,
    city: "حلب - الشهباء الجديدة",
    cityEn: "Aleppo - New Shahbaa",
    categoryLabel: "أعمال وشركات موثقة",
    categoryLabelEn: "Verified Businesses",
    rating: 4.9,
    reviewCount: 215,
    phone: "+963 21 267 8900",
    whatsapp: "+963955444333",
    email: "booking@dr-noor.sy",
    location: "حلب، الشهباء الجديدة، مجمع الشفاء",
    instagram: "https://instagram.com/dr.noor.aesthetic"
  }
];

// ==============================================================================
// 2. HELPER FUNCTIONS (vCard Generator & WhatsApp Direct Links)
// ==============================================================================

const downloadHeroVCard = () => {
  const vCardContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN;CHARSET=UTF-8:م. أكرم الحلبي",
    "N;CHARSET=UTF-8:الحلبي;أكرم;;م.;",
    "ORG;CHARSET=UTF-8:SHAM360 Verified Business",
    "TITLE;CHARSET=UTF-8:كبير مهندسي الأنظمة الذكية",
    "TEL;TYPE=CELL,VOICE:+963 933 888 999",
    "EMAIL;TYPE=INTERNET,WORK:akram@smart-syria.com",
    "ADR;TYPE=WORK;CHARSET=UTF-8:;;;دمشق - المزة أوتوستراد;;;",
    "REV:" + new Date().toISOString(),
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + vCardContent], {
    type: "text/vcard;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "akram-sham360.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const getWhatsAppOrderUrl = (productName?: string) => {
  const basePhone = "963933888999";
  const message = productName
    ? `مرحباً SHAM360، أود الاستفسار وطلب منتج: (${productName}). أرجو تزويدي بالخيارات المتاحة وطريقة الدفع والتسليم في سوريا.`
    : "مرحباً SHAM360، أرغب في طلب بطاقة NFC الذكية وإنشاء ملفي الرقمي الموثق.";
  return `https://wa.me/${basePhone}?text=${encodeURIComponent(message)}`;
};

// ==============================================================================
// 3. SUB-COMPONENT: Sham360DirectoryCard (Exact Modern-Style Archetype)
// ==============================================================================

export const Sham360DirectoryCard: React.FC<{
  item: DirectoryItem;
  onSelect?: (item: DirectoryItem) => void;
}> = ({ item, onSelect }) => {
  const { isAr } = useLanguage();
  const cleanPhone = item.phone.replace(/[^0-9]/g, "");
  const cleanWhatsapp = item.whatsapp.replace(/[^0-9]/g, "") || cleanPhone;

  const displayName = !isAr && item.nameEn ? item.nameEn : item.name;
  const displayTitle = !isAr && item.titleEn ? item.titleEn : item.title;
  const displayCompany = !isAr && item.companyNameEn ? item.companyNameEn : item.companyName;
  const displayCity = !isAr && item.cityEn ? item.cityEn : item.city;
  const displayCategory = !isAr && item.categoryLabelEn ? item.categoryLabelEn : item.categoryLabel;

  return (
    <div className="w-full bg-white rounded-[32px] border border-slate-200/80 hover:border-[#0066FF]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group font-sans text-start">
      <div>
        {/* Cover Banner */}
        <div className="relative h-32 sm:h-36 w-full bg-slate-100 overflow-hidden">
          <img
            src={item.coverUrl}
            alt={displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

          {/* Category Tag */}
          <div className="absolute top-3 start-3">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-xs border border-white/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>{displayCategory}</span>
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-3 end-3">
            <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-amber-700 shadow-xs border border-white/80 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono">{item.rating.toFixed(1)}</span>
            </span>
          </div>
        </div>

        {/* Overlapping Avatar & Info */}
        <div className="px-5 pt-0 pb-3 relative">
          <div className="-mt-10 mb-2 flex items-end justify-between">
            <div className="relative">
              <div className="w-18 h-18 rounded-full p-1 bg-white shadow-md border border-slate-100">
                <img
                  src={item.avatarUrl}
                  alt={displayName}
                  className="w-full h-full rounded-full object-cover bg-slate-50"
                />
              </div>

              {item.isVerified && (
                <div
                  className="absolute bottom-0 end-0 bg-white rounded-full p-0.5 shadow-sm"
                  title={isAr ? "عضو موثق في دليل SHAM360" : "Verified SHAM360 Member"}
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
              <span className="truncate max-w-[120px]">{displayCity}</span>
            </span>
          </div>

          {/* Name & Title */}
          <div className="space-y-0.5 mb-3">
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-1">
              {displayName}
            </h3>
            <p className="text-xs font-semibold text-slate-600 line-clamp-1">
              {displayTitle}
            </p>
            {displayCompany && (
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {displayCompany}
              </p>
            )}
          </div>

          {/* Verified Badge Tag */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] font-bold text-[#0066FF]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{isAr ? "عضو موثق في دليل SHAM360" : "Verified SHAM360 Directory Member"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Contact Actions */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {cleanWhatsapp && (
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isAr ? "محادثة واتساب" : "WhatsApp Chat"}
              title={isAr ? "محادثة واتساب" : "WhatsApp Chat"}
              className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          {item.phone && (
            <a
              href={`tel:${item.phone}`}
              aria-label={isAr ? "اتصال مباشر" : "Direct Call"}
              title={isAr ? "اتصال مباشر" : "Direct Call"}
              className="w-8 h-8 rounded-full bg-blue-50 hover:bg-[#0066FF] text-[#0066FF] hover:text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelect && onSelect(item)}
          className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-[#0066FF] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>{isAr ? "عرض الملف" : "View Profile"}</span>
          <ChevronLeft className={`w-3.5 h-3.5 ${!isAr ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
};

// ==============================================================================
// 4. MAIN HOMEPAGE COMPONENT: Sham360HomePage
// ==============================================================================

export const Sham360HomePage: React.FC<{
  onNavigateToDirectory?: () => void;
  onNavigateToProfile?: (slug: string) => void;
}> = ({ onNavigateToDirectory, onNavigateToProfile }) => {
  const { navigate } = useRouter();
  const { isAr, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] =
    useState<HardwareProduct | null>(null);
  const [hardwareCategory, setHardwareCategory] = useState<"all" | "cards" | "stands" | "keychains">("all");
  const [simulatedTapActive, setSimulatedTapActive] = useState(false);
  const [simulatedTapSuccess, setSimulatedTapSuccess] = useState(false);
  const [previewActiveTab, setPreviewActiveTab] = useState<"card" | "vcard">("card");
  const [copiedLink, setCopiedLink] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText("https://sham360.online/p/akram-engineer");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F4F5F7] text-slate-900 font-sans antialiased selection:bg-[#0066FF] selection:text-white"
    >
      {/* -----------------------------------------------------------------
          HERO SECTION
          - High-Impact Headline
          - Physical NFC + Swiss SHAM360-style Digital Profile
          - Dual CTAs
          - Interactive Live Mockup of the SHAM360 Card
         ----------------------------------------------------------------- */}
      <section
        id="hero"
        className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Syrian Innovation Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping" />
                <span className="text-[#0066FF]">{isAr ? "SHAM360 الإطلاق الرسمي في سوريا" : "SHAM360 Official Launch in Syria"}</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 font-medium">{isAr ? "معايير التصميم السويسري" : "Swiss Design Standards"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.14]">
                {isAr ? (
                  <>
                    <span className="block text-slate-900 font-extrabold mb-1.5 sm:mb-2 text-2xl sm:text-4xl lg:text-[44px]">
                      بطاقات الأعمال الذكية ⚡
                    </span>
                    <span className="text-slate-950">وحضورك الرقمي </span>
                    <span className="relative inline-block text-[#0066FF] whitespace-nowrap">
                      الموثّق في سوريا
                      {/* Refined Hand-Crafted Underline Stroke */}
                      <svg
                        className="absolute -bottom-1.5 sm:-bottom-2 start-0 w-full h-3 text-[#0066FF]/30 pointer-events-none"
                        viewBox="0 0 100 12"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M1 9 C 25 3, 75 3, 99 9"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block text-slate-900 font-extrabold mb-1.5 sm:mb-2 text-2xl sm:text-4xl lg:text-[44px]">
                      Next-Gen Smart NFC Cards ⚡
                    </span>
                    <span className="text-slate-950">& Verified </span>
                    <span className="relative inline-block text-[#0066FF] whitespace-nowrap">
                      Digital Identity in Syria
                      {/* Refined Hand-Crafted Underline Stroke */}
                      <svg
                        className="absolute -bottom-1.5 sm:-bottom-2 start-0 w-full h-3 text-[#0066FF]/30 pointer-events-none"
                        viewBox="0 0 100 12"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M1 9 C 25 3, 75 3, 99 9"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {isAr ? (
                  <>
                    اجمع بين بطاقات الأعمال الفيزيائية الفاخرة المجهزة بتقنية النقر الفوري{" "}
                    <span className="font-semibold text-slate-900">NFC</span>، وملف رقمي تفاعلي
                    بمعايير سويسرية يتيح للعملاء حفظ رقمك وبياناتك وموقعك ومراجعات جوجل بنقرة واحدة،
                    دون الحاجة لأي تطبيق على هواتفهم.
                  </>
                ) : (
                  <>
                    Merge premium physical business cards equipped with instant contactless{" "}
                    <span className="font-semibold text-slate-900">NFC</span> with a Swiss-standard interactive
                    digital profile. Empower clients to save your contacts, location, and Google Reviews in one tap—with zero app downloads.
                  </>
                )}
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("hardware")}
                  className="px-7 py-4 rounded-2xl bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold text-sm shadow-xl shadow-[#0066FF]/25 flex items-center gap-2.5 transition-all hover:translate-y-[-2px] active:scale-95 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5 text-blue-200" />
                  <span>{isAr ? "استكشف المنتجات والبطاقات" : "Explore Smart NFC Hardware"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToDirectory) {
                      onNavigateToDirectory();
                    } else {
                      scrollToSection("directory");
                    }
                  }}
                  className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-xs flex items-center gap-2.5 transition-all hover:border-slate-300 cursor-pointer"
                >
                  <UserCheck className="w-5 h-5 text-[#0066FF]" />
                  <span>{isAr ? "تصفح الدليل الذكي" : "Browse Verified Directory"}</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                    <Radio className="w-4 h-4 text-[#0066FF]" />
                    <span>{isAr ? "نقرة فورية NFC" : "Instant NFC Tap"}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{isAr ? "متوافقة مع آيفون وأندرويد" : "iPhone & Android Ready"}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{isAr ? "توثيق رسمي" : "Official Verification"}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{isAr ? "شارة تحقق في الدليل الموحد" : "Blue badge in Directory"}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>{isAr ? "شحن سوري شامل" : "All-Syria Shipping"}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{isAr ? "تسليم لكافة المحافظات" : "Delivered to all cities"}</p>
                </div>
              </div>
            </div>

            {/* Right Showcase Column - SHAM360 SMART CARD TAPPING PHONE & SMART PROFILE REVEAL */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full select-none">
              <Sham360HeroNFCExperience isAr={isAr} />

              {/* Technical Luxury Feature Badges (Informational, No Buttons) */}
              <div className="w-full max-w-[450px] mt-3 grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">{isAr ? "تلامس في 0.22s" : "0.22s Contact Tap"}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? "استجابة لاسلكية فورية" : "Instant wireless reaction"}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">{isAr ? "بدون شحن أو بطارية" : "Zero Battery Needed"}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? "طاقة حث كهرومغناطيسي" : "Passive induction power"}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">{isAr ? "مقاومة للماء والخدش" : "Water & Scratch Proof"}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? "خامة كربونية متينة" : "Durable shielded build"}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-xs flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-bold text-slate-900">{isAr ? "آيفون & أندرويد" : "iPhone & Android"}</div>
                    <div className="text-[10px] text-slate-500">{isAr ? "بدون أي تطبيق مسبق" : "No companion app required"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 3: NFC HARDWARE SHOWCASE GRID
          - Products: Dual-Sided Official Card, Luxury Mirror Edition (Posh),
            Counter Stands, Keychains, Stickers
          - Filter categories: All, Cards, Stands, Keychains
          - Live Interactive NFC Tap Simulation & Quick Preview Modal
          - WhatsApp Direct Order & Link to Products Studio
         ----------------------------------------------------------------- */}
      <section
        id="hardware"
        className="py-16 sm:py-24 bg-white border-y border-slate-200/80 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-xs font-bold text-[#0066FF] border border-blue-100 shadow-xs">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isAr ? "عتاد النقر الفوري NFC • جودة وضمان سوري رسمي" : "Instant NFC Hardware • Official Quality & Guarantee"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
              {isAr ? "تشكيلة بطاقات وحلول SHAM360 الذكية" : "SHAM360 Smart NFC Card & Hardware Lineup"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? "منتجات مطورة بأعلى المواصفات: من البطاقة الرسمية ذات الوجهين وإصدار المرآة الفاخر (Posh Mirror)، إلى ستاندات التقييم للمطاعم والميداليات المحمولة."
                : "Engineered to the highest specifications: from dual-sided official smart cards and the Posh Mirror luxury edition, to restaurant Google review stands and portable keychains."}
            </p>

            {/* Interactive Category Filter Tabs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: isAr ? "كافة المنتجات (5)" : "All Products (5)", icon: Layers },
                { id: "cards", label: isAr ? "البطاقات الرسمية والفاخرة" : "Official & Luxury Cards", icon: Crown },
                { id: "stands", label: isAr ? "ستاندات المطاعم والمكاتب" : "Counter & Table Stands", icon: Building2 },
                { id: "keychains", label: isAr ? "الميداليات والملصقات" : "Keychains & Phone Tags", icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = hardwareCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setHardwareCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/20 scale-[1.02]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hardware Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HARDWARE_PRODUCTS.filter(
              (prod) =>
                hardwareCategory === "all" ||
                prod.category === hardwareCategory ||
                (hardwareCategory === "keychains" && prod.category === "stickers")
            ).map((prod) => (
              <div
                key={prod.id}
                className="bg-[#F8FAFC] rounded-[32px] border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-[#0066FF]/40 transition-all duration-300 group text-start relative"
              >
                <div>
                  {/* Product Image Stage */}
                  <div className="relative h-60 w-full bg-slate-100 overflow-hidden cursor-pointer"
                       onClick={() => {
                         setSelectedProductForModal(prod);
                         setSimulatedTapActive(false);
                         setSimulatedTapSuccess(false);
                       }}>
                    <img
                      src={prod.imageUrl}
                      alt={!isAr && prod.nameEn ? prod.nameEn : prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 start-3.5 end-3.5 flex items-center justify-between pointer-events-none">
                      {prod.badge && (
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-black text-slate-800 shadow-md border border-white/80 flex items-center gap-1.5">
                          {prod.id === "card-sham360-mirror" ? (
                            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                          )}
                          <span>{!isAr && prod.badgeEn ? prod.badgeEn : prod.badge}</span>
                        </span>
                      )}

                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                        <Wifi className="w-3 h-3 text-cyan-400" />
                        <span>0.1s NFC</span>
                      </span>
                    </div>

                    {/* Interactive Overlay Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-900/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductForModal(prod);
                          setSimulatedTapActive(false);
                          setSimulatedTapSuccess(false);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-[#0066FF] hover:text-white transition-all transform group-hover:scale-105 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-[#0066FF] group-hover:text-white" />
                        <span>{isAr ? "معاينة تفاعلية وتجربة النقر" : "Interactive Preview & Live Tap"}</span>
                      </button>
                    </div>

                    {/* Bottom Indicator on Image */}
                    <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
                      <span className="bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-lg">
                        {!isAr && prod.interactionTypeEn ? prod.interactionTypeEn : prod.interactionType}
                      </span>
                      <span className="text-[10px] text-white/80">{isAr ? "انقر للتكبير والتفاصيل" : "Click to expand details"}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        onClick={() => {
                          setSelectedProductForModal(prod);
                          setSimulatedTapActive(false);
                          setSimulatedTapSuccess(false);
                        }}
                        className="text-lg font-black text-slate-900 group-hover:text-[#0066FF] transition-colors cursor-pointer leading-snug"
                      >
                        {!isAr && prod.nameEn ? prod.nameEn : prod.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed">
                        {!isAr && prod.subtitleEn ? prod.subtitleEn : prod.subtitle}
                      </p>
                    </div>

                    {prod.id === "card-sham360-official" && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200/80 text-[#0066FF] text-[11px] font-black shadow-2xs">
                        <Wifi className="w-3.5 h-3.5 shrink-0" />
                        <span>{isAr ? "نقر NFC فوري فائق السرعة • اتصال رقمي بلمسة واحدة" : "Ultra-Fast Contactless NFC • Instant One-Touch Tap"}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {!isAr && prod.descriptionEn ? prod.descriptionEn : prod.description}
                    </p>

                    {/* Materials Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {((!isAr && prod.materialsEn ? prod.materialsEn : prod.materials) || []).slice(0, 2).map((mat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-200/70 text-[10px] font-semibold text-slate-700"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>

                    {/* Specs Checklist */}
                    <div className="space-y-2.5 pt-3.5 border-t border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-800 flex items-center justify-between">
                        <span className="tracking-tight">{isAr ? "أبرز المزايا التقنية:" : "Key Technical Features:"}</span>
                        <span className="text-[10px] font-semibold text-[#0066FF] px-2 py-0.5 rounded-md bg-blue-50/80 border border-blue-100">{isAr ? "بدون تطبيق" : "No App Required"}</span>
                      </span>
                      {((!isAr && prod.specsEn ? prod.specsEn : prod.specs) || []).slice(0, 3).map((spec, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 group/spec transition-colors">
                          <div className="w-4 h-4 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="leading-snug font-medium text-slate-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 bg-white border-t border-slate-200/80 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{isAr ? "برمجة سحابية وتوصيل فوري" : "Cloud Programming & Fast Delivery"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductForModal(prod);
                        setSimulatedTapActive(false);
                        setSimulatedTapSuccess(false);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-[#0066FF] font-bold text-xs flex items-center gap-1 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isAr ? "تفاصيل" : "Details"}</span>
                    </button>

                    <a
                      href={getWhatsAppOrderUrl(!isAr && prod.nameEn ? prod.nameEn : prod.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isAr ? "طلب مباشر" : "Order"}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Callout: Direct Link to Dedicated Products Page & 3D Studio */}
          <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-[#0A2540] rounded-[32px] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-700/50">
            <div className="space-y-2 text-start max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? "استوديو التخصيص الكامل متاح الآن" : "Full Customization Studio Now Available"}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isAr
                  ? "تريد معاينة البطاقة الرسمية أو إصدار المرآة (Posh) بنقاط تفاعلية؟"
                  : "Want to inspect the Official Card or Posh Mirror Edition interactively?"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr
                  ? "انتقل إلى صفحة المنتجات المخصصة لتجربة المحاكي التفاعلي، استعراض الوجهين الكحلي والمعدني، وحساب الخصومات للكميات والمجموعات."
                  : "Visit the dedicated Products Page to test the interactive simulator, inspect both dual-sided navy and metallic faces, and calculate bulk discounts."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0066FF] hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{isAr ? "فتح استوديو المنتجات الكامل" : "Open Full Products Studio"}</span>
                <ChevronLeft className={`w-4 h-4 ${!isAr ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            INTERACTIVE MODAL FOR SELECTED PRODUCT
            - Full zoom image
            - Front & Back details
            - Live Simulated NFC Tap
            - Direct actions (Order WhatsApp & Open Studio)
           ----------------------------------------------------------------- */}
        <AnimatePresence>
          {selectedProductForModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedProductForModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-start flex flex-col font-sans"
              >
                {/* Modal Header */}
                <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                  <div className="flex items-center gap-2">
                    {selectedProductForModal.badge && (
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-black border border-blue-100">
                        {!isAr && selectedProductForModal.badgeEn ? selectedProductForModal.badgeEn : selectedProductForModal.badge}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">SHAM360 HARDWARE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProductForModal(null)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* Large Product Showcase */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                    <img
                      src={selectedProductForModal.imageUrl}
                      alt={!isAr && selectedProductForModal.nameEn ? selectedProductForModal.nameEn : selectedProductForModal.name}
                      className="w-full h-64 sm:h-72 object-cover"
                    />

                    {/* Overlay Face Tags */}
                    {selectedProductForModal.frontDescription && (
                      <div className="absolute bottom-3 start-3 end-3 bg-slate-900/85 backdrop-blur-md p-3 rounded-xl text-white space-y-1 text-xs">
                        <div className="flex items-center gap-2 font-bold text-amber-300">
                          <Crown className="w-3.5 h-3.5" />
                          <span>{isAr ? "تفاصيل الوجهين:" : "Dual-Sided Details:"}</span>
                        </div>
                        <p className="text-[11px] text-slate-200 leading-snug">
                          <strong>{isAr ? "الوجه الأمامي:" : "Front Face:"}</strong> {!isAr && selectedProductForModal.frontDescriptionEn ? selectedProductForModal.frontDescriptionEn : selectedProductForModal.frontDescription}
                        </p>
                        {selectedProductForModal.backDescription && (
                          <p className="text-[11px] text-slate-300 leading-snug">
                            <strong>{isAr ? "الوجه الخلفي:" : "Back Face:"}</strong> {!isAr && selectedProductForModal.backDescriptionEn ? selectedProductForModal.backDescriptionEn : selectedProductForModal.backDescription}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {!isAr && selectedProductForModal.nameEn ? selectedProductForModal.nameEn : selectedProductForModal.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                      {!isAr && selectedProductForModal.subtitleEn ? selectedProductForModal.subtitleEn : selectedProductForModal.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                      {!isAr && selectedProductForModal.descriptionEn ? selectedProductForModal.descriptionEn : selectedProductForModal.description}
                    </p>
                  </div>

                  {/* Simulated NFC Tap Interactive Experiment */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-100/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shadow-xs">
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                        <span className="text-xs font-black text-slate-800">
                          {isAr ? "محاكي النقر الفوري NFC (Live Test)" : "Instant NFC Tap Simulator (Live Test)"}
                        </span>
                      </div>
                      <span className="text-[11px] text-blue-700 font-bold">{isAr ? "استجابة 0.1 ثانية" : "0.1s Response"}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isAr
                        ? `انقر بالزر أدناه لمحاكاة ملامسة هاتف ذكي لقطعة ${selectedProductForModal.name}:`
                        : `Click below to simulate a smartphone tapping ${selectedProductForModal.nameEn || selectedProductForModal.name}:`}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSimulatedTapActive(true);
                          setTimeout(() => {
                            setSimulatedTapActive(false);
                            setSimulatedTapSuccess(true);
                          }, 900);
                        }}
                        disabled={simulatedTapActive}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                          simulatedTapActive
                            ? "bg-amber-500 text-white animate-pulse"
                            : "bg-[#0066FF] text-white hover:bg-[#0052CC]"
                        }`}
                      >
                        <Wifi className="w-3.5 h-3.5" />
                        <span>
                          {simulatedTapActive
                            ? (isAr ? "جاري التقاط الإشارة..." : "Detecting NFC Signal...")
                            : (isAr ? "انقر لتجربة نقل البيانات بنقرة" : "Tap to Test Contactless Transfer")}
                        </span>
                      </button>

                      {simulatedTapSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs text-emerald-700 font-bold flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{isAr ? "تم التعرف على شريحة SHAM360 وفتح الملف الرقمي فوراً!" : "SHAM360 chip verified & digital profile opened instantly!"}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Technical Specs Checklist */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-800">{isAr ? "المواصفات الفنية المعتمدة:" : "Certified Specifications:"}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {((!isAr && selectedProductForModal.specsEn ? selectedProductForModal.specsEn : selectedProductForModal.specs) || []).map((spec, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal for */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0" />
                    <span>
                      <strong>{isAr ? "مثالي لـ:" : "Ideal for:"}</strong> {!isAr && selectedProductForModal.idealForEn ? selectedProductForModal.idealForEn : selectedProductForModal.idealFor}
                    </span>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-10">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                    <span>{isAr ? "تخصيص ليزري كامل وبرمجة سحابية شاملة" : "Full Laser Engraving & Cloud Programming"}</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductForModal(null);
                        navigate("/products");
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0066FF] border border-blue-200 font-bold text-xs transition-colors cursor-pointer"
                    >
                      {isAr ? "تخصيص في استوديو المنتجات" : "Customize in Studio"}
                    </button>

                    <a
                      href={getWhatsAppOrderUrl(!isAr && selectedProductForModal.nameEn ? selectedProductForModal.nameEn : selectedProductForModal.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isAr ? "طلب وتخصيص عبر واتساب" : "Order via WhatsApp"}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 4: HOW IT WORKS (3 SIMPLE STEPS)
          - Step 1: اطلب بطاقتك المخصصة
          - Step 2: أنشئ ملفك الرقمي الموثق
          - Step 3: انقر وشارك بياناتك بلمسة واحدة
         ----------------------------------------------------------------- */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 bg-[#F4F5F7]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-xs font-bold text-[#0066FF] border border-slate-200">
              <Zap className="w-3.5 h-3.5" />
              <span>{isAr ? "سهولة وسرعة فائقة" : "Simplicity & High Speed"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              {isAr ? "كيف تبدأ مع SHAM360 في 3 خطوات؟" : "How to Get Started with SHAM360 in 3 Steps"}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isAr
                ? "منظومة متكاملة تختصر عليك تكاليف الطباعة الورقية وتمنحك هيبة رقمية في كل لقاء عمل."
                : "An integrated ecosystem eliminating paper business card waste and giving you elite digital prestige in every meeting."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
            {/* Step 1 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200/80 shadow-md relative group hover:border-[#0066FF]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black text-lg mb-6 shadow-xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {isAr ? "اطلب بطاقة SHAM360 المخصصة" : "Order Your Custom Smart NFC Card"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {isAr
                  ? "اختر نوع وخامة بطاقتك المفضلة (معدن، خشب، أو PVC) وأرسل شعارك واسمك ليتم نقشها بالليزر وتسليمها لباب منزلك أو مكتبك."
                  : "Choose your favorite card finish (Luxury Metal, Wood, or Matte PVC) and submit your logo to be precision laser-engraved and delivered directly to your doorstep."}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0066FF]">
                <Check className="w-4 h-4" />
                <span>{isAr ? "شحن وتوصيل لجميع المحافظات" : "Shipping to all Syrian governorates"}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200/80 shadow-md relative group hover:border-[#0066FF]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black text-lg mb-6 shadow-xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                02
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {isAr ? "أنشئ ملفك الرقمي الموثق" : "Create Your Verified Digital Profile"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {isAr
                  ? "احصل على رابط شخصي مميز يحمل اسمك. أضف أرقام الواتساب، والبريد، ورابط خرائط جوجل، وقنوات السوشيال ميديا مع شارة التحقق الزرقاء."
                  : "Claim your dedicated custom URL. Add your WhatsApp, email, Google Maps directions, and social profiles with an official verification badge."}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0066FF]">
                <Check className="w-4 h-4" />
                <span>{isAr ? "تحديث مستمر ولحظي للبيانات" : "Instant real-time cloud data updates"}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200/80 shadow-md relative group hover:border-[#0066FF]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black text-lg mb-6 shadow-xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                03
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {isAr ? "انقر وشارك بياناتك بلمسة واحدة" : "Tap & Share Contacts in 1 Touch"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {isAr
                  ? "في أي اجتماع أو معرض، قرّب بطاقتك أو ميداليتك من هاتف العميل ليفتح ملفك فوراً ويحفظ جهة اتصالك في دليل هاتفه دون أي تطبيق."
                  : "At any business meeting or conference, tap your card on any smartphone to reveal your profile and save your contact instantly without any app."}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0066FF]">
                <Check className="w-4 h-4" />
                <span>{isAr ? "جاهزية فورية بنسبة 100%" : "100% Instant Readiness"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 5: LIVE DIRECTORY TEASER SECTION
          - 3 Unified Modern-Style Directory Cards
          - Switcher to Full Directory
         ----------------------------------------------------------------- */}
      <section
        id="directory"
        className="py-16 sm:py-20 bg-white border-t border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-start">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-xs font-bold text-[#0066FF]">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isAr ? "الدليل الرقمي السوري المعتمد" : "Verified Syrian Digital Directory"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {isAr ? "أحدث الأعضاء والشركات في دليل SHAM360" : "Featured Members & Businesses in SHAM360 Directory"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? "استكشف نخبة من الشركات ورواد الأعمال الذين وثقوا حضورهم الرقمي عبر بطاقات SHAM360."
                  : "Explore leading companies and professionals who have verified their digital presence with SHAM360 Smart Cards."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateToDirectory) {
                  onNavigateToDirectory();
                } else {
                  scrollToSection("directory");
                }
              }}
              className="py-3 px-6 rounded-2xl bg-slate-900 hover:bg-[#0066FF] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>{isAr ? "عرض كل أعضاء الدليل الموحد" : "Browse All Directory Members"}</span>
              <ChevronLeft className={`w-4 h-4 ${!isAr ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Directory Teaser Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEASER_DIRECTORY.map((item) => (
              <Sham360DirectoryCard
                key={item.id}
                item={item}
                onSelect={(selected) => {
                  if (onNavigateToProfile) {
                    onNavigateToProfile(selected.slug);
                  } else {
                    window.open(`https://sham360.online/p/${selected.slug}`, "_blank");
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 6: ENHANCED LIGHT BRAND FOOTER
          - Clean Swiss minimalist aesthetic matching website identity
          - Official contacts: Fakhri Al Baroudi St, admin@sham360.online, +963 933 888 999
          - Verified social links: Facebook & Instagram
          - Unified WhatsApp routing
         ----------------------------------------------------------------- */}
      <footer className="bg-gradient-to-b from-slate-50/90 via-white to-slate-100/75 text-slate-700 border-t border-slate-200/90 py-12 sm:py-16 text-start relative overflow-hidden">
        {/* Subtle decorative top brand accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF]/35 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {/* Column 1: Brand Info & Socials */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <Logo iconSize={42} light={false} isAr={isAr} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                {isAr
                  ? "المنظومة السورية الأولى لبطاقات الأعمال الذكية وحلول النقر الفوري NFC المصممة وفق أعلى معايير الدقة السويسرية لربط عالم الأعمال المادي بالرقمي."
                  : "The premier Syrian smart business card and instant contactless NFC solution, engineered with Swiss precision standards to bridge physical and digital networking."}
              </p>

              {/* Syrian Coverage Badge */}
              <div className="inline-flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-xs text-slate-700">
                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px] font-medium">
                  {isAr
                    ? "توصيل سريع: دمشق، حلب، حمص، حماة، اللاذقية، طرطوس، والسويداء"
                    : "Fast delivery: Damascus, Aleppo, Homs, Hama, Latakia, Tartus, and As-Suwayda"}
                </span>
              </div>

              {/* Official Social Links */}
              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/share/1Bajy1PRR6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-400 text-slate-600 hover:text-[#1877F2] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="https://www.instagram.com/sham360.online?utm_source=qr&stkn=MTVjOTVrZjBpdnczNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-pink-50 border border-slate-200/90 hover:border-pink-400 text-slate-600 hover:text-[#E4405F] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/90 hover:border-emerald-400 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="mailto:admin@sham360.online"
                  aria-label="Email"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-400 text-slate-600 hover:text-[#0066FF] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {isAr ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("hero")}
                    className="hover:text-[#0066FF] font-medium transition-colors cursor-pointer text-start"
                  >
                    {isAr ? "الصفحة الرئيسية" : "Home"}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("hardware")}
                    className="hover:text-[#0066FF] font-medium transition-colors cursor-pointer text-start"
                  >
                    {isAr ? "منتجات وبطاقات NFC" : "NFC Hardware & Cards"}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-[#0066FF] font-medium transition-colors cursor-pointer text-start"
                  >
                    {isAr ? "كيف تعمل المنظومة" : "How It Works"}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToDirectory) onNavigateToDirectory();
                      else scrollToSection("directory");
                    }}
                    className="hover:text-[#0066FF] font-medium transition-colors cursor-pointer text-start"
                  >
                    {isAr ? "دليل الأعمال الموثق" : "Verified Directory"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Order Desk */}
            <div className="md:col-span-4 space-y-3.5">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {isAr ? "مكتب الطلبات والاستفسار" : "Orders & Support Desk"}
              </h4>
              <div className="space-y-3 text-xs text-slate-600">
                <a
                  href="tel:+963933888999"
                  className="flex items-center gap-2.5 text-slate-700 hover:text-[#0066FF] font-semibold transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span dir="ltr">+963 933 888 999</span>
                </a>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate-700 hover:text-emerald-600 font-semibold transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{isAr ? "واتساب خدمة العملاء (+963 933 888 999)" : "WhatsApp Support (+963 933 888 999)"}</span>
                </a>

                <a
                  href="mailto:admin@sham360.online"
                  className="flex items-center gap-2.5 text-slate-700 hover:text-[#0066FF] font-semibold transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[11.5px]">admin@sham360.online</span>
                </a>

                <div className="flex items-start gap-2.5 text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug font-medium">
                    {isAr
                      ? "شارع فخري البارودي، دمشق، الجمهورية العربية السورية"
                      : "Fakhri Al Baroudi St, Damascus, Syria"}
                  </span>
                </div>

                <div className="pt-2">
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span>{isAr ? "تواصل عبر واتساب (+963 933 888 999)" : "Chat on WhatsApp (+963 933 888 999)"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>{isAr ? "جميع الحقوق محفوظة © SHAM360 - 2026. تصميم سويسري مبسط بمعايير عالمية." : "All rights reserved © SHAM360 - 2026. Swiss precision standards."}</p>
            <p className="font-mono text-slate-500 font-medium">Fakhri Al Baroudi St, Damascus • Built with NFC Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sham360HomePage;
