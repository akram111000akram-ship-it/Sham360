import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  Key,
  Tag,
  Layers,
  Sparkles,
  Check,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  Eye,
  Star,
  QrCode
} from "lucide-react";
import { LogoIcon } from "./Logo";
import { Sham360OfficialKeychain } from "./card/Sham360OfficialKeychain";
import { Sham360OfficialStand } from "./card/Sham360OfficialStand";

interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  badgeAr: string;
  badgeEn: string;
  specHighlightAr: string;
  specHighlightEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  specsAr: string[];
  specsEn: string[];
  idealForAr: string;
  idealForEn: string;
  colorThemes: { name: string; hex: string; bgClass: string; textClass: string }[];
  icon: any;
}

const PRODUCTS: Product[] = [
  {
    id: "executive-card",
    nameAr: "بطاقة SHAM360 NFC الفاخرة",
    nameEn: "Executive Smart NFC Card",
    categoryAr: "بطاقات الأعمال الذكية",
    categoryEn: "Smart Business Cards",
    badgeAr: "الأكثر طلباً للأطباء والمدراء",
    badgeEn: "Best Seller for Executives",
    specHighlightAr: "تصميم مخصص وطباعة فاخرة",
    specHighlightEn: "Custom Design & Luxury Finish",
    descriptionAr: "بطاقة هوية رقمية معدنية أو مطفية بملمس مخملي فاخر. تتيح لك مشاركة بروفايلك، أرقامك، ومعلومات شركتك بتمريرة واحدة على أي هاتف دون الحاجة لأي تطبيق.",
    descriptionEn: "Luxury matte or metallic business card. Share your digital identity, vCard, and company assets with a single tap on any phone without downloading apps.",
    featuresAr: [
      "شريحة NTAG216 الأصلية ذات سعة ذاكرة عالية وسرعة استجابة فائقة",
      "طباعة حرارية بأحدث تقنيات UV المقاومة للخدش والماء تماماً",
      "إمكانية تحديث بياناتك وروابطك بأي لحظة مجاناً من لوحة التحكم",
      "رمز QR ذكي مدمج في الخلف للهواتف القديمة التي لا تدعم NFC"
    ],
    featuresEn: [
      "Original high-memory NTAG216 chip with ultra-fast latency",
      "Scratch & water-resistant premium UV thermal print finish",
      "Cloud-synced: update your links anytime from your dashboard",
      "Smart QR code fallback on back for non-NFC older devices"
    ],
    specsAr: ["مقاومة الماء: IP68", "عمر الشريحة: +100,000 تلامس", "الخامة: PVC مطفي فاخر أو معدن مصقول"],
    specsEn: ["Waterproof: IP68", "Chip Lifespan: +100,000 taps", "Material: Matte Velvet PVC or Brushed Metal"],
    idealForAr: "المدراء التنفيذيون، الأطباء، المهندسون، المستشارون، ورواد الأعمال.",
    idealForEn: "Executives, Doctors, Engineers, Consultants, and Entrepreneurs.",
    colorThemes: [
      { name: "Matte Obsidian Black", hex: "#0f172a", bgClass: "from-slate-950 via-slate-900 to-slate-800", textClass: "text-white" },
      { name: "Royal Gold Foil", hex: "#d97706", bgClass: "from-amber-950 via-amber-900 to-amber-800", textClass: "text-amber-100" },
      { name: "Deep Navy Blue", hex: "#1e3a8a", bgClass: "from-blue-950 via-blue-900 to-blue-800", textClass: "text-blue-100" }
    ],
    icon: CreditCard
  },
  {
    id: "smart-keychain",
    nameAr: "ميدالية المفاتيح الذكية",
    nameEn: "Smart NFC Keychain Tag",
    categoryAr: "إكسسوارات الهوية المحمولة",
    categoryEn: "Portable Identity Accessories",
    badgeAr: "عملية ومقاومة للصدمات",
    badgeEn: "Durable Everyday Carry",
    specHighlightAr: "صغيرة وعملية للميدان",
    specHighlightEn: "Compact for Field Work",
    descriptionAr: "ميدالية مفاتيح خفيفة الوزن وأنيقة مزودة بشريحة NFC مدمجة مع حلقة معدنية صلبة. الحل الأمثل لمندوبي المبيعات، الفنيين، والموظفين الميدانيين.",
    descriptionEn: "Compact and stylish key fob tag with embedded NFC chip and reinforced stainless ring. Ideal for realtors, sales teams, and active field specialists.",
    featuresAr: [
      "هيكل كربوني وإيبوكسي صلب مقاوم للصدمات والماء 100%",
      "ملازمة لمفاتيحك دائماً؛ لن تفقد وسيلة مشاركة هويتك أبداً",
      "ربط مباشر ببطاقة الاتصال vCard أو ملف أعمالك على واتساب",
      "طباعة شعار شركتك أو اسمك بدقة عالية وألوان ثابتة"
    ],
    featuresEn: [
      "100% shockproof and waterproof resin/epoxy shell",
      "Always on your keychain—never be caught without your identity",
      "Direct link to vCard contact or WhatsApp business catalog",
      "High-definition custom logo printing with permanent colors"
    ],
    specsAr: ["القطر: 30mm فقط", "الوزن: 8 غرامات", "مقاومة السقوط والدهس"],
    specsEn: ["Diameter: 30mm", "Weight: 8g", "Heavy-duty drop protection"],
    idealForAr: "مندوبو المبيعات، مدراء الصيانة والورشات، الوكلاء العقاريون، والجامعيون.",
    idealForEn: "Sales Reps, Property Agents, Field Engineers, and Students.",
    colorThemes: [
      { name: "Carbon Fiber", hex: "#18181b", bgClass: "from-zinc-900 to-zinc-950", textClass: "text-white" },
      { name: "Electric Cyan", hex: "#0891b2", bgClass: "from-cyan-900 to-cyan-950", textClass: "text-cyan-100" }
    ],
    icon: Key
  },
  {
    id: "table-stands-stickers",
    nameAr: "ملصقات وحوامل الطاولات الذكية",
    nameEn: "NFC Table Stands & Review Stickers",
    categoryAr: "حلول المطاعم والفنادق والعيادات",
    categoryEn: "Hospitality & Clinic Solutions",
    badgeAr: "مضاعفة تقييمات Google 5-Stars",
    badgeEn: "Boost Google 5-Star Reviews 3x",
    specHighlightAr: "باقات متكاملة للطاولات",
    specHighlightEn: "Bulk Venue Bundles",
    descriptionAr: "ملصقات وحوامل أكريليك مخصصة لطاولات المطاعم، المقاهي، ومكاتب الاستقبال. بمجرد أن يضع الزبون هاتفه فوق الستاند، تُفتح صفحة تقييم Google أو المنيو فوراً!",
    descriptionEn: "Smart acrylic table stands and NFC puck stickers for dining tables and counters. Direct patrons to leave 5-star Google Reviews or view menus with zero friction.",
    featuresAr: [
      "زيادة تقييمات خرائط Google بنسبة تصل إلى +300% في أول شهر",
      "استعراض قائمة الطعام الرقمية الذكية (Digital Menu) بدون تلامس ورقي",
      "حماية ضد السوائل، المنظفات، والحرارة العالية",
      "طباعة مخصصة متناغمة مع هوية مطعمك أو فندقك بالكامل"
    ],
    featuresEn: [
      "Boost Google Maps reviews by up to +300% within the first 30 days",
      "Launch contactless digital PDF / interactive menu instantly",
      "Resistant to food spills, chemical sanitizers, and direct sunlight",
      "Fully customized with your restaurant's brand identity"
    ],
    specsAr: ["حامل أكريليك شفاف كريستالي", "تثبيت مغناطيسي أو لاصق 3M قوي", "NFC + QR متزامنان"],
    specsEn: ["Crystal Acrylic Stand", "Heavy-duty 3M adhesive mount", "Dual NFC + QR code"],
    idealForAr: "المطاعم، المقاهي، الفنادق، صالونات التجميل، ومراكز طب الأسنان.",
    idealForEn: "Restaurants, Cafes, Hotels, Beauty Salons, and Dental Clinics.",
    colorThemes: [
      { name: "Crystal Acrylic", hex: "#334155", bgClass: "from-slate-800 to-slate-900", textClass: "text-white" },
      { name: "Warm Bistro Amber", hex: "#b45309", bgClass: "from-amber-900 to-slate-950", textClass: "text-amber-100" }
    ],
    icon: Tag
  },
  {
    id: "acrylic-qr-displays",
    nameAr: "لوحات الـ QR والأكريليك المطبوعة",
    nameEn: "Custom Acrylic QR Displays",
    categoryAr: "لوحات الاستقبال والمكاتب",
    categoryEn: "Reception & Counter Displays",
    badgeAr: "واجهة فخمة للاستقبال",
    badgeEn: "Executive Front Desk Display",
    specHighlightAr: "تصنيع يدوي فاخر حسب المقاس",
    specHighlightEn: "Bespoke Acrylic Craftsmanship",
    descriptionAr: "لوحات طاولة وجدارية أنيقة من الأكريليك الشفاف والخشب المصقول المدمجة بتقنيتي NFC و QR Code. مخصصة لكاونترات الاستقبال، غرف الاجتماعات، ومكاتب الشركات الفاخرة.",
    descriptionEn: "Premium acrylic and polished wood desk stands equipped with integrated NFC chip and laser-engraved QR codes. Built for reception desks, hotel lobbies, and executive suites.",
    featuresAr: [
      "توليد انطباع احترافي مبهر لكل عميل يزور مقر شركتك أو عيادتك",
      "توجيه الزائرين مباشرة لدفع الفواتير، الاتصال، أو تقييم التجربة",
      "أبعاد متنوعة تناسب مكاتب الكاشير والاستقبال والمعارض",
      "تطعيم بأحرف بارزة ثلاثية الأبعاد (3D Gold/Silver Acrylic)"
    ],
    featuresEn: [
      "Creates an instant prestigious impression for all visitors",
      "Route guests to Wi-Fi connect, Google Reviews, or WhatsApp support",
      "Available in multiple desktop and wall-mount dimensions",
      "Option for 3D raised mirrored gold/silver acrylic lettering"
    ],
    specsAr: ["سماكة الأكريليك: 5mm - 8mm", "قاعدة خشبية فاخرة أو معدنية", "شريحة NFC مخفية"],
    specsEn: ["Acrylic Thickness: 5mm - 8mm", "Solid Walnut or Metal Base", "Concealed NFC Chip"],
    idealForAr: "استقبال الفنادق، مكاتب الشركات، المعارض، كاونترات الدفع، وعيادات التجميل.",
    idealForEn: "Hotel Receptions, Corporate Foyers, Showrooms, and POS Counters.",
    colorThemes: [
      { name: "Obsidian & Gold", hex: "#1e1b4b", bgClass: "from-slate-950 via-indigo-950 to-slate-900", textClass: "text-amber-300" },
      { name: "Clear Minimalist", hex: "#475569", bgClass: "from-slate-800 to-slate-900", textClass: "text-white" }
    ],
    icon: QrCode
  }
];

