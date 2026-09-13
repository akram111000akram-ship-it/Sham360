import {
  CreditCard,
  Crown,
  Layers,
  Key,
  Tag
} from "lucide-react";

import standKeychainHeroImg from "../assets/images/sham360_stand_keychain_hero_1788814372802.jpg";
import standCloseupImg from "../assets/images/sham360_desktop_stand_closeup_1788814392502.jpg";
import keychainCloseupImg from "../assets/images/sham360_keychain_closeup_1788814408393.jpg";
import officialSmartCardImg from "../assets/images/sham360_official_smart_card_1788815373165.jpg";
import mirrorSmartCardImg from "../assets/images/sham360_mirror_smart_card_1788907318921.jpg";
import cardLogoMasterImg from "../assets/images/sham360_clean_pdf_logo_1788909961142.jpg";
import phoneStickerImg from "../assets/images/sham360_phone_sticker_1788906961886.jpg";
import fullSuiteImg from "../assets/images/sham360_full_suite_1788906978629.jpg";

export {
  standKeychainHeroImg,
  standCloseupImg,
  keychainCloseupImg,
  officialSmartCardImg,
  mirrorSmartCardImg,
  cardLogoMasterImg,
  phoneStickerImg,
  fullSuiteImg
};

export type ProductCategory = "all" | "cards" | "stands" | "keychains";

export interface ProductBenefit {
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
}

export interface ProductItem {
  id: string;
  category: "stands" | "keychains" | "cards";
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr: string;
  badgeEn: string;
  badgeColor: string;
  interactionTypeAr: string;
  interactionTypeEn: string;
  idealForAr: string;
  idealForEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  benefits: ProductBenefit[];
  imageSrc: string;
  icon: any;
}

export const getSyrianWhatsAppOrderUrl = (
  product: ProductItem,
  customName?: string,
  customTitle?: string,
  pickupCenter?: string,
  isAr: boolean = true
) => {
  if (isAr) {
    const nameToPrint = customName ? `• الاسم / المنشأة: ${customName}` : "• الاسم / المنشأة: [سأرسله هنا]";
    const titleToPrint = customTitle ? `• المسمى / النشاط التجاري: ${customTitle}` : "";
    const centerToSelect = pickupCenter ? `• مركز الاستلام المفضل: ${pickupCenter}` : "• مركز الاستلام: دمشق - الميدان";

    const text = `مرحباً فريق SHAM360،
أود الاستفسار وطلب تجهيز عتاد الهوية الرقمية الذكية (NFC):

تفاصيل الطلب:
• المنتج المطلوب: ${product.nameAr} (${product.nameEn})
${nameToPrint}
${titleToPrint}
${centerToSelect}

يرجى تزويدي بالأسعار والخيارات المتوفرة وبدء تجهيز مسودة التصميم والبرمجة السحابية مع دمج كافة وسائل التواصل والروابط.`;

    return `https://wa.me/963933888999?text=${encodeURIComponent(text)}`;
  } else {
    const nameToPrint = customName ? `• Name / Entity: ${customName}` : "• Name / Entity: [To be provided]";
    const titleToPrint = customTitle ? `• Job Title / Field: ${customTitle}` : "";
    const centerToSelect = pickupCenter ? `• Preferred Delivery/Pickup: ${pickupCenter}` : "• Preferred Center: Damascus - Al-Midan";

    const text = `Hello SHAM360 Team,
I would like to inquire about and order smart NFC digital identity hardware:

Order Details:
• Selected Product: ${product.nameEn}
${nameToPrint}
${titleToPrint}
${centerToSelect}

Please provide available options, pricing, and initiate the custom design draft and cloud profile setup with all social links.`;

    return `https://wa.me/963933888999?text=${encodeURIComponent(text)}`;
  }
};

