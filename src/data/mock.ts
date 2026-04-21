import {
  Wrench,
  Zap,
  Hammer,
  PaintBucket,
  Snowflake,
  Sparkles,
  Store,
  Truck,
  Trees,
  Bug,
  Satellite,
  Square,
  type LucideIcon,
} from "lucide-react";

export type CategoryKey =
  | "plumber"
  | "electrician"
  | "carpenter"
  | "painter"
  | "ac"
  | "cleaning"
  | "tools"
  | "moving"
  | "gardening"
  | "pest"
  | "satellite"
  | "glass";

export const categories: { key: CategoryKey; icon: LucideIcon; color: string }[] = [
  { key: "plumber", icon: Wrench, color: "from-sky-500/20 to-sky-500/5" },
  { key: "electrician", icon: Zap, color: "from-amber-500/20 to-amber-500/5" },
  { key: "carpenter", icon: Hammer, color: "from-orange-500/20 to-orange-500/5" },
  { key: "painter", icon: PaintBucket, color: "from-rose-500/20 to-rose-500/5" },
  { key: "ac", icon: Snowflake, color: "from-cyan-500/20 to-cyan-500/5" },
  { key: "cleaning", icon: Sparkles, color: "from-emerald-500/20 to-emerald-500/5" },
  { key: "tools", icon: Store, color: "from-yellow-600/20 to-yellow-600/5" },
  { key: "moving", icon: Truck, color: "from-indigo-500/20 to-indigo-500/5" },
  { key: "gardening", icon: Trees, color: "from-green-600/20 to-green-600/5" },
  { key: "pest", icon: Bug, color: "from-red-500/20 to-red-500/5" },
  { key: "satellite", icon: Satellite, color: "from-purple-500/20 to-purple-500/5" },
  { key: "glass", icon: Square, color: "from-slate-500/20 to-slate-500/5" },
];

export type Provider = {
  id: string;
  nameAr: string;
  nameEn: string;
  trade: CategoryKey;
  rating: number;
  reviews: number;
  jobs: number;
  area: string;
  areaEn: string;
  pricePerHour: number;
  verified: boolean;
  topRated: boolean;
  pro: boolean;
  fastResponse: boolean;
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
  points: number;
  avatar: string;
  bioAr: string;
  bioEn: string;
  joinedAt: string;
  verifiedAt?: string;
  idVerified?: boolean;
  phoneVerified?: boolean;
  licenseVerified?: boolean;
};

