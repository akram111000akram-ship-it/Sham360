import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sham360Calculator } from "./Sham360Calculator";
import {
  CheckCircle2,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Compass,
  HelpCircle,
  Copy,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Check
} from "lucide-react";

// Types for the Guide
interface KeywordMap {
  titleAr: string;
  titleEn: string;
  primaryCategory: string;
  primaryCategoryEn: string;
  secondaryCategories: string[];
  secondaryCategoriesEn: string[];
  keywords: string[];
  keywordsEn: string[];
  tips: string;
  tipsEn: string;
}

const SYRIAN_GUIDE_INDUSTRIES: Record<string, KeywordMap> = {
  "مطاعم ومقاهي": {
    titleAr: "مطاعم ومقاهي",
    titleEn: "Restaurants & Cafes",
    primaryCategory: "مطعم (Restaurant)",
    primaryCategoryEn: "Restaurant",
    secondaryCategories: ["مقهى (Cafe)", "مطعم وجبات سريعة", "شاورما الشام (Syrian Shawarma)"],
    secondaryCategoriesEn: ["Cafe", "Fast Food", "Damascene Shawarma"],
    keywords: ["أفضل مطعم شاورما في دمشق", "كافيه راقي المزة", "مطاعم عائلية أبو رمانة", "مطعم مشاوي قريب مني", "منيو فطور بلدي الشعلان"],
    keywordsEn: ["Best Shawarma in Damascus", "Luxury Cafe Mazzeh", "Family Restaurants Abou Roumaneh", "Grill Restaurant Near Me", "Traditional Breakfast Shaghour"],
    tips: "احرص على رفع صور حية عالية الوضوح لقائمة الطعام (المنيو)، وصور اللوحة الخارجية للمطعم بدقة عالية لتسريع التوثيق التلقائي.",
    tipsEn: "Upload high-res photos of your menu and exterior storefront signage to accelerate automatic Google Maps verification."
  },
  "مراكز طبية وعيادات": {
    titleAr: "مراكز طبية وعيادات",
    titleEn: "Medical Centers & Clinics",
    primaryCategory: "عيادة طبية (Medical Clinic)",
    primaryCategoryEn: "Medical Clinic",
    secondaryCategories: ["طبيب أسنان", "مركز تجميل وعناية بالبشرة", "طبيب أطفال دمشق"],
    secondaryCategoriesEn: ["Dentist", "Aesthetic & Skincare Center", "Pediatrician Damascus"],
    keywords: ["أفضل طبيب أسنان المزة", "عيادة جلدية وتجميل دمشق", "مستشفى تخصصي قريب مني", "دكتور عيون ممتاز حلب"],
    keywordsEn: ["Best Dentist Mazzeh", "Dermatology Clinic Damascus", "Specialized Hospital Near Me", "Top Ophthalmologist Aleppo"],
    tips: "يُفضل إدراج أوقات الدوام الدقيقة لكل طبيب بشكل منفصل، مع توفير ميزة الحجز المباشر عبر زر الاتصال أو واتساب الموثق.",
    tipsEn: "Specify accurate consultation hours for each doctor and link direct click-to-call or WhatsApp appointment routing."
  },
  "مكاتب عقارية ومقاولات": {
    titleAr: "مكاتب عقارية ومقاولات",
    titleEn: "Real Estate & Contracting",
    primaryCategory: "وكالة عقارية (Real Estate Agency)",
    primaryCategoryEn: "Real Estate Agency",
    secondaryCategories: ["مطور عقاري", "شقق للايجار دمشق", "شركة بناء ومقاولات"],
    secondaryCategoriesEn: ["Property Developer", "Apartments for Rent Damascus", "Construction & Contracting"],
    keywords: ["شقق للبيع في المزة دمشق", "مكتب عقاري يعفور", "أراضي للبيع ريف دمشق", "عقارات للايجار مشروع دمر"],
    keywordsEn: ["Apartments for Sale Mazzeh", "Real Estate Office Yaafour", "Land for Sale Rural Damascus", "Properties for Rent Dummar"],
    tips: "الصور العقارية هي عصب هذا التخصص. احرص على دمج جولة افتراضية 360° لرفع تفاعل الزائرين وثقتهم بمصداقية العروض.",
    tipsEn: "Property imagery is critical. Embed an 8K 360° virtual tour to increase visitor time and booking confidence."
  },
  "فنادق وأماكن إقامة": {
    titleAr: "فنادق وأماكن إقامة",
    titleEn: "Hotels & Accommodations",
    primaryCategory: "فندق (Hotel)",
    primaryCategoryEn: "Hotel",
    secondaryCategories: ["شقق فندقية مفروشة", "منتجع سياحي", "نزل تراثي دمشق القديمة"],
    secondaryCategoriesEn: ["Serviced Apartments", "Beach Resort", "Heritage Boutique Hotel"],
    keywords: ["أفضل فنادق دمشق القديمة", "شقق فندقية المزة اتستراد", "فندق 5 نجوم دمشق", "حجز منتجع اللاذقية"],
    keywordsEn: ["Best Hotels Old Damascus", "Hotel Apartments Mazzeh", "5 Star Hotel Damascus", "Resort Booking Latakia"],
    tips: "خرائط Google توفر ميزات عرض تفاصيل الغرف والخدمات المتاحة للفنادق. تأكد من تفعيل جولة 360° للغرف والبهو الرئيسي لتصدّر نتائج البحث المحلية.",
    tipsEn: "Enable 360° walk-throughs of suites and lobby areas to top local organic hotel search results."
  },
  "محلات تجارية ومعارض": {
    titleAr: "محلات تجارية ومعارض",
    titleEn: "Retail & Showrooms",
    primaryCategory: "محل تجاري (Retail Store)",
    primaryCategoryEn: "Retail Store",
    secondaryCategories: ["معرض ألبسة", "محل إلكترونيات وأجهزة ذكية", "سوبرماركت / بقالة"],
    secondaryCategoriesEn: ["Clothing Showroom", "Electronics & Smart Devices", "Supermarket / Grocery"],
    keywords: ["محل ألبسة نسائية الشعلان", "أجهزة كهربائية بالتقسيط دمشق", "محل جوالات المزة", "سوبرماركت توصيل منزلي"],
    keywordsEn: ["Womenswear Shaalan", "Home Appliances Damascus", "Mobile Phone Store Mazzeh", "Supermarket Home Delivery"],
    tips: "قم بتفعيل ميزة الرسائل المباشرة في خريطتك لتستقبل استفسارات الزبائن حول توفر المنتجات والمواصفات بشكل فوري.",
    tipsEn: "Activate instant messaging on your map profile to answer direct customer product and specification inquiries."
  }
};

