# Kişisel 3D Portfolyo

React, Vite ve TypeScript ile hazırlanan; tek bir 3D karakter sahnesini Hero'dan interaktif portfolyo alanına taşıyan statik portfolyo prototipi.

## İçeriği özelleştirme

- Genel bölümler: `src/data/sections.ts`
- Eğitim, deneyim, proje ve galeri: `src/data/details.ts`
- Teknolojiler: `src/data/technologies.ts`
- İletişim bağlantıları: `src/data/contact.ts`
- Gerçek GLB modeli: `src/components/character/CharacterModel.tsx`
- Form sağlayıcısı: `src/lib/contactAdapter.ts`

## Çalıştırma

```bash
npm install
npm run dev
```

Üretim çıktısı için `npm run build` çalıştırılır. `vercel.json`, tüm React Router adreslerini `index.html` dosyasına yönlendirir; böylece detay sayfaları doğrudan açılabilir.

## Vercel

Depoyu GitHub'a gönderin, Vercel'de projeyi içe aktarın ve varsayılan Vite ayarlarıyla yayınlayın. Build komutu `npm run build`, çıktı dizini `dist` olmalıdır. Gerçek bir anahtar kullanılırsa yalnızca Vercel Environment Variables veya yerel `.env.local` içinde tutulmalıdır.
