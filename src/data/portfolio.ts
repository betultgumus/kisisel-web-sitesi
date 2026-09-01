import {
  SiClaude,
  SiGithub,
  SiPython,
} from "react-icons/si";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { VscOpenai, VscVscode } from "react-icons/vsc";
import { GeminiBrandIcon, PowerBiIcon } from "@/components/technology/ToolBrandIcons";
import type { DetailEntry, ProjectEntry, Section, Technology } from "@/types/content";

export const profile = {
  fullName: "Betül Tuba Gümüş",
  title: "Veri Bilimi & Yapay Zekâ",
  focus: "Veri Bilimi • Makine Öğrenmesi • Yapay Zekâ",
  heroSummary: "Python ve SQL ile veri analizi ve yapay zekâ projeleri geliştiren Yönetim Bilişim Sistemleri öğrencisi.",
  about: [
    "Yönetim Bilişim Sistemleri son sınıf öğrencisiyim.",
    "Data Analytics / AI odağında karar destek sistemleri ve veri odaklı çözümler üzerinde çalışıyorum. Analiz sonuçlarını ölçülebilir ve uygulanabilir çıktılara dönüştürmeye odaklanıyorum.",
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
  { title: "Veri Bilimi ve Makine Öğrenmesi 2026", meta: "100 Günlük Kamp", source: "Atıl Samancıoğlu", description: "Uygulama ve proje odaklı 100 günlük veri bilimi ve makine öğrenmesi kampı.", href: "https://github.com/betultgumus/100DaysOfDataScience-ML-2026", hrefLabel: "GitHub Reposu" },
  { title: "Google Proje Yönetimi", meta: "Sertifika", source: "Coursera", description: "Google Proje Yönetimi eğitimleri kapsamında alınan sertifika." },
  { title: "Derin Öğrenme Eğitimi", meta: "Tamamlama Belgesi", source: "Google Yapay Zekâ ve Teknoloji Akademisi", description: "Derin öğrenme alanındaki eğitim programının tamamlama belgesi." },
  { title: "Web Uygulamaları Geliştirme Eğitimi", meta: "Tamamlama Belgesi", source: "Google Yapay Zekâ ve Teknoloji Akademisi", description: "Web uygulaması geliştirme eğitim programının tamamlama belgesi." },
];

export const experienceEntries: DetailEntry[] = [
  {
    title: "TekNova Profil",
    meta: "AI Destekli Web Geliştirici · Uzaktan, Serbest · 06/2026 – Devam Ediyor",
    logoSrc: "/experience-logos/teknova_profil.png",
    logoAlt: "TekNova Profil logosu",
    role: "AI Destekli Web Geliştirici",
    location: "Uzaktan, Serbest",
    period: "06/2026 – Devam Ediyor",
    description: "Müşteri gereksinimlerine uygun web arayüzleri ve kullanıcı odaklı dijital çözümlerin geliştirilmesi.",
    bullets: [
      "AI destekli geliştirme araçlarının web arayüzü geliştirme süreçlerinde kullanılması.",
      "Teknik ve sayfa içi SEO kapsamında meta başlık ve açıklamaların, içerik yapısının, mobil uyumluluğun ve performansın optimize edilmesi.",
      "Web projelerinde test, hata giderme ve production deployment süreçlerinin yürütülmesi.",
    ],
    tags: ["AI Destekli Geliştirme", "SEO", "Responsive UI", "Deployment"],
  },
  {
    title: "Octapull",
    meta: "Makine Öğrenmesi Stajyeri · Uzaktan · 06/2025 – 08/2026",
    logoSrc: "/experience-logos/octapull.png",
    logoAlt: "Octapull logosu",
    role: "Makine Öğrenmesi Stajyeri",
    location: "Uzaktan",
    period: "06/2025 – 08/2026",
    description: "U-Net, Pix2Pix, ESRGAN ve Restormer tabanlı görüntü iyileştirme modellerinin geliştirilmesi ve eğitim süreçlerinin yürütülmesi.",
    bullets: [
      "Görüntü ön işleme, model eğitimi, inference ve performans değerlendirme süreçlerinin yürütülmesi.",
      "Model performanslarının PSNR, SSIM ve loss metrikleri kullanılarak değerlendirilmesi ve karşılaştırılması.",
      "Uzak sunucu ortamında eğitim, test ve geliştirme süreçlerinin yürütülmesi; Git/GitHub ile versiyon kontrolünün sağlanması.",
    ],
    tags: ["U-Net", "Pix2Pix", "ESRGAN", "Restormer", "PSNR", "SSIM", "Git", "GitHub"],
  },
  {
    title: "Yönetim Bilişim Sistemleri Topluluğu (YBST)",
    meta: "Veri Bilimi Ekip Lideri · Bandırma · 12/2025 – 06/2026",
    logoSrc: "/experience-logos/yonetim_bilisim_sistemleri_toplulugu.png",
    logoAlt: "Yönetim Bilişim Sistemleri Topluluğu logosu",
    role: "Veri Bilimi Ekip Lideri",
    location: "Bandırma",
    period: "12/2025 – 06/2026",
    description: "Veri bilimi ekibinin iş akışı, haftalık görev dağılımı ve proje takviminin yönetilmesi.",
    bullets: [
      "Veri temizleme, EDA ve modelleme süreçlerinin koordinasyonu ile kod incelemelerinin gerçekleştirilmesi.",
      "2026 MII etkinliğinde veri bilimi projelerinin ekip koordinasyonunun sağlanması.",
    ],
    tags: ["Ekip Liderliği", "EDA", "Modelleme", "Kod İnceleme"],
  },
  {
    title: "Social Office",
    meta: "Bilgi Teknolojileri Stajyeri · Uzaktan · 10/2025 – 11/2025",
    logoSrc: "/experience-logos/social_office.png",
    logoAlt: "Social Office logosu",
    role: "Bilgi Teknolojileri Stajyeri",
    location: "Uzaktan",
    period: "10/2025 – 11/2025",
    description: "Excel, Python ve Photoshop kullanılarak proje çalışmalarının geliştirilmesi.",
    bullets: ["Excel ile dashboard tasarlanması."],
    tags: ["Excel", "Python", "Photoshop", "Excel Dashboard"],
  },
];

export const portfolioEntries: ProjectEntry[] = [
  {
    title: "7578 sayılı Kanun Kapsamında Karar Destek Sistemi (ANIVIA)",
    logoSrc: "/experience-logos/anivia.png",
    logoAlt: "ANIVIA Game Insight logosu",
    shortDescription: "Dijital oyun platformlarının yasal uyumluluğunu değerlendiren, Web Scraping ve makine öğrenmesi tabanlı karar destek sistemi.",
    detailDescription: "1 Mayıs 2026'da yürürlüğe giren 7578 sayılı Kanun kapsamında dijital oyun platformlarının yasal uyumluluğunu değerlendirmek ve risk analizi üretmek için geliştirildi.",
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
    githubUrl: "https://github.com/betultgumus/ybs-makine-ogrenmesi/tree/main/ANIVIA/game-regulation-analytics",
    assetType: "pdf",
    assetSrc: "/projects/anivia-poster.pdf",
    assetPreviewSrc: "/projects/previews/anivia-poster.webp",
    assetAlt: "ANIVIA yasal regülasyon ve oyun ekosistemi karar destek sistemi araştırma posteri",
  },
  {
    title: "Beko Segmentasyon Analizi",
    logoSrc: "/experience-logos/beko.png",
    logoAlt: "Beko Segmentasyon Analizi logosu",
    shortDescription: "Dinamik ürün verilerinin fiyat/performans temelinde 6 stratejik segmente ayrılması ve sonuçların Streamlit dashboard ile görselleştirilmesi.",
    detailDescription: "Beko web sitesinden alınan dinamik ürün verileriyle fiyat/performans temelli segmentasyon analizi.",
    bullets: [
      "Selenium ile veri toplama; özellik mühendisliği ve ölçeklendirme.",
      "Ürün özelliklerine dayalı ürün skoru oluşturma.",
      "K-Means ile 6 stratejik segment ve Streamlit interaktif dashboard.",
    ],
    highlights: [
      { value: "6 stratejik segment", text: "K-Means ile oluşturulan fiyat/performans grupları." },
    ],
    tags: ["Selenium", "K-Means", "Streamlit", "Özellik Mühendisliği"],
    githubUrl: "https://github.com/betultgumus/ybst-veri-bilimi",
    assetType: "pdf",
    assetSrc: "/projects/beko-segmentation-poster.pdf",
    assetPreviewSrc: "/projects/previews/beko-segmentation-poster.webp",
    assetAlt: "Beko müşteri deneyimi ve ürün analitik sistemi posteri",
  },
  {
    title: "Türkiye Dijital Oyun Pazarında Fiyat Analizi",
    shortDescription: "Web Scraping ile toplanan oyun verilerinde EDA, özellik mühendisliği ve regresyon modeli karşılaştırması.",
    detailDescription: "Oyun sitelerinden toplanan verilerle oyun fiyatlarını tahmin eden ve regresyon modellerini karşılaştıran analiz.",
    bullets: [
      "Selenium ve BeautifulSoup ile veri toplama ve temizleme.",
      "Özellik mühendisliği ve keşifçi veri analizi.",
      "Regresyon modellerini MAE, RMSE ve R² metrikleriyle karşılaştırma.",
    ],
    highlights: [
      { value: "MAE, RMSE ve R²", text: "Regresyon modellerinin karşılaştırıldığı değerlendirme metrikleri." },
    ],
    tags: ["Selenium", "BeautifulSoup", "Regresyon", "EDA"],
    githubUrl: "https://github.com/betultgumus/ybs-makine-ogrenmesi/tree/main/ANIVIA/regression-price-model",
    assetType: "none",
  },
];

export const sections: Section[] = [
  { id: "about", title: "Hakkımda" },
  { id: "skills", title: "Teknik Yetkinlikler", shortTitle: "Teknik Yetkinlikler", wheelTitle: "Yetkinlikler" },
  { id: "experience", title: "Deneyim" },
  { id: "portfolio", title: "Projeler" },
  { id: "education", title: "Eğitim", shortTitle: "Eğitim", wheelTitle: "Eğitim" },
  { id: "contact", title: "İletişim" },
];

export const contactLinks = {
  email: `mailto:${profile.email}`,
  emailAddress: profile.email,
  github: profile.github,
  linkedin: profile.linkedin,
} as const;

export const technologies: Technology[] = [
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "ChatGPT", icon: VscOpenai, color: "#202123", darkColor: "#F4F4F5" },
  { name: "Gemini", icon: GeminiBrandIcon, color: "#6D79D6" },
  { name: "Claude", icon: SiClaude, color: "#D97757" },
  { name: "Power BI", icon: PowerBiIcon, color: "#F2C811" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Excel", icon: PiMicrosoftExcelLogo, color: "#217346" },
  { name: "GitHub", icon: SiGithub, color: "#586069" },
];
