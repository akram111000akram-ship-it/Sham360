import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  FileText,
  Lock,
  RefreshCw,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  Sparkles,
  Facebook,
  Instagram,
  Award,
  Globe,
  Check,
  CreditCard
} from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "../services/LanguageContext";
import { useRouter } from "../services/router";

export interface FooterProps {
  onNavigateToDirectory?: () => void;
  onNavigateToProfile?: (slug?: string) => void;
  scrollToSection?: (id: string) => void;
}

type PolicyType = "privacy" | "terms" | "guarantee" | null;

interface PolicyContent {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr: string;
  badgeEn: string;
  icon: React.ElementType;
  sections: {
    headingAr: string;
    headingEn: string;
    textAr: string;
    textEn: string;
    bulletsAr?: string[];
    bulletsEn?: string[];
  }[];
}

const POLICY_DETAILS: Record<NonNullable<PolicyType>, PolicyContent> = {
  privacy: {
    titleAr: "سياسة الخصوصية وحماية البيانات",
    titleEn: "Privacy & Data Protection Policy",
    subtitleAr: "التزامنا الصارم بحماية خصوصية معلوماتك الشخصية وبيانات بطاقات الأعمال الذكية",
    subtitleEn: "Our strict commitment to safeguarding your personal data and smart profile information",
    badgeAr: "حماية مشفرة ومعايير أمان سويسرية",
    badgeEn: "Encrypted Protection & Swiss Standards",
    icon: Lock,
    sections: [
      {
        headingAr: "1. جمع البيانات واستخدامها",
        headingEn: "1. Data Collection & Intended Use",
        textAr: "تجمع منصة SHAM360 فقط المعلومات الضرورية التي يختار المستخدم إضافتها لملف التعريف الذكي (مثل: الاسم، المنصب، أرقام التواصل، روابط الشبكات الاجتماعية، الموقع الجغرافي، وحسابات الدفع). يتم استخدام هذه البيانات حصرياً لتمكين ميزة تبادل جهات الاتصال الفورية وحفظ بطاقة vCard.",
        textEn: "SHAM360 collects solely the essential information users explicitly choose to incorporate into their smart digital profiles (e.g., name, professional title, contact numbers, social media links, GPS location, and payment channels). This data is used exclusively to facilitate instant contact sharing and vCard generation.",
        bulletsAr: [
          "لا يتم بيع أو تأجير أو مشاركة بيانات العملاء مع أي طرف ثالث لأغراض إعلانية.",
          "البيانات المعروضة على البطاقة الذكية هي فقط ما تقرر إظهاره للعموم.",
          "إمكانية إخفاء أو تعديل أي معلومة لحظياً من لوحة التحكم السحابية."
        ],
        bulletsEn: [
          "Customer data is never sold, leased, or shared with third parties for marketing purposes.",
          "Only details explicitly designated for public networking are broadcasted via NFC/QR.",
          "Instant granular control to modify or hide specific contact fields via your cloud dashboard."
        ]
      },
      {
        headingAr: "2. أمان شريحة NFC والاتصال المشفر",
        headingEn: "2. NFC Hardware Security & Encrypted Transport",
        textAr: "تعمل شرائح NFC المدمجة في منتجاتنا بتردد قياسي 13.56MHz وببروتوكول NTAG المتوافق عالمياً مع هواتف iPhone وAndroid. لا تحتوي الشريحة بحد ذاتها على أي بيانات بنكية سرية أو كلمات مرور، بل توجه الهاتف بأمان عبر رابط HTTPS مشفر إلى بروفايلك الرسمي الموثق.",
        textEn: "The embedded NFC microchips in our products operate on standard 13.56MHz frequencies using NTAG protocols compliant globally with iOS and Android. The chip itself stores no sensitive credentials or passwords; it safely directs smartphones via encrypted HTTPS to your verified profile.",
        bulletsAr: [
          "اتصال مشفر بمعيار SSL/TLS 256-bit لجميع عمليات التصفح وتبادل البيانات.",
          "حماية الشريحة من التعديل غير المصرح به عبر قفل برمجي أمني دائم.",
          "تشفير كامل لنسخ جهات الاتصال الإلكترونية vCard الموجهة للتحميل المباشر."
        ],
        bulletsEn: [
          "End-to-end 256-bit SSL/TLS encryption across all profile interactions.",
          "Permanent write-lock protection preventing unauthorized reprogramming.",
          "Cryptographically verified vCard delivery for zero-friction phonebook storage."
        ]
      },
      {
        headingAr: "3. حقوق المستخدم وحذف الحساب",
        headingEn: "3. User Rights & Data Deletion",
        textAr: "يحق لكل عميل طلب نسخة من بياناته المسجلة أو طلب حذف حسابه وملفه الرقمي نهائياً من خوادم المنظومة في أي وقت عبر التواصل مع مكتب الدعم الرسمي، وسيتم الاستجابة للطلب وتنفيذه خلال 24 ساعة عمل.",
        textEn: "Every client maintains complete sovereignty over their data, with the right to export, modify, or permanently purge their digital profile from our servers anytime by contacting our support desk. Requests are executed within 24 business hours.",
        bulletsAr: [
          "تعديل البيانات مجاناً وبشكل غير محدود طوال فترة تشغيل البطاقة.",
          "إمكانية إيقاف مؤقت للبروفايل في حال فقدان البطاقة الفيزيائية.",
          "دعم مخصص لحماية العلامات التجارية والشركات المعتمدة في سوريا."
        ],
        bulletsEn: [
          "Unlimited cloud modifications without reprinting the physical hardware.",
          "Instant temporary freeze feature if your physical card is misplaced.",
          "Dedicated enterprise branding protection across the Syrian territory."
        ]
      }
    ]
  },
  terms: {
    titleAr: "شروط وأحكام الخدمة",
    titleEn: "Terms of Service & Usage Agreement",
    subtitleAr: "القواعد والضوابط المنظمة لاستخدام منتجات وبطاقات SHAM360 ومنظومة البروفايلات الذكية",
    subtitleEn: "Official terms and guidelines governing the use of SHAM360 NFC products and smart services",
    badgeAr: "اتفاقية الاستخدام القانوني المعتمدة",
    badgeEn: "Authorized Commercial Terms",
    icon: FileText,
    sections: [
      {
        headingAr: "1. نطاق الترخيص واستخدام الخدمة",
        headingEn: "1. Scope of License & Legitimate Use",
        textAr: "بشرائك لأي من منتجات SHAM360 الذكية (البطاقات المعدنية، الخشبية، البلاستيكية الفاخرة، أو ستاندات المكاتب)، تمنحك المنصة ترخيصاً شخصياً أو تجارياً لاستخدام البروفايل الرقمي السحابي المرتبط بالمنتج طوال العمر التشغيلي للشريحة.",
        textEn: "Upon acquiring any SHAM360 smart product (metal, bamboo, luxury PVC cards, or executive desktop stands), you are granted a commercial or personal license to utilize the linked cloud profile for the functional lifespan of the hardware.",
        bulletsAr: [
          "يمنع منعاً باتاً استخدام البروفايل لنشر محتوى ينتهك القوانين والأنظمة المعمول بها في الجمهورية العربية السورية.",
          "يحظر انتحال صفة أي علامة تجارية أو جهة حكومية أو شخصية اعتبارية دون إذن رسمي موثق.",
          "تحتفظ الإدارة بالحق في تعليق أي ملف يتبين استخدامه في عمليات احتيالية أو تضليل تجاري."
        ],
        bulletsEn: [
          "Use of profiles to disseminate content violating Syrian commercial or legal statutes is strictly prohibited.",
          "Impersonation of trademarks, government bodies, or corporate identities without legal authorization is banned.",
          "Administration reserves the right to freeze accounts involved in deceptive or unlawful activities."
        ]
      },
      {
        headingAr: "2. ملكية الحساب وإدارة المحتوى",
        headingEn: "2. Account Ownership & Content Management",
        textAr: "يتحمل العميل المسؤولية الكاملة عن صحة ودقة المعلومات المدخلة في بروفايله (بما في ذلك أرقام الهواتف، الحسابات البنكية، وروابط الدفع الإلكتروني). تلتزم المنظومة بتوفير اتصال مستقر بنسبة 99.9% للخوادم السحابية.",
        textEn: "The cardholder bears full responsibility for the veracity and accuracy of the published content (including telephone numbers, banking credentials, and payment routes). SHAM360 commits to maintaining 99.9% cloud infrastructure availability.",
        bulletsAr: [
          "العميل هو المالك الحصري لمحتواه الرقمي وشعاراته وهويته البصرية.",
          "تحديث فوري تلقائي للبيانات يظهر لدى أي عميل يمسح الشريحة أو يفتح الرابط.",
          "دعم فني مستمر لتنسيق وإبراز الهوية البصرية بأرقى صورة احترافية."
        ],
        bulletsEn: [
          "The client retains full proprietary rights over their brand assets and uploaded media.",
          "Instantaneous global sync ensuring immediate reflection of updated details.",
          "Technical assistance for visual identity refinement and high-conversion formatting."
        ]
      },
      {
        headingAr: "3. إدراج المنشآت في دليل SHAM360 الوطني",
        headingEn: "3. Verification & Syrian Directory Inclusion",
        textAr: "يحق لأصحاب المنشآت والأعمال الحاصلين على بطاقات أو منتجات SHAM360 الذكية التقدم بطلب التوثيق وظهور ملفاتهم في دليل الأعمال والآثار الوطني السوري، وفق معايير الجودة المحددة.",
        textEn: "All verified enterprises holding authentic SHAM360 NFC hardware are entitled to apply for directory placement and verification badges within the National Syrian Business & Cultural Directory.",
        bulletsAr: [
          "التوثيق متاح لجميع القطاعات التجارية، الطبية، الحرفية، والسياحية.",
          "منح شارة التحقق الزرقاء (Verified Member) للمنشآت الملتزمة بجودة الخدمات.",
          "حق الإدارة في مراجعة وتدقيق البيانات قبل إتاحتها للبحث العام."
        ],
        bulletsEn: [
          "Applicable across medical, culinary, industrial, artistic, and enterprise sectors.",
          "Blue verification badge issued to businesses fulfilling quality compliance.",
          "Standard editorial review to ensure optimal representation and accurate geo-tagging."
        ]
      }
    ]
  },
  guarantee: {
    titleAr: "سياسة الضمان والاستبدال الرسمي",
    titleEn: "Official Guarantee & Replacement Policy",
    subtitleAr: "ضمان استبدال رسمي لمدة عام كامل على سلامة واستجابة شريحة NFC مع تحديثات سحابية مدى الحياة",
    subtitleEn: "Full 1-year official hardware guarantee on NFC responsiveness with lifetime cloud data updates",
    badgeAr: "ضمان الجودة والمتانة 100%",
    badgeEn: "100% Verified Hardware Quality",
    icon: RefreshCw,
    sections: [
      {
        headingAr: "1. ضمان استبدال الشريحة الفيزيائية (12 شهراً)",
        headingEn: "1. 12-Month Hardware Replacement Guarantee",
        textAr: "تخضع جميع بطاقات ومنتجات SHAM360 الذكية لفحص دقة إلكتروني مزدوج قبل الشحن. نضمن عمل شريحة NFC المدمجة بنسبة 100% مع كافة الهواتف الداعمة لتقنية الاتصال قريب المدى (NFC). وفي حال حدوث أي عطل مصنعي أو توقف غير مبرر للشريحة خلال سنة من تاريخ الاستلام، يتم استبدال المنتج مجاناً.",
        textEn: "Every SHAM360 smart product undergoes rigorous dual electronic quality control prior to dispatch. We guarantee 100% NFC responsiveness with all compatible NFC-enabled smartphones. In the rare event of a manufacturing defect or chip failure within 12 months of purchase, the product is replaced free of charge.",
        bulletsAr: [
          "استبدال مباشر للبطاقة التالفة مصنعياً ببطاقة جديدة مماثلة.",
          "نقل كامل ومضمون لبياناتك السحابية ورابطك الرسمي إلى البطاقة البديلة فوراً.",
          "تغطية التوصيل في حال كان الخلل ناتجاً عن عيب تصنيعي مثبت."
        ],
        bulletsEn: [
          "Direct replacement with identical specifications and custom engraving.",
          "Seamless migration of your active cloud slug and digital assets to the new card.",
          "Courier expenses covered for verified manufacturing defects."
        ]
      },
      {
        headingAr: "2. التحديثات السحابية مدى الحياة (Lifetime Cloud Updates)",
        headingEn: "2. Lifetime Unlimited Cloud Updates",
        textAr: "لا تتطلب بطاقتك الذكية إعادة طباعة أو استبدال فيزيائي عند تغيير رقم هاتفك، عنوانك، وظيفتك، أو وسائل الدفع الإلكتروني. تتيح لك منظومة SHAM360 تحديث بياناتك السحابية فوراً دون أي تكلفة إضافية لمدى الحياة.",
        textEn: "Your smart card never needs reprinting or physical replacement when you change your phone number, workplace, social handles, or payment details. SHAM360 provides complimentary lifetime cloud updates with instant global propagation.",
        bulletsAr: [
          "تعديل فوري لأرقام الواتساب والمكالمات وروابط الحسابات في ثوانٍ.",
          "إضافة أو تعديل حسابات التحويل البنكي وتطبيقات الدفع الإلكتروني بأمان.",
          "تحديث الروابط والمستندات وكتالوجات المنتجات (PDF) في أي وقت."
        ],
        bulletsEn: [
          "Instant modifications to phone numbers, WhatsApp, and social accounts in seconds.",
          "Seamless updates to bank IBANs, digital payment links, and portfolio assets.",
          "Attach or refresh product catalogs and PDF credentials anytime."
        ]
      },
      {
        headingAr: "3. إجراءات وشروط طلب الاستبدال",
        headingEn: "3. Replacement Request Procedure",
        textAr: "لطلب الاستبدال في حال مواجهة أي خلل تقني، يكفي التواصل مع مكتب الدعم الرسمي عبر واتساب مع إرفاق صورة البطاقة وتوضيح نوع المشكلة. سيقوم الفريق الهندسي بالتحقق التقني من الشريحة وإجراء الاستبدال بأسرع وقت.",
        textEn: "To file a warranty claim, simply reach out to our official WhatsApp support desk with a photograph of the product and a brief explanation of the issue. Our technical team will audit the token and fulfill the replacement swiftly.",
        bulletsAr: [
          "لا يشمل الضمان حالات الكسر الميكانيكي المتعمد، الحرق، أو التلف الفيزيائي الشديد.",
          "استجابة سريعة لطلبات الضمان خلال 24 ساعة عبر فريق الدعم في دمشق.",
          "إمكانية إعادة إصدار بطاقة بديلة برسم رمزي في حال فقدان البطاقة الأصلية."
        ],
        bulletsEn: [
          "Warranty excludes intentional mechanical breakage, extreme physical bending, or chemical burns.",
          "Rapid response within 24 hours through our central operations team in Damascus.",
          "Discounted re-issuance fee if your original card is accidentally lost or stolen."
        ]
      }
    ]
  }
};

