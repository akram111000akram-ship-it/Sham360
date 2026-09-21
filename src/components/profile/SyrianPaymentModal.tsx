import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Copy,
  Check,
  QrCode,
  Download,
  Wallet,
  Building2,
  PhoneCall,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import QRCode from "qrcode";
import { PaymentMethodItem, SyrianPaymentProvider } from "../../types/profile";

export type { PaymentMethodItem, SyrianPaymentProvider };

export interface SyrianPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethods?: PaymentMethodItem[];
  methods?: PaymentMethodItem[];
  isAr?: boolean;
  primaryColor?: string;
  whatsappNumber?: string;
  businessName?: string;
}

// Provider visual styling and metadata
export const SYRIAN_PROVIDER_META: Record<
  SyrianPaymentProvider,
  {
    nameAr: string;
    nameEn: string;
    badgeAr: string;
    badgeEn: string;
    bgGradient: string;
    brandColor: string;
    textColor: string;
    accentBg: string;
    defaultInstructionsAr: string;
    defaultInstructionsEn: string;
  }
> = {
  sham_cash: {
    nameAr: "شام كاش (Sham Cash)",
    nameEn: "Sham Cash Digital Wallet",
    badgeAr: "المحفظة السورية الرقمية",
    badgeEn: "Syrian Digital Wallet",
    bgGradient: "from-emerald-700 via-emerald-800 to-teal-900",
    brandColor: "#059669",
    textColor: "text-emerald-700",
    accentBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    defaultInstructionsAr:
      "افتح تطبيق شام كاش، اختر مسح الرمز (QR) أو حوّل مباشرة إلى رقم المحفظة / الحساب أدناه.",
    defaultInstructionsEn:
      "Open Sham Cash app, scan QR code or transfer directly to the wallet ID below."
  },
  syriatel_cash: {
    nameAr: "سيريتل كاش (Syriatel Cash)",
    nameEn: "Syriatel Cash (*303#)",
    badgeAr: "كاش سيريتل *303#",
    badgeEn: "Syriatel Telecom Wallet",
    bgGradient: "from-rose-700 via-red-800 to-rose-950",
    brandColor: "#DC2626",
    textColor: "text-rose-700",
    accentBg: "bg-rose-50 text-rose-800 border-rose-200",
    defaultInstructionsAr:
      "يمكنك التحويل عبر تطبيق Syriatel Cash أو طلب الرمز *303# وإدخال الرقم أدناه.",
    defaultInstructionsEn:
      "Transfer via Syriatel Cash app or dial *303# and enter the phone number below."
  },
  mtn_cash: {
    nameAr: "كاش موبايل (MTN Cash)",
    nameEn: "MTN Cash Mobile Wallet",
    badgeAr: "كاش موبايل *707#",
    badgeEn: "MTN Mobile Cash",
    bgGradient: "from-amber-600 via-amber-700 to-slate-900",
    brandColor: "#D97706",
    textColor: "text-amber-700",
    accentBg: "bg-amber-50 text-amber-900 border-amber-200",
    defaultInstructionsAr:
      "حوّل عبر تطبيق كاش موبايل أو بالاتصال على الرمز *707# إلى الرقم الموضح أدناه.",
    defaultInstructionsEn:
      "Transfer via Cash Mobile app or dial *707# to the number shown below."
  },
  al_baraka: {
    nameAr: "بنك البركة سورية (Al Baraka)",
    nameEn: "Al Baraka Bank Syria",
    badgeAr: "مصرف إسلامي معتمد",
    badgeEn: "Islamic Bank Transfer",
    bgGradient: "from-blue-900 via-indigo-950 to-slate-950",
    brandColor: "#1E3A8A",
    textColor: "text-blue-800",
    accentBg: "bg-blue-50 text-blue-900 border-blue-200",
    defaultInstructionsAr:
      "يمكنك التحويل لحسابنا في بنك البركة سورية عبر تطبيق البنك أو الفروع.",
    defaultInstructionsEn:
      "Transfer to our Al Baraka Bank account via banking app or branch."
  },
  bemo: {
    nameAr: "بنك بيمو السعودي الفرنسي (BBSF)",
    nameEn: "Banque Bemo Saudi Fransi",
    badgeAr: "حساب مصرفي معتمد",
    badgeEn: "Bemo Bank Transfer",
    bgGradient: "from-slate-900 via-red-950 to-slate-950",
    brandColor: "#831843",
    textColor: "text-slate-800",
    accentBg: "bg-slate-50 text-slate-900 border-slate-200",
    defaultInstructionsAr:
      "يمكنك التحويل لحسابنا في بنك بيمو السعودي الفرنسي باستخدام رقم الحساب أدناه.",
    defaultInstructionsEn:
      "Transfer to our BBSF account using the account number provided below."
  },
  cbs: {
    nameAr: "المصرف التجاري السوري (CBS)",
    nameEn: "Commercial Bank of Syria",
    badgeAr: "المصرف التجاري السوري",
    badgeEn: "CBS Syrian Bank",
    bgGradient: "from-slate-800 via-slate-900 to-black",
    brandColor: "#0F172A",
    textColor: "text-slate-900",
    accentBg: "bg-slate-100 text-slate-900 border-slate-300",
    defaultInstructionsAr:
      "التحويل متاح إلى حساب المصرف التجاري السوري الموضح أدناه.",
    defaultInstructionsEn:
      "Transfer directly to the Commercial Bank of Syria account below."
  },
  bank_transfer: {
    nameAr: "حساب بنكي / تحويل مصرفي",
    nameEn: "Local Bank Transfer",
    badgeAr: "تحويل مصرفي سوري",
    badgeEn: "Bank Transfer",
    bgGradient: "from-slate-800 via-sky-950 to-slate-900",
    brandColor: "#0369A1",
    textColor: "text-sky-800",
    accentBg: "bg-sky-50 text-sky-900 border-sky-200",
    defaultInstructionsAr:
      "استخدم رقم الحساب الموضح أدناه لإتمام الحوالة المصرفية عبر بنكك المحلي.",
    defaultInstructionsEn:
      "Use the account number below to complete your transfer via your local bank."
  },
  revolut: {
    nameAr: "ريفولوت (Revolut)",
    nameEn: "Revolut (@Revtag / Link)",
    badgeAr: "دفع دولي فوري",
    badgeEn: "Instant Global Transfer",
    bgGradient: "from-slate-900 via-blue-950 to-indigo-950",
    brandColor: "#0075EB",
    textColor: "text-blue-700",
    accentBg: "bg-blue-50 text-blue-900 border-blue-200",
    defaultInstructionsAr:
      "حوّل مباشرة عبر تطبيق Revolut باستخدام اسم المستخدم @revtag أو الحساب الموضح أدناه.",
    defaultInstructionsEn:
      "Transfer directly via Revolut app using @revtag or the account number below."
  },
  wise: {
    nameAr: "وايز (Wise)",
    nameEn: "Wise (TransferWise)",
    badgeAr: "حوالات دولية",
    badgeEn: "International Low-Fee Transfer",
    bgGradient: "from-emerald-900 via-teal-950 to-slate-950",
    brandColor: "#163300",
    textColor: "text-emerald-800",
    accentBg: "bg-emerald-50 text-emerald-900 border-emerald-200",
    defaultInstructionsAr:
      "يمكنك التحويل لحساب Wise عبر البريد الإلكتروني أو تفاصيل الحساب المرفقة أدناه.",
    defaultInstructionsEn:
      "Transfer to our Wise account via email or the provided local bank details."
  },
  iban: {
    nameAr: "حساب بنكي دولي (IBAN / SWIFT)",
    nameEn: "International Bank (IBAN / SWIFT)",
    badgeAr: "تحويل بنكي عالمي",
    badgeEn: "Global Wire Transfer",
    bgGradient: "from-slate-800 via-blue-950 to-slate-950",
    brandColor: "#1E40AF",
    textColor: "text-blue-800",
    accentBg: "bg-blue-50 text-blue-900 border-blue-200",
    defaultInstructionsAr:
      "استخدم رقم الآيبان الدولي (IBAN) وكود السويفت لإجراء حوالة بنكية مباشرة من أي بنك حول العالم.",
    defaultInstructionsEn:
      "Use this IBAN and SWIFT code to wire funds from any bank globally."
  },
  crypto: {
    nameAr: "عملات رقمية / USDT (Tether)",
    nameEn: "Crypto / USDT (TRC20 / ERC20)",
    badgeAr: "دفع رقمي مشفّر",
    badgeEn: "Decentralized Crypto Payment",
    bgGradient: "from-teal-900 via-slate-950 to-emerald-950",
    brandColor: "#26A17B",
    textColor: "text-teal-700",
    accentBg: "bg-teal-50 text-teal-900 border-teal-200",
    defaultInstructionsAr:
      "يرجى التحويل إلى عنوان المحفظة الموضح أدناه (تأكد من اختيار الشبكة الصحيحة TRC20 أو ERC20).",
    defaultInstructionsEn:
      "Send funds to the wallet address below. Ensure you are using the correct network (TRC-20)."
  },
  paypal: {
    nameAr: "بايبال (PayPal)",
    nameEn: "PayPal (me / Email)",
    badgeAr: "دفع إلكتروني آمن",
    badgeEn: "Secure Online Payment",
    bgGradient: "from-blue-900 via-sky-950 to-slate-950",
    brandColor: "#003087",
    textColor: "text-blue-700",
    accentBg: "bg-blue-50 text-blue-900 border-blue-200",
    defaultInstructionsAr:
      "يمكنك التحويل عبر رابط PayPal المباشر أو البريد الإلكتروني.",
    defaultInstructionsEn:
      "Transfer via direct PayPal.me link or associated email address."
  },
  custom: {
    nameAr: "وسيلة دفع رقمية",
    nameEn: "Digital Payment Method",
    badgeAr: "محفظة / وسيلة مخصصة",
    badgeEn: "Custom Payment",
    bgGradient: "from-slate-800 via-slate-900 to-indigo-950",
    brandColor: "#4F46E5",
    textColor: "text-indigo-800",
    accentBg: "bg-indigo-50 text-indigo-900 border-indigo-200",
    defaultInstructionsAr:
      "يرجى التحويل إلى المعرّف أو الرقم الموضح، ثم إرسال إشعار الدفع.",
    defaultInstructionsEn:
      "Please transfer to the wallet ID shown, then notify us with proof."
  }
};

