import React, { useState } from "react";
import {
  MapPin,
  Truck,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { useRouter } from "../../services/router";
import {
  NFC_FAQS,
  getSyrianGeneralInquiryUrl
} from "../../data/productsCatalogData";

interface ProductsFulfillmentAndFaqProps {
  isAr: boolean;
}

export const ProductsFulfillmentAndFaq: React.FC<ProductsFulfillmentAndFaqProps> = ({ isAr }) => {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleGeneralInquiry = () => {
    window.open(getSyrianGeneralInquiryUrl(isAr), "_blank");
  };

  return (
    <>
      {/* Local Pickup & Nationwide Fulfillment Hubs in Syria */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? "LOCAL FULFILLMENT • الاستلام والتوصيل في سوريا"
                  : "LOCAL FULFILLMENT • PICKUP & DELIVERY IN SYRIA"}
              </span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isAr
                ? "مراكز التجهيز والاستلام المباشر والشحن الداخلي"
                : "Local Pickup Hubs & Nationwide Delivery Across Syria"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {isAr
                ? "نقدم تجربة استلام موثوقة وفورية، مع فحص ومعاينة المنتج قبل الدفع لضمان أعلى مستويات الجودة."
                : "Reliable pickup and expedited domestic delivery with inspection upon receipt to ensure premium standards."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            {/* Center 1: Damascus */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>
                  {isAr ? "دمشق وريف دمشق" : "Damascus & Rural Damascus"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? "مركز التجهيز والاستلام المباشر في الميدان والشعلان والمزة. تسليم فوري للمنتجات المبرمجة مع المعاينة الميدانية."
                  : "Direct pickup hubs in Al-Midan, Sha'alan, and Mazzeh. Instant handover of programmed hardware with live demo."}
              </p>
              <div className="pt-2 text-[11px] text-blue-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {isAr ? "تسليم خلال 24 - 48 ساعة" : "Delivery in 24 - 48 Hours"}
                </span>
              </div>
            </div>

            {/* Center 2: Aleppo */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>{isAr ? "محافظة حلب" : "Aleppo Governorate"}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? "مركز التسليم المعتمد في منطقة الجميلية ووسط المدينة لخدمة الشركات والمطاعم والعيادات في حلب."
                  : "Authorized distribution center in Jamiliyah and city center serving Aleppo businesses and clinics."}
              </p>
              <div className="pt-2 text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {isAr ? "تسليم واستلام معتمد" : "Verified Hub Pickup"}
                </span>
              </div>
            </div>

            {/* Center 3: Nationwide */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>
                  {isAr ? "كافة المحافظات السورية" : "All Syrian Governorates"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? "شحن داخلي آمن وموثوق (حمص، حماة، اللاذقية، طرطوس، السويداء، درعا، دير الزور) مع الدفع عند الاستلام."
                  : "Safe domestic courier shipping (Homs, Hama, Latakia, Tartus, Sweida, Daraa) with payment upon delivery."}
              </p>
              <div className="pt-2 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {isAr ? "شحن آمن ومؤمّن" : "Insured Domestic Shipping"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Accordion) */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              {isAr ? "FAQ • الأسئلة الشائعة" : "FAQ • FREQUENTLY ASKED QUESTIONS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isAr
                ? "كل ما تود معرفته عن عتاد وبطاقات SHAM360 الذكية"
                : "Everything You Need to Know About SHAM360 NFC Hardware"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {isAr
                ? "إجابات واضحة ودقيقة عن التوافق مع الهواتف، آلية التعديل، وطرق الاستلام."
                : "Clear and precise answers regarding device compatibility, cloud updates, and local delivery."}
            </p>
          </div>

          <div className="space-y-4 text-start">
            {NFC_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {isAr ? faq.qAr : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {isAr ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white relative overflow-hidden text-start">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>
                  {isAr ? "ارتقِ بهوية أعمالك اليوم" : "Elevate Your Business Identity Today"}
                </span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {isAr
                  ? "جاهز للانتقال إلى الجيل الجديد من الهوية الرقمية الذكية؟"
                  : "Ready to Switch to the Next Generation of Smart Digital Identity?"}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-normal">
                {isAr
                  ? "فريقنا في دمشق وحلب جاهز لمساعدتك في تصميم وبرمجة ستاندات منشأتك، بطاقاتك الذكية، أو ميداليات مفاتيحك فوراً."
                  : "Our team in Damascus and Aleppo is ready to assist you in designing and configuring your custom smart hardware today."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleGeneralInquiry}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>
                  {isAr ? "تواصل وطلب عبر الواتساب" : "Contact & Order via WhatsApp"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-all border border-white/20 text-center cursor-pointer"
              >
                {isAr ? "دخول لوحة التحكم السحابية" : "Cloud Dashboard Login"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductsFulfillmentAndFaq;
