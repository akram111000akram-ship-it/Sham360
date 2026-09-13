export interface SyrianGovernoratePath {
  id: string;
  nameAr: string;
  nameEn: string;
  capitalAr: string;
  svgPath: string;
  labelX: number;
  labelY: number;
}

export interface CityHotspot {
  id: "damascus" | "aleppo" | "homs" | "latakia" | "tartus" | "hama" | "palmyra" | "deir_ezzor" | "daraa" | "sweida" | "hasakah" | "raqqa" | "idlib";
  nameAr: string;
  nameEn: string;
  governorateAr: string;
  governorateEn?: string;
  regionAr: string;
  regionEn?: string;
  svgX: number; // in 1000x750 viewBox
  svgY: number;
  featuredSiteAr: string;
  featuredSiteEn?: string;
  googleMapsQuery: string;
}

/**
 * Authentic Syrian Geographic Vector Map (1000x750 ViewBox)
 * Accurately represents the sovereign border of the Syrian Arab Republic:
 * - Western Mediterranean coastline (Latakia / Tartus / Baniyas)
 * - Northern border with Turkey (from Iskenderun bay north of Kasab, east past Azaz, Jarabulus, Ayn al-Arab, Tal Abyad, Ras al-Ayn, Qamishli, to the northeastern horn at Tigris/Al-Malikiyah)
 * - Eastern & South-Eastern desert border with Iraq (from Al-Bukamal along Abu Kamal towards Al-Tanf)
 * - Southern border with Jordan (southern Badia, Sweida, Daraa)
 * - South-Western Golan / Mount Hermon & Lebanese border along the Anti-Lebanon (Qalamoun) mountains
 */
export const SYRIA_OUTLINE_SVG_PATH = `
  M 215,225
  C 220,205 228,185 240,165
  C 255,145 285,150 310,145
  C 345,140 375,135 410,135
  C 455,135 490,130 535,130
  C 580,130 625,125 670,120
  C 715,115 760,110 805,100
  C 840,90 870,75 895,65
  C 915,60 930,70 920,95
  C 905,120 875,160 855,190
  C 835,220 815,255 790,295
  C 765,335 735,385 710,430
  C 685,475 640,520 595,555
  C 550,590 500,620 445,635
  C 390,650 340,650 305,640
  C 280,630 265,605 255,575
  C 245,545 230,515 220,485
  C 210,455 205,430 215,405
  C 225,380 230,355 225,330
  C 220,305 210,280 205,255
  Z
`;

