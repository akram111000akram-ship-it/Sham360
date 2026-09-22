import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Radio,
  Sparkles,
  RotateCw,
  CheckCircle2,
  Share2,
  Copy,
  Download,
  Zap,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { LogoIcon } from "../Logo";

export type CardMaterialTheme = "matte" | "steel" | "gold" | "wood" | "white";

export interface Sham360OfficialCardProps {
  cardHolderName?: string;
  cardHolderTitle?: string;
  companyName?: string;
  serialNumber?: string;
  qrUrl?: string;
  hasQrOnBack?: boolean;
  interactive?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showFlipButton?: boolean;
  defaultSide?: "front" | "back";
  controlledSide?: "front" | "back";
  materialTheme?: CardMaterialTheme;
  onTapSimulate?: () => void;
  onFlip?: () => void;
}

export const Sham360OfficialCard: React.FC<Sham360OfficialCardProps> = ({
  cardHolderName = "أكرم الحموي",
  cardHolderTitle = "الرئيس التنفيذي ومؤسس",
  companyName = "SHAM360 NETWORK",
  serialNumber = "SHAM-360-SY-8891",
  qrUrl = "https://sham360.online/p/akram",
  hasQrOnBack = false,
  interactive = true,
  size = "lg",
  className = "",
  showFlipButton = true,
  defaultSide = "front",
  controlledSide,
  materialTheme = "matte",
  onTapSimulate,
  onFlip
}) => {
  const [internalSide, setInternalSide] = useState<"front" | "back">(defaultSide);
  const side = controlledSide !== undefined ? controlledSide : internalSide;
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTap = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsTapped(true);
    if (onTapSimulate) onTapSimulate();
    setTimeout(() => setIsTapped(false), 1200);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 800);
    if (onFlip) {
      onFlip();
    } else {
      setInternalSide((prev) => (prev === "front" ? "back" : "front"));
    }
  };

  const toggleSide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFlip) {
      onFlip();
    } else {
      setInternalSide((prev) => (prev === "front" ? "back" : "front"));
    }
  };

  const isLight = materialTheme === "white";

  // Material Theme Visuals
  const materialStyles = {
    matte: {
      frontBg: "bg-[#070D18]",
      backBg: "bg-gradient-to-tr from-[#050A14] via-[#0A1224] to-[#0E1B38]",
      border: "border-slate-800/90",
      textColor: "text-white",
      glowColor: "rgba(0, 102, 255, 0.2)",
      subtext: "text-slate-400"
    },
    steel: {
      frontBg: "bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155]",
      backBg: "bg-gradient-to-tr from-[#090d16] via-[#1e293b] to-[#334155]",
      border: "border-slate-400/40 shadow-[0_10px_30px_rgba(148,163,184,0.15)]",
      textColor: "text-slate-100",
      glowColor: "rgba(226, 232, 240, 0.25)",
      subtext: "text-slate-300"
    },
    gold: {
      frontBg: "bg-gradient-to-tr from-[#451a03] via-[#78350f] to-[#b45309]",
      backBg: "bg-gradient-to-tr from-[#290d02] via-[#451a03] to-[#78350f]",
      border: "border-amber-400/50 shadow-[0_10px_30px_rgba(245,158,11,0.2)]",
      textColor: "text-amber-50",
      glowColor: "rgba(251, 191, 36, 0.25)",
      subtext: "text-amber-200"
    },
    wood: {
      frontBg: "bg-gradient-to-tr from-[#27160c] via-[#432313] to-[#5a321a]",
      backBg: "bg-gradient-to-tr from-[#1d0e06] via-[#2f190d] to-[#432313]",
      border: "border-amber-800/60 shadow-[0_10px_30px_rgba(120,53,15,0.2)]",
      textColor: "text-amber-100",
      glowColor: "rgba(217, 119, 6, 0.15)",
      subtext: "text-amber-200/80"
    },
    white: {
      frontBg: "bg-gradient-to-tr from-[#f8fafc] via-[#ffffff] to-[#e2e8f0]",
      backBg: "bg-gradient-to-tr from-[#f1f5f9] via-[#ffffff] to-[#e2e8f0]",
      border: "border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
      textColor: "text-slate-900",
      glowColor: "rgba(0, 102, 255, 0.2)",
      subtext: "text-slate-600"
    }
  }[materialTheme] || {
    frontBg: "bg-[#070D18]",
    backBg: "bg-gradient-to-tr from-[#050A14] via-[#0A1224] to-[#0E1B38]",
    border: "border-slate-800/90",
    textColor: "text-white",
    glowColor: "rgba(0, 102, 255, 0.2)",
    subtext: "text-slate-400"
  };

  // Size configurations
  const sizeClasses = {
    sm: "w-64 max-w-full text-[10px]",
    md: "w-80 max-w-full text-xs",
    lg: "w-full max-w-[420px] text-sm",
    xl: "w-full max-w-[500px] text-base"
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 50, y: 50 });
        }}
        onClick={interactive ? handleCardClick : undefined}
        style={{
          perspective: "1200px"
        }}
        className={`relative aspect-[1.586/1] ${sizeClasses[size]} rounded-2xl cursor-pointer select-none group transition-transform duration-200`}
        title="انقر لقلب وجه البطاقة (↺)"
      >
        {/* Interactive Tilt Container */}
        <motion.div
          animate={{
            rotateY: side === "front" ? 0 : 180,
            rotateX: isHovered && interactive ? (mousePos.y - 50) * -0.15 : 0,
            rotateZ: isHovered && interactive ? (mousePos.x - 50) * 0.08 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full h-full relative rounded-2xl"
        >
          {/* =========================================================================
              FRONT FACE: EXACT ENHANCED DESIGN FROM USER'S PHOTO
              ========================================================================= */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
            className={`absolute inset-0 rounded-2xl overflow-hidden ${materialStyles.frontBg} ${materialStyles.border} ${materialStyles.textColor} shadow-2xl flex flex-col items-center justify-between p-6 sm:p-7`}
          >
            {/* Specular Velvet & Light Reflection Gradient (Enhanced Material) */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${materialStyles.glowColor} 0%, rgba(255, 255, 255, 0.04) 35%, transparent 70%)`
              }}
            />

            {/* Subtle Brushed Velvet Micro-Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            {/* Chamfered Card Edge Border Highlight (0.84mm ISO Edge Simulation) */}
            <div className="absolute inset-[1px] rounded-2xl border border-white/10 pointer-events-none" />

            {/* Ambient Radial Blue Glow behind Logo */}
            <div className="absolute top-2 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

            {/* NFC Tap Ripple Effect */}
            <AnimatePresence>
              {isTapped && (
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.9 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0 m-auto w-32 h-32 rounded-full border-2 border-cyan-400 bg-cyan-400/20 pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            {/* ================= TOP SECTION: OFFICIAL SHAM360 EMBLEM ================= */}
            <div className="relative z-10 flex flex-col items-center mt-1">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,102,255,0.35)]">
                <LogoIcon size={68} light={!isLight} />
              </div>
            </div>

            {/* ================= UPPER TEXT: SMART DIGITAL PRESENCE ================= */}
            <div className="relative z-10 text-center w-full px-2">
              <h2 className={`text-xs sm:text-sm md:text-[15px] font-black tracking-[0.24em] font-sans uppercase select-none ${
                isLight ? "text-slate-900" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              }`}>
                SMART DIGITAL PRESENCE
              </h2>
            </div>

            {/* ================= CENTER CONTACTLESS CIRCLE SYMBOL ================= */}
            <div className="relative z-10 flex items-center justify-center my-0.5">
              <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 flex items-center justify-center backdrop-blur-xs group-hover:scale-105 transition-transform duration-300 ${
                isLight 
                  ? "border-slate-800 bg-slate-900/5 text-slate-800 shadow-sm" 
                  : "border-white/95 bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              }`}>
                {/* Official Contactless Signal Waves (Wave Arcs) */}
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                >
                  <path
                    d="M 16 26 A 7 7 0 0 0 16 14"
                    stroke={isLight ? "#0f172a" : "white"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 21 29 A 12 12 0 0 0 21 11"
                    stroke={isLight ? "#0f172a" : "white"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 26 32 A 17 17 0 0 0 26 8"
                    stroke={isLight ? "#0f172a" : "white"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* ================= BOTTOM TEXT: TAP. CONNECT. SHARE. ================= */}
            <div className="relative z-10 text-center w-full mb-1">
              <p className={`text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] font-sans uppercase select-none ${
                isLight ? "text-slate-800" : "text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              }`}>
                TAP. CONNECT. SHARE.
              </p>
            </div>
          </div>

          {/* =========================================================================
              BACK FACE: OFFICIAL REVERSE SIDE WITH DYNAMIC QR & VERIFIED DETAILS
              ========================================================================= */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
            className={`absolute inset-0 rounded-2xl overflow-hidden ${materialStyles.backBg} ${materialStyles.border} ${materialStyles.textColor} shadow-2xl flex flex-col justify-between p-6 sm:p-7`}
          >
            {/* Top Bar: Hologram / Chip + Brand */}
            <div className="flex items-center justify-between">
              {/* Simulated Micro Gold Chip */}
              <div className="w-10 h-8 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 border border-amber-300 shadow-md flex flex-col justify-between overflow-hidden">
                <div className="w-full h-0.5 bg-amber-700/50" />
                <div className="w-full h-0.5 bg-amber-700/50" />
                <div className="w-full h-0.5 bg-amber-700/50" />
              </div>

              {/* Brand Tag */}
              <div className="flex items-center gap-1.5 text-blue-500 font-mono text-[11px] font-bold">
                <Zap className="w-3.5 h-3.5 fill-blue-500" />
                <span>SHAM360 NFC 888B</span>
              </div>
            </div>

            {/* Middle: QR Code with Google Bracket Frames & Syrian Cardholder Details */}
            <div className="flex items-center justify-between gap-4 my-auto">
              {/* Cardholder Info */}
              <div className="text-right flex-1 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-[9px] font-black">
                  عضو موثق رسمياً
                </span>
                <h3 className={`text-sm sm:text-base font-black leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                  {cardHolderName}
                </h3>
                <p className={`text-[11px] font-bold ${isLight ? "text-blue-600" : "text-blue-300"}`}>
                  {cardHolderTitle}
                </p>
                <p className={`text-[10px] font-mono ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  {companyName}
                </p>
                <div className="text-[9px] font-mono text-slate-500 pt-1">
                  ID: {serialNumber}
                </div>
              </div>

              {/* Conditional Symbol Container: QR Code OR Pure Contactless NFC Wave */}
              {hasQrOnBack ? (
                <div className="relative p-2 bg-white rounded-xl shadow-lg flex-shrink-0 border border-slate-100">
                  {/* 4 Google Colors Corner Accents */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-500 rounded-tl-sm" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-500 rounded-tr-sm" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-green-500 rounded-bl-sm" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500 rounded-br-sm" />

                  <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white flex items-center justify-center">
                    <QrCode className="w-full h-full text-slate-950" />
                  </div>
                </div>
              ) : (
                <div className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1 shrink-0 ${
                  isLight
                    ? "bg-blue-50/90 border-blue-200 text-[#0066FF] shadow-xs"
                    : "bg-blue-950/40 border-blue-500/40 text-blue-400 shadow-md"
                }`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center gap-1">
                    <Radio className="w-7 h-7 sm:w-8 sm:h-8" />
                    <span className="text-[8px] sm:text-[9px] font-black tracking-wider uppercase font-mono">
                      PURE NFC
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: Instructions & Syrian Security Verification */}
            <div className={`pt-2 border-t flex items-center justify-between text-[9px] font-mono ${
              isLight ? "border-slate-200 text-slate-600" : "border-slate-800 text-slate-400"
            }`}>
              <div className={`flex items-center gap-1 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                <Smartphone className="w-3 h-3 text-blue-500" />
                <span>{hasQrOnBack ? "TAP ON PHONE OR SCAN QR" : "TAP ON PHONE • INSTANT CONTACTLESS NFC"}</span>
              </div>
              <span className={isLight ? "text-slate-500" : "text-slate-400"}>DAMASCUS • SYRIA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card Action Controls */}
      {showFlipButton && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSide}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 border border-slate-300 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
            <span>{side === "front" ? "عرض الوجه الخلفي (QR)" : "عرض الوجه الأمامي"}</span>
          </button>

          <button
            type="button"
            onClick={handleTap}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>محاكاة ملامسة NFC</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sham360OfficialCard;
