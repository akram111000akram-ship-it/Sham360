import React from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  QrCode,
  UserCheck,
  Download,
  Share2,
  TrendingUp,
  Globe2,
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Compass
} from "lucide-react";
import { useRouter } from "../services/router";

interface HowItWorksSectionProps {
  isAr?: boolean;
  onOpenAssessment?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  isAr = true,
  onOpenAssessment
}) => {
  const { navigate } = useRouter();

  const steps = [
    {
      step: "01",
      titleAr: "المس أو امسح",
      titleEn: "Tap or Scan",
      badgeAr: "سرعة 0.2 ثانية",
      badgeEn: "0.2s Instant Response",
      icon: Smartphone,
      accentColor: "from-blue-600 to-cyan-500",
      descriptionAr:
        "قرّب بطاقة SHAM360 NFC الفاخرة أو امسح رمز الـ QR المطبوع بكاميرا أي هاتف ذكي (iPhone أو Android).",
      descriptionEn:
        "Tap your luxury SHAM360 NFC card or scan the dynamic QR code with any modern iPhone or Android smartphone.",
      highlightPointsAr: [
        "بدون الحاجة لتحميل أي تطبيق إطلاقاً",
        "يعمل مع 100% من الهواتف الحديثة",
        "تفاعل فوري في المعارض والاجتماعات والمطاعم"
      ],
      highlightPointsEn: [
        "Zero app downloads or setup needed for recipient",
        "Works seamlessly across 100% of modern phones",
        "Instant impression during meetings and conferences"
      ],
      visualType: "tap"
    },
    {
      step: "02",
      titleAr: "افتح البروفايل",
      titleEn: "Instant Profile Launch",
      badgeAr: "هوية رقمية متكاملة",
      badgeEn: "All-In-One Identity",
      icon: UserCheck,
      accentColor: "from-indigo-600 to-blue-500",
      descriptionAr:
        "يُفتح بروفايلك الرقمي الموثق فوراً، حاملاً اسمك، معلومات الاتصال، خدماتك، ومعرض صورك مع زر حفظ فوري بجهات الاتصال.",
      descriptionEn:
        "Your verified digital identity opens instantly with complete contacts, business catalog, and 1-click vCard save.",
      highlightPointsAr: [
        "حفظ جهة الاتصال (vCard) بنقرة زر واحدة",
        "روابط مباشرة لواتساب، إنستغرام، والموقع",
        "زر تقييم مباشر على خرائط Google بخمس نجوم"
      ],
      highlightPointsEn: [
        "1-click native vCard contact file download",
        "Direct routing to WhatsApp, Instagram & Portfolio",
        "Instant Google 5-Star review trigger"
      ],
      visualType: "profile"
    },
    {
      step: "03",
      titleAr: "انضم للدليل والنمو",
      titleEn: "Connect & Grow",
      badgeAr: "تصدر الخرائط والبحث",
      badgeEn: "Dominate Local Search",
      icon: TrendingUp,
      accentColor: "from-cyan-600 to-emerald-500",
      descriptionAr:
        "تُدرج منشأتك تلقائياً في دليل شام 360 للأعمال مع توثيق خريطة Google وجولة افتراضية 360° لضمان تصدّر المنافسين.",
      descriptionEn:
        "Your business gets featured in the SHAM360 Syrian Directory with verified Google Maps and an 8K virtual tour.",
      highlightPointsAr: [
        "ظهور مميز في دليل الأعمال السوري الموحد",
        "جولة تصويرية 360° تجذب الزوار لمقرك",
        "حماية الخريطة من بلاغات المنافسين والإغلاق"
      ],
      highlightPointsEn: [
        "Premium listing in Syrian verified business directory",
        "Immersive 360° virtual tour driving real visits",
        "Active protection shield against fake competitor reports"
      ],
      visualType: "directory"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? "rtl" : "ltr"}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>{isAr ? "كيف تعمل منظومة Sham360؟" : "How Sham360 Works"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {isAr ? "ثلاث خطوات فقط لنقل أعمالك إلى عصر الهوية الذكية" : "Three Simple Steps To Modern Digital Identity"}
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "وداعاً للكروت الورقية التي تُرمى بعد ثوانٍ. تواصل باحترافية، وسّع شبكة علاقاتك، وتصدّر نتائج البحث في سوريا."
              : "Say goodbye to paper business cards that end up in the trash. Network professionally, multiply leads, and dominate local search in Syria."}
          </p>
        </div>

        {/* 3-Column Interactive Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Step Marker & Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-mono text-3xl font-black text-slate-200 group-hover:text-blue-500 transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-700 border border-slate-200/80 transition-colors">
                    {isAr ? step.badgeAr : step.badgeEn}
                  </span>
                </div>

                {/* Main Step Icon Box */}
                <div className="mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.accentColor} text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6 flex-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {isAr ? step.descriptionAr : step.descriptionEn}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2 border-t border-slate-100 pt-5 text-xs text-slate-600">
                  {step.highlightPointsAr.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span>{isAr ? pt : step.highlightPointsEn[pIdx]}</span>
                    </div>
                  ))}
                </div>

                {/* Visual Accent Bottom Bar */}
                <div className="w-full h-1 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 rounded-full mt-6 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Bar */}
        <div className="mt-14 bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1 text-center md:text-right">
            <h4 className="text-lg font-black text-white">
              {isAr ? "هل أنت مستعد لتجربة بروفايلك الرقمي المباشر؟" : "Ready to Experience Your Live Digital Profile?"}
            </h4>
            <p className="text-xs text-slate-300">
              {isAr 
                ? "يمكنك الآن استعراض بروفايل فندق وقصر الياسمين الشامي كنموذج حي لتفاعل العملاء."
                : "Explore the live demo profile of Al-Yasmeen Damascene Palace to see instant vCard download and 360° tour."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{isAr ? "تجربة البروفايل الحي (Live Demo)" : "Open Live Profile Demo"}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </button>

            {onOpenAssessment && (
              <button
                onClick={onOpenAssessment}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                {isAr ? "طلب بطاقتك وتدقيقك مجاناً" : "Get Your Card & Free Audit"}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