const SYRIAN_VERIFICATION_ISSUES = [
  {
    id: "postcard",
    title: "مشكلة عدم وصول الرمز البريدي (Postcard) إلى سوريا",
    desc: "نظراً لظروف الاتصالات البريدية الدولية، يتعذر على معظم الأنشطة السورية استلام الكود الورقي عبر البريد.",
    solution: "نعتمد كشريك محلي معتمد لـ Sham360 على طرق بديلة رسمية مثل: إثبات الملكية عبر تصوير فيديو حي للمقر الخارجي واللوحة والترخيص التجاري، أو من خلال أدوات التوثيق الفوري التي نوفرها للأعمال السورية دون انتظار البريد."
  },
  {
    id: "vpn-ip",
    title: "مشاكل الاتصال والـ VPN أثناء إدارة الخريطة",
    desc: "استخدام بعض شبكات الـ VPN العشوائية قد يعرض حسابك على Google للإغلاق أو يضع الخريطة في حالة معلقة (Suspended).",
    solution: "نوصي بإنشاء خريطة مخصصة وإدارتها باستخدام خادم محلي مستقر أو الاستعانة بفريقنا لإعداد حساب مدير معتمد (Certified Manager) يضمن حماية خريطتك من أي تقييد جغرافي."
  },
  {
    id: "competitor-flags",
    title: "مواجهة بلاغات المنافسين الكاذبة وتعديل البيانات",
    desc: "يقوم بعض المنافسين بإرسال بلاغات تفيد بإغلاق محلك أو تغيير موقعه لتقليل ظهورك الرقمي.",
    solution: "نقدم خدمة درع الحماية والدعم الفني المستمر. نربط خريطتك بسجلات رسمية موثقة تجعل خوارزميات Google ترفض التعديلات الخارجية العشوائية تلقائياً وتنبهنا فوراً بأي بلاغ."
  }
];

