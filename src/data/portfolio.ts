import {
  SiGit,
  SiGithub,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiPython,
  SiScikitlearn,
  SiSelenium,
  SiStreamlit,
} from "react-icons/si";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import type { DetailEntry, Section, Technology } from "@/types/content";

export const profile = {
  fullName: "Betül Tuba Gümüş",
  title: "Veri Bilimi & Yapay Zekâ",
  focus: "Veri Bilimi • Makine Öğrenmesi • Yapay Zekâ",
  heroSummary: "Python ve SQL ile veri analizi ve yapay zekâ projeleri geliştiren Yönetim Bilişim Sistemleri öğrencisi.",
  about: [
    "Yönetim Bilişim Sistemleri öğrencisi olarak Python ve SQL ile gerçek veri setleri üzerinde veri analizi, tahminleme ve makine öğrenmesi projeleri geliştiriyorum.",
    "Data Analytics / AI odağında; karar destek sistemleri ve yapay zekâ çalışmalarında veriyi anlaşılır, ölçülebilir ve uygulanabilir çözümlere dönüştürmeye odaklanıyorum.",
  ],
  location: "Bursa, Türkiye",
  email: "betultgumus@gmail.com",
  linkedin: "https://linkedin.com/in/betultgumus",
  github: "https://github.com/betultgumus",
} as const;

