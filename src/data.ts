import damascene360Img from "./assets/images/damascene_360_tour_1784719810937.jpg";

export interface ServiceItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  badge?: string;
  badgeEn?: string;
  accentClass: string;
  bgClass: string;
  bullets: string[];
  bulletsEn: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn: string;
  category: "google" | "websites" | "tours";
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  metric: string;
  metricEn: string;
  location: string;
  locationEn: string;
  imageUrl: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  text: string;
  textEn: string;
  avatarInitial: string;
  colorClass: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface TimelineStep {
  id: string;
  number: string;
  numberEn: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  bgClass: string;
  textClass: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "google-business",
    title: "تفعيل وتحسين خرائط Google (Google Maps)",
    titleEn: "Google Maps Setup & Optimization",
    description: "نضمن توثيق مقر شركتك أو محلك بشكل رسمي على خرائط Google ومحرك بحث Google Search لتبدأ بالظهور فوراً للعملاء القريبين منك جغرافياً وتكسب ثقتهم الكاملة.",
    descriptionEn: "We officially verify and optimize your business location on Google Maps and Search, bringing local customers directly to your doorstep with total trust.",
    iconName: "MapPin",
    badge: "الأكثر طلباً",
    badgeEn: "Most Requested",
    accentClass: "text-blue-600 bg-blue-50 border-blue-100",
    bgClass: "hover:border-blue-500/20",
    bullets: [
      "الحصول على علامة التوثيق الرسمية وملكية الحساب الكاملة",
      "تحسين ترتيب الظهور في نتائج البحث المحلية (Local SEO) وجذب الزبائن القريبين",
      "إعداد وتنشيط قسم مراجعات وآراء العملاء وتفعيل قنوات الاتصال والاتجاهات"
    ],
    bulletsEn: [
      "Official Google account verification & full ownership transfer",
      "Local SEO boost to rank top in local search results and attract nearby clients",
      "Setting up customer reviews, direct WhatsApp link, and turn-by-turn directions"
    ]
  },
  {
    id: "premium-websites",
    title: "تصميم المواقع الفاخرة وتطويرها (Premium Websites)",
    titleEn: "Custom High-Speed Web Development",
    description: "موقع إلكتروني تعريفي أو متجر كتالوج مخصص لعلامتك التجارية، فائق السرعة، ومصمم بأحدث واجهات وتجربة مستخدم ليكون مرآة حقيقية لاحترافيتك.",
    descriptionEn: "Sleek, lightning-fast corporate websites and catalog platforms tailored to your brand, optimized specifically for local internet speeds.",
    iconName: "Globe",
    badge: "حديث ومرن",
    badgeEn: "Modern & Fast",
    accentClass: "text-indigo-600 bg-indigo-50 border-indigo-100",
    bgClass: "hover:border-indigo-500/20",
    bullets: [
      "تصميم متوافق بنسبة 100% مع الهواتف الذكية والأجهزة اللوحية",
      "بنية برمجية فائقة السرعة مخصصة لسرعات الإنترنت في سوريا",
      "ربط مباشر وقنوات اتصال ذكية متكاملة مع تطبيق واتساب"
    ],
    bulletsEn: [
      "100% responsive design across all mobile and desktop screens",
      "Ultra-lightweight architecture optimized for fast load speeds",
      "Seamless integration with WhatsApp and direct contact forms"
    ]
  },
  {
    id: "virtual-tours-360",
    title: "الجولات الافتراضية التفاعلية 360° بدقة فائقة (8K Virtual Tours)",
    titleEn: "8K Interactive 360° Virtual Tours",
    description: "اسمح لعملائك بالتجول افتراضياً داخل محلك، مطعمك، عيادتك، أو عقارك الفاخر بجودة Ultra HD 8K سينمائية فائقة الوضوح ومن أي مكان حول العالم وفي أي وقت.",
    descriptionEn: "Let clients virtually step inside your venue, restaurant, clinic, or property in cinematic 8K Ultra HD anytime from anywhere in the world.",
    iconName: "Eye",
    badge: "تفاعلي وممتع",
    badgeEn: "Interactive 360°",
    accentClass: "text-cyan-600 bg-cyan-50 border-cyan-100",
    bgClass: "hover:border-cyan-500/20",
    bullets: [
      "تصوير بانورامي احترافي متكامل فائق الدقة 360 درجة بتقنية 8K",
      "دمج الجولة الافتراضية مباشرة داخل خرائط Google وموقعك الإلكتروني",
      "زيادة زمن بقاء الزائر وتفاعله الرقمي بشكل ملحوظ لبناء ثقة فورية"
    ],
    bulletsEn: [
      "Professional 8K panoramic photography with cinematic stitching",
      "Direct integration into Google Maps Street View and your website",
      "Dramatically increases visitor engagement time and booking confidence"
    ]
  },
  {
    id: "photography",
    title: "التصوير الفوتوغرافي والفيديو الاحترافي",
    titleEn: "Professional Photography & Media",
    description: "الصور الرديئة والمنقولة تبدد الثقة. نلتقط لك صوراً وفيديوهات إبداعية تعكس جمال تفاصيل فندقك، مطعمك، أو صالة عرض منتجاتك بلمسات عصرية متميزة.",
    descriptionEn: "High-resolution wide-angle and detail photography that showcases your venue, hotel, or products with artistic perfection.",
    iconName: "Camera",
    accentClass: "text-rose-600 bg-rose-50 border-rose-100",
    bgClass: "hover:border-rose-500/20",
    bullets: [
      "تصوير فوتوغرافي زوايا واسعة وتفاصيل دقيقة للمساحات",
      "تعديل لوني احترافي وإضاءة سينمائية تبرز الهوية الحقيقية",
      "تقديم الملفات بجودات متعددة تناسب الطباعة والويب الخفيف"
    ],
    bulletsEn: [
      "Wide-angle spatial photography and high-detail venue shots",
      "Professional color grading and lighting that highlights luxury details",
      "Multi-format delivery for high-res print and fast web publishing"
    ]
  },
  {
    id: "smart-solutions",
    title: "الحلول والبطاقات الرقمية الذكية (Smart NFC Cards)",
    titleEn: "Smart NFC Cards & Instant Feedback",
    description: "نوفر حلولاً مبتكرة مخصصة لربط العالم الفيزيائي بالرقمي. مثل تفعيل بطاقات الأعمال الذكية وحوامل الطاولات بتقنية NFC لجمع التقييمات الإيجابية والوصول السريع لخرائطك بلمسة واحدة من هاتف العميل.",
    descriptionEn: "Bridge the physical and digital world with branded NFC cards and table stands that generate instant 5-star Google reviews with a simple phone tap.",
    iconName: "Cpu",
    badge: "استشارات مخصصة",
    badgeEn: "Smart Tech",
    accentClass: "text-amber-600 bg-amber-50 border-amber-100",
    bgClass: "hover:border-amber-500/20",
    bullets: [
      "بطاقات NFC وحوامل خشبية مبرمجة لزيادة تقييمات Google الرسمية",
      "رموز استجابة سريعة QR مخصصة وسهلة الطباعة للمقر",
      "أنظمة رد تلقائي ذكي لخدمة العملاء وحل مشكلات الاتصال"
    ],
    bulletsEn: [
      "Custom NFC cards & wooden stands programmed for instant Google reviews",
      "High-contrast QR codes for easy table top scanning",
      "Automated messaging tools to enhance client retention"
    ]
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "port-1",
    title: "مطعم ومقهى بيت ياسمين التراثي",
    titleEn: "Beit Yasmine Heritage Cafe & Restaurant",
    category: "tours",
    categoryLabel: "جولات 360°",
    categoryLabelEn: "360° Virtual Tours",
    description: "تصوير وتصميم جولة افتراضية 360° متكاملة عالية الدقة مدمجة بالخريطة، تعرض تفاصيل الباحة الشامية والغرف التراثية الخلابة.",
    descriptionEn: "HD 360° virtual tour integrated with Google Maps, capturing the authentic Damascene courtyard and heritage architecture.",
    metric: "أكثر من 120 ألف مشاهدة سنوية",
    metricEn: "120K+ Annual Views",
    location: "دمشق القديمة - باب توما",
    locationEn: "Old Damascus - Bab Touma",
    imageUrl: damascene360Img
  },
  {
    id: "port-2",
    title: "عيادة د. سارة لطب وزراعة الأسنان",
    titleEn: "Dr. Sarah Dental & Implant Center",
    category: "google",
    categoryLabel: "خرائط جوجل",
    categoryLabelEn: "Google Maps",
    description: "توثيق ملكية حساب خرائط جوجل وتفعيله رسمياً، وتحسين كلمات البحث المحلية مع زيادة تقييمات المرضى الحقيقية من 3.4 إلى 4.9 نجوم.",
    descriptionEn: "Official Google Maps verification and local SEO optimization, elevating patient rating from 3.4 to 4.9 stars.",
    metric: "+180% زيادة في الاتصالات المباشرة",
    metricEn: "+180% Direct Call Increase",
    location: "دمشق - أوتوستراد المزة",
    locationEn: "Damascus - Mazzeh Highway",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-3",
    title: "شركة أفق الشرق للحلول اللوجستية والخدمات",
    titleEn: "Ofok Al-Sharq Logistics & Services",
    category: "websites",
    categoryLabel: "مواقع إلكترونية",
    categoryLabelEn: "Websites",
    description: "تصميم وتطوير موقع تعريفي فاخر ثنائي اللغة فائق السرعة، يعرض خدمات الشركة وحلولها اللوجستية بدقة مع ربط ذكي بقنوات واتساب.",
    descriptionEn: "Bilingual high-speed corporate website presenting logistics solutions with instant WhatsApp inquiry routing.",
    metric: "سرعة تحميل خيالية وتصميم متناسق",
    metricEn: "Ultra-Fast Load Speed",
    location: "دمشق - ساحة السبع بحرات",
    locationEn: "Damascus - Sabaa Bahrat Square",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-4",
    title: "فندق وسبا قصر الشام",
    titleEn: "Cham Palace Hotel & Spa",
    category: "tours",
    categoryLabel: "جولات 360°",
    categoryLabelEn: "360° Virtual Tours",
    description: "جولة افتراضية 360 درجة عالية الدقة ومدمجة بخرائط جوجل وموقع الفندق الإلكتروني لكافة الأجنحة، المطاعم، والخدمات الصحية.",
    descriptionEn: "Full 360° virtual walk-through of luxury suites, dining areas, and spa facilities integrated into Google Maps.",
    metric: "زيادة الحجوزات المباشرة بنسبة 35%",
    metricEn: "+35% Direct Bookings",
    location: "اللاذقية - الشاطئ الأزرق",
    locationEn: "Latakia - Blue Beach",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-5",
    title: "معرض رويال للأثاث والمفروشات",
    titleEn: "Royal Furniture Showrooms",
    category: "google",
    categoryLabel: "خرائط جوجل",
    categoryLabelEn: "Google Maps",
    description: "رفع جودة صور المعرض على الخرائط، وإضافة تقنية التجول الافتراضي لتمكين الزوار من استعراض صالات العرض الثلاثية وتفاصيل المفروشات.",
    descriptionEn: "Map photo overhaul and 3D showroom walk-through empowering customers to explore furniture collections before visiting.",
    metric: "+220% زيارات فعلية للمعرض بالسيارة",
    metricEn: "+220% Showroom Visits",
    location: "حلب - حي الشهباء",
    locationEn: "Aleppo - Al-Shahbaa District",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "port-6",
    title: "سوبرماركت وهايبر الحافظ",
    titleEn: "Al-Hafiz Supermarket & Hypermarket",
    category: "websites",
    categoryLabel: "مواقع إلكترونية",
    categoryLabelEn: "Websites",
    description: "بناء موقع كتالوج منتجات متكامل لعرض البقالة والمستلزمات، يتصل بنظام طلب مباشر عبر واتساب، مناسب جداً لطلبات المغتربين لعائلاتهم.",
    descriptionEn: "Digital catalog and quick-order platform allowing expatriates to order groceries directly for family members.",
    metric: "تسهيل طلبات المغتربين لعائلاتهم",
    metricEn: "Streamlined Expat Ordering",
    location: "حمص - شارع الحضارة",
    locationEn: "Homs - Al-Hadara Street",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-0",
    name: "الأستاذة صبا السمان",
    nameEn: "Ms. Saba Al-Samman",
    role: "المؤسسة والمالكة لأكاديمية أفق للغات والتعليم",
    roleEn: "Founder & Owner of Ofok Language & Educational Academy",
    text: "المنظومة الرقمية والجولة التفاعلية والموقع الإلكتروني الذي طوره فريق Sham360 لأكاديميتنا أحدث تحولاً جذرياً في إقبال الطلاب وأولياء الأمور. أصبح تسجيل الطلاب الجدد والتواصل المباشر أسرع بكثير، والانطباع الأول المأخوذ عن الأكاديمية يعكس بصورة ممتازة المستوى التعليمي الرفيع الذي نقدمه.",
    textEn: "The digital ecosystem, 360° virtual tour, and high-speed website developed by Sham360 brought a true transformation for our academy. Student registrations accelerated significantly, and parents instantly sense our high academic standards.",
    avatarInitial: "ص",
    colorClass: "bg-emerald-100 text-emerald-600"
  },
  {
    id: "test-1",
    name: "المهندس يحيى الطلاع",
    nameEn: "Eng. Yahya Al-Talla",
    role: "المدير العام لشركة الفرات الهندسية",
    roleEn: "General Manager at Al-Furat Engineering Co.",
    text: "قبل التعاون مع Sham360، كان عملاؤنا وموردونا يجدون صعوبة كبيرة في تتبع موقعنا الجديد على الخرائط بسبب البنية الجغرافية. الآن بفضل توثيق الخريطة وتحديث الصور والبيانات، أصبح الوصول إلينا سلساً جداً وتضاعفت ثقة المتعاملين الجدد.",
    textEn: "Before working with Sham360, clients struggled to locate our new offices on maps. Thanks to their official map verification and high-res photography, finding us is effortless and new client trust doubled.",
    avatarInitial: "ي",
    colorClass: "bg-blue-100 text-blue-600"
  },
  {
    id: "test-2",
    name: "الدكتورة منال البوشي",
    nameEn: "Dr. Manal Al-Bouchi",
    role: "مؤسسة مركز البوشي التجميلي الاستشاري",
    roleEn: "Founder of Al-Bouchi Aesthetic Center",
    text: "الموقع الإلكتروني والحلول الذكية التي طوروها لنا فاقت كل التوقعات من حيث السرعة والتصميم البصري الفاخر. الزبائن يقضون وقتاً طويلاً في تصفح خدماتنا والطلب المباشر عبر واتساب أصبح سهلاً وخالياً من التعقيدات التقنية.",
    textEn: "The website and smart solutions created for us exceeded all expectations in speed and luxury aesthetic. Clients enjoy exploring our treatments, and direct WhatsApp consultations are smoother than ever.",
    avatarInitial: "م",
    colorClass: "bg-indigo-100 text-indigo-600"
  },
  {
    id: "test-3",
    name: "السيد هادي العطار",
    nameEn: "Mr. Hadi Al-Attar",
    role: "صاحب ومدير مقهى البيت الدمشقي التراثي",
    roleEn: "Owner & Manager of Al-Beit Al-Damashqi Heritage Cafe",
    text: "الجولة الافتراضية 360 درجة كانت نقلة نوعية حقيقية لمشروعنا التراثي. أصبح الزائر يشاهد الفناء الداخلي والشلال وأجواء المقهى بجودة خيالية قبل أن يأتي، والعديد من الزوار أخبرونا أنهم جاؤوا إلينا فقط لأنهم استمتعوا بالجولة الافتراضية.",
    textEn: "The 8K 360° virtual tour was a game changer for our heritage venue. Guests experience our fountain courtyard virtually before visiting in person, and many tell us they chose us specifically after viewing the tour.",
    avatarInitial: "H",
    colorClass: "bg-cyan-100 text-cyan-600"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "لماذا يحتاج مشروعي لخدمات Sham360 بالذات؟",
    questionEn: "Why does my business need Sham360 services specifically?",
    answer: "أغلب العملاء في سوريا حالياً يبحثون عن المحلات، المطاعم، العيادات، أو الخدمات من خلال هواتفهم عبر جوجل والخرائط. إن لم تكن متواجداً ببيانات دقيقة، صور احترافية، ومراجعات إيجابية، فإنك ببساطة تفقد عشرات الزبائن يومياً لصالح المنافسين. نحن في Sham360 نسد هذه الفجوة ونضمن ظهورك كخيار أول وبمظهر يليق باحترافيتك.",
    answerEn: "Most potential clients search for local businesses, restaurants, clinics, and services on Google Maps via their smartphones. Without verified location data, professional imagery, and positive reviews, you lose customers daily to competitors. Sham360 bridges this gap so you rank #1 with unmatched credibility."
  },
  {
    id: "faq-2",
    question: "هل تقدمون خدمات الجولات الافتراضية وتصوير المقرات في كافة المحافظات؟",
    questionEn: "Do you provide 360° virtual tours across all Syrian governorates?",
    answer: "نعم بالتأكيد. مركزنا الرئيسي يقع في مدينة دمشق، ولكن فريق التصوير والمهندسين الفنيين لدينا مجهزون بالكامل للتنقل وتغطية كافة المحافظات السورية الرئيسية (حلب، حمص، حماة، اللاذقية، طرطوس، وغيرها) لتنفيذ الجولات الافتراضية 360° بجودة فائقة.",
    answerEn: "Yes! While based in Damascus, our specialized photography and engineering teams travel across all Syrian governorates (Aleppo, Homs, Hama, Latakia, Tartous, and beyond) to capture 8K 360° virtual tours."
  },
  {
    id: "faq-3",
    question: "كيف تساعد بطاقات وحوامل NFC الذكية في تنشيط خرائط جوجل الخاصة بنا؟",
    questionEn: "How do Smart NFC cards and stands boost our Google Maps ranking?",
    answer: "نقوم ببرمجة بطاقات وحوامل خشبية أنيقة مخصصة لعلامتك التجارية تعتمد على ميزة NFC (الاتصال قريب المدى). بمجرد ملامسة هاتف العميل للحامل أو البطاقة، ينبثق على شاشته رابط كتابة تقييم 5 نجوم على الخرائط الخاصة بك. هذا يسرع جمع التقييمات الإيجابية الحقيقية يومياً من زوارك الفعليين، مما يرفع تصنيف محلك في خوارزميات جوجل والظهور للمزيد من الزوار مجاناً.",
    answerEn: "We program custom wooden NFC stands and cards. When a customer taps their smartphone on the stand, it instantly opens your 5-star Google review prompt. This drives authentic positive reviews daily, boosting your rank on Google Maps organic search."
  },
  {
    id: "faq-4",
    question: "كم يستغرق توثيق الخريطة وحمايتها من الإغلاق؟",
    questionEn: "How long does Google Maps verification and protection take?",
    answer: "عملية التوثيق المبدئي والتحسين تأخذ عادةً من 3 إلى 7 أيام عمل. عملية تثبيت الملكية الكاملة وحماية الخريطة من البلاغات الخبيثة والتعديلات غير المصرح بها تتم عبر ربطها بحسابات إدارية موثقة ومعايير حماية مستمرة نلتزم بها مع شركائنا لضمان استمرارية الظهور بلا انقطاع.",
    answerEn: "Initial verification and optimization usually take 3 to 7 business days. We secure complete ownership and protect your map against competitor spam reports with continuous administrative shield monitoring."
  },
  {
    id: "faq-5",
    question: "هل المواقع الإلكترونية التي تصممونها سريعة وتعمل بكفاءة في ظل ظروف الإنترنت المحلية؟",
    questionEn: "Are your websites fast and reliable under local internet conditions?",
    answer: "نعم، هذا هو صلب تركيزنا وتخصصنا. نحن لا نستخدم قوالب جاهزة ثقيلة ومليئة بالملفات الزائدة. بل نعتمد على بنية برمجية خفيفة جداً، ونظام ضغط متطور للصور، وخوادم استضافة فائقة الاستجابة، مما يجعل موقعك يفتح بسرعة البرق حتى مع سرعات الإنترنت العادية وباقات الهواتف المحمولة في سوريا.",
    answerEn: "Yes! We specialize in ultra-lightweight custom code with advanced image compression. Our sites load in milliseconds even on standard mobile data connection speeds in Syria."
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "step-1",
    number: "١",
    numberEn: "1",
    title: "دراسة وتدقيق مجاني",
    titleEn: "Free Audit & Analysis",
    description: "ندرس وضع عملك الحالي على محركات البحث والخرائط، ونبحث عن فجوات التواجد وفرص الظهور المتاحة ونزودك بتقرير أولي دقيق ومجاني تماماً.",
    descriptionEn: "We audit your current Google Maps and online presence, identify ranking gaps, and provide a clear, complimentary growth report.",
    bgClass: "bg-blue-50 text-blue-600",
    textClass: "group-hover:bg-blue-600"
  },
  {
    id: "step-2",
    number: "٢",
    numberEn: "2",
    title: "رسم الخطة التكتيكية",
    titleEn: "Tailored Strategy Plan",
    description: "نصمم خطة تناسب ميزانيتك، ونحدد الكلمات المفتاحية الأكثر طلباً في منطقتك، والأسلوب البصري للجولة والموقع لإبراز أقوى مزايا مشروعك.",
    descriptionEn: "We draft a customized action plan selecting top local search keywords, photography angles, and web architecture built for your budget.",
    bgClass: "bg-indigo-50 text-indigo-600",
    textClass: "group-hover:bg-indigo-600"
  },
  {
    id: "step-3",
    number: "٣",
    numberEn: "3",
    title: "التنفيذ والإتقان الفني",
    titleEn: "Execution & Production",
    description: "يقوم فريقنا بتوثيق الخرائط، وتصوير المقر بتقنيات 360° وسينمائية، وبرمجة الموقع بدقة متناهية، وربط البنية ببعضها بقنوات اتصال سريعة.",
    descriptionEn: "Our team verifies your maps, shoots HD 360° virtual tours on-site, develops your high-speed website, and links direct WhatsApp channels.",
    bgClass: "bg-cyan-50 text-cyan-600",
    textClass: "group-hover:bg-cyan-600"
  },
  {
    id: "step-4",
    number: "٤",
    numberEn: "4",
    title: "الإطلاق والمتابعة المستمرة",
    titleEn: "Launch & Ongoing Protection",
    description: "نطلق حضورك المتكامل لتبدأ بجذب الزوار، ونوفر لك حماية مستمرة وملصقات NFC الذكية، مع تحديث دوري للبيانات لضمان صدارتك الدائمة.",
    descriptionEn: "We launch your digital presence, deliver programmed NFC review stands, and provide ongoing map defense to keep you #1 permanently.",
    bgClass: "bg-emerald-50 text-emerald-600",
    textClass: "group-hover:bg-emerald-600"
  }
];