export function Sham360BusinessGuide({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const isAr = lang === "ar";

  // 1. Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, textAr: "توثيق ملكية الخريطة بايميل رسمي ومؤمن", textEn: "Verify Google Maps ownership with secure official email", checked: true },
    { id: 2, textAr: "إضافة جولة افتراضية تفاعلية 360° لداخل المقر", textEn: "Embed interactive 8K 360° virtual tour of venue interior", checked: false },
    { id: 3, textAr: "صياغة وصف احترافي للنشاط يحتوي كلمات مفتاحية محلية", textEn: "Write SEO business description with high-converting local keywords", checked: true },
    { id: 4, textAr: "تنسيق وتحديث أوقات العمل بدقة (بما فيها العطل والأعياد)", textEn: "Set precise business hours, holiday schedules & contact channels", checked: false },
    { id: 5, textAr: "تصوير واجهة المقر الحقيقية مع لوحة المحل بوضوح", textEn: "Upload high-res real exterior photos featuring storefront signage", checked: true },
    { id: 6, textAr: "تفعيل قنوات الاتصال المباشرة ورقم واتساب السوري الموثق", textEn: "Enable direct WhatsApp business links and click-to-call buttons", checked: false },
    { id: 7, textAr: "جمع وتنشيط 5 تقييمات إيجابية حقيقية على الأقل شهرياً", textEn: "Collect at least 5 authentic positive customer reviews monthly", checked: false },
  ]);

  // Compute Checklist score
  const checkedCount = checklist.filter(item => item.checked).length;
  const progressScore = Math.round((checkedCount / checklist.length) * 100);

  // Toggle Checklist item
  const handleToggleCheck = (id: number) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // 2. Keyword Lookup State
  const [selectedIndustry, setSelectedIndustry] = useState<string>("مطاعم ومقاهي");
  const industryData = SYRIAN_GUIDE_INDUSTRIES[selectedIndustry] || SYRIAN_GUIDE_INDUSTRIES["مطاعم ومقاهي"];

  // Copy Keyword helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="business-guide" className={`py-20 md:py-28 bg-slate-50 relative overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
      {/* Aesthetic Background Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-700 text-xs font-black">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isAr ? "حصري للأعمال السورية" : "Exclusive for Syrian Businesses"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            {isAr ? "دليل شام 360 للأعمال (Sham360 Business Guide)" : "Sham360 Local Business Guide"}
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? "بوابتكم المعرفية التفاعلية لتخطي عقبات التوثيق، واختيار أفضل الكلمات المفتاحية الأكثر بحثاً وتأثيراً في السوق السوري المحلي."
              : "Your interactive guide to mastering local SEO ranking, Google Maps verification, and target Syrian search keywords."}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Maps Readiness Score & Checklist (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  {isAr ? "مقياس الجاهزية الرقمية" : "Digital Readiness Score"}
                </h3>
                <p className="text-[10px] text-slate-400">
                  {isAr ? "احسب مستوى قوة حضور خريطتك التفاعلي بنفسك" : "Audit your Google Maps presence in real-time"}
                </p>
              </div>
              <div className="relative flex items-center justify-center">
                {/* Score Widget */}
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-blue-600 font-en">{progressScore}%</span>
                  <span className="text-[8px] font-bold text-blue-500">{isAr ? "جاهزية" : "Readiness"}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar with Gradient */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>
                  {progressScore === 100 
                    ? (isAr ? "مكتمل ومثالي!" : "100% Perfect!") 
                    : progressScore >= 70 
                    ? (isAr ? "قريب من المثالي" : "Almost Ready") 
                    : (isAr ? "يحتاج المزيد من العمل" : "Needs Optimization")}
                </span>
                <span>{isAr ? "النتيجة الحالية" : "Current Score"}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressScore}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 pt-2">
              <span className="block text-xs font-bold text-slate-700 mb-3">
                {isAr ? "قائمة الخطوات الهامة للتصنيف (تفاعلية):" : "Key Ranking Factors Checklist (Interactive):"}
              </span>
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    item.checked 
                      ? "bg-slate-50/50 border-blue-100 text-slate-800" 
                      : "bg-white border-slate-100 hover:border-slate-200 text-slate-400"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                    item.checked ? "bg-blue-600 text-white" : "border border-slate-300"
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-semibold select-none transition-colors ${
                    item.checked ? "text-slate-800" : "text-slate-500"
                  }`}>
                    {isAr ? item.textAr : item.textEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to action in checklist card */}
            <div className="bg-blue-50/40 border border-blue-100/50 p-4 rounded-2xl">
              <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed">
                💡 <strong>{isAr ? "نصيحة دافئة:" : "Pro Tip:"}</strong>{" "}
                {isAr 
                  ? "الحضور المكتمل بنسبة 100% يمنحك تصنيفاً أعلى بـ 3 أضعاف في خوارزميات البحث السريعة لخرائط Google. دع مهندسينا يساعدونك على سد الفجوات اليوم."
                  : "Profiles with 100% completion rank up to 3x higher in Google Maps local search algorithms. Let our engineers close your gaps today."}
              </p>
            </div>
          </div>

          {/* Right Column: Industrial Keyword Mapping & Syrian Verification Guide (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Industrial Categories (Bento Card) */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0">
                    <div className="absolute inset-0.5 rounded-[9px] border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-emerald-500 border-l-amber-500 opacity-70" />
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>{isAr ? "مخطط الكلمات المفتاحية والتصنيفات في سوريا" : "Syrian Keyword & Local Category Planner"}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isAr ? "اختر تخصصك لتكتشف التصنيفات والكلمات الأكثر طلباً في السوق السوري" : "Select your business sector to discover top Syrian search queries"}
                </p>
              </div>

              {/* Industry Selection Pill Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(SYRIAN_GUIDE_INDUSTRIES).map((industryKey) => {
                  const item = SYRIAN_GUIDE_INDUSTRIES[industryKey];
                  return (
                    <button
                      key={industryKey}
                      onClick={() => setSelectedIndustry(industryKey)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        selectedIndustry === industryKey
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100/80"
                      }`}
                    >
                      {isAr ? item.titleAr : item.titleEn}
                    </button>
                  );
                })}
              </div>

              {/* Detail Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndustry}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Official Category */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-[10px] font-bold text-blue-600 tracking-wider block">
                        {isAr ? "التصنيف الأساسي والثانوي في Google" : "Primary & Secondary Google Category"}
                      </span>
                      <p className="text-sm font-black text-slate-950">
                        {isAr ? industryData.primaryCategory : industryData.primaryCategoryEn}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(isAr ? industryData.secondaryCategories : industryData.secondaryCategoriesEn).map((sec, idx) => (
                          <span key={idx} className="text-[9px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md">
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/30 space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{isAr ? "نصيحة الخبراء للتصدّر" : "Expert Ranking Tip"}</span>
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {isAr ? industryData.tips : industryData.tipsEn}
                      </p>
                    </div>

                  </div>

                  {/* Keywords Box */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-slate-400" />
                      <span>{isAr ? "العبارات الأكثر بحثاً في المدن السورية:" : "Top Searched Queries in Syrian Cities:"}</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(isAr ? industryData.keywords : industryData.keywordsEn).map((kw, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleCopy(kw, `guide-kw-${idx}`)}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/40 hover:border-blue-500/20 cursor-pointer transition-colors group"
                        >
                          <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">{kw}</span>
                          <div className="flex items-center gap-1">
                            {copiedKey === `guide-kw-${idx}` ? (
                              <span className="text-[9px] text-emerald-600 font-bold">{isAr ? "تم نسخها!" : "Copied!"}</span>
                            ) : (
                              <Copy className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Sham360 ROI & Investment Calculator */}
            <Sham360Calculator lang={lang} />

          </div>

        </div>

      </div>
    </section>
  );
}
