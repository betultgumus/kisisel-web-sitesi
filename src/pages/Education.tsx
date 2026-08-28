import { DetailPage } from "@/components/layout/DetailPage";
import { educationEntries } from "@/data/details";

export default function Education() {
  return <DetailPage eyebrow="Eğitim & Sertifikalar" title="Öğrenmek, üretmenin başlangıcı." intro="Eğitim geçmişiniz, uzmanlık programlarınız ve doğrulanabilir sertifikalarınız için sade bir zaman çizgisi." entries={educationEntries} />;
}
