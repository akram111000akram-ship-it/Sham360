import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "../services/router";
import { useLanguage } from "../services/LanguageContext";
import {
  Zap,
  Lock,
  AlertCircle,
  ExternalLink,
  Globe,
  Radio,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Wifi,
  CreditCard,
  Building2,
  Key,
  Tag,
  Sparkles,
  Cpu
} from "lucide-react";
import {
  lookupNFCToken,
  bindTokenToUserWithGoogle,
  NFCToken
} from "../services/nfcTokenService";
import {
  loginWithGoogle,
  getCurrentUser,
  subscribeToAuthChanges,
  logout
} from "../services/authService";

export const ActivateCardPage: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const { isAr, toggleLanguage } = useLanguage();

  const urlToken = currentRoute.params.token || "";

  // Token state - default to provided token or demo initial identifier
  const [cardToken, setCardToken] = useState(urlToken || "sham_a8f9b1c2d3");
  const [tokenInfo, setTokenInfo] = useState<NFCToken | null>(null);

  // Auth & Activation State
  const [currentUser, setCurrentUser] = useState<any>(getCurrentUser());
  const [isActivating, setIsActivating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active hardware category preview in the animated visual (defaults to detected token's type or 'all')
  const [activeProductType, setActiveProductType] = useState<string>("all");

  useEffect(() => {
    if (tokenInfo?.cardType) {
      setActiveProductType(tokenInfo.cardType);
    }
  }, [tokenInfo?.cardType]);

  // Sync auth state
  useEffect(() => {
    const unsub = subscribeToAuthChanges((u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  // Inspect token when token changes or on mount
  useEffect(() => {
    const tokenToLookup = urlToken || cardToken;
    if (tokenToLookup) {
      setCardToken(tokenToLookup);
      checkTokenStatus(tokenToLookup);
    }
  }, [urlToken]);

  const checkTokenStatus = async (tokenStr: string) => {
    const clean = tokenStr.trim().toLowerCase();
    if (!clean) return;

    setErrorMessage(null);
    try {
      const record = await lookupNFCToken(clean);
      if (record) {
        setTokenInfo(record);
      } else {
        // If not found in DB, create initial placeholder token info
        setTokenInfo({
          id: clean,
          token: clean,
          pinHash: "",
          status: "unassigned",
          cardType: "metal",
          batchNumber: "SHAM-2026-N1",
          notes: isAr ? "منتج ذكي جديد جاهز للربط الفوري" : "New smart product ready for instant binding",
          createdAt: new Date().toISOString()
        });
      }
    } catch (e: any) {
      console.warn("Token check error:", e);
    }
  };

  /**
   * Google-First Activation Handler:
   * Single click signs in with Google, binds the smart product token to the user account,
   * and opens the Profile Editor in Dashboard immediately.
   */
  const handleGoogleActivation = async () => {
    const cleanToken = cardToken.trim().toLowerCase();
    if (!cleanToken) {
      setErrorMessage(
        isAr ? "يرجى تحديد أو إدخال رمز المنتج." : "Please provide a valid product token."
      );
      return;
    }

    setIsActivating(true);
    setErrorMessage(null);

    try {
      // 1. Authenticate with Google
      let user = currentUser;
      if (!user) {
        user = await loginWithGoogle();
        setCurrentUser(user);
      }

      if (!user?.uid) {
        throw new Error(
          isAr
            ? "تعذر التحقق من حساب Google. يرجى إعادة المحاولة."
            : "Could not authenticate with Google. Please retry."
        );
      }

      // 2. Bind product token to this Google user's account and profile
      const bindResult = await bindTokenToUserWithGoogle(cleanToken, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });

      if (!bindResult.success) {
        setErrorMessage(isAr ? bindResult.messageAr : bindResult.messageEn);
        setIsActivating(false);
        return;
      }

      // 3. Immediately redirect to the Profile Editor in Dashboard!
      navigate(
        `/dashboard?slug=${encodeURIComponent(bindResult.profileSlug)}&activated=true&edit=true`
      );
    } catch (err: any) {
      console.error("[SHAM360 Activation Error]", err);
      setErrorMessage(
        err.message ||
          (isAr
            ? "حدث خطأ أثناء الاتصال بحساب Google. يرجى المحاولة مجدداً."
            : "An error occurred while connecting Google account. Please retry.")
      );
      setIsActivating(false);
    }
  };

  const isAlreadyActive =
    tokenInfo?.status === "active" &&
    tokenInfo.ownerUid &&
    currentUser?.uid &&
    tokenInfo.ownerUid !== currentUser.uid;

  const getProductTypeLabel = () => {
    if (!tokenInfo?.cardType) {
      return isAr ? "منتج ذكي SHAM360" : "SHAM360 Smart Product";
    }
    switch (tokenInfo.cardType) {
      case "wood":
        return isAr ? "بطاقة خشب دمشقي فاخر" : "Damascene Wood Card";
      case "stand":
        return isAr ? "ستاند طاولة أكريليك ذكي" : "Smart Table Stand";
      case "keychain":
        return isAr ? "ميدالية مفاتيح ذكية" : "Smart Keychain";
      case "sticker":
        return isAr ? "ملصق NFC ذكي" : "Universal NFC Tag";
      case "metal":
      default:
        return isAr ? "بطاقة معدن غير لامع فاخر" : "Matte Black Metal Card";
    }
  };

  const getHardwareShortTitle = (type: string) => {
    switch (type) {
      case "wood":
        return isAr ? "خشب دمشقي" : "Wood";
      case "stand":
        return isAr ? "ستاند طاولة" : "Stand";
      case "keychain":
        return isAr ? "ميدالية" : "Keychain";
      case "sticker":
        return isAr ? "ملصق ذكي" : "Tag";
      case "card":
      case "metal":
        return isAr ? "بطاقة معدنية" : "Card";
      case "all":
      default:
        return isAr ? "جهاز ذكي" : "Smart NFC";
    }
  };

  const getHardwareIcon = (type: string) => {
    switch (type) {
      case "wood":
      case "card":
      case "metal":
        return <CreditCard className="w-5 h-5 text-cyan-400" />;
      case "stand":
        return <Building2 className="w-5 h-5 text-cyan-400" />;
      case "keychain":
        return <Key className="w-5 h-5 text-cyan-400" />;
      case "sticker":
        return <Tag className="w-5 h-5 text-cyan-400" />;
      case "all":
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const cycleNextProduct = () => {
    const types = ["all", "card", "stand", "keychain", "sticker"];
    const idx = types.indexOf(activeProductType);
    const nextIdx = (idx + 1) % types.length;
    setActiveProductType(types[nextIdx]);
  };

  const getProductDisplayLabel = () => {
    if (activeProductType !== "all") {
      switch (activeProductType) {
        case "wood":
          return isAr ? "بطاقة خشب دمشقي فاخر" : "Damascene Wood Card";
        case "stand":
          return isAr ? "ستاند طاولة أكريليك ذكي" : "Smart Table Stand";
        case "keychain":
          return isAr ? "ميدالية مفاتيح ذكية" : "Smart Keychain";
        case "sticker":
          return isAr ? "ملصق NFC ذكي" : "Universal NFC Tag";
        case "card":
        case "metal":
        default:
          return isAr ? "بطاقة معدن غير لامع فاخر" : "Matte Black Metal Card";
      }
    }
    return getProductTypeLabel();
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 font-sans ${
        isAr ? "[direction:rtl] text-right" : "[direction:ltr] text-left"
      }`}
    >
      {/* Top Ambient Glow matching site branding */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-100/50 via-slate-50/50 to-transparent pointer-events-none" />

      <main className="relative max-w-lg mx-auto px-4 py-8 sm:py-14">
        {/* Navigation Bar Back to Site & Language Toggle */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Seamless Bilingual Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-xs"
              title={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                NFC Gate
              </span>
            </div>
          </div>
        </div>

        {/* Header Info - General Product Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-xs">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>
              {isAr
                ? "بوابة التفعيل السريع لمنتجات SHAM360 الذكية"
                : "SHAM360 Smart Product Activation Gateway"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {isAr ? "تفعيل منتج SHAM360 الذكي" : "Activate Your SHAM360 Smart Product"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {isAr
              ? "اربط منتجك الذكي بهويتك الرقمية بلمسة واحدة عبر حساب Google، لتفتح محرر ملفك الشخصي فوراً."
              : "Link your smart product to your digital identity in one tap via Google, and open your Profile Editor immediately."}
          </p>
        </div>

        {/* Universal Animated NFC Hardware Visual / Proximity Nexus */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[420px] mx-auto rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden select-none"
          >
            {/* Ambient Background Aura & Glows */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Circuit / Damascus Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top Bar: Brand & Hardware Protocol Telemetry */}
            <div className="flex items-center justify-between relative z-10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0066FF] to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-500/30">
                  360
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider text-white block leading-none">
                    SHAM360
                  </span>
                  <span className="text-[9px] text-cyan-400 font-mono font-medium">
                    SMART NFC GATEWAY
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 text-[10px] text-cyan-300 font-mono shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>13.56 MHz NFC</span>
              </div>
            </div>

            {/* Center Stage: Animated Contactless NFC Proximity Tap Wave */}
            <div className="relative py-6 sm:py-8 flex items-center justify-center">
              {/* Radiating Expanding Pulse Waves (Pulsing NFC Radiation) */}
              <motion.div
                animate={{
                  scale: [1, 1.45, 1.95],
                  opacity: [0.65, 0.25, 0]
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-cyan-400/40 pointer-events-none"
              />
              <motion.div
                animate={{
                  scale: [1, 1.5, 2.15],
                  opacity: [0.5, 0.15, 0]
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.85
                }}
                className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-blue-500/30 pointer-events-none"
              />

              {/* Orbiting Interaction Satellites */}
              <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
                {/* Left Floating Device (Smartphone Tap) */}
                <motion.div
                  animate={{
                    x: [0, 4, 0],
                    rotate: [-3, 0, -3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center gap-1 bg-slate-950/90 border border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-xl backdrop-blur-xs"
                >
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <span className="text-[9px] font-mono text-slate-300 font-semibold">
                    {isAr ? "الهاتف" : "Phone"}
                  </span>
                </motion.div>

                {/* Right Floating Product Icon */}
                <motion.div
                  animate={{
                    x: [0, -4, 0],
                    rotate: [3, 0, 3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="flex flex-col items-center gap-1 bg-slate-950/90 border border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-xl backdrop-blur-xs"
                >
                  {getHardwareIcon(activeProductType)}
                  <span className="text-[9px] font-mono text-slate-300 font-semibold">
                    {getHardwareShortTitle(activeProductType)}
                  </span>
                </motion.div>
              </div>

              {/* Glowing Core NFC Chip Nexus */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-2 border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col items-center justify-center p-3 text-center cursor-pointer group"
                onClick={cycleNextProduct}
                title={isAr ? "انقر للتبديل بين أنواع المنتجات الذكية" : "Click to cycle smart product types"}
              >
                {/* Rotating Border Glow Ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 animate-pulse pointer-events-none" />

                {/* Wave Lines Animation Icon */}
                <div className="relative flex items-center justify-center mb-1.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                    <Wifi className="w-5 h-5 -rotate-45 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
                </div>

                <span className="text-[10px] font-black text-white tracking-wide uppercase">
                  {isAr ? "لمس للاقتران" : "TAP & LINK"}
                </span>
                <span className="text-[9px] font-mono text-cyan-300 font-bold truncate max-w-full">
                  NTAG216
                </span>
              </motion.div>
            </div>

            {/* Universal Product Filter / Category Badges */}
            <div className="relative z-10 mb-4">
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {[
                  { id: "all", icon: Sparkles, ar: "كل المنتجات", en: "Universal" },
                  { id: "card", icon: CreditCard, ar: "بطاقات معدن/خشب", en: "Cards" },
                  { id: "stand", icon: Building2, ar: "ستاند طاولة", en: "Stand" },
                  { id: "keychain", icon: Key, ar: "ميدالية مفاتيح", en: "Keychain" },
                  { id: "sticker", icon: Tag, ar: "ملصق NFC", en: "Tag/Sticker" }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeProductType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveProductType(item.id as any)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20 border border-cyan-400/50"
                          : "bg-slate-950/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      <span>{isAr ? item.ar : item.en}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Telemetry & Detected Token Display */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium text-slate-300">
                  {getProductDisplayLabel()}
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>{cardToken || "sham_••••••••"}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The Production Action Card: Clean Token Badge + Google Button Only */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6">
          {/* Active Detected Product Token Badge */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 font-medium">
                  {isAr ? "معرّف المنتج الممسوح ضوئياً:" : "Detected Product Token:"}
                </p>
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 tracking-wider truncate">
                  {cardToken}
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold shrink-0">
              {tokenInfo?.status === "active"
                ? isAr
                  ? "مفعّل"
                  : "Active"
                : isAr
                ? "جاهز للربط"
                : "Ready"}
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Already active notice if token is bound to another user */}
          {isAlreadyActive && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  {isAr
                    ? "هذا المنتج مرتبط بالفعل بهوية رقمية نشطة."
                    : "This product is already linked to an active profile."}
                </p>
                <p className="text-[11px] text-amber-700">
                  {isAr
                    ? `مرتبط بالملف: /p/${tokenInfo?.profileSlug || tokenInfo?.profileId}`
                    : `Bound to profile: /p/${tokenInfo?.profileSlug || tokenInfo?.profileId}`}
                </p>
              </div>
            </div>
          )}

          {/* Logged-in User Indicator */}
          {currentUser && (
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || "Google"}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-blue-400 shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {(currentUser.displayName || currentUser.email || "G").charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-slate-900 font-bold truncate">
                    {currentUser.displayName || (isAr ? "حساب Google متصل" : "Google Account")}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  setCurrentUser(null);
                }}
                className="text-[10px] text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer shrink-0"
              >
                {isAr ? "تبديل الحساب" : "Switch Account"}
              </button>
            </div>
          )}

          {/* -------------------------------------------------------------
              THE PROMINENT "CONTINUE WITH GOOGLE" ACTIVATION BUTTON
             ------------------------------------------------------------- */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleGoogleActivation}
              disabled={isActivating || Boolean(isAlreadyActive)}
              className="w-full h-14 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.99] disabled:opacity-50 border-2 border-slate-200 hover:border-slate-300 text-slate-900 font-black text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm hover:shadow-md select-none"
            >
              {isActivating ? (
                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold">
                    {isAr
                      ? "جاري الربط مع Google وفتح محرر الملف..."
                      : "Linking Google and opening Profile Editor..."}
                  </span>
                </div>
              ) : (
                <>
                  {/* Official Google 4-Color SVG Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-slate-900 tracking-tight">
                    {currentUser
                      ? isAr
                        ? "ربط المنتج بحساب Google والمتابعة للمحرر"
                        : "Link Product with Google & Open Editor"
                      : isAr
                      ? "المتابعة عبر حساب Google"
                      : "Continue with Google"}
                  </span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              {isAr
                ? "بنقرة واحدة سيتم ربط منتج SHAM360 الذكي فورياً بحسابك وفتح محرر الملف لتخصيص بياناتك وصورك وروابطك."
                : "In one click, your SHAM360 smart product binds to your account and opens your Profile Editor immediately."}
            </p>
          </div>

          {/* Direct link to profile if already active */}
          {tokenInfo?.status === "active" && (tokenInfo.profileSlug || tokenInfo.profileId) && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                {isAr ? "المنتج مفعّل بالفعل لهذا الملف:" : "Product is active for profile:"}
              </span>
              <a
                href={`/p/${tokenInfo.profileSlug || tokenInfo.profileId}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 font-mono flex items-center gap-1 font-bold"
              >
                <span>/p/{tokenInfo.profileSlug || tokenInfo.profileId}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ActivateCardPage;
