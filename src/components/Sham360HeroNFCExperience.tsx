import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  Sparkles,
  Star,
  Download,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  Compass,
  Zap,
  ShieldCheck,
  MapPin,
  Check,
  Radio,
  Share2,
  ExternalLink
} from "lucide-react";
import { LogoIcon } from "./Logo";
import { useLanguage } from "../services/LanguageContext";

interface Sham360HeroNFCExperienceProps {
  isAr?: boolean;
}

export const Sham360HeroNFCExperience: React.FC<Sham360HeroNFCExperienceProps> = ({
  isAr: propIsAr,
}) => {
  const { isAr: contextIsAr } = useLanguage();
  const isAr = propIsAr !== undefined ? propIsAr : contextIsAr;
  // Animation Phases:
  // 0: Approach (Card floats and glides toward the phone's top NFC antenna)
  // 1: Contactless Tap Moment (Shockwave rings, haptic vibration, dynamic island reacts)
  // 2: Profile Expansion (Smart Digital Profile blooms smoothly on phone screen)
  // 3: Live Profile Active (Highlights actions like vCard save and contact options)
  const [phase, setPhase] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [vcardSaved, setVcardSaved] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const handleDownloadVCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:الحلبي;أكرم;مهندس;;
FN:م. أكرم الحلبي
ORG:تقنيات المستقبل الذكية - SHAM360
TITLE:كبير مهندسي الأنظمة الذكية & IoT
TEL;TYPE=CELL,VOICE:+963933888999
EMAIL:akram@smart-syria.com
URL:https://sham360.online/p/akram-engineer
ADR;TYPE=WORK:;;المزة - أوتوستراد المزة;دمشق;;;سوريا
NOTE:تم نقل جهة الاتصال مباشرة عبر بطاقة SHAM360 الذكية NFC بتقنية NTAG216 فائقة السرعة.
END:VCARD`;

    const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Akram_AlHalabi_Sham360.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setVcardSaved(true);
  };

  // Orchestrated Autonomous Animation Loop
  useEffect(() => {
    if (isHovered) return; // Pause on hover so visitor can read with zero stress

    const clearAllTimers = () => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
    };

    const runSequence = () => {
      clearAllTimers();
      setPhase(0);
      setVcardSaved(false);

      // 0 -> 1: Tap moment at 2.4s
      timerRef.current.push(
        setTimeout(() => {
          setPhase(1);
        }, 2400)
      );

      // 1 -> 2: Profile blooms at 3.4s
      timerRef.current.push(
        setTimeout(() => {
          setPhase(2);
        }, 3400)
      );

      // 2 -> 3: Highlight action at 5.0s
      timerRef.current.push(
        setTimeout(() => {
          setPhase(3);
          setVcardSaved(true);
        }, 5200)
      );

      // Reset loop at 9.2s
      timerRef.current.push(
        setTimeout(() => {
          runSequence();
        }, 9400)
      );
    };

    runSequence();

    return () => {
      clearAllTimers();
    };
  }, [isHovered]);

  return (
    <div
      className="relative w-full max-w-[450px] mx-auto flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="ltr"
    >
      {/* Dynamic Atmospheric Radiance Backlights */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main 3D Perspective Stage */}
      <div className="relative w-full h-[520px] sm:h-[550px] flex items-center justify-center [perspective:1200px] overflow-visible">
        
        {/* =========================================================================
            1. THE SMARTPHONE DEVICE (Modern Titanium Frame with Dynamic Island)
            ========================================================================= */}
        <motion.div
          animate={{
            rotateX: 6,
            rotateY: -10,
            rotateZ: 2,
            scale: phase === 1 ? [1, 0.98, 1.01, 1] : 1,
            y: phase === 1 ? [0, 4, -2, 0] : [0, -6, 0],
          }}
          transition={{
            y: phase === 1 ? { duration: 0.3 } : { repeat: Infinity, duration: 5, ease: "easeInOut" },
            scale: { duration: 0.3 },
            rotateX: { duration: 0.6 },
            rotateY: { duration: 0.6 },
          }}
          className="relative w-[285px] sm:w-[310px] h-[480px] sm:h-[510px] bg-slate-950 rounded-[44px] p-2.5 shadow-[0_30px_70px_-15px_rgba(0,102,255,0.3),0_0_0_1px_rgba(255,255,255,0.15)] border-[4px] border-slate-800/90 flex flex-col overflow-hidden z-10"
        >
          {/* Top Dynamic Island with Smart Handshake Morph */}
          <motion.div
            animate={{
              width: phase >= 1 && phase < 3 ? "200px" : "110px",
              height: phase >= 1 && phase < 3 ? "28px" : "24px",
              backgroundColor: phase === 1 ? "#064e3b" : "#000000",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-3.5 left-1/2 -translate-x-1/2 rounded-full z-50 flex items-center justify-between px-3 shadow-lg border border-white/10 overflow-hidden"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {phase === 0 && (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-cyan-300 font-bold tracking-wider">
                    NFC READY
                  </span>
                </>
              )}

              {phase === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 text-emerald-400 text-[9px] font-black"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">SHAM360 NFC • 0.22s</span>
                </motion.div>
              )}

              {phase >= 2 && (
                <div className="flex items-center gap-1 text-cyan-300 text-[8px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>LIVE PROFILE</span>
                </div>
              )}
            </div>

            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 shrink-0" />
          </motion.div>

          {/* Smartphone Screen Canvas */}
          <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-[36px] overflow-hidden flex flex-col pt-8 pb-3 px-2.5 border border-slate-800/60 text-start">
            
            {/* Ambient Background Cyber Netting */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Status Bar */}
            <div className="flex items-center justify-between px-2 text-[10px] text-slate-400 font-medium mb-2">
              <span className="font-semibold text-white/80">9:41</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Wifi className="w-3 h-3 text-cyan-400" />
                <span className="text-[9px] font-mono">5G</span>
                <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Tap Point NFC Shockwave Rings */}
            <AnimatePresence>
              {phase === 1 && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none z-40">
                  <motion.div
                    initial={{ scale: 0.1, opacity: 1 }}
                    animate={{ scale: 3.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-[0_0_35px_#06b6d4]"
                  />
                  <motion.div
                    initial={{ scale: 0.1, opacity: 0.9 }}
                    animate={{ scale: 2.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                    className="absolute inset-0 w-28 h-28 rounded-full border-2 border-blue-400 shadow-[0_0_25px_#3b82f6]"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyan-400/50 blur-lg animate-ping" />
                </div>
              )}
            </AnimatePresence>

            {/* STATE A: Standby Radar Screen (Before Tap) */}
            {phase === 0 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-2"
              >
                {/* Pulsing NFC Sensing Sphere */}
                <div className="relative mb-5">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                  >
                    <Radio className="w-9 h-9 animate-pulse" />
                  </motion.div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 animate-ping" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950" />
                </div>

                <h4 className="text-xs font-bold text-white tracking-wide mb-1">
                  جاهز للتلامس اللاسلكي الفوري
                </h4>
                <p className="text-[10px] text-slate-400 max-w-[200px] leading-relaxed mb-3">
                  تقترب بطاقة SHAM360 الذكية الآن لنقل الهوية الرقمية في أجزاء من الثانية
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[9px] text-cyan-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>NFC CHIP: NTAG216 (0.22s)</span>
                </div>
              </motion.div>
            )}

            {/* STATE B: Handshake Confirmation (Moment of Tap) */}
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-3"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Zap className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="text-sm font-black text-white mb-1">
                  تم التلامس الذكي بنجاح!
                </h4>
                <p className="text-[10px] text-emerald-300 font-mono font-bold">
                  ⚡ 0.22s CONTACTLESS SPEED
                </p>
                <div className="mt-3 w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>
              </motion.div>
            )}

            {/* STATE C: THE SMART PROFILE REVEAL (Phase 2 & 3 - Creative & Professional) */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ y: 320, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 320, opacity: 0 }}
                  transition={{ type: "spring", damping: 24, stiffness: 240 }}
                  className="absolute inset-x-0 bottom-0 top-12 bg-white rounded-t-[32px] p-3.5 text-slate-900 shadow-2xl z-40 flex flex-col overflow-y-auto no-scrollbar"
                  dir={isAr ? "rtl" : "ltr"}
                >
                  {/* Decorative Pull Handle */}
                  <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-2 shrink-0" />

                  {/* Instant Contactless Toast Pill */}
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-xl text-[10px] font-bold text-emerald-800 mb-2.5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{isAr ? "اتصال ذكي مباشر وموثق" : "Verified Direct Smart NFC"}</span>
                    </div>
                    <span className="font-mono text-[9px] bg-emerald-200/60 px-1.5 py-0.5 rounded text-emerald-900 font-bold">
                      0.22s
                    </span>
                  </div>

                  {/* Cover Banner with Damascene Architecture */}
                  <div className="relative h-20 w-full rounded-2xl overflow-hidden bg-slate-900 mb-2 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
                      alt="Damascus Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-2 start-2">
                      <span className="px-2 py-0.5 rounded-full bg-white/95 text-[9px] font-bold text-slate-900 flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                        <span>{isAr ? "مهندس معتمد SHAM360" : "SHAM360 Certified Engineer"}</span>
                      </span>
                    </div>
                  </div>

                  {/* Profile Identity Bar */}
                  <div className="flex items-start gap-2.5 mb-2.5 shrink-0">
                    <div className="relative -mt-6">
                      <div className="w-13 h-13 rounded-2xl p-0.5 bg-white shadow-md border border-slate-100 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                          alt="Eng. Akram"
                          className="w-full h-full rounded-[14px] object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -end-1 w-4.5 h-4.5 rounded-full bg-[#0066FF] border-2 border-white flex items-center justify-center text-white shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-1">
                        <h5 className="text-xs font-black text-slate-900 truncate">
                          {isAr ? "م. أكرم الحلبي" : "Eng. Akram Al-Halabi"}
                        </h5>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                      </div>
                      <p className="text-[10px] font-semibold text-[#0066FF] truncate leading-tight">
                        {isAr ? "كبير مهندسي الأنظمة الذكية & IoT" : "Lead Smart Systems & IoT Engineer"}
                      </p>
                      <p className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                        <span>{isAr ? "دمشق - المزة • تقنيات المستقبل" : "Damascus - Mazzeh • Future Tech"}</span>
                      </p>
                    </div>
                  </div>

                  {/* High-Impact vCard Save Button */}
                  <motion.button
                    id="hero-nfc-save-vcard-btn"
                    type="button"
                    onClick={handleDownloadVCard}
                    animate={
                      vcardSaved
                        ? { scale: [1, 1.03, 1], backgroundColor: "#059669" }
                        : { scale: 1, backgroundColor: "#0066FF" }
                    }
                    className="w-full py-2.5 px-3 rounded-xl text-white font-bold text-[11px] shadow-md shadow-[#0066FF]/20 flex items-center justify-center gap-2 mb-2 shrink-0 cursor-pointer active:scale-95 transition-transform"
                    title={isAr ? "انقر لحفظ جهة الاتصال مباشرة إلى هاتفك" : "Click to save contact directly to your phone"}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {vcardSaved
                        ? isAr
                          ? "تم حفظ جهة الاتصال في هاتفك بنجاح ✓"
                          : "Contact Saved to Phone Successfully ✓"
                        : isAr
                        ? "حفظ جهة الاتصال (.vcf) فوراً"
                        : "Save Contact (.vcf) Now"}
                    </span>
                  </motion.button>

                  {/* 3 Quick Action Round Buttons */}
                  <div id="hero-nfc-quick-contacts" className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200/80 mb-2 shrink-0 text-center">
                    <a
                      id="hero-nfc-whatsapp-link"
                      href="https://wa.me/963933888999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-lg flex flex-col items-center hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs mb-0.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-800">{isAr ? "واتساب" : "WhatsApp"}</span>
                    </a>

                    <a
                      id="hero-nfc-phone-link"
                      href="tel:+963933888999"
                      className="p-1 rounded-lg flex flex-col items-center hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-xs mb-0.5">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-800">{isAr ? "اتصال" : "Call"}</span>
                    </a>

                    <a
                      id="hero-nfc-email-link"
                      href="mailto:akram@smart-syria.com"
                      className="p-1 rounded-lg flex flex-col items-center hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs mb-0.5">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-800">{isAr ? "إيميل" : "Email"}</span>
                    </a>
                  </div>

                  {/* Google Reviews 5-Star Rating Card */}
                  <div id="hero-nfc-google-reviews" className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-2 flex items-center justify-between mb-2 shrink-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-950">
                      <span>⭐</span>
                      <span>{isAr ? "تقييم Google (5.0):" : "Google Rating (5.0):"}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* 360° Damascene House Tour Badge */}
                  <a
                    id="hero-nfc-vr-tour-link"
                    href="#360-vr"
                    className="bg-cyan-50/90 border border-cyan-200 rounded-xl p-2 flex items-center justify-between shrink-0 hover:bg-cyan-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-950">
                      <Compass className="w-3.5 h-3.5 text-cyan-600 animate-spin" style={{ animationDuration: "10s" }} />
                      <span>{isAr ? "جولة 360° VR بالبيت الدمشقي" : "360° VR Damascene House Tour"}</span>
                    </div>
                    <span className="text-[9px] bg-cyan-600 text-white font-bold px-2 py-0.5 rounded-full">
                      {isAr ? "استكشف" : "Explore"}
                    </span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Home Indicator Bar */}
            <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-auto shrink-0" />
          </div>
        </motion.div>

        {/* =========================================================================
            2. THE SHAM360 SMART NFC CARD (Approaching, Tapping, then Floating)
            ========================================================================= */}
        <motion.div
          animate={{
            // Position tracking across phases:
            // Phase 0 (Approach): Gliding smoothly in from top-right towards the phone
            // Phase 1 (Tap Moment): Precise contact against the top NFC antenna
            // Phase 2 & 3 (Profile Active): Rests in an elevated 3D supportive floating display
            x: phase === 0 ? 150 : phase === 1 ? 25 : 75,
            y: phase === 0 ? -120 : phase === 1 ? -60 : -130,
            rotateZ: phase === 0 ? -26 : phase === 1 ? -6 : -14,
            rotateX: phase === 0 ? 18 : phase === 1 ? 8 : 12,
            rotateY: phase === 0 ? -24 : phase === 1 ? -8 : -16,
            scale: phase === 1 ? 0.94 : 1,
            boxShadow:
              phase === 1
                ? "0 0 45px rgba(6,182,212,0.6), 0 25px 50px rgba(0,0,0,0.6)"
                : "0 25px 50px -10px rgba(0,0,0,0.5)",
          }}
          transition={{
            type: "spring",
            damping: 19,
            stiffness: 130,
            mass: 0.85,
          }}
          className="absolute z-30 w-[240px] sm:w-[260px] h-[152px] sm:h-[164px] rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#070D18] to-[#040810] text-white p-3 shadow-2xl border border-slate-700/80 flex flex-col justify-between items-center text-center overflow-hidden"
        >
          {/* Metallic Edge Chamfer Highlight */}
          <div className="absolute inset-[1px] rounded-2xl border border-white/15 pointer-events-none" />

          {/* Holographic Light Beam Sweeping Across Card */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Top: 3D SHAM360 Official Brand Emblem */}
          <div className="relative z-10 flex flex-col items-center mt-1">
            <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(0,102,255,0.5)]">
              <LogoIcon size={38} light={true} />
            </div>
          </div>

          {/* Card Label: SHAM360 SMART DIGITAL PRESENCE */}
          <div className="relative z-10 text-center w-full">
            <span className="text-[10px] font-black tracking-[0.22em] text-white font-sans uppercase block drop-shadow-md">
              SMART DIGITAL PRESENCE
            </span>
          </div>

          {/* Center Contactless NFC Wave Symbol */}
          <div className="relative z-10 flex items-center justify-center my-0.5">
            <div className="w-7.5 h-7.5 rounded-full border-2 border-white/95 flex items-center justify-center bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.25)]">
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

          {/* Bottom Card Motto: TAP • CONNECT • SHARE */}
          <div className="relative z-10 text-center w-full mb-0.5 flex items-center justify-between px-2 text-[8px] font-mono text-slate-400">
            <span className="text-cyan-400 font-bold">SHAM360</span>
            <span className="text-white/90 font-sans font-bold tracking-widest text-[8px]">
              TAP. CONNECT. SHARE.
            </span>
            <span>NTAG216</span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          3. ZERO-EFFORT TIMELINE MONITOR (Visitor watches without pressing anything)
          ========================================================================= */}
      <div className="w-full mt-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-3 shadow-sm flex flex-col gap-2">
        {/* Step Indicator Pills */}
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div
            className={`py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
              phase === 0
                ? "bg-blue-600 text-white shadow-xs font-black"
                : "bg-slate-800/60 text-slate-400"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="truncate">1. تقريب البطاقة</span>
          </div>

          <div
            className={`py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
              phase === 1
                ? "bg-emerald-600 text-white shadow-xs font-black"
                : "bg-slate-800/60 text-slate-400"
            }`}
          >
            <Zap className="w-3 h-3" />
            <span className="truncate">2. تلامس NFC (0.22s)</span>
          </div>

          <div
            className={`py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
              phase >= 2
                ? "bg-[#0066FF] text-white shadow-xs font-black"
                : "bg-slate-800/60 text-slate-400"
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="truncate">3. ظهور البروفايل</span>
          </div>
        </div>

        {/* Live Status Description Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-300 px-1 pt-1 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">
              {phase === 0 && "محاكاة تلقائية: اقتراب بطاقة SHAM360 الذكية من الهاتف..."}
              {phase === 1 && "⚡ تفريغ إشارة NFC اللاسلكية فوراً (0.22 ثانية)"}
              {phase >= 2 && "✓ تم فتح البروفايل الرقمي الذكي بالكامل دون أي تطبيق مسبق"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-cyan-400">
            {isHovered ? "موقوف مؤقتاً للمعاينة" : "يعمل تلقائياً ⚡"}
          </span>
        </div>
      </div>
    </div>
  );
};
