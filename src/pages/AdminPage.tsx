import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "../services/router";
import { useLanguage } from "../services/LanguageContext";
import { Logo } from "../components/Logo";
import {
  ShieldCheck,
  Package,
  Calendar,
  CreditCard,
  Building2,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  ExternalLink,
  Copy,
  Check,
  Upload,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Lock,
  Zap,
  DollarSign,
  MapPin,
  Clock,
  Eye,
  Filter,
  Download,
  Globe,
  FileSpreadsheet,
  Layers,
  Cpu
} from "lucide-react";
import { StoreProduct, SyrianEvent } from "../types";
import {
  getAllStoreProducts,
  saveStoreProduct,
  deleteStoreProduct,
  INITIAL_STORE_PRODUCTS
} from "../services/productService";
import {
  getAllSyrianEvents,
  saveSyrianEvent,
  deleteSyrianEvent
} from "../services/eventsService";
import {
  getAllNFCTokens,
  generateNewNFCToken,
  generateBulkNFCTokens,
  deleteNFCToken,
  NFCToken
} from "../services/nfcTokenService";
import {
  uploadProductImage,
  uploadEventCover
} from "../services/storageService";
import { DIRECTORY_DATA, DirectoryItem } from "../data/directoryData";

type AdminTab = "products" | "tokens" | "events" | "directory";

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();
  const { isAr, toggleLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam && ["products", "tokens", "events", "directory"].includes(tabParam)) {
        return tabParam as AdminTab;
      }
    }
    return "products";
  });
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // Products State
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);

  // Tokens State (NFC Token Manager)
  const [tokens, setTokens] = useState<NFCToken[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(true);
  const [tokenBatchCount, setTokenBatchCount] = useState<number>(5);
  const [batchBatchId, setBatchBatchId] = useState<string>("BATCH-2026-SY");
  const [selectedHardwareType, setSelectedHardwareType] = useState<NFCToken["cardType"]>("metal");
  const [tokenSearch, setTokenSearch] = useState<string>("");
  const [tokenFilter, setTokenFilter] = useState<"all" | "unassigned" | "active">("all");
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedBatchUrls, setCopiedBatchUrls] = useState<boolean>(false);

  // Events State
  const [events, setEvents] = useState<SyrianEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SyrianEvent | null>(null);

  // Directory State
  const [directoryItems, setDirectoryItems] = useState<DirectoryItem[]>([...DIRECTORY_DATA]);
  const [dirSearch, setDirSearch] = useState("");

  const showNotice = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Initial Data Fetch
  useEffect(() => {
    loadProducts();
    loadTokens();
    loadEvents();
  }, []);

  const loadProducts = async () => {
    setLoadingProducts(true);
    const data = await getAllStoreProducts();
    setProducts(data);
    setLoadingProducts(false);
  };

  const loadTokens = async () => {
    setLoadingTokens(true);
    const data = await getAllNFCTokens();
    setTokens(data);
    setLoadingTokens(false);
  };

  const loadEvents = async () => {
    setLoadingEvents(true);
    const data = await getAllSyrianEvents();
    setEvents(data);
    setLoadingEvents(false);
  };

  // Token Issuance (Single & Bulk)
  const handleIssueTokens = async (qtyOverride?: number) => {
    try {
      setIsBulkGenerating(true);
      const count = Math.min(Math.max(qtyOverride ?? tokenBatchCount, 1), 100);
      await generateBulkNFCTokens({
        count,
        batchNumber: batchBatchId || `BATCH-${new Date().getFullYear()}-SY`,
        cardType: selectedHardwareType
      });
      await loadTokens();
      showNotice(
        isAr
          ? `تم بنجاح توليد ${count} معرّف NFC مشفر وجاهز للبرمجة عبر تطبيق NFC Tools.`
          : `Successfully generated ${count} encrypted NFC tokens ready for NFC Tools encoding.`
      );
    } catch (err: any) {
      showNotice(err.message || "Failed to generate tokens");
    } finally {
      setIsBulkGenerating(false);
    }
  };

  // Delete unassigned token
  const handleDeleteToken = async (tokenId: string) => {
    if (!window.confirm(isAr ? `هل أنت متأكد من حذف المعرّف ${tokenId}؟` : `Delete token ${tokenId}?`)) {
      return;
    }
    try {
      await deleteNFCToken(tokenId);
      await loadTokens();
      showNotice(isAr ? "تم حذف المعرّف بنجاح." : "Token deleted successfully.");
    } catch (err: any) {
      showNotice(err.message || "Failed to delete token");
    }
  };

  // Filtered Tokens
  const filteredTokens = useMemo(() => {
    return tokens.filter((t) => {
      if (tokenFilter === "unassigned" && t.status !== "unassigned") return false;
      if (tokenFilter === "active" && t.status !== "active") return false;
      if (tokenSearch.trim()) {
        const q = tokenSearch.trim().toLowerCase();
        const matchToken = t.token.toLowerCase().includes(q);
        const matchProfile = (t.profileSlug || t.profileId || "").toLowerCase().includes(q);
        const matchBatch = (t.batchNumber || "").toLowerCase().includes(q);
        return matchToken || matchProfile || matchBatch;
      }
      return true;
    });
  }, [tokens, tokenFilter, tokenSearch]);

  // Export for NFC Tools (CSV format)
  const handleExportCSV = () => {
    if (!filteredTokens.length) return;
    const header = "Token,Full_URL,Status,Assigned_Profile,Hardware_Type,Batch_Number,Created_At";
    const rows = filteredTokens.map((t) => {
      const fullUrl = `https://sham360.online/p/${t.token}`;
      const profile = t.profileSlug || t.profileId || "Unassigned";
      return `"${t.token}","${fullUrl}","${t.status}","${profile}","${t.cardType || "metal"}","${t.batchNumber || ""}","${t.createdAt || ""}"`;
    });
    const csvContent = [header, ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `sham360_nfc_tokens_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice(
      isAr
        ? "تم تصدير ملف CSV بنجاح، متوافق مع NFC Tools وأجهزة كتابة البطاقات."
        : "Exported CSV successfully, ready for NFC Tools and card programmers."
    );
  };

  // Copy All URLs (TXT format for NFC Tools Batch Mode)
  const handleCopyAllUrls = () => {
    if (!filteredTokens.length) return;
    const text = filteredTokens
      .map((t) => `https://sham360.online/p/${t.token}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopiedBatchUrls(true);
    setTimeout(() => setCopiedBatchUrls(false), 3000);
    showNotice(
      isAr
        ? `تم نسخ ${filteredTokens.length} رابط برمجياً، جاهزة للصق في نمط الكتابة الجماعي لـ NFC Tools.`
        : `Copied ${filteredTokens.length} token URLs for NFC Tools batch writing mode.`
    );
  };

  // Product Save / Delete
  const handleSaveProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const safeId = editingProduct?.id || `prod-${Date.now()}`;
    const newProd: StoreProduct = {
      id: safeId,
      nameAr: (formData.get("nameAr") as string) || "منتج ذكي جديد",
      nameEn: (formData.get("nameEn") as string) || "New Smart Product",
      subtitleAr: (formData.get("subtitleAr") as string) || "",
      subtitleEn: (formData.get("subtitleEn") as string) || "",
      category: (formData.get("category") as any) || "cards",
      priceSyp: Number(formData.get("priceSyp")) || 150000,
      priceUsd: Number(formData.get("priceUsd")) || 12,
      stockStatus: (formData.get("stockStatus") as any) || "in_stock",
      stockCount: Number(formData.get("stockCount")) || 50,
      imageSrc:
        (formData.get("imageSrc") as string) ||
        editingProduct?.imageSrc ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      badgeAr: (formData.get("badgeAr") as string) || "جديد",
      badgeEn: (formData.get("badgeEn") as string) || "New",
      featuresAr: (formData.get("featuresAr") as string)
        ? (formData.get("featuresAr") as string).split("\n").filter(Boolean)
        : ["شريحة NFC عالية الحساسية", "تشفير NTAG216", "دعم جميع الهواتف"],
      featuresEn: ["High sensitivity NFC chip", "Universal smartphone support", "Instant vCard"],
      idealForAr: "أصحاب الأعمال والمهنيين والمؤسسات السورية",
      idealForEn: "Entrepreneurs, doctors, engineers, and Syrian businesses",
      descriptionAr: (formData.get("descriptionAr") as string) || "",
      descriptionEn: "",
      isFeatured: formData.get("isFeatured") === "on"
    };

    await saveStoreProduct(newProd);
    await loadProducts();
    setProductModalOpen(false);
    setEditingProduct(null);
    showNotice(isAr ? "تم حفظ وتحديث بيانات المنتج بنجاح." : "Product saved successfully.");
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm(isAr ? "هل أنت متأكد من حذف هذا المنتج؟" : "Delete this product?")) {
      await deleteStoreProduct(id);
      await loadProducts();
      showNotice(isAr ? "تم حذف المنتج بنجاح." : "Product deleted.");
    }
  };

  // Event Save / Delete
  const handleSaveEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const safeId = editingEvent?.id || `evt-${Date.now()}`;
    const newEvt: SyrianEvent = {
      id: safeId,
      titleAr: (formData.get("titleAr") as string) || "فعالية جديدة",
      titleEn: (formData.get("titleEn") as string) || "New Event",
      category: (formData.get("category") as any) || "cultural",
      startDate: "2026-10-15",
      dateText: (formData.get("dateText") as string) || "2026",
      time: (formData.get("time") as string) || "6:00 PM",
      city: (formData.get("city") as string) || "دمشق",
      venueAr: (formData.get("venueAr") as string) || "دمشق القديمة",
      venueEn: (formData.get("venueEn") as string) || "Old Damascus",
      coverImage:
        (formData.get("coverImage") as string) ||
        editingEvent?.coverImage ||
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      descriptionAr: (formData.get("descriptionAr") as string) || "",
      descriptionEn: "",
      organizerAr: (formData.get("organizerAr") as string) || "منظومة شام 360",
      priceAr: (formData.get("priceAr") as string) || "دخول مجاني",
      priceEn: "Free Admission",
      googleMapsUrl:
        (formData.get("googleMapsUrl") as string) ||
        "https://maps.google.com/?q=Damascus+Syria",
      whatsappRsvp: (formData.get("whatsappRsvp") as string) || "+963933888999",
      isFeatured: formData.get("isFeatured") === "on",
      status: "upcoming",
      tags: ["Syria", "Events 2026", "SHAM360"]
    };

    await saveSyrianEvent(newEvt);
    await loadEvents();
    setEventModalOpen(false);
    setEditingEvent(null);
    showNotice(isAr ? "تم حفظ الفعالية ونشرها بنجاح." : "Event published successfully.");
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm(isAr ? "هل أنت متأكد من حذف هذه الفعالية؟" : "Delete this event?")) {
      await deleteSyrianEvent(id);
      await loadEvents();
      showNotice(isAr ? "تم حذف الفعالية." : "Event deleted.");
    }
  };

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-white font-sans ${
        isAr ? "[direction:rtl] text-right" : "[direction:ltr] text-left"
      }`}
    >
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <Logo />
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-[11px] font-mono font-bold border border-blue-500/30">
              ADMIN CONTROL 2.5
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-700"
            >
              {isAr ? "لوحة العميل" : "Customer Hub"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{isAr ? "الرئيسية" : "Home"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? "لوحة التحكم والإشراف المركزية" : "Central Admin Dashboard"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {isAr ? "إدارة أجهزة ومنظومة SHAM360" : "SHAM360 Enterprise Control Panel"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {isAr
                ? "إصدار بطاقات وعصي NFC المشفرة، إدارة أسعار ومخزون الأجهزة الذكية، وتوثيق معالم الدليل وأجندة الفعاليات السورية 2026."
                : "Manage hardware inventory, issue cryptographic NFC tokens, moderate directory listings, and publish national events."}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                loadProducts();
                loadTokens();
                loadEvents();
                showNotice(isAr ? "تم تحديث البيانات." : "Refreshed.");
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? "تحديث" : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Global Feedback Notice */}
        {feedbackNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-cyan-200 text-xs font-bold flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{feedbackNotice}</span>
          </motion.div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 border-b border-slate-800">
          {[
            {
              id: "products" as AdminTab,
              labelAr: "منتجات ومخزون NFC",
              labelEn: "Hardware Products",
              icon: Package,
              count: products.length
            },
            {
              id: "tokens" as AdminTab,
              labelAr: "مدير معرّفات وبطاقات NFC",
              labelEn: "NFC Token Manager",
              icon: CreditCard,
              count: tokens.length
            },
            {
              id: "events" as AdminTab,
              labelAr: "أجندة الفعاليات السورية",
              labelEn: "Syrian Events",
              icon: Calendar,
              count: events.length
            },
            {
              id: "directory" as AdminTab,
              labelAr: "توثيق دليل المعالم والأنشطة",
              labelEn: "Directory Moderation",
              icon: Building2,
              count: directoryItems.length
            }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#0066FF] text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCTS INVENTORY */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  {isAr ? "كتالوج منتجات وأجهزة NFC الذكية" : "NFC Hardware Catalog"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isAr
                    ? "تعديل الأسعار بالليرة السورية والدولار وتحديث المخزون والمواصفات."
                    : "Update hardware pricing (SYP / USD), stock levels, and specs."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setProductModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة منتج جديد" : "Add Product"}</span>
              </button>
            </div>

            {loadingProducts ? (
              <div className="py-12 text-center text-xs text-slate-400">
                {isAr ? "جاري تحميل المنتجات..." : "Loading products..."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                  >
                    <div>
                      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                        <img
                          src={prod.imageSrc}
                          alt={prod.nameAr}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 start-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                          {prod.category}
                        </div>
                        <div className="absolute top-2 end-2 px-2 py-0.5 rounded-md bg-emerald-500/80 text-white text-[10px] font-bold">
                          {prod.stockStatus === "in_stock" ? "متوفر" : "نفد المخزون"} ({prod.stockCount})
                        </div>
                      </div>

                      <h4 className="text-sm font-black text-white mb-1 line-clamp-1">
                        {isAr ? prod.nameAr : prod.nameEn}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {isAr ? prod.subtitleAr : prod.subtitleEn}
                      </p>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">السعر (SYP):</span>
                          <span className="font-bold text-cyan-300">
                            {prod.priceSyp.toLocaleString()} ل.س
                          </span>
                        </div>
                        <div className="text-end">
                          <span className="text-[10px] text-slate-500 block">السعر (USD):</span>
                          <span className="font-bold text-emerald-400">${prod.priceUsd}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(prod);
                          setProductModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>تعديل</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NFC TOKEN MANAGER */}
        {activeTab === "tokens" && (
          <div className="space-y-6">
            {/* KPI Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isAr ? "إجمالي معرّفات NFC المسجلة" : "Total NFC Tokens"}
                  </span>
                  <span className="text-2xl font-black text-white font-mono">{tokens.length}</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 text-cyan-400">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isAr ? "جاهزة للبرمجة والتفعيل (Unassigned)" : "Ready for NFC Encoding"}
                  </span>
                  <span className="text-2xl font-black text-cyan-300 font-mono">
                    {tokens.filter((t) => t.status === "unassigned").length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-300">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isAr ? "بطاقات مفعلة ومرتبطة بملفات" : "Active & Bound Profiles"}
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {tokens.filter((t) => t.status === "active").length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Token Generator Panel */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>{isAr ? "توليد وإصدار معرّفات NFC المشفرة (Single / Bulk)" : "Cryptographic Token & Link Generator"}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isAr
                      ? "توليد روابط تشفيرية آمنة (مثل: https://sham360.online/p/sham_XXXXXX) جاهزة للبرمجة على شرائح NTAG213/215/216 عبر تطبيق NFC Tools."
                      : "Generate cryptographically secure URLs (e.g., https://sham360.online/p/sham_XXXXXX) for writing onto NTAG213/215/216 chips via NFC Tools."}
                  </p>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-bold">
                  NTAG213 / NTAG215 / NTAG216
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Batch ID */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                    {isAr ? "معرّف دفعة الإنتاج (Batch ID):" : "Production Batch ID:"}
                  </label>
                  <input
                    type="text"
                    value={batchBatchId}
                    onChange={(e) => setBatchBatchId(e.target.value)}
                    placeholder="BATCH-2026-SY01"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Hardware Type Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                    {isAr ? "نوع المنتج الذكي (Hardware Model):" : "Hardware Model:"}
                  </label>
                  <select
                    value={selectedHardwareType}
                    onChange={(e) => setSelectedHardwareType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-sans focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="metal">
                      {isAr ? "بطاقة معدنية فاخرة (Matte Black Metal)" : "Matte Black Metal Card"}
                    </option>
                    <option value="wood">
                      {isAr ? "بطاقة خشب دمشقي (Damascene Wood)" : "Damascene Wood Card"}
                    </option>
                    <option value="stand">
                      {isAr ? "ستاند طاولة أكريليك (Table Acrylic Stand)" : "Smart Table Stand"}
                    </option>
                    <option value="keychain">
                      {isAr ? "ميدالية مفاتيح ذكية (Smart Keychain)" : "Smart Keychain"}
                    </option>
                    <option value="sticker">
                      {isAr ? "ملصق NFC ذكي (Universal NFC Tag)" : "Universal NFC Tag"}
                    </option>
                  </select>
                </div>

                {/* Quantity and Presets */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                    {isAr ? "عدد البطاقات المراد توليدها:" : "Batch Quantity:"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={tokenBatchCount}
                      onChange={(e) => setTokenBatchCount(Math.min(Math.max(Number(e.target.value), 1), 100))}
                      className="w-24 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono text-center focus:border-cyan-400 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1">
                      {[1, 5, 10, 25, 50].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTokenBatchCount(num)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            tokenBatchCount === num
                              ? "bg-cyan-500 text-slate-950 font-black"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-750"
                          }`}
                        >
                          +{num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isBulkGenerating}
                  onClick={() => handleIssueTokens(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? "توليد معرّف فردي (Single)" : "Generate Single Token"}</span>
                </button>

                <button
                  type="button"
                  disabled={isBulkGenerating}
                  onClick={() => handleIssueTokens()}
                  className="px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs transition-all shadow-lg shadow-blue-600/30 cursor-pointer flex items-center gap-2"
                >
                  {isBulkGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Layers className="w-4 h-4" />
                  )}
                  <span>
                    {isAr
                      ? `توليد دفعة إنتاج (${tokenBatchCount} معرّف)`
                      : `Generate Batch (${tokenBatchCount} Tokens)`}
                  </span>
                </button>
              </div>
            </div>

            {/* Filter, Search & Export Bar */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={tokenSearch}
                    onChange={(e) => setTokenSearch(e.target.value)}
                    placeholder={isAr ? "بحث عن معرّف، ملف، دفعة..." : "Search token, profile, batch..."}
                    className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTokenFilter("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tokenFilter === "all"
                        ? "bg-[#0066FF] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isAr ? "الكل" : "All"} ({tokens.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTokenFilter("unassigned")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tokenFilter === "unassigned"
                        ? "bg-cyan-500 text-slate-950"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isAr ? "جاهزة للبرمجة" : "Unassigned"} ({tokens.filter((t) => t.status === "unassigned").length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTokenFilter("active")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tokenFilter === "active"
                        ? "bg-emerald-500 text-slate-950"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isAr ? "مفعلة" : "Active"} ({tokens.filter((t) => t.status === "active").length})
                  </button>
                </div>
              </div>

              {/* Export Controls for NFC Tools */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyAllUrls}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
                  title={isAr ? "نسخ جميع الروابط كنص للتشفير المتعدد" : "Copy URLs as list for multi-write"}
                >
                  {copiedBatchUrls ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{copiedBatchUrls ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الروابط (TXT)" : "Copy URLs")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-700/20"
                  title={isAr ? "تصدير ملف CSV لبرنامج NFC Tools" : "Export CSV for NFC Tools"}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{isAr ? "تصدير NFC Tools (CSV)" : "Export CSV (NFC Tools)"}</span>
                </button>
              </div>
            </div>

            {/* Tokens Table */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 font-bold text-white">
                  <span>{isAr ? "سجل بطاقات ومعرفات NFC:" : "Registered Token Registry:"}</span>
                  <span className="text-cyan-400 font-mono">({filteredTokens.length})</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SHAM360 SMART CLOUD</span>
                </div>
              </div>

              {filteredTokens.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-400 space-y-2">
                  <AlertCircle className="w-6 h-6 text-slate-600 mx-auto" />
                  <p>{isAr ? "لا توجد معرّفات مطابقة لمعايير البحث." : "No tokens match the current filter."}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className={`w-full text-xs ${isAr ? "text-right" : "text-left"}`}>
                    <thead className="bg-slate-950 text-slate-400 text-[11px]">
                      <tr>
                        <th className="p-3.5">{isAr ? "معرّف البطاقة (Token)" : "Token ID"}</th>
                        <th className="p-3.5">{isAr ? "نوع المنتج" : "Hardware"}</th>
                        <th className="p-3.5">{isAr ? "رابط البرمجة والإنتاج (NFC URL)" : "Production NFC Link"}</th>
                        <th className="p-3.5">{isAr ? "حالة التعيين" : "Status"}</th>
                        <th className="p-3.5">{isAr ? "الملف المقترن" : "Bound Profile"}</th>
                        <th className="p-3.5">{isAr ? "الدفعة" : "Batch"}</th>
                        <th className="p-3.5 text-center">{isAr ? "إجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                      {filteredTokens.map((tok) => {
                        const fullProductionUrl = `https://sham360.online/p/${tok.token}`;
                        const isCopied = copiedToken === tok.token;
                        return (
                          <tr key={tok.token} className="hover:bg-slate-850/50 transition-colors">
                            {/* Token ID */}
                            <td className="p-3.5 font-bold text-cyan-300">
                              <div className="flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                <span>{tok.token}</span>
                              </div>
                            </td>

                            {/* Hardware Model */}
                            <td className="p-3.5 font-sans">
                              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold">
                                {tok.cardType === "metal"
                                  ? isAr ? "معدن فاخر" : "Metal"
                                  : tok.cardType === "wood"
                                  ? isAr ? "خشب دمشقي" : "Wood"
                                  : tok.cardType === "stand"
                                  ? isAr ? "ستاند طاولة" : "Stand"
                                  : tok.cardType === "keychain"
                                  ? isAr ? "ميدالية" : "Keychain"
                                  : isAr ? "ملصق NFC" : "Sticker"}
                              </span>
                            </td>

                            {/* Production URL */}
                            <td className="p-3.5 font-mono text-slate-300">
                              <div className="flex items-center gap-1.5 max-w-xs">
                                <span className="truncate text-slate-400" title={fullProductionUrl}>
                                  {fullProductionUrl}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(fullProductionUrl);
                                    setCopiedToken(tok.token);
                                    setTimeout(() => setCopiedToken(null), 2000);
                                  }}
                                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                  title={isAr ? "نسخ الرابط" : "Copy link"}
                                >
                                  {isCopied ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="p-3.5">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                                  tok.status === "active"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                }`}
                              >
                                {tok.status === "active"
                                  ? isAr ? "مفعلة (Active)" : "Active"
                                  : isAr ? "جاهزة للبرمجة (Unassigned)" : "Unassigned"}
                              </span>
                            </td>

                            {/* Bound Profile */}
                            <td className="p-3.5 font-sans text-slate-300">
                              {tok.profileSlug ? (
                                <a
                                  href={`/p/${tok.profileSlug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-400 hover:underline flex items-center gap-1"
                                >
                                  <span>/p/{tok.profileSlug}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-slate-500 text-[10px]">
                                  {isAr ? "غير مقيد بعد" : "Not bound yet"}
                                </span>
                              )}
                            </td>

                            {/* Batch Number */}
                            <td className="p-3.5 text-slate-400 font-mono text-[10px]">
                              {tok.batchNumber || "—"}
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 text-center">
                              <div className="flex items-center justify-center gap-1.5 font-sans">
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      tok.status === "active"
                                        ? `/p/${tok.token}`
                                        : `/activateCardPage?token=${tok.token}`
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1"
                                  title={
                                    tok.status === "active"
                                      ? isAr ? "عرض الملف الذكي" : "View Smart Profile"
                                      : isAr ? "اختبار التفعيل المباشر" : "Test Direct Activation"
                                  }
                                >
                                  <span>{tok.status === "active" ? (isAr ? "عرض" : "View") : (isAr ? "تفعيل" : "Activate")}</span>
                                </button>

                                {tok.status === "unassigned" && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteToken(tok.token)}
                                    className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs cursor-pointer"
                                    title={isAr ? "حذف المعرّف" : "Delete Token"}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SYRIAN EVENTS MANAGEMENT */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  {isAr ? "إدارة أجندة الفعاليات السورية 2026" : "Syrian Events Management"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isAr
                    ? "إضافة معارض، أمسيات موسيقية، ومهرجانات سياحية وثقافية مع تحديد الموقع على الخريطة."
                    : "Publish cultural, economic, and tourism events with live Google Maps links."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingEvent(null);
                  setEventModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة فعالية جديدة" : "Add Event"}</span>
              </button>
            </div>

            {loadingEvents ? (
              <div className="py-12 text-center text-xs text-slate-400">
                {isAr ? "جاري تحميل الفعاليات..." : "Loading events..."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-950">
                        <img
                          src={evt.coverImage}
                          alt={evt.titleAr}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 start-2 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold">
                          {evt.city}
                        </div>
                        <div className="absolute bottom-2 start-2 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                          {evt.dateText}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-black text-white line-clamp-1">
                          {evt.titleAr}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="truncate">{evt.venueAr}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {evt.descriptionAr}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                      <span className="text-[11px] font-bold text-emerald-400">
                        {evt.priceAr}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEvent(evt);
                            setEventModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>تعديل</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DIRECTORY MODERATION */}
        {activeTab === "directory" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">
                  {isAr ? "توثيق واعتماد معالم ومنشآت الدليل" : "Directory Verification"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isAr
                    ? "فحص وتوثيق المنشآت وإعطاء شارة التوثيق الوطنية الرسمية (Verified Badge)."
                    : "Review listings and toggle verified badges."}
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                <input
                  type="text"
                  value={dirSearch}
                  onChange={(e) => setDirSearch(e.target.value)}
                  placeholder="ابحث بالاسم أو المدينة..."
                  className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 text-[11px]">
                    <tr>
                      <th className="p-3.5">المنشأة / المعلم</th>
                      <th className="p-3.5">المدينة</th>
                      <th className="p-3.5">التصنيف</th>
                      <th className="p-3.5">شارة التوثيق</th>
                      <th className="p-3.5">الرابط</th>
                      <th className="p-3.5 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {directoryItems
                      .filter(
                        (i) =>
                          !dirSearch ||
                          i.nameAr.includes(dirSearch) ||
                          i.cityAr.includes(dirSearch)
                      )
                      .slice(0, 15)
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-850/50">
                          <td className="p-3.5 font-bold text-white flex items-center gap-2">
                            <img
                              src={item.avatarUrl || item.coverUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <span>{item.nameAr}</span>
                          </td>
                          <td className="p-3.5 text-slate-300">{item.cityAr}</td>
                          <td className="p-3.5 text-slate-400">{item.category}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.verified
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {item.verified ? "موثق رسمي" : "قيد المراجعة"}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-[11px] text-cyan-400">
                            /p/{item.slug}
                          </td>
                          <td className="p-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setDirectoryItems((prev) =>
                                  prev.map((x) =>
                                    x.id === item.id ? { ...x, verified: !x.verified } : x
                                  )
                                );
                                showNotice(
                                  isAr
                                    ? `تم تعديل حالة توثيق: ${item.nameAr}`
                                    : `Updated status for ${item.nameAr}`
                                );
                              }}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                            >
                              تبديل التوثيق
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {productModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white">
                  {editingProduct ? "تعديل منتج NFC" : "إضافة منتج NFC جديد"}
                </h3>
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">الاسم بالعربية *</label>
                  <input
                    name="nameAr"
                    defaultValue={editingProduct?.nameAr || ""}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">الاسم بالإنجليزية</label>
                  <input
                    name="nameEn"
                    defaultValue={editingProduct?.nameEn || ""}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white [direction:ltr]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">السعر (SYP) *</label>
                    <input
                      name="priceSyp"
                      type="number"
                      defaultValue={editingProduct?.priceSyp || 185000}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">السعر (USD) *</label>
                    <input
                      name="priceUsd"
                      type="number"
                      defaultValue={editingProduct?.priceUsd || 15}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">التصنيف</label>
                    <select
                      name="category"
                      defaultValue={editingProduct?.category || "cards"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    >
                      <option value="cards">بطاقات ذكية (Cards)</option>
                      <option value="stands">ستاندات مكاتب (Stands)</option>
                      <option value="keychains">ميداليات (Keychains)</option>
                      <option value="tags">تاغات ولاصقات (Tags)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">حالة المخزون</label>
                    <select
                      name="stockStatus"
                      defaultValue={editingProduct?.stockStatus || "in_stock"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    >
                      <option value="in_stock">متوفر في المستودع</option>
                      <option value="low_stock">كمية محدودة</option>
                      <option value="out_of_stock">نفد المخزون</option>
                      <option value="pre_order">طلب مسبق</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">رابط صورة المنتج</label>
                  <input
                    name="imageSrc"
                    defaultValue={editingProduct?.imageSrc || ""}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white [direction:ltr]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">الميزات (سطر لكل ميزة)</label>
                  <textarea
                    name="featuresAr"
                    rows={3}
                    defaultValue={editingProduct?.featuresAr?.join("\n") || ""}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-bold"
                  >
                    حفظ المنتج
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EVENT MODAL */}
      <AnimatePresence>
        {eventModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white">
                  {editingEvent ? "تعديل الفعالية" : "نشر فعالية سورية جديدة"}
                </h3>
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveEventSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">اسم الفعالية بالعربية *</label>
                  <input
                    name="titleAr"
                    defaultValue={editingEvent?.titleAr || ""}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">المدينة</label>
                    <select
                      name="city"
                      defaultValue={editingEvent?.city || "دمشق"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    >
                      <option value="دمشق">دمشق</option>
                      <option value="ريف دمشق">ريف دمشق</option>
                      <option value="حلب">حلب</option>
                      <option value="اللاذقية">اللاذقية</option>
                      <option value="حمص">حمص</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">التصنيف</label>
                    <select
                      name="category"
                      defaultValue={editingEvent?.category || "cultural"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    >
                      <option value="cultural">مهرجان ثقافي</option>
                      <option value="business">معرض أعمال وتقنية</option>
                      <option value="heritage">تراث وموسيقى</option>
                      <option value="tourism">سياحة وأطعمة</option>
                      <option value="arts">فنون تشكيلية</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">التاريخ *</label>
                    <input
                      name="dateText"
                      defaultValue={editingEvent?.dateText || "15 - 20 تشرين الأول 2026"}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">التوقيت</label>
                    <input
                      name="time"
                      defaultValue={editingEvent?.time || "6:00 مساءً"}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">المكان والموقع (Venue)</label>
                  <input
                    name="venueAr"
                    defaultValue={editingEvent?.venueAr || "مدينة المعارض بدمشق"}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">رابط صورة الغلاف</label>
                  <input
                    name="coverImage"
                    defaultValue={editingEvent?.coverImage || ""}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white [direction:ltr]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">رابط خرائط Google Maps</label>
                  <input
                    name="googleMapsUrl"
                    defaultValue={editingEvent?.googleMapsUrl || ""}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white [direction:ltr]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">رقم واتساب للتسجيل (RSVP)</label>
                  <input
                    name="whatsappRsvp"
                    defaultValue={editingEvent?.whatsappRsvp || "+963933888999"}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white [direction:ltr]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">وصف الفعالية</label>
                  <textarea
                    name="descriptionAr"
                    rows={3}
                    defaultValue={editingEvent?.descriptionAr || ""}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEventModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-bold"
                  >
                    نشر الفعالية
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
