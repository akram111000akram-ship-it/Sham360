import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Eye,
  FileCode,
  Download,
  CheckCheck,
  Copy,
  ExternalLink,
  Award
} from "lucide-react";
import { cardLogoMasterImg } from "../../data/productsCatalogData";

interface CardLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAr: boolean;
}

export const CardLogoModal: React.FC<CardLogoModalProps> = ({
  isOpen,
  onClose,
  isAr
}) => {
  const [logoModalTab, setLogoModalTab] = useState<"pic" | "svg">("pic");
  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          dir={isAr ? "rtl" : "ltr"}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 text-start my-8 max-h-[92vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    SHAM360 OFFICIAL CARD IDENTITY
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {isAr
                      ? "تصميم شعار بطاقة الأعمال الذكية (الوجه الأزرق)"
                      : "Official Smart Business Card Logo Design (Blue Face)"}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title={isAr ? "إغلاق" : "Close"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Format Selector Tabs */}
            <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setLogoModalTab("pic")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  logoModalTab === "pic"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>
                  {isAr
                    ? "الصورة الأصلية عالية الدقة (High-Res Pic / JPG)"
                    : "Original High-Res Image (JPG / Pic)"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setLogoModalTab("svg")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  logoModalTab === "svg"
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>
                  {isAr
                    ? "ملف الفيكتور المفتوح للطباعة (Scalable Vector SVG)"
                    : "Scalable Print Vector File (SVG)"}
                </span>
              </button>
            </div>

            {/* Logo Preview Canvas Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-6 flex flex-col items-center justify-center shadow-inner min-h-[280px] sm:min-h-[340px]">
              {logoModalTab === "pic" ? (
                <div className="relative z-10 w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-4 flex items-center justify-center group">
                  <img
                    src={cardLogoMasterImg}
                    alt="SHAM360 Official Smart Digital Presence Logo"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="relative z-10 w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-200 p-4 bg-white flex items-center justify-center group">
                  <img
                    src="/sham360_card_logo.svg"
                    alt="SHAM360 Vector SVG Logo"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Watermark Tag */}
              <div className="mt-4 text-center z-10">
                <span className="text-[11px] font-mono font-bold text-slate-500 tracking-widest uppercase">
                  SHAM360 OFFICIAL BRAND LOGO • SMART DIGITAL PRESENCE
                </span>
              </div>
            </div>

            {/* Primary Download Actions Grid */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Direct Pic Download */}
                <a
                  href="/sham360_card_logo.jpg"
                  download="SHAM360_Smart_Card_Logo_Master.jpg"
                  className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-98 text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isAr
                      ? "تحميل كصورة عالية الدقة (JPG / Pic)"
                      : "Download High-Res JPG"}
                  </span>
                </a>

                {/* Direct SVG File Download */}
                <a
                  href="/sham360_card_logo.svg"
                  download="SHAM360_Smart_Card_Logo_Vector.svg"
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-98 text-center"
                >
                  <FileCode className="w-4 h-4" />
                  <span>
                    {isAr
                      ? "تحميل ملف الفيكتور للطباعة (SVG File)"
                      : "Download Print Vector (SVG)"}
                  </span>
                </a>
              </div>

              {/* Secondary Quick Utilities */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.location.origin + "/sham360_card_logo.jpg";
                      navigator.clipboard.writeText(url);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">
                          {isAr ? "تم نسخ رابط الصورة!" : "Image Link Copied!"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {isAr ? "نسخ رابط الصورة المباشر" : "Copy Direct Image URL"}
                        </span>
                      </>
                    )}
                  </button>

                  <a
                    href="/sham360_card_logo.svg"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isAr ? "فتح في نافذة كاملة" : "Open in New Tab"}</span>
                  </a>
                </div>

                <span className="text-[11px] text-slate-500 font-medium">
                  {isAr
                    ? "جاهز فوراً للتنفيذ والطباعة والحفر الليزري"
                    : "Production-ready for laser engraving & offset print"}
                </span>
              </div>
            </div>

            {/* Technical Specifications Guide */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>
                  {isAr
                    ? "مواصفات واستخدامات تصميم شعار SHAM360:"
                    : "SHAM360 Logo Design Specifications & Usage:"}
                </span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">
                    {isAr ? "اللون الكحلي الملكي" : "Royal Executive Navy"}
                  </span>
                  <span className="text-slate-900 font-bold font-mono">#080E1E / #0E172E</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">
                    {isAr ? "الأزرق السيان والبلاتيني" : "Cyan Blue & Platinum"}
                  </span>
                  <span className="text-slate-900 font-bold font-mono">#38BDF8 / #CBD5E1</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">
                    {isAr ? "الصلاحية للطباعة" : "Vector Scalability"}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    {isAr ? "فيكتور غير محدود الدقة" : "Infinite Resolution"}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {isAr
                  ? "تم تجهيز هذا الملف الفيكتوري الأصلي والصورة عالية الدقة ليتناسب تماماً مع طباعة كروت NFC الذكية، الحفر بالليزر على الستاندات، واجهات تطبيقات الويب، أو إضافته لبروفايلك الرقمي."
                  : "Engineered to international vector benchmarks for high-precision NFC smart card printing, laser engraving on acrylic desk stands, web platforms, and digital profile badges."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CardLogoModal;
