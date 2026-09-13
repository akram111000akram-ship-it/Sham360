import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Compass,
  Navigation,
  Sparkles,
  CheckCircle2,
  X,
  Radio
} from "lucide-react";
import {
  SYRIAN_CITY_HOTSPOTS,
  SYRIAN_GOVERNORATES,
  SYRIA_OUTLINE_SVG_PATH,
  CityHotspot
} from "../../data/syriaMapData";
import { DirectoryItem } from "../../data/directoryData";
import { useLanguage } from "../../services/LanguageContext";

interface SyriaInteractiveMapProps {
  directoryItems: DirectoryItem[];
  selectedHotspot: string | null;
  onSelectHotspot: (hotspotId: string | null) => void;
}

export const SyriaInteractiveMap: React.FC<SyriaInteractiveMapProps> = ({
  directoryItems,
  selectedHotspot,
  onSelectHotspot
}) => {
  const { isAr, t } = useLanguage();
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [hoveredGov, setHoveredGov] = useState<string | null>(null);

  // Count items per city hotspot
  const cityItemCount = React.useMemo(() => {
    const counts: Record<string, number> = {};
    directoryItems.forEach((item) => {
      counts[item.mapPinId] = (counts[item.mapPinId] || 0) + 1;
    });
    return counts;
  }, [directoryItems]);

  const activeHotspotId = hoveredHotspot || selectedHotspot;
  const activeHotspotData = SYRIAN_CITY_HOTSPOTS.find(
    (h) => h.id === activeHotspotId
  );

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full space-y-6 text-start">
      {/* Map Control Header */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xl shadow-blue-900/5 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-[#0066FF] text-xs font-bold mb-1.5">
              <Radio className="w-4 h-4 animate-pulse text-[#0066FF]" />
              <span>{t("map.title", "خريطة الجمهورية العربية السورية الجغرافية التفاعلية")}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200">
                Vector Precision 1:1
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
              {t("map.subtitle", "تصفح معالم ومتاحف ومنشآت المحافظات السورية جغرافياً بدقة متناهية")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t("map.instruction", "انقر أو مرر المؤشر على أي محافظة أو نقطة استدلال لاستعراض المعالم والمنشآت المعتمدة بنظام NFC و 360° VR")}
            </p>
          </div>

          {/* Quick reset active filter */}
          {selectedHotspot && (
            <button
              type="button"
              onClick={() => onSelectHotspot(null)}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? `عرض كل المحافظات (${directoryItems.length} منشأة)`
                  : `Show All Governorates (${directoryItems.length} listings)`}
              </span>
            </button>
          )}
        </div>

        {/* Vector SVG Viewport */}
        <div className="relative w-full aspect-[1000/680] sm:aspect-[1000/620] bg-gradient-to-b from-sky-50/60 via-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center select-none">
          {/* Subtle Vector Compass Rose */}
          <div className={`absolute top-4 ${isAr ? "left-4" : "right-4"} z-10 opacity-75 pointer-events-none`}>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#0066FF] font-bold bg-white/90 px-2.5 py-1 rounded-xl border border-slate-200 shadow-xs">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "20s" }} />
              <span>SYRIA GEO-GRID 360°</span>
            </div>
          </div>

          <svg
            viewBox="0 0 1000 720"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,102,255,0.08)]"
          >
            <defs>
              <linearGradient id="syriaLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#EFF6FF" />
              </linearGradient>

              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>

              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Sovereign Border Base Landmass */}
            <path
              d={SYRIA_OUTLINE_SVG_PATH}
              fill="url(#syriaLandGradient)"
              stroke="#0066FF"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />

            {/* 2. Mediterranean Sea Watermark (West) */}
            <path
              d="M 215,225 C 220,205 228,185 240,165 L 120,165 L 120,450 L 210,455 Z"
              fill="#0284C7"
              opacity="0.06"
            />
            <text
              x="170"
              y="320"
              fill="#0284C7"
              opacity="0.45"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="2"
              transform="rotate(-90 170 320)"
              textAnchor="middle"
              className="font-mono pointer-events-none"
            >
              {isAr ? "البحر الأبيض المتوسط • MEDITERRANEAN SEA" : "MEDITERRANEAN SEA • البحر الأبيض المتوسط"}
            </text>

            {/* 3. Internal Governorates Subtle Borders */}
            {SYRIAN_GOVERNORATES.map((gov) => {
              const isHovered = hoveredGov === gov.id || hoveredHotspot === gov.id;
              const isSelected = selectedHotspot === gov.id;

              return (
                <g key={gov.id}>
                  <path
                    d={gov.svgPath}
                    fill={isSelected ? "rgba(0,102,255,0.18)" : isHovered ? "rgba(2,132,199,0.08)" : "rgba(255,255,255,0.3)"}
                    stroke={isSelected ? "#0066FF" : isHovered ? "#38BDF8" : "#CBD5E1"}
                    strokeWidth={isSelected ? "2" : "1"}
                    strokeDasharray={isSelected ? "none" : "3,3"}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredGov(gov.id)}
                    onMouseLeave={() => setHoveredGov(null)}
                    onClick={() => onSelectHotspot(selectedHotspot === gov.id ? null : gov.id)}
                  />

                  {/* Governorate Subtle Ambient Label */}
                  <text
                    x={gov.labelX}
                    y={gov.labelY}
                    fill={isSelected ? "#0066FF" : isHovered ? "#0284C7" : "#64748B"}
                    fontSize={isSelected || isHovered ? "12" : "10"}
                    fontWeight={isSelected || isHovered ? "bold" : "medium"}
                    textAnchor="middle"
                    className="font-sans pointer-events-none select-none transition-all duration-200"
                  >
                    {isAr ? gov.nameAr : gov.nameEn}
                  </text>
                </g>
              );
            })}

            {/* 4. Euphrates River (نهر الفرات الخالد) & Lake Assad */}
            <path
              d="M 455,135 Q 490,210 520,250 T 630,300 T 730,370 T 805,430"
              fill="none"
              stroke="url(#riverGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* Lake Assad (بحيرة الأسد) */}
            <ellipse
              cx="505"
              cy="235"
              rx="24"
              ry="12"
              transform="rotate(-25 505 235)"
              fill="#0284C7"
              opacity="0.8"
            />
            <text
              x="535"
              y="225"
              fill="#38BDF8"
              fontSize="9"
              fontWeight="bold"
              opacity="0.7"
              className="font-sans pointer-events-none"
            >
              {isAr ? "بحيرة الأسد" : "Lake Assad"}
            </text>
            <text
              x="640"
              y="295"
              fill="#38BDF8"
              fontSize="10"
              fontWeight="bold"
              opacity="0.75"
              className="font-sans pointer-events-none"
            >
              {isAr ? "نهر الفرات • Euphrates River" : "Euphrates River • نهر الفرات"}
            </text>

            {/* 5. Orontes River (نهر العاصي) */}
            <path
              d="M 285,420 Q 320,350 325,305 T 310,230"
              fill="none"
              stroke="url(#riverGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.65"
            />
            <text
              x="335"
              y="325"
              fill="#38BDF8"
              fontSize="9"
              fontWeight="bold"
              opacity="0.65"
              className="font-sans pointer-events-none"
            >
              {isAr ? "نهر العاصي" : "Orontes River"}
            </text>

            {/* 6. Syrian Desert (بادية الشام) Watermark */}
            <text
              x="530"
              y="510"
              fill="#CBD5E1"
              opacity="0.15"
              fontSize="20"
              fontWeight="900"
              letterSpacing="6"
              textAnchor="middle"
              className="font-sans pointer-events-none"
            >
              {isAr ? "بـاديـة الـشـام • SYRIAN DESERT" : "SYRIAN DESERT • بـاديـة الـشـام"}
            </text>

            {/* 7. City Hotspots Pins (Anchored directly on precise geographic coordinates) */}
            {SYRIAN_CITY_HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot === spot.id;
              const isHovered = hoveredHotspot === spot.id;
              const count = cityItemCount[spot.id] || 0;

              return (
                <g
                  key={spot.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => {
                    setHoveredHotspot(spot.id);
                    setHoveredGov(spot.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredHotspot(null);
                    setHoveredGov(null);
                  }}
                  onClick={() =>
                    onSelectHotspot(isSelected ? null : spot.id)
                  }
                >
                  {/* Subtle Ping Radar wave when active or hovered */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={spot.svgX}
                      cy={spot.svgY}
                      r="24"
                      fill="#38BDF8"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer Geographic Precision Ring */}
                  <circle
                    cx={spot.svgX}
                    cy={spot.svgY}
                    r={isSelected ? 16 : isHovered ? 13 : 9}
                    fill={isSelected ? "#0066FF" : isHovered ? "#0284C7" : "#FFFFFF"}
                    stroke={isSelected ? "#38BDF8" : isHovered ? "#38BDF8" : "#0066FF"}
                    strokeWidth={isSelected ? "3.5" : "2"}
                    className="transition-all duration-200 shadow-sm"
                  />

                  {/* Center Glowing Pin Dot */}
                  <circle
                    cx={spot.svgX}
                    cy={spot.svgY}
                    r={isSelected ? 7 : isHovered ? 5.5 : 4}
                    fill={isSelected ? "#FFFFFF" : isHovered ? "#FFFFFF" : "#0066FF"}
                    className="transition-all duration-200"
                  />

                  {/* Clean Non-Overlapping Micro Numeric Badge */}
                  {count > 0 && (
                    <g transform={`translate(${spot.svgX + 8}, ${spot.svgY - 16})`}>
                      <rect
                        x="0"
                        y="0"
                        width={count >= 10 ? "22" : "16"}
                        height="15"
                        rx="7.5"
                        fill={isSelected ? "#0066FF" : "#0284C7"}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={count >= 10 ? 11 : 8}
                        y="11"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontWeight="900"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {count}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating Interactive Active Hotspot Card */}
          <AnimatePresence>
            {activeHotspotData && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute bottom-4 ${isAr ? "right-4" : "left-4"} max-w-[340px] sm:max-w-md w-[calc(100%-2rem)] sm:w-auto p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-200 text-slate-900 shadow-2xl z-20`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {isAr ? activeHotspotData.nameAr : activeHotspotData.nameEn}
                      </h4>
                      <p className="text-[11px] text-[#0066FF] font-medium">
                        {isAr ? activeHotspotData.regionAr : (activeHotspotData.regionEn || activeHotspotData.regionAr)}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] font-mono font-bold text-[11px] border border-blue-200 shrink-0">
                    {cityItemCount[activeHotspotData.id] || 0} {isAr ? "منشأة موثقة" : "Verified Listings"}
                  </span>
                </div>

                <div className="mt-2.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  <span className="text-[11px] text-slate-400 font-bold ml-1">
                    {isAr ? "أبرز المعالم والآثار:" : "Notable Sites & Landmarks:"}
                  </span>
                  <span>{isAr ? activeHotspotData.featuredSiteAr : (activeHotspotData.featuredSiteEn || activeHotspotData.featuredSiteAr)}</span>
                </div>

                {/* Tooltip Actions */}
                <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectHotspot(
                        selectedHotspot === activeHotspotData.id ? null : activeHotspotData.id
                      );
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedHotspot === activeHotspotData.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-[#0066FF] hover:bg-blue-600 text-white shadow-sm"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {selectedHotspot === activeHotspotData.id
                        ? (isAr ? "إلغاء التحديد" : "Clear Filter")
                        : (isAr ? "تصفية منشآت المدينة" : "Filter City Listings")}
                    </span>
                  </button>

                  <a
                    href={activeHotspotData.googleMapsQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isAr ? "ملاحة Google 📍" : "Google Maps 📍"}</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Governorates Quick Filter Pills Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
            <span className="text-xs text-slate-500 font-bold shrink-0 ml-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{isAr ? "المحافظات الرئيسية:" : "Key Governorates:"}</span>
            </span>

            {SYRIAN_CITY_HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot === spot.id;
              const count = cityItemCount[spot.id] || 0;
              const label = isAr ? spot.nameAr.split(" ")[0] : spot.nameEn.split(" ")[0];
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() =>
                    onSelectHotspot(isSelected ? null : spot.id)
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#0066FF] text-white font-black shadow-xs"
                      : "bg-slate-100 hover:bg-blue-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? "bg-white text-[#0066FF] font-black"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