export const getSyrianGeneralInquiryUrl = (isAr: boolean = true) => {
  if (isAr) {
    const text = `مرحباً SHAM360،
أود الاستفسار عن باقات عتاد الهوية الرقمية الذكية (بطاقة الأعمال الذكية الرئيسية، الستاندات، والميداليات) وعروض الشركات والمطاعم في سوريا.
• المدينة ومركز الاستلام المقترح:
• طبيعة النشاط (مطعم / كافيه / عيادة / شركة / عمل خاص):`;

    return `https://wa.me/963933888999?text=${encodeURIComponent(text)}`;
  } else {
    const text = `Hello SHAM360,
I would like to inquire about your smart NFC digital identity bundles (Executive Card, Desktop Stands, Keychains) and corporate/venue packages in Syria.
• City / Preferred Delivery Center:
• Business Sector (Restaurant / Cafe / Clinic / Enterprise / Freelance):`;

    return `https://wa.me/963933888999?text=${encodeURIComponent(text)}`;
  }
};

export const PRODUCTS_CATALOG: ProductItem[] = [
  // 1. Official Smart Card (Flagship Main Product)
  {
    id: "card-sham360-custom",
    category: "cards",
    nameAr: "بطاقة الأعمال الذكية الرسمية SHAM360 NFC (الرئيسية)",
    nameEn: "SHAM360 Official Smart NFC Executive Card (Front & Back)",
    subtitleAr: "الهوية الرقمية المعتمدة لرجال الأعمال والشركات: وجه أمامي فخم بنقر NFC فوري، ووجه خلفي أبيض ناصع يضم كافة شبكات التواصل بالنقر الفوري المباشر (بدون كود QR)",
    subtitleEn: "Certified digital identity for executives & companies: luxury front face with instant NFC tap, and clean white back face uniting all social channels via direct NFC (no QR code)",
    badgeAr: "المنتج الرئيسي • شامل لجميع وسائل التواصل",
    badgeEn: "Flagship Product • All Social Media Integrated",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    interactionTypeAr: "نقر NFC فوري نقي 100% (بدون كود QR خلفي)",
    interactionTypeEn: "100% Pure Contactless NFC Tap (No QR Code)",
    idealForAr: "المدراء التنفيذيون، أصحاب الأعمال، الأطباء، المحامون، الاستشاريون، ورواد الأعمال في اللقاءات والمؤتمرات.",
    idealForEn: "CEOs, business owners, physicians, lawyers, consultants, and entrepreneurs in networking events and conferences.",
    descriptionAr: "البطاقة الذكية الرسمية لمنظومة SHAM360. تجمع بين أرقى معايير التصميم العالمي وتقنية التلامس الفوري NFC. صممت بوجهين متكاملين: الوجه الأمامي باللون الكحلي الفاخر مع شعار بارز ونقر NFC فوري، والوجه الخلفي الأبيض المتطور الذي يجمع هويتك الرقمية وروابطك لجميع منصات التواصل الاجتماعي (انستغرام، فيسبوك، لينكدإن، يوتيوب، تيك توك، واتساب) وموقعك الجغرافي بنقر NFC مباشر فائق السرعة دون أي رمز QR على الوجه الخلفي.",
    descriptionEn: "The official flagship smart card of the SHAM360 ecosystem. Combining international design benchmarks with instant NFC tap technology. Dual-sided design: luxurious navy blue front with embossed logo and instant NFC tap, and clean interactive white back showcasing your verified digital identity and links to all social platforms (Instagram, Facebook, LinkedIn, YouTube, TikTok, WhatsApp) and Google Maps via pure instant NFC with no rear QR code.",
    featuresAr: [
      "وجهان متكاملان: وجه أمامي كحلي فاخر بنقر NFC فوري، ووجه خلفي تفاعلي يجمع كافة شبكات التواصل",
      "دعم شامل لجميع قنوات التواصل: Instagram, Facebook, LinkedIn, TikTok, YouTube, WhatsApp, X",
      "5 بوابات وصول سريعة: Profile, Website, Social Media, Location (Google Maps), Contact",
      "تنزيل فوري لملف جهة الاتصال (vCard) وحفظ الاسم والأرقام مباشرة في هاتف العميل بلمسة واحدة",
      "تعمل فوراً مع كافة هواتف iPhone و Android دون الحاجة لتثبيت أي تطبيق لدى الطرف الآخر",
      "استدامة بيئية (Eco-Friendly) واقتصادية تغنيك عن طباعة آلاف الكروت الورقية المهدرة",
      "تحكم سحابي مجاني ومستمر لتعديل أرقامك وروابطك بأي وقت دون تغيير البطاقة"
    ],
    featuresEn: [
      "Dual-sided design: luxurious navy blue front with instant NFC tap, interactive back connecting all social networks",
      "Full coverage of all communication channels: Instagram, Facebook, LinkedIn, TikTok, YouTube, WhatsApp, X",
      "5 quick access portals: Profile, Website, Social Media, Location (Google Maps), Contact",
      "Instant vCard contact download: saves your name, phone numbers, and job title directly to client's phone with 1 touch",
      "Works out of the box with iPhone and Android without requiring any app on the receiver's phone",
      "Eco-friendly and sustainable: eliminates the ongoing cost and waste of thousands of paper cards",
      "Continuous free cloud dashboard to modify phone numbers, links, and profile anytime without replacing the card"
    ],
    benefits: [
      {
        labelAr: "الوجهان (Front & Back)",
        labelEn: "Dual Faces (Front & Back)",
        valueAr: "أمامي كحلي فاخر + خلفي أبيض تفاعلي",
        valueEn: "Luxury Navy Front + Interactive White Back"
      },
      {
        labelAr: "شبكات التواصل",
        labelEn: "Social Networks",
        valueAr: "كافة المنصات: Instagram, Facebook, LinkedIn...",
        valueEn: "All Platforms: Instagram, Facebook, LinkedIn..."
      },
      {
        labelAr: "بوابات الوصول السريعة",
        labelEn: "Quick Access Hubs",
        valueAr: "Profile, Website, Social, Location, Contact",
        valueEn: "Profile, Website, Social, Location, Contact"
      },
      {
        labelAr: "التوافق التقني",
        labelEn: "Technical Compatibility",
        valueAr: "100% مع كافة هواتف iPhone و Android",
        valueEn: "100% with all iPhone & Android smartphones"
      }
    ],
    imageSrc: officialSmartCardImg,
    icon: CreditCard
  },

  // 2. Luxury Mirror Edition Smart Business Card
  {
    id: "card-sham360-mirror",
    category: "cards",
    nameAr: "بطاقة الأعمال الذكية الفاخرة SHAM360 NFC (إصدار المرآة العاكسة - Posh Mirror Edition)",
    nameEn: "SHAM360 Executive NFC Smart Card (Royal Blue Front & Luxury Reflective Mirror Back)",
    subtitleAr: "إصدار النخبة الفاخر: وجه أمامي كحلي ملكي ذكي لتبادل البيانات فوراً بلمسة NFC، ووجه خلفي بمرآة كرومية نقية وعاكسة للمظهر الشخصي",
    subtitleEn: "Elite Luxury Edition: Royal navy smart front face for instant NFC data exchange, and 100% pure crystal reflective chrome mirror back",
    badgeAr: "إصدار النخبة الفاخر • مرآة عاكسة مدمجة",
    badgeEn: "Elite Luxury Edition • Built-in Reflective Mirror",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    interactionTypeAr: "وجه أمامي NFC رسمي + وجه خلفي مرآة عاكسة نقية (Mirror Finish)",
    interactionTypeEn: "Front Official NFC Tap + Back Pure Reflective Mirror Finish",
    idealForAr: "المدراء التنفيذيون، سيدات ورجال الأعمال، المشاهير، صالونات التجميل، خبراء المظهر والأناقة، وكل من ينشد الفخامة والاستخدام المزدوج الراقي.",
    idealForEn: "C-suite executives, business women and men, celebrities, beauty salons, aesthetic specialists, and anyone seeking dual-use prestige.",
    descriptionAr: "تحفة فنية فريدة تجمع بين أرقى معايير التقنية الذكية والفخامة العصرية الراقية (Posh & Luxurious). صُمم الوجه الأمامي باللون الكحلي الملكي الرسمي لـ SHAM360 مع شريحة NFC المدمجة التي تتيح لك مشاركة بروفايلك الرقمي وحفظ رقمك وبياناتك في هاتف العميل بلمسة واحدة خلال 0.1 ثانية. أما الوجه الخلفي، فقد تم استبداله بالكامل بسطح مرآة كرومية زجاجية مصقولة عاكسة بنقاء كريستالي 100%، تمكّنك أنت والعميل من استخدامها كمرآة شخصية أنيقة وعملية في أي وقت ومكان، لتبدو كقطعة إكسسوار باذخة ومبهرة تعزز هيبتك في كل لقاء عمل.",
    descriptionEn: "A unique masterpiece combining state-of-the-art smart technology with posh executive luxury. The front face features the official royal navy color of SHAM360 with an embedded high-speed NFC antenna that shares your verified digital profile in 0.1s. The back face is completely crafted from 100% crystal-pure polished chrome mirror glass, functioning as an elegant personal pocket mirror anytime, anywhere, powered by instant smart contactless tap.",
    featuresAr: [
      "تصميم ثنائي الاستخدام فريد: بطاقة أعمال ذكية متطورة من الأمام + مرآة جيب نقية وعاكسة من الخلف",
      "وجه خلفي بمرآة كرومية زجاجية فائقة النقاء تمنحك انعكاساً مثالياً وعملياً للاستخدام اليومي وتعديل المظهر",
      "وجه أمامي باللون الكحلي الملكي الرسمي لـ SHAM360 مع شعار معدني وهوائي NFC فائق السرعة",
      "تقنية النقر الذاتي الفوري المتطورة لمشاركة جهات الاتصال والملفات بلمسة واحدة",
      "ملمس فاخر وحواف دائرية مشطوفة مقاومة للخدش تمنح شعوراً استثنائياً بالرقي عند التقديم في الاجتماعات",
      "حفظ فوري لبيانات الاتصال (vCard) وروابط التواصل والواتساب والموقع بلمسة هاتف واحدة دون أي تطبيق",
      "لوحة تحكم سحابية مجانية وديناميكية لتعديل أرقامك وروابطك وصورك في أي وقت دون الحاجة لتغيير البطاقة"
    ],
    featuresEn: [
      "Unique dual-purpose innovation: advanced smart NFC business card on front + pocket mirror on back",
      "Ultra-pure chrome mirror back surface providing clear reflection for personal grooming and confidence",
      "Official royal navy front face with metallic emblem and high-speed NFC antenna",
      "Instant contactless tap technology for direct sharing of contacts and profiles",
      "Luxurious tactile feel with scratch-resistant beveled rounded edges that impress in every meeting",
      "Instant vCard contact download and links without requiring any app on the receiver's phone",
      "Free dynamic cloud control dashboard to update your numbers, links, and photos anytime"
    ],
    benefits: [
      {
        labelAr: "الوجه الخلفي (Back)",
        labelEn: "Back Face",
        valueAr: "مرآة كروم عاكسة نقية 100% عملية وأنيقة",
        valueEn: "100% pure reflective chrome mirror, practical & elegant"
      },
      {
        labelAr: "الوجه الأمامي (Front)",
        labelEn: "Front Face",
        valueAr: "أزرق كحلي ملكي رسمي مع شريحة NFC",
        valueEn: "Official royal navy blue with high-speed NFC chip"
      },
      {
        labelAr: "طابع الفخامة والأناقة",
        labelEn: "Style & Prestige",
        valueAr: "Posh & High Luxury Edition للمناسبات الراقية",
        valueEn: "Posh & High Luxury Edition for executive occasions"
      },
      {
        labelAr: "التوافق التقني",
        labelEn: "Technical Compatibility",
        valueAr: "100% مع كافة هواتف iPhone و Android",
        valueEn: "100% with all iPhone & Android smartphones"
      }
    ],
    imageSrc: mirrorSmartCardImg,
    icon: Crown
  },

  // 3. Smart Desktop & Counter Stand
  {
    id: "stand-sham360-acrylic",
    category: "stands",
    nameAr: "ستاند الطاولات والمكاتب الذكي 'Tap & Scan'",
    nameEn: "SHAM360 Interactive Desktop & Counter Stand 'Tap & Scan'",
    subtitleAr: "أداة تفاعلية متطورة لمضاعفة تقييمات Google 5-Stars، محادثات الواتساب، والوصول الفوري للمنيو والصفحات",
    subtitleEn: "Advanced interactive tool to multiply Google 5-Star reviews, WhatsApp conversations, and instant menu & page access",
    badgeAr: "الأكثر طلباً للمطاعم والعيادات",
    badgeEn: "Most Popular for Restaurants & Clinics",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    interactionTypeAr: "تلامس فوري NFC + كود QR ذكي",
    interactionTypeEn: "Instant NFC Tap + Smart QR Code",
    idealForAr: "طاولات المطاعم، كافيهات، مكاتب الاستقبال، العيادات، الفنادق، ومراكز خدمة العملاء.",
    idealForEn: "Restaurant tables, cafes, reception desks, clinics, hotels, and customer service counters.",
    descriptionAr: "الحل الذكي المعتمد لزيادة تفاعل الزبائن في منشأتك. يجمع بين تقنية التلامس الفوري NFC ومسح كود QR، لتمكين العميل بلمسة هاتف واحدة من كتابة تقييم 5 نجوم على Google Maps، فتح محادثة واتساب فورية، تصفح المنيو الرقمي، ومتابعة كافة قنواتك على وسائل التواصل.",
    descriptionEn: "The certified smart solution to boost customer engagement in your venue. Combines instant NFC tap with high-precision QR scanning, enabling guests with a single tap to submit 5-star Google Maps reviews, launch direct WhatsApp chats, browse digital menus, and follow all your social channels.",
    featuresAr: [
      "تفاعل ثنائي ذكي: تلامس بالهاتف (NFC Tap) أو مسح بالكاميرا (QR Scan)",
      "توجيه مباشر لتقييمات Google Maps 5-Stars لرفع تصنيف منشأتك على محركات البحث",
      "أيقونات واضحة لمنصات التواصل (Google، واتساب، فيسبوك، انستغرام، يوتيوب، تيك توك، والموقع)",
      "متين ومقاوم للسوائل والتنظيف اليومي المعتاد في المطاعم والمكاتب",
      "تحديث سحابي فوري؛ يمكنك تغيير رقم الواتساب أو روابط المنيو بأي لحظة دون استبدال الستاند"
    ],
    featuresEn: [
      "Dual smart interaction: phone tap (NFC Tap) or camera scan (QR Scan)",
      "Direct route to Google Maps 5-Star reviews to skyrocket your search rankings and reputation",
      "High-contrast icons for Google, WhatsApp, Facebook, Instagram, YouTube, TikTok, and website",
      "Durable, water-resistant acrylic built to withstand daily sanitizing in dining and medical environments",
      "Instant cloud updates: change WhatsApp numbers or menu links anytime without replacing the physical stand"
    ],
    benefits: [
      {
        labelAr: "الاستجابة والسرعة",
        labelEn: "Response Speed",
        valueAr: "أقل من 0.1 ثانية دون أي تطبيق",
        valueEn: "Under 0.1s with zero app required"
      },
      {
        labelAr: "التوافق التقني",
        labelEn: "Compatibility",
        valueAr: "100% مع كافة هواتف iPhone و Android",
        valueEn: "100% with all iPhone & Android smartphones"
      },
      {
        labelAr: "الربط السحابي",
        labelEn: "Cloud Integration",
        valueAr: "لوحة تحكم ديناميكية لتعديل الروابط مجاناً",
        valueEn: "Dynamic dashboard to update links for free"
      },
      {
        labelAr: "التطبيقات والمنصات",
        labelEn: "Channels & Apps",
        valueAr: "Google Reviews, WhatsApp, Instagram, Maps, Web",
        valueEn: "Google Reviews, WhatsApp, Instagram, Maps, Web"
      }
    ],
    imageSrc: standCloseupImg,
    icon: Layers
  },

  // 4. Smart NFC Keychain
  {
    id: "tag-sham360-keychain",
    category: "keychains",
    nameAr: "ميدالية المفاتيح الذكية التفاعلية NFC",
    nameEn: "SHAM360 Crystal Clear Smart NFC Keychain",
    subtitleAr: "هويتك الرقمية المتنقلة دائماً معك أينما ذهبت لمشاركة أرقامك وبروفايلك فور ملامسة الهاتف للميدالية",
    subtitleEn: "Your portable digital identity always with you to share your contact and profile the moment a phone touches the keychain",
    badgeAr: "مظهر كريستالي عصري فائق النقاء",
    badgeEn: "Crystal Clear Modern Design",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    interactionTypeAr: "تلامس فوري NFC",
    interactionTypeEn: "Instant NFC Tap",
    idealForAr: "رواد الأعمال، الأطباء، المهندسون الميدانيون، الوكلاء العقاريون، وأصحاب السيارات.",
    idealForEn: "Entrepreneurs, physicians, field engineers, real estate agents, and vehicle owners.",
    descriptionAr: "ميدالية مفاتيح ذكية فائقة الأناقة والصلابة مع شعار SHAM360 الأزرق الكهربائي. تتيح لك مشاركة بروفايلك الرقمي، أرقام هاتفك، وحساباتك بمجرد ملامسة هاتف الطرف الآخر للميدالية المعلقة في مفاتيحك دون الحاجة لحمل محفظة أو بطاقة ورقية.",
    descriptionEn: "Ultra-sleek and rugged smart keychain featuring the vibrant electric blue SHAM360 emblem. Allows you to share your digital profile, contact details, and links instantly when anyone taps their smartphone to your keys—no wallet or paper cards required.",
    featuresAr: [
      "مشاركة فورية لجهة اتصالك (vCard) أو بروفايلك المهني بلمسة هاتف واحدة",
      "لا تحتاج لأي تطبيق أو شحن بطارية أو تثبيت برامج إضافية",
      "شريحة تلامس داخلية عالية الحساسية تستجيب فوراً لأجهزة iPhone و Android",
      "مقاومة تامة للماء والصدمات وعوامل الاستخدام اليومي المستمر",
      "ربط مباشر بلوحة تحكم SHAM360 لتحديث أرقامك وبياناتك في أي وقت"
    ],
    featuresEn: [
      "Instant sharing of vCard contact file or professional portfolio with 1 phone tap",
      "Zero battery, zero charging, zero apps needed on the receiver's phone",
      "High-sensitivity embedded contactless chip responding instantaneously to iPhone and Android",
      "100% waterproof, drop-resistant, and built for heavy daily use",
      "Direct sync with SHAM360 cloud dashboard to update phone numbers and links anytime"
    ],
    benefits: [
      {
        labelAr: "طريقة المشاركة",
        labelEn: "Sharing Method",
        valueAr: "ملامسة الهاتف لميدالية المفاتيح",
        valueEn: "Tapping phone against the smart keychain"
      },
      {
        labelAr: "سجل الهاتف (vCard)",
        labelEn: "Phone Contacts (vCard)",
        valueAr: "حفظ الاسم والأرقام بنقرة واحدة",
        valueEn: "1-tap direct contact saving to address book"
      },
      {
        labelAr: "مقاومة العوامل",
        labelEn: "Durability",
        valueAr: "مقاومة كاملة للماء والأتربة والسقوط",
        valueEn: "Complete water, dust, and impact resistance"
      },
      {
        labelAr: "الاستخدام",
        labelEn: "Lifespan",
        valueAr: "دائم مدى الحياة بدون شحن أو اشتراكات",
        valueEn: "Lifetime use with no battery or subscription fees"
      }
    ],
    imageSrc: keychainCloseupImg,
    icon: Key
  },

  // 5. Smart NFC Phone & Desk Tag
  {
    id: "tag-anti-metal-sticker",
    category: "stands",
    nameAr: "ملصق التلامس الذكي للهواتف والمكاتب",
    nameEn: "SHAM360 Smart NFC Phone & Desk Tag",
    subtitleAr: "حوّل ظهر هاتفك أو مكتبك إلى بوابة تواصل تفاعلية فور ملامستها بأي هاتف",
    subtitleEn: "Transform your phone back or desk into an interactive connection gateway the moment another phone touches it",
    badgeAr: "مرونة عالية في الاستخدام",
    badgeEn: "High Versatility & Anti-Metal",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    interactionTypeAr: "تلامس فوري NFC",
    interactionTypeEn: "Instant NFC Tap",
    idealForAr: "تثبيته على ظهر الهواتف الذكية، طاولات المكاتب، أو أجهزة اللابتوب.",
    idealForEn: "Affixing to back of smartphones, office desks, or laptop covers.",
    descriptionAr: "ملصق ذكي مزود بتقنية عزل تمنع التداخل مع أسطح الهواتف والمعادن. الصقه على هاتفك أو حاسوبك المحمول واجعل أي شخص يلمس هاتفك يفتح بروفايلك أو رابط منشأتك فوراً.",
    descriptionEn: "Smart NFC sticker equipped with advanced anti-metal ferrite shielding that prevents interference with smartphone surfaces and metallic backings. Stick it on your phone or laptop to let anyone tap your device and open your business profile instantly.",
    featuresAr: [
      "طبقة عزل متطورة تضمن عمل الشريحة بكفاءة تامة حتى على أجهزة الهواتف المعدنية",
      "لاصق صناعي قوي يثبت بثبات ولا يترك أثراً عند إزالته",
      "حجم عملي أنيق لا يعيق استخدام أغطية وحافظات الهواتف",
      "مشاركة فورية لأرقامك وروابطك بلمسة هاتف واحدة",
      "تحكم وتحديث سحابي كامل من لوحة SHAM360"
    ],
    featuresEn: [
      "Advanced anti-metal ferrite isolation layer ensures optimal chip performance even on metallic phones",
      "Industrial-grade 3M adhesive that sticks securely without leaving sticky residue when removed",
      "Ultra-thin profile that fits effortlessly under phone cases and covers",
      "Instant sharing of numbers and links with a single tap",
      "Full cloud management from your SHAM360 dashboard"
    ],
    benefits: [
      {
        labelAr: "طريقة التثبيت",
        labelEn: "Mounting Method",
        valueAr: "لاصق قوي وعازل على ظهر الهاتف أو المكتب",
        valueEn: "Industrial adhesive with ferrite anti-metal layer"
      },
      {
        labelAr: "الاستجابة",
        labelEn: "Response",
        valueAr: "فورية لجميع الهواتف دون فتح تطبيقات",
        valueEn: "Instant across all phones without opening apps"
      },
      {
        labelAr: "الاستدامة",
        labelEn: "Lifespan",
        valueAr: "يعمل لسنوات دون الحاجة لأي بطارية",
        valueEn: "Operates for years with zero batteries needed"
      },
      {
        labelAr: "التعديل السحابي",
        labelEn: "Cloud Editing",
        valueAr: "مجاني ومتاح 24/7 من حسابك",
        valueEn: "Free and accessible 24/7 from your account"
      }
    ],
    imageSrc: phoneStickerImg,
    icon: Tag
  }
];

