import React, { useState } from "react";
import { useRouter, NavLink } from "../services/router";
import { useLanguage } from "../services/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import {
  Globe,
  CreditCard,
  Compass,
  LayoutDashboard,
  Languages,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  UserCheck,
  Zap,
  ShieldCheck
} from "lucide-react";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const { currentRoute, navigate } = useRouter();
  const { isAr, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Unified Multi-Page Absolute Routes
  const navItems = [
    {
      id: "home",
      labelAr: "الرئيسية",
      labelEn: "Home",
      path: "/",
      icon: Globe,
      exact: true
    },
    {
      id: "products",
      labelAr: "منتجات NFC",
      labelEn: "NFC Products",
      path: "/products",
      icon: CreditCard,
      exact: false
    },
    {
      id: "profile",
      labelAr: "البروفايل الذكي",
      labelEn: "Smart Profile",
      path: "/profile",
      icon: UserCheck,
      exact: false
    },
    {
      id: "activate",
      labelAr: "تفعيل البطاقة",
      labelEn: "Activate NFC",
      path: "/activate",
      icon: Zap,
      exact: false
    },
    {
      id: "directory",
      labelAr: "دليل الأعمال والفعاليات",
      labelEn: "Directory & Events",
      path: "/directory",
      icon: Compass,
      exact: false
    },
    {
      id: "dashboard",
      labelAr: "لوحة التحكم",
      labelEn: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      exact: false
    }
  ];

  const handleOrderCardClick = () => {
    const message = "مرحباً SHAM360، أرغب في طلب بطاقة NFC الذكية المخصصة والاطلاع على أحدث باقات الأعمال.";
    const url = `https://wa.me/963933888999?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (itemPath: string, exact: boolean) => {
    if (exact) {
      return currentRoute.path === itemPath;
    }
    return currentRoute.path === itemPath || currentRoute.path.startsWith(`${itemPath}/`);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full bg-white/92 backdrop-blur-xl border-b border-slate-200/80 text-slate-800 shadow-xs transition-all duration-200 font-sans ${className}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* =========================================================================
            1. BRAND LOGO (OFFICIAL SHAM360 LOGO & SPAN)
            ========================================================================= */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group cursor-pointer transition-transform hover:opacity-95 text-start"
            title={isAr ? "الصفحة الرئيسية - Sham360" : "Home - Sham360"}
          >
            <Logo iconSize={38} isAr={isAr} light={false} />
          </button>
        </div>

        {/* =========================================================================
            2. DESKTOP ROUTE SWITCHER (Clean Multi-Page Routing with Active Pill Indicator)
            ========================================================================= */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/80 shadow-xs"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.path, item.exact);

            return (
              <NavLink
                key={item.id}
                href={item.path}
                exact={item.exact}
                className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-slate-600 hover:text-slate-950 hover:bg-white/80"
                activeClassName="!bg-[#0066FF] !text-white shadow-sm shadow-[#0066FF]/30 !font-black"
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform ${
                    active ? "text-white stroke-[2.5]" : "text-slate-500"
                  }`}
                />
                <span className="whitespace-nowrap">
                  {isAr ? item.labelAr : item.labelEn}
                </span>

                {/* Subtle Electric Blue Bottom Indicator */}
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#0066FF] rounded-full hidden"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* =========================================================================
            3. LANGUAGE TOGGLE & HIGH-STANDARD CTA
            ========================================================================= */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Language Switcher */}
          <motion.button
            type="button"
            onClick={toggleLanguage}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950"
            title={isAr ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Languages className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[11px] font-mono">{isAr ? "EN" : "عربي"}</span>
          </motion.button>

          {/* Primary CTA: Electric Blue (Order Your Card) */}
          <motion.button
            type="button"
            onClick={handleOrderCardClick}
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer bg-[#0066FF] hover:bg-[#0055D4] text-white shadow-md shadow-[#0066FF]/20 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAr ? "اطلب بطاقتك الآن" : "Order Your Card"}</span>
          </motion.button>

          {/* Mobile Hamburger Button with ≥44px Touch Target */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          4. MOBILE SLIDE-DOWN DRAWER MENU
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="md:hidden border-t px-4 py-4 space-y-3 shadow-xl overflow-hidden border-slate-200/80 bg-white/95 backdrop-blur-xl text-slate-900"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider px-2 font-mono text-slate-400">
              {isAr ? "أقسام المنظومة الذكية" : "Ecosystem Pages"}
            </p>

            <div className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrentActive(item.path, item.exact);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full min-h-[52px] flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${
                      active
                        ? "bg-[#0066FF] text-white font-black shadow-md shadow-[#0066FF]/25"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-white text-[#0066FF] border border-slate-200 shadow-xs"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-start">
                        <span className="text-sm font-bold">
                          {isAr ? item.labelAr : item.labelEn}
                        </span>
                        <span className={`text-[11px] font-mono ${active ? "text-blue-100" : "text-slate-400"}`}>
                          {item.path}
                        </span>
                      </div>
                    </div>

                    {active ? (
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-white/20 text-white">
                        {isAr ? "النشط" : "ACTIVE"}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Action Button */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleOrderCardClick}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer bg-[#0066FF] hover:bg-[#0055D4] text-white shadow-md shadow-[#0066FF]/20 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {isAr ? "اطلب بطاقتك الآن" : "Order Your Card"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
