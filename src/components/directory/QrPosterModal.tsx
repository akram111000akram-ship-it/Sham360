import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, X, Printer, Copy, Check } from "lucide-react";
import { DirectoryItem } from "../../data/directoryData";
import { useLanguage } from "../../services/LanguageContext";

interface QrPosterModalProps {
  item: DirectoryItem | null;
  onClose: () => void;
  onCopyLink: (item: DirectoryItem) => void;
  isCopied: boolean;
}

export const QrPosterModal: React.FC<QrPosterModalProps> = ({
  item,
  onClose,
  onCopyLink,
  isCopied
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const { isAr, t } = useLanguage();

  if (!item) return null;

  const handlePrint = () => {
    window.print();
  };

  const displayName = isAr ? item.nameAr : (item.nameEn || item.nameAr);
  const displayTitle = isAr ? item.titleAr : (item.titleEn || item.titleAr);
  const displayAddress = isAr ? item.addressAr : (item.addressEn || item.addressAr);

  return (
    <AnimatePresence>
      <div
        id="qr-poster-modal-overlay"
        dir={isAr ? "rtl" : "ltr"}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-[28px] bg-slate-900 border border-slate-700 shadow-2xl p-6 text-white space-y-5"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white">
                {t("posterModal.title", "ملصق طاولة QR ذكي للطباعة الفورية (Swiss Stand Poster)")}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Printable Stand Poster Container */}
          <div
            ref={posterRef}
            id="printable-stand-poster"
            className="rounded-2xl p-6 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-950 border-4 border-slate-950 shadow-2xl text-center space-y-4 font-sans"
          >
            {/* Brand Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0066FF]" />
                <span className="font-black text-xs tracking-wider text-slate-950 uppercase">
                  SHAM360 SMART POSTER
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-800">
                NFC & QR READY
              </span>
            </div>

            {/* Entity Name & Badge */}
            <div className="space-y-1">
              <img
                src={item.avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-2xl mx-auto object-cover border-2 border-slate-900 shadow-md"
              />
              <h2 className="text-xl font-black text-slate-950">{displayName}</h2>
              <p className="text-xs font-bold text-[#0066FF]">{displayTitle}</p>
              <p className="text-[10px] text-slate-500">{displayAddress}</p>
            </div>

            {/* Precision QR Code Graphic with Logo Center */}
            <div className="relative inline-block p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-inner">
              <svg
                viewBox="0 0 100 100"
                className="w-48 h-48 mx-auto fill-slate-950"
                shapeRendering="crispEdges"
              >
                {/* Corner 1 */}
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="6" y="6" width="18" height="18" fill="white" rx="2" />
                <rect x="10" y="10" width="10" height="10" rx="1" />
                {/* Corner 2 */}
                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="76" y="6" width="18" height="18" fill="white" rx="2" />
                <rect x="80" y="10" width="10" height="10" rx="1" />
                {/* Corner 3 */}
                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="6" y="76" width="18" height="18" fill="white" rx="2" />
                <rect x="10" y="80" width="10" height="10" rx="1" />
                {/* Data matrix dots */}
                <rect x="36" y="6" width="6" height="6" />
                <rect x="48" y="6" width="6" height="6" />
                <rect x="58" y="14" width="6" height="6" />
                <rect x="36" y="24" width="6" height="6" />
                <rect x="48" y="32" width="6" height="6" />
                <rect x="6" y="38" width="6" height="6" />
                <rect x="18" y="46" width="6" height="6" />
                <rect x="76" y="38" width="6" height="6" />
                <rect x="88" y="46" width="6" height="6" />
                <rect x="36" y="48" width="6" height="6" />
                <rect x="46" y="58" width="6" height="6" />
                <rect x="58" y="48" width="6" height="6" />
                <rect x="36" y="72" width="6" height="6" />
                <rect x="48" y="84" width="6" height="6" />
                <rect x="62" y="72" width="6" height="6" />
                <rect x="76" y="84" width="6" height="6" />
                <rect x="88" y="72" width="6" height="6" />
              </svg>

              {/* Center Floating Seal */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-[#0066FF] border-2 border-white shadow-md flex items-center justify-center text-white font-black text-xs">
                  S360
                </div>
              </div>
            </div>

            {/* Clear Instruction Banner */}
            <div className="bg-slate-950 text-white rounded-xl py-2 px-3 text-[11px] font-bold space-y-0.5">
              <div className="text-cyan-400">
                {t("posterModal.scanPrompt", "امسح الكود بكاميرا هاتفك أو قرّب بطاقتك الذكية")}
              </div>
              <div className="text-[9px] text-slate-300">
                {t("posterModal.scanSub", "لفتح البروفايل، حجز الموعد، أو الملاحة الجغرافية المباشرة")}
              </div>
            </div>

            {/* Footer Web URL */}
            <div className="pt-2 text-[10px] font-mono text-slate-500">
              sham360.online/p/{item.slug}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t("posterModal.printBtn", "طباعة الملصق الآن (Print Poster)")}</span>
            </button>

            <button
              type="button"
              onClick={() => onCopyLink(item)}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t("posterModal.copiedBtn", "تم نسخ الرابط!")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>{t("posterModal.copyBtn", "نسخ الرابط")}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
