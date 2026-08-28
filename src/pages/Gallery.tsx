import { DetailPage } from "@/components/layout/DetailPage";
import { galleryEntries } from "@/data/details";

export default function Gallery() {
  return <DetailPage eyebrow="Galeri" title="Sürecin içinden görsel notlar." intro="Etkinlikler, çalışma anları, eskizler ve ilham veren kareler için esnek bir görsel arşiv." entries={galleryEntries} variant="gallery" />;
}
