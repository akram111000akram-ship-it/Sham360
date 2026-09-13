import React, { useState } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  resetPassword
} from "../../services/authService";
import { useLanguage } from "../../services/LanguageContext";
import { isFirebaseConfigured } from "../../services/firebase";
import {
  Shield,
  Lock,
  Mail,
  User,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { Logo } from "../Logo";

interface DashboardAuthProps {
  onAuthSuccess?: () => void;
  onDemoLogin?: () => void;
}

export const DashboardAuth: React.FC<DashboardAuthProps> = ({
  onAuthSuccess,
  onDemoLogin
}) => {
  const { isAr, t } = useLanguage();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetSent, setResetSent] = useState<boolean>(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!email.trim() || !password.trim()) {
      setError(isAr ? "يرجى إدخال البريد الإلكتروني وكلمة المرور." : "Please enter your email address and password.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, displayName);
      }
      onAuthSuccess?.();
    } catch (err: any) {
      setError(err.message || (isAr ? "فشلت عملية المصادقة." : "Authentication failed."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onAuthSuccess?.();
    } catch (err: any) {
      setError(err.message || (isAr ? "فشل تسجيل الدخول بواسطة Google." : "Google authentication failed."));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setError(isAr ? "يرجى إدخال البريد الإلكتروني لإرسال رابط الاستعادة." : "Please enter your email to receive the recovery link.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
      setTimeout(() => {
        setShowResetModal(false);
        setResetSent(false);
      }, 4000);
    } catch (err: any) {
      setError(err.message || (isAr ? "تعذر إرسال رابط استعادة كلمة المرور." : "Could not send password reset link."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-100 font-sans ${isAr ? "text-right" : "text-left"}`}
    >
      {/* Header Brand */}
      <div className="text-center mb-6">
        <div className="inline-block mb-3">
          <Logo isAr={isAr} />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          {mode === "login"
            ? (isAr ? "تسجيل الدخول إلى لوحة التحكم" : "Sign in to Dashboard")
            : (isAr ? "إنشاء حساب عميل جديد" : "Create New Account")}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {isAr
            ? "بوابة إدارة البطاقات الذكية، تحرير البيانات، ومتابعة الروابط"
            : "Manage your smart NFC cards, edit live profile, and track analytics"}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 mb-6 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError(null);
          }}
          className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
            mode === "login"
              ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {isAr ? "تسجيل الدخول" : "Sign In"}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setError(null);
          }}
          className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
            mode === "register"
              ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {isAr ? "حساب جديد" : "New Account"}
        </button>
      </div>

      {/* Error / Notice Alert */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successNotice && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Google Provider Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-3 transition-all mb-5 cursor-pointer shadow-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>{isAr ? "المتابعة بحساب Google" : "Continue with Google"}</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] text-slate-400 font-medium">
          {isAr ? "أو بالبريد الإلكتروني" : "or with email"}
        </span>
        <div className="border-t border-slate-200 w-full" />
      </div>

      {/* Email / Password Form */}
      <form onSubmit={handleEmailAuth} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isAr ? "الاسم الكامل / اسم المنشأة" : "Full Name / Organization"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={isAr ? "مثال: م. أكرم دمشقي" : "e.g. Eng. Akram Damascene"}
                className={`w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF] focus:bg-white ${
                  isAr ? "pl-4 pr-10" : "pr-4 pl-10"
                }`}
              />
              <User className={`w-4 h-4 text-slate-400 absolute top-3 ${isAr ? "right-3.5" : "left-3.5"}`} />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isAr ? "البريد الإلكتروني" : "Email Address"}
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={`w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono [direction:ltr] focus:outline-none focus:border-[#0066FF] focus:bg-white text-left ${
                isAr ? "pl-4 pr-10" : "pr-4 pl-10"
              }`}
              required
            />
            <Mail className={`w-4 h-4 text-slate-400 absolute top-3 ${isAr ? "right-3.5" : "left-3.5"}`} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {isAr ? "كلمة المرور" : "Password"}
            </label>
            {mode === "login" && (
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setShowResetModal(true);
                }}
                className="text-[11px] text-[#0066FF] hover:underline cursor-pointer font-semibold"
              >
                {isAr ? "نسيت كلمة المرور؟" : "Forgot Password?"}
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono [direction:ltr] focus:outline-none focus:border-[#0066FF] focus:bg-white text-left ${
                isAr ? "pl-4 pr-10" : "pr-4 pl-10"
              }`}
              required
              minLength={6}
            />
            <Lock className={`w-4 h-4 text-slate-400 absolute top-3 ${isAr ? "right-3.5" : "left-3.5"}`} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
        >
          {loading
            ? (isAr ? "جاري التحقق..." : "Verifying...")
            : mode === "login"
            ? (isAr ? "تسجيل الدخول" : "Sign In")
            : (isAr ? "إنشاء حساب وتفعيل الملف" : "Create Account & Activate Profile")}
        </button>
      </form>

      {/* Demo Mode / Offline Testing Button */}
      <div className="mt-6 pt-5 border-t border-slate-200 text-center">
        <button
          type="button"
          onClick={onDemoLogin}
          className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] text-xs font-bold border border-blue-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>{isAr ? "تجربة لوحة التحكم (وضع العرض التجريبي السريع)" : "Explore Dashboard (Quick Demo Mode)"}</span>
        </button>
        <p className="text-[10px] text-slate-500 mt-2">
          {isAr
            ? "يتيح لك استكشاف محرر الملف وتوليد رموز QR فوراً دون تسجيل الدخول."
            : "Explore the live profile editor, NFC simulators, and QR generation instantly."}
        </p>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div dir={isAr ? "rtl" : "ltr"} className={`w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl ${isAr ? "text-right" : "text-left"}`}>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              {isAr ? "استعادة كلمة المرور" : "Reset Password"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {isAr
                ? "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور فوراً."
                : "Enter your email address to receive an instant password reset link."}
            </p>

            {resetSent ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? "تم إرسال رابط الاستعادة إلى بريدك الإلكتروني!" : "Reset link sent to your email!"}</span>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3 mb-4">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono [direction:ltr] focus:outline-none focus:border-[#0066FF]"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  {isAr ? "إرسال رابط الاستعادة" : "Send Recovery Link"}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setShowResetModal(false)}
              className="w-full py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