export const technicalSkills = [
  { category: "Programlama & Veri", items: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Excel"] },
  { category: "Veri Analizi & Makine Öğrenmesi", items: ["EDA", "İstatistiksel Analiz", "Özellik Mühendisliği", "Tahminleme", "Segmentasyon", "Sınıflandırma", "Regresyon", "Kümeleme", "Model Değerlendirme"] },
  { category: "Derin Öğrenme & Görüntü İşleme", items: ["U-Net", "Pix2Pix", "ESRGAN", "Restormer"] },
  { category: "Veri Toplama & Görselleştirme", items: ["Selenium", "BeautifulSoup", "Matplotlib", "Seaborn", "Plotly", "Streamlit"] },
  { category: "Araçlar", items: ["Git", "GitHub"] },
] as const;

export const educationEntries: DetailEntry[] = [
  {
    title: "Bandırma Onyedi Eylül Üniversitesi",
    role: "Yönetim Bilişim Sistemleri (Lisans)",
    meta: "10/2023 – 06/2027",
    description: "Beklenen mezuniyet: Haziran 2027. GANO: 3,27 / 4,00.",
    tags: ["Veri Tabanı Yönetim Sistemleri", "İstatistik", "Yazılım Mimarileri", "Veri Tabanı Programlama", "Veri Madenciliği", "Yapay Zekâ Uygulamaları", "Sağlıkta Yapay Zekâ", "Makine Öğrenmesi"],
  },
  {
    title: "Google",
    role: "Yapay Zekâ ve Teknoloji Akademisi",
    meta: "01/2026 – 08/2026",
    description: "Girişimcilik, finans, hukuk, insan kaynakları, Google Proje Yönetimi, web uygulama geliştirme ve Derin Öğrenme eğitimleri; Ideathon, Hackathon ve Datathon etkinliklerinde aktif proje geliştirme.",
    tags: ["Ideathon", "Hackathon", "Datathon", "Proje Yönetimi", "Derin Öğrenme"],
  },
];

export const certificationEntries: DetailEntry[] = [
  { title: "Derin Öğrenme Eğitimi", meta: "Tamamlama Belgesi", source: "Google Yapay Zekâ ve Teknoloji Akademisi", description: "Derin öğrenme alanındaki eğitim programının tamamlama belgesi." },
  { title: "Web Uygulamaları Geliştirme Eğitimi", meta: "Tamamlama Belgesi", source: "Google Yapay Zekâ ve Teknoloji Akademisi", description: "Web uygulaması geliştirme eğitim programının tamamlama belgesi." },
  { title: "Google Proje Yönetimi", meta: "Sertifika", source: "Coursera", description: "Google Proje Yönetimi eğitimleri kapsamında alınan sertifika." },
  { title: "Veri Bilimi ve Makine Öğrenmesi 2026", meta: "100 Günlük Kamp", source: "Atıl Samancıoğlu", description: "Uygulama ve proje odaklı 100 günlük veri bilimi ve makine öğrenmesi kampı.", href: "https://github.com/betultgumus/100DaysOfDataScience-ML-2026", hrefLabel: "GitHub Reposu" },
];

export const experienceEntries: DetailEntry[] = [
  {
    title: "TekNova Profil",
    meta: "AI Destekli Web Geliştirici · Uzaktan, Serbest · 06/2026 – Devam Ediyor",
    role: "AI Destekli Web Geliştirici",
    location: "Uzaktan, Serbest",
    period: "06/2026 – Devam Ediyor",
    description: "AI destekli geliştirme araçlarıyla müşteri gereksinimlerine uygun, kullanıcı odaklı dijital çözümler geliştiriyorum.",
    bullets: [
      "Web arayüzleri ve kullanıcı odaklı dijital çözümler geliştirme.",
      "Meta başlık/açıklama, içerik yapısı, mobil uyumluluk ve performans optimizasyonunu kapsayan teknik ve sayfa içi SEO.",
      "Test, hata giderme ve production deployment süreçlerini yürütme.",
    ],
    tags: ["AI Destekli Geliştirme", "SEO", "Responsive UI", "Deployment"],
  },
  {
    title: "Octapull",
    meta: "Makine Öğrenmesi Stajyeri · Uzaktan · 06/2025 – 08/2026",
    role: "Makine Öğrenmesi Stajyeri",
    location: "Uzaktan",
    period: "06/2025 – 08/2026",
    description: "Görüntü iyileştirme modellerinin geliştirme, eğitim ve değerlendirme süreçlerinde görev aldım.",
    bullets: [
      "U-Net, Pix2Pix, ESRGAN ve Restormer tabanlı model geliştirme ve eğitimi.",
      "Görüntü ön işleme, model eğitimi, inference ve performans değerlendirme.",
      "PSNR, SSIM ve loss metrikleriyle model karşılaştırması.",
      "Uzak sunucuda eğitim ve test; Git/GitHub ile versiyon kontrolü.",
    ],
    tags: ["U-Net", "Pix2Pix", "ESRGAN", "Restormer", "PSNR", "SSIM", "Git", "GitHub"],
  },
  {
    title: "Yönetim Bilişim Sistemleri Topluluğu (YBST)",
    meta: "Veri Bilimi Ekip Lideri · Bandırma · 12/2025 – 06/2026",
    role: "Veri Bilimi Ekip Lideri",
    location: "Bandırma",
    period: "12/2025 – 06/2026",
    description: "Veri bilimi ekibinin iş akışını, görev dağılımını ve proje takvimini yönettim.",
    bullets: [
      "Veri temizleme, EDA ve modelleme süreçlerini koordine ederek kod incelemeleri yapma.",
      "Haftalık görev dağılımı ve proje takvimi yönetimi.",
      "2026 MII etkinliğinde veri bilimi projelerinin ekip koordinasyonu.",
    ],
    tags: ["Ekip Liderliği", "EDA", "Modelleme", "Kod İnceleme"],
  },
  {
    title: "Social Office",
    meta: "Bilgi Teknolojileri Stajyeri · Uzaktan · 10/2025 – 11/2025",
    role: "Bilgi Teknolojileri Stajyeri",
    location: "Uzaktan",
    period: "10/2025 – 11/2025",
    description: "Excel, Python ve Photoshop kullanarak projeler geliştirdim; Excel ile dashboard tasarladım.",
    tags: ["Excel", "Python", "Photoshop", "Excel Dashboard"],
  },
];

export const portfolioEntries: DetailEntry[] = [
  {
    title: "7578 sayılı Kanun Kapsamında Karar Destek Sistemi (ANIVIA)",
    meta: "Yasal uyumluluk · Risk analizi · Karar destek sistemi",
    description: "1 Mayıs 2026'da yürürlüğe giren 7578 sayılı Kanun kapsamında dijital oyun platformlarının yasal uyumluluğunu değerlendirmek ve risk analizi üretmek için geliştirildi.",
    bullets: [
      "Selenium ve BeautifulSoup ile veri toplama; veri temizleme ve ön işleme.",
      "XGBoost ile risk sınıflandırması ve tehlikeli sınıf için %85 recall.",
      "K-Means ile 4 ana oyuncu personası; Random Forest ile yeni kullanıcı sınıflandırması.",
      "Literatür tabanlı ağırlıklarla 100 üzerinden Ebeveyn Denetim Skoru.",
    ],
    highlights: [
      { value: "%85 recall", text: "XGBoost modelinin tehlikeli sınıftaki geri çağırma başarısı." },
      { value: "4 ana persona", text: "K-Means ile ortaya çıkarılan oyuncu davranış kümeleri." },
      { value: "100 üzerinden skor", text: "Literatür tabanlı Ebeveyn Denetim Skoru." },
    ],
    tags: ["Selenium", "BeautifulSoup", "XGBoost", "K-Means", "Random Forest"],
    href: "https://github.com/betultgumus/ybs-makine-ogrenmesi/tree/main/ANIVIA/game-regulation-analytics",
    hrefLabel: "Projeyi GitHub’da aç",
  },
  {
    title: "Beko Segmentasyon Analizi",
    meta: "Ürün analizi · Segmentasyon · Dashboard",
    description: "Beko web sitesinden alınan dinamik ürün verileriyle fiyat/performans temelli segmentasyon analizi.",
    bullets: [
      "Selenium ile veri toplama; özellik mühendisliği ve ölçeklendirme.",
      "Ürün özelliklerine dayalı ürün skoru oluşturma.",
      "K-Means ile 6 stratejik segment ve Streamlit interaktif dashboard.",
    ],
    highlights: [
      { value: "6 stratejik segment", text: "K-Means ile oluşturulan fiyat/performans grupları." },
    ],
    tags: ["Selenium", "K-Means", "Streamlit", "Özellik Mühendisliği"],
    href: "https://github.com/betultgumus/ybst-veri-bilimi",
    hrefLabel: "Projeyi GitHub’da aç",
  },
  {
    title: "Türkiye Dijital Oyun Pazarında Fiyat Analizi",
    meta: "Fiyat tahmini · Regresyon · Keşifçi veri analizi",
    description: "Oyun sitelerinden toplanan verilerle oyun fiyatlarını tahmin eden ve regresyon modellerini karşılaştıran analiz.",
    bullets: [
      "Selenium ve BeautifulSoup ile veri toplama ve temizleme.",
      "Özellik mühendisliği ve keşifçi veri analizi.",
      "Regresyon modellerini MAE, RMSE ve R² metrikleriyle karşılaştırma.",
    ],
    highlights: [
      { value: "MAE, RMSE ve R²", text: "Regresyon modellerinin karşılaştırıldığı değerlendirme metrikleri." },
    ],
    tags: ["Selenium", "BeautifulSoup", "Regresyon", "EDA"],
    href: "https://github.com/betultgumus/ybs-makine-ogrenmesi/tree/main/ANIVIA/regression-price-model",
    hrefLabel: "Projeyi GitHub’da aç",
  },
];

export const sections: Section[] = [
  { id: "about", title: "Hakkımda" },
  { id: "skills", title: "Teknik Yetkinlikler", shortTitle: "Teknik Yetkinlikler", wheelTitle: "Yetkinlikler" },
  { id: "experience", title: "Deneyim" },
  { id: "portfolio", title: "Projeler" },
  { id: "education", title: "Eğitim & Sertifikalar", shortTitle: "Eğitim", wheelTitle: "Eğitim" },
  { id: "contact", title: "İletişim" },
];

export const contactLinks = {
  email: `mailto:${profile.email}`,
  emailAddress: profile.email,
  github: profile.github,
  linkedin: profile.linkedin,
} as const;

export const technologies: Technology[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#4D77CF" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "Excel", icon: PiMicrosoftExcelLogo, color: "#217346" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#586069" },
  { name: "Selenium", icon: SiSelenium, color: "#43B02A" },
  { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
  { name: "Plotly", icon: SiPlotly, color: "#3F4F75" },
];