export const SyrianPaymentModal: React.FC<SyrianPaymentModalProps> = ({
  isOpen,
  onClose,
  paymentMethods,
  methods,
  isAr = true,
  primaryColor = "#0066FF",
  whatsappNumber,
  businessName
}) => {
  const allMethods = paymentMethods || methods || [];
  const activeMethods = allMethods.filter((m) => m.isActive !== false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatedQrMap, setGeneratedQrMap] = useState<Record<string, string>>({});

  const currentMethod = activeMethods[selectedIndex] || activeMethods[0];
  const providerMeta = currentMethod
    ? SYRIAN_PROVIDER_META[currentMethod.provider] || SYRIAN_PROVIDER_META.custom
    : SYRIAN_PROVIDER_META.sham_cash;

  // Auto-generate QR code data URL for methods without an uploaded image
  useEffect(() => {
    if (!isOpen || activeMethods.length === 0) return;

    activeMethods.forEach(async (method) => {
      if (!method.qrCodeUrl && method.accountNumber) {
        try {
          // Generate high quality QR code data URL
          const qrData = await QRCode.toDataURL(method.accountNumber, {
            errorCorrectionLevel: "H",
            margin: 2,
            scale: 8,
            color: {
              dark: "#0F172A",
              light: "#FFFFFF"
            }
          });
          setGeneratedQrMap((prev) => ({ ...prev, [method.id]: qrData }));
        } catch (err) {
          console.warn("[SHAM360] Failed to generate QR code:", err);
        }
      }
    });
  }, [isOpen, activeMethods]);

  // Handle single-tap copy
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Download QR Code image
  const handleDownloadQr = (method: PaymentMethodItem) => {
    const qrSrc = method.qrCodeUrl || generatedQrMap[method.id];
    if (!qrSrc) return;

    const link = document.createElement("a");
    link.href = qrSrc;
    link.download = `sham360-qr-${method.provider}-${method.accountNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || activeMethods.length === 0) return null;

  return (
    <AnimatePresence>
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto"
        >
          {/* Header with Syrian Payment Accent Gradient */}
          <div
            className={`p-5 sm:p-6 text-white bg-gradient-to-br ${providerMeta.bgGradient} relative overflow-hidden transition-all duration-300`}
          >
            {/* Ambient visual badge */}
            <div className="absolute -end-10 -bottom-10 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner flex-shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
                      {isAr ? providerMeta.badgeAr : providerMeta.badgeEn}
                    </span>
                    <span className="text-[10px] text-white/80 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isAr ? "دفع رقمي فوري" : "Instant Digital Payment"}</span>
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black mt-1 tracking-tight">
                    {isAr ? "وسائل الدفع والمحافظ الإلكترونية" : "Payment Methods & Wallets"}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isAr ? "إغلاق" : "Close"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Provider Quick Switcher Tabs (if more than 1 method) */}
            {activeMethods.length > 1 && (
              <div className="flex items-center gap-1.5 mt-4 pt-2 border-t border-white/15 overflow-x-auto pb-1 scrollbar-none">
                {activeMethods.map((m, idx) => {
                  const meta = SYRIAN_PROVIDER_META[m.provider] || SYRIAN_PROVIDER_META.custom;
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? "bg-white text-slate-900 shadow-md scale-102"
                          : "bg-white/10 hover:bg-white/20 text-white/90"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: meta.brandColor }}
                      />
                      <span>{isAr ? m.title || meta.nameAr : m.titleEn || m.title || meta.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Content Body */}
          <div className="p-5 sm:p-6 space-y-5 bg-slate-50/50">
            {/* Active Provider Info Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
              {/* QR Code Container */}
              <div className="relative group shrink-0">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={currentMethod.qrCodeUrl || generatedQrMap[currentMethod.id]}
                    alt={`${currentMethod.title} QR Code`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Quick Save QR Button */}
                <button
                  type="button"
                  onClick={() => handleDownloadQr(currentMethod)}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors cursor-pointer"
                  title={isAr ? "تحميل رمز QR للهاتف" : "Download QR Code"}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? "حفظ رمز QR" : "Save QR Code"}</span>
                </button>
              </div>

              {/* Account Details & Instructions */}
              <div className="flex-1 min-w-0 space-y-2.5">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
                    <span>
                      {isAr
                        ? currentMethod.title || providerMeta.nameAr
                        : currentMethod.titleEn || currentMethod.title || providerMeta.nameEn}
                    </span>
                  </h3>

                  {currentMethod.accountName && (
                    <p className="text-xs text-slate-600 mt-0.5">
                      <span className="text-slate-400 font-medium">
                        {isAr ? "اسم المستفيد: " : "Beneficiary: "}
                      </span>
                      <strong className="text-slate-800">{currentMethod.accountName}</strong>
                    </p>
                  )}
                </div>

                {/* Account / Wallet ID with 1-Tap Copy */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <span>
                        {currentMethod.provider === "syriatel_cash" || currentMethod.provider === "mtn_cash"
                          ? isAr
                            ? "رقم الهاتف للمحفظة"
                            : "Wallet Phone Number"
                          : currentMethod.provider === "sham_cash"
                          ? isAr
                            ? "معرف محفظة شام كاش"
                            : "Sham Cash Wallet ID"
                          : currentMethod.provider === "revolut"
                          ? isAr
                            ? "معرف ريفولوت (@Revtag / Link)"
                            : "Revolut @Revtag / Link"
                          : currentMethod.provider === "wise"
                          ? isAr
                            ? "بريد أو معرف حساب Wise"
                            : "Wise Email / Account"
                          : currentMethod.provider === "crypto"
                          ? isAr
                            ? "عنوان المحفظة الرقمية (Crypto Address)"
                            : "Crypto Wallet Address"
                          : currentMethod.provider === "paypal"
                          ? isAr
                            ? "رابط أو حساب بايبال (PayPal)"
                            : "PayPal Link / Email"
                          : currentMethod.provider === "iban"
                          ? isAr
                            ? "رقم الحساب المصرفي الدولي (IBAN)"
                            : "International Bank Account (IBAN)"
                          : isAr
                          ? "رقم الحساب / الآيبان"
                          : "Account / IBAN Number"}
                      </span>
                      {currentMethod.currency && (
                        <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px] font-mono font-bold">
                          {currentMethod.currency}
                        </span>
                      )}
                    </span>
                    {copiedId === currentMethod.id && (
                      <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-bold animate-in fade-in">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>{isAr ? "تم النسخ!" : "Copied!"}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span
                      dir="ltr"
                      className="font-mono text-base sm:text-lg font-black text-slate-900 tracking-wider truncate select-all"
                    >
                      {currentMethod.accountNumber}
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      onClick={() => handleCopy(currentMethod.accountNumber, currentMethod.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs ${
                        copiedId === currentMethod.id
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {copiedId === currentMethod.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{isAr ? "تم" : "Done"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isAr ? "نسخ الرقم" : "Copy ID"}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Instructions Text */}
                <p className="text-xs text-slate-500 leading-relaxed text-start">
                  {isAr
                    ? currentMethod.instructions || providerMeta.defaultInstructionsAr
                    : currentMethod.instructionsEn ||
                      currentMethod.instructions ||
                      providerMeta.defaultInstructionsEn}
                </p>
              </div>
            </div>

            {/* Bottom Actions: WhatsApp Notification & Close */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    isAr
                      ? `مرحباً ${businessName || ""}، لقد أتممت عملية التحويل عبر ${currentMethod.title || providerMeta.nameAr} بقيمة ... يرجى تأكيد الاستلام.`
                      : `Hello ${businessName || ""}, I have completed the transfer via ${currentMethod.title || providerMeta.nameEn}. Please confirm receipt.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? "إرسال إشعار الدفع عبر واتساب" : "Send Receipt via WhatsApp"}</span>
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-[13px] transition-colors cursor-pointer"
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
