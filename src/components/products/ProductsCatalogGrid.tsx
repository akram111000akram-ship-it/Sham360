import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Layers,
  Key,
  CreditCard,
  Check,
  Eye,
  MessageCircle
} from "lucide-react";
import {
  ProductItem,
  ProductCategory,
  PRODUCTS_CATALOG,
  getSyrianWhatsAppOrderUrl
} from "../../data/productsCatalogData";

interface ProductsCatalogGridProps {
  isAr: boolean;
  onSelectProductDetails: (product: ProductItem) => void;
}

export const ProductsCatalogGrid: React.FC<ProductsCatalogGridProps> = ({
  isAr,
  onSelectProductDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const handleInstantOrder = (product: ProductItem) => {
    window.open(getSyrianWhatsAppOrderUrl(product, undefined, undefined, undefined, isAr), "_blank");
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-start">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isAr ? "OFFICIAL CATALOG • كتالوج المنتجات" : "OFFICIAL CATALOG • NFC HARDWARE"}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              {isAr ? "تشكيلة عتاد الهوية الرقمية المعتمد" : "Certified Digital Identity Hardware Collection"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal">
              {isAr
                ? "اختر المنتج الأنسب لمنشأتك أو عملك، واطلب نسختك المبرمجة سحابياً مباشرة"
                : "Choose the perfect hardware for your business or venue and order your cloud-provisioned edition"}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isAr ? "كافة المنتجات" : "All Products"}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("stands")}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === "stands"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? "الستاندات والمكاتب" : "Counter & Desk Stands"}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("keychains")}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === "keychains"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isAr ? "الميداليات الذكية" : "Smart Keychains"}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("cards")}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === "cards"
                  ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isAr ? "البطاقات الرسمية" : "Official Cards"}</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const Icon = product.icon;
            const isMirror = product.id === "card-sham360-mirror";

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-3xl bg-white border ${
                  isMirror
                    ? "border-amber-400/80 ring-2 ring-amber-400/20 shadow-xl shadow-amber-500/10"
                    : "border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/50"
                } overflow-hidden transition-all flex flex-col justify-between group text-start`}
              >
                <div>
                  {/* Card Image Stage */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={product.imageSrc}
                      alt={isAr ? product.nameAr : product.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border backdrop-blur-md ${product.badgeColor}`}>
                        {isAr ? product.badgeAr : product.badgeEn}
                      </span>
                    </div>

                    {/* Interaction Type Tag */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-md">
                        {isAr ? product.interactionTypeAr : product.interactionTypeEn}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-blue-600 text-xs font-bold">
                        <Icon className="w-4 h-4" />
                        <span className="font-mono">{product.category.toUpperCase()}</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {isAr ? product.nameAr : product.nameEn}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {isAr ? product.subtitleAr : product.subtitleEn}
                      </p>
                    </div>

                    {/* Target Audience / Ideal For */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] space-y-1">
                      <span className="font-bold text-slate-700 block">
                        {isAr ? "مثالي لـ:" : "Ideal For:"}
                      </span>
                      <span className="text-slate-600">
                        {isAr ? product.idealForAr : product.idealForEn}
                      </span>
                    </div>

                    {/* Features List Checklist */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {(isAr ? product.featuresAr : product.featuresEn).slice(0, 3).map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProductDetails(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>{isAr ? "التفاصيل والمواصفات" : "Details & Specs"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInstantOrder(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>{isAr ? "طلب فوري" : "Instant Order"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ProductsCatalogGrid;