export interface FaqItem {
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
}

export const NFC_FAQS: FaqItem[] = [
  {
    qAr: "كيف تعمل تقنية التلامس الذكية NFC من SHAM360؟",
    qEn: "How does SHAM360 NFC smart tap technology work?",
    aAr: "تعتمد منتجات SHAM360 أحدث المعايير التقنية العالمية لمشاركة الهوية الرقمية: بمجرد ملامسة المنتج الذكي (سواء كان ستاند الطاولة، ميدالية المفاتيح، أو بطاقة الأعمال) لأي هاتف ذكي، يُفتح بروفايلك أو رابط منشأتك فوراً في متصفح العميل دون الحاجة لأي تطبيق، مع إمكانية حفظ جهة الاتصال (vCard) بنقرة واحدة.",
    aEn: "SHAM360 products leverage international standards for digital identity sharing: simply touching your smart product (desk stand, keychain, or business card) to any smartphone instantly launches your verified profile in the client's mobile browser without any app, with a 1-tap option to save your vCard contact."
  },
  {
    qAr: "هل يحتاج العميل أو الطرف الآخر لتثبيت أي تطبيق لقراءة العتاد وحفظ الرقم؟",
    qEn: "Does the client or receiver need to install any app to read the card or save contact info?",
    aAr: "إطلاقاً! هذه هي النقطة الأقوى في منظومة SHAM360. بمجرد ملامسة المنتج لأي هاتف ذكي حديث (iPhone أو Android)، ينبثق إشعار فوري على شاشة هاتفه، وبلمسة واحدة يُفتح بروفايلك الرقمي مع زر 'حفظ جهة الاتصال' (Save Contact) ليتم تخزين رقمك واسمك وبياناتك فوراً في سجل هاتف الشخص الآخر.",
    aEn: "Absolutely not! That is the core advantage of the SHAM360 system. The moment your product touches any modern iPhone or Android smartphone, a native system notification pops up. With one tap, your digital profile opens with a direct 'Save Contact' button that saves your full details straight into their phone book."
  },
  {
    qAr: "كيف يساعد ستاند الطاولات الذكي المطاعم والعيادات في زيادة تقييمات Google والمبيعات؟",
    qEn: "How does the smart counter stand help restaurants and clinics increase Google reviews and sales?",
    aAr: "يقدم الستاند تجربة مريحة وسريعة لرواد المطعم أو مراجعي العيادة؛ بلمسة هاتف واحدة أو مسح كود QR، يفتح هاتف الزبون مباشرة على صفحة التقييم 5 نجوم في خرائط Google، أو على محادثة الواتساب لطلب الحجوزات، أو قائمة الطعام الرقمية، مما يرفع تقييمات منشأتك وترتيبها على Google Maps أضعافاً مضاعفة.",
    aEn: "The stand provides a seamless experience for diners and clinic visitors; with a single phone tap or QR scan, the customer's phone opens directly to your 5-star Google Maps review page, your WhatsApp reservation chat, or your digital menu, drastically boosting your search ranking and local traffic."
  },
  {
    qAr: "ماذا لو كان هاتف العميل قديماً ولا يدعم تقنية NFC؟",
    qEn: "What if the customer's phone is older and does not support NFC?",
    aAr: "تمت دراسة هذا السيناريو بعناية تامة؛ كل ستاند وبطاقة مزود برمز QR ذكي وعالي الدقة. يمكن لأي هاتف قديم مزود بكاميرا مسح الكود ليفتح نفس البروفايل الرقمي التفاعلي بنفس السرعة والسهولة وبدون أي تطبيق.",
    aEn: "This scenario was carefully engineered; every stand, keychain, and card is equipped with an ultra-precise smart QR code. Any phone with a camera can scan the code to open the exact same interactive profile with zero app required."
  },
  {
    qAr: "هل يمكنني تعديل أرقامي، روابطي، وصوري بعد استلام المنتج دون تغييره؟",
    qEn: "Can I update my phone numbers, links, and photos after receiving the product without replacing it?",
    aAr: "نعم 100%! منتجات SHAM360 مبرمجة بروابط سحابية ديناميكية مرتبطة بحسابك. يمكنك في أي وقت تسجيل الدخول إلى 'لوحة التحكم' في SHAM360 وتعديل رقم الواتساب، الهاتف، روابط التواصل، أو قائمة الطعام، وستنعكس التعديلات فوراً على نفس الستاند أو الميدالية دون الحاجة لإعادة شراء أو برمجة جديدة.",
    aEn: "Yes, 100%! SHAM360 hardware is linked to dynamic cloud profiles. You can log in to your SHAM360 Dashboard at any time to update your WhatsApp, phone numbers, social links, or menu items, and changes reflect in real-time on your existing hardware with no re-ordering needed."
  },
  {
    qAr: "كيف تتم آلية الطلب والتسليم في سوريا؟",
    qEn: "How does ordering and delivery work across Syria?",
    aAr: "نوفر آلية طلب مرنة وسريعة: اضغط على زر 'طلب وتنسيق التجهيز عبر الواتساب' لفتح محادثة مباشرة مع فريق التجهيز والطباعة. يتم إرسال بياناتك وشعارك لاعتماد مسودة التصميم، ثم استلام طلبك مباشرة في مراكزنا المعتمدة في دمشق أو حلب، أو إرساله عبر الشحن الداخلي الموثوق لكافة المحافظات مع الدفع عند الاستلام والمعاينة.",
    aEn: "We provide a swift, flexible workflow: click 'Order & Coordinate via WhatsApp' to chat directly with our production and engraving team. Send your business details and logo to approve design proofs, then collect your order at our verified pickup hubs in Damascus or Aleppo, or receive secure nationwide shipping with inspection upon delivery."
  }
];
