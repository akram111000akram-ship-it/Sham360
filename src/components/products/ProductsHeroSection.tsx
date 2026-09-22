import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  Crown,
  Layers,
  Key,
  ShoppingBag,
  Sliders,
  CheckCheck,
  Smartphone,
  MessageCircle,
  HelpCircle,
  Download,
  Sparkles,
  Zap,
  ShieldCheck,
  RefreshCw,
  Radio,
  Wifi,
  QrCode,
  Share2,
  MapPin,
  X,
  CheckCircle2,
  UserCheck,
  Globe,
  PhoneCall,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowUpRight
} from "lucide-react";
import { useRouter } from "../../services/router";
import {
  ProductItem,
  PRODUCTS_CATALOG,
  getSyrianWhatsAppOrderUrl,
  getSyrianGeneralInquiryUrl,
  officialSmartCardImg,
  mirrorSmartCardImg,
  standCloseupImg,
  keychainCloseupImg,
  fullSuiteImg
} from "../../data/productsCatalogData";

interface ProductsHeroSectionProps {
  isAr: boolean;
  onOpenLogoModal: () => void;
}

export const ProductsHeroSection: React.FC<ProductsHeroSectionProps> = ({
  isAr,
  onOpenLogoModal
}) => {
  const { navigate } = useRouter();
  const [heroProductMode, setHeroProductMode] = useState<"card" | "mirror" | "stand" | "keychain" | "all">("card");
  const [customizerName, setCustomizerName] = useState<string>(isAr ? "أكرم الحموي / منشأة الشام" : "Akram Al-Hamwi / Sham Enterprise");
  const [customizerTitle, setCustomizerTitle] = useState<string>(isAr ? "الرئيس التنفيذي • SHAM360" : "Chief Executive Officer • SHAM360");
  const [customizerCenter, setCustomizerCenter] = useState<string>(isAr ? "دمشق - مركز الميدان" : "Damascus - Al-Midan Hub");

  const [isSimulatingTap, setIsSimulatingTap] = useState(false);
  const [showTapSuccessModal, setShowTapSuccessModal] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>("social");

  const handleHeroWhatsAppOrder = () => {
    const targetProduct = PRODUCTS_CATALOG.find((p) => {
      if (heroProductMode === "card") return p.id === "card-sham360-custom";
      if (heroProductMode === "mirror") return p.id === "card-sham360-mirror";
      if (heroProductMode === "keychain") return p.id === "tag-sham360-keychain";
      if (heroProductMode === "all") return p.id === "card-sham360-custom";
      return p.id === "stand-sham360-acrylic";
    }) || PRODUCTS_CATALOG[0];

    window.open(
      getSyrianWhatsAppOrderUrl(targetProduct, customizerName, customizerTitle, customizerCenter, isAr),
      "_blank"
    );
  };

  const handleGeneralInquiry = () => {
    window.open(getSyrianGeneralInquiryUrl(isAr), "_blank");
  };

  const triggerTapSimulation = () => {
    if (isSimulatingTap) return;
    setIsSimulatingTap(true);
    setShowTapSuccessModal(false);

    setTimeout(() => {
      setShowTapSuccessModal(true);
    }, 700);

    setTimeout(() => {
      setIsSimulatingTap(false);
    }, 2800);
  };

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Business Storytelling & Order Personalization */}
          <div className="lg:col-span-6 space-y-6 text-start order-2 lg:order-1">
            {/* Official Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {isAr
                  ? "بطاقة SHAM360 الذكية الرسمية (Front & Back) • عتاد الهوية الرقمية في سوريا"
                  : "Official SHAM360 Smart Card (Front & Back) • Digital Identity in Syria"}
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.25]"
            >
              {isAr ? (
                <>
                  بطاقة الأعمال الذكية الرسمية{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                    بوجهين تدمج كافة وسائل التواصل بلمسة واحدة.
                  </span>
                </>
              ) : (
                <>
                  Official Smart NFC Executive Card{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                    integrating all channels & links in one tap.
                  </span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              {isAr
                ? "الهوية الرقمية المعتمدة لرجال الأعمال والشركات: وجه أمامي كحلي فاخر بنقر NFC فوري، ووجه خلفي تفاعلي يجمع كافة منصات التواصل الاجتماعي (انستغرام، فيسبوك، لينكدإن، يوتيوب، تيك توك، واتساب)، موقعك الإلكتروني، وموقعك الجغرافي، مع ستاندات الطاولات وميداليات المفاتيح التفاعلية."
                : "The certified digital identity for business leaders and companies: luxurious navy front face with instant NFC tap, and interactive back face uniting all social platforms (Instagram, Facebook, LinkedIn, YouTube, TikTok, WhatsApp), your website, and Google Maps location."}
            </motion.p>

            {/* Product Type Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setHeroProductMode("card")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  heroProductMode === "card"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/80 ring-2 ring-blue-500/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>{isAr ? "البطاقة الرسمية" : "Official Card"}</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroProductMode("mirror")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  heroProductMode === "mirror"
                    ? "bg-white text-amber-700 shadow-sm border border-slate-200/80 ring-2 ring-amber-500/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>{isAr ? "بطاقة المرآة (Posh)" : "Mirror (Posh)"}</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroProductMode("stand")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  heroProductMode === "stand"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isAr ? "ستاند المكاتب" : "Desk Stand"}</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroProductMode("keychain")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  heroProductMode === "keychain"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>{isAr ? "الميدالية الذكية" : "Keychain"}</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroProductMode("all")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  heroProductMode === "all"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isAr ? "المجموعة الكاملة" : "Full Suite"}</span>
              </button>
            </div>

            {/* Interactive Order Personalization Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {isAr ? "تخصيص بيانات الطلب والتجهيز السحابي:" : "Customize Order & Cloud Profile:"}
                  </span>
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" />
                  {isAr ? "برمجة سحابية فورية" : "Instant Cloud Sync"}
                </span>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    {isAr ? "الاسم أو اسم المنشأة / العيادة / المطعم:" : "Full Name or Business Name:"}
                  </label>
                  <input
                    type="text"
                    value={customizerName}
                    onChange={(e) => setCustomizerName(e.target.value)}
                    placeholder={isAr ? "أدخل الاسم أو اسم منشأتك" : "Enter name or company"}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    {isAr ? "المسمى أو النشاط التجاري:" : "Job Title or Sector:"}
                  </label>
                  <input
                    type="text"
                    value={customizerTitle}
                    onChange={(e) => setCustomizerTitle(e.target.value)}
                    placeholder={isAr ? "مثال: مطعم وكافيه، استشاري، مدير..." : "e.g., Executive, Restaurant, Doctor..."}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Delivery Center Choice */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {isAr ? "مركز الاستلام والتسليم المفضل في سوريا:" : "Preferred Delivery Hub in Syria:"}
                </label>
                <select
                  value={customizerCenter}
                  onChange={(e) => setCustomizerCenter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                >
                  <option value={isAr ? "دمشق - مركز الميدان" : "Damascus - Al-Midan Hub"}>
                    {isAr ? "دمشق - مركز الميدان" : "Damascus - Al-Midan Hub"}
                  </option>
                  <option value={isAr ? "دمشق - مركز الشعلان والمزة" : "Damascus - Sha'alan & Mazzeh Hub"}>
                    {isAr ? "دمشق - مركز الشعلان والمزة" : "Damascus - Sha'alan & Mazzeh Hub"}
                  </option>
                  <option value={isAr ? "حلب - مركز الجميلية" : "Aleppo - Jamiliyah Hub"}>
                    {isAr ? "حلب - مركز الجميلية" : "Aleppo - Jamiliyah Hub"}
                  </option>
                  <option value={isAr ? "شحن داخلي - حمص / حماة" : "Shipping - Homs / Hama"}>
                    {isAr ? "شحن داخلي - حمص / حماة" : "Shipping - Homs / Hama"}
                  </option>
                  <option value={isAr ? "شحن داخلي - اللاذقية / طرطوس" : "Shipping - Latakia / Tartus"}>
                    {isAr ? "شحن داخلي - اللاذقية / طرطوس" : "Shipping - Latakia / Tartus"}
                  </option>
                  <option value={isAr ? "شحن داخلي لكافة المحافظات" : "Nationwide Shipping across Syria"}>
                    {isAr ? "شحن داخلي لكافة المحافظات السورية" : "Nationwide Shipping across Syria"}
                  </option>
                </select>
              </div>

              {/* Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={triggerTapSimulation}
                  disabled={isSimulatingTap}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-black flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>
                    {isSimulatingTap
                      ? isAr ? "جاري محاكاة التلامس..." : "Simulating Tap..."
                      : isAr ? "جرّب التلامس بالهاتف الآن" : "Try Phone Tap Demo"}
                  </span>
                </button>

                <span className="text-[11px] text-slate-500 font-medium">
                  {isAr ? "المس بالهاتف • يفتح بروفايلك فوراً" : "Touch with phone • Opens profile instantly"}
                </span>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleHeroWhatsAppOrder}
                  className="flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/20 transition-all cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{isAr ? "طلب وتنسيق التجهيز عبر الواتساب" : "Order & Coordinate via WhatsApp"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGeneralInquiry}
                  className="py-4 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>{isAr ? "استفسار عن عروض الشركات" : "Corporate Inquiries"}</span>
                </button>
              </div>

              {/* Guarantee & Local Delivery Note */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  <strong className="text-slate-900 font-black">
                    {isAr ? "تجهيز مخصص حسب الطلب والكميات" : "Custom specs tailored by order & volume"}
                  </strong>{" "}
                  • {isAr ? "برمجة سحابية وتصميم مجاني" : "Free cloud setup & design"}
                </span>
                <span className="text-[11px] text-blue-600 font-bold">
                  {isAr
                    ? "شحن آمن لكافة المحافظات واستلام مباشر في دمشق وحلب"
                    : "Direct pickup in Damascus & Aleppo + nationwide delivery"}
                </span>
              </div>

              {/* Live Interactive Profile Demo CTA & Card Identity Specs */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="w-full p-3.5 sm:p-4 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/90 text-slate-900 font-bold text-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 transition-all cursor-pointer shadow-xs group text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-black text-slate-950 group-hover:text-[#0066FF] transition-colors">
                          {isAr
                            ? "جرّب البروفايل الذكي التفاعلي مباشرة"
                            : "Test the Live Interactive Digital Profile"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#0066FF]/15 text-[#0066FF]">
                          {isAr ? "معاينة حية ⚡" : "Live Demo ⚡"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-normal mt-0.5">
                        {isAr
                          ? "شاهد كيف تظهر جهات الاتصال، خرائط Google، وروابط التواصل فور نقر البطاقة بالهاتف"
                          : "See how contacts, Google Maps, and social channels appear upon contactless phone tap"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-blue-200/60">
                    <span className="px-3 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-black group-hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm">
                      <span>{isAr ? "فتح المعاينة" : "Open Demo"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* 3 Core Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-700 font-bold">
                  {isAr ? "بدون أي تطبيق" : "Zero App Required"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-700 font-bold">
                  {isAr ? "توافق 100% مع الهواتف" : "100% Phone Compatibility"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-700 font-bold">
                  {isAr ? "تحديث سحابي دائم" : "Lifetime Cloud Sync"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Motion Product Stage & Phone Tap Simulation */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2">
            {/* Floating ambient glow behind product */}
            <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[110px] pointer-events-none" />

            {/* Main Motion Stage Container */}
            <div className="relative z-10 w-full max-w-lg mx-auto">
              
              {/* Floating Interactive Badge Top */}
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-[11px] font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {heroProductMode === "card"
                      ? (isAr ? "بطاقة الأعمال الذكية الرسمية (Front & Back)" : "Official Smart Card (Front & Back)")
                      : heroProductMode === "stand"
                      ? (isAr ? "ستاند الطاولات والمكاتب" : "Counter & Desktop Stand")
                      : heroProductMode === "keychain"
                      ? (isAr ? "ميدالية المفاتيح الذكية" : "Smart NFC Keychain")
                      : (isAr ? "المجموعة التفاعلية الشاملة" : "Complete NFC Hardware Suite")}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={triggerTapSimulation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-black shadow-md shadow-blue-600/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Radio className="w-3.5 h-3.5 animate-ping" />
                  <span>{isAr ? "جرّب التلامس بالهاتف الآن" : "Simulate Phone Tap"}</span>
                </button>
              </div>

              {/* 3D Floating Product Frame */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl shadow-slate-300/60 group"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={
                      heroProductMode === "card"
                        ? officialSmartCardImg
                        : heroProductMode === "mirror"
                        ? mirrorSmartCardImg
                        : heroProductMode === "stand"
                        ? standCloseupImg
                        : heroProductMode === "keychain"
                        ? keychainCloseupImg
                        : fullSuiteImg
                    }
                    alt="SHAM360 Smart NFC Products"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/20 pointer-events-none" />

                  {/* Hotspots for Card */}
                  {heroProductMode === "card" && (
                    <>
                      {/* Front NFC Antenna */}
                      <div className="absolute top-[42%] right-[70%] z-20">
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(activeHotspot === "front-nfc" ? null : "front-nfc")}
                          className="relative group/hotspot cursor-pointer focus:outline-none"
                          title={isAr ? "الوجه الأمامي: نقر NFC" : "Front Face: NFC Tap"}
                        >
                          <span className="w-8 h-8 rounded-full bg-blue-600/40 border-2 border-blue-400 flex items-center justify-center text-white backdrop-blur-md shadow-xl">
                            <span className="w-4 h-4 rounded-full bg-blue-500 animate-ping absolute" />
                            <Wifi className="w-4 h-4 relative z-10 text-white" />
                          </span>

                          <AnimatePresence>
                            {activeHotspot === "front-nfc" && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                className="absolute bottom-full right-0 mb-2 w-52 p-3 rounded-2xl bg-slate-950/95 text-white text-[11px] backdrop-blur-md border border-blue-500/40 shadow-2xl z-30"
                              >
                                <div className="font-black text-blue-400 flex items-center gap-1.5 mb-1">
                                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                                  <span>{isAr ? "الوجه الأمامي (FRONT): نقر فوري" : "Front Face: Instant NFC Tap"}</span>
                                </div>
                                <p className="text-slate-300 text-[10.5px] leading-relaxed">
                                  {isAr
                                    ? "مظهر كحلي فاخر مع شعار بارز وهوائي مدمج ينقل بروفايلك لأي هاتف بلمسة واحدة خلال 0.1 ثانية."
                                    : "Luxurious executive navy finish with embedded antenna transferring your profile in 0.1s."}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>

                      {/* Back Pure NFC Contactless Hub */}
                      <div className="absolute top-[36%] right-[22%] z-20">
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(activeHotspot === "back-nfc" ? null : "back-nfc")}
                          className="relative group/hotspot cursor-pointer focus:outline-none"
                          title={isAr ? "الوجه الخلفي: نقر NFC نقي (بدون كود QR)" : "Back Face: Pure NFC (No QR Code)"}
                        >
                          <span className="w-8 h-8 rounded-full bg-blue-600/40 border-2 border-blue-400 flex items-center justify-center text-white backdrop-blur-md shadow-xl">
                            <span className="w-4 h-4 rounded-full bg-blue-500 animate-ping absolute" />
                            <Wifi className="w-4 h-4 relative z-10 text-white" />
                          </span>

                          <AnimatePresence>
                            {activeHotspot === "back-nfc" && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                className="absolute bottom-full right-0 mb-2 w-52 p-3 rounded-2xl bg-slate-950/95 text-white text-[11px] backdrop-blur-md border border-blue-500/40 shadow-2xl z-30"
                              >
                                <div className="font-black text-blue-400 flex items-center gap-1.5 mb-1">
                                  <Wifi className="w-3.5 h-3.5 text-blue-400" />
                                  <span>{isAr ? "الوجه الخلفي: نقر NFC نقي" : "Back Face: Pure NFC Tap"}</span>
                                </div>
                                <p className="text-slate-300 text-[10.5px] leading-relaxed">
                                  {isAr
                                    ? "تصميم ناصع البياض يضم هويتك وشبكات التواصل بنقر تلامسي فوري NFC (خالي من أي رمز QR)."
                                    : "Clean white design featuring your identity and social handles via pure contactless NFC (no QR code on back)."}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>

                      {/* Back Social Networks */}
                      <div className="absolute top-[68%] right-[28%] z-20">
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(activeHotspot === "social" ? null : "social")}
                          className="relative group/hotspot cursor-pointer focus:outline-none"
                          title={isAr ? "شبكات التواصل الاجتماعي" : "Social Media Channels"}
                        >
                          <span className="w-8 h-8 rounded-full bg-indigo-600/40 border-2 border-indigo-400 flex items-center justify-center text-white backdrop-blur-md shadow-xl">
                            <span className="w-4 h-4 rounded-full bg-indigo-500 animate-ping absolute" />
                            <Share2 className="w-4 h-4 relative z-10 text-white" />
                          </span>

                          <AnimatePresence>
                            {activeHotspot === "social" && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                className="absolute bottom-full right-0 mb-2 w-52 p-3 rounded-2xl bg-slate-950/95 text-white text-[11px] backdrop-blur-md border border-indigo-500/40 shadow-2xl z-30"
                              >
                                <div className="font-black text-indigo-400 flex items-center gap-1.5 mb-1">
                                  <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>{isAr ? "كافة وسائل التواصل" : "All Social Channels"}</span>
                                </div>
                                <p className="text-slate-300 text-[10.5px] leading-relaxed">
                                  {isAr
                                    ? "Instagram, Facebook, LinkedIn, TikTok, YouTube, WhatsApp وموقعك على Google Maps."
                                    : "Instagram, Facebook, LinkedIn, TikTok, YouTube, WhatsApp & Google Maps."}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Tap Simulation Result Modal Card */}
              <AnimatePresence>
                {showTapSuccessModal && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="mt-4 p-5 rounded-3xl bg-white border-2 border-emerald-500 shadow-2xl shadow-emerald-600/15 space-y-4 text-start"
                  >
                    {/* Native OS Tap Notification Banner */}
                    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Wifi className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                            <span>
                              {isAr ? "تم التقاط بطاقة SHAM360 الذكية بنجاح!" : "SHAM360 Smart Card Detected!"}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {isAr
                              ? "فُتحت الصفحة التفاعلية مباشرة على هاتف العميل دون أي تطبيق."
                              : "Interactive profile opened directly on client's phone with zero app."}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowTapSuccessModal(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Interactive Digital Profile Card Opened on Customer Phone */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                      
                      {/* Profile Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-base shadow-md shadow-blue-600/20">
                          360
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-black text-sm text-slate-900 truncate">
                              {customizerName}
                            </h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {customizerTitle}
                          </p>
                        </div>
                      </div>

                      {/* 5 Core Hubs */}
                      <div className="grid grid-cols-5 gap-1.5 py-1 text-center">
                        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
                          <UserCheck className="w-3.5 h-3.5 text-blue-600 mb-1" />
                          <span className="text-[10px] font-bold text-slate-700">{isAr ? "البروفايل" : "Profile"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
                          <Globe className="w-3.5 h-3.5 text-indigo-600 mb-1" />
                          <span className="text-[10px] font-bold text-slate-700">{isAr ? "الموقع" : "Website"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
                          <Share2 className="w-3.5 h-3.5 text-emerald-600 mb-1" />
                          <span className="text-[10px] font-bold text-slate-700">{isAr ? "التواصل" : "Social"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
                          <MapPin className="w-3.5 h-3.5 text-rose-600 mb-1" />
                          <span className="text-[10px] font-bold text-slate-700">{isAr ? "الخريطة" : "Map"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center">
                          <PhoneCall className="w-3.5 h-3.5 text-amber-600 mb-1" />
                          <span className="text-[10px] font-bold text-slate-700">{isAr ? "الاتصال" : "Contact"}</span>
                        </div>
                      </div>

                      {/* Social Channels Preview */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3 text-blue-600" />
                            <span>{isAr ? "قنوات التواصل المربوطة:" : "Connected Social Channels:"}</span>
                          </span>
                          <span className="text-[10px] text-emerald-600 font-medium">
                            {isAr ? "محدثة سحابياً 24/7" : "Cloud Synced 24/7"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border border-pink-200/80 text-pink-900 flex items-center gap-2 shadow-xs transition-all"
                          >
                            <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                            <span className="truncate">Instagram</span>
                          </a>

                          <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 flex items-center gap-2 shadow-xs transition-all"
                          >
                            <Facebook className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="truncate">Facebook</span>
                          </a>

                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 flex items-center gap-2 shadow-xs transition-all"
                          >
                            <Linkedin className="w-4 h-4 text-sky-700 flex-shrink-0" />
                            <span className="truncate">LinkedIn</span>
                          </a>

                          <a
                            href={`https://wa.me/963933888999?text=${encodeURIComponent(isAr ? "مرحباً، تم فتح بروفايلكم عبر بطاقة SHAM360 الذكية" : "Hello, opened your profile via SHAM360 Smart Card")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 flex items-center gap-2 shadow-xs transition-all"
                          >
                            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600 flex-shrink-0" />
                            <span className="truncate">WhatsApp</span>
                          </a>

                          <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-900 flex items-center gap-2 shadow-xs transition-all"
                          >
                            <Youtube className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span className="truncate">YouTube & TikTok</span>
                          </a>

                          <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 flex items-center gap-2 shadow-xs transition-all"
                          >
                            <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span className="truncate">Google Maps</span>
                          </a>
                        </div>
                      </div>

                      {/* Primary vCard Save Action */}
                      <div className="pt-2">
                        <button
                          type="button"
                          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>
                            {isAr
                              ? "حفظ جهة الاتصال مباشرة في الهاتف (Save Contact vCard)"
                              : "Save Contact Directly to Phone (.vcf)"}
                          </span>
                        </button>
                      </div>

                      {/* Eco Friendly Note */}
                      <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-800 text-[10.5px] flex items-center justify-center gap-1.5">
                        <span className="font-bold">
                          {isAr ? "🌱 استدامة بيئية:" : "🌱 Eco-Friendly:"}
                        </span>
                        <span>
                          {isAr
                            ? "كرت واحد دائم مدى الحياة ينهي استهلاك آلاف الكروت الورقية"
                            : "One lifetime card ends the waste of thousands of paper cards"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                      <span>
                        {isAr
                          ? "هذه التجربة تظهر فوراً لزبائنك وعملائك بلمسة واحدة"
                          : "This experience appears instantly for your clients in 1 tap"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowTapSuccessModal(false)}
                        className="text-blue-600 font-bold hover:underline cursor-pointer"
                      >
                        {isAr ? "إغلاق المعاينة" : "Close Preview"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ProductsHeroSection;