export const Footer: React.FC<FooterProps> = ({
  onNavigateToDirectory,
  onNavigateToProfile,
  scrollToSection
}) => {
  const { isAr } = useLanguage();
  const { navigate } = useRouter();

  // Legal Policies Modal State
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [modalLanguage, setModalLanguage] = useState<"ar" | "en">(isAr ? "ar" : "en");

  // Keep modal language synchronized with global language when modal opens
  useEffect(() => {
    setModalLanguage(isAr ? "ar" : "en");
  }, [isAr, activePolicy]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activePolicy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePolicy]);

  // Keyboard shortcut (ESC) to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePolicy) {
        setActivePolicy(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePolicy]);

  const handleNavClick = (sectionId: string, pageRoute?: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else if (pageRoute) {
      navigate(pageRoute);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
      }
    }
  };

  const getWhatsAppSupportUrl = () => {
    const text = isAr
      ? "مرحباً SHAM360، أود الاستفسار عن بطاقات ومنتجات NFC الذكية والخدمات المعتمدة."
      : "Hello SHAM360, I would like to inquire about your smart NFC products and verified solutions.";
    return `https://wa.me/963933888999?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <footer
        id="main-footer"
        className="bg-gradient-to-b from-slate-50/95 via-white to-slate-100/80 text-slate-700 border-t border-slate-200/90 py-12 sm:py-16 text-start relative overflow-hidden"
      >
        {/* Subtle decorative top brand accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* =========================================================
              BALANCED 4-COLUMN RESPONSIVE GRID
              1. Brand & Innovation
              2. Platform Quick Links
              3. Legal & Official Policies (New Column)
              4. Contact & Support Desk
              ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* COLUMN 1: Brand Info & Quality Badges (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <Logo iconSize={42} light={false} isAr={isAr} />
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-sm">
                {isAr
                  ? "المنظومة السورية الرائدة لبطاقات الأعمال الذكية وحلول النقر الفوري NFC المصممة وفق أعلى معايير الدقة السويسرية، لربط الحضور المادي بالرقمي وتوثيق المنشآت."
                  : "Syria's premier smart NFC hardware ecosystem and contactless identity platform, engineered with Swiss precision standards to seamlessly bridge physical networking and verified digital presence."}
              </p>

              {/* Refined Subtle Badges (Delivery & Swiss Precision) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Fast Delivery Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-semibold shadow-2xs">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>
                    {isAr
                      ? "توصيل سريع لكافة المحافظات"
                      : "Express Delivery in Syria"}
                  </span>
                </div>

                {/* Swiss-Precision Design Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200/80 text-[11px] font-semibold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0" />
                  <span>
                    {isAr
                      ? "تصميم بدقة سويسرية"
                      : "Swiss-Precision Design"}
                  </span>
                </div>
              </div>

              {/* Official Social & Communication Channels */}
              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/share/1Bajy1PRR6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-400 text-slate-600 hover:text-[#1877F2] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="https://www.instagram.com/sham360.online?utm_source=qr&stkn=MTVjOTVrZjBpdnczNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-pink-50 border border-slate-200/90 hover:border-pink-400 text-slate-600 hover:text-[#E4405F] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href={getWhatsAppSupportUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/90 hover:border-emerald-400 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="mailto:admin@sham360.online"
                  aria-label="Email"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-400 text-slate-600 hover:text-[#0066FF] flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                  title="Email"
                >
                  <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* COLUMN 2: Quick Links (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                {isAr ? "روابط المنظومة" : "Platform Links"}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick("hero", "/")}
                    className="hover:text-[#0066FF] transition-colors cursor-pointer text-start flex items-center gap-1.5"
                  >
                    <span>{isAr ? "الصفحة الرئيسية" : "Home"}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick("hardware", "/products")}
                    className="hover:text-[#0066FF] transition-colors cursor-pointer text-start flex items-center gap-1.5"
                  >
                    <span>{isAr ? "منتجات وبطاقات NFC" : "NFC Products & Cards"}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick("how-it-works", "/")}
                    className="hover:text-[#0066FF] transition-colors cursor-pointer text-start flex items-center gap-1.5"
                  >
                    <span>{isAr ? "كيف تعمل المنظومة" : "How It Works"}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToDirectory) onNavigateToDirectory();
                      else navigate("/directory");
                    }}
                    className="hover:text-[#0066FF] transition-colors cursor-pointer text-start flex items-center gap-1.5"
                  >
                    <span>{isAr ? "دليل الأعمال السوري الموثق" : "Syrian Verified Directory"}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToProfile) onNavigateToProfile("akram");
                      else navigate("/profile/akram");
                    }}
                    className="hover:text-[#0066FF] transition-colors cursor-pointer text-start flex items-center gap-1.5"
                  >
                    <span>{isAr ? "استعراض البروفايل الذكي" : "Smart Profile Showcase"}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Legal & Policies (lg:col-span-3) - NEW REQUESTED COLUMN */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {isAr ? "السياسات والشروط" : "Legal & Policies"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("privacy")}
                    className="group flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-blue-50/70 hover:text-[#0066FF] transition-all cursor-pointer text-start w-full"
                  >
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-800 group-hover:text-[#0066FF] transition-colors">
                        {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
                      </span>
                      <span className="text-[10.5px] text-slate-500 block">
                        {isAr ? "حماية وتشفير البيانات" : "Encrypted Data Safety"}
                      </span>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("terms")}
                    className="group flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-blue-50/70 hover:text-[#0066FF] transition-all cursor-pointer text-start w-full"
                  >
                    <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-800 group-hover:text-[#0066FF] transition-colors">
                        {isAr ? "شروط الخدمة" : "Terms of Service"}
                      </span>
                      <span className="text-[10.5px] text-slate-500 block">
                        {isAr ? "الترخيص وقواعد الاستخدام" : "Usage & Licensing"}
                      </span>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("guarantee")}
                    className="group flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg hover:bg-emerald-50/70 hover:text-emerald-700 transition-all cursor-pointer text-start w-full"
                  >
                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {isAr ? "ضمان واستبدال البطاقات" : "Guarantee & Replacement"}
                      </span>
                      <span className="text-[10.5px] text-slate-500 block">
                        {isAr ? "ضمان 12 شهراً وتحديثات سحابية" : "12-Mo Warranty & Updates"}
                      </span>
                    </div>
                  </button>
                </li>
              </ul>

              {/* Official Trust Indicator */}
              <div className="pt-1.5">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">
                    {isAr ? "بيانات محمية ومشفرة بمعايير سويسرية" : "Swiss-Grade Encrypted Security"}
                  </span>
                </div>
              </div>
            </div>

            {/* COLUMN 4: Contact & Order Desk (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                {isAr ? "مكتب الطلبات والاستفسار" : "Orders & Support Desk"}
              </h4>

              <div className="space-y-2 text-xs">
                {/* Phone Badge */}
                <a
                  href="tel:+963933888999"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-[#0066FF] font-semibold transition-all group cursor-pointer shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {isAr ? "الخط المباشر" : "Direct Telephone"}
                    </span>
                    <span dir="ltr" className="font-bold text-xs tracking-wide">
                      +963 933 888 999
                    </span>
                  </div>
                </a>

                {/* WhatsApp Badge */}
                <a
                  href={getWhatsAppSupportUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 text-slate-700 hover:text-emerald-700 font-semibold transition-all group cursor-pointer shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {isAr ? "خدمة العملاء والطلبات" : "WhatsApp Customer Desk"}
                    </span>
                    <span dir="ltr" className="font-bold text-xs tracking-wide">
                      +963 933 888 999
                    </span>
                  </div>
                </a>

                {/* Email Badge */}
                <a
                  href="mailto:admin@sham360.online"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-[#0066FF] font-semibold transition-all group cursor-pointer shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 truncate">
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {isAr ? "البريد الإلكتروني الرسمي" : "Official Inquiries"}
                    </span>
                    <span className="font-mono text-[11.5px] font-medium block truncate">
                      admin@sham360.online
                    </span>
                  </div>
                </a>

                {/* Address Badge */}
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 text-slate-700 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {isAr ? "المقر والمكتب الرئيسي" : "Headquarters"}
                    </span>
                    <span className="text-[11.5px] font-medium leading-tight block text-slate-800">
                      {isAr
                        ? "شارع فخري البارودي، دمشق، سوريا"
                        : "Fakhri Al Baroudi St, Damascus, Syria"}
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Order CTA Button */}
                <div className="pt-1">
                  <a
                    href={getWhatsAppSupportUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span>
                      {isAr ? "تواصل مباشر عبر واتساب" : "Chat on WhatsApp"}
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================
              CLEANLY ALIGNED SLEEK BOTTOM COPYRIGHT BAR
              "Fakhri Al Baroudi St, Damascus • © 2026 Sham360"
              ========================================================= */}
          <div className="pt-8 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="text-center sm:text-start text-slate-600">
              {isAr
                ? "جميع الحقوق محفوظة © SHAM360 - 2026. تصميم سويسري مبسط بمعايير عالمية."
                : "All rights reserved © SHAM360 - 2026. Swiss precision standards."}
            </p>

            <div className="flex items-center gap-2 sm:gap-3 text-[11.5px] font-mono text-slate-500 font-medium">
              <span>Fakhri Al Baroudi St, Damascus</span>
              <span>•</span>
              <span className="text-slate-700 font-semibold">© 2026 Sham360</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          CRISP, MODERN BILINGUAL LEGAL & POLICIES MODAL
          - Opens directly on-page without reload or navigation
          - Language toggle (AR/EN) inside modal
          - Clean scrollable typography with badges & bullet points
          ========================================================= */}
      <AnimatePresence>
        {activePolicy && (
          <div
            id="policy-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setActivePolicy(null)}
          >
            <motion.div
              id="policy-modal-container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="policy-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-start"
              onClick={(e) => e.stopPropagation()}
              dir={modalLanguage === "ar" ? "rtl" : "ltr"}
            >
              {/* Modal Header */}
              {(() => {
                const policy = POLICY_DETAILS[activePolicy];
                const IconComponent = policy.icon;

                return (
                  <div className="p-6 sm:p-7 border-b border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 text-[#0066FF] flex items-center justify-center shrink-0 shadow-2xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/70 text-[#0066FF] text-[10.5px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{modalLanguage === "ar" ? policy.badgeAr : policy.badgeEn}</span>
                        </div>
                        <h3 id="policy-modal-title" className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                          {modalLanguage === "ar" ? policy.titleAr : policy.titleEn}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-lg">
                          {modalLanguage === "ar" ? policy.subtitleAr : policy.subtitleEn}
                        </p>
                      </div>
                    </div>

                    {/* Header Controls: Language Switcher & Close Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Bilingual Toggle inside modal */}
                      <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setModalLanguage("ar")}
                          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            modalLanguage === "ar"
                              ? "bg-white text-[#0066FF] shadow-2xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          عربي
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalLanguage("en")}
                          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            modalLanguage === "en"
                              ? "bg-white text-[#0066FF] shadow-2xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          EN
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActivePolicy(null)}
                        aria-label="Close modal"
                        className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Modal Body (Scrollable clean content) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
                {POLICY_DETAILS[activePolicy].sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-3"
                  >
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                      {modalLanguage === "ar" ? section.headingAr : section.headingEn}
                    </h4>

                    <p className="text-slate-600 leading-relaxed font-normal">
                      {modalLanguage === "ar" ? section.textAr : section.textEn}
                    </p>

                    {(modalLanguage === "ar" ? section.bulletsAr : section.bulletsEn) && (
                      <ul className="space-y-2 pt-1">
                        {(modalLanguage === "ar" ? section.bulletsAr : section.bulletsEn)!.map(
                          (bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-[13px]">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{bullet}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Direct Contact Notice inside modal */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-800">
                    <Award className="w-4 h-4 text-[#0066FF] shrink-0" />
                    <span className="font-medium">
                      {modalLanguage === "ar"
                        ? "هل لديك أي استفسار قانوني أو استفسار بخصوص ضمان بطاقتك؟"
                        : "Have any legal questions or hardware warranty inquiries?"}
                    </span>
                  </div>
                  <a
                    href={getWhatsAppSupportUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold transition-colors shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>
                      {modalLanguage === "ar" ? "تواصل مع الإدارة" : "Contact Desk"}
                    </span>
                  </a>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200/90 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span className="font-mono font-medium">SHAM360 • Damascus, Syria</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePolicy(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all cursor-pointer"
                >
                  {modalLanguage === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