const initials = (name: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=064e3b,c9a84c&textColor=ffffff`;

export const providers: Provider[] = [
  {
    id: "p1",
    nameAr: "محمود السباك",
    nameEn: "Mahmoud Plumber",
    trade: "plumber",
    rating: 4.9,
    reviews: 312,
    jobs: 480,
    area: "المعادي",
    areaEn: "Maadi",
    pricePerHour: 120,
    verified: true,
    topRated: true,
    pro: true,
    fastResponse: true,
    level: "Platinum",
    points: 5240,
    avatar: initials("Mahmoud"),
    bioAr: "خبرة 15 سنة في صيانة وتركيب جميع أنواع السباكة والسخانات.",
    bioEn: "15 years experience in plumbing and water heater installation.",
  },
  {
    id: "p2",
    nameAr: "أحمد الكهربائي",
    nameEn: "Ahmed Electric",
    trade: "electrician",
    rating: 4.8,
    reviews: 198,
    jobs: 305,
    area: "مدينة نصر",
    areaEn: "Nasr City",
    pricePerHour: 150,
    verified: true,
    topRated: true,
    pro: false,
    fastResponse: true,
    level: "Gold",
    points: 3120,
    avatar: initials("Ahmed"),
    bioAr: "كهربائي معتمد لتركيب اللوحات والإنارة الذكية.",
    bioEn: "Certified electrician for panels and smart lighting.",
  },
  {
    id: "p3",
    nameAr: "ورشة الفنان للنجارة",
    nameEn: "Al-Fannan Carpentry",
    trade: "carpenter",
    rating: 4.7,
    reviews: 156,
    jobs: 220,
    area: "الشيخ زايد",
    areaEn: "Sheikh Zayed",
    pricePerHour: 200,
    verified: true,
    topRated: false,
    pro: true,
    fastResponse: false,
    level: "Gold",
    points: 2890,
    avatar: initials("Fannan"),
    bioAr: "تصميم وتنفيذ مطابخ وغرف نوم على المقاس.",
    bioEn: "Custom kitchens and bedrooms design & build.",
  },
  {
    id: "p4",
    nameAr: "كريم للنقاشة",
    nameEn: "Karim Painting",
    trade: "painter",
    rating: 4.6,
    reviews: 88,
    jobs: 140,
    area: "مصر الجديدة",
    areaEn: "Heliopolis",
    pricePerHour: 90,
    verified: true,
    topRated: false,
    pro: false,
    fastResponse: true,
    level: "Silver",
    points: 1240,
    avatar: initials("Karim"),
    bioAr: "نقاشة عادية ودهانات حديثة وديكورات جدران.",
    bioEn: "Standard painting, modern finishes and wall decor.",
  },
  {
    id: "p5",
    nameAr: "تكييف برو",
    nameEn: "AC Pro",
    trade: "ac",
    rating: 4.9,
    reviews: 421,
    jobs: 612,
    area: "التجمع الخامس",
    areaEn: "New Cairo",
    pricePerHour: 180,
    verified: true,
    topRated: true,
    pro: true,
    fastResponse: true,
    level: "Platinum",
    points: 6180,
    avatar: initials("ACPro"),
    bioAr: "تركيب وصيانة وغسيل تكييفات سبليت ومركزي.",
    bioEn: "Split & central AC install, service and washing.",
  },
  {
    id: "p6",
    nameAr: "نظافة بلس",
    nameEn: "Clean Plus",
    trade: "cleaning",
    rating: 4.8,
    reviews: 267,
    jobs: 390,
    area: "الزمالك",
    areaEn: "Zamalek",
    pricePerHour: 75,
    verified: true,
    topRated: true,
    pro: false,
    fastResponse: true,
    level: "Gold",
    points: 2540,
    avatar: initials("Clean"),
    bioAr: "نظافة منازل وشركات بأحدث المعدات ومواد آمنة.",
    bioEn: "Home and office cleaning with modern, safe equipment.",
  },
  {
    id: "p7",
    nameAr: "محل العمدة للأدوات",
    nameEn: "Al-Omda Tools",
    trade: "tools",
    rating: 4.7,
    reviews: 134,
    jobs: 0,
    area: "فيصل",
    areaEn: "Faisal",
    pricePerHour: 0,
    verified: true,
    topRated: false,
    pro: false,
    fastResponse: true,
    level: "Silver",
    points: 980,
    avatar: initials("Omda"),
    bioAr: "أدوات ومعدات وعدد لكل الحرف بأسعار الجملة.",
    bioEn: "Wholesale tools and gear for every trade.",
  },
  {
    id: "p8",
    nameAr: "نقل أثاث الأمانة",
    nameEn: "Amana Movers",
    trade: "moving",
    rating: 4.5,
    reviews: 76,
    jobs: 110,
    area: "أكتوبر",
    areaEn: "October",
    pricePerHour: 250,
    verified: false,
    topRated: false,
    pro: false,
    fastResponse: false,
    level: "Silver",
    points: 720,
    avatar: initials("Amana"),
    bioAr: "نقل عفش بسيارات مغلقة وفك وتركيب مجاني.",
    bioEn: "Furniture moving with closed trucks, free assembly.",
  },
];

export type Review = {
  id: string;
  authorAr: string;
  authorEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  textAr: string;
  textEn: string;
  axes: { quality: number; speed: number; price: number; pro: number };
  reply?: { textAr: string; textEn: string };
};

export const sampleReviews: Review[] = [
  {
    id: "r1",
    authorAr: "سارة م.",
    authorEn: "Sarah M.",
    rating: 5,
    dateAr: "منذ يومين",
    dateEn: "2 days ago",
    textAr: "خدمة ممتازة، سرعة في الحضور ونظافة في الشغل. هرشحه لكل أصحابي.",
    textEn: "Excellent service, fast arrival and clean work. Highly recommended.",
    axes: { quality: 5, speed: 5, price: 4, pro: 5 },
    reply: { textAr: "شكراً يا فندم على ثقتك ✨", textEn: "Thank you for your trust ✨" },
  },
  {
    id: "r2",
    authorAr: "خالد ع.",
    authorEn: "Khaled A.",
    rating: 4,
    dateAr: "منذ أسبوع",
    dateEn: "1 week ago",
    textAr: "الشغل كويس بس السعر كان أعلى من المتوقع شوية.",
    textEn: "Good work but pricing was a bit higher than expected.",
    axes: { quality: 5, speed: 4, price: 3, pro: 5 },
  },
  {
    id: "r3",
    authorAr: "منى ك.",
    authorEn: "Mona K.",
    rating: 5,
    dateAr: "منذ 3 أسابيع",
    dateEn: "3 weeks ago",
    textAr: "محترف جداً، وصل في الميعاد وحل المشكلة بسرعة.",
    textEn: "Very professional, on time and solved it quickly.",
    axes: { quality: 5, speed: 5, price: 5, pro: 5 },
  },
];

export const services = [
  { id: "s1", titleAr: "كشف تسريبات", titleEn: "Leak detection", price: 250 },
  { id: "s2", titleAr: "تركيب سخان", titleEn: "Heater installation", price: 180 },
  { id: "s3", titleAr: "صيانة حمام", titleEn: "Bathroom service", price: 350 },
  { id: "s4", titleAr: "تغيير مواسير", titleEn: "Pipe replacement", price: 600 },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
  "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
  "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",
  "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=600",
];

export const areas = [
  { ar: "كل المناطق", en: "All areas" },
  { ar: "المعادي", en: "Maadi" },
  { ar: "مدينة نصر", en: "Nasr City" },
  { ar: "الشيخ زايد", en: "Sheikh Zayed" },
  { ar: "مصر الجديدة", en: "Heliopolis" },
  { ar: "التجمع الخامس", en: "New Cairo" },
  { ar: "الزمالك", en: "Zamalek" },
  { ar: "أكتوبر", en: "October" },
  { ar: "فيصل", en: "Faisal" },
];