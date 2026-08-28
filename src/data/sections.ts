import type { Section } from "@/types/content";

export const sections: Section[] = [
  {
    id: "about",
    eyebrow: "01 / Tanışalım",
    title: "Hakkımda",
    description: "Kendi disiplininizi, yaklaşımınızı ve sizi farklılaştıran yönleri anlatacağınız alan.",
    note: "Kişisel açıklamanız eklenecek. Bu metin src/data/sections.ts içinden kolayca değiştirilebilir.",
    metric: "Merak · Üretim · Gelişim",
  },
  {
    id: "education",
    eyebrow: "02 / Öğrenme yolculuğu",
    title: "Eğitim & Sertifikalar",
    description: "Eğitim geçmişinizi ve doğrulanabilir sertifikalarınızı özetleyen kısa görünüm.",
    note: "Eğitim ve sertifika bilgileriniz eklenecek.",
    metric: "Sürekli öğrenme",
  },
  {
    id: "experience",
    eyebrow: "03 / Yolculuk",
    title: "Deneyim",
    description: "Rolünüzü, sorumluluklarınızı ve ölçülebilir katkılarınızı öne çıkaracağınız bölüm.",
    note: "Deneyim detaylarınız eklenecek.",
    metric: "Etki odaklı çalışma",
  },
  {
    id: "portfolio",
    eyebrow: "04 / Seçilmiş işler",
    title: "Portfolyo",
    description: "Problemi, yaklaşımı ve sonucu net biçimde anlatan çalışmalarınız için vitrin.",
    note: "Proje içerikleriniz ve bağlantılarınız eklenecek.",
    metric: "Fikirden ürüne",
  },
  {
    id: "gallery",
    eyebrow: "05 / Görsel notlar",
    title: "Galeri",
    description: "Üretim sürecinizden kareler, etkinlikler veya ilham arşiviniz için esnek alan.",
    note: "Galeri görselleriniz eklenecek.",
    metric: "Anlar & süreçler",
  },
  {
    id: "contact",
    eyebrow: "06 / Birlikte üretelim",
    title: "İletişim",
    description: "Yeni bir fikir, iş birliği veya yalnızca merhaba demek için doğru yerdesiniz.",
    note: "İletişim bağlantılarınızı src/data/contact.ts dosyasından güncelleyebilirsiniz.",
    metric: "Yeni fikirlere açık",
  },
];
