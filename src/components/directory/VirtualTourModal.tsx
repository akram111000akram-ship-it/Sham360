import React from "react";
import { FirestoreProfile } from "../../types";
import { useRouter } from "../../services/router";
import { DamasceneVR360Showcase } from "../DamasceneVR360Showcase";
import { X, ExternalLink, Compass, MapPin, CheckCircle2 } from "lucide-react";

interface VirtualTourModalProps {
  profile: FirestoreProfile | null;
  onClose: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  profile,
  onClose
}) => {
  const { navigate } = useRouter();

  if (!profile) return null;

  const handleVisitProfile = () => {
    onClose();
    navigate(`/p/${profile.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in font-sans [direction:rtl] text-right">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {profile.name}
                </h3>
                {profile.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{profile.location || `${profile.city || "دمشق"}، سوريا`}</span>
                <span className="text-[#0066FF] font-semibold">• جولة 360° تفاعلية بدقة 8K فائقة الوضوح</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal 360 Interactive Viewer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <DamasceneVR360Showcase isAr={true} compact={false} />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
            <div>
              <p className="font-bold text-slate-900 mb-0.5">
                عن المنشأة: {profile.title}
              </p>
              <p className="text-slate-500 line-clamp-2">
                {profile.bio || "استكشف أركان المنشأة وتجول باللمس أو السحب بزاوية 360 درجة كاملة."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleVisitProfile}
              className="px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shrink-0 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>فتح البروفايل وبطاقة vCard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
