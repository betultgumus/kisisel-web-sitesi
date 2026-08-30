import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconExternalLink, IconX } from "@tabler/icons-react";
import type { DetailEntry } from "@/types/content";
import { ProjectArchiveFolder } from "./ProjectArchiveFolder";
import { ProjectImagesBadge } from "./ProjectImagesBadge";

type Props = { projects: DetailEntry[] };

function ProjectVisual({ project, index, compact = false }: { project: DetailEntry; index: number; compact?: boolean }) {
  return (
    <div className={`project-visual project-visual-${index + 1} ${compact ? "compact" : ""}`} data-project={project.title} aria-hidden="true">
      <span>{index === 0 ? "ANIVIA" : index === 1 ? "BEKO" : "TR · GAME"}</span>
      <i />
    </div>
  );
}

function ProjectHighlights({ highlights }: Pick<DetailEntry, "highlights">) {
  if (!highlights?.length) return null;
  return (
    <ul className="project-highlights">
      {highlights.map((highlight) => <li key={highlight.value}><strong>{highlight.value}</strong><span>{highlight.text}</span></li>)}
    </ul>
  );
}

export function ExpandableProjects({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeProject = activeIndex === null ? null : projects[activeIndex];

  const close = () => {
    const previousIndex = activeIndex;
    setActiveIndex(null);
    window.setTimeout(() => previousIndex !== null && cardRefs.current[previousIndex]?.focus(), 0);
  };
  const previous = () => setActiveIndex((current) => current === null ? 0 : (current - 1 + projects.length) % projects.length);
  const next = () => setActiveIndex((current) => current === null ? 0 : (current + 1) % projects.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 60) return;
    if (info.offset.x < 0) next(); else previous();
  };

  return (
    <div className="projects-experience">
      <div className="projects-tools"><ProjectImagesBadge projects={projects} /></div>
      <div className="expandable-project-grid">
        {projects.map((project, index) => (
          <motion.button
            type="button"
            className={`expandable-project-card ${index === 0 ? "featured" : ""}`}
            key={project.title}
            ref={(element) => { cardRefs.current[index] = element; }}
            onClick={() => setActiveIndex(index)}
            whileHover={{ y: -3 }}
            transition={{ duration: .2 }}
            aria-label={`${project.title} projesinin detaylarını aç`}
          >
            <ProjectVisual project={project} index={index} compact />
            <span className="project-card-copy">
              <strong>{project.title}</strong>
              <span>{project.description}</span>
              <span className="project-keywords">{project.tags?.map((tag) => <i key={tag}>{tag}</i>)}</span>
            </span>
            <span className="project-open-label">Detayları aç <IconArrowRight size={16} aria-hidden="true" /></span>
          </motion.button>
        ))}
      </div>

      <ProjectArchiveFolder projects={projects} />

      <AnimatePresence>
        {activeProject && activeIndex !== null ? (
          <motion.div className="project-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
            <motion.div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              key={activeProject.title}
              initial={{ opacity: 0, y: 24, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: .985 }}
              transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button ref={closeButtonRef} type="button" className="project-modal-close" onClick={close} aria-label="Proje detayını kapat"><IconX size={20} /></button>
              <motion.div className="project-modal-scroll" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.08} onDragEnd={onDragEnd}>
                <ProjectVisual project={activeProject} index={activeIndex} />
                <div className="project-modal-copy">
                  <span className="project-modal-count">{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                  <h3 id="project-dialog-title">{activeProject.title}</h3>
                  <p>{activeProject.description}</p>
                  {activeProject.bullets ? <ul className="project-details">{activeProject.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                  <ProjectHighlights highlights={activeProject.highlights} />
                  <div className="project-modal-tags">{activeProject.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {activeProject.href ? <a className="project-github-link" href={activeProject.href} target="_blank" rel="noreferrer">GitHub’da incele <IconExternalLink size={16} aria-hidden="true" /></a> : null}
                </div>
              </motion.div>
              <div className="project-modal-navigation" aria-label="Projeler arasında gezin">
                <button type="button" onClick={previous} aria-label="Önceki proje"><IconArrowLeft size={18} /><span>Önceki</span></button>
                <span>Kaydır veya ok tuşlarını kullan</span>
                <button type="button" onClick={next} aria-label="Sonraki proje"><span>Sonraki</span><IconArrowRight size={18} /></button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
