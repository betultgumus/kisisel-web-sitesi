import { DetailPage } from "@/components/layout/DetailPage";
import { experienceEntries } from "@/data/details";

export default function Experience() {
  return <DetailPage eyebrow="Deneyim" title="Süreçten sonuca, gerçek katkılar." intro="Rollerinizi, üstlendiğiniz sorumlulukları ve ölçülebilir etkilerinizi anlatan deneyim alanı." entries={experienceEntries} />;
}