export const SYRIAN_GOVERNORATES: SyrianGovernoratePath[] = [
  {
    id: "aleppo",
    nameAr: "محافظة حلب",
    nameEn: "Aleppo Governorate",
    capitalAr: "حلب الشهباء",
    labelX: 360,
    labelY: 185,
    svgPath: "M 285,150 C 330,140 390,135 435,140 C 445,185 435,230 405,255 C 365,275 320,265 295,230 C 280,200 275,170 285,150 Z"
  },
  {
    id: "damascus",
    nameAr: "دمشق وريف دمشق",
    nameEn: "Damascus & Rural Damascus",
    capitalAr: "دمشق القديمة والعاصمة",
    labelX: 275,
    labelY: 535,
    svgPath: "M 225,470 C 265,455 310,460 340,490 C 350,530 335,570 295,595 C 265,600 245,570 230,530 C 220,500 220,485 225,470 Z"
  },
  {
    id: "homs",
    nameAr: "محافظة حمص وتدمر",
    nameEn: "Homs & Palmyra",
    capitalAr: "حمص العدية وتدمر",
    labelX: 470,
    labelY: 410,
    svgPath: "M 295,340 C 370,335 460,330 550,345 C 640,360 690,400 705,445 C 660,505 580,555 495,540 C 400,520 330,470 295,420 C 275,385 280,355 295,340 Z"
  },
  {
    id: "hama",
    nameAr: "محافظة حماة",
    nameEn: "Hama Governorate",
    capitalAr: "حماة والنواعير",
    labelX: 325,
    labelY: 305,
    svgPath: "M 270,270 C 330,265 375,275 390,305 C 385,340 345,360 300,355 C 265,350 255,315 260,285 C 265,275 268,272 270,270 Z"
  },
  {
    id: "latakia",
    nameAr: "محافظة اللاذقية",
    nameEn: "Latakia Governorate",
    capitalAr: "اللاذقية وعروس الساحل",
    labelX: 235,
    labelY: 240,
    svgPath: "M 215,225 C 235,210 255,220 265,250 C 265,280 245,295 225,290 C 210,275 208,245 215,225 Z"
  },
  {
    id: "tartus",
    nameAr: "محافظة طرطوس",
    nameEn: "Tartus Governorate",
    capitalAr: "طرطوس وأرواد",
    labelX: 230,
    labelY: 340,
    svgPath: "M 220,295 C 245,295 260,315 260,345 C 255,370 235,385 220,380 C 210,360 212,320 220,295 Z"
  },
  {
    id: "idlib",
    nameAr: "محافظة إدلب",
    nameEn: "Idlib Governorate",
    capitalAr: "إدلب الخضراء",
    labelX: 280,
    labelY: 220,
    svgPath: "M 255,190 C 285,180 305,200 305,230 C 295,255 270,260 255,245 C 245,230 245,205 255,190 Z"
  },
  {
    id: "raqqa",
    nameAr: "محافظة الرقة",
    nameEn: "Raqqa Governorate",
    capitalAr: "الرقة والفرات",
    labelX: 520,
    labelY: 220,
    svgPath: "M 440,140 C 515,135 570,145 590,195 C 585,250 535,290 480,290 C 435,280 420,225 435,175 C 438,155 439,145 440,140 Z"
  },
  {
    id: "deir_ezzor",
    nameAr: "محافظة دير الزور",
    nameEn: "Deir ez-Zor Governorate",
    capitalAr: "دير الزور ولؤلؤة الفرات",
    labelX: 680,
    labelY: 330,
    svgPath: "M 590,240 C 670,225 745,260 765,315 C 760,375 700,420 635,405 C 585,390 565,330 575,280 C 580,255 585,245 590,240 Z"
  },
  {
    id: "hasakah",
    nameAr: "محافظة الحسكة",
    nameEn: "Al-Hasakah Governorate",
    capitalAr: "الحسكة والجزيرة السورية",
    labelX: 740,
    labelY: 155,
    svgPath: "M 605,125 C 700,115 810,95 890,70 C 895,115 850,175 795,215 C 730,230 670,210 625,175 C 610,155 605,135 605,125 Z"
  },
  {
    id: "daraa",
    nameAr: "محافظة درعا",
    nameEn: "Daraa Governorate",
    capitalAr: "درعا وسهل حوران",
    labelX: 260,
    labelY: 625,
    svgPath: "M 245,585 C 275,580 290,595 285,625 C 275,640 250,640 240,620 C 235,605 240,590 245,585 Z"
  },
  {
    id: "sweida",
    nameAr: "محافظة السويداء",
    nameEn: "As-Suwayda Governorate",
    capitalAr: "السويداء وجبل العرب",
    labelX: 320,
    labelY: 620,
    svgPath: "M 295,585 C 335,580 360,600 355,630 C 340,645 305,645 295,625 C 290,605 292,595 295,585 Z"
  }
];

