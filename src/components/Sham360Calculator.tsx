import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Sparkles, Check, ArrowLeft, MessageCircle, PhoneCall, TrendingUp, Compass, Globe, MapPin, ShieldCheck } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  nameEn: string;
  icon: any;
  basePriceUsd: number;
  description: string;
  descriptionEn: string;
  estimatedGrowth: string;
  estimatedGrowthEn: string;
}

const SERVICES_LIST: ServiceOption[] = [
  {
    id: "maps",
    name: "توثيق وضبط خريطة Google وتحسين الظهور",
    nameEn: "Google Maps Verification & Local SEO",
    icon: MapPin,
    basePriceUsd: 50,
    description: "إعداد ملكية الخريطة، اختيار الكلمات المفتاحية، وتفعيل أوقات العمل والربط بواتساب.",
    descriptionEn: "Map ownership setup, keyword optimization, operating hours, and WhatsApp integration.",
    estimatedGrowth: "+40% زيادة بالاتصالات",
    estimatedGrowthEn: "+40% Direct Calls"
  },
  {
    id: "tour360",
    name: "تصوير جولة افتراضية تفاعلية 360° فوتوغرافية",
    nameEn: "8K Interactive 360° Virtual Tour Photography",
    icon: Compass,
    basePriceUsd: 80,
    description: "تصوير احترافي للصالون الداخلي والخارجي، معالجة HDR، ودمج مباشر على خرائط Google.",
    descriptionEn: "Interior/exterior HDR photography, 360° panorama stitching & Google Street View publish.",
    estimatedGrowth: "+65% ثقة وتفاعل للزوار",
    estimatedGrowthEn: "+65% Visitor Engagement"
  },
  {
    id: "website",
    name: "موقع إلكتروني تعريفي حديث ذكي ثنائي اللغة",
    nameEn: "Modern High-Speed Bilingual Website",
    icon: Globe,
    basePriceUsd: 120,
    description: "تصميم موقع فائق السرعة يعرض خدماتك، كتالوج المنتجات، وربط حجز مباشر عبر واتساب.",
    descriptionEn: "Ultra-fast website showcasing your catalog and services with direct WhatsApp booking.",
    estimatedGrowth: "+80% انطباع احترافي",
    estimatedGrowthEn: "+80% Brand Prestige"
  },
  {
    id: "protection",
    name: "درع حماية الخريطة والدعم الشهري ضد بلاغات المنافسين",
    nameEn: "Map Protection Shield & Monthly Defense",
    icon: ShieldCheck,
    basePriceUsd: 40,
    description: "متابعة دورية، التصدّي للبلاغات الكاذبة، وحماية البيانات من التعديل العشوائي.",
    descriptionEn: "Active monitoring, protection against spam reports, and data lock integrity.",
    estimatedGrowth: "استقرار وضمان 100%",
    estimatedGrowthEn: "100% Stability Guarantee"
  }
];

const BUSINESS_TYPES = [
  { id: "restaurant", name: "مطعم / مقهى", nameEn: "Restaurant / Cafe", multiplier: 1.1, icon: "🍔" },
  { id: "clinic", name: "عيادة / مركز طبي", nameEn: "Medical Clinic / Healthcare", multiplier: 1.2, icon: "🩺" },
  { id: "company", name: "شركة / مكتب تجاري", nameEn: "Corporate Company / Office", multiplier: 1.0, icon: "🏢" },
  { id: "hotel", name: "فندق / صالة مناسبات / عقارات", nameEn: "Hotel / Venue / Real Estate", multiplier: 1.3, icon: "🏨" },
  { id: "retail", name: "محل تجاري / معرض", nameEn: "Retail Store / Showroom", multiplier: 1.0, icon: "🛍️" },
];

