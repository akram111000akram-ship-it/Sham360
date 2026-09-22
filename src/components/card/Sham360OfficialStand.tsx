import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wifi,
  Rotate3d,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  QrCode,
  Layers,
  Camera,
  Star
} from "lucide-react";
import { LogoIcon } from "../Logo";

export interface Sham360OfficialStandProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  qrUrl?: string;
  serialNumber?: string;
  interactive?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showDetails?: boolean;
  backgroundTheme?: "light" | "dark";
  defaultPerspective?: "3d" | "flat";
  onTapSimulate?: () => void;
}

export const Sham360OfficialStand: React.FC<Sham360OfficialStandProps> = ({
  title = "My Digital Profile",
  subtitle = "Scan  •  Tap  •  Connect",
  ctaText = "Tap & Scan to Connect with Us",
  qrUrl = "https://sham360.online/p/akram",
  serialNumber = "SHAM-STAND-L-9042",
  interactive = true,
  size = "md",
  className = "",
  showDetails = true,
  backgroundTheme = "light",
  defaultPerspective = "3d",
  onTapSimulate
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTapped, setIsTapped] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [perspective, setPerspective] = useState<"3d" | "flat">(defaultPerspective);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">(backgroundTheme);
  const [copied, setCopied] = useState(false);
  const [activeBadgeTooltip, setActiveBadgeTooltip] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current || perspective !== "3d") return;
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
    }, 2800);
  };

  const handleScan = () => {
    setIsScanned(true);
    setTimeout(() => {
      setIsScanned(false);
    }, 2800);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dimensions based on size
  const sizeMap = {
    sm: {
      width: 170,
      height: 270,
      scale: 0.65,
      wrapperClass: "w-[170px]"
    },
    md: {
      width: 250,
      height: 400,
      scale: 0.95,
      wrapperClass: "w-[250px]"
    },
    lg: {
      width: 300,
      height: 480,
      scale: 1.15,
      wrapperClass: "w-[300px]"
    },
    xl: {
      width: 360,
      height: 576,
      scale: 1.35,
      wrapperClass: "w-[360px]"
    }
  };

  const currentSize = sizeMap[size];

  // Dynamic 3D tilt calculation
  const rotateY = perspective === "3d" && isHovered ? (mousePos.x - 50) * 0.18 : 0;
  const rotateX = perspective === "3d" && isHovered ? -(mousePos.y - 50) * 0.12 : 0;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Interactive Toolbar for Testing */}
      {showDetails && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-slate-900/90 text-white px-3.5 py-1.5 rounded-full border border-slate-700/80 text-xs shadow-lg backdrop-blur-md">
          {/* 3D / Flat View Switch */}
          <button
            type="button"
            onClick={() => setPerspective(perspective === "3d" ? "flat" : "3d")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="تبديل زاوية الرؤية ثلاثية الأبعاد"
          >
            <Rotate3d className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-medium">
              {perspective === "3d" ? "منظور مائل 3D" : "تصميم مسطح Flat"}
            </span>
          </button>

          <span className="w-px h-3.5 bg-slate-700" />

          {/* Simulate Phone NFC Tap */}
          <button
            type="button"
            onClick={handleTap}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer shadow-sm"
            title="محاكاة تلامس هاتف ذكي عبر NFC"
          >
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[11px]">تجربة تلامس NFC</span>
          </button>

          {/* Simulate Camera QR Scan */}
          <button
            type="button"
            onClick={handleScan}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer shadow-sm"
            title="محاكاة مسح الكاميرا لكود QR"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="text-[11px]">مسح QR</span>
          </button>

          <span className="w-px h-3.5 bg-slate-700" />

          {/* Studio Theme Switcher */}
          <button
            type="button"
            onClick={() => setActiveTheme(activeTheme === "light" ? "dark" : "light")}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <span>{activeTheme === "light" ? "خلفية رخامية" : "خلفية مخملية"}</span>
          </button>
        </div>
      )}

      {/* Main Showcase Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 50, y: 50 });
        }}
        className={`relative ${currentSize.wrapperClass} flex flex-col items-center justify-center p-4 transition-all duration-500`}
        style={{ perspective: "1200px" }}
      >
        {/* Background Environment Surface (Countertop / Tabletop) */}
        <div
          className={`absolute inset-0 rounded-3xl transition-colors duration-500 ${
            activeTheme === "light"
              ? "bg-gradient-to-b from-slate-50 via-slate-100/90 to-slate-200/90 border border-slate-200/80 shadow-inner"
              : "bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-800 shadow-2xl"
          }`}
          style={{
            backgroundImage:
              activeTheme === "light"
                ? "radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.9), transparent 60%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)"
                : "radial-gradient(ellipse at 50% 10%, rgba(30,58,138,0.25), transparent 70%), linear-gradient(180deg, #0f172a 0%, #020617 100%)"
          }}
        />

        {/* Realistic Studio Floor Shadow */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full pointer-events-none filter blur-md transition-opacity duration-300"
          style={{
            background:
              activeTheme === "light"
                ? "radial-gradient(ellipse at center, rgba(15,23,42,0.32) 0%, rgba(15,23,42,0.1) 50%, transparent 80%)"
                : "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 85%)",
            transform: perspective === "3d" ? "translateX(-50%) translateY(4px) scaleX(1.15)" : "translateX(-50%)"
          }}
        />

        {/* 3D Physical Acrylic L-Stand Root Assembly */}
        <motion.div
          animate={{
            rotateY: rotateY,
            rotateX: perspective === "3d" ? 6 + rotateX : 0,
            scale: isHovered && interactive ? 1.02 : 1
          }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="relative z-10 flex flex-col items-center"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center"
          }}
        >
          {/* ========================================================= */}
          {/* ACRYLIC STAND FACEPLATE (VERTICAL LEANING SIGN) */}
          {/* ========================================================= */}
          <div
            id="sham360-acrylic-stand-face"
            onClick={interactive ? handleTap : undefined}
            className={`relative overflow-hidden cursor-pointer ${
              perspective === "3d" ? "rounded-t-[20px] rounded-b-[4px]" : "rounded-[20px]"
            } bg-white shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-slate-200/90 flex flex-col items-center justify-between transition-all`}
            style={{
              width: `${currentSize.width}px`,
              height: `${currentSize.height}px`,
              background: "#ffffff",
              boxShadow:
                activeTheme === "light"
                  ? "0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.8) inset"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.2) inset"
            }}
          >
            {/* Clear Acrylic Edge Bevel (Optical Crystal Refraction) */}
            <div className="absolute inset-0 rounded-[20px] pointer-events-none border-[3px] border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_0_8px_rgba(226,232,240,0.5)] z-30" />
            
            {/* Glass Surface Specular Reflection Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-25 transition-opacity duration-300"
              style={{
                background: `linear-gradient(${mousePos.x + mousePos.y}deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.4) 100%)`
              }}
            />

            {/* Subtle Vertical Glass Edge Highlight */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-r from-white/90 via-white/40 to-transparent pointer-events-none z-25" />
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-l from-slate-200/50 via-white/40 to-transparent pointer-events-none z-25" />

            {/* NFC Tap Signal Ring Overlay when tapped */}
            <AnimatePresence>
              {isTapped && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.3 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-blue-600/20 backdrop-blur-[2px] pointer-events-none"
                >
                  <motion.div
                    animate={{ scale: [1, 1.4, 1.7], opacity: [0.9, 0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="w-28 h-28 rounded-full border-4 border-blue-500 flex items-center justify-center"
                  />
                  <div className="absolute bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                    <Wifi className="w-3.5 h-3.5" />
                    <span>تم التلامس بنجاح! NFC Active</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QR Scan Camera Flash Overlay when scanned */}
            <AnimatePresence>
              {isScanned && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/85 backdrop-blur-[1px] pointer-events-none"
                >
                  <motion.div
                    initial={{ y: -60 }}
                    animate={{ y: 60 }}
                    transition={{ repeat: 2, duration: 0.7, ease: "easeInOut" }}
                    className="w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_#10b981]"
                  />
                  <div className="bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 mt-4">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تم مسح الكود ضوئياً!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ========================================================= */}
            {/* 1. TOP HEADER: SHAM360 LOGO & HEADLINE */}
            {/* ========================================================= */}
            <div className="w-full pt-4 px-4 flex flex-col items-center text-center z-20">
              {/* SHAM360 Official Brand Logo Emblem */}
              <div className="relative w-14 h-14 flex items-center justify-center mb-1 filter drop-shadow-[0_2px_6px_rgba(0,102,255,0.25)]">
                <LogoIcon size={52} />
              </div>

              {/* Title: "My Digital Profile" */}
              <h2
                className="text-[17px] sm:text-[19px] font-black text-[#0B2F7D] tracking-tight leading-tight"
                style={{ fontFamily: "'Inter', 'Montserrat', 'Segoe UI', sans-serif" }}
              >
                {title}
              </h2>

              {/* Subtitle: "Scan • Tap • Connect" */}
              <p className="text-[10.5px] sm:text-[11.5px] font-semibold text-slate-500 mt-0.5 tracking-wider">
                {subtitle}
              </p>
            </div>

            {/* ========================================================= */}
            {/* 2. CENTER: QR CODE WITH BRACKETS & QR / NFC LABELS */}
            {/* ========================================================= */}
            <div className="w-full px-3 py-1 flex items-center justify-between z-20">
              {/* Left Side Callout: QR Scanner Phone */}
              <div className="flex flex-col items-center flex-1 pr-1">
                <span className="text-[11px] font-black text-[#0B2F7D] tracking-wider mb-1">
                  QR
                </span>
                {/* Hand Holding Phone with QR Graphic */}
                <div className="w-9 h-11 relative flex items-center justify-center text-[#0066FF]">
                  <svg
                    viewBox="0 0 48 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full stroke-[#0066FF]"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Smartphone Body */}
                    <rect x="10" y="4" width="24" height="42" rx="4" fill="#ffffff" />
                    {/* Mini QR code pattern on phone screen */}
                    <rect x="15" y="11" width="14" height="14" rx="1.5" strokeWidth="2" />
                    <rect x="18" y="14" width="3" height="3" fill="#0066FF" stroke="none" />
                    <rect x="23" y="14" width="3" height="3" fill="#0066FF" stroke="none" />
                    <rect x="18" y="19" width="3" height="3" fill="#0066FF" stroke="none" />
                    {/* Hand gripping from bottom/side */}
                    <path d="M 6 36 C 6 32 10 32 10 32 L 10 40" strokeWidth="2.4" />
                    <path d="M 6 41 C 6 38 10 38 10 38" strokeWidth="2.4" />
                    <path d="M 6 45 C 6 42 10 42 10 42" strokeWidth="2.4" />
                    <path d="M 6 46 L 6 52 C 6 54 10 54 14 54 L 30 54" strokeWidth="2.4" />
                    <path d="M 34 32 C 38 32 42 36 42 42 L 34 50" strokeWidth="2.4" />
                  </svg>
                </div>
              </div>

              {/* Centerpiece: QR Code Matrix inside Royal Blue Brackets */}
              <div
                className="relative p-2 bg-white flex items-center justify-center cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScan();
                }}
                title="انقر لتجربة مسح كود QR"
              >
                {/* 4 Blue L-Bracket Corners */}
                {/* Top-Left Bracket */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[3.5px] border-l-[3.5px] border-[#0066FF] rounded-tl-[6px]" />
                {/* Top-Right Bracket */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-[3.5px] border-r-[3.5px] border-[#0066FF] rounded-tr-[6px]" />
                {/* Bottom-Left Bracket */}
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[3.5px] border-l-[3.5px] border-[#0066FF] rounded-bl-[6px]" />
                {/* Bottom-Right Bracket */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3.5px] border-r-[3.5px] border-[#0066FF] rounded-br-[6px]" />

                {/* High-Fidelity Crisp Vector QR Matrix */}
                <div className="w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] bg-white p-1 flex items-center justify-center">
                  <svg
                    viewBox="0 0 33 33"
                    className="w-full h-full shape-rendering-crispEdges text-slate-950"
                    fill="currentColor"
                  >
                    {/* Finder Pattern Top-Left */}
                    <path d="M0 0h7v7H0zM1 1v5h5V1zm1 1h3v3H2z" />
                    {/* Finder Pattern Top-Right */}
                    <path d="M26 0h7v7h-7zM27 1v5h5V1zm1 1h3v3h-3z" />
                    {/* Finder Pattern Bottom-Left */}
                    <path d="M0 26h7v7H0zM1 27v5h5v-5zm1 1h3v3H2z" />
                    
                    {/* Timing Patterns */}
                    <path d="M8 6h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1z" />
                    <path d="M6 8h1v1H6zm0 2h1v1H6zm0 2h1v1H6zm0 2h1v1H6zm0 2h1v1H6zm0 2h1v1H6zm0 2h1v1H6zm0 2h1v1H6zm0 2h1v1H6z" />

                    {/* QR Data Matrix Bits (Authentic dense pattern) */}
                    <path d="M9 1h1v2H9zm2 0h2v1h-2zm4 0h1v1h-1zm3 0h2v1h-2zm-9 3h2v1H9zm3 0h1v2h-1zm3 1h2v1h-2zm4 0h1v1h-1z" />
                    <path d="M8 8h2v2H8zm3 1h1v1h-1zm2 0h2v2h-2zm3-1h2v1h-2zm3 0h1v2h-1zm2 0h2v1h-2zm-9 3h1v1h-1zm3 0h2v2h-2zm4 0h1v1h-1z" />
                    <path d="M10 13h1v1h-1zm3 0h1v2h-1zm3 0h2v1h-2zm3 0h1v2h-1zm4 0h2v1h-2zm-12 2h2v1h-2zm4 1h1v2h-1zm3 0h2v1h-2zm3 0h1v2h-1z" />
                    <path d="M8 17h1v2H8zm2 0h2v1h-2zm4 0h1v1h-1zm3 0h2v2h-2zm3-1h1v2h-1zm3 0h2v1h-2zm-9 3h2v1h-2zm4 0h1v1h-1zm3 0h2v1h-2z" />
                    <path d="M9 22h2v1H9zm3 0h1v2h-1zm3 0h2v1h-2zm3 0h1v2h-1zm3-1h2v1h-2zm-12 3h1v2H9zm3 0h2v1h-2zm4 0h1v1h-1zm3 0h2v1h-2z" />
                    <path d="M10 26h2v1h-2zm4 0h1v2h-1zm3 0h2v1h-2zm3 0h1v2h-1zm3 0h2v1h-2zm-9 3h1v1h-1zm3 0h2v2h-2zm4 0h1v1h-1zm3 0h2v1h-2z" />
                    <path d="M9 30h2v2H9zm4 0h1v1h-1zm3 0h2v1h-2zm3 0h1v2h-1zm3 0h2v1h-2z" />
                    
                    {/* Alignment Pattern */}
                    <path d="M22 22h5v5h-5zm1 1v3h3v-3zm1 1h1v1h-1z" />
                  </svg>
                </div>
              </div>

              {/* Right Side Callout: NFC Phone Tap */}
              <div className="flex flex-col items-center flex-1 pl-1">
                <span className="text-[11px] font-black text-[#0B2F7D] tracking-wider mb-1">
                  NFC
                </span>
                {/* Hand Holding Phone with Radio Waves Graphic */}
                <div className="w-9 h-11 relative flex items-center justify-center text-[#0066FF]">
                  <svg
                    viewBox="0 0 48 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full stroke-[#0066FF]"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Radiating Waves on Top-Left */}
                    <path d="M 6 22 A 16 16 0 0 1 12 12" strokeWidth="2.6" />
                    <path d="M 2 26 A 22 22 0 0 1 10 10" strokeWidth="2.6" />
                    
                    {/* Tilted Smartphone */}
                    <g transform="rotate(12 28 26)">
                      <rect x="16" y="4" width="22" height="38" rx="3.5" fill="#ffffff" />
                      {/* NFC Signal inside phone */}
                      <path d="M 24 16 A 6 6 0 0 1 29 20" strokeWidth="2" />
                      <path d="M 24 13 A 10 10 0 0 1 32 19" strokeWidth="2" />
                      <circle cx="24" cy="20" r="1.5" fill="#0066FF" stroke="none" />
                    </g>
                    {/* Hand gripping phone */}
                    <path d="M 38 34 C 42 34 44 38 44 42" strokeWidth="2.4" />
                    <path d="M 38 39 C 42 39 44 43 44 46" strokeWidth="2.4" />
                    <path d="M 36 44 C 40 44 42 48 40 52 L 28 54" strokeWidth="2.4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. MIDDLE: BLUE CALL-TO-ACTION PILL BUTTON */}
            {/* ========================================================= */}
            <div className="w-full px-4 my-1 flex justify-center z-20">
              <div
                className="w-full py-2 px-3 bg-[#0060F6] rounded-full shadow-[0_3px_10px_rgba(0,96,246,0.35)] flex items-center justify-center transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(180deg, #0066FF 0%, #0052D4 100%)"
                }}
              >
                <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-tight whitespace-nowrap">
                  {ctaText}
                </span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. PLATFORM BADGES: 8 CIRCULAR ICONS (2 ROWS x 4) */}
            {/* ========================================================= */}
            <div className="w-full px-4 pt-1 pb-1 z-20">
              {/* Row 1: Google, Facebook, Instagram, YouTube */}
              <div className="grid grid-cols-4 gap-2.5 mb-2 justify-items-center">
                {/* 1. Google 4-Color G */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("Google Maps & تقييمات 5 نجوم")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-[0_2px_5px_rgba(0,0,0,0.08)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>

                {/* 2. Facebook */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("Facebook صفحة النشاط التجاري")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-[#1877F2] shadow-[0_2px_5px_rgba(24,119,242,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>

                {/* 3. Instagram */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("Instagram حساب إنستغرام الرسمي")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full shadow-[0_2px_5px_rgba(225,48,108,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>

                {/* 4. YouTube */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("قناة YouTube الرسمية")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-[#FF0000] shadow-[0_2px_5px_rgba(255,0,0,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              </div>

              {/* Row 2: TikTok, WhatsApp, PayPal, Web */}
              <div className="grid grid-cols-4 gap-2.5 justify-items-center">
                {/* 5. TikTok with 3D offset */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("حساب TikTok")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-black shadow-[0_2px_5px_rgba(0,0,0,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    {/* Cyan Underlay */}
                    <path
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.4a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 9.79 5.34V13.5a8.28 8.28 0 0 0 5.66 2.22V12.27a4.84 4.84 0 0 1-2.02-.45V6.69h3.02z"
                      fill="#00F2FE"
                      transform="translate(-0.6, -0.6)"
                    />
                    {/* Red Underlay */}
                    <path
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.4a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 9.79 5.34V13.5a8.28 8.28 0 0 0 5.66 2.22V12.27a4.84 4.84 0 0 1-2.02-.45V6.69h3.02z"
                      fill="#FE2C55"
                      transform="translate(0.6, 0.6)"
                    />
                    {/* Crisp White Top */}
                    <path
                      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.4a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 9.79 5.34V13.5a8.28 8.28 0 0 0 5.66 2.22V12.27a4.84 4.84 0 0 1-2.02-.45V6.69h3.02z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>

                {/* 6. WhatsApp */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("واتساب WhatsApp مباشر")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-[#25D366] shadow-[0_2px_5px_rgba(37,211,102,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                    <path d="M12.031 0C5.399 0 0 5.399 0 12.031c0 2.115.553 4.183 1.603 6.002L.07 24l6.155-1.614c1.764.962 3.754 1.469 5.806 1.469 6.632 0 12.031-5.399 12.031-12.031C24.062 5.399 18.663 0 12.031 0zm0 22.026c-1.802 0-3.568-.485-5.111-1.401l-.367-.218-3.799.997 1.014-3.702-.239-.38a9.972 9.972 0 0 1-1.534-5.291c0-5.514 4.488-10.002 10.036-10.002 5.514 0 10.002 4.488 10.002 10.002 0 5.514-4.488 10.002-10.002 10.002zm5.485-7.491c-.3-.15-1.776-.876-2.051-.976-.275-.1-.475-.15-.675.15s-.776.976-.951 1.176-.35.225-.65.075c-.3-.15-1.267-.467-2.414-1.489-.893-.797-1.496-1.781-1.671-2.081s-.019-.462.131-.611c.135-.134.3-.35.45-.525s.2-.3.3-.5c.1-.2.05-.375-.025-.525s-.675-1.626-.925-2.226c-.244-.585-.493-.505-.675-.515-.175-.01-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.501s1.075 2.899 1.225 3.099c.15.2 2.115 3.23 5.124 4.53 3.009 1.3 3.009.867 3.559.817.55-.05 1.776-.726 2.026-1.426.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
                  </svg>
                </div>

                {/* 7. PayPal */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("الدفع الإلكتروني PayPal")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-[#003087] shadow-[0_2px_5px_rgba(0,48,135,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.388 5.468 0 5.99 0h7.712c4.12 0 6.78 1.948 6.273 5.702-.458 3.39-2.73 5.485-6.077 5.485h-2.12l-1.398 8.878a.641.641 0 0 1-.634.542l-2.67.73z" />
                    <path
                      d="M17.975 5.702c-.458 3.39-2.73 5.485-6.077 5.485h-2.12l-1.398 8.878a.641.641 0 0 1-.634.542l-2.67.73H.47a.641.641 0 0 1-.633-.74L2.944 3.901C3.026 3.388 3.468 3 3.99 3h7.712c4.12 0 6.78 1.948 6.273 2.702z"
                      fill="#0079C1"
                    />
                  </svg>
                </div>

                {/* 8. Web / Globe */}
                <div
                  onMouseEnter={() => setActiveBadgeTooltip("الموقع الإلكتروني الرسمي")}
                  onMouseLeave={() => setActiveBadgeTooltip(null)}
                  className="w-8 h-8 rounded-full bg-[#64748B] shadow-[0_2px_5px_rgba(100,116,139,0.35)] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>

              {/* Active Badge Hover Tooltip */}
              <div className="h-4 flex items-center justify-center mt-1">
                {activeBadgeTooltip ? (
                  <span className="text-[10px] font-bold text-blue-600 animate-fadeIn">
                    {activeBadgeTooltip}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400 font-medium">
                    انقر على أي منصة للتواصل
                  </span>
                )}
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. BOTTOM GRAPHIC: DYNAMIC ROYAL BLUE & NAVY WAVE SWOOSH */}
            {/* ========================================================= */}
            <div className="w-full relative h-10 overflow-hidden mt-auto z-20">
              <svg
                viewBox="0 0 300 60"
                preserveAspectRatio="none"
                className="w-full h-full"
                fill="none"
              >
                {/* Light Cyan/Blue Accent Underwave */}
                <path
                  d="M 0 42 Q 75 15, 150 35 T 300 18 L 300 60 L 0 60 Z"
                  fill="#60A5FA"
                  opacity="0.4"
                />
                {/* Deep Royal Blue Primary Wave */}
                <path
                  d="M 0 34 Q 85 8, 170 32 T 300 24 L 300 60 L 0 60 Z"
                  fill="#0066FF"
                />
                {/* Deep Navy Dark Bottom Wave */}
                <path
                  d="M 0 45 Q 110 22, 210 40 T 300 35 L 300 60 L 0 60 Z"
                  fill="#00358E"
                />
              </svg>
            </div>
          </div>

          {/* ========================================================= */}
          {/* L-SHAPED ACRYLIC BEND & FORWARD-PROJECTING FOOT (3D MODE) */}
          {/* ========================================================= */}
          {perspective === "3d" && (
            <div
              className="relative -mt-[1px] flex flex-col items-center z-10 pointer-events-none"
              style={{
                width: `${currentSize.width}px`
              }}
            >
              {/* Acrylic Bend Seam (Rounded curve transition) */}
              <div
                className="w-full h-3 bg-gradient-to-b from-white/90 via-slate-200/90 to-slate-300/80 border-x border-slate-300 shadow-sm"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 97% 100%, 3% 100%)"
                }}
              />

              {/* Polished Clear Acrylic Horizontal Foot (Base) */}
              <div
                className="w-[96%] h-9 rounded-b-[16px] border-x border-b border-white/80 shadow-[0_14px_25px_rgba(0,0,0,0.18)] relative overflow-hidden backdrop-blur-md"
                style={{
                  background:
                    activeTheme === "light"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(241,245,249,0.85) 40%, rgba(226,232,240,0.95) 100%)"
                      : "linear-gradient(180deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.98) 100%)",
                  transform: "perspective(400px) rotateX(42deg) translateY(-6px)",
                  transformOrigin: "top center"
                }}
              >
                {/* Crystal Bevel Highlight lines */}
                <div className="absolute inset-x-2 top-0.5 h-[1.5px] bg-white/90" />
                <div className="absolute inset-x-4 bottom-1 h-[1px] bg-white/40" />

                {/* Subtle Reflected Wave Hint on the polished foot */}
                <div
                  className="absolute inset-0 opacity-25 filter blur-[1px]"
                  style={{
                    background: "linear-gradient(180deg, #0066FF 0%, transparent 80%)"
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Product Spec Card & Action Buttons below the Stand */}
      {showDetails && (
        <div className="w-full max-w-sm mt-3 px-3 flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100/90 border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-800">{serialNumber}</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">NTAG216 مزدوج</span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">تم نسخ الرابط</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ رابط الستاند</span>
                </>
              )}
            </button>

            <a
              href={qrUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>فتح البروفايل</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
