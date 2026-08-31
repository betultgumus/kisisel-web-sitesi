import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandGithub,
  IconExternalLink,
  IconX,
} from "@tabler/icons-react";
import { ProjectPosterViewer } from "@/components/projects/ProjectPosterViewer";
import type { ProjectEntry } from "@/types/content";

type Props = { projects: ProjectEntry[] };

function ProjectHighlights({ highlights }: Pick<ProjectEntry, "highlights">) {
  if (!highlights?.length) return null;
  return (
    <ul className="project-highlights">
      {highlights.map((highlight) => (
        <li key={highlight.value}>
          <strong>{highlight.value}</strong>
          <span>{highlight.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExpandableProjects({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const detailButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastActiveIndexRef = useRef<number | null>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];
  const isOpen = activeIndex !== null;
  const dialogTitleId = activeIndex === null ? undefined : `project-dialog-title-${activeIndex}`;
  const dialogDescriptionId = activeIndex === null ? undefined : `project-dialog-description-${activeIndex}`;
  if (activeIndex !== null) lastActiveIndexRef.current = activeIndex;

  const close = useCallback(() => {
    const previousIndex = lastActiveIndexRef.current;
    setActiveIndex(null);
    window.setTimeout(() => previousIndex !== null && detailButtonRefs.current[previousIndex]?.focus(), 0);
  }, []);
  const previous = useCallback(() => setActiveIndex((current) => current === null ? 0 : (current - 1 + projects.length) % projects.length), [projects.length]);
  const next = useCallback(() => setActiveIndex((current) => current === null ? 0 : (current + 1) % projects.length), [projects.length]);

  useEffect(() => {
    if (!isOpen) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const inertedElements = new Map<HTMLElement, boolean>();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("project-modal-open");

    let activeBranch: HTMLElement | null = backdropRef.current;
    while (activeBranch?.parentElement && activeBranch.parentElement !== document.body) {
      const parent: HTMLElement = activeBranch.parentElement;
      Array.from(parent.children).forEach((sibling) => {
        if (sibling === activeBranch || !(sibling instanceof HTMLElement)) return;
        inertedElements.set(sibling, sibling.inert);
        sibling.inert = true;
      });
      activeBranch = parent;
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key !== "Tab") return;

      const focusableElements = Array.from(backdropRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? []).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const focusIsOutside = !backdropRef.current?.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || focusIsOutside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || focusIsOutside)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.classList.remove("project-modal-open");
      inertedElements.forEach((wasInert, element) => { element.inert = wasInert; });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen, next, previous]);

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 60) return;
    if (info.offset.x < 0) next(); else previous();
  };

  return (
    <div className="projects-experience">
      <div className="compact-project-grid">
        {projects.map((project, index) => (
          <motion.article
            className="compact-project-card"
            key={project.title}
            whileHover={{ y: -3 }}
            transition={{ duration: .2 }}
          >
            <header className="compact-project-header">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {project.date ? <time>{project.date}</time> : null}
            </header>
            <h3>{project.title}</h3>
            <p>{project.shortDescription}</p>
            <div className="project-keywords" aria-label={`${project.title} teknolojileri`}>
              {project.tags.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="compact-project-actions">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <IconBrandGithub size={17} aria-hidden="true" /> GitHub’da incele
              </a>
              <button
                ref={(element) => { detailButtonRefs.current[index] = element; }}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${project.title} projesinin detaylarını aç`}
              >
                Detayları aç <IconArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && activeIndex !== null ? (
          <motion.div
            ref={backdropRef}
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
          >
            <button className="project-side-navigation previous" type="button" onClick={previous} aria-label="Önceki projeye geç">
              <IconArrowLeft size={24} aria-hidden="true" />
            </button>

            <motion.section
              className={`project-modal ${activeProject.assetType !== "none" && activeProject.assetSrc ? "has-asset" : "no-asset"}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              aria-describedby={dialogDescriptionId}
              key={activeProject.title}
              initial={{ opacity: 0, y: 22, scale: .985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: .99 }}
              transition={{ duration: .26, ease: [0.22, 1, 0.36, 1] }}
            >
              <button ref={closeButtonRef} type="button" className="project-modal-close" onClick={close} aria-label="Proje detayını kapat">
                <IconX size={20} aria-hidden="true" />
              </button>
              <motion.div
                className="project-modal-scroll"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={.06}
                onDragEnd={onDragEnd}
              >
                <div className="project-modal-copy">
                  <div className="project-modal-meta">
                    <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                    {activeProject.date ? <time>{activeProject.date}</time> : null}
                  </div>
                  <h3 id={dialogTitleId}>{activeProject.title}</h3>
                  <p id={dialogDescriptionId}>{activeProject.detailDescription}</p>
                  {activeProject.bullets?.length ? (
                    <ul className="project-details">{activeProject.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  ) : null}
                  <ProjectHighlights highlights={activeProject.highlights} />
                  {activeProject.notes || activeProject.extraText ? (
                    <p className="project-extra-text">{activeProject.notes ?? activeProject.extraText}</p>
                  ) : null}
                  <div className="project-modal-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a className="project-github-link" href={activeProject.githubUrl} target="_blank" rel="noreferrer">
                    <IconBrandGithub size={17} aria-hidden="true" /> GitHub’da incele <IconExternalLink size={15} aria-hidden="true" />
                  </a>
                </div>
                <ProjectPosterViewer project={activeProject} />
              </motion.div>
              <div className="project-modal-mobile-navigation" aria-label="Projeler arasında gezin">
                <button type="button" onClick={previous}><IconArrowLeft size={18} aria-hidden="true" /> Önceki</button>
                <button type="button" onClick={next}>Sonraki <IconArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </motion.section>

            <button className="project-side-navigation next" type="button" onClick={next} aria-label="Sonraki projeye geç">
              <IconArrowRight size={24} aria-hidden="true" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