export function Sham360Calculator({ lang = "ar" }: { lang?: "ar" | "en" }) {
  const [selectedServices, setSelectedServices] = useState<string[]>(["maps", "tour360"]);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>("restaurant");

  const isAr = lang === "ar";

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev)
        : [...prev, id]
    );
  };

  const currentBusiness = BUSINESS_TYPES.find(b => b.id === selectedBusinessType) || BUSINESS_TYPES[0];

  // Calculations
  const calculatedGrowthPercent = Math.min(
    140,
    selectedServices.length * 28 + (selectedServices.includes("tour360") ? 25 : 0)
  );

  const estimatedDays = selectedServices.length > 2 
    ? (isAr ? "5 - 7 أيام عمل" : "5 - 7 Business Days")
    : (isAr ? "2 - 4 أيام عمل" : "2 - 4 Business Days");

  // Build WhatsApp Message
  const selectedServiceNames = SERVICES_LIST
    .filter(s => selectedServices.includes(s.id))
    .map(s => isAr ? s.name : s.nameEn)
    .join(" + ");

  const waMessage = encodeURIComponent(
    isAr 
      ? `مرحباً Sham360 👋\nأود الاستفسار والحصول على عرض سعر دقيق لمشروعي (${currentBusiness.name}):\n\n📌 الخدمات المختارة: ${selectedServiceNames}\n🎯 النسبة المتوقعة لنمو الحضور: +${calculatedGrowthPercent}%\nيرجى التواصل معي لترتيب استشارة مجانية لموقعي.`
      : `Hello Sham360 👋\nI would like an inquiry & custom estimate for my business (${currentBusiness.nameEn}):\n\n📌 Selected Services: ${selectedServiceNames}\n🎯 Projected Reach Growth: +${calculatedGrowthPercent}%\nPlease contact me to arrange a free audit consultation.`
  );

  return (
    <div className={`bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6 text-slate-900 ${isAr ? "text-right" : "text-left"}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold mb-2">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>{isAr ? "حاسبة التحول الرقمي الذكية" : "Smart Digital Transformation Calculator"}</span>
          </div>
          <h3 className="text-lg font-black text-slate-950">
            {isAr ? "احسب تكلفة وعائد تطوير حضورك الرقمي مع Sham360" : "Calculate Your ROI & Growth with Sham360"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isAr 
              ? "حدد نوع مجالك والخدمات التي تحتاجها لمعرفة النسبة التقديرية لنمو وصولك للزبائن والمدة المتوقعة."
              : "Select your business sector and desired services to calculate projected audience growth and delivery timeframe."}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-700">{isAr ? "تقدير حصري فوري" : "Instant Custom Estimate"}</span>
        </div>
      </div>

      {/* Step 1: Select Business Type */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black flex items-center justify-center">1</span>
          <span>{isAr ? "اختر مجالك التجاري:" : "Select your business sector:"}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {BUSINESS_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedBusinessType(type.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between items-start gap-2 cursor-pointer ${
                selectedBusinessType === type.id
                  ? "bg-blue-600 text-white font-black border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-100"
              }`}
            >
              <span className="text-lg">{type.icon}</span>
              <span className="text-xs font-bold leading-tight">{isAr ? type.name : type.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Required Services */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-black flex items-center justify-center">2</span>
          <span>{isAr ? "اختر الخدمات المطلوبة (يمكنك اختيار أكثر من خدمة):" : "Select required services (multiple selection allowed):"}</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SERVICES_LIST.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-blue-50/70 border-blue-200 shadow-xs"
                    : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  isSelected ? "bg-blue-600 text-white" : "border border-slate-300 bg-white"
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? "text-blue-900" : "text-slate-900"}`}>
                      {isAr ? service.name : service.nameEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {isAr ? service.estimatedGrowth : service.estimatedGrowthEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {isAr ? service.description : service.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Output Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
          
          {/* Estimated Impact */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">
              {isAr ? "العائد والنمو المتوقع للحضور:" : "Projected Reach & Sales Growth:"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan-400 font-en">+{calculatedGrowthPercent}%</span>
              <span className="text-xs text-slate-300 font-bold">{isAr ? "نمو بالظهور والمبيعات" : "Growth in Visibility"}</span>
            </div>
            <p className="text-[10px] text-slate-400">
              {isAr ? "بناءً على نتائج أكثر من 120 نشاط سوري تم تطويره." : "Based on benchmark results across 120+ Syrian projects."}
            </p>
          </div>

          {/* Time & Guarantees */}
          <div className="space-y-1 border-y md:border-y-0 md:border-r md:border-l border-white/10 py-3 md:py-0 md:px-6">
            <span className="text-[11px] font-medium text-slate-400 block">
              {isAr ? "مدة التنفيذ والتسليم:" : "Estimated Execution Time:"}
            </span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>⏱️ {estimatedDays}</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-bold mt-1">
              {isAr ? "✓ ضمان التوثيق الرسمي وقبول الخريطة 100%" : "✓ 100% Official Map Acceptance Guarantee"}
            </p>
          </div>

          {/* Direct CTA Button */}
          <div className="flex flex-col gap-2.5 justify-center">
            <a
              href={`https://wa.me/963933888999?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 group"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 fill-current" />
              <span>{isAr ? "اطلب التقدير وحجز استشارة مجانية" : "Get Quote & Book Free Audit"}</span>
              <ArrowLeft className={`w-4 h-4 transition-transform ${isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1 rotate-180"}`} />
            </a>
            <span className="text-[10px] text-slate-400 text-center">
              {isAr ? "استشارة مجانية عبر واتساب بدون أي التزام" : "Free WhatsApp consultation with no commitment"}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
