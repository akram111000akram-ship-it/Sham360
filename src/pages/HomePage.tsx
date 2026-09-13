import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Compass,
  ArrowRight,
  Star,
  Check,
  Building2,
  MapPin,
  MessageSquare,
  CreditCard,
  QrCode,
  Brain,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle2,
  Copy,
  ExternalLink,
  PhoneCall,
  Globe,
  Award,
  Mail,
  Phone
} from "lucide-react";
import { useRouter } from "../services/router";
import { Logo } from "../components/Logo";
import { HeroNFCTapSimulation } from "../components/HeroNFCTapSimulation";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { NFCHardwareStorefront } from "../components/NFCHardwareStorefront";
import { DamasceneVR360Showcase } from "../components/DamasceneVR360Showcase";
import { GeminiMarketingLab } from "../components/GeminiMarketingLab";
import { Sham360BusinessGuide } from "../components/Sham360BusinessGuide";
import { RefactoredDirectorySection } from "../components/RefactoredDirectorySection";
import { Sham360HomePage } from "../components/Sham360HomePage";

import { useLanguage } from "../services/LanguageContext";

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { language: lang, isAr, t } = useLanguage();

  // Flagship Swiss Minimalist View Mode Toggle
  const [activeViewMode, setActiveViewMode] = useState<"swiss" | "interactive">("swiss");

  // Digital Assessment Modal Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [bizType, setBizType] = useState("");
  const [digitalStatus, setDigitalStatus] = useState("");
  const [bizGoal, setBizGoal] = useState("");
  const [bizName, setBizName] = useState("");
  const [bizCity, setBizCity] = useState("");
  const [bizPhone, setBizPhone] = useState("");

  // Assessment Result State
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditStatusText, setAuditStatusText] = useState("");
  const [auditResult, setAuditResult] = useState<{
    score: number;
    analysis: string;
    action_steps: string[];
    keywords: string[];
    recommended_service: string;
  } | null>(null);

  // Toast notifier
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(label);
    showToast(isAr ? "تم نسخ النص بنجاح!" : "Copied to clipboard!");
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  // Submit assessment and start AI audit simulation + API call
  const handleSubmitAssessment = async () => {
    if (!bizName.trim() || !bizCity.trim() || !bizPhone.trim()) {
      showToast(isAr ? "يرجى ملء جميع الحقول المطلوبة للمتابعة" : "Please fill in all required fields", "error");
      return;
    }

    setWizardStep(5); // Analyzing state
    setAuditLoading(true);

    const stages = isAr
      ? [
          "جاري فحص الكلمات المفتاحية لمجالك في السوق السوري...",
          "جاري تحليل تواجد المنافسين على خرائط Google...",
          "جاري احتساب النقاط وصياغة التوصية الفنية بالذكاء الاصطناعي...",
          "تنسيق خطة العمل التكتيكية لزيادة المبيعات والاتصالات..."
        ]
      : [
          "Analyzing Syrian local search volume & keywords...",
          "Auditing local competitor Google Maps listings...",
          "Calculating Digital Readiness Score with Gemini AI...",
          "Drafting high-conversion action steps..."
        ];

    let currentStage = 0;
    setAuditStatusText(stages[0]);

    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setAuditStatusText(stages[currentStage]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bizName,
          category: bizType,
          city: bizCity,
          currentStatus: digitalStatus,
          goal: bizGoal,
          phone: bizPhone,
          lang: isAr ? "ar" : "en",
        }),
      });

      const data = await response.json();
      if (data && data.score) {
        setAuditResult(data);
      } else {
        throw new Error("Invalid audit data");
      }
      clearInterval(interval);
      setWizardStep(6);
    } catch (err) {
      console.error("Audit Generation Fallback:", err);
      setAuditResult({
        score: 74,
        analysis: isAr 
          ? `بناءً على فحص نشاط "${bizName}" (${bizType}) في ${bizCity}، يتضح أن الحضور الرقمي يحتاج إلى تعزيز مباشر. الربط بخرائط جوجل الموثقة وتوزيع بطاقات NFC الفاخرة سيضاعف تفاعل العملاء بنسبة 45%.`
          : `Based on auditing "${bizName}" (${bizType}) in ${bizCity}, your digital presence has immediate growth potential. Verifying Google Maps and deploying NFC smart tags will boost engagement by 45%.`,
        action_steps: [
          isAr ? `توثيق رسمي لملف Google Business وحمايته من بلاغات المنافسين في ${bizCity}.` : `Officially verify Google Maps listing in ${bizCity}.`,
          isAr ? `تصوير المقر بجولة افتراضية تفاعلية 360° فائقة الدقة 8K.` : `Capture an 8K interactive 360° virtual tour.`,
          isAr ? `تجهيز بطاقات وحوامل طاولات NFC لمضاعفة تقييمات 5 نجوم.` : `Deploy NFC table stands to boost 5-star reviews.`
        ],
        keywords: [
          isAr ? `${bizType} في ${bizCity}` : `${bizType} in ${bizCity}`,
          isAr ? `أفضل ${bizType} ${bizCity}` : `Top ${bizType} ${bizCity}`,
          isAr ? `عنوان وموقع ${bizName}` : `${bizName} location & map`,
          isAr ? `رقم هاتف ${bizName}` : `${bizName} contact phone`,
          isAr ? `حجز وتواصل ${bizType}` : `Book ${bizType} ${bizCity}`
        ],
        recommended_service: isAr ? "باقة الهوية الذكية المتكاملة + توثيق خرائط Google وجولة 360°" : "Full Smart Identity Suite + Google Maps & 360° Tour"
      });
      clearInterval(interval);
      setWizardStep(6);
    } finally {
      setAuditLoading(false);
    }
  };

  // FAQ Items
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const faqs = [
    {
      id: "faq-1",
      qAr: "هل تعمل بطاقات SHAM360 NFC على الهواتف في سوريا دون الحاجة لتحميل برامج؟",
      qEn: "Do SHAM360 NFC products work in Syria without any app downloads?",
      aAr: "نعم، بنسبة 100%! تعمل تقنية NFC المدمجة في بطاقاتنا وحوامل الطاولات بمجرد التلامس مع أي هاتف iPhone أو Android حديث. يفتح البروفايل فوراً في متصفح الهاتف مع إمكانية حفظ جهة الاتصال (vCard) بنقرة واحدة دون الحاجة لأي تطبيق أو كاسر بروكسي.",
      aEn: "Yes, 100%! The embedded NFC chip in our cards and table stands works instantaneously on contact with any modern iPhone or Android device. Your profile launches immediately in the native browser with 1-tap contact saving (vCard)—no apps, registration, or VPN required."
    },
    {
      id: "faq-2",
      qAr: "هل يمكنني تعديل أرقامي وروابطي بعد استلام وطباعة البطاقة؟",
      qEn: "Can I update my phone numbers and links after printing the card?",
      aAr: "بالتأكيد! بطاقتك مرتبطة سحابياً بسحابة SHAM360 الآمنة. يمكنك الدخول للوحة التحكم وتعديل أرقام الهواتف، وحسابات التواصل، ورابط الواتساب، والكتالوج بأي لحظة وبشكل فوري مجاناً مدى الحياة دون الحاجة لإعادة طباعة البطاقة.",
      aEn: "Absolutely! Your card is permanently linked to the secure SHAM360 Cloud. You can log in anytime to update your phone numbers, social media links, WhatsApp direct chat, or catalog instantly with zero extra cost and no need to reprint your hardware."
    },
    {
      id: "faq-3",
      qAr: "كيف تساهم حوامل الطاولات وملصقات NFC في مضاعفة تقييمات Google 5 نجوم؟",
      qEn: "How do table stands and review stickers boost Google 5-star ratings?",
      aAr: "عندما يضع الزبون هاتفه فوق الحامل الذكي على الطاولة أو كاونتر الدفع، تُفتح نافذة التقييم على خرائط Google مباشرة مع تحديد الـ 5 نجوم مسبقاً! هذا يلغي عناء البحث اليدوي ويزيد معدل تقييمات الزبائن بأكثر من 300%.",
      aEn: "When customers tap their phone on the smart table stand or counter tag, your official Google review dialog launches directly with 5 stars pre-selected. This eliminates manual searching and increases verified customer review volume by over 300%."
    },
    {
      id: "faq-4",
      qAr: "ما هو تصوير الجولات الافتراضية 360° وكيف يتم رفعه على خرائط Google الرسمية؟",
      qEn: "What is 360° virtual tour photography and how is it uploaded to Google?",
      aAr: "نقوم بإرسال مصورين معتمدين بكاميرات بانورامية فائقة الدقة 8K لتصوير كافة زوايا صالتك أو منشأتك. بعد المعالجة، نربط الجولة مباشرة بملف خريطتك الرسمي على Google Street View ليتجول الزبون افتراضياً داخل مقرك قبل زيارته.",
      aEn: "We deploy certified photographers with ultra-high resolution 8K panoramic camera systems to capture every angle of your venue. After stitching and HDR processing, we connect the tour directly to your Google Maps Street View listing for virtual walk-throughs."
    },
    {
      id: "faq-5",
      qAr: "ما هي مدة تجهيز البطاقات وطرق الشحن للمحافظات السورية؟",
      qEn: "What is the production turnaround time and delivery across Syria?",
      aAr: "يتم إعداد التصميم والبروفايل السحابي خلال 24 ساعة، وتستغرق الطباعة الحرارية الدقيقة من 2 إلى 4 أيام عمل. نقوم بالشحن السريع لكافة المحافظات السورية (دمشق، ريف دمشق، حلب، حمص، حماة، اللاذقية، طرطوس، والسويداء).",
      aEn: "Digital profiles and designs are prepared within 24 hours. Precision laser engraving or thermo-printing takes 2 to 4 business days. We provide express secure delivery across Damascus, Aleppo, Homs, Hama, Latakia, Tartus, and As-Suwayda."
    }
  ];

  if (activeViewMode === "swiss") {
    return (
      <div className="relative" dir={isAr ? "rtl" : "ltr"}>
        {/* Floating Toggle to Switch to Interactive Lab & 360 Tour */}
        <div className="fixed bottom-6 end-6 z-40">
          <button
            type="button"
            onClick={() => setActiveViewMode("interactive")}
            className="px-4 py-2.5 rounded-2xl bg-white/95 text-slate-800 text-xs font-bold border border-slate-200/90 shadow-xl hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md hover:border-[#0066FF]/40"
          >
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
            <span>{isAr ? "المعرض الموسع (AI Lab & 360)" : "Interactive Lab & 360°"}</span>
          </button>
        </div>

        <Sham360HomePage
          onNavigateToDirectory={() => navigate("/directory")}
          onNavigateToProfile={(slug) => navigate(`/profile/${slug}`)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative" dir={isAr ? "rtl" : "ltr"}>
      {/* Floating Toggle to Return to Swiss Minimalist Design */}
      <div className="fixed bottom-6 end-6 z-40">
        <button
          type="button"
          onClick={() => setActiveViewMode("swiss")}
          className="px-4 py-2.5 rounded-2xl bg-[#0066FF] text-white text-xs font-bold shadow-xl hover:bg-[#0052CC] flex items-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isAr ? "الواجهة السريعة الحديثة (Fast Digital Profile)" : "Flagship Swiss Profile"}</span>
        </button>
      </div>
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${
              toast.type === "success"
                ? "bg-emerald-950 text-emerald-100 border-emerald-800"
                : "bg-rose-950 text-rose-100 border-rose-800"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          1. HERO SECTION & MODERN-STYLE MOTION TAP SIMULATION
          ========================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Trust Stat & Value Badges Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{isAr ? "موثوقون لدى أكثر من 120+ شركة ومحل تجاري في سوريا 🇸🇾" : "Trusted by 120+ leading businesses across Syria 🇸🇾"}</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                {isAr ? "موثّق رسمياً 🛡️" : "Officially Verified 🛡️"}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                {isAr ? "تقنية NFC 13.56MHz ⚡" : "NFC 13.56MHz ⚡"}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                {isAr ? "جولات 8K VR 360° 🕶️" : "8K VR 360° Tours 🕶️"}
              </span>
            </div>
          </div>

          {/* 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Column 1: Core Value Prop & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
              
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.14]">
                {isAr ? (
                  <>
                    <span className="block text-slate-900 font-extrabold mb-1.5 sm:mb-2 text-2xl sm:text-4xl">
                      نبني حضورًا رقميًا يليق بأعمالك ⚡
                    </span>
                    <span className="text-[#0066FF] relative inline-block">
                      مشاركة هويتك بنقرة واحدة
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
                    <span className="block text-slate-900 font-extrabold mb-1.5 sm:mb-2 text-2xl sm:text-4xl">
                      Elevate Your Business Presence ⚡
                    </span>
                    <span className="text-[#0066FF] relative inline-block">
                      Share Your Identity in a Single Tap
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

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {isAr
                  ? "بطاقات الأعمال الذكية، منتجات NFC، ودليل الأعمال السوري الشامل. كل ما تحتاجه لبناء حضور رقمي احترافي يضمن تصدّرك في نتائج البحث والخرائط."
                  : "Smart NFC business cards, contactless hardware, and Syria's verified directory. Everything you need to establish verified prestige and lead local search results."}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* Primary CTA with subtle shimmer */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-700 text-white font-black text-sm sm:text-base shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {/* Subtle Shimmer Ray */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  
                  <CreditCard className="w-5 h-5 text-white" />
                  <span>{isAr ? "اطلب بطاقتك الذكية" : "Order Your Smart Card"}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>

                {/* Secondary Button -> /profile */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/profile")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-bold text-sm sm:text-base border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isAr ? "جرب البروفايل الذكي" : "Live Demo Profile"}</span>
                </motion.button>
              </div>

              {/* Trust Sub-line */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>{isAr ? "بدون اشتراكات شهرية إجبارية" : "Zero mandatory monthly fees"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>{isAr ? "تحديث البيانات السحابية مجاناً" : "Free real-time cloud data updates"}</span>
                </div>
              </div>

            </div>

            {/* Column 2: Modern-Style Motion Tap Simulation */}
            <div className="lg:col-span-6 flex justify-center">
              <HeroNFCTapSimulation
                isAr={isAr}
                onOpenAssessment={() => setIsModalOpen(true)}
              />
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          2. HOW IT WORKS (3-Step Micro-Motion Showcase)
          ========================================================= */}
      <div id="how-it-works">
        <HowItWorksSection
          isAr={isAr}
          onOpenAssessment={() => setIsModalOpen(true)}
        />
      </div>

      {/* =========================================================
          3. NFC HARDWARE STOREFRONT ("متجر منتجات NFC الذكية")
          ========================================================= */}
      <div id="nfc-storefront">
        <NFCHardwareStorefront isAr={isAr} />
      </div>

      {/* =========================================================
          4. INTERACTIVE 360° VR SHOWCASE (Beit Dimashqi 8K Tour)
          ========================================================= */}
      <section id="vr-showcase" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-cyan-600 animate-spin" style={{ animationDuration: "14s" }} />
              <span>{isAr ? "جولات افتراضية تفاعلية بتقنية Ultra HD 8K" : "Ultra HD 8K Interactive Virtual Tours"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {isAr ? 'تجربة الجولة الافتراضية 360°: "البيت الدمشقي العريق"' : '360° Virtual Tour: "Historic Damascene House"'}
            </h2>

            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? "اسحب وتجوّل داخل القاعة الإيوانية والبحرة الشامية لاكتشاف كيف تحوّل جولاتنا منشأتك إلى وجهة مفضلة تجذب الزوار والعملاء قبل وصولهم لمقرك."
                : "Explore the courtyard, fountain, and historic hall to discover how our 360° tours turn your business into an attractive destination before clients even visit."}
            </p>
          </div>

          {/* Embedded Full Interactive VR Showcase */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <DamasceneVR360Showcase
              isAr={isAr}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>

          {/* Quick Photography Booking Bar */}
          <div className="mt-10 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                {isAr
                  ? "ترغب بتصوير مقرك أو مطعمك بجولة 360° ونشره على خرائط Google الرسمية؟"
                  : "Want an 8K 360° virtual tour of your venue published on Google Maps?"}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr
                  ? "فريقنا المعتمد يزور مقرك في دمشق وكافة المحافظات بأحدث كاميرات البانوراما الاحترافية."
                  : "Our certified photography team covers Damascus and all Syrian governorates with professional panoramic gear."}
              </p>
            </div>

            <a
              href={`https://wa.me/963933888999?text=${encodeURIComponent(
                isAr
                  ? "مرحباً Sham360، أود حجز جلسة تصوير جولة افتراضية 360° لمقري لنشرها على خرائط Google."
                  : "Hello Sham360, I'd like to book a 360° virtual tour photo session for my venue on Google Maps."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? "احجز جلسة التصوير الآن" : "Book Photo Session Now"}</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================
          5. INTEGRATED TOOLS & CALCULATORS
          ========================================================= */}
      {/* 5A. Gemini AI Local Marketing Assistant */}
      <GeminiMarketingLab isAr={isAr} />

      {/* 5B. Digital Readiness Score & ROI Calculator */}
      <Sham360BusinessGuide lang={lang} />

      {/* =========================================================
          6. REFACTORED BUSINESS DIRECTORY SECTION
          ========================================================= */}
      <RefactoredDirectorySection
        isAr={isAr}
        onOpenAssessment={() => setIsModalOpen(true)}
      />

      {/* =========================================================
          7. FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================= */}
      <section id="faq-section" className="py-20 md:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {isAr ? "كل ما تود معرفته" : "Everything You Need to Know"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {isAr ? "الأسئلة الشائعة حول خدمات Sham360" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isAr
                ? "إجابات شاملة ومباشرة عن بطاقات NFC، وتوثيق الخرائط، والجولات الافتراضية في سوريا."
                : "Clear answers about NFC smart cards, Google Maps verification, and 360° virtual tours in Syria."}
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{isAr ? faq.qAr : faq.qEn}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-start"
                      >
                        {isAr ? faq.aAr : faq.aEn}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          8. MODERN BRAND FOOTER
          ========================================================= */}
      <footer
        id="main-footer"
        className="bg-slate-50 text-slate-800 pt-16 pb-12 border-t border-slate-200/90 font-sans text-start"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
            
            {/* 1. BRAND COLUMN WITH TOP-MATCHING LOGO */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <Logo iconSize={42} isAr={isAr} light={false} />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
                {isAr
                  ? "المنظومة السورية المتكاملة لبطاقات الأعمال الذكية NFC، وتوثيق خرائط Google الرسمية، وجولات التصوير الافتراضي 360°، وتطوير الحضور الرقمي الفاخر لرواد الأعمال والمنشآت."
                  : "The integrated Syrian ecosystem for smart NFC business cards, verified Google Maps listings, 360° virtual tours, and premier digital identity for entrepreneurs."}
              </p>

              <div className="flex flex-col gap-2 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{isAr ? "شارع فخري البارودي، دمشق، سوريا" : "Fakhri Al Baroudi St, Damascus, Syria"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                  <a href="tel:+963933888999" className="hover:text-blue-600 font-semibold dir-ltr">
                    +963 933 888 999
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <a href="mailto:admin@sham360.online" className="hover:text-blue-600 font-medium font-mono text-xs">
                    admin@sham360.online
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/963933888999?text=${encodeURIComponent(
                    isAr
                      ? "مرحباً Sham360، أود الاستفسار عن بطاقات NFC وتفعيل خرائط Google لمنشأتي."
                      : "Hello Sham360, I'd like to inquire about NFC smart cards and Google Maps verification."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? "تواصل مباشر مع الإدارة عبر واتساب" : "Direct WhatsApp Support"}</span>
                </a>
              </div>
            </div>

            {/* 2. SERVICES & SOLUTIONS */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {isAr ? "خدماتنا والحلول الذكية" : "Services & Smart Solutions"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById("nfc-storefront");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? "بطاقات الأعمال الذكية NFC المخصصة" : "Custom Smart NFC Business Cards"}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? "تفعيل خرائط جوجل المعتمدة" : "Verified Google Maps Listing"}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById("vr-showcase");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? "جولات افتراضية تفاعلية 360°" : "360° Interactive Virtual Tours"}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/profile")}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? "تصميم المواقع الفاخرة المخصصة" : "Custom Smart Web Profiles"}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? "تصوير فوتوغرافي وفيديو احترافي للمنشآت" : "Commercial Photography & Media"}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById("nfc-storefront");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{isAr ? "حوامل طاولات NFC لتقييمات Google" : "NFC Google 5-Star Review Stands"}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. PLATFORM & ECOSYSTEM LINKS */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {isAr ? "روابط المنصة" : "Platform Navigation"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer"
                  >
                    {isAr ? "لماذا نحن" : "Why Choose Us"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/profile")}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer"
                  >
                    {isAr ? "معرض الأعمال والشركاء" : "Showcase & Profiles"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/directory")}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer"
                  >
                    {isAr ? "دليل شام 360 للأعمال" : "Syrian Business Directory"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById("how-it-works");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer"
                  >
                    {isAr ? "خطوات وآليات العمل" : "How It Works"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById("faq-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-blue-600 transition-colors text-start cursor-pointer"
                  >
                    {isAr ? "الأسئلة الشائعة والتحقق" : "Frequently Asked Questions"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hover:text-blue-600 font-bold text-blue-600 transition-colors text-start cursor-pointer"
                  >
                    {isAr ? "اطلب فحصاً رقمياً مجاناً ✨" : "Request Free Digital Audit ✨"}
                  </button>
                </li>
              </ul>
            </div>

            {/* 4. CONTACT & DIGITAL CHANNELS */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                {isAr ? "منصاتنا وتواجدنا الرقمي" : "Coverage & Platforms"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? "خدمة الشحن والتسليم متوفرة لكافة المحافظات السورية (دمشق، حلب، حمص، اللاذقية، طرطوس، حماة) مع دعم فني مستمر."
                  : "Shipping & delivery across all Syrian governorates (Damascus, Aleppo, Homs, Latakia, Tartus, Hama) with ongoing technical support."}
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-800">{isAr ? "تواصل معنا المباشر" : "Direct Contact Desk"}</div>
                  <div className="text-xs text-slate-600 flex items-center justify-between">
                    <span>{isAr ? "الهاتف / واتساب:" : "Phone / WhatsApp:"}</span>
                    <a href="https://wa.me/963933888999" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold dir-ltr hover:underline">
                      +963 933 888 999
                    </a>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center justify-between">
                    <span>{isAr ? "البريد الإلكتروني:" : "Email:"}</span>
                    <a href="mailto:admin@sham360.online" className="text-blue-600 font-medium hover:underline font-mono text-xs">
                      admin@sham360.online
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200/60">
                    <Globe className="w-3 h-3" />
                    Sham360.online
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/60">
                    <Compass className="w-3 h-3 text-cyan-600" />
                    Google Street View Trusted
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200/60">
                    <CreditCard className="w-3 h-3" />
                    NFC 13.56MHz
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>{isAr ? `© ${new Date().getFullYear()} Sham360. جميع الحقوق محفوظة لرواد الأعمال والشركات في الجمهورية العربية السورية.` : `© ${new Date().getFullYear()} Sham360. All rights reserved for Syrian businesses & innovators.`}</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>{isAr ? "دمشق، سوريا - الحلبوني" : "Damascus, Syria"}</span>
              <span>•</span>
              <span>{isAr ? "دعم فني وضمان رسمي 🇸🇾" : "Official Hardware Guarantee 🇸🇾"}</span>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================
          9. DIGITAL ASSESSMENT MODAL WIZARD
          ========================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full max-w-xl my-8 bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 text-start"
              onClick={(e) => e.stopPropagation()}
              dir={isAr ? "rtl" : "ltr"}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {isAr ? "طلب بطاقة NFC وتدقيق الحضور الرقمي مجاناً" : "Order NFC Smart Card & Free Digital Audit"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? "خطوات سريعة لإعداد ملفك وتوليد التقرير التكتيكي لمشروعك" : "Fast steps to setup your profile and generate your tactical project audit"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Step Indicator */}
              {wizardStep <= 4 && (
                <div className="flex items-center justify-between mb-6 px-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          wizardStep === step
                            ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/30"
                            : wizardStep > step
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {wizardStep > step ? <Check className="w-3.5 h-3.5" /> : step}
                      </div>
                      {step < 4 && (
                        <div className={`w-8 sm:w-16 h-1 rounded-full ${wizardStep > step ? "bg-emerald-500" : "bg-slate-100"}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Wizard Steps */}
              {/* Step 1: Industry */}
              {wizardStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="block text-sm font-bold text-slate-900">
                    {isAr ? "١. ما هو مجال نشاطك التجاري؟" : "1. What is your business industry?"}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: "مطاعم ومقاهي", labelAr: "مطاعم ومقاهي 🍔", labelEn: "Restaurants & Cafes 🍔" },
                      { id: "عيادات ومراكز طبية", labelAr: "عيادات ومراكز طبية 🩺", labelEn: "Clinics & Healthcare 🩺" },
                      { id: "فنادق وسياحة", labelAr: "فنادق وضيافة 🏨", labelEn: "Hotels & Hospitality 🏨" },
                      { id: "شركات ومكاتب هندسية", labelAr: "شركات ومكاتب 🏢", labelEn: "Corporate & Offices 🏢" },
                      { id: "معارض ومحلات تجارية", labelAr: "معارض ومحلات 🛍️", labelEn: "Retail & Showrooms 🛍️" },
                      { id: "خدمات حرة واستشارات", labelAr: "مهني / استشاري 💼", labelEn: "Consulting & Services 💼" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setBizType(item.id);
                          setWizardStep(2);
                        }}
                        className={`p-3.5 rounded-2xl border text-start transition-all flex items-center justify-between cursor-pointer ${
                          bizType === item.id
                            ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="text-xs">{isAr ? item.labelAr : item.labelEn}</span>
                        {bizType === item.id && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Digital Status */}
              {wizardStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="block text-sm font-bold text-slate-900">
                    {isAr ? "٢. ما هي حالة حضورك الرقمي الحالية؟" : "2. What is your current digital status?"}
                  </label>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "maps_needs_work",
                        labelAr: "أملك خريطة جوجل ولكن التقييمات والمظهر بحاجة لتحسين",
                        labelEn: "I have a Google Map, but ratings and appearance need improvement"
                      },
                      {
                        id: "maps_unverified",
                        labelAr: "أملك خريطة غير موثقة رسمياً وأخشى البلاغات أو الإغلاق",
                        labelEn: "Unverified Google Map, concerned about competitor suspensions"
                      },
                      {
                        id: "no_presence",
                        labelAr: "لا أملك أي حضور رسمي أو بطاقات ذكية حتى الآن",
                        labelEn: "No official digital presence or smart NFC cards yet"
                      }
                    ].map((status) => (
                      <button
                        key={status.id}
                        type="button"
                        onClick={() => {
                          setDigitalStatus(status.id);
                          setWizardStep(3);
                        }}
                        className={`w-full p-4 rounded-2xl border text-start transition-all flex items-center justify-between text-xs cursor-pointer ${
                          digitalStatus === status.id
                            ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>{isAr ? status.labelAr : status.labelEn}</span>
                        {digitalStatus === status.id && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      {isAr ? "← العودة للخطوة السابقة" : "← Back to Previous Step"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Priority Goal */}
              {wizardStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="block text-sm font-bold text-slate-900">
                    {isAr ? "٣. ما هو هدفك الأساسي الذي تركز عليه حالياً؟" : "3. What is your primary goal right now?"}
                  </label>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "nfc_cards",
                        labelAr: "بطاقات أعمال ذكية NFC فاخرة لمشاركة الهوية بلمسة",
                        labelEn: "Luxury smart NFC business cards to share identity in 1 tap"
                      },
                      {
                        id: "review_stands",
                        labelAr: "مضاعفة تقييمات Google 5 نجوم عبر حوامل الطاولات الذكية",
                        labelEn: "Boost Google 5-star reviews with smart table stands"
                      },
                      {
                        id: "maps_360",
                        labelAr: "توثيق رسمي وحماية الخريطة مع تصوير جولة 360 درجة",
                        labelEn: "Official Google verification + 360° virtual tour photography"
                      }
                    ].map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => {
                          setBizGoal(goal.id);
                          setWizardStep(4);
                        }}
                        className={`w-full p-4 rounded-2xl border text-start transition-all flex items-center justify-between text-xs cursor-pointer ${
                          bizGoal === goal.id
                            ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>{isAr ? goal.labelAr : goal.labelEn}</span>
                        {bizGoal === goal.id && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      {isAr ? "← العودة للخطوة السابقة" : "← Back to Previous Step"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact details */}
              {wizardStep === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="block text-sm font-bold text-slate-900">
                    {isAr ? "٤. أدخل تفاصيل عملك التجاري للتسليم" : "4. Enter your business details for delivery"}
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? "اسم العمل التجاري / المنشأة" : "Business / Company Name"}
                      </label>
                      <input
                        type="text"
                        value={bizName}
                        onChange={(e) => setBizName(e.target.value)}
                        placeholder={isAr ? "مثال: مطعم شاورما الشام" : "e.g. Damascus Business Hub"}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? "المدينة والحي" : "City & Neighborhood"}
                      </label>
                      <input
                        type="text"
                        value={bizCity}
                        onChange={(e) => setBizCity(e.target.value)}
                        placeholder={isAr ? "مثال: دمشق - المزة" : "e.g. Damascus - Mezzeh"}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? "رقم واتساب للتواصل واستلام التقرير" : "WhatsApp Number for Delivery"}
                      </label>
                      <input
                        type="tel"
                        value={bizPhone}
                        onChange={(e) => setBizPhone(e.target.value)}
                        placeholder={isAr ? "مثال: 0992250223" : "e.g. +963 992 250 223"}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-start"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={handleSubmitAssessment}
                      className="flex-1 bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      {isAr ? "إرسال وتوليد التقرير الذكي مجاناً" : "Submit & Generate Free AI Audit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {isAr ? "السابق" : "Back"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Loader */}
              {wizardStep === 5 && (
                <div className="text-center py-12 space-y-6">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 bg-blue-500/20 rounded-full animate-ping" />
                    <div className="relative w-16 h-16 rounded-2xl bg-[#0066FF] flex items-center justify-center text-white">
                      <Brain className="w-8 h-8 animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {isAr ? "محلل الذكاء الاصطناعي يقوم بالفحص الفوري..." : "AI Engine Running Instant Local Audit..."}
                    </h4>
                    <p className="text-xs text-slate-500 min-h-[1.5rem]">{auditStatusText}</p>
                  </div>
                </div>
              )}

              {/* Step 6: Success Report */}
              {wizardStep === 6 && auditResult && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {isAr ? "تقرير التدقيق الرقمي الفوري" : "Instant Digital Readiness Report"}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {isAr ? `تم التحليل بواسطة Sham360 AI لمشروع ${bizName}` : `Analyzed by Sham360 AI for ${bizName}`}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="sm:col-span-4 text-center space-y-1">
                      <span className="text-xs text-slate-500 font-semibold block">
                        {isAr ? "مستوى الجاهزية" : "Readiness Score"}
                      </span>
                      <div className="text-3xl font-black text-blue-600 font-en">
                        {auditResult.score}<span className="text-xs text-slate-400 font-normal">/100</span>
                      </div>
                    </div>
                    <div className="sm:col-span-8 text-xs text-slate-600 leading-relaxed border-r border-slate-200 pr-3">
                      {auditResult.analysis}
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isAr ? "الخطوات الموصى بها:" : "Recommended Action Steps:"}</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {auditResult.action_steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/963933888999?text=${encodeURIComponent(
                        isAr
                          ? `مرحباً Sham360، قمت بإجراء تدقيق رقمي لمشروعي (${bizName} - ${bizCity}):\nمستوى الجاهزية: ${auditResult.score}/100\nالتوصية: ${auditResult.recommended_service}\nأود حجز استشارة مجانية مع مهندسيكم.`
                          : `Hello Sham360, I ran an audit for (${bizName} - ${bizCity}):\nReadiness Score: ${auditResult.score}/100\nRecommendation: ${auditResult.recommended_service}\nI'd like to consult with your team.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{isAr ? "ناقش التقرير واطلب البطاقة عبر واتساب" : "Discuss Report & Order on WhatsApp"}</span>
                    </a>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          10. FLOATING WHATSAPP BUTTON
          ========================================================= */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 group" dir="ltr">
        <a
          href="https://wa.me/963933888999"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.397 9.797-9.798.001-2.615-1.012-5.074-2.855-6.918-1.843-1.843-4.296-2.857-6.914-2.858-5.4 0-9.793 4.393-9.796 9.795-.001 1.547.41 3.051 1.193 4.356l-.992 3.62 3.714-.974zm11.005-5.112c-.272-.136-1.614-.796-1.863-.887-.25-.09-.43-.136-.61.136-.18.272-.7.887-.858 1.069-.16.182-.318.204-.59.068-.272-.136-1.15-.424-2.19-1.353-.81-.723-1.356-1.617-1.515-1.888-.16-.272-.017-.42.119-.555.123-.121.272-.318.41-.476.137-.159.182-.272.272-.453.09-.181.045-.34-.022-.476-.068-.136-.61-1.474-.836-2.018-.22-.53-.442-.458-.61-.466-.157-.008-.338-.01-.52-.01-.18 0-.476.068-.724.34-.249.272-.95.93-.95 2.268 0 1.338.974 2.628 1.11 2.81 1.4 1.92 3.2 2.72 5.2 3.52.4.16.8.16 1.1.08.3-.08.9-.38 1.1-.7.2-.32.2-.6.1-.7-.1-.1-.3-.2-.5-.3z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-bold text-xs sm:text-sm whitespace-nowrap hidden sm:inline-block pr-1 pl-1">
            {isAr ? "راسلنا الآن" : "Message Us"}
          </span>
        </a>
      </div>

    </div>
  );
};

export default HomePage;