export const SYRIAN_CITY_HOTSPOTS: CityHotspot[] = [
  {
    id: "damascus",
    nameAr: "دمشق القديمة & المركز",
    nameEn: "Damascus Capital",
    governorateAr: "دمشق وريفها",
    governorateEn: "Damascus & Rural",
    regionAr: "جنوب غرب سوريا • العاصمة",
    regionEn: "SW Syria • Capital City",
    svgX: 275,
    svgY: 535,
    featuredSiteAr: "متحف دمشق الوطني، قصر العظم، سوق الحميدية، الأموي",
    featuredSiteEn: "National Museum of Damascus, Azm Palace, Al-Hamidiyah, Umayyad Mosque",
    googleMapsQuery: "https://maps.google.com/?q=Old+Damascus+Syria"
  },
  {
    id: "aleppo",
    nameAr: "حلب الشهباء",
    nameEn: "Aleppo",
    governorateAr: "محافظة حلب",
    governorateEn: "Aleppo Governorate",
    regionAr: "شمال سوريا • عاصمة الشمال",
    regionEn: "Northern Syria • Capital of the North",
    svgX: 360,
    svgY: 185,
    featuredSiteAr: "متحف قلعة حلب الأثري والأسواق القديمة المسقوفة",
    featuredSiteEn: "Citadel of Aleppo Museum, Ancient Souks, Baron Hotel",
    googleMapsQuery: "https://maps.google.com/?q=Aleppo+Citadel+Syria"
  },
  {
    id: "latakia",
    nameAr: "اللاذقية & الساحل",
    nameEn: "Latakia Coast",
    governorateAr: "محافظة اللاذقية",
    governorateEn: "Latakia Governorate",
    regionAr: "الساحل الشمالي الغربي والبحر الأبيض المتوسط",
    regionEn: "NW Coast • Mediterranean Sea",
    svgX: 235,
    svgY: 240,
    featuredSiteAr: "مملكة أوغاريت، الكورنيش، الشواطئ والموانئ",
    featuredSiteEn: "Kingdom of Ugarit, Corniche, Mediterranean Ports & Resorts",
    googleMapsQuery: "https://maps.google.com/?q=Latakia+City+Syria"
  },
  {
    id: "tartus",
    nameAr: "طرطوس & أرواد",
    nameEn: "Tartus & Arwad",
    governorateAr: "محافظة طرطوس",
    governorateEn: "Tartus Governorate",
    regionAr: "الساحل الجنوبي الغربي والجزيرة التراثية",
    regionEn: "SW Coast • Historic Arwad Island",
    svgX: 230,
    svgY: 340,
    featuredSiteAr: "مرفأ طرطوس الدولي، جزيرة أرواد، كاتدرائية طرطوس",
    featuredSiteEn: "Tartus Port, Arwad Island, Our Lady of Tartus Cathedral",
    googleMapsQuery: "https://maps.google.com/?q=Tartus+Port+Syria"
  },
  {
    id: "hama",
    nameAr: "حماة & العاصي",
    nameEn: "Hama Orontes",
    governorateAr: "محافظة حماة",
    governorateEn: "Hama Governorate",
    regionAr: "وسط وشمال غرب سوريا",
    regionEn: "Central Western Syria • Orontes Basin",
    svgX: 325,
    svgY: 305,
    featuredSiteAr: "متحف الفسيفساء الأثري ونواعير حماة الخالدة على العاصي",
    featuredSiteEn: "Mosaic Museum, Historic Norias of Hama on Orontes River",
    googleMapsQuery: "https://maps.google.com/?q=Hama+Noria+Syria"
  },
  {
    id: "homs",
    nameAr: "حمص & قلعة الحصن",
    nameEn: "Homs & Fortress",
    governorateAr: "محافظة حمص",
    governorateEn: "Homs Governorate",
    regionAr: "قلب الوسط السوري ووادي النضارة",
    regionEn: "Heart of Central Syria • Valley of the Christians",
    svgX: 310,
    svgY: 395,
    featuredSiteAr: "قلعة الحصن العالمية (UNESCO)، جامع خالد بن الوليد، وادي النضارة",
    featuredSiteEn: "Krak des Chevaliers (UNESCO World Heritage), Khalid ibn al-Walid Mosque",
    googleMapsQuery: "https://maps.google.com/?q=Krak+des+Chevaliers+Homs"
  },
  {
    id: "palmyra",
    nameAr: "تدمر & البادية",
    nameEn: "Palmyra Oasis",
    governorateAr: "محافظة حمص - بادية الشام",
    governorateEn: "Homs - Syrian Desert",
    regionAr: "وسط البادية السورية وموقع التراث العالمي",
    regionEn: "Central Syrian Desert • UNESCO World Heritage Site",
    svgX: 520,
    svgY: 420,
    featuredSiteAr: "متحف تدمر الأثري، الشارع المستقيم، معبد بل، مسرح تدمر",
    featuredSiteEn: "Palmyra Archaeological Museum, Colonnade Street, Temple of Bel, Roman Theatre",
    googleMapsQuery: "https://maps.google.com/?q=Palmyra+Ruins+Syria"
  },
  {
    id: "deir_ezzor",
    nameAr: "دير الزور & الفرات",
    nameEn: "Deir ez-Zor Euphrates",
    governorateAr: "محافظة دير الزور",
    governorateEn: "Deir ez-Zor Governorate",
    regionAr: "المنطقة الشرقية وحوض الفرات العظيم",
    regionEn: "Eastern Region • Great Euphrates Basin",
    svgX: 680,
    svgY: 330,
    featuredSiteAr: "متحف دير الزور الإقليمي، الجسر المعلق، وضفاف الفرات",
    featuredSiteEn: "Deir ez-Zor Regional Museum, Suspension Bridge, Euphrates Waterfront",
    googleMapsQuery: "https://maps.google.com/?q=Euphrates+River+Deir+ez-Zor"
  }
];
