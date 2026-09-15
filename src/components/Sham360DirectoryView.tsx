import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useRouter } from "../services/router";
import {
  Sparkles,
  Search,
  LayoutGrid,
  Map,
  X,
  Zap,
  Phone,
  Landmark,
  Utensils,
  Wrench,
  Stethoscope,
  Building2,
  Radio,
  MapPin,
  Compass,
  Navigation,
  ShieldCheck,
  Bot,
  Activity,
  CheckCircle2,
  Globe,
  Layers,
  Cpu,
  Star,
  ExternalLink,
  ChevronRight,
  Eye,
  ArrowRight
} from "lucide-react";
import {
  DIRECTORY_DATA,
  DirectoryItem
} from "../data/directoryData";
import {
  SYRIAN_CITY_HOTSPOTS,
  SYRIA_OUTLINE_SVG_PATH,
  SYRIAN_GOVERNORATES
} from "../data/syriaMapData";
import { SyriaInteractiveMap } from "./directory/SyriaInteractiveMap";
import { DirectoryCard } from "./directory/DirectoryCard";
import { QrPosterModal } from "./directory/QrPosterModal";
import { useLanguage } from "../services/LanguageContext";

export const Sham360DirectoryView: React.FC = () => {
  const { navigate } = useRouter();
  const { isAr, t } = useLanguage();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedMapHotspot, setSelectedMapHotspot] = useState<string | null>(null);

  // Syria AI Digital Twin & HUD State
  const [mapLayerMode, setMapLayerMode] = useState<"all" | "heritage" | "business">("all");
  const [hoveredHeaderCity, setHoveredHeaderCity] = useState<string | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);

  // QR Poster Modal State
  const [selectedPosterItem, setSelectedPosterItem] = useState<DirectoryItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Precalculated count of listings per Syrian city
  const cityListingCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of DIRECTORY_DATA) {
      if (item.mapPinId) {
        counts[item.mapPinId] = (counts[item.mapPinId] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Currently focused city in the Directory Explorer
  const activeHeaderCity = useMemo(() => {
    const cityId = selectedMapHotspot || hoveredHeaderCity || "damascus";
    return SYRIAN_CITY_HOTSPOTS.find((c) => c.id === cityId) || SYRIAN_CITY_HOTSPOTS[0];
  }, [selectedMapHotspot, hoveredHeaderCity]);

  // Direct related landmarks & verified listings for the selected city
  const activeCityItems = useMemo(() => {
    return DIRECTORY_DATA.filter((item) => item.mapPinId === activeHeaderCity.id);
  }, [activeHeaderCity.id]);

  // AI Prompt shortcut handler with smart pulse feedback
  const handleAiPromptClick = (searchTerm: string) => {
    setIsAiProcessing(true);
    setSearchQuery(searchTerm);
    setTimeout(() => {
      setIsAiProcessing(false);
      const target = document.getElementById("directory-search-console");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  // Category Tabs Configuration
  const CATEGORY_TABS = useMemo(() => {
    return [
      {
        id: "all",
        label: isAr ? "⚡ الكل" : "⚡ All",
        icon: Sparkles,
        count: DIRECTORY_DATA.length
      },
      {
        id: "historic",
        label: isAr ? "🏛️ معالم تاريخية وقلاع" : "🏛️ Historic & Castles",
        icon: Landmark,
        count: DIRECTORY_DATA.filter((i) => i.category === "historic" || i.category === "museums").length
      },
      {
        id: "religious",
        label: isAr ? "🕌 معالم دينية وأديرة" : "🕌 Religious & Monasteries",
        icon: Compass,
        count: DIRECTORY_DATA.filter((i) => i.category === "religious").length
      },
      {
        id: "vr_tour",
        label: isAr ? "🥽 جولات 360° VR" : "🥽 360° VR Tours",
        icon: Eye,
        count: DIRECTORY_DATA.filter((i) => i.hasVrTour || i.category === "vr_tour").length
      },
      {
        id: "markets",
        label: isAr ? "🛍️ أسواق وخانات" : "🛍️ Bazaars & Souks",
        icon: LayoutGrid,
        count: DIRECTORY_DATA.filter((i) => i.category === "markets").length
      },
      {
        id: "cultural",
        label: isAr ? "🎨 متاحف وقصور ثقافية" : "🎨 Museums & Palaces",
        icon: Layers,
        count: DIRECTORY_DATA.filter((i) => i.category === "cultural" || i.category === "museums").length
      },
      {
        id: "restaurants",
        label: isAr ? "🍔 مطاعم ومقاهي" : "🍔 Dining & Cafes",
        icon: Utensils,
        count: DIRECTORY_DATA.filter((i) => i.category === "restaurants").length
      },
      {
        id: "businesses",
        label: isAr ? "🏢 شركات ومتاجر" : "🏢 Companies & Services",
        icon: Building2,
        count: DIRECTORY_DATA.filter((i) => i.category === "businesses" || i.category === "freelancers" || i.category === "clinics").length
      }
    ];
  }, [isAr]);

  // Filter Directory Items by Category, Search Query & Map Hotspot
  const filteredItems = useMemo(() => {
    return DIRECTORY_DATA.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== "all") {
        if (activeCategory === "vr_tour") {
          if (!item.hasVrTour && item.category !== "vr_tour") return false;
        } else if (activeCategory === "historic") {
          if (item.category !== "historic" && item.category !== "museums") return false;
        } else if (activeCategory === "cultural") {
          if (item.category !== "cultural" && item.category !== "museums") return false;
        } else if (activeCategory === "businesses") {
          if (item.category !== "businesses" && item.category !== "freelancers" && item.category !== "clinics") return false;
        } else if (item.category !== activeCategory) {
          return false;
        }
      }

      // 2. Map Hotspot Filter (when in map mode or selected via map)
      if (selectedMapHotspot && item.mapPinId !== selectedMapHotspot) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.nameAr.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchesTitle = item.titleAr.toLowerCase().includes(q) || item.titleEn.toLowerCase().includes(q);
        const matchesCity = item.cityAr.toLowerCase().includes(q) || item.cityEn.toLowerCase().includes(q);
        const matchesBio = item.bioAr.toLowerCase().includes(q) || item.bioEn?.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesAddress = item.addressAr.toLowerCase().includes(q) || item.addressEn?.toLowerCase().includes(q);

        return matchesName || matchesTitle || matchesCity || matchesBio || matchesTags || matchesAddress;
      }

      return true;
    });
  }, [activeCategory, selectedMapHotspot, searchQuery]);

  // Action Handlers
  const handleOpenProfile = (item: DirectoryItem) => {
    navigate(`/p/${item.slug}`);
  };

  const handleOpenGoogleMaps = (item: DirectoryItem) => {
    window.open(item.googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenWhatsApp = (item: DirectoryItem) => {
    const rawNumber = item.whatsapp.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      isAr
        ? `مرحباً ${item.nameAr}، تواصلت معك عبر بروفايلك الذكي في منصة SHAM360 للاستفسار والخدمات.`
        : `Hello ${item.nameEn}، I am contacting you via your SHAM360 Smart Profile.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadVCard = (item: DirectoryItem) => {
    const vCardContent = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${item.nameEn};;;;`,
      `FN:${item.nameAr} (${item.nameEn})`,
      `ORG:SHAM360 Directory - ${item.categoryLabelAr}`,
      `TITLE:${item.titleAr}`,
      `TEL;TYPE=CELL:${item.phone}`,
      `EMAIL:${item.email}`,
      `ADR;TYPE=WORK:;;${item.addressAr};${item.cityAr};;Syria`,
      `URL:${window.location.origin}/p/${item.slug}`,
      `NOTE:موثق بنظام الهوية الرقمية والبطاقات الذكية SHAM360 | ${item.titleAr}`,
      "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${item.slug}-sham360.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (item: DirectoryItem) => {
    const url = `${window.location.origin}/p/${item.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: isAr ? item.nameAr : item.nameEn,
          text: `${isAr ? item.nameAr : item.nameEn} - ${isAr ? item.titleAr : item.titleEn} on SHAM360 Directory`,
          url: url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    handleCopyLink(item);
  };

  const handleCopyLink = (item: DirectoryItem) => {
    const url = `${window.location.origin}/p/${item.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(item.id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const quickSearchTags = isAr
    ? ["الجامع الأموي", "قلعة حلب", "قلعة الحصن", "نواعير حماة", "قصر العظم", "آثار تدمر", "معلولا", "مطعم النارنج", "سوق الحميدية"]
    : ["Umayyad Mosque", "Aleppo Citadel", "Krak des Chevaliers", "Hama Norias", "Azm Palace", "Palmyra Ruins", "Maaloula", "Naranj Restaurant", "Al-Hamidiyah"];

  return (
    <div
      id="sham360-smart-directory"
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0066FF] selection:text-white text-start"
    >
      {/* 1. Header Context Bar */}
      <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 px-4 py-2.5 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex items-center gap-2 text-xs font-black text-slate-800">
              <span>{t("directory.headerTitle", "دليل شام 360 الذكي للأعمال والمعالم السورية")}</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-blue-50 text-[#0066FF] text-[10px] font-mono font-bold border border-blue-200/70">
                NFC • VR 360° • LIVE GPS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="directory-add-listing-btn"
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t("directory.addListing", "إدراج منشأة جديدة")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Header: #1 Smart AI Directory in Syria with Interactive Digital Twin HUD */}
      <header className="relative pt-7 pb-9 sm:pt-9 sm:pb-11 px-4 sm:px-6 lg:px-8 border-b border-slate-200/90 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] text-start select-none">
        {/* Soft subtle ambient accent (no distracting vectors or text-obscuring maps) */}
        <div className="absolute top-0 end-0 w-96 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-96 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Foreground Content Showcase: Syria's Smart National Directory */}
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          {/* Top National Authority Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-slate-800 text-xs font-bold shadow-xs backdrop-blur-md"
            >
              <span className="text-base leading-none">🇸🇾</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-black text-slate-900">
                {isAr
                  ? "المنصة الوطنية الذكية رقم #1 في الجمهورية العربية السورية"
                  : "Syria's Official #1 Smart National AI Directory"}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-blue-50 text-[#0066FF] text-[10px] font-mono font-black border border-blue-200">
                SHAM360 AI GIS 2.5
              </span>
            </motion.div>

            {/* Quick Live Status Indicator */}
            <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>14 {isAr ? "محافظة متصلة" : "Governorates Online"}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{isAr ? "ذكاء اصطناعي فوري" : "Realtime AI Matching"}</span>
              </span>
            </div>
          </div>

          {/* 2-Column Split Console: Directory Intelligence & City Spotlight (Left) + Interactive Syria Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (7 cols): Directory Identity, City Navigator & Interactive Landmarks Spotlight */}
            <div className="lg:col-span-7 space-y-5">
              {/* Directory Hero Heading */}
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? "دليل الأعمال والمعالم السورية المعتمد" : "Verified Syrian Business & Heritage Directory"}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight sm:leading-snug">
                  {isAr ? (
                    <>
                      استكشف مدن ومعالم سوريا:{" "}
                      <span className="bg-gradient-to-r from-[#0066FF] via-blue-600 to-sky-600 bg-clip-text text-transparent">
                        منظومة دليل ذكية وبطاقات NFC وجولات 360°
                      </span>
                    </>
                  ) : (
                    <>
                      Explore Syrian Cities & Landmarks:{" "}
                      <span className="bg-gradient-to-r from-[#0066FF] via-blue-600 to-sky-600 bg-clip-text text-transparent">
                        Smart Directory with NFC & 360° VR Tours
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-2xl">
                  {isAr
                    ? "اختر أي مدينة سورية لاستعراض معالمها التراثية العريقة، مطاعمها، مشافيها، ومتاجرها الموثقة بنظام الهوية الرقمية والخرائط المباشرة."
                    : "Select any Syrian city to reveal its heritage landmarks, historic dining, verified clinics, and commercial services powered by digital NFC identity and live maps."}
                </p>
              </div>

              {/* Syrian Cities Quick Selector Bar */}
              <div className="space-y-2 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#0066FF]" />
                    <span>{isAr ? "مدن ومحافظات الجمهورية السورية:" : "Syrian Cities & Governorates:"}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {selectedMapHotspot
                      ? (isAr ? `المحددة: ${activeHeaderCity.nameAr}` : `Active: ${activeHeaderCity.nameEn}`)
                      : (isAr ? "عرض كل سوريا" : "All Syria")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMapHotspot(null);
                      setHoveredHeaderCity(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      !selectedMapHotspot
                        ? "bg-[#0066FF] text-white shadow-xs"
                        : "bg-slate-50 hover:bg-blue-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>🇸🇾</span>
                    <span>{isAr ? "كل سوريا" : "All Syria"}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      !selectedMapHotspot ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {DIRECTORY_DATA.length}
                    </span>
                  </button>

                  {SYRIAN_CITY_HOTSPOTS.map((spot) => {
                    const isSelected = selectedMapHotspot === spot.id || (!selectedMapHotspot && activeHeaderCity.id === spot.id);
                    const count = cityListingCounts[spot.id] || 0;
                    const name = isAr ? spot.nameAr : spot.nameEn;

                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => {
                          setSelectedMapHotspot(selectedMapHotspot === spot.id ? null : spot.id);
                        }}
                        onMouseEnter={() => setHoveredHeaderCity(spot.id)}
                        onMouseLeave={() => setHoveredHeaderCity(null)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#0066FF] text-white shadow-xs ring-2 ring-blue-300"
                            : "bg-slate-50 hover:bg-blue-50 text-slate-700 border border-slate-200"
                        }`}
                      >
                        <MapPin className={`w-3 h-3 ${isSelected ? "text-white" : "text-[#0066FF]"}`} />
                        <span>{name}</span>
                        {count > 0 && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                              isSelected ? "bg-white/20 text-white" : "bg-blue-100/70 text-[#0066FF]"
                            }`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic City Landmarks & Verified Listings Spotlight Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-blue-200/90 shadow-sm space-y-4">
                {/* City Spotlight Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF] to-blue-700 text-white flex items-center justify-center font-bold text-base shadow-sm">
                      🏛️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-black text-slate-950">
                          {isAr ? activeHeaderCity.nameAr : activeHeaderCity.nameEn}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          {isAr ? "محافظة نشطة" : "Active Region"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                        <span>📍 {activeHeaderCity.coordinates}</span>
                        <span>•</span>
                        <span className="text-[#0066FF] font-bold">
                          {activeCityItems.length} {isAr ? "معالم ومنشآت مسجلة" : "Listings"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for this city */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMapHotspot(selectedMapHotspot === activeHeaderCity.id ? null : activeHeaderCity.id);
                        const target = document.getElementById("directory-search-console");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>{selectedMapHotspot === activeHeaderCity.id ? (isAr ? "إلغاء التصفية" : "Show All") : (isAr ? `تصفية منشآت ${activeHeaderCity.nameAr.split(" ")[0]}` : `Filter ${activeHeaderCity.nameEn}`)}</span>
                    </button>
                  </div>
                </div>

                {/* Related Landmarks Grid for the Selected City */}
                <div className="space-y-2">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>
                        {isAr
                          ? `أبرز معالم ومؤسسات ${activeHeaderCity.nameAr}:`
                          : `Featured Landmarks & Directory Hubs in ${activeHeaderCity.nameEn}:`}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {isAr ? "اضغط على أي معلم لعرضه مباشرة" : "Click to view landmark details"}
                    </span>
                  </div>

                  {activeCityItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeCityItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSearchQuery(item.nameAr);
                            const target = document.getElementById("directory-search-console");
                            if (target) target.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="p-3 rounded-2xl bg-slate-50/80 hover:bg-blue-50/60 border border-slate-200/90 hover:border-blue-300 transition-all cursor-pointer group shadow-2xs flex items-center gap-3"
                        >
                          <img
                            src={item.avatarUrl || item.coverUrl}
                            alt={isAr ? item.nameAr : item.nameEn}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1 text-start">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-black text-slate-900 truncate group-hover:text-[#0066FF] transition-colors">
                                {isAr ? item.nameAr : item.nameEn}
                              </span>
                              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5 shrink-0">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {item.rating}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                              {isAr ? item.titleAr : item.titleEn}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {item.features?.virtualTour && (
                                <span className="px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 text-[9px] font-bold">
                                  VR 360°
                                </span>
                              )}
                              {item.features?.nfcCard && (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                  NFC
                                </span>
                              )}
                              <span className="text-[10px] text-blue-600 font-bold ms-auto flex items-center gap-0.5 group-hover:underline">
                                <span>{isAr ? "عرض" : "View"}</span>
                                <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                      {isAr
                        ? `لا توجد معالم مسجلة حالياً في ${activeHeaderCity.nameAr}. يمكنك إدراج منشأتك لتكون الأولى!`
                        : `No listings registered yet for ${activeHeaderCity.nameEn}. Be the first to list!`}
                    </div>
                  )}
                </div>

                {/* Instant AI Prompt Assistant for this city */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{isAr ? "استعلام سريع:" : "Quick query:"}</span>
                  </span>
                  {[
                    { label: isAr ? `متاحف ${activeHeaderCity.nameAr.split(" ")[0]}` : `${activeHeaderCity.nameEn} Museums`, query: `${activeHeaderCity.nameAr.split(" ")[0]} متحف` },
                    { label: isAr ? `مطاعم ${activeHeaderCity.nameAr.split(" ")[0]}` : `${activeHeaderCity.nameEn} Dining`, query: `${activeHeaderCity.nameAr.split(" ")[0]} مطعم` },
                    { label: isAr ? `أطباء ${activeHeaderCity.nameAr.split(" ")[0]}` : `${activeHeaderCity.nameEn} Doctors`, query: `${activeHeaderCity.nameAr.split(" ")[0]} طبيب` }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAiPromptClick(chip.query)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#0066FF] text-slate-700 text-[11px] font-medium transition-all cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Interactive Syrian Digital Twin AI Cartographic HUD */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/95 border border-blue-200/90 shadow-xl shadow-blue-500/5 p-4 sm:p-5 relative overflow-hidden backdrop-blur-xl space-y-4">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]" />
                    </span>
                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>{isAr ? "خريطة سوريا الرقمية التفاعلية" : "Syria Digital Twin HUD"}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-50 text-[#0066FF] font-bold">GIS 360°</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {isAr ? "تحديث جيومكاني حي ومباشر" : "Geospatial Live Telemetry"}
                      </div>
                    </div>
                  </div>

                  {/* Layer Mode Filters */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setMapLayerMode("all")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        mapLayerMode === "all" ? "bg-white text-[#0066FF] shadow-2xs font-black" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {isAr ? "الكل" : "All"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapLayerMode("heritage")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        mapLayerMode === "heritage" ? "bg-white text-[#0066FF] shadow-2xs font-black" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {isAr ? "آثار" : "Heritage"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapLayerMode("business")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        mapLayerMode === "business" ? "bg-white text-[#0066FF] shadow-2xs font-black" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {isAr ? "أعمال" : "Business"}
                    </button>
                  </div>
                </div>

                {/* Interactive SVG Cartographic Viewport */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-br from-blue-50/60 via-slate-50 to-sky-50/40 border border-slate-200/80 overflow-hidden flex items-center justify-center p-2">
                  <svg
                    viewBox="0 0 1000 720"
                    className="w-full h-full object-contain filter drop-shadow-sm select-none"
                  >
                    <defs>
                      <linearGradient id="hudTwinLand" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F8FAFC" />
                        <stop offset="100%" stopColor="#EFF6FF" />
                      </linearGradient>

                      <linearGradient id="hudCorridorPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Mediterranean Sea Indicator */}
                    <path
                      d="M 120 180 Q 180 280 160 420 L 80 420 L 80 180 Z"
                      fill="#E0F2FE"
                      opacity="0.6"
                    />
                    <text x="100" y="310" fill="#0284C7" fontSize="12" fontWeight="bold" opacity="0.6">
                      {isAr ? "البحر المتوسط" : "Med. Sea"}
                    </text>

                    {/* Syria Sovereign Territory Landmass */}
                    <path
                      d={SYRIA_OUTLINE_SVG_PATH}
                      fill="url(#hudTwinLand)"
                      stroke="#0066FF"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      className="filter drop-shadow-[0_4px_12px_rgba(0,102,255,0.08)]"
                    />

                    {/* Internal Governorates Boundaries */}
                    {SYRIAN_GOVERNORATES.map((gov) => (
                      <path
                        key={gov.id}
                        d={gov.svgPath}
                        fill="transparent"
                        stroke="#CBD5E1"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.75"
                      />
                    ))}

                    {/* Lake Assad & Euphrates River */}
                    <path
                      d="M 450 160 Q 485 195 470 230 Q 530 260 590 285 Q 670 320 730 390 Q 770 430 810 470"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <ellipse cx="485" cy="205" rx="30" ry="16" fill="#38BDF8" opacity="0.85" />

                    {/* Animated Geographic Economic Corridors */}
                    {/* 1. M5 Highway Corridor: Damascus -> Homs -> Hama -> Aleppo */}
                    <path
                      d="M 270 515 L 310 395 L 330 340 L 360 185"
                      fill="none"
                      stroke="#0066FF"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />

                    {/* 2. Coastal Corridor: Latakia -> Tartus -> Homs */}
                    <path
                      d="M 235 240 L 220 340 L 310 395"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="1.8"
                      strokeDasharray="3 3"
                      opacity="0.5"
                    />

                    {/* 3. Badia & Euphrates Corridor: Homs -> Palmyra -> Deir ez-Zor */}
                    <path
                      d="M 310 395 L 520 420 L 680 330"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.8"
                      strokeDasharray="3 3"
                      opacity="0.5"
                    />

                    {/* Interactive City Nodes on the HUD */}
                    {SYRIAN_CITY_HOTSPOTS.map((city) => {
                      const isSelected = selectedMapHotspot === city.id || (!selectedMapHotspot && activeHeaderCity.id === city.id);
                      const isHovered = hoveredHeaderCity === city.id;

                      return (
                        <g
                          key={city.id}
                          transform={`translate(${city.svgX}, ${city.svgY})`}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredHeaderCity(city.id)}
                          onMouseLeave={() => setHoveredHeaderCity(null)}
                          onClick={() => setSelectedMapHotspot(isSelected ? null : city.id)}
                        >
                          {/* Outer Ripple */}
                          {(isSelected || isHovered) && (
                            <circle
                              r="16"
                              fill="none"
                              stroke="#0066FF"
                              strokeWidth="1.5"
                              className="animate-ping"
                            />
                          )}

                          {/* Outer Pin Halo */}
                          <circle
                            r={isSelected ? 10 : isHovered ? 8 : 6}
                            fill={isSelected ? "#0066FF" : isHovered ? "#0284C7" : "#FFFFFF"}
                            stroke="#0066FF"
                            strokeWidth="2"
                          />

                          {/* Center Core */}
                          <circle
                            r={isSelected ? 4.5 : 3}
                            fill={isSelected ? "#FFFFFF" : "#0066FF"}
                          />

                          {/* City Name Label */}
                          <text
                            x={city.svgX > 600 ? -8 : 10}
                            y="4"
                            fill="#0F172A"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor={city.svgX > 600 ? "end" : "start"}
                            className="font-sans filter drop-shadow-xs"
                          >
                            {isAr ? city.nameAr.split(" ")[0] : city.nameEn.split(" ")[0]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Micro Top Floating Coordinate Pill */}
                  <div className="absolute top-2 start-2 px-2 py-1 rounded-lg bg-white/90 border border-slate-200 text-[10px] font-mono text-slate-700 shadow-2xs">
                    📍 {activeHeaderCity.nameAr}: {activeHeaderCity.coordinates}
                  </div>
                </div>

                {/* HUD Interactive Dynamic City Card */}
                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">
                        {isAr ? activeHeaderCity.nameAr : activeHeaderCity.nameEn}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {cityListingCounts[activeHeaderCity.id] || 0} {isAr ? "منشأة ومعلم مسجل" : "Verified Listings"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMapHotspot(
                          selectedMapHotspot === activeHeaderCity.id ? null : activeHeaderCity.id
                        );
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      {selectedMapHotspot === activeHeaderCity.id
                        ? (isAr ? "إلغاء التحديد" : "Clear")
                        : (isAr ? "تصفية" : "Filter")}
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode(viewMode === "map" ? "grid" : "map")}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      title={isAr ? "فتح الخريطة التفاعلية الكبرى" : "Open Full Interactive Map"}
                    >
                      <Map className="w-3.5 h-3.5 text-[#0066FF]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. AI Semantic Search Bar & View Toggles Console */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-5 relative z-20 space-y-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-blue-900/5 space-y-4 backdrop-blur-md">
          {/* Main Search Bar & View Switcher */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Glowing Search Input */}
            <div className="relative flex-1 group">
              <div className={`absolute inset-y-0 ${isAr ? "right-4" : "left-4"} flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0066FF] transition-colors`}>
                <Sparkles className="w-5 h-5 text-[#0066FF] animate-pulse" />
              </div>

              <input
                id="directory-ai-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? "ابحث بالذكاء الاصطناعي: (مثلاً: متحف بدمشق القديمة، قلعة الحصن، مصمم جرافيك بحلب...)"
                    : "Search: (e.g., Damascus Museum, Krak des Chevaliers, Aleppo designer...)"
                }
                className={`w-full ${isAr ? "pr-12 pl-10" : "pl-12 pr-10"} py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all shadow-inner`}
              />

              {searchQuery && (
                <button
                  id="directory-clear-search-btn"
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`absolute inset-y-0 ${isAr ? "left-3" : "right-3"} flex items-center px-1 text-slate-400 hover:text-slate-700 cursor-pointer`}
                  title={isAr ? "مسح البحث" : "Clear Search"}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode Toggle: Grid vs Authentic Syria Map */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
              <button
                id="view-toggle-grid"
                type="button"
                onClick={() => {
                  setViewMode("grid");
                  setSelectedMapHotspot(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutGrid className={`w-4 h-4 ${viewMode === "grid" ? "text-[#0066FF]" : ""}`} />
                <span>{t("directory.viewGrid", "شبكة البطاقات")}</span>
              </button>

              <button
                id="view-toggle-map"
                type="button"
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "map"
                    ? "bg-[#0066FF] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Map className="w-4 h-4" />
                <span>{isAr ? "خريطة سوريا التفاعلية 📍" : "Syria Vector Map 📍"}</span>
              </button>
            </div>
          </div>

          {/* Dynamic Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {CATEGORY_TABS.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-cyan-400" : "text-[#0066FF]"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{isAr ? "اقتراحات البحث السريع:" : "Quick Suggestions:"}</span>
            </span>

            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#0066FF] border border-slate-200/70 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}

            {(searchQuery || activeCategory !== "all" || selectedMapHotspot) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setSelectedMapHotspot(null);
                }}
                className={`${isAr ? "mr-auto" : "ml-auto"} px-2 py-1 text-[11px] text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-bold`}
              >
                <X className="w-3.5 h-3.5" />
                <span>{isAr ? "إعادة ضبط التصفية" : "Reset Filter"}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. Main Body: Grid View vs Interactive Spatially Accurate Map View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {viewMode === "grid" ? (
          /* =================== GRID VIEW =================== */
          <div>
            {/* Counter Bar */}
            <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>{isAr ? "تم العثور على" : "Found"}</span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 font-mono font-bold border border-slate-700">
                  {filteredItems.length}
                </span>
                <span>{isAr ? "منشأة ومعلم سوري موثق" : "verified Syrian listings & landmarks"}</span>
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <DirectoryCard
                    key={item.id}
                    item={item}
                    onOpenProfile={handleOpenProfile}
                    onOpenGoogleMaps={handleOpenGoogleMaps}
                    onOpenWhatsApp={handleOpenWhatsApp}
                    onDownloadVCard={handleDownloadVCard}
                    onOpenQrPoster={setSelectedPosterItem}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-800/50 border border-slate-700/60 p-12 text-center text-white space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black">{t("directory.noResults", "لم يتم العثور على منشآت مطابقة للبحث")}</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {t("directory.noResultsDesc", "يرجى تجربة كلمات بحث أخرى أو إعادة ضبط التصفية لاستعراض جميع المنشآت والمعالم الأثرية.")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setSelectedMapHotspot(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span>{isAr ? "عرض جميع المنشآت" : "Show All Listings"}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* =================== AUTHENTIC SYRIA VECTOR MAP VIEW =================== */
          <div className="space-y-8">
            <SyriaInteractiveMap
              directoryItems={DIRECTORY_DATA}
              selectedHotspot={selectedMapHotspot}
              onSelectHotspot={setSelectedMapHotspot}
            />

            {/* Filtered Results under Map */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>
                    {isAr
                      ? "المعالم والمنشآت المتاحة في النطاق الجغرافي المحدد:"
                      : "Available Listings in Selected Geographic Area:"}
                  </span>
                  <span className="text-cyan-400 font-mono font-bold">({filteredItems.length})</span>
                </h3>

                {selectedMapHotspot && (
                  <span className="text-xs text-cyan-300 font-bold bg-cyan-950/80 px-3 py-1 rounded-xl border border-cyan-800/60">
                    {isAr
                      ? `مصفى حسب: ${SYRIAN_CITY_HOTSPOTS.find((h) => h.id === selectedMapHotspot)?.nameAr}`
                      : `Filtered by: ${SYRIAN_CITY_HOTSPOTS.find((h) => h.id === selectedMapHotspot)?.nameEn}`}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <DirectoryCard
                    key={item.id}
                    item={item}
                    onOpenProfile={handleOpenProfile}
                    onOpenGoogleMaps={handleOpenGoogleMaps}
                    onOpenWhatsApp={handleOpenWhatsApp}
                    onDownloadVCard={handleDownloadVCard}
                    onOpenQrPoster={setSelectedPosterItem}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. High-Converting Call-to-Action (CTA) Join Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border border-slate-800 p-8 sm:p-12 text-white shadow-2xl shadow-blue-950/40">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#0066FF]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {isAr
                    ? "انضم مجاناً إلى دليل الأعمال والآثار الوطني السوري"
                    : "Join Syria's National Business & Cultural Directory"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {isAr
                  ? "هل تملك منشأة، مطعماً، متحفاً، أو عيادة في سوريا؟"
                  : "Own a business, restaurant, museum, or clinic in Syria?"}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {isAr
                  ? "اربط نشاطك بمنظومة SHAM360 المتكاملة: احصل على بطاقاتك الذكية الفاخرة، وثّق بروفايلك الرقمي مع حجز المواعيد وتحميل جهة الاتصال الفوري، واطلب تصوير جولة 360° بانورامية بدقة 8K لموقعك."
                  : "Connect your enterprise to the SHAM360 smart ecosystem: obtain luxury NFC cards, verify your interactive profile with instant vCard saving, and book an 8K 360° virtual tour for your premises."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                id="cta-join-directory-btn"
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-7 py-3.5 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>{isAr ? "إدراج منشأتك مجاناً الآن" : "Add Your Listing Free Now"}</span>
              </button>

              <a
                id="cta-whatsapp-team-btn"
                href="https://wa.me/963933888999?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%84%D8%AF%D9%84%D9%8A%D9%84%20SHAM360%20%D9%88%D8%B7%D9%84%D8%A8%20%D8%B2%D9%8A%D8%A7%D8%B1%D8%A9%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%A7%D9%84%D8%AA%D8%B5%D9%88%D9%8A%D8%B1%208K"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? "طلب زيارة فريق التصوير 8K" : "Request 8K VR Photography Visit"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Printable Stand Poster Modal */}
      <QrPosterModal
        item={selectedPosterItem}
        onClose={() => setSelectedPosterItem(null)}
        onCopyLink={handleCopyLink}
        isCopied={selectedPosterItem ? copiedLink === selectedPosterItem.id : false}
      />
    </div>
  );
};
