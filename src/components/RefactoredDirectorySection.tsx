import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Compass,
  Star,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Eye
} from "lucide-react";
import { useRouter } from "../services/router";

interface RefactoredDirectorySectionProps {
  isAr?: boolean;
  onOpenAssessment?: () => void;
}

export const RefactoredDirectorySection: React.FC<RefactoredDirectorySectionProps> = ({
  isAr = true,
  onOpenAssessment
}) => {
  const { navigate } = useRouter();

  const categories = [
    { id: "all", labelAr: "الكل", labelEn: "All", icon: "✨" },
    { id: "hotels", labelAr: "فنادق وضيافة 🏨", labelEn: "Hotels & Hospitality 🏨", icon: "🏨" },
    { id: "restaurants", labelAr: "مطاعم ومقاهي 🍽️", labelEn: "Restaurants & Cafes 🍽️", icon: "🍽️" },
    { id: "clinics", labelAr: "عيادات ومراكز طبية 🩺", labelEn: "Medical Clinics 🩺", icon: "🩺" },
    { id: "services", labelAr: "خدمات وتسويق 🎨", labelEn: "Services & Agencies 🎨", icon: "🎨" },
    { id: "retail", labelAr: "معارض وتجارة 🛍️", labelEn: "Retail & Showrooms 🛍️", icon: "🛍️" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const sampleBusinesses = [
    {
      id: "al-yasmeen",
      nameAr: "فندق وقصر الياسمين الشامي",
      nameEn: "Al-Yasmeen Damascene Palace",
      cityAr: "دمشق القديمة - باب توما",
      cityEn: "Old Damascus - Bab Touma",
      category: "hotels",
      categoryLabelAr: "فندق تراثي 5 نجوم",
      categoryLabelEn: "5-Star Heritage Hotel",
      rating: 4.9,
      reviewsCount: 142,
      vrEnabled: true,
      verified: true,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      descriptionAr: "قصر دمشقي عريق يعود للقرن الثامن عشر مزود بأحدث وسائل الضيافة وبطاقات NFC لجميع النزلاء."
    },
    {
      id: "naranj",
      nameAr: "مطعم ومطبخ النارنج الدمشقي",
      nameEn: "Naranj Traditional Restaurant",
      cityAr: "دمشق - المزة فيلات شرقية",
      cityEn: "Damascus - Mazzeh",
      category: "restaurants",
      categoryLabelAr: "مأكولات شامية فاخرة",
      categoryLabelEn: "Fine Syrian Dining",
      rating: 4.8,
      reviewsCount: 210,
      vrEnabled: true,
      verified: true,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      descriptionAr: "أشهى الأطباق الشرقية وتجربة منيو رقمي ذكي وحوامل طاولات NFC لمضاعفة تقييمات Google."
    },
    {
      id: "shami-dental",
      nameAr: "مركز النخبة لطب وتجميل الأسنان",
      nameEn: "Elite Dental & Aesthetics Center",
      cityAr: "دمشق - أبو رمانة",
      cityEn: "Damascus - Abou Roumaneh",
      category: "clinics",
      categoryLabelAr: "مركز طبي تخصصي",
      categoryLabelEn: "Specialized Dental Center",
      rating: 4.9,
      reviewsCount: 88,
      vrEnabled: true,
      verified: true,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      descriptionAr: "عيادات مجهزة بأحدث تقنيات الليزر مع بطاقات هوية ذكية للأطباء لحفظ المواعيد فوراً."
    },
    {
      id: "rawafed-agency",
      nameAr: "مجموعة روافد للتطوير الهندسي",
      nameEn: "Rawafed Engineering Group",
      cityAr: "حلب - الفرقان",
      cityEn: "Aleppo - Al-Furqan",
      category: "services",
      categoryLabelAr: "استشارات معمارية",
      categoryLabelEn: "Architectural Consulting",
      rating: 4.7,
      reviewsCount: 64,
      vrEnabled: false,
      verified: true,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      descriptionAr: "دراسات وتصاميم معمارية مزودة ببروفايل هوية رقمية موحد لفريق المهندسين."
    }
  ];

  const filteredBusinesses =
    activeCategory === "all"
      ? sampleBusinesses
      : sampleBusinesses.filter((b) => b.category === activeCategory);

  return (
    <section id="directory-showcase" className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background Shapes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? "rtl" : "ltr"}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{isAr ? "دليل الأعمال السوري الرقمي المعتمد" : "Verified Syrian Business Network"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isAr ? "دليل الأعمال السوري الرقمي (SHAM360 Directory)" : "SHAM360 Syrian Digital Directory"}
          </h2>

          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "ربط الفنادق، المطاعم، العيادات، والشركات في شبكة موحدة. منصة تجمع نخبة الأعمال الموثقة رسمياً في سوريا والمجهزة بجولات 360° وبطاقات NFC."
              : "Connecting hotels, restaurants, clinics, and companies in one unified network. Explore verified businesses equipped with 360° virtual tours and NFC digital profiles."}
          </p>

          {/* Feature Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  activeCategory === cat.id
                    ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Showcase Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredBusinesses.map((biz) => (
            <motion.div
              key={biz.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate("/profile")}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Image & Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={biz.image}
                  alt={biz.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 shadow-xs">
                    {isAr ? biz.categoryLabelAr : biz.categoryLabelEn}
                  </span>

                  {biz.vrEnabled && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-cyan-500 text-slate-950 flex items-center gap-1 shadow-xs">
                      <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} />
                      <span>360° VR</span>
                    </span>
                  )}
                </div>

                {/* Bottom City Tag */}
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white text-[11px]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold drop-shadow-sm">{isAr ? biz.cityAr : biz.cityEn}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-md font-bold text-[10px]">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>{biz.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {isAr ? biz.nameAr : biz.nameEn}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {biz.descriptionAr}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                    <span>{isAr ? "عرض البروفايل الذكي" : "View Smart Profile"}</span>
                    <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                  </span>

                  <span className="text-[10px] text-slate-400">
                    {biz.reviewsCount} {isAr ? "تقييم موثق" : "Reviews"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Directory CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            onClick={() => navigate("/directory")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-700 active:scale-[0.98] text-white font-black text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isAr ? "تصفح الدليل الرقمي الآن / Explore Directory" : "Explore Full Business Directory"}</span>
            <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          </button>

          {onOpenAssessment && (
            <button
              onClick={onOpenAssessment}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{isAr ? "سجّل منشأتك في الدليل السوري" : "Register Your Business Listing"}</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
