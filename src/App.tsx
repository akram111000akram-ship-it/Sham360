import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Globe,
  Eye,
  Camera,
  Cpu,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  X,
  Copy,
  Sparkles,
  Brain,
  Menu,
  Phone,
  Building,
  Utensils,
  Store,
  ArrowRight,
  Bookmark,
  Share2,
  Compass,
  ExternalLink,
  MessageSquare,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";
import {
  SERVICES_DATA,
  PORTFOLIO_DATA,
  TESTIMONIALS_DATA,
  FAQ_DATA,
  TIMELINE_STEPS,
  ServiceItem,
  PortfolioItem
} from "./data";
import { Logo, LogoIcon } from "./components/Logo";
import { Sham360BusinessGuide } from "./components/Sham360BusinessGuide";

export default function App() {
  // Language State ("ar" | "en")
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const isAr = lang === "ar";

  // Sync document attribute on language change
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Active section tracking
  const [activeSection, setActiveSection] = useState("hero");

  // Portfolio filtering
  const [portfolioFilter, setPortfolioFilter] = useState<"all" | "google" | "websites" | "tours">("all");

  // FAQ open states
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  // AI Lab form state
  const [labCategory, setLabCategory] = useState("");
  const [labCity, setLabCity] = useState("");
  const [labLoading, setLabLoading] = useState(false);
  const [labResult, setLabResult] = useState<{
    keywords: string[];
    marketing_hook: string;
    growth_action: string;
  } | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedAllLab, setCopiedAllLab] = useState(false);

  // Digital Assessment Modal Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [bizType, setBizType] = useState("");
  const [digitalStatus, setDigitalStatus] = useState("");
  const [bizGoal, setBizGoal] = useState("");
  const [bizName, setBizName] = useState("");
  const [bizCity, setBizCity] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  
  // Interactive Showcase Storefront State
  const [activeHighlight, setActiveHighlight] = useState<"maps" | "website" | "vr" | "nfc">("maps");
  const [isHoveredHighlight, setIsHoveredHighlight] = useState(false);
  const [impactMode, setImpactMode] = useState<"before" | "after">("after");

  useEffect(() => {
    if (isHoveredHighlight) return;
    const items: ("maps" | "website" | "vr" | "nfc")[] = ["maps", "website", "vr", "nfc"];
    const interval = setInterval(() => {
      setActiveHighlight((current) => {
        const nextIndex = (items.indexOf(current) + 1) % items.length;
        return items[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isHoveredHighlight]);
  
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

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "why-us", "portfolio", "business-guide", "process", "faq"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // AI Lab Handler
  const handleGenerateLabPlan = async () => {
    if (!labCategory.trim() || !labCity.trim()) {
      showToast("يرجى كتابة نوع العمل وموقع المدينة لتوليد الخطة", "error");
      return;
    }

    setLabLoading(true);
    setLabResult(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: labCategory, city: labCity }),
      });
      const data = await response.json();
      setLabResult(data);
    } catch (err) {
      console.error("Failed to generate local plan:", err);
      showToast("حدث خطأ أثناء توليد الخطة، يرجى المحاولة لاحقاً", "error");
    } finally {
      setLabLoading(false);
    }
  };

  // Wizard option handlers
  const handleSelectBizType = (type: string) => {
    setBizType(type);
    setWizardStep(2);
  };

  const handleSelectStatus = (status: string) => {
    setDigitalStatus(status);
    setWizardStep(3);
  };

  const handleSelectGoal = (goal: string) => {
    setBizGoal(goal);
    setWizardStep(4);
  };

  // Submit assessment and start AI audit simulation + API call
  const handleSubmitAssessment = async () => {
    if (!bizName.trim() || !bizCity.trim() || !bizPhone.trim()) {
      showToast("يرجى ملء جميع الحقول المطلوبة للمتابعة", "error");
      return;
    }

    setWizardStep(5); // Analyzing page
    setAuditLoading(true);

    const stages = [
      "جاري فحص الكلمات المفتاحية لمجالك المحلي...",
      "جاري فحص حالة المنافسين وتواجد الخرائط...",
      "جاري احتساب النقاط وصياغة تقرير Gemini...",
      "تنسيق الخطة العملية الذكية الأنسب لمشروعك..."
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
        }),
      });

      const data = await response.json();
      setAuditResult(data);
      clearInterval(interval);
      setWizardStep(6); // Success page
    } catch (err) {
      console.error("Audit Generation Error:", err);
      showToast("حدث خطأ أثناء إجراء الفحص الذكي", "error");
      clearInterval(interval);
      setWizardStep(4); // fall back to contact form
    } finally {
      setAuditLoading(false);
    }
  };

  // Toast notifier
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(label);
    showToast("تم نسخ النص بنجاح!");
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const handleCopyAllLab = () => {
    if (!labResult) return;
    const fullText = `--- تقرير Sham360 AI الذكي للمنافسة المحلية ---
نوع المجال والخدمة: ${labCategory}
المدينة المستهدفة: ${labCity}

الكلمات المفتاحية المقترحة للخرائط:
${labResult.keywords.join(" - ")}

النص التسويقي المقترح:
${labResult.marketing_hook}

الاستراتيجية العملية للنمو الفوري:
${labResult.growth_action}`;

    navigator.clipboard.writeText(fullText);
    setCopiedAllLab(true);
    showToast("تم نسخ التقرير الكامل بنجاح!");
    setTimeout(() => setCopiedAllLab(false), 3000);
  };

  // Helper to map Lucide icon string to Component
  const renderIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case "MapPin":
        return <MapPin className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "Eye":
        return <Eye className={className} />;
      case "Camera":
        return <Camera className={className} />;
      case "Cpu":
        return <Cpu className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Filtered portfolio
  const filteredPortfolio = PORTFOLIO_DATA.filter(
    (item) => portfolioFilter === "all" || item.category === portfolioFilter
  );

  // Reset modal state
  const handleOpenModal = () => {
    setWizardStep(1);
    setBizType("");
    setDigitalStatus("");
    setBizGoal("");
    setBizName("");
    setBizCity("");
    setBizPhone("");
    setAuditResult(null);
    setIsModalOpen(true);
  };

  return (
    <div className={`bg-white text-slate-900 font-sans antialiased min-h-screen selection:bg-blue-600 selection:text-white overflow-x-hidden ${lang === "ar" ? "[direction:rtl] text-right" : "[direction:ltr] text-left"}`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 16, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                : "bg-rose-50 text-rose-800 border-rose-100"
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`} />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="group">
                <Logo iconSize={44} isAr={isAr} />
              </a>
            </div>

            {/* Desktop Navigation & CTA Button & Language Switcher */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5">
              <nav className="flex items-center gap-2 xl:gap-4">
                {[
                  { id: "services", labelAr: "خدماتنا", labelEn: "Services" },
                  { id: "why-us", labelAr: "لماذا نحن", labelEn: "Why Us" },
                  { id: "portfolio", labelAr: "أعمالنا", labelEn: "Portfolio" },
                  { id: "business-guide", labelAr: "دليل الأعمال", labelEn: "Business Guide" },
                  { id: "process", labelAr: "خطواتنا", labelEn: "Process" },
                  { id: "faq", labelAr: "الأسئلة", labelEn: "FAQ" }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-xs xl:text-sm font-medium transition-colors duration-200 relative py-1 hover:text-blue-600 whitespace-nowrap ${
                      activeSection === item.id ? "text-blue-600 font-semibold" : "text-slate-500"
                    }`}
                  >
                    {lang === "ar" ? item.labelAr : item.labelEn}
                  </a>
                ))}
              </nav>

              <button
                onClick={handleOpenModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-full text-xs xl:text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                {lang === "ar" ? "احصل على تقييم مجاني" : "Get Free Assessment"}
              </button>

              {/* Language Switcher Button */}
              <button
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all cursor-pointer shadow-sm hover:border-blue-300 whitespace-nowrap shrink-0"
                title={lang === "ar" ? "Switch to English" : "التحويل للغة العربية"}
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-sans">{lang === "ar" ? "English" : "العربية"}</span>
              </button>
            </div>

            {/* Mobile Menu & Language Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-sans">{lang === "ar" ? "EN" : "عربي"}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>{lang === "ar" ? "لغة الموقع" : "Language"}</span>
                  </span>
                  <button
                    onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                    className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200/60"
                  >
                    {lang === "ar" ? "English (EN)" : "العربية (AR)"}
                  </button>
                </div>

                {[
                  { id: "services", labelAr: "خدماتنا", labelEn: "Services" },
                  { id: "why-us", labelAr: "لماذا نحن", labelEn: "Why Us" },
                  { id: "portfolio", labelAr: "أعمالنا", labelEn: "Portfolio" },
                  { id: "business-guide", labelAr: "دليل الأعمال", labelEn: "Business Guide" },
                  { id: "process", labelAr: "خطواتنا", labelEn: "Process" },
                  { id: "faq", labelAr: "الأسئلة الشائعة", labelEn: "FAQ" }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
                  >
                    {lang === "ar" ? item.labelAr : item.labelEn}
                  </a>
                ))}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleOpenModal();
                    }}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold shadow-md"
                  >
                    {lang === "ar" ? "احصل على تقييم مجاني" : "Get Free Assessment"}
                  </button>
                  <a
                    href="https://wa.me/963992250223"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center border border-slate-200 text-slate-700 hover:bg-slate-50 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>{lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact via WhatsApp"}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:py-28 overflow-hidden dot-grid">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text column */}
            <div className={`lg:col-span-7 space-y-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
              
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>{lang === "ar" ? "نبني حضورًا رقميًا يليق بأعمالك" : "Building a digital presence worthy of your business"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.35]">
                {lang === "ar" ? "عملاؤك يبحثون..." : "Your clients are searching..."} <br />
                <span className="bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent py-1 inline-block">
                  {lang === "ar" ? "تأكد أنهم يجدون مشروعك." : "Make sure they find your business."}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                {lang === "ar" ? (
                  <>
                    تبني <strong className="text-slate-950 font-semibold">Sham360</strong> حضورًا رقميًا متكاملًا يليق بعلامتكم التجارية. نساعد الشركات، والفنادق، والعيادات، والمطاعم، ومختلف الأنشطة التجارية والخدمية في دمشق وكافة المحافظات السورية على التصدّر في نتائج البحث والخرائط، وبناء ثقة عالية، وجذب زبائن حقيقيين يوميًا.
                  </>
                ) : (
                  <>
                    <strong className="text-slate-950 font-semibold">Sham360</strong> builds a complete digital presence that elevates your brand prestige. We help companies, hotels, clinics, restaurants, and retail stores in Damascus and all Syrian governorates top search results and maps, gain customer trust, and attract new clients daily.
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={handleOpenModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  {lang === "ar" ? "احصل على تقييم مجاني" : "Get Free Assessment"}
                </button>
                <a
                  href="https://wa.me/963992250223"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-full text-base font-semibold shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <span>{lang === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}</span>
                </a>
              </div>

              {/* Trust block */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 max-w-md">
                <div className="flex -space-x-2 space-x-reverse">
                  <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center font-bold text-xs text-blue-700">
                    {isAr ? "د" : "D"}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center font-bold text-xs text-indigo-700">
                    {isAr ? "م" : "M"}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center font-bold text-xs text-cyan-750">
                    {isAr ? "ش" : "S"}
                  </div>
                </div>
                <div>
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {isAr ? "موثوقون لدى أكثر من 120 شركة ومحل تجاري في سوريا" : "Trusted by 120+ top Syrian businesses & brands"}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Storefront Graphic Illustration */}
            <div className="lg:col-span-5 relative flex flex-col justify-center items-center w-full min-h-[460px]" dir={isAr ? "rtl" : "ltr"}>
              
              {/* Outer Glow Effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Main Card */}
              <div 
                className="relative w-full max-w-[450px] bg-white border border-slate-100 rounded-3xl shadow-xl p-5 flex flex-col gap-4 overflow-hidden transition-all hover:shadow-2xl hover:border-slate-200/80 lg:-translate-y-12"
                onMouseEnter={() => setIsHoveredHighlight(true)}
                onMouseLeave={() => setIsHoveredHighlight(false)}
              >
                
                {/* === IMPACT TOGGLE TABS === */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full shadow-inner border border-slate-200/40 relative z-20">
                  <button
                    type="button"
                    onClick={() => setImpactMode("before")}
                    className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                      impactMode === "before"
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    {isAr ? "قبل خدماتنا 📉" : "Before Our Services 📉"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setImpactMode("after")}
                    className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                      impactMode === "after"
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300/20 animate-pulse" />
                    {isAr ? "بعد شام 360 🚀" : "After Sham 360 🚀"}
                  </button>
                </div>

                {/* Visual Storefront Container */}
                <div className="relative w-full h-[240px] bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-end p-4">
                  
                  {impactMode === "before" ? (
                    <>
                      {/* GREY UNLIT SKY */}
                      <div className="absolute inset-0 bg-slate-950 bg-[linear-gradient(to_bottom,rgba(40,44,52,0.9),rgba(15,17,23,0.98))] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05),transparent_75%)]" />
                      </div>

                      {/* Search Bar Map overlay showing NOT FOUND */}
                      <div className="absolute inset-x-4 top-4 pointer-events-none z-30 flex flex-col gap-1.5">
                        <div className="bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-rose-900/30 flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-rose-950 flex items-center justify-center text-rose-500">
                              <X className="w-2.5 h-2.5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-300">
                              {isAr ? 'البحث: "مطعم مأكولات في دمشق"' : 'Search: "Food Restaurant in Damascus"'}
                            </span>
                          </div>
                          <span className="text-[9px] bg-rose-950/80 text-rose-400 px-2 py-0.5 rounded-full font-black leading-none border border-rose-900/30">
                            {isAr ? "غير متوفر! ❌" : "Not Found! ❌"}
                          </span>
                        </div>
                      </div>

                      {/* Locked/Lost Map Icon overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-8">
                        <motion.div 
                          animate={{ scale: [1, 0.95, 1], opacity: [0.3, 0.4, 0.3] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          className="flex flex-col items-center gap-1"
                        >
                          <MapPin className="w-12 h-12 text-slate-600 stroke-[1.5]" />
                          <span className="text-[11px] font-bold text-slate-500">
                            {isAr ? "المحل مفقود من الخريطة والإنترنت" : "Business missing from Google Maps & Web"}
                          </span>
                        </motion.div>
                      </div>

                      {/* Dull grey awning */}
                      <div className="relative w-[110%] -mr-5 bg-gradient-to-b from-slate-800 to-slate-900 h-8 flex border-b-2 border-slate-950 shadow-sm z-20">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 h-full ${i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-800/40"}`} 
                          />
                        ))}
                        <div className="absolute inset-x-0 bottom-[-4px] h-1 w-full flex">
                          {[...Array(24)].map((_, i) => (
                            <div 
                              key={i} 
                              className="flex-1 h-1 bg-slate-900 rounded-b-full border-b border-slate-950" 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Locked/Dull Shop Wall */}
                      <div className="relative w-full h-28 bg-slate-950 border-x border-slate-900 flex items-stretch z-10">
                        {/* Windows display on the right - dark, dusty, questions */}
                        <div className="flex-1 border-l border-slate-900 p-2 flex flex-col justify-between bg-gradient-to-tr from-slate-950 to-slate-900 relative overflow-hidden">
                          <div className="text-[8px] text-slate-700 font-bold self-center mt-3">
                            {isAr ? "نافذة مظلمة" : "Dark Window"}
                          </div>
                          <div className="flex justify-around items-end opacity-20">
                            <Store className="w-6 h-6 text-slate-500 stroke-[1.5]" />
                            <Utensils className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                          </div>
                        </div>

                        {/* Entrance Glass Door - closed, offline */}
                        <div className="w-24 border-slate-900 bg-slate-950/90 relative flex items-center justify-center p-2">
                          <div className="absolute inset-1 border border-slate-900/40 rounded-sm" />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-slate-800 rounded-sm" />
                          <div className="absolute bottom-2 text-[8px] text-rose-500/80 font-black tracking-wide border border-rose-900/30 px-1.5 py-0.5 rounded bg-rose-950/30 leading-none">
                            {isAr ? "مغلق / لا زوار" : "Closed / No Traffic"}
                          </div>
                        </div>
                      </div>

                      {/* Cement pavement */}
                      <div className="relative w-[110%] -mr-5 h-4 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-850 z-20 flex justify-center items-center">
                        <div className="w-full h-[1px] bg-slate-800 opacity-30" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* GLORIOUS LIT SKY */}
                      <div className="absolute inset-0 bg-slate-950 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.8),rgba(2,6,23,0.95))] overflow-hidden">
                        {/* Stars/Lights in background */}
                        <div className="absolute top-4 right-10 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60" />
                        <div className="absolute top-8 left-16 w-1 h-1 bg-indigo-300 rounded-full opacity-40" />
                        <div className="absolute top-12 right-24 w-1 h-1 bg-cyan-400 rounded-full opacity-50" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.25),transparent_60%)]" />
                      </div>

                      {/* Backdrop glowing sign lines */}
                      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-blue-500/20 to-transparent" />

                      {/* === OVERLAYS BASED ON SERVICE HIGHLIGHT === */}
                      <AnimatePresence mode="wait">
                        {activeHighlight === "maps" && (
                          <motion.div 
                            key="maps-overlay"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 flex flex-col items-center justify-start pt-3 px-4 pointer-events-none z-30"
                          >
                            {/* Interactive Floating Google Search Result Badge */}
                            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-blue-100/50 flex items-center gap-1.5 max-w-[90%] transform -rotate-1">
                              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <MapPin className="w-3 h-3" />
                              </div>
                              <span className="text-[10px] font-black text-slate-900 leading-none">
                                {isAr ? "مطعمنا في دمشق" : "Our Restaurant in Damascus"}
                              </span>
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold leading-none">
                                {isAr ? "موثق ومميز ✓" : "Verified & Ranked ✓"}
                              </span>
                            </div>
                            
                            {/* Massive Glowing Map Pin bouncing above roof */}
                            <motion.div 
                              animate={{ y: [0, -8, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="mt-6 flex flex-col items-center"
                            >
                              <div className="relative">
                                <div className="absolute -inset-1.5 bg-blue-500 rounded-full blur-md opacity-40 animate-pulse" />
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg border border-white">
                                  <MapPin className="w-5 h-5 fill-white/10" />
                                </div>
                              </div>
                              <div className="w-1.5 h-1.5 bg-blue-500/80 rounded-full mt-1.5 blur-[1px]" />
                            </motion.div>
                          </motion.div>
                        )}

                        {activeHighlight === "website" && (
                          <motion.div 
                            key="website-overlay"
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -30, scale: 0.9 }}
                            className="absolute inset-y-0 left-4 w-[130px] bg-slate-900 rounded-t-xl border-t-4 border-x-4 border-slate-800 shadow-2xl z-30 flex flex-col overflow-hidden pointer-events-none"
                          >
                            <div className="bg-slate-950 p-1 flex justify-between items-center px-2 text-[6px] text-slate-400 border-b border-slate-800">
                              <span>9:41</span>
                              <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                            </div>
                            <div className="flex-1 bg-white p-2 text-right flex flex-col gap-1">
                              <div className="h-2 w-10 bg-blue-600 rounded-sm self-end" />
                              <div className="flex gap-1 items-center justify-end">
                                <div className="h-1 w-6 bg-slate-200 rounded-sm" />
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                              </div>
                              <div className="h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                <LogoIcon size={18} />
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="h-5 bg-blue-50 rounded-md border border-blue-100 flex items-center justify-center text-[5px] font-bold text-blue-600">
                                  {isAr ? "منيو" : "Menu"}
                                </div>
                                <div className="h-5 bg-indigo-50 rounded-md border border-indigo-100 flex items-center justify-center text-[5px] font-bold text-indigo-600">
                                  {isAr ? "طلب مباشر" : "Direct Order"}
                                </div>
                              </div>
                              <div className="h-3 bg-emerald-500 rounded-md text-white text-[5px] font-bold flex items-center justify-center">
                                {isAr ? "تحميل فائق السرعة 0.4s" : "Ultra-fast load 0.4s"}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeHighlight === "vr" && (
                          <motion.div 
                            key="vr-overlay"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                          >
                            <div className="relative flex items-center justify-center">
                              <div className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/20 animate-ping" />
                              <div className="absolute w-24 h-24 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '8s' }} />
                              <div className="absolute w-16 h-16 rounded-full bg-cyan-500/10 blur-md" />
                              
                              <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white flex flex-col items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-200"
                              >
                                <Eye className="w-6 h-6 animate-pulse" />
                                <span className="text-[6px] font-black tracking-tighter uppercase leading-none mt-0.5">
                                  {isAr ? "جولة 360° 8K" : "360° Tour 8K"}
                                </span>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}

                        {activeHighlight === "nfc" && (
                          <motion.div 
                            key="nfc-overlay"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 flex flex-col items-end justify-center pr-6 pointer-events-none z-30"
                          >
                            <div className="relative mr-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-amber-100/50 max-w-[130px] flex flex-col items-center text-center gap-1">
                              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                <Cpu className="w-4.5 h-4.5 animate-bounce" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-900">
                                {isAr ? "بطاقة تقييم ذكية" : "Smart Review Card"}
                              </span>
                              <span className="text-[8px] text-amber-600 font-semibold leading-none">
                                {isAr ? "بتقنية NFC اللاسلكية" : "NFC Wireless Tech"}
                              </span>
                              <div className="flex text-amber-400 gap-0.5 mt-0.5">
                                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Storefront Backlit Signboard (Backplate) */}
                      <div className="relative w-full bg-slate-900/90 py-2.5 px-3 rounded-xl border border-slate-800 shadow-lg flex items-center justify-between mb-auto z-10">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                          <span className="text-[9px] text-slate-400 font-bold">
                            {isAr ? "متصل رقمياً" : "Digitally Online"}
                          </span>
                        </div>
                        <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80 shadow-[0_0_15px_rgba(59,130,246,0.25)] flex items-center gap-2">
                          <LogoIcon size={18} />
                          <span className="text-[11px] font-black tracking-tight text-white">SHAM <span className="text-blue-500">360</span></span>
                        </div>
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                          <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                        </div>
                      </div>

                      {/* Striped Canopy / Awning (Slanted Roof Front) */}
                      <div className="relative w-[110%] -mr-5 bg-gradient-to-b from-blue-600 to-indigo-700 h-8 flex border-b-2 border-blue-900 shadow-md z-20">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 h-full ${i % 2 === 0 ? "bg-indigo-800/30" : "bg-white/10"}`} 
                          />
                        ))}
                        <div className="absolute inset-x-0 bottom-[-4px] h-1 w-full flex">
                          {[...Array(24)].map((_, i) => (
                            <div 
                              key={i} 
                              className="flex-1 h-1 bg-indigo-700 rounded-b-full border-b border-indigo-900" 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Main Shop Ground Floor Wall & Glass Windows */}
                      <div className="relative w-full h-28 bg-slate-900 border-x border-slate-800 flex items-stretch z-10">
                        
                        {/* Window display on the right */}
                        <div className="flex-1 border-l border-slate-800/60 p-2 flex flex-col justify-between bg-gradient-to-tr from-slate-950 to-slate-900 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0%,transparent_80%)]" />
                          <div className="flex gap-4 justify-center items-start">
                            <div className="flex flex-col items-center">
                              <div className="w-[1px] h-3 bg-slate-700" />
                              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FBBF24]" />
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-[1px] h-5 bg-slate-700" />
                              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FBBF24]" />
                            </div>
                          </div>
                          <div className="flex justify-around items-end z-10">
                            <Store className="w-6 h-6 text-slate-400 stroke-[1.5]" />
                            <Utensils className="w-5 h-5 text-slate-500 stroke-[1.5]" />
                          </div>
                        </div>

                        {/* Entrance Glass Door on the left */}
                        <div className="w-24 border-slate-800 bg-slate-950/90 relative flex items-center justify-center p-2">
                          <div className="absolute inset-1 border border-slate-800/60 rounded-sm" />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-slate-700 rounded-sm border border-slate-600" />
                          <div className="absolute bottom-1 text-[7px] text-emerald-400 font-bold scale-90 border border-emerald-950/40 px-1.5 py-0.5 rounded bg-emerald-950/30">
                            {isAr ? "مفتوح رقمياً" : "Open 24/7"}
                          </div>
                          <div className="w-6 h-12 border border-slate-800/40 rounded flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                        </div>

                      </div>

                      {/* Concrete Pavement/Ground Base */}
                      <div className="relative w-[110%] -mr-5 h-4 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-slate-700 z-20 flex justify-center items-center">
                        <div className="w-full h-[1px] bg-slate-600 opacity-30" />
                      </div>
                    </>
                  )}

                </div>

                {/* === CONDITIONAL INTERACTIVE CONTROLS BASED ON MODE === */}
                
                {impactMode === "before" ? (
                  /* BEFORE MODE: Shocking statistics panel */
                  <div className={`bg-rose-50/80 rounded-2xl p-4 border border-rose-100/60 ${isAr ? "text-right" : "text-left"} space-y-3`}>
                    <h4 className="text-xs font-black text-rose-900 flex items-center gap-1.5 justify-start">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>{isAr ? "ما يعانيه المحل التجاري في الوضع التقليدي:" : "Challenges faced by offline businesses:"}</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-[11px] text-slate-600 font-medium">
                      <div className="flex items-start gap-2 justify-start">
                        <span className="text-rose-500 font-black">←</span>
                        <p>
                          {isAr ? (
                            <><strong className="text-slate-900 font-bold">خسارة العملاء المستمرة:</strong> 85% من العملاء يبحثون عن المحلات والمنيو عبر الإنترنت قبل الزيارة الفعيلة.</>
                          ) : (
                            <><strong className="text-slate-900 font-bold">Continuous Client Loss:</strong> 85% of customers search Google for menus and locations before visiting in person.</>
                          )}
                        </p>
                      </div>
                      <div className="flex items-start gap-2 justify-start">
                        <span className="text-rose-500 font-black">←</span>
                        <p>
                          {isAr ? (
                            <><strong className="text-slate-900 font-bold">انعدام المصداقية والثقة:</strong> غياب الصور والتقييمات يمنع المغتربين والزبائن الجدد من اتخاذ قرار الشراء.</>
                          ) : (
                            <><strong className="text-slate-900 font-bold">Lack of Trust & Credibility:</strong> Absence of 360° tours and reviews stops new clients from making a purchase decision.</>
                          )}
                        </p>
                      </div>
                      <div className="flex items-start gap-2 justify-start">
                        <span className="text-rose-500 font-black">←</span>
                        <p>
                          {isAr ? (
                            <><strong className="text-slate-900 font-bold">خطر الحظر والإغلاق:</strong> الخرائط غير الموثقة قانونياً قد تختفي أو يتم الاستيلاء عليها من المنافسين.</>
                          ) : (
                            <><strong className="text-slate-900 font-bold">Risk of Hijacking/Removal:</strong> Unverified Google listings can disappear or be wrongly flagged by competitors.</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* AFTER MODE: Interactive active service selectors */
                  <>
                    {/* --- SELECTION NAVIGATION BUTTONS --- */}
                    <div className="grid grid-cols-4 gap-2 text-center" dir={isAr ? "rtl" : "ltr"}>
                      {[
                        { id: "maps", label: isAr ? "خرائط Google" : "Google Maps", color: "blue", desc: isAr ? "Google Maps" : "Local Ranking" },
                        { id: "website", label: isAr ? "موقع إلكتروني" : "Website", color: "indigo", desc: isAr ? "Premium Website" : "High Speed" },
                        { id: "vr", label: isAr ? "جولة 360° 8K" : "360° Tour", color: "cyan", desc: isAr ? "8K Virtual Tour" : "8K Ultra HD" },
                        { id: "nfc", label: isAr ? "بطاقات NFC" : "NFC Cards", color: "amber", desc: isAr ? "Smart NFC" : "Instant Reviews" },
                      ].map((btn) => {
                        const isSelected = activeHighlight === btn.id;
                        const colorMap = {
                          blue: { border: "border-blue-500", text: "text-blue-600", bg: "bg-blue-50/50" },
                          indigo: { border: "border-indigo-500", text: "text-indigo-600", bg: "bg-indigo-50/50" },
                          cyan: { border: "border-cyan-500", text: "text-cyan-600", bg: "bg-cyan-50/50" },
                          amber: { border: "border-amber-500", text: "text-amber-600", bg: "bg-amber-50/50" },
                        };
                        const styling = colorMap[btn.color as keyof typeof colorMap];
                        
                        return (
                          <button
                            key={btn.id}
                            type="button"
                            onClick={() => setActiveHighlight(btn.id as any)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${
                              isSelected 
                                ? `${styling.border} ${styling.bg} shadow-sm scale-102` 
                                : "border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-500"
                            }`}
                          >
                            <span className={`text-[10px] font-black leading-none ${isSelected ? styling.text : "text-slate-700"}`}>
                              {btn.label}
                            </span>
                            <span className="text-[8px] text-slate-400 font-medium scale-90 block">
                              {btn.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Service Description Panel */}
                    <div className={`bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100/50 ${isAr ? "text-right" : "text-left"} min-h-[75px] flex flex-col justify-center`}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeHighlight}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-1"
                        >
                          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 justify-start">
                            {activeHighlight === "maps" && <MapPin className="w-3.5 h-3.5 text-blue-600" />}
                            {activeHighlight === "website" && <Globe className="w-3.5 h-3.5 text-indigo-600" />}
                            {activeHighlight === "vr" && <Eye className="w-3.5 h-3.5 text-cyan-600" />}
                            {activeHighlight === "nfc" && <Cpu className="w-3.5 h-3.5 text-amber-600" />}
                            <span>
                              {activeHighlight === "maps" && (isAr ? "توثيق وتصدّر خرائط Google الرسمية (Google Maps)" : "Google Maps Official Verification & Local Ranking")}
                              {activeHighlight === "website" && (isAr ? "المواقع الفاخرة وصفحات الهبوط الذكية (Premium Websites)" : "Custom High-Speed Websites & Landing Pages")}
                              {activeHighlight === "vr" && (isAr ? "الجولات الافتراضية التفاعلية ثلاثية الأبعاد بدقة Ultra HD (8K Virtual Tours)" : "Interactive 8K Ultra HD 360° Virtual Tours")}
                              {activeHighlight === "nfc" && (isAr ? "بطاقات ومستلزمات التقييم الذكي بنقرة واحدة (Smart NFC)" : "Smart NFC Cards & Standees for Instant Reviews")}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            {activeHighlight === "maps" && (isAr ? "نوثق خريطتك الرسمية ونحميها من البلاغات ونساعد عملائك على إيجادك فوراً ومضاعفة مكالماتك ومبيعاتك المحلية عبر Google." : "We officially verify your Google Maps profile, protect it from negative flagging, and help local customers find you instantly to double your calls and walk-in sales.")}
                            {activeHighlight === "website" && (isAr ? "نصمم لك موقعاً سريعاً وجذاباً مخصصاً للهواتف يعرض خدماتك ومنيو منتجاتك بطريقة تسهل الشراء والاتصال المباشر." : "We design fast, mobile-friendly websites showcasing your products, menus, or services with 1-click WhatsApp & call actions.")}
                            {activeHighlight === "vr" && (isAr ? "ندع زبائنك يتجولون داخل مطعمك، فندقك، أو معرضك تفاعلياً بجودة Ultra HD 8K كأنهم هناك؛ مما يزيد ثقتهم ورغبتهم في الحجز." : "Allow customers worldwide to virtually explore your venue, hotel, or clinic in stunning 8K clarity, building immediate booking confidence.")}
                            {activeHighlight === "nfc" && (isAr ? "بطاقة ذكية أنيقة بمجرد ملامستها لهاتف الزبون يفتح خيار تقييم عملك فوراً، لتنشيط تقييماتك على Google بشكل يومي ومستدام." : "Branded NFC standees and cards that automatically open your Google Review page with a single phone tap, generating steady 5-star ratings.")}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-8">
            {isAr 
              ? "المنظومة الاحترافية المتكاملة لتصدّر وتوثيق الحضور الرقمي لعملك في سوريا 🇸🇾" 
              : "Integrated Ecosystem for Google Maps Verification & Digital Growth in Syria 🇸🇾"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-items-center" dir={isAr ? "rtl" : "ltr"}>
            
            {/* Google Maps Item */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-100/90 hover:border-blue-500/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group cursor-pointer w-full max-w-xs justify-start">
              <div className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100/80 group-hover:bg-blue-50 group-hover:border-blue-100/40 transition-all duration-300 flex-shrink-0">
                {/* Official Google Brand Colors Rotating Ring */}
                <div className="absolute inset-0.5 rounded-[9px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                <MapPin className="w-5 h-5 text-blue-600 fill-blue-500/10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                {isAr ? "توثيق وتصدّر خرائط Google (Google Maps) 📍" : "Google Maps Verification & Ranking 📍"}
              </span>
            </div>

            {/* Premium Website Item */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-100/90 hover:border-indigo-500/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group cursor-pointer w-full max-w-xs justify-start">
              <div className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100/80 group-hover:bg-indigo-50 group-hover:border-indigo-100/40 transition-all duration-300 flex-shrink-0">
                {/* Indigo/Purple Custom Ring */}
                <div className="absolute inset-0.5 rounded-[9px] border-2 border-transparent border-t-indigo-500 border-r-purple-500 border-b-pink-500 border-l-indigo-400 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                <Globe className="w-5 h-5 text-indigo-600 fill-indigo-500/10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
                {isAr ? "مواقع فاخرة وصفحات هبوط ذكية 🌐" : "Custom High-Speed Websites 🌐"}
              </span>
            </div>

            {/* 8K Virtual Tours Item */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-100/90 hover:border-cyan-500/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group cursor-pointer w-full max-w-xs justify-start">
              <div className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100/80 group-hover:bg-cyan-50 group-hover:border-cyan-100/40 transition-all duration-300 flex-shrink-0">
                {/* Cyan/Teal Custom Ring */}
                <div className="absolute inset-0.5 rounded-[9px] border-2 border-transparent border-t-cyan-500 border-r-blue-400 border-b-emerald-400 border-l-cyan-300 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                <Eye className="w-5 h-5 text-cyan-600 fill-cyan-500/10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-800 group-hover:text-cyan-600 transition-colors duration-200">
                {isAr ? "جولات 360° تفاعلية فائقة الدقة 8K 📸" : "8K Interactive 360° Virtual Tours 📸"}
              </span>
            </div>

            {/* Smart NFC Cards Item */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-100/90 hover:border-amber-500/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group cursor-pointer w-full max-w-xs justify-start">
              <div className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100/80 group-hover:bg-amber-50 group-hover:border-amber-100/40 transition-all duration-300 flex-shrink-0">
                {/* Amber/Orange Custom Ring */}
                <div className="absolute inset-0.5 rounded-[9px] border-2 border-transparent border-t-amber-500 border-r-orange-500 border-b-yellow-500 border-l-amber-400 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                <Cpu className="w-5 h-5 text-amber-600 fill-amber-500/10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-800 group-hover:text-amber-600 transition-colors duration-200">
                {isAr ? "بطاقات ومستلزمات التقييم الذكي NFC ⚡" : "Smart NFC Instant Review Cards ⚡"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Sham360 Smart AI Lab Section */}
      <section id="ai-lab" className="py-20 md:py-24 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute -top-40 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-cyan-50/90 border border-blue-100/80 px-4 py-1.5 rounded-full text-blue-700 text-xs font-black shadow-sm">
              <Brain className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>{isAr ? "مختبر الذكاء الاصطناعي مدعوم بـ Google Gemini" : "AI Strategy Lab powered by Google Gemini"}</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.2]">
              {isAr ? "مساعد " : "AI-Powered "}
              <span className="relative inline-flex items-center gap-2 px-4 py-1 mx-1.5 rounded-2xl bg-slate-950 text-white shadow-xl shadow-blue-950/20 border border-slate-800 font-black font-en dir-ltr align-middle group hover:border-blue-500/50 transition-all duration-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent font-black tracking-wide">
                  Sham360 AI
                </span>
              </span>{" "}
              {isAr ? "التسويقي المحلي" : " Local Strategy Consultant"}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {isAr 
                ? "أدخل تخصص عملك ومدينتك في سوريا، ودع المستشار الرقمي المعتمد على خوارزميات الذكاء الاصطناعي يبتكر لك تكتيكات تسويقية وكلمات مفتاحية محلية دقيقة لمشروعك فوراً وبشكل مجاني."
                : "Enter your business industry and target city in Syria, and let our Gemini-driven digital consultant generate tailored marketing tactics and local keywords instantly."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Panel */}
            <div className={`lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-lg space-y-6 relative overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className={`text-lg font-bold text-slate-950 border-blue-600 ${isAr ? "border-r-4 pr-3" : "border-l-4 pl-3"}`}>
                {isAr ? "صمم خطتك المحلية الفورية" : "Generate Your Local Strategy"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {isAr ? "نوع العمل أو النشاط التجاري" : "Business Sector / Industry"}
                  </label>
                  <input
                    type="text"
                    value={labCategory}
                    onChange={(e) => setLabCategory(e.target.value)}
                    placeholder={isAr ? "مثال: مطعم شاورما، عيادة أسنان، فندق تراثي" : "e.g., Shawarma Restaurant, Dental Clinic, Heritage Hotel"}
                    className={`w-full border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all ${isAr ? "text-right" : "text-left"}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {isAr ? "المدينة أو المنطقة المستهدفة" : "Target City / Region"}
                  </label>
                  <input
                    type="text"
                    value={labCity}
                    onChange={(e) => setLabCity(e.target.value)}
                    placeholder={isAr ? "مثال: دمشق - المزة، حلب - الشهباء، اللاذقية" : "e.g., Damascus - Mazzeh, Aleppo - Shahbaa, Latakia"}
                    className={`w-full border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all ${isAr ? "text-right" : "text-left"}`}
                  />
                </div>

                {/* Syrian Business Quick Presets */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400">
                    {isAr ? "نماذج سريعة للتجربة الفورية:" : "Quick trial presets:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-start">
                    {[
                      { cat: isAr ? "عيادة أسنان تجميلية" : "Cosmetic Dental Clinic", city: isAr ? "دمشق - المزة" : "Damascus - Mazzeh" },
                      { cat: isAr ? "مطعم مأكولات شعبية" : "Traditional Syrian Restaurant", city: isAr ? "حلب - الشهباء" : "Aleppo - Shahbaa" },
                      { cat: isAr ? "فندق تراثي قديم" : "Heritage Boutique Hotel", city: isAr ? "دمشق القديمة" : "Old Damascus" },
                      { cat: isAr ? "شركة شحن وتوصيل" : "Logistics & Shipping Co.", city: isAr ? "اللاذقية" : "Latakia" }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setLabCategory(preset.cat);
                          setLabCity(preset.city);
                        }}
                        className="text-[11px] font-semibold bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                      >
                        {preset.cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateLabPlan}
                disabled={labLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {labLoading ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin" />
                    <span>{isAr ? "جاري التحليل وصياغة التوصية..." : "Analyzing & Drafting Strategy..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{isAr ? "توليد الخطة الذكية فوراً" : "Generate Smart Strategy Now"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-7">
              {!labLoading && !labResult && (
                <div className="bg-slate-50/60 border border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[360px]">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 mb-1">
                    {isAr ? "بانتظار مدخلاتك المبدعة" : "Awaiting Your Strategy Inputs"}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    {isAr 
                      ? "أدخل نوع نشاطك والمدينة المستهدفة على اليمين واضغط على زر التوليد لتشغيل محرك Gemini واستعراض خطتك التكتيكية."
                      : "Enter your industry and target city on the left, then click generate to launch Gemini engine and view your action plan."}
                  </p>
                </div>
              )}

              {labLoading && (
                <div className="bg-white border border-slate-100 shadow-md rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[360px] space-y-6">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 bg-blue-100 rounded-full animate-ping opacity-40" />
                    <div className="relative w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Brain className="w-7 h-7 animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {isAr ? "يتحدث خبراؤنا الرقميون مع Gemini..." : "Consulting Gemini AI Engine..."}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {isAr ? "جاري فحص فجوات التواجد للمنافسين وصياغة كلمات البحث..." : "Auditing competitor visibility gaps and drafting search keywords..."}
                    </p>
                  </div>
                </div>
              )}

              {labResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-100 shadow-md rounded-3xl p-8 space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        {isAr ? "جاهز للاستخدام" : "Ready to Use"}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyAllLab}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedAllLab ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ التحليل الكامل" : "Copy Full Analysis")}</span>
                    </button>
                  </div>

                  <div className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
                    
                    {/* Keywords Section */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isAr ? "أقوى الكلمات الدلالية لخرائط جوجل (Local SEO Keywords):" : "Top Google Maps Keywords (Local SEO):"}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {labResult.keywords.map((kw, i) => (
                          <button
                            key={i}
                            onClick={() => handleCopyText(kw, `kw-${i}`)}
                            className="text-xs font-semibold bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>{kw}</span>
                            <Copy className="w-3 h-3 opacity-50" />
                            {copiedKeyword === `kw-${i}` && <span className="text-[9px] text-emerald-600">{isAr ? "تم!" : "Copied!"}</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Marketing Hook */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{isAr ? "نص تسويقي مقترح متوافق مع البيئة السورية (Marketing Hook):" : "High-Converting Marketing Hook:"}</span>
                      </h4>
                      <div className="bg-indigo-50/30 border border-indigo-100/50 p-4 rounded-2xl text-sm text-slate-800 leading-relaxed relative group">
                        <p>{labResult.marketing_hook}</p>
                        <button
                          onClick={() => handleCopyText(labResult.marketing_hook, "hook")}
                          className={`absolute bottom-2 ${isAr ? "left-2" : "right-2"} opacity-0 group-hover:opacity-100 bg-white border border-slate-200 p-1.5 rounded-lg text-xs hover:text-blue-600 transition-all cursor-pointer`}
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Action Plan */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-400 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isAr ? "التوجيه الاستراتيجي للنمو المقترح (Actionable Strategy):" : "Actionable Growth Strategy:"}</span>
                      </h4>
                      <div className="bg-emerald-50/20 border border-emerald-100/40 p-4 rounded-2xl text-sm text-slate-800 leading-relaxed relative group">
                        <p>{labResult.growth_action}</p>
                        <button
                          onClick={() => handleCopyText(labResult.growth_action, "strat")}
                          className={`absolute bottom-2 ${isAr ? "left-2" : "right-2"} opacity-0 group-hover:opacity-100 bg-white border border-slate-200 p-1.5 rounded-lg text-xs hover:text-blue-600 transition-all cursor-pointer`}
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Lab mini CTA */}
                    <div className="bg-blue-50/40 border border-blue-100/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                      <p className={`text-xs text-slate-700 font-medium text-center ${isAr ? "sm:text-right" : "sm:text-left"} leading-normal`}>
                        {isAr 
                          ? "أعجبك التحليل والكلمات؟ تواصل مع مستشارينا لتنفيذ هذه الاستراتيجية على أرض الواقع باحترافية كاملة."
                          : "Like this strategy? Connect with our team to execute these tactics in your local market."}
                      </p>
                      <a
                        href={`https://wa.me/963992250223?text=${encodeURIComponent(
                          isAr 
                            ? `مرحباً Sham360، قمت باستخدام مستشاركم الذكي للعمل "${labCategory}" في "${labCity}" وحصلت على توصية ممتازة، أود الاستفسار عن باقات التنفيذ الفعلي.`
                            : `Hello Sham360, I used your AI consultant for "${labCategory}" in "${labCity}" and got a great strategy. I'd like to inquire about actual execution plans.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isAr ? "ناقش الاستراتيجية الآن" : "Discuss Strategy Now"}</span>
                      </a>
                    </div>

                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {isAr ? "خدماتنا ونتائجها" : "Our Services & Results"}
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              {isAr ? "حلول رقمية مصممة لنمو مشروعك الفعلي" : "Digital Solutions Designed for Real Business Growth"}
            </p>
            <p className="text-base text-slate-500">
              {isAr 
                ? "لا نبيع فقط برمجيات أو خدمات تقنية، بل نبني لك حضوراً استثنائياً يقنع الباحثين ويوجههم فوراً إلى مقر عملك أو يسهل اتمام عملياتهم التجارية."
                : "We don't just sell software or tech services; we craft an exceptional presence that convinces local prospects and guides them directly to your doors."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 flex flex-col justify-between group ${service.bgClass} ${isAr ? "text-right" : "text-left"}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100/90 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-all duration-300 flex-shrink-0">
                      {/* Google/NFC Style Multi-Brand Rotating Ring */}
                      <div className="absolute inset-0.5 rounded-[13px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                      {renderIcon(service.iconName, "w-6 h-6 text-slate-800 group-hover:text-blue-600 fill-blue-500/10 group-hover:scale-110 transition-transform duration-300")}
                    </div>
                    {(isAr ? service.badge : service.badgeEn) && (
                      <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                        {isAr ? service.badge : service.badgeEn}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">
                    {isAr ? service.title : service.titleEn}
                  </h3>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {isAr ? service.description : service.descriptionEn}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {(isAr ? service.bullets : service.bulletsEn).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleOpenModal}
                  className="w-full text-center bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-800 font-semibold py-3 px-4 rounded-2xl transition-all duration-300 text-sm cursor-pointer"
                >
                  {isAr ? "استفسر واطلب الخدمة" : "Inquire & Order Service"}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Digital Presence Matters Section */}
      <section id="why-us" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {isAr ? "لماذا يهم الحضور الرقمي؟" : "Why Digital Presence Matters"}
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              {isAr ? "أرقام وحقائق تغير نظرتك لتواجدك اليوم" : "Facts & Insights That Drive Growth"}
            </p>
            <p className="text-base text-slate-500">
              {isAr 
                ? "في العصر الحالي، عدم تواجدك على الخريطة ببيانات موثوقة أو عدم امتلاكك لموقع حديث وسريع يعني ببساطة غيابك التام عن ملايين الباحثين يومياً."
                : "Today, missing from Google Maps with verified info or lacking a fast website means total invisibility to thousands of daily local searches."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Eye className="w-6 h-6 text-blue-600 stroke-[1.75]" />,
                title: isAr ? "الظهور المستمر (Visibility)" : "Continuous Visibility",
                description: isAr ? "تتواجد أمام أعين عملائك في اللحظة المحددة التي يبحثون فيها عن خدماتك أو منتجاتك على الخرائط وسيرش." : "Stay right in front of customers the exact moment they search for your services or products on Google Maps & Search.",
                bg: "bg-blue-50/50"
              },
              {
                icon: <Star className="w-6 h-6 text-amber-500 fill-amber-400/20 stroke-[1.75]" />,
                title: isAr ? "بناء الثقة الفورية (Trust)" : "Instant Trust Building",
                description: isAr ? "ملفك الرقمي الكامل مع جولات 360° حقيقية وآراء المرضى أو الزبائن يمنحك مصداقية عالية يتفوق بها عملك فوراً." : "A complete digital footprint with authentic 360° virtual tours and verified reviews gives you immediate market authority.",
                bg: "bg-indigo-50/50"
              },
              {
                icon: <Globe className="w-6 h-6 text-indigo-600 stroke-[1.75]" />,
                title: isAr ? "الاحترافية القصوى" : "Ultimate Professionalism",
                description: isAr ? "انطباع أول فاخر من خلال موقع حديث متناسق وسريع يعبر عن روعة وتفاصيل وهيبة مشروعك الفعلي على الواقع." : "Create a high-end first impression through a sleek, fast website that reflects the true prestige of your physical business.",
                bg: "bg-cyan-50/50"
              },
              {
                icon: <Cpu className="w-6 h-6 text-emerald-600 stroke-[1.75]" />,
                title: isAr ? "تسهيل التواصل والطلب" : "Streamlined Contact & Leads",
                description: isAr ? "تيسير تواصل الزائر معك عبر بنية اتصال ذكية بلمسة واحدة لطلب منتجك، حجز عيادتك، أو الاتصال بفرعك المعتمد." : "Make customer contact seamless with 1-click WhatsApp links, online appointment booking, or direct calls.",
                bg: "bg-emerald-50/50"
              }
            ].map((card, i) => (
              <div key={i} className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group ${isAr ? "text-right" : "text-left"}`}>
                <div className="relative w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-all duration-300 flex-shrink-0 mb-6">
                  {/* Google/NFC Style Multi-Brand Rotating Ring */}
                  <div className="absolute inset-0.5 rounded-[13px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Process Timeline Section */}
      <section id="process" className="py-20 md:py-28 bg-slate-50/30 border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {isAr ? "كيف نعمل معاً؟" : "How We Work"}
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              {isAr ? "رحلة واضحة لبناء حضورك الرقمي الاحترافي" : "A Clear Path to Build Your Digital Presence"}
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              {isAr 
                ? "نعتمد في Sham360 منهجية عمل واضحة ومُحكمة توفر لشركائنا الكرام تجربة سلسة وموثوقة، وتحقق أعلى مستويات الجودة والاتقان الرقمي."
                : "At Sham360, we follow a transparent and structured workflow that ensures a seamless experience and high ROI."}
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {TIMELINE_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-500/10 transition-all duration-300 group ${isAr ? "text-right" : "text-left"}`}
                >
                  <div className="relative w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-200 transition-all duration-300 flex-shrink-0 mb-6">
                    <div className="absolute inset-0.5 rounded-[12px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                    <span className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {isAr ? step.number : step.numberEn}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-blue-600 transition-colors">
                    {isAr ? step.title : step.titleEn}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {isAr ? step.description : step.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Sham360 Business Directory (Ecosystem section) */}
      <section className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden rounded-[40px] mx-4 sm:mx-8 md:mx-12 my-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className={`lg:col-span-7 space-y-6 ${isAr ? "text-right" : "text-left"}`}>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-xs font-semibold">
                <span>{isAr ? "أكثر من مجرد تطوير حضور" : "More Than Just Digital Presence"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {isAr ? (
                  <>
                    أنت تنضم إلى <br />
                    <span className="text-blue-400">منظومة Sham360 المتكاملة للأعمال</span>
                  </>
                ) : (
                  <>
                    You are Joining the <br />
                    <span className="text-blue-400">Sham360 Integrated Ecosystem</span>
                  </>
                )}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {isAr 
                  ? "عندما تبني حضورك الرقمي معنا، لا ينتهي دورنا فور تسليم العمل. بل يحصل شركاؤنا على مميزات حصرية مجانية غير متوفرة في أي مكان لتسويق وترويج مشاريعهم."
                  : "When you establish your digital presence with us, our work doesn't stop at delivery. Partners receive exclusive promotional perks to market their brand."}
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 group">
                  <div className="relative w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                    <div className="absolute inset-0.5 rounded-[12px] border-2 border-transparent border-t-blue-500 border-r-cyan-400 border-b-indigo-500 border-l-amber-400 opacity-70 group-hover:rotate-12 transition-all duration-500" />
                    <Bookmark className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {isAr ? "دليل Sham360 للأعمال التجارية الفاخرة" : "Sham360 Premium Business Directory"}
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      {isAr 
                        ? "ستحصل على إدراج مباشر وحصري في دليلنا التفاعلي القادم لتوجيه آلاف الباحثين عن أفضل الخدمات في سوريا إليك مباشرة."
                        : "Gain direct featured placement in our upcoming interactive directory, guiding thousands searching for top services straight to you."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="relative w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                    <div className="absolute inset-0.5 rounded-[12px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-400 opacity-70 group-hover:rotate-12 transition-all duration-500" />
                    <Share2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {isAr ? "دعم ترويجي ونشر مستمر عبر منصاتنا" : "Cross-Platform Promotional Support"}
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      {isAr 
                        ? "نشارك جولاتك الافتراضية وموقعك الجديد مع جمهورنا وشبكتنا عبر قنوات التواصل الاجتماعي لزيادة الوعي الأولي بمشروعك مجاناً."
                        : "We feature your 360° virtual tours and website with our community across social networks to boost your brand reach."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl relative">
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  {isAr ? "قريباً جداً | COMING SOON" : "COMING SOON"}
                </div>

                <div className="text-center space-y-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mx-auto mb-4 group">
                    <div className="absolute inset-0.5 rounded-[13px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-400 opacity-80 group-hover:rotate-12 transition-all duration-500" />
                    <Globe className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? "دليل Sham360 للأعمال" : "Sham360 Business Directory"}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {isAr 
                      ? "المنصة التفاعلية الأكبر في دمشق والمحافظات السورية لاستعراض الأنشطة والعيادات والمحلات التي تمتلك حضوراً رقمياً حقيقياً وموثوقاً."
                      : "The premier interactive business directory in Damascus and Syrian governorates showcasing verified local brands."}
                  </p>

                  <div className={`pt-6 border-t border-slate-800 space-y-3 ${isAr ? "text-right" : "text-left"}`}>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{isAr ? "الربط التلقائي بخرائط جوجل" : "Google Maps Integration"}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {isAr ? "جاهز" : "Ready"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{isAr ? "عرض الجولة الافتراضية 360°" : "8K 360° Virtual Tour Player"}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {isAr ? "جاهز" : "Ready"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{isAr ? "الربط المباشر بواتساب والموقع" : "Direct WhatsApp & Web Routing"}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {isAr ? "جاهز" : "Ready"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleOpenModal}
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-2xl text-xs transition-all cursor-pointer"
                    >
                      {isAr ? "كن أول المسجلين بالدليل" : "Be the First to Register"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {isAr ? "معرض أعمالنا" : "Our Showcase"}
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              {isAr ? "قصص نجاح رقمية من واقع السوق السوري" : "Proven Digital Success Stories in Syria"}
            </p>
            <p className="text-base text-slate-500">
              {isAr 
                ? "نفخر ببناء حضور رقمي مستدام ومربح لأكثر من 120 شريكاً. تصفح نماذج من الجودة التي ستحصل عليها مع Sham360."
                : "Proudly crafting high-converting digital footprints for over 120 partners across Syria. Explore examples of Sham360 quality."}
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              {[
                { id: "all", label: isAr ? "الكل" : "All" },
                { id: "google", label: isAr ? "خرائط جوجل" : "Google Maps" },
                { id: "websites", label: isAr ? "مواقع إلكترونية" : "Websites" },
                { id: "tours", label: isAr ? "جولات 360°" : "360° Tours" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPortfolioFilter(tab.id as any)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    portfolioFilter === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden group">
                    <img
                      src={item.imageUrl}
                      alt={isAr ? item.title : item.titleEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category badge */}
                    <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-lg flex items-center gap-1">
                      {item.category === "tours" && <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />}
                      {isAr ? item.categoryLabel : item.categoryLabelEn}
                    </span>

                    {/* 360° Virtual Tour UI Overlay for Tours */}
                    {item.category === "tours" && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />
                        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/90 text-slate-950 text-[10px] font-black shadow-lg backdrop-blur-sm dir-ltr">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                            360° VIRTUAL TOUR
                          </span>
                          <span className="text-[10px] font-bold text-white/90 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                            {isAr ? "بدقة 8K فائقة" : "Ultra 8K Clarity"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={`p-6 flex flex-col justify-between flex-grow ${isAr ? "text-right" : "text-left"}`}>
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 mb-2">{isAr ? item.title : item.titleEn}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{isAr ? item.description : item.descriptionEn}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{isAr ? item.metric : item.metricEn}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{isAr ? item.location : item.locationEn}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {isAr ? "قالوا عنا" : "Client Reviews"}
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              {isAr ? "شهادات نعتز بها من واقع التجربة والنتائج السورية" : "Endorsements Born from Real Results & Partnership"}
            </p>
            <p className="text-base text-slate-500">
              {isAr 
                ? "لا نطلق الوعود فحسب، بل نلتزم بتحقيق نتائج ملموسة يشعر بها الشركاء في مبيعاتهم وتواصل زبائنهم."
                : "We deliver measurable impact that founders and business managers experience directly in their growth."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex text-amber-400 gap-0.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className={`text-sm text-slate-700 leading-relaxed mb-6 italic ${isAr ? "text-right" : "text-left"}`}>
                    &quot;{isAr ? testimonial.text : testimonial.textEn}&quot;
                  </p>
                </div>

                <div className={`flex items-center gap-3 pt-4 border-t border-slate-100 ${isAr ? "justify-end" : "justify-start flex-row-reverse"}`}>
                  <div className={isAr ? "text-right" : "text-left"}>
                    <h4 className="text-xs font-bold text-slate-950">{isAr ? testimonial.name : testimonial.nameEn}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{isAr ? testimonial.role : testimonial.roleEn}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${testimonial.colorClass}`}>
                    {testimonial.avatarInitial}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sham360 Interactive Business Guide Section */}
      <Sham360BusinessGuide lang={lang} />

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              {isAr ? "كل ما تود معرفته عن خدمات الحضور الرقمي" : "Everything You Need to Know About Digital Presence"}
            </p>
            <p className="text-base text-slate-500">
              {isAr 
                ? "أجوبة مباشرة لأبرز الأسئلة المتكررة من أصحاب الأعمال حول خدمات وحلول Sham360."
                : "Clear, direct answers to common queries regarding Sham360 digital solutions."}
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-100 rounded-2xl bg-slate-50/20 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className={`w-full flex items-center justify-between p-6 ${isAr ? "text-right" : "text-left"} focus:outline-none cursor-pointer`}
                  >
                    <span className="font-bold text-slate-950 text-sm sm:text-base">
                      {isAr ? faq.question : faq.questionEn}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 mx-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mx-2" />
                    )}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`px-6 pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50/50 pt-4 ${isAr ? "text-right" : "text-left"}`}>
                          {isAr ? faq.answer : faq.answerEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-slate-50 border-t border-slate-100 overflow-hidden rounded-t-[40px]">
        <div className="absolute -top-40 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-tight">
            {isAr ? "ابدأ ببناء حضورك الرقمي الفاخر اليوم" : "Elevate Your Digital Brand Presence Today"}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? "لا تدع منافسيك يستحوذون على عملاء المستقبل. احصل الآن على التقييم الرقمي الفوري مجاناً لعملك وسرع من وتيرة نمو علامتك التجارية."
              : "Claim your verified presence on Google Maps and launch a high-converting website. Get a free instant digital audit now."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleOpenModal}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              {isAr ? "احصل على تقييم مجاني لعملك" : "Get Free Business Audit"}
            </button>
            <a
              href="https://wa.me/963992250223"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-full text-base font-semibold shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <span>{isAr ? "تواصل فوراً عبر واتساب" : "Contact via WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800 ${isAr ? "text-right" : "text-left"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Col 1: Brand details */}
            <div className="space-y-6">
              <Logo light={true} iconSize={44} isAr={isAr} />
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {isAr 
                  ? "نحن في Sham360 نكرس جهودنا وخبراتنا لبناء حضور رقمي استثنائي للشركات والمؤسسات والأنشطة التجارية في سوريا، لنساعدكم على الازدهار والتفوق في الفضاء الرقمي."
                  : "At Sham360, we craft premium digital presence, Google Maps verification, and interactive web tools to empower businesses across Syria."}
              </p>
            </div>

            {/* Col 2: Services links */}
            <div className="space-y-4">
              <h3 className={`text-sm font-bold text-white tracking-wider ${isAr ? "border-r-2 pr-3" : "border-l-2 pl-3"} border-blue-600`}>
                {isAr ? "خدماتنا" : "Our Services"}
              </h3>
              <ul className="space-y-2.5 text-slate-400 text-xs sm:text-sm">
                <li><a href="#services" className="hover:text-white transition-colors">{isAr ? "تفعيل خرائط جوجل المعتمدة" : "Google Maps Verification"}</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">{isAr ? "تصميم المواقع الفاخرة المخصصة" : "Custom Web Design & Development"}</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">{isAr ? "جولات افتراضية تفاعلية 360°" : "Interactive 8K 360° Tours"}</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">{isAr ? "تصوير فوتوغرافي وفيديو احترافي" : "Commercial Photography"}</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">{isAr ? "بطاقات NFC وحلول التقييم الذكي" : "Smart NFC Review Cards & Kits"}</a></li>
              </ul>
            </div>

            {/* Col 3: Navigation links */}
            <div className="space-y-4">
              <h3 className={`text-sm font-bold text-white tracking-wider ${isAr ? "border-r-2 pr-3" : "border-l-2 pl-3"} border-blue-600`}>
                {isAr ? "الشركة" : "Company"}
              </h3>
              <ul className="space-y-2.5 text-slate-400 text-xs sm:text-sm">
                <li><a href="#why-us" className="hover:text-white transition-colors">{isAr ? "لماذا نحن" : "Why Choose Us"}</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">{isAr ? "معرض الأعمال والشركاء" : "Showcase & Partners"}</a></li>
                <li><a href="#business-guide" className="hover:text-white transition-colors">{isAr ? "دليل شام 360 للأعمال" : "Sham360 Business Guide"}</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">{isAr ? "خطوات وآليات العمل" : "Workflow & Process"}</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">{isAr ? "الأسئلة الشائعة والتحقق" : "FAQ & Verification"}</a></li>
                <li>
                  <button onClick={handleOpenModal} className={`hover:text-white text-blue-400 font-bold ${isAr ? "text-right" : "text-left"} transition-colors cursor-pointer`}>
                    {isAr ? "اطلب فحصاً رقمياً مجاناً" : "Request Free Digital Audit"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact details & Social Profiles */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className={`text-sm font-bold text-white tracking-wider ${isAr ? "border-r-2 pr-3" : "border-l-2 pl-3"} border-blue-600`}>
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </h3>
                <ul className="space-y-2.5 text-slate-400 text-xs sm:text-sm font-en">
                  <li className={`flex items-center gap-2 ${isAr ? "justify-end" : "justify-start"}`}>
                    <a href="mailto:admin@Sham360.online" className="font-sans text-xs hover:text-blue-500 transition-colors">admin@Sham360.online</a>
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                  </li>
                  <li className={`flex items-center gap-2 ${isAr ? "justify-end" : "justify-start"}`}>
                    <a href="https://wa.me/963992250223" target="_blank" rel="noreferrer" dir="ltr" className="inline-block font-sans text-xs hover:text-blue-500 transition-colors">+963 992 250 223</a>
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                  </li>
                  <li className={`flex items-center gap-2 ${isAr ? "justify-end" : "justify-start"}`}>
                    <span className="font-sans text-xs">{isAr ? "دمشق، سوريا - الحلبوني" : "Damascus, Syria - Al-Halbouni"}</span>
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  </li>
                </ul>
              </div>

              {/* Connected Social & Business Profiles */}
              <div className="space-y-3 pt-2">
                <h4 className={`text-xs font-bold text-slate-300 ${isAr ? "border-r-2 pr-2" : "border-l-2 pl-2"} border-slate-700`}>
                  {isAr ? "منصاتنا وتواجدنا الرقمي" : "Digital Channels"}
                </h4>
                <div className={`flex flex-wrap gap-2 ${isAr ? "justify-end" : "justify-start"}`}>
                  
                  {/* Google Profile Map link */}
                  <a 
                    href="https://maps.google.com/?q=Sham360+دمشق" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-950/20 transition-all duration-300"
                    title="Google Maps Profile"
                  >
                    <MapPin className="w-4 h-4 fill-blue-500/10" />
                  </a>

                  {/* Business Web */}
                  <a 
                    href="https://sham360.online" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500/30 hover:bg-indigo-950/20 transition-all duration-300"
                    title="Official Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://facebook.com/sham360.online" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600/30 hover:bg-blue-950/20 transition-all duration-300"
                    title="Facebook Page"
                  >
                    <Facebook className="w-4 h-4 fill-blue-500/10" />
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/sham360.online" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-950/20 transition-all duration-300"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/company/sham360" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition-all duration-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4 fill-cyan-500/10" />
                  </a>

                  {/* YouTube */}
                  <a 
                    href="https://youtube.com/@sham360.online" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-950/20 transition-all duration-300"
                    title="YouTube Channel"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>

                </div>
              </div>
            </div>

          </div>

          {/* Copyright block */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 Sham360. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="hover:text-white cursor-pointer">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</span>
              <span className="hover:text-white cursor-pointer">{isAr ? "شروط الاستخدام والخدمة" : "Terms of Service"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Multi-Step Interactive Assessment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="assessment-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {/* Backdrop blur */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Centering wrapper */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6">
              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className={`bg-white rounded-3xl ${isAr ? "text-right" : "text-left"} overflow-hidden shadow-2xl transform transition-all max-w-lg w-full relative z-10 my-4 sm:my-8 flex flex-col max-h-[90vh] md:max-h-[85vh]`}
              >
                {/* Header */}
                <div className="bg-gradient-to-l from-blue-600 to-indigo-600 px-6 py-6 text-white relative flex-shrink-0">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={`absolute top-4 ${isAr ? "left-4" : "right-4"} text-white/80 hover:text-white focus:outline-none transition-colors cursor-pointer`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-bold">
                    {isAr ? "احصل على فحص حضورك الرقمي" : "Get Your Free Digital Presence Audit"}
                  </h3>
                  <p className="text-xs text-blue-100 mt-1">
                    {isAr 
                      ? "أجب عن أسئلة بسيطة، وسيقوم مستشارنا الذكي بتحليل وتدقيق مشروعك وتجهيز تقرير كامل فوراً."
                      : "Answer a few quick questions to receive an instant customized growth report."}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="px-6 pt-6 flex-shrink-0">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full relative overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${(wizardStep / 6) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Wizard Steps */}
                <div className="px-6 py-8 overflow-y-auto flex-1 text-right">
                  
                  {/* Step 1: Business type selection */}
                  {wizardStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block text-sm font-bold text-slate-900">
                        ١. ما هو تخصص أو مجال عملك التجاري؟
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "مطعم / كافيه", label: "مطعم / كافيه", icon: <Utensils className="w-4 h-4" /> },
                          { id: "عيادة طبية", label: "عيادة طبية", icon: <Building className="w-4 h-4" /> },
                          { id: "محل / معرض تجاري", label: "محل / معرض تجاري", icon: <Store className="w-4 h-4" /> },
                          { id: "شركة تجارية أو خدمية", label: "شركة تجارية / خدمية", icon: <Building className="w-4 h-4" /> }
                        ].map((option) => {
                          const isSelected = bizType === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setBizType(option.id)}
                              className={`p-4 rounded-2xl text-xs font-semibold text-right transition-all flex items-center justify-between border cursor-pointer ${
                                isSelected
                                  ? "border-blue-600 bg-blue-50/50 text-blue-950 shadow-sm"
                                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 text-slate-700"
                              }`}
                            >
                              <span>{option.label}</span>
                              <div className={isSelected ? "text-blue-600" : "text-slate-400"}>
                                {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : option.icon}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          disabled={!bizType}
                          onClick={() => setWizardStep(2)}
                          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            bizType
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/15"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <span>المتابعة</span>
                          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Digital status */}
                  {wizardStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block text-sm font-bold text-slate-900">
                        ٢. ما هي حالة حضورك الرقمي الحالية؟
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: "نعم، أملك خريطة وموقع ولكن بحاجة لتحسين مظهر وظهور", label: "أملك خريطة وموقعاً ولكن المظهر والظهور بحاجة لتحسين" },
                          { id: "أملك خريطة فقط ولا أملك موقعاً إلكترونياً", label: "أملك خريطة جوجل فقط، ولا أملك موقعاً إلكترونياً" },
                          { id: "لا أملك أي حضور رقمي رسمي حتى الآن", label: "لا أملك أي حضور رقمي رسمي حتى الآن" }
                        ].map((status) => {
                          const isSelected = digitalStatus === status.id;
                          return (
                            <button
                              key={status.id}
                              type="button"
                              onClick={() => setDigitalStatus(status.id)}
                              className={`w-full p-4 rounded-2xl text-xs font-semibold text-right transition-all flex items-center justify-between border cursor-pointer ${
                                isSelected
                                  ? "border-blue-600 bg-blue-50/50 text-blue-950 shadow-sm"
                                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 text-slate-700"
                              }`}
                            >
                              <span>{status.label}</span>
                              <div className={isSelected ? "text-blue-600" : "text-slate-400"}>
                                {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          السابق
                        </button>
                        <button
                          type="button"
                          disabled={!digitalStatus}
                          onClick={() => setWizardStep(3)}
                          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            digitalStatus
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/15"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <span>المتابعة</span>
                          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Priority Goal */}
                  {wizardStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block text-sm font-bold text-slate-900">
                        ٣. ما هو هدفك الأساسي الذي تركز عليه حالياً؟
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: "زيادة العملاء والاتصالات والزيارات المباشرة للمقر", label: "جذب المزيد من العملاء، الاتصالات، والزيارات للمقر" },
                          { id: "توثيق رسمي وحماية الخرائط من البلاغات والمنافسين", label: "توثيق رسمي وتأمين الخريطة وحمايتها من الإغلاق" },
                          { id: "تصميم موقع الكتروني فاخر وتصوير جولة 360 درجة", label: "تصميم موقع إلكتروني فاخر وتصوير المقر جولة 360°" }
                        ].map((goal) => {
                          const isSelected = bizGoal === goal.id;
                          return (
                            <button
                              key={goal.id}
                              type="button"
                              onClick={() => setBizGoal(goal.id)}
                              className={`w-full p-4 rounded-2xl text-xs font-semibold text-right transition-all flex items-center justify-between border cursor-pointer ${
                                isSelected
                                  ? "border-blue-600 bg-blue-50/50 text-blue-950 shadow-sm"
                                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 text-slate-700"
                              }`}
                            >
                              <span>{goal.label}</span>
                              <div className={isSelected ? "text-blue-600" : "text-slate-400"}>
                                {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          السابق
                        </button>
                        <button
                          type="button"
                          disabled={!bizGoal}
                          onClick={() => setWizardStep(4)}
                          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            bizGoal
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/15"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <span>المتابعة</span>
                          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Contact details form */}
                  {wizardStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <label className="block text-sm font-bold text-slate-900">
                        ٤. أدخل تفاصيل عملك التجاري للتسليم
                      </label>
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">اسم العمل التجاري / المقر</label>
                          <input
                            type="text"
                            value={bizName}
                            onChange={(e) => setBizName(e.target.value)}
                            placeholder="مثال: مطعم شاورما الشام"
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 text-right"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">المدينة / المقر والفرع الرئيسي</label>
                          <input
                            type="text"
                            value={bizCity}
                            onChange={(e) => setBizCity(e.target.value)}
                            placeholder="مثال: دمشق - المزة"
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 text-right"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">رقم واتساب للتواصل والتقرير</label>
                          <input
                            type="tel"
                            value={bizPhone}
                            onChange={(e) => setBizPhone(e.target.value)}
                            placeholder="مثال: 0992250223"
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 text-right"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          onClick={handleSubmitAssessment}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl text-sm shadow-md transition-all cursor-pointer"
                        >
                          إرسال وطلب التدقيق مجاناً
                        </button>
                        <button
                          onClick={() => setWizardStep(3)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all cursor-pointer"
                        >
                          السابق
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: AI Audit Analyzer Load state */}
                  {wizardStep === 5 && (
                    <div className="text-center py-10 space-y-6">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-24 h-24 bg-blue-100 rounded-full animate-ping opacity-50" />
                        <div className="relative w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <Brain className="w-7 h-7 animate-bounce" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-lg font-black text-slate-900">محلل الذكاء الاصطناعي يقوم بالفحص الفوري...</h4>
                        <p className="text-xs text-slate-500 min-h-[1.5rem]">{auditStatusText}</p>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Success & Interactive Digital Report Card */}
                  {wizardStep === 6 && auditResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 justify-end">
                        <div className="text-right">
                          <h4 className="text-base font-bold text-slate-950">تقرير تدقيق الحضور الرقمي الفوري</h4>
                          <p className="text-[10px] text-slate-400">تم التوليد فوراً بمستشار Sham360 AI والذكاء الاصطناعي</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
                          <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                      </div>

                      {/* Main Dynamic score */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        
                        <div className="sm:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center space-y-1">
                          <span className="text-xs font-semibold text-slate-400">مستوى حضورك الرقمي</span>
                          <div className="relative flex items-center justify-center my-1.5">
                            <div className="text-3xl font-black text-blue-600 font-en flex items-baseline justify-center">
                              <span>{auditResult.score}</span>
                              <span className="text-xs font-normal text-slate-400">/100</span>
                            </div>
                          </div>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            auditResult.score < 55
                              ? "bg-rose-100 text-rose-700"
                              : auditResult.score < 75
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {auditResult.score < 55 ? "فجوة حرجة" : auditResult.score < 75 ? "بحاجة لتحسين" : "جيد جداً"}
                          </span>
                        </div>

                        <div className="sm:col-span-8 space-y-1 text-right">
                          <span className="text-[10px] font-bold text-blue-600 uppercase">التقييم العام للمنافسة</span>
                          <p className="text-xs text-slate-600 leading-relaxed max-h-[100px] overflow-y-auto pr-1">
                            {auditResult.analysis}
                          </p>
                        </div>
                      </div>

                      {/* Keywords & Actions Accordion */}
                      <div className="space-y-4 text-right">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>الخطوات الفورية المقترحة للتفوق:</span>
                          </span>
                          <ul className="space-y-2 text-xs text-slate-600 pl-0 list-none">
                            {auditResult.action_steps.map((stepText, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[9px] mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{stepText}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>كلمات مفتاحية مستهدفة لـ {bizCity}:</span>
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {auditResult.keywords.map((kw, idx) => (
                              <span
                                key={idx}
                                onClick={() => handleCopyText(kw, `audit-kw-${idx}`)}
                                className="text-[10px] font-semibold bg-slate-50 hover:bg-blue-50 border border-slate-200/60 text-slate-600 px-2.5 py-1 rounded-lg hover:border-blue-500/30 cursor-pointer transition-colors flex items-center gap-1"
                              >
                                <span>{kw}</span>
                                {copiedKeyword === `audit-kw-${idx}` ? (
                                  <span className="text-[8px] text-emerald-600">تم!</span>
                                ) : (
                                  <Copy className="w-2.5 h-2.5 opacity-50" />
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs flex-shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <p className="text-[11px] text-slate-800 leading-normal">
                          الخدمة المقترحة لك: <strong className="text-blue-600">{auditResult.recommended_service}</strong>. تم نسخ هذا التقرير التكتيكي لكي تناقشه فوراً مع مهندسينا لحجز دورك.
                        </p>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`https://wa.me/963992250223?text=${encodeURIComponent(
                            `مرحباً Sham360، قمت بإجراء تدقيق رقمي لمشروعي عبر الذكاء الاصطناعي:
- اسم العمل: ${bizName}
- المدينة: ${bizCity}
- رقم واتساب: ${bizPhone}
- تخصص المجال: ${bizType}
- مستوى الحضور: ${auditResult.score}/100
- التوصية المقترحة: ${auditResult.recommended_service}
- الخطوات المقترحة: ${auditResult.action_steps.join(" | ")}

أود حجز استشارة مجانية مع مهندسيكم لبحث خطة التنفيذ الفعلي على أرض الواقع.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all cursor-pointer text-center"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>ناقش التقرير مجاناً عبر واتساب</span>
                        </a>
                      </div>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 group" dir="ltr">
        <a
          href="https://wa.me/963992250223"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.397 9.797-9.798.001-2.615-1.012-5.074-2.855-6.918-1.843-1.843-4.296-2.857-6.914-2.858-5.4 0-9.793 4.393-9.796 9.795-.001 1.547.41 3.051 1.193 4.356l-.992 3.62 3.714-.974zm11.005-5.112c-.272-.136-1.614-.796-1.863-.887-.25-.09-.43-.136-.61.136-.18.272-.7.887-.858 1.069-.16.182-.318.204-.59.068-.272-.136-1.15-.424-2.19-1.353-.81-.723-1.356-1.617-1.515-1.888-.16-.272-.017-.42.119-.555.123-.121.272-.318.41-.476.137-.159.182-.272.272-.453.09-.181.045-.34-.022-.476-.068-.136-.61-1.474-.836-2.018-.22-.53-.442-.458-.61-.466-.157-.008-.338-.01-.52-.01-.18 0-.476.068-.724.34-.249.272-.95.93-.95 2.268 0 1.338.974 2.628 1.11 2.81 1.4 1.92 3.2 2.72 5.2 3.52.4.16.8.16 1.1.08.3-.08.9-.38 1.1-.7.2-.32.2-.6.1-.7-.1-.1-.3-.2-.5-.3z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-bold text-sm whitespace-nowrap hidden sm:inline-block pr-1 pl-1">
            راسلنا الآن
          </span>
        </a>
      </div>

    </div>
  );
}
