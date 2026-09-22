import React, { useState, useRef, useEffect } from "react";
import {
  Compass,
  Eye,
  Maximize2,
  Minimize2,
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  Layers,
  MapPin,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from "lucide-react";

import damasceneCourtyardImg from "../assets/images/damascene_courtyard_vr_1784901515463.jpg";
import damasceneIwanImg from "../assets/images/damascene_iwan_vr_1784901534271.jpg";
import oldDamascusAlleyImg from "../assets/images/old_damascus_alley_vr_1784901549980.jpg";

interface DamasceneVR360ShowcaseProps {
  isAr?: boolean;
  compact?: boolean;
  className?: string;
  onOpenModal?: () => void;
}

export const DamasceneVR360Showcase: React.FC<DamasceneVR360ShowcaseProps> = ({
  isAr = true,
  compact = false,
  className = "",
  onOpenModal
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [resolution, setResolution] = useState<"8K" | "4K">("8K");
  const [activeViewScene, setActiveViewScene] = useState<"fountain" | "iwan" | "hall">("fountain");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Auto rotation effect simulating a 360 camera panning smoothly inside the Damascene house
  useEffect(() => {
    let interval: any;
    if (isAutoRotating && !isDragging) {
      interval = setInterval(() => {
        setRotationDeg((prev) => (prev + 0.3) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging]);

  // Handle Mouse / Touch Drag for manual 360 panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setRotationDeg((prev) => (prev - deltaX * 0.4 + 360) % 360);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  // High quality panoramic scene backgrounds representing authentic Damascene architecture
  const scenes = {
    fountain: {
      nameAr: "الصحن الشامي والبحرة الرخامية (Beit Dimashqi)",
      nameEn: "Courtyard & Marble Fountain (Beit Dimashqi)",
      imageUrl: damasceneCourtyardImg,
      descAr: "بحرة رخامية مثمنة بفسيفساء دمشقية وحجارة أبلق سوداء وبيضاء تحيط بها أشجار الياسمين والنارنج.",
      descEn: "Traditional octagonal marble fountain with ablaq stone arches, Damascene jasmine and citrus trees.",
      hotspots: [
        { id: "fountain", x: 48, y: 55, titleAr: "النافورة الرخامية بدقة 8K", titleEn: "8K Marble Fountain Detail", textAr: "نقوش عريقة وتدفق مياه تفاعلي يعطي للزائر انطباعاً حقيقياً بالواحة الشامية.", textEn: "Intricate mosaic craftsmanship and interactive water reflections in crisp 8K." },
        { id: "jasmine", x: 22, y: 40, titleAr: "الياسمين البلدي والنارنج", titleEn: "Syrian Jasmine & Citrus Trees", textAr: "أجواء تعكس أصالة البيت الشامي وعراقة الضيافة السورية.", textEn: "Authentic green courtyard elements celebrating classical Syrian architecture." },
        { id: "iwan_arch", x: 78, y: 35, titleAr: "قوس الأبلق والأقواس الدمشقية", titleEn: "Ablaq Archways & Syrian Stonework", textAr: "أقواس متناوبة باللونين الأبيض والأسود تعكس الهندسة الشامية الأصيلة.", textEn: "Alternating black and white marble arches showcasing classical Damascus architecture." }
      ]
    },
    iwan: {
      nameAr: "الإيوان الشامي وسقف العجمي",
      nameEn: "Main Damascene Iwan & Ajami Ceiling",
      imageUrl: damasceneIwanImg,
      descAr: "جلسة شرقية عريقة مطعمة بالموزاييك الدمشقي وسقف عجمي مزخرف بالذهب.",
      descEn: "Oriental reception alcove adorned with mother-of-pearl woodwork and gold leaf ceiling.",
      hotspots: [
        { id: "woodwork", x: 52, y: 45, titleAr: "سقف العجمي الخشبي المذهب", titleEn: "Ajami Hand-painted Ceiling", textAr: "سقف مزخرف يدوياً بالألوان والذهب الدمشقي المعتمد.", textEn: "Authentic hand-painted Syrian wooden ceilings with gold leaf accents." },
        { id: "carpet", x: 30, y: 70, titleAr: "الموزاييك والصدف الشامي", titleEn: "Mother-of-Pearl Inlaid Furniture", textAr: "منسوجات وحرف يدوية فريدة تحاكي أدق تفاصيل المقرات الفاخرة.", textEn: "Handcrafted Syrian woodwork rendered with razor-sharp texture detail." }
      ]
    },
    hall: {
      nameAr: "حارات دمشق القديمة (Old Damascus Alley)",
      nameEn: "Old Damascus Cobblestone Alley",
      imageUrl: oldDamascusAlleyImg,
      descAr: "أزقة دمشق القديمة والمشربيات الخشبية وأسوار الياسمين الدمشقي.",
      descEn: "Ancient cobblestone alleyways, overhanging wooden mashrabiya, and climbing jasmine.",
      hotspots: [
        { id: "chandelier", x: 50, y: 25, titleAr: "المشربيات الخشبية العريقة", titleEn: "Wooden Mashrabiya Balcony", textAr: "تفاصيل معمارية حيوية تعبر عن روح الشارع المستقيم والحي القديم.", textEn: "Traditional wooden window screens overlooking historic Damascene cobblestones." },
        { id: "marble", x: 65, y: 65, titleAr: "الأزقة والحجارة الملساء", titleEn: "Ancient Damascus Cobblestones", textAr: "تصوير افتراضي فائق الدقة ينقل الزوار إلى قلب الشام القديمة.", textEn: "Ultra-sharp 8K resolution letting visitors experience Old Damascus as if standing there." }
      ]
    }
  };

  const currentSceneData = scenes[activeViewScene];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 select-none ${
        compact ? "h-[320px] sm:h-[380px]" : "h-[450px] sm:h-[540px]"
      } ${className}`}
    >
      {/* Dynamic Panoramic Video Background Simulation using CSS continuous transform */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Layer 1: High Resolution Background Image with smooth endless 360 degree pan */}
        <div
          className="absolute inset-0 w-[240%] h-[120%] -top-[10%] -left-[70%] bg-cover bg-center transition-transform duration-75 ease-out"
          style={{
            backgroundImage: `url(${currentSceneData.imageUrl})`,
            transform: `translateX(${((rotationDeg / 360) * 100) - 20}%) scale(${zoomLevel})`,
            filter: "brightness(0.9) contrast(1.08)"
          }}
        />

        {/* Video Overlay Layer with subtle lighting motion & particles */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Rotating Compass Circle Watermark */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-40 flex items-center gap-1.5 text-cyan-400 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-mono">
          <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "20s" }} />
          <span>{Math.round(rotationDeg)}° N</span>
        </div>

        {/* Top Floating Badge & Scene Selector */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
          <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/40 text-white flex items-center gap-2 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-black tracking-tight text-cyan-300">
              {isAr ? "عينة جولة افتراضية 8K 360° حية" : "LIVE 8K 360° VR DEMO"}
            </span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded font-mono font-bold">
              {resolution}
            </span>
          </div>

          <div className="hidden sm:flex bg-slate-900/90 backdrop-blur-md rounded-full p-1 border border-slate-800">
            {(["fountain", "iwan", "hall"] as const).map((scKey) => (
              <button
                key={scKey}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveViewScene(scKey);
                  setSelectedHotspot(null);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  activeViewScene === scKey
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {scKey === "fountain" && (isAr ? "البحرة" : "Fountain")}
                {scKey === "iwan" && (isAr ? "الإيوان" : "Iwan")}
                {scKey === "hall" && (isAr ? "القاعة" : "Hall")}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Hotspot Pointers overlaid inside the 360 scene */}
        {currentSceneData.hotspots.map((spot) => {
          // Adjust hotspot position dynamically based on rotationDeg
          const adjustedX = ((spot.x + (rotationDeg / 3.6)) % 100);
          const isVisible = adjustedX >= 10 && adjustedX <= 90;

          if (!isVisible) return null;

          const isSelected = selectedHotspot === spot.id;

          return (
            <div
              key={spot.id}
              className="absolute z-20 transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${adjustedX}%`, top: `${spot.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedHotspot(isSelected ? null : spot.id);
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-cyan-400/30 rounded-full blur-md animate-pulse" />
                <div
                  className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xl ${
                    isSelected
                      ? "bg-cyan-500 border-white text-slate-950 scale-125 shadow-cyan-500/50"
                      : "bg-slate-950/80 border-cyan-400 text-cyan-300 hover:scale-110"
                  }`}
                >
                  <Eye className="w-4 h-4 animate-pulse" />
                </div>

                {/* Tooltip / Info Card Popup */}
                {isSelected && (
                  <div
                    className={`absolute bottom-10 ${
                      adjustedX > 60 ? "right-0" : "left-0"
                    } w-64 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 p-3.5 rounded-2xl shadow-2xl text-white z-30 animate-in fade-in zoom-in-95 duration-200 ${
                      isAr ? "text-right" : "text-left"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                      <h4 className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isAr ? spot.titleAr : spot.titleEn}</span>
                      </h4>
                      <button
                        onClick={() => setSelectedHotspot(null)}
                        className="text-slate-400 hover:text-white text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                      {isAr ? spot.textAr : spot.textEn}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400">
                      <span>{isAr ? "دقة التصوير: 8K Ultra HD" : "Clarity: 8K Ultra HD"}</span>
                      <span className="bg-cyan-950 border border-cyan-800 px-1.5 py-0.5 rounded text-[9px]">
                        Sham360 VR
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* HUD Center Guidance text when dragging */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 text-white text-xs font-bold flex items-center gap-2 shadow-2xl">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? "اسحب بالماوس أو الإصبع للتدوير 360°" : "Drag left/right to rotate 360° view"}</span>
          </div>
        </div>

        {/* Bottom Bar Controls & HUD Overlay */}
        <div
          className="absolute bottom-4 inset-x-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl border border-slate-800/90 text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Current Location / Title */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className={isAr ? "text-right" : "text-left"}>
              <h3 className="text-xs font-bold text-white leading-tight">
                {isAr ? currentSceneData.nameAr : currentSceneData.nameEn}
              </h3>
              <p className="text-[10px] text-slate-400">
                {isAr ? "بيت دمشقي عريق - جولة افتراضية عالية التباين" : "Damascene Heritage Palace - 360° Interactive Sample"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            {/* Auto Rotation Button */}
            <button
              type="button"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoRotating
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
              }`}
              title={isAr ? "تشغيل/إيقاف الدوران التلقائي 360°" : "Toggle 360° Auto-rotate"}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
              <span className="text-[10px] hidden md:inline">
                {isAr ? (isAutoRotating ? "دوران تلقائي" : "دوران متوقف") : (isAutoRotating ? "Auto 360°" : "Paused")}
              </span>
            </button>

            {/* Zoom In/Out */}
            <div className="flex bg-slate-800/80 rounded-xl border border-slate-700/80 p-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                title={isAr ? "تكبير" : "Zoom In"}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                title={isAr ? "تصغير" : "Zoom Out"}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Resolution Switcher */}
            <button
              type="button"
              onClick={() => setResolution(resolution === "8K" ? "4K" : "8K")}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-[10px] font-mono font-bold text-amber-400 cursor-pointer"
            >
              {resolution}
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
              title={isAr ? "ملء الشاشة" : "Toggle Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* CTA Button if modal provided */}
            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-all shadow-md ml-1 whitespace-nowrap cursor-pointer"
              >
                {isAr ? "اطلب جولتك الآن" : "Order Tour"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamasceneVR360Showcase;
