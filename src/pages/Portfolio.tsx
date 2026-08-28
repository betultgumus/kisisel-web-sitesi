import { DetailPage } from "@/components/layout/DetailPage";
import { portfolioEntries } from "@/data/details";

export default function Portfolio() {
  return <DetailPage eyebrow="Seçilmiş işler" title="Fikirden çalışan ürüne." intro="Her çalışma; problem, yaklaşım, üretim süreci ve sonuç üzerinden anlatılmak üzere tasarlandı." entries={portfolioEntries} variant="grid" />;
}
