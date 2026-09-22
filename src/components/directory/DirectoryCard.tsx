import React from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Compass,
  Star,
  QrCode,
  Landmark,
  CheckCircle2,
  Flame,
  ArrowRight,
  ArrowLeft,
  Navigation,
  MessageCircle,
  Download,
  Share2
} from "lucide-react";
import { DirectoryItem } from "../../data/directoryData";
import { useLanguage } from "../../services/LanguageContext";

interface DirectoryCardProps {
  item: DirectoryItem;
  onOpenProfile: (item: DirectoryItem) => void;
  onOpenGoogleMaps: (item: DirectoryItem) => void;
  onOpenWhatsApp: (item: DirectoryItem) => void;
  onDownloadVCard: (item: DirectoryItem) => void;
  onOpenQrPoster: (item: DirectoryItem) => void;
  onShare: (item: DirectoryItem) => void;
}

export const DirectoryCard: React.FC<DirectoryCardProps> = ({
  item,
  onOpenProfile,
  onOpenGoogleMaps,
  onOpenWhatsApp,
  onDownloadVCard,
  onOpenQrPoster,
  onShare
}) => {
  const { isAr, t } = useLanguage();

  const displayName = isAr ? item.nameAr : (item.nameEn || item.nameAr);
  const displayTitle = isAr ? item.titleAr : (item.titleEn || item.titleAr);
  const displayCity = isAr ? item.cityAr : (item.cityEn || item.cityAr);
  const displayBio = isAr ? item.bioAr : (item.bioEn || item.bioAr);
  const displayAddress = isAr ? item.addressAr : (item.addressEn || item.addressAr);
  const displayHours = isAr
    ? item.openingHoursAr
    : (item.isOpenNow ? `Open Now • ${item.openingHoursEn || "09:00 - 18:00"}` : `Closed Now • ${item.openingHoursEn || "09:00 - 18:00"}`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      dir={isAr ? "rtl" : "ltr"}
      className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-[#0066FF] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,102,255,0.08)] flex flex-col justify-between overflow-hidden text-start"
    >
      {/* Top Cover Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={item.coverUrl}
          alt={displayName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

        {/* Top Badges: City & VR */}
        <div className={`absolute top-3 ${isAr ? "right-3" : "left-3"} flex items-center gap-1.5`}>
          <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 text-white text-[11px] font-bold backdrop-blur-md border border-white/10 flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>{displayCity}</span>
          </span>

          {item.hasVrTour && (
            <span className="px-2.5 py-1 rounded-xl bg-[#0066FF]/90 text-white text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-sm">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} />
              <span>360° VR</span>
            </span>
          )}
        </div>

        {/* Top Operational Status Badge (Open Now 🟢 / Closed Now 🔴) */}
        <div className={`absolute top-3 ${isAr ? "left-3" : "right-3"} flex flex-col ${isAr ? "items-end" : "items-start"} gap-1`}>
          <div
            className={`px-2.5 py-1 rounded-xl text-[10px] font-black backdrop-blur-md flex items-center gap-1.5 shadow-sm ${
              item.isOpenNow
                ? "bg-emerald-500/90 text-white border border-emerald-400/40"
                : "bg-slate-800/90 text-slate-300 border border-slate-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.isOpenNow ? "bg-white animate-pulse" : "bg-slate-400"
              }`}
            />
            <span>{displayHours}</span>
          </div>
        </div>

        {/* Bottom Image Info: QR Poster & Rating */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-md border border-white/10">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-mono">{item.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[9px]">({item.reviewsCount})</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQrPoster(item);
            }}
            className="px-2.5 py-1 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-[10px] font-bold backdrop-blur-md border border-slate-200 flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
            title={isAr ? "توليد ملصق QR للطباعة" : "Generate Printable QR Poster"}
          >
            <QrCode className="w-3 h-3 text-[#0066FF]" />
            <span>{t("common.qrPoster", "ملصق QR")}</span>
          </button>
        </div>
      </div>

      {/* Middle Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Avatar & Title */}
        <div className="flex items-start gap-3">
          <div className="relative -mt-10 shrink-0">
            <img
              src={item.avatarUrl}
              alt={displayName}
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
            />
            {item.verifiedBadgeType === "cultural_verified" ? (
              <div
                className={`absolute -bottom-1 ${isAr ? "-right-1" : "-left-1"} w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs border-2 border-white`}
                title={isAr ? "معلم ثقافي موثق" : "Verified Cultural Heritage"}
              >
                <Landmark className="w-3 h-3" />
              </div>
            ) : (
              <div
                className={`absolute -bottom-1 ${isAr ? "-right-1" : "-left-1"} w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-xs border-2 border-white`}
                title={isAr ? "عضو موثق NFC" : "Verified NFC Member"}
              >
                <CheckCircle2 className="w-3 h-3" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-black text-slate-950 truncate">{displayName}</h3>
              {item.verifiedBadgeType === "cultural_verified" ? (
                <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-black">
                  {isAr ? "معلم ثقافي موثق 🏛️" : "Verified Heritage 🏛️"}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-[10px] font-black">
                  {isAr ? "عضو موثق NFC ⚡" : "Verified NFC Member ⚡"}
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-[#0066FF] mt-0.5 leading-tight">{displayTitle}</p>
          </div>
        </div>

        {/* Bio Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{displayBio}</p>

        {/* Address & Live Weekly Activity */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span className="truncate max-w-[200px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
            <span className="truncate">{displayAddress}</span>
          </span>
          <span className="text-amber-600 font-bold shrink-0 flex items-center gap-0.5">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>+{item.weeklyEngagement} {t("common.interactions", "تفاعل")}</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="space-y-2 pt-2">
          {/* Row 1: Profile View + Direct Google Maps Navigation */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-profile-${item.slug}`}
              type="button"
              onClick={() => onOpenProfile(item)}
              className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-[#0066FF] text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <span>{t("common.viewProfile", "عرض البروفايل")}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>

            <button
              id={`btn-gmaps-${item.slug}`}
              type="button"
              onClick={() => onOpenGoogleMaps(item)}
              className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              title={isAr ? "ملاحة خرائط Google المباشرة" : "Direct Google Maps Navigation"}
            >
              <Navigation className="w-3.5 h-3.5 text-rose-600" />
              <span>Google Maps 📍</span>
            </button>
          </div>

          {/* Row 2: Secondary Quick Actions */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => onOpenWhatsApp(item)}
              className="py-2 px-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title={isAr ? "محادثة واتساب مباشرة" : "WhatsApp Direct Chat"}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t("common.whatsapp", "واتساب")}</span>
            </button>

            <button
              type="button"
              onClick={() => onDownloadVCard(item)}
              className="py-2 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title={isAr ? "تحميل جهة الاتصال للهاتف (vCard)" : "Download Phone Contact (vCard)"}
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>{t("common.saveContactShort", "حفظ جهة")}</span>
            </button>

            <button
              type="button"
              onClick={() => onShare(item)}
              className="py-2 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title={isAr ? "مشاركة الرابط الذكي" : "Share Smart Link"}
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{t("common.share", "مشاركة")}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
