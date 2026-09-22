import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Search,
  Filter,
  Ticket,
  Building,
  CheckCircle2,
  X,
  Share2
} from "lucide-react";
import { SyrianEvent } from "../../types";
import { getAllSyrianEvents } from "../../services/eventsService";
import { useLanguage } from "../../services/LanguageContext";

export const SyrianEventsSection: React.FC = () => {
  const { isAr } = useLanguage();
  const [events, setEvents] = useState<SyrianEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedEventModal, setSelectedEventModal] = useState<SyrianEvent | null>(null);

  useEffect(() => {
    let mounted = true;
    getAllSyrianEvents().then((items) => {
      if (mounted) {
        setEvents(items);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const CATEGORIES = [
    { id: "all", labelAr: "كل الفعاليات", labelEn: "All Events" },
    { id: "cultural", labelAr: "مهرجانات ثقافية", labelEn: "Cultural" },
    { id: "heritage", labelAr: "تراث وموسيقى", labelEn: "Heritage & Music" },
    { id: "business", labelAr: "معارض وتقنية", labelEn: "Business & Tech" },
    { id: "tourism", labelAr: "سياحة وأطعمة", labelEn: "Tourism & Culinary" },
    { id: "arts", labelAr: "فنون تشكيلية", labelEn: "Arts & Visuals" }
  ];

  const CITIES = [
    { id: "all", labelAr: "جميع المدن", labelEn: "All Cities" },
    { id: "دمشق", labelAr: "دمشق", labelEn: "Damascus" },
    { id: "ريف دمشق", labelAr: "ريف دمشق", labelEn: "Damascus Countryside" },
    { id: "حلب", labelAr: "حلب", labelEn: "Aleppo" },
    { id: "اللاذقية", labelAr: "اللاذقية", labelEn: "Latakia" }
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (selectedCategory !== "all" && e.category !== selectedCategory) return false;
      if (selectedCity !== "all" && e.city !== selectedCity) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle =
          e.titleAr.toLowerCase().includes(q) || e.titleEn.toLowerCase().includes(q);
        const matchesCity = e.city.toLowerCase().includes(q);
        const matchesVenue = e.venueAr.toLowerCase().includes(q);
        const matchesDesc = e.descriptionAr.toLowerCase().includes(q);
        return matchesTitle || matchesCity || matchesVenue || matchesDesc;
      }
      return true;
    });
  }, [events, selectedCategory, selectedCity, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? "أجندة الفعاليات السورية 2026"
                : "Syrian Cultural & Public Events Agenda"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black mb-3 tracking-tight">
            {isAr
              ? "الفعاليات والمهرجانات الثقافية والاقتصادية"
              : "Cultural, Business & Heritage Festivals"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? "اكتشف جدول المعارض الدولية، الأمسيات الموسيقية بقلعة حلب، ومهرجانات الوردة الشامية، وجولات دمشق القديمة 360° مع تفاصيل الوصول والموقع المباشر."
              : "Explore international expos, citadel heritage concerts, rose harvest festivals, and 360 photowalks with interactive Google Maps navigation."}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? "ابحث باسم الفعالية، المدينة، أو المنظم..."
                  : "Search events by title, venue, city..."
              }
              className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#0066FF]"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {isAr ? c.labelAr : c.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0066FF] text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">
          {isAr ? "جاري تحميل أجندة الفعاليات..." : "Loading Syrian events..."}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">
            {isAr ? "لا توجد فعاليات مطابقة لبحثك" : "No events found matching your criteria"}
          </h4>
          <p className="text-xs text-slate-400">
            {isAr ? "جرب تغيير المدينة أو التصنيف أعلاه." : "Try resetting your search filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 overflow-hidden flex flex-col hover:border-blue-400/60 hover:shadow-lg transition-all group"
            >
              {/* Event Cover */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={evt.coverImage}
                  alt={evt.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Date Badge */}
                <div className="absolute bottom-3 start-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-[11px] font-black shadow-md backdrop-blur-md">
                  <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{evt.dateText}</span>
                </div>

                {/* City Badge */}
                <div className="absolute top-3 end-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10.5px] font-bold border border-white/20 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{evt.city}</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug">
                    {isAr ? evt.titleAr : evt.titleEn}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{evt.venueAr}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{evt.time}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {isAr ? evt.descriptionAr : evt.descriptionEn}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {evt.priceAr}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedEventModal(evt)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {isAr ? "التفاصيل" : "Details"}
                    </button>

                    <a
                      href={evt.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] transition-all cursor-pointer"
                      title={isAr ? "الموقع على الخريطة" : "Open Google Maps"}
                    >
                      <MapPin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Interactive Event Details Modal */}
      <AnimatePresence>
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
              {/* Modal Cover */}
              <div className="relative h-52 w-full bg-slate-900 shrink-0">
                <img
                  src={selectedEventModal.coverImage}
                  alt={selectedEventModal.titleAr}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedEventModal(null)}
                  className="absolute top-3 end-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 start-3 px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-bold shadow-md">
                  {selectedEventModal.dateText}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-right [direction:rtl]">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">
                    {isAr ? selectedEventModal.titleAr : selectedEventModal.titleEn}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Building className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>الجهة المنظمة: {selectedEventModal.organizerAr}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">المكان والموقع:</span>
                    <span className="font-bold text-slate-900">{selectedEventModal.venueAr}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">التوقيت:</span>
                    <span className="font-bold text-slate-900">{selectedEventModal.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">رسوم الحضور:</span>
                    <span className="font-bold text-emerald-700">{selectedEventModal.priceAr}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">نبذة عن الفعالية:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isAr ? selectedEventModal.descriptionAr : selectedEventModal.descriptionEn}
                  </p>
                </div>

                {/* Google Maps Embed Preview */}
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>موقع الفعالية الدقيق على Google Maps</span>
                  </div>
                  <a
                    href={selectedEventModal.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all"
                  >
                    <span>فتح الخريطة</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex gap-3">
                  {selectedEventModal.whatsappRsvp && (
                    <a
                      href={`https://wa.me/${selectedEventModal.whatsappRsvp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `مرحباً، أود الاستفسار والتسجيل في ${selectedEventModal.titleAr}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>تسجيل حضور عبر واتساب</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedEventModal.titleAr,
                          url: window.location.href
                        });
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
