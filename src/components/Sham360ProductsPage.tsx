import React, { useState } from "react";
import { useLanguage } from "../services/LanguageContext";
import {
  ProductItem,
  getSyrianWhatsAppOrderUrl
} from "../data/productsCatalogData";
import { ProductsHeroSection } from "./products/ProductsHeroSection";
import { ProductsPillarsAndGuide } from "./products/ProductsPillarsAndGuide";
import { ProductsCatalogGrid } from "./products/ProductsCatalogGrid";
import { ProductsFulfillmentAndFaq } from "./products/ProductsFulfillmentAndFaq";
import { ProductDetailsModal } from "./products/ProductDetailsModal";
import { CardLogoModal } from "./products/CardLogoModal";

export const Sham360ProductsPage: React.FC = () => {
  const { isAr } = useLanguage();

  const [selectedProductDetails, setSelectedProductDetails] = useState<ProductItem | null>(null);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const handleOrderWhatsApp = (product: ProductItem) => {
    window.open(getSyrianWhatsAppOrderUrl(product, undefined, undefined, undefined, isAr), "_blank");
  };

  return (
    <div
      className={`min-h-screen bg-white text-slate-900 transition-colors ${
        isAr ? "font-sans" : "font-sans"
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Top Value Sub-Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-start">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">
              {isAr
                ? "عتاد الهوية الرقمية الذكية (Smart NFC Products)"
                : "Smart NFC Hardware & Digital Identity Ecosystem"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] text-slate-300 mx-auto sm:mx-0">
            <span>
              {isAr
                ? "بدون أي تطبيق مطلوب من العميل"
                : "Zero app required for clients"}
            </span>
            <span>•</span>
            <span>
              {isAr
                ? "توافق شامل مع iPhone و Android"
                : "Universal iPhone & Android compatibility"}
            </span>
            <span>•</span>
            <span>
              {isAr
                ? "مراكز تسليم في دمشق وحلب وشحن للمحافظات"
                : "Pickup hubs in Damascus & Aleppo + nationwide shipping"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Showcase Section with Customizer & Phone Tap Demo */}
      <ProductsHeroSection
        isAr={isAr}
        onOpenLogoModal={() => setShowLogoModal(true)}
      />

      {/* 5 Pillars, How It Works, Value Comparison & NFC Sensitivity Sweet Spots */}
      <ProductsPillarsAndGuide isAr={isAr} />

      {/* Certified Hardware Catalog Grid with Filter Tabs */}
      <ProductsCatalogGrid
        isAr={isAr}
        onSelectProductDetails={(product) => setSelectedProductDetails(product)}
      />

      {/* Syrian Delivery Centers, Interactive FAQs & Bottom Conversion CTA */}
      <ProductsFulfillmentAndFaq isAr={isAr} />

      {/* Interactive Specifications & Details Modal */}
      <ProductDetailsModal
        product={selectedProductDetails}
        onClose={() => setSelectedProductDetails(null)}
        onOrderWhatsApp={handleOrderWhatsApp}
        isAr={isAr}
      />

      {/* Official Card Logo Design & Vector Download Modal */}
      <CardLogoModal
        isOpen={showLogoModal}
        onClose={() => setShowLogoModal(false)}
        isAr={isAr}
      />
    </div>
  );
};

export default Sham360ProductsPage;