interface NFCHardwareStorefrontProps {
  isAr?: boolean;
}

export const NFCHardwareStorefront: React.FC<NFCHardwareStorefrontProps> = ({ isAr = true }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("executive-card");
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({
    "executive-card": 0,
    "smart-keychain": 0,
    "table-stands-stickers": 0,
    "acrylic-qr-displays": 0
  });

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleColorChange = (productId: string, colorIndex: number) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorIndex }));
  };

  const createWhatsAppUrl = (product: Product) => {
    const text = isAr
      ? `مرحباً Sham360 👋\nأود طلب وتفصيل المنتج الذكي التالي:\n\n✨ *${product.nameAr}*\n📌 التصنيف: ${product.categoryAr}\nالرجاء تزويدي بنماذج التصاميم وخيارات الطباعة المتاحة.`
      : `Hello Sham360 👋\nI would like to inquire about ordering:\n\n✨ *${product.nameEn}*\nCategory: ${product.categoryEn}\nPlease send me available design templates and printing options.`;
    return `https://wa.me/963933888999?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="hardware-storefront" className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? "rtl" : "ltr"}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold shadow-inner">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? "متجر منتجات NFC والأكريليك الذكية" : "Smart NFC & Hardware Storefront"}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {isAr ? "عتاد ذكي يربط عملاءك بعالمك الرقمي بلمسة واحدة" : "Smart Hardware That Connects Customers In A Single Tap"}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "منتجات مادية فاخرة مصنّعة بأعلى معايير الجودة ومدمجة بشرائح NFC الأصلية لتوزيع هويتك، وزيادة تقييمات Google، وتسهيل الدفع والتواصل."
              : "Premium physical products engineered with authentic NFC microchips to share your identity, multiply Google Reviews, and streamline customer connections."}
          </p>

          {/* Quick Hardware Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {[
              { textAr: "شريحة NTAG216 الأصلية ⚡", textEn: "Original NTAG216 Chip ⚡" },
              { textAr: "مقاومة الماء والتلف 100% 🛡️", textEn: "100% Waterproof IP68 🛡️" },
              { textAr: "تحديث السحابة مجاناً مدى الحياة ☁️", textEn: "Lifetime Free Cloud Sync ☁️" },
              { textAr: "شحن لكافة المحافظات السورية 🇸🇾", textEn: "Syria-wide Delivery 🇸🇾" }
            ].map((b, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300"
              >
                {isAr ? b.textAr : b.textEn}
              </span>
            ))}
          </div>
        </div>

        {/* =========================================================
            PRODUCTS GRID (4 High-Converting Interactive Tiles)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const isSelected = selectedProductId === product.id;
            const activeColorIdx = selectedColors[product.id] || 0;
            const activeColor = product.colorThemes[activeColorIdx] || product.colorThemes[0];
            const Icon = product.icon;

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative border ${
                  isSelected
                    ? "bg-slate-900 border-blue-500/80 shadow-[0_10px_35px_rgba(59,130,246,0.2)]"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
                onClick={() => setSelectedProductId(product.id)}
              >
                {/* Product Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    {isAr ? product.badgeAr : product.badgeEn}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* 3D Visual Mockup Card of Product */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 flex items-center justify-center p-3 border border-slate-800 bg-slate-950/80 group">
                  {/* Internal Card Object */}
                  <motion.div
                    animate={{
                      rotateY: isSelected ? [0, 8, -8, 0] : 0,
                      rotateX: isSelected ? [0, -4, 4, 0] : 0
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className={`w-full max-w-[210px] h-[128px] rounded-xl ${
                      product.id === "executive-card"
                        ? "bg-[#070D18]"
                        : `bg-gradient-to-tr ${activeColor.bgClass}`
                    } p-2.5 flex flex-col justify-between items-center text-center shadow-xl border border-white/10 relative overflow-hidden transition-all duration-300`}
                  >
                    {product.id === "executive-card" ? (
                      <>
                        {/* Radial Velvet Light Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.25),transparent_70%)] pointer-events-none" />
                        <div className="absolute inset-[1px] rounded-xl border border-white/10 pointer-events-none" />

                        {/* Top: 3D SHAM360 Pin with Airplane Orbit */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-8 h-8 flex items-center justify-center filter drop-shadow-[0_3px_6px_rgba(0,102,255,0.4)]">
                            <LogoIcon size={28} light={true} />
                          </div>
                        </div>

                        {/* Upper Text: SMART DIGITAL PRESENCE */}
                        <div className="relative z-10 text-center w-full">
                          <span className="text-[8px] font-black tracking-[0.2em] text-white font-sans uppercase block">
                            SMART DIGITAL PRESENCE
                          </span>
                        </div>

                        {/* Center Contactless Wave Circle */}
                        <div className="relative z-10 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full border border-white/95 flex items-center justify-center bg-white/5">
                            <svg
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3.5 h-3.5 text-white"
                            >
                              <path d="M 16 26 A 7 7 0 0 0 16 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                              <path d="M 21 29 A 12 12 0 0 0 21 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                              <path d="M 26 32 A 17 17 0 0 0 26 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>

                        {/* Bottom Text: TAP. CONNECT. SHARE. */}
                        <div className="relative z-10 text-center w-full">
                          <span className="text-[7.5px] font-black tracking-[0.16em] text-white/90 font-sans uppercase block">
                            TAP. CONNECT. SHARE.
                          </span>
                        </div>
                      </>
                    ) : product.id === "smart-keychain" ? (
                      /* Authentic Crystal Clear Acrylic Keychain from Photo */
                      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-1">
                        <Sham360OfficialKeychain
                          size="sm"
                          interactive={false}
                          showDetails={false}
                          backgroundTheme="dark"
                        />
                      </div>
                    ) : product.id === "table-stands-stickers" ? (
                      /* Authentic Glossy White Acrylic L-Stand from Photo */
                      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-1">
                        <Sham360OfficialStand
                          size="sm"
                          interactive={false}
                          showDetails={false}
                          backgroundTheme="dark"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Metallic Texture Lines */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
                        
                        {/* Top Row */}
                        <div className="flex items-center justify-between relative z-10 w-full">
                          <span className="text-[10px] font-black tracking-wider text-white">SHAM360</span>
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        </div>

                        {/* Middle Chip / Icon */}
                        <div className="relative z-10 flex items-center justify-between w-full">
                          <div className="w-6 h-5 rounded bg-amber-400/80 border border-amber-300/60 flex items-center justify-center">
                            <div className="w-3 h-2 border border-amber-800/40 rounded-2xs" />
                          </div>
                          <span className="text-[8px] font-mono text-slate-300">13.56 MHz</span>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between relative z-10 w-full">
                          <span className="text-[9px] font-bold text-slate-200 truncate max-w-[110px]">
                            {isAr ? product.nameAr : product.nameEn}
                          </span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Color Switcher Dots */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-900/90 px-2 py-1 rounded-full border border-slate-700">
                    {product.colorThemes.map((c, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleColorChange(product.id, idx);
                        }}
                        className={`w-3 h-3 rounded-full transition-transform cursor-pointer ${
                          activeColorIdx === idx ? "scale-125 ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-950" : "opacity-60 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2 mb-4 flex-1">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">
                    {isAr ? product.categoryAr : product.categoryEn}
                  </span>
                  <h3 className="text-base font-black text-white leading-snug">
                    {isAr ? product.nameAr : product.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {isAr ? product.descriptionAr : product.descriptionEn}
                  </p>
                </div>

                {/* Bullet Features */}
                <div className="space-y-1.5 mb-5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                  {product.featuresAr.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{isAr ? feat : product.featuresEn[idx]}</span>
                    </div>
                  ))}
                </div>

                {/* Direct WhatsApp Order CTA Button */}
                <a
                  href={createWhatsAppUrl(product)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isAr ? "اطلب عبر الواتساب" : "Order via WhatsApp"}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isAr ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
                </a>

              </motion.div>
            );
          })}
        </div>

        {/* Selected Product Deep-Dive Showcase Box */}
        <div className="mt-12 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? "تفاصيل المواصفات وضمان الاستبدال" : "Hardware Specifications & Replacement Warranty"}</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isAr ? selectedProduct.nameAr : selectedProduct.nameEn}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
              </p>

              {/* All 4 Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {selectedProduct.featuresAr.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? f : selectedProduct.featuresEn[idx]}</span>
                  </div>
                ))}
              </div>

              {/* Ideal for note */}
              <div className="pt-1 text-xs text-slate-400">
                <strong className="text-slate-200">{isAr ? "الأنسب لـ: " : "Ideal for: "}</strong>
                <span>{isAr ? selectedProduct.idealForAr : selectedProduct.idealForEn}</span>
              </div>
            </div>

            {/* Quick Action Column */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                <Zap className="w-7 h-7 animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400">{isAr ? "جاهز للتنفيذ والطباعة" : "Ready for Custom Print"}</span>
                <h4 className="text-lg font-black text-white">
                  {isAr ? "احصل على عيّنة وتخصيص مباشر" : "Request Free Sample & Direct Specs"}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isAr ? "فريقنا الهندسي يجهز لك مسودة التصميم مجاناً قبل اعتماد الطباعة." : "Our design engineers prepare your custom proof before production."}
                </p>
              </div>

              <a
                href={createWhatsAppUrl(selectedProduct)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isAr ? "تواصل واطلب عبر واتساب" : "Chat & Order on WhatsApp"}</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
