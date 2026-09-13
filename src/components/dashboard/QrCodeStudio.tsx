import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { FirestoreProfile } from "../../types";
import { Sham360OfficialCard } from "../card/Sham360OfficialCard";
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  CreditCard,
  Printer,
  Share2,
  Info
} from "lucide-react";

interface QrCodeStudioProps {
  profile: FirestoreProfile;
  appBaseUrl?: string;
}

export const QrCodeStudio: React.FC<QrCodeStudioProps> = ({ profile }) => {
  const [qrPngUrl, setQrPngUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [cardSide, setCardSide] = useState<"front" | "back">("front");
  const [generating, setGenerating] = useState<boolean>(true);

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/p/${profile.slug}`
    : `https://sham360.online/p/${profile.slug}`;

  // Generate ultra high-definition QR Code (1024x1024) for print
  useEffect(() => {
    let isMounted = true;
    setGenerating(true);

    QRCode.toDataURL(publicUrl, {
      width: 1024,
      margin: 2,
      color: {
        dark: "#0A1128",
        light: "#FFFFFF"
      },
      errorCorrectionLevel: "H" // High error correction allows logo placement in the middle
    })
      .then((url) => {
        if (isMounted) {
          setQrPngUrl(url);
          setGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Failed to generate QR Code:", err);
        setGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [publicUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadPng = () => {
    if (!qrPngUrl) return;
    const link = document.createElement("a");
    link.href = qrPngUrl;
    link.download = `sham360-qr-${profile.slug}-1024px.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSvg = async () => {
    try {
      const svgString = await QRCode.toString(publicUrl, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#0A1128",
          light: "#FFFFFF"
        },
        errorCorrectionLevel: "H"
      });
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sham360-qr-${profile.slug}-vector.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate SVG QR:", err);
    }
  };

  return (
    <div className="space-y-8 font-sans [direction:rtl] text-right">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              استوديو رمز الاستجابة السريعة وتخصيص بطاقات NFC
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              الملف مرتبط مباشرة بالرابط الدائم: <span className="text-[#0066FF] font-mono font-semibold" dir="ltr">{publicUrl}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#0066FF]" />}
            <span>{copied ? "تم النسخ!" : "نسخ الرابط"}</span>
          </button>

          <a
            href={`/p/${profile.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>معاينة الملف</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: QR Code Visualizer & Export Options (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold mb-5">
            <QrCode className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>رمز الاستجابة السريعة بدقة 1024px عالية الجودة</span>
          </div>

          {/* QR Code Presentation Frame */}
          <div className="relative p-5 bg-white rounded-3xl shadow-lg border-2 border-slate-200 mb-6 group">
            {generating ? (
              <div className="w-56 h-56 flex items-center justify-center bg-slate-100 rounded-2xl text-slate-400 text-xs">
                جاري توليد الرمز...
              </div>
            ) : qrPngUrl ? (
              <div className="relative w-56 h-56 flex items-center justify-center">
                <img
                  src={qrPngUrl}
                  alt={`QR Code for ${profile.name}`}
                  className="w-full h-full object-contain rounded-lg"
                />
                {/* Central SHAM360 Watermark Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-[#0066FF] p-2 rounded-xl border-2 border-white shadow-xl flex items-center justify-center">
                    <span className="text-[9px] font-black tracking-widest text-white font-mono">
                      360
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-3 pt-2 border-t border-slate-100 text-center">
              <span className="text-[11px] font-bold text-slate-700 font-mono" dir="ltr">
                sham360.online/p/{profile.slug}
              </span>
            </div>
          </div>

          {/* Action Download Buttons */}
          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={!qrPngUrl}
              className="w-full py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل الرمز كصورة للطباعة (PNG بدقة 1024px)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadSvg}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#0066FF]" />
              <span>تصدير متجه للمطابع (Vector SVG)</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
            الرمز يحتوي على تصحيح أخطاء فائق الجودة، مما يتيح طباعته على بطاقات بلاستيكية، ستاندات طاولات أكريليك للمطاعم، أو ملصقات الزجاج.
          </p>
        </div>

        {/* Right Column: Interactive NFC Smart Card Mockup & Printing Guide (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* NFC Physical Card Simulation */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0066FF]" />
                <h4 className="text-sm font-bold text-slate-900">
                  معاينة بطاقة SHAM360 الذكية الفاخرة (NFC Smart Card)
                </h4>
              </div>

              {/* Side Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCardSide("front")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    cardSide === "front"
                      ? "bg-[#0066FF] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  الوجه الأمامي
                </button>
                <button
                  type="button"
                  onClick={() => setCardSide("back")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    cardSide === "back"
                      ? "bg-[#0066FF] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  الوجه الخلفي (QR)
                </button>
              </div>
            </div>

            {/* Official Enhanced SHAM360 Card */}
            <div className="py-2 flex justify-center">
              <Sham360OfficialCard
                size="lg"
                defaultSide={cardSide}
                cardHolderName={profile.name}
                cardHolderTitle={profile.title || profile.category || "عضو شبكة شام 360"}
                companyName={profile.businessName || "SHAM360 NETWORK"}
                serialNumber={profile.slug.toUpperCase()}
                qrUrl={publicUrl}
                hasQrOnBack={true}
                interactive={true}
                showFlipButton={false}
              />
            </div>
          </div>

          {/* Business & Production Guide */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-md text-right">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-3">
              <Info className="w-4 h-4" />
              <span>دليل استخدام وتفعيل وسائط SHAM360 الذكية:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">بطاقات الأعمال NFC</span>
                <span className="text-slate-500 text-[11px] leading-relaxed block">
                  يمكن برمجة رقاقة NTAG213/215 بالرابط الفريد ليتم فتح البروفايل بمجرد لمس أي هاتف ذكي.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">ستاندات الطاولات الأكريليك</span>
                <span className="text-slate-500 text-[11px] leading-relaxed block">
                  مخصصة للمطاعم والفنادق والعيادات لوضع الرمز على الطاولات وقراءة القائمة أو حجز الموعد.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
