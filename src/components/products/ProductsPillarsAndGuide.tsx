import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Wifi,
  MousePointerClick,
  Share2,
  ShieldCheck,
  Leaf,
  Radio,
  ExternalLink,
  Save,
  Check,
  X,
  Smartphone,
  Apple
} from "lucide-react";

interface ProductsPillarsAndGuideProps {
  isAr: boolean;
}

export const ProductsPillarsAndGuide: React.FC<ProductsPillarsAndGuideProps> = ({ isAr }) => {
  return (
    <>
      {/* 5 Pillars Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-slate-50/90 border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle Ambient Lighting Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066FF] text-xs font-bold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>
                {isAr
                  ? "فلسفة التصميم والتقنية المطبوعة على بطاقة SHAM360 الرسمية"
                  : "Design & Engineering Philosophy Behind the Official SHAM360 Card"}
              </span>
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 uppercase">
              SMARTER CONNECTIONS. BIGGER OPPORTUNITIES.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {isAr
                ? "خمس ركائز تقنية تجعل بطاقة SHAM360 الذكية الخيار الأول لنخبة رجال الأعمال والشركات والمؤسسات"
                : "Five technical pillars establishing SHAM360 as the premier choice for executives, enterprises, and verified institutions"}
            </p>
          </div>

          {/* 5 Pillars Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Pillar 1: NFC ENABLED */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group shadow-2xs">
              <div className="space-y-3 text-start">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 text-[#0066FF] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Wifi className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#0066FF] tracking-wider block">
                    01 • NFC ENABLED
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {isAr ? "تلامس ذكي فوري" : "Instant Smart Tap"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? "شريحة وهوائي مدمج فائق الحساسية ينقل هويتك فور ملامسة الهاتف دون فتح أي تطبيق."
                    : "High-sensitivity embedded chip & antenna transferring your identity upon phone contact without opening any app."}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                ISO/IEC 14443 Type A
              </div>
            </div>

            {/* Pillar 2: ONE TAP */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group shadow-2xs">
              <div className="space-y-3 text-start">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MousePointerClick className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-600 tracking-wider block">
                    02 • ONE TAP
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {isAr ? "لمسة واحدة فقط" : "Just One Tap"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? "في غضون 0.1 ثانية تنبثق صفحتك الاحترافية مع زر مباشر لحفظ جهة الاتصال في الهاتف."
                    : "Within 0.1 seconds your professional landing page appears with a direct button to save contacts to the phone book."}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                Response Speed: 0.1s
              </div>
            </div>

            {/* Pillar 3: ALL YOUR LINKS */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group shadow-2xs">
              <div className="space-y-3 text-start">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 tracking-wider block">
                    03 • ALL YOUR LINKS
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {isAr ? "كافة وسائل التواصل" : "All Your Channels"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? "Instagram, Facebook, LinkedIn, YouTube, TikTok, WhatsApp، موقعك الإلكتروني ومقر الخريطة."
                    : "Instagram, Facebook, LinkedIn, YouTube, TikTok, WhatsApp, website, and GPS Google Maps directions."}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                Omni-Channel Sync
              </div>
            </div>

            {/* Pillar 4: MODERN & SECURE */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group shadow-2xs">
              <div className="space-y-3 text-start">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-sky-600 tracking-wider block">
                    04 • MODERN & SECURE
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {isAr ? "عصرية وموثقة" : "Modern & Verified"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? "هوية رقمية معتمدة ومحمية، مع إمكانية تعديل أرقامك وبياناتك سحابياً في أي وقت مجاناً."
                    : "Certified, protected digital identity with 24/7 free cloud dashboard updates for your phone numbers and links."}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                Encrypted & Cloud Backed
              </div>
            </div>

            {/* Pillar 5: ECO FRIENDLY */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group shadow-2xs">
              <div className="space-y-3 text-start">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-teal-600 tracking-wider block">
                    05 • ECO FRIENDLY
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {isAr ? "صديقة للبيئة" : "Eco-Friendly"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? "كرت ذكي واحد مدى الحياة ينهي استهلاك آلاف الكروت الورقية التقليدية والهدر المادي."
                    : "One durable smart card for life eliminating thousands of wasteful paper cards and recurring print expenses."}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                100% Zero Paper Waste
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* How it Works in 3 Simple Steps */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              {isAr ? "HOW IT WORKS • آلية العمل" : "HOW IT WORKS • 3 SIMPLE STEPS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isAr
                ? "ثلاث خطوات بسيطة لمشاركة هويتك ونشاطك التجاري"
                : "Three Simple Steps to Share Your Identity & Business"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {isAr
                ? "بدون كتابة أرقام يدوياً، بدون بطاقات ورقية مهدرة، وبدون الحاجة لأي تطبيق لدى الطرف الآخر."
                : "No manual typing of numbers, no wasted paper cards, and zero app needed by the receiver."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-start relative group hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-600">STEP 01</span>
              <h3 className="text-base font-black text-slate-900">
                {isAr ? "1. المس بالهاتف (NFC Tap)" : "1. Touch with Smartphone (NFC Tap)"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? "المس ظهر أو أعلى هاتف العميل بالكرت أو الستاند الذكي. تنبثق شريحة NFC خلال أجزاء من الثانية تلقائياً."
                  : "Tap the phone against your smart card or desk stand. The NFC chip triggers instantly in a fraction of a second."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-start relative group hover:border-indigo-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                <ExternalLink className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600">STEP 02</span>
              <h3 className="text-base font-black text-slate-900">
                {isAr ? "2. يفتح بروفايلك فوراً" : "2. Opens Your Profile Instantly"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? "يفتح متصفح هاتف العميل صفحتك الرقمية التفاعلية التي تضم أرقامك، صور أعمالك، وموقعك الجغرافي دون أي تطبيق."
                  : "The client's browser immediately opens your interactive profile showcasing your contact numbers, portfolio, and location without any app."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-start relative group hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                <Save className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">STEP 03</span>
              <h3 className="text-base font-black text-slate-900">
                {isAr ? "3. حفظ الرقم والتواصل المباشر" : "3. 1-Tap Save Contact & Direct Chat"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? "ينقر العميل على 'حفظ جهة الاتصال' ليتم تخزين رقمك واسمك في هاتفه فوراً، أو ينقر لبدء محادثة واتساب وتقييم 5 نجوم."
                  : "The client taps 'Save Contact' to store your name and phone straight into their phone book, or taps to launch WhatsApp or Google Reviews."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Traditional Paper vs SHAM360 Smart Solutions */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              {isAr ? "VALUE COMPARISON • مقارنة القيمة" : "VALUE COMPARISON • PAPER VS SHAM360"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isAr
                ? "لماذا يفضل قادة الأعمال عتاد SHAM360 الذكي على البطاقات الورقية؟"
                : "Why Modern Leaders Choose SHAM360 Smart Hardware Over Paper Cards"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {isAr
                ? "مقارنة مباشرة توضح الفارق في الأثر الاقتصادي، تجربة العميل، والاستدامة الرقمية."
                : "A direct comparison highlighting economic impact, client experience, and digital sustainability."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Traditional Paper Card (Negative) */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-start">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-sm font-black text-slate-700">
                  {isAr ? "البطاقات والمنشورات الورقية التقليدية" : "Traditional Paper Business Cards"}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                  {isAr ? "مكلفة ومحدودة" : "Costly & Static"}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>
                    {isAr
                      ? "88% من الكروت الورقية يتم إلقاؤها في القمامة خلال أسبوع واحد دون تخزين الأرقام."
                      : "88% of paper business cards are tossed within a week without contact info ever being saved."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>
                    {isAr
                      ? "تكلفة طباعة متكررة؛ أي تغيير في رقم الهاتف أو العنوان يتطلب إعادة طباعة 1000 كرت والتخلص من القديم."
                      : "Recurring printing expenses; any update to a phone number or address requires reprinting 1,000 cards."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>
                    {isAr
                      ? "مساحة محدودة جداً لا تكفي لعرض صور الأعمال، المنيو الرقمي، أو حسابات التواصل وموقع الخريطة."
                      : "Extremely cramped space unable to showcase portfolios, digital menus, or live map directions."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>
                    {isAr
                      ? "إجهاد للعميل بكتابة الأرقام يدوياً، مما يؤدي لضياع فرص التواصل والمتابعة."
                      : "Friction for clients who must manually type numbers, resulting in lost leads and missed follow-ups."}
                  </span>
                </div>
              </div>
            </div>

            {/* SHAM360 Smart NFC Hardware (Positive) */}
            <div className="p-6 rounded-3xl bg-blue-50/70 border-2 border-blue-500 shadow-md space-y-4 text-start">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <span className="text-sm font-black text-blue-900">
                  {isAr ? "حلول وعتاد SHAM360 الذكية NFC" : "SHAM360 Smart NFC Solutions"}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {isAr ? "استثمار دائم مدى الحياة" : "Lifetime Smart Investment"}
                </span>
              </div>

              <div className="space-y-3 text-xs text-blue-950">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {isAr
                      ? "حفظ فوري للأرقام والاسم بلمسة واحدة مباشرة في سجل الهاتف (vCard) دون الحاجة لأي تطبيق."
                      : "1-touch contact saving (vCard) straight into the smartphone address book with zero app."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {isAr
                      ? "تحكم وتعديل سحابي مجاني ومستمر؛ غيّر أرقامك أو روابطك في أي لحظة دون الحاجة لطباعة أو تغيير الكرت."
                      : "Free dynamic cloud updates 24/7; edit phone numbers or links anytime without re-ordering."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {isAr
                      ? "مساحة غير محدودة لجميع شبكات التواصل، تقييمات Google 5 نجوم، معرض الصور، وموقعك الجغرافي."
                      : "Unlimited digital canvas for all social media links, Google 5-Star reviews, menus, and GPS."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {isAr
                      ? "صديق للبيئة ومظهر عصري فاخر يترك انطباعاً احترافياً لا يُنسى لدى كل عميل أو شريك."
                      : "Eco-friendly, durable, and prestigious design that leaves an unforgettable first impression."}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Phone Tap Sweet Spots Guide */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-start">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                {isAr ? "NFC SENSITIVITY GUIDE • دليل التلامس" : "NFC SENSITIVITY GUIDE • SWEET SPOTS"}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {isAr
                  ? "أين يقع حساس التلامس في هواتف iPhone و Android؟"
                  : "Where is the NFC Sensor Located on iPhone & Android?"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {isAr
                  ? "لضمان أفضل استجابة فورية خلال 0.1 ثانية، وجّه الكرت أو الستاند لنقطة الحساس المحددة في هاتف العميل:"
                  : "For immediate 0.1s responsiveness, touch your smart card or stand to the exact sensor zone:"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* iPhone Guide */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Apple className="w-4 h-4 text-slate-800" />
                  <span>{isAr ? "هواتف آيفون (Apple iPhone):" : "Apple iPhone Smartphones:"}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {isAr
                    ? "يقع الحساس في أعلى ظهر الهاتف (Top Edge). المس أعلى الآيفون بحافة الكرت أو الستاند ليظهر الإشعار الفوري أعلى الشاشة."
                    : "The sensor is located at the top rear edge. Touch the top edge of iPhone with the card for instant notification."}
                </p>
              </div>

              {/* Android Guide */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? "هواتف أندرويد (Samsung / Xiaomi / Huawei):" : "Android Smartphones:"}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {isAr
                    ? "يقع الحساس غالباً في منتصف ظهر الهاتف (Center of Back). تأكد من تفعيل خاصية NFC في لوحة التحكم السريعة."
                    : "The sensor is typically in the center of the phone back. Ensure NFC is switched on in the quick settings tray."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductsPillarsAndGuide;
