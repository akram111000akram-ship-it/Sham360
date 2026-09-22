import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../services/LanguageContext";
import {
  Sparkles,
  Wifi,
  RotateCw,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Eye
} from "lucide-react";
import { LogoIcon } from "../Logo";

export interface Sham360OfficialKeychainProps {
  serialNumber?: string;
  targetUrl?: string;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  showDetails?: boolean;
  backgroundTheme?: "light" | "dark";
  onTapSimulate?: () => void;
}

export const Sham360OfficialKeychain: React.FC<Sham360OfficialKeychainProps> = ({
  serialNumber = "SHAM-KEY-2026-88",
  targetUrl = "https://sham360.online/p/akram",
  interactive = true,
  size = "md",
  className = "",
  showDetails = true,
  backgroundTheme = "light",
  onTapSimulate
}) => {
  const { isAr, dir } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTapped, setIsTapped] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">(backgroundTheme);
  const [showAntennaView, setShowAntennaView] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleTap = () => {
    setIsTapped(true);
    if (onTapSimulate) {
      onTapSimulate();
    }
    setTimeout(() => {
      setIsTapped(false);
    }, 2400);
  };

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dimensions based on size prop
  const dimensions = {
    sm: {
      container: "w-[180px] h-[280px]",
      keyring: 70,
      chainLink: 24,
      disc: 130,
      scale: 0.72
    },
    md: {
      container: "w-[240px] h-[370px]",
      keyring: 90,
      chainLink: 30,
      disc: 170,
      scale: 0.95
    },
    lg: {
      container: "w-[290px] h-[450px]",
      keyring: 110,
      chainLink: 36,
      disc: 210,
      scale: 1.15
    }
  }[size];

  // Calculate 3D tilt
  const tiltX = interactive && isHovered ? (mousePos.y - 50) * -0.25 : 0;
  const tiltY = interactive && isHovered ? (mousePos.x - 50) * 0.25 : 0;

  return (
    <div className={`flex flex-col items-center ${className}`} dir={dir}>
      {/* Interactive Keychain Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 50, y: 50 });
        }}
        onClick={handleTap}
        className={`relative ${dimensions.container} flex flex-col items-center select-none cursor-pointer transition-all duration-300`}
        style={{ perspective: "1000px" }}
      >
        {/* Contactless Tap Pulse Animation */}
        <AnimatePresence>
          {isTapped && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-blue-500 pointer-events-none z-40 bg-blue-500/10"
            />
          )}
        </AnimatePresence>

        {/* 3D Moving Object Group */}
        <motion.div
          animate={{
            rotateX: tiltX,
            rotateY: tiltY,
            y: isHovered ? -6 : 0
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative w-full h-full flex flex-col items-center justify-start"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* =========================================================================
              1. STAINLESS STEEL SPLIT KEYRING (Realistic Chrome Coiled Ring)
              ========================================================================= */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Ambient drop shadow under key ring */}
            <div
              className={`absolute top-4 w-[75%] h-[60%] rounded-full blur-md pointer-events-none ${
                activeTheme === "light"
                  ? "bg-slate-400/35"
                  : "bg-black/80"
              }`}
            />

            {/* Polished Steel Split Ring SVG */}
            <svg
              width={dimensions.keyring}
              height={dimensions.keyring}
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.22)]"
            >
              <defs>
                {/* Steel Rim Gradient with specular chrome highlights */}
                <linearGradient id="chromeRingGrad" x1="15" y1="10" x2="105" y2="110" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="15%" stopColor="#E2E8F0" />
                  <stop offset="35%" stopColor="#94A3B8" />
                  <stop offset="50%" stopColor="#CBD5E1" />
                  <stop offset="65%" stopColor="#64748B" />
                  <stop offset="85%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                {/* Inner Bevel Gradient for depth */}
                <linearGradient id="innerChromeGrad" x1="60" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#F8FAFC" />
                </linearGradient>

                {/* Split seam cut shadow */}
                <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Main Circular Key Ring Body */}
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="url(#chromeRingGrad)"
                strokeWidth="11"
                fill="none"
              />

              {/* Inner depth ring */}
              <circle
                cx="60"
                cy="60"
                r="39.5"
                stroke="#64748B"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />

              {/* Outer edge highlight */}
              <circle
                cx="60"
                cy="60"
                r="50.5"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                fill="none"
                opacity="0.85"
              />

              {/* Split Spiral Cut Details (Simulating realistic double loop ring) */}
              <path
                d="M 98 44 C 102 50 102 65 96 76"
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 97 45 C 101 51 101 64 95 75"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Top light reflection highlight */}
              <path
                d="M 38 22 A 45 45 0 0 1 82 22"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.95"
              />
            </svg>
          </div>

          {/* =========================================================================
              2. CONNECTING JUMP RING (Interlocking vertical steel link)
              ========================================================================= */}
          <div className="relative -mt-4 z-20 flex flex-col items-center">
            <svg
              width={dimensions.chainLink}
              height={dimensions.chainLink * 1.4}
              viewBox="0 0 32 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <defs>
                <linearGradient id="jumpRingGrad" x1="4" y1="4" x2="28" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#CBD5E1" />
                  <stop offset="60%" stopColor="#64748B" />
                  <stop offset="85%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Steel Jump Ring Oval */}
              <rect
                x="8"
                y="2"
                width="16"
                height="38"
                rx="8"
                stroke="url(#jumpRingGrad)"
                strokeWidth="5"
                fill="none"
              />
              {/* Highlight streak */}
              <path
                d="M 10 8 L 10 24"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* =========================================================================
              3. CLEAR ACRYLIC EYELET TAB (Molded Top Lug with Hole)
              ========================================================================= */}
          <div className="relative -mt-3 z-30 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border border-white/80 flex items-center justify-center relative shadow-sm ${
                activeTheme === "light"
                  ? "bg-white/40 backdrop-blur-md border-white/90"
                  : "bg-white/15 backdrop-blur-md border-white/40"
              }`}
              style={{
                boxShadow: "inset 0 1px 3px rgba(255,255,255,0.8), 0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              {/* Central Hole for Jump Ring */}
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400/20 border border-slate-400/60 shadow-inner" />
            </div>
          </div>

          {/* =========================================================================
              4. CRYSTAL CLEAR ACRYLIC CIRCULAR DISC (The Main Keychain Body)
              ========================================================================= */}
          <div
            className="relative -mt-3 z-20 flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: `${dimensions.disc}px`,
              height: `${dimensions.disc}px`
            }}
          >
            {/* Cast Shadow Below Disc (Simulating transparent light refraction / caustics) */}
            <div
              className={`absolute -bottom-6 w-[88%] h-7 rounded-full blur-lg pointer-events-none transition-opacity duration-300 ${
                activeTheme === "light"
                  ? "bg-slate-500/25"
                  : "bg-blue-900/30"
              }`}
            />
            {/* Blue subtle glow at bottom from logo refraction */}
            <div className="absolute -bottom-3 w-[60%] h-4 rounded-full bg-blue-600/15 blur-md pointer-events-none" />

            {/* Acrylic Disc Container */}
            <div
              className={`relative w-full h-full rounded-full border-2 transition-all duration-300 overflow-hidden flex items-center justify-center ${
                activeTheme === "light"
                  ? "bg-white/35 backdrop-blur-md border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_2px_8px_rgba(255,255,255,0.9),inset_0_-2px_8px_rgba(0,102,255,0.06)]"
                  : "bg-white/10 backdrop-blur-md border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_2px_10px_rgba(255,255,255,0.4),inset_0_-2px_12px_rgba(0,102,255,0.3)]"
              }`}
            >
              {/* Outer Beveled Glass Edge Ring (Refraction ring seen in photo) */}
              <div className="absolute inset-[3px] rounded-full border border-white/90 pointer-events-none shadow-inner" />
              <div className="absolute inset-[6px] rounded-full border border-blue-100/40 pointer-events-none" />

              {/* Dynamic Glass Specular Light Reflection (Follows mouse movement) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.15) 35%, transparent 65%)`
                }}
              />

              {/* Curving Glass Reflection Arc across upper right */}
              <div className="absolute -top-4 -right-4 w-3/4 h-3/4 rounded-full bg-linear-to-bl from-white/40 via-white/5 to-transparent pointer-events-none" />

              {/* =====================================================================
                  5. THE SHAM360 OFFICIAL EMBLEM (Map Pin + Globe + Orbit + Airplane)
                  ===================================================================== */}
              {!showAntennaView ? (
                <div
                  className="w-[82%] h-[82%] relative z-10 flex items-center justify-center transition-transform duration-300"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(0, 102, 255, 0.28))"
                  }}
                >
                  <LogoIcon size={120} />
                </div>
              ) : (
                /* Alternate X-Ray View: Embedded NXP NTAG216 Micro-Coil Antenna */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  {/* Concentric copper antenna traces */}
                  <div className="w-28 h-28 rounded-full border-2 border-amber-500/80 p-1 flex items-center justify-center shadow-inner">
                    <div className="w-full h-full rounded-full border border-amber-400/60 p-1 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border border-amber-300/40 p-2 flex flex-col items-center justify-center">
                        <div className="w-6 h-6 rounded bg-amber-500/90 border border-amber-200 flex items-center justify-center text-[8px] font-black text-slate-950 font-mono shadow-xs">
                          NTAG
                        </div>
                        <span className="text-[7.5px] font-mono text-amber-300 mt-1 font-bold">
                          888 BYTES
                        </span>
                        <span className="text-[6.5px] font-mono text-cyan-400">
                          13.56 MHz
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 mt-2">
                    {serialNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tap Instruction Indicator */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold border border-slate-700 shadow-md backdrop-blur-xs whitespace-nowrap">
          <Wifi className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>انقر لتجربة التلامس الذكي (NFC TAP)</span>
        </div>
      </div>

      {/* Control Strip & Metadata (When showDetails is enabled) */}
      {showDetails && (
        <div className="mt-12 w-full max-w-sm flex flex-col items-center gap-3">
          {/* Action Pills */}
          <div className="flex items-center gap-2">
            {/* Toggle Antenna View */}
            <button
              type="button"
              onClick={() => setShowAntennaView(!showAntennaView)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="رؤية شريحة NTAG216 المدمجة في الداخل"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>{showAntennaView ? "عرض المظهر الكريستالي" : "فحص الشريحة الداخلية"}</span>
            </button>

            {/* Toggle Light / Dark Background */}
            <button
              type="button"
              onClick={() => setActiveTheme(activeTheme === "light" ? "dark" : "light")}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="تبديل الإضاءة لاختبار شفافية الأكريليك"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{activeTheme === "light" ? "خلفية داكنة" : "خلفية فاتحة"}</span>
            </button>

            {/* Copy Tag URL */}
            <button
              type="button"
              onClick={copyUrl}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>الرابط المبرمج</span>
                </>
              )}
            </button>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold text-slate-700">NXP NTAG216</span>
            <span>•</span>
            <span>مقاومة الماء IP68</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">SHAM360 ORIGINAL</span>
          </div>

          {/* Interactive Tap Success Toast Notification */}
          <AnimatePresence>
            {isTapped && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 shadow-md"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 animate-bounce" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-black">
                    تم قراءة الميدالية الذكية بنجاح! ⚡
                  </div>
                  <div className="text-[10px] text-emerald-700 font-mono">
                    NFC Transmit OK → {targetUrl}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
