import React from "react";
import { useRouter } from "../services/router";
import { ShieldCheck, Database, Users, ArrowRight } from "lucide-react";
import { Logo } from "../components/Logo";

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans [direction:rtl] text-right">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <Logo />
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            <span>الرئيسية</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6 text-cyan-400">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
          لوحة إدارة منظومة SHAM360
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
          بوابة الإدارة المخصصة لفريق عمل SHAM360 لإنشاء وتفعيل الملفات الرقمية للعملاء وإدارة تصنيفات دليل الأعمال السوري.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-right">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">إدارة البروفايلات</h4>
            <p className="text-[11px] text-slate-400">إصدار بطاقات NFC وتفعيل المعرّفات الفريدة للعملاء.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <Database className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-xs font-bold text-white mb-1">توثيق الدليل</h4>
            <p className="text-[11px] text-slate-400">مراجعة بيانات الأنشطة وتعيين شارة التحقق الرسمية.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all"
        >
          العودة للرئيسية
        </button>
      </main>
    </div>
  );
};
