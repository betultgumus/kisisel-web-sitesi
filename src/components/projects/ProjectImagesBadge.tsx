import type { DetailEntry } from "@/types/content";

type Props = { projects: DetailEntry[] };

export function ProjectImagesBadge({ projects }: Props) {
  return (
    <div className="project-images-badge" aria-label={`${projects.length} seçili proje önizlemesi`}>
      <span className="project-badge-previews" aria-hidden="true">
        {projects.slice(0, 3).map((project, index) => (
          <i className="project-badge-preview" data-preview={index + 1} key={project.title}>
            {project.title === "Beko Segmentasyon Analizi" ? "BK" : index === 0 ? "AN" : "TR"}
          </i>
        ))}
      </span>
      <span>Proje önizlemeleri</span>
    </div>
  );
}
