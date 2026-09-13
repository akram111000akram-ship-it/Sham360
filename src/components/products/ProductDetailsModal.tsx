import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ShieldCheck, MessageCircle } from "lucide-react";
import { ProductItem } from "../../data/productsCatalogData";

interface ProductDetailsModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOrderWhatsApp: (product: ProductItem) => void;
  isAr: boolean;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onOrderWhatsApp,
  isAr
}) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          dir={isAr ? "rtl" : "ltr"}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-start"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {isAr ? product.nameAr : product.nameEn}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {isAr ? product.nameEn : product.nameAr}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title={isAr ? "إغلاق" : "Close"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={product.imageSrc}
                alt={isAr ? product.nameAr : product.nameEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black border backdrop-blur-md ${product.badgeColor}`}>
                  {isAr ? product.badgeAr : product.badgeEn}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                  {isAr ? product.interactionTypeAr : product.interactionTypeEn}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isAr ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* Benefits List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {isAr ? "المزايا التقنية والتفاعلية:" : "Technical & Interactive Benefits:"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.benefits.map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">
                      {isAr ? s.labelAr : s.labelEn}
                    </span>
                    <span className="text-slate-900 font-bold">
                      {isAr ? s.valueAr : s.valueEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {isAr ? "أهم الخصائص:" : "Key Highlights:"}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                {(isAr ? product.featuresAr : product.featuresEn).map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {isAr
                    ? "حفر ليزري مخصص وضمان رسمي شامل"
                    : "Precision laser engraving & comprehensive warranty"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onOrderWhatsApp(product);
                  onClose();
                }}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>
                  {isAr ? "طلب هذا المنتج عبر الواتساب" : "Order This Product via WhatsApp"}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ProductDetailsModal;
