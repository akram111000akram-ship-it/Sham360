import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  Sparkles,
  Star,
  Download,
  Share2,
  ExternalLink,
  Phone,
  MessageCircle,
  Eye,
  CheckCircle2,
  Compass,
  RotateCcw,
  Zap,
  ShieldCheck,
  Building
} from "lucide-react";
import { LogoIcon } from "./Logo";
import { useRouter } from "../services/router";

interface HeroNFCTapSimulationProps {
  isAr?: boolean;
  onOpenAssessment?: () => void;
}

export const HeroNFCTapSimulation: React.FC<HeroNFCTapSimulationProps> = ({
  isAr = true,
  onOpenAssessment
}) => {
  const { navigate } = useRouter();
  
  // Animation cycle phase:
  // 0: Idle / Card preparing
  // 1: Card approaches phone
  // 2: Tap moment & NFC radio ring pulse
  // 3: Profile card slides up on phone
  // 4: Profile interaction showcase
  const [phase, setPhase] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [savedContact, setSavedContact] = useState<boolean>(false);
  const [ratedStar, setRatedStar] = useState<number>(5);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timeouts: any[] = [];

    const runCycle = () => {
      setPhase(0);
      setSavedContact(false);

      timeouts.push(setTimeout(() => setPhase(1), 1000));
      timeouts.push(setTimeout(() => setPhase(2), 2200));
      timeouts.push(setTimeout(() => setPhase(3), 2800));
      timeouts.push(setTimeout(() => setPhase(4), 4500));
      timeouts.push(setTimeout(() => runCycle(), 9500));
    };

    runCycle();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isAutoPlay]);

  const handleManualTrigger = () => {
    setIsAutoPlay(false);
    setPhase(0);
    setSavedContact(false);

    setTimeout(() => setPhase(1), 200);
    setTimeout(() => setPhase(2), 1200);
    setTimeout(() => setPhase(3), 1800);
    setTimeout(() => setPhase(4), 3000);
  };

  const handleSaveContact = () => {
    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 3000);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none" dir="ltr">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main 3D Perspective Stage */}
      <div className="relative w-full h-[520px] sm:h-[560px] flex items-center justify-center [perspective:1200px]">
        
        {/* =========================================================
            1. THE SMARTPHONE DEVICE (Target)
            ========================================================= */}
        <motion.div
          animate={{
            rotateX: 6,
            rotateY: -10,
            rotateZ: 2,
            scale: phase === 2 ? 0.98 : 1,
            y: phase === 2 ? 4 : [0, -6, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
            scale: { duration: 0.2 },
            rotateX: { duration: 0.5 },
            rotateY: { duration: 0.5 }
          }}
          className="relative w-[280px] sm:w-[310px] h-[480px] sm:h-[510px] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-slate-800 flex flex-col overflow-hidden z-10"
        >
          {/* Dynamic Island / Top Speaker */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
            <div className="w-2 h-2 rounded-full bg-slate-900" />
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[8px] font-mono text-cyan-400 font-bold">NFC READY</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-[34px] overflow-hidden flex flex-col pt-10 pb-4 px-3 border border-slate-800/80">
            
            {/* Ambient Wallpaper Wallpaper Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Status Bar */}
            <div className="flex items-center justify-between px-2 text-[10px] text-slate-400 font-medium mb-4">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Wifi className="w-3 h-3 text-cyan-400" />
                <span className="text-[9px] font-mono">5G</span>
                <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Tap Contact Area Highlight (Top Antenna Zone) */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              
              {/* NFC Concentric Waves when Card Taps */}
              <AnimatePresence>
                {phase === 2 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
                    <motion.div
                      initial={{ scale: 0.2, opacity: 1 }}
                      animate={{ scale: 3.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_#06b6d4]"
                    />
                    <motion.div
                      initial={{ scale: 0.1, opacity: 0.9 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
                      className="absolute inset-0 w-24 h-24 rounded-full border-2 border-blue-400 shadow-[0_0_20px_#3b82f6]"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400/40 blur-md animate-ping" />
                  </div>
                )}
              </AnimatePresence>

              {/* Default Phone Screen (Before Tap) */}
              {phase < 3 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center space-y-4 py-8"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                      <Zap className="w-8 h-8 animate-pulse" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-ping" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      {isAr ? "جاهز للتلامس اللاسلكي" : "Ready for Instant Tap"}
                    </h4>
                    <p className="text-[10px] text-slate-400 max-w-[190px] leading-relaxed">
                      {isAr 
                        ? "قرّب بطاقة Sham360 الذكية من أعلى الهاتف لفتح البروفايل تلقائياً بدون تطبيقات"
                        : "Hover Sham360 card near the phone top to launch identity without any apps"}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[9px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>NFC ISO/IEC 14443 Type A</span>
                  </div>
                </motion.div>
              )}

              {/* Instant Profile Popup Sheet (After Tap - Phase 3 & 4) */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    initial={{ y: 260, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 260, opacity: 0 }}
                    transition={{ type: "spring", damping: 22, stiffness: 260 }}
                    className="absolute inset-x-0 -bottom-4 bg-white rounded-t-[28px] p-4 text-slate-900 shadow-2xl z-40 space-y-3"
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    {/* Sheet Handle */}
                    <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-1" />

                    {/* Instant Success Pill */}
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-xl text-[10px] font-bold text-emerald-800">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isAr ? "تم الاتصال الذكي فوراً" : "Instant NFC Handshake"}</span>
                      </div>
                      <span className="font-mono text-[9px] text-emerald-600">0.24s</span>
                    </div>

                    {/* Profile Header */}
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-md flex-shrink-0">
                        <span>ش</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">
                          ✓
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs font-black text-slate-900 truncate">
                            {isAr ? "فندق وقصر الياسمين الشامي" : "Al-Yasmeen Damascene Palace"}
                          </h5>
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">
                          {isAr ? "دمشق القديمة • ضيافة وتراث سوري" : "Old Damascus • Syrian Heritage"}
                        </p>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={handleSaveContact}
                        className={`py-2 px-2.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                          savedContact
                            ? "bg-emerald-600 text-white"
                            : "bg-[#0066FF] hover:bg-blue-700 text-white"
                        }`}
                      >
                        <Download className="w-3 h-3" />
                        <span>{savedContact ? (isAr ? "تم حفظ الكرت ✓" : "Saved to vCard!") : (isAr ? "حفظ جهة الاتصال" : "Save Contact")}</span>
                      </button>

                      <button
                        onClick={() => navigate("/profile")}
                        className="py-2 px-2.5 rounded-xl text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3 text-slate-600" />
                        <span>{isAr ? "عرض البروفايل" : "Open Profile"}</span>
                      </button>
                    </div>

                    {/* Google Reviews Star Trigger */}
                    <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-900">
                        <span>⭐</span>
                        <span>{isAr ? "تقييم Google مباشر:" : "Direct Google Review:"}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRatedStar(star)}
                            className="cursor-pointer hover:scale-125 transition-transform"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                star <= ratedStar ? "fill-amber-400 stroke-amber-400" : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 360° VR Tour Link */}
                    <div
                      onClick={() => {
                        const el = document.getElementById("vr-showcase");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-cyan-50/80 border border-cyan-200/80 rounded-xl p-2 flex items-center justify-between cursor-pointer hover:bg-cyan-100/60 transition-colors group"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-900">
                        <Compass className="w-3.5 h-3.5 text-cyan-600 animate-spin" style={{ animationDuration: "12s" }} />
                        <span>{isAr ? "جولة 360° Ultra HD بالبيت الدمشقي" : "360° VR Damascene House Tour"}</span>
                      </div>
                      <span className="text-[9px] bg-cyan-600 text-white font-bold px-2 py-0.5 rounded-full">
                        {isAr ? "استكشف" : "View"}
                      </span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom Home Indicator */}
            <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-auto" />
          </div>
        </motion.div>

        {/* =========================================================
            2. THE SHAM360 SMART NFC CARD (Approaching from Top-Right)
            ========================================================= */}
        <motion.div
          animate={{
            x: phase === 0 ? 160 : phase === 1 ? 50 : phase === 2 ? 0 : 20,
            y: phase === 0 ? -140 : phase === 1 ? -40 : phase === 2 ? -70 : -100,
            rotateZ: phase === 0 ? -28 : phase === 1 ? -16 : phase === 2 ? -6 : -14,
            rotateX: phase === 2 ? 8 : 15,
            rotateY: phase === 2 ? -12 : -25,
            scale: phase === 2 ? 0.96 : 1,
            boxShadow: phase === 2
              ? "0 0 35px rgba(6,182,212,0.4), 0 20px 40px rgba(0,0,0,0.5)"
              : "0 25px 50px -12px rgba(0,0,0,0.4)"
          }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 140,
            mass: 0.8
          }}
          className="absolute z-20 w-[240px] sm:w-[260px] h-[150px] sm:h-[160px] rounded-2xl bg-[#070D18] text-white p-3.5 shadow-2xl border border-slate-700/80 flex flex-col justify-between items-center text-center overflow-hidden cursor-pointer backdrop-blur-sm"
          onClick={handleManualTrigger}
          title={isAr ? "انقر لتجربة التلامس" : "Click to simulate tap"}
        >
          {/* Subtle Velvet Sheen Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.2),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-[1px] rounded-2xl border border-white/10 pointer-events-none" />

          {/* Top: 3D SHAM360 Pin with Airplane Orbit */}
          <div className="relative z-10 flex flex-col items-center mt-0.5">
            <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,102,255,0.4)]">
              <LogoIcon size={36} light={true} />
            </div>
          </div>

          {/* Upper Text: SMART DIGITAL PRESENCE */}
          <div className="relative z-10 text-center w-full">
            <span className="text-[10px] font-black tracking-[0.22em] text-white font-sans uppercase block drop-shadow-md">
              SMART DIGITAL PRESENCE
            </span>
          </div>

          {/* Center Contactless Wave Circle */}
          <div className="relative z-10 flex items-center justify-center my-0.5">
            <div className="w-8 h-8 rounded-full border-2 border-white/95 flex items-center justify-center bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
              >
                <path
                  d="M 16 26 A 7 7 0 0 0 16 14"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 21 29 A 12 12 0 0 0 21 11"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 26 32 A 17 17 0 0 0 26 8"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Bottom Text: TAP. CONNECT. SHARE. */}
          <div className="relative z-10 text-center w-full mb-0.5">
            <span className="text-[9px] font-black tracking-[0.18em] text-white/90 font-sans uppercase block drop-shadow-md">
              TAP. CONNECT. SHARE.
            </span>
          </div>
        </motion.div>

      </div>

      {/* Interactive Controls & Status Legend Below Demo */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 px-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {phase < 2 
              ? (isAr ? "جار محاكاة اقتراب البطاقة الذكية..." : "Simulating NFC Card approach...")
              : phase === 2 
              ? (isAr ? "⚡ تلامس وتفريغ الإشارة (NFC Impact)" : "⚡ NFC Signal Handshake")
              : (isAr ? "✓ فُتح البروفايل فوراً دون أي تطبيق" : "✓ Profile launched without any app")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleManualTrigger}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isAr ? "إعادة محاكاة التلامس ⚡" : "Replay Tap Simulation ⚡"}</span>
          </button>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
              isAutoPlay
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-slate-50 text-slate-500 border-slate-200"
            }`}
          >
            {isAutoPlay ? (isAr ? "تكرار تلقائي ✓" : "Auto Loop ON") : (isAr ? "إيقاف مؤقت" : "Paused")}
          </button>
        </div>
      </div>
    </div>
  );
};
