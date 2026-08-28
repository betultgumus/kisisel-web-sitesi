import type { DetailEntry } from "@/types/content";

export const educationEntries: DetailEntry[] = [
  { title: "Eğitim başlığı", meta: "Kurum ve tarih eklenecek", description: "Program, uzmanlık alanı ve öne çıkan çalışmalar burada anlatılacak." },
  { title: "Sertifika başlığı", meta: "Sağlayıcı ve tarih eklenecek", description: "Sertifika kapsamı ve doğrulama bağlantısı burada yer alacak." },
];

export const experienceEntries: DetailEntry[] = [
  { title: "Deneyim başlığı", meta: "Rol, kurum ve tarih eklenecek", description: "Sorumluluklar, kullanılan yöntemler ve doğrulanabilir çıktılar burada anlatılacak.", tags: ["Yetkinlik", "Araç", "Çıktı"] },
  { title: "Deneyim başlığı", meta: "Rol, kurum ve tarih eklenecek", description: "İkinci deneyiminize ait özet içerik burada yer alacak.", tags: ["Yetkinlik", "Araç"] },
];

export const portfolioEntries: DetailEntry[] = [
  { title: "Proje başlığı", meta: "Kategori ve tarih eklenecek", description: "Çözülen problem, yaklaşımınız ve projenin sonucu burada anlatılacak.", tags: ["Teknoloji", "Yöntem"] },
  { title: "Proje başlığı", meta: "Kategori ve tarih eklenecek", description: "Proje görseli ve canlı bağlantısı daha sonra eklenebilir.", tags: ["Teknoloji", "Yöntem"] },
  { title: "Proje başlığı", meta: "Kategori ve tarih eklenecek", description: "Her kart merkezi veri dosyasından bağımsız biçimde yönetilir.", tags: ["Teknoloji", "Yöntem"] },
];

export const galleryEntries: DetailEntry[] = [
  { title: "Galeri öğesi", meta: "Tarih veya konum eklenecek", description: "Görsel ve kısa hikâyesi burada yer alacak." },
  { title: "Galeri öğesi", meta: "Tarih veya konum eklenecek", description: "Galeri içeriğiniz eklendiğinde bu yer tutucu kaldırılacak." },
  { title: "Galeri öğesi", meta: "Tarih veya konum eklenecek", description: "Düzen, farklı görsel oranlarına uyum sağlayacak şekilde hazırlandı." },
];
