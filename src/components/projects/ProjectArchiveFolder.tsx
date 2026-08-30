import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import type { DetailEntry } from "@/types/content";

type Props = { projects: DetailEntry[] };

export function ProjectArchiveFolder({ projects }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside className={`project-archive ${expanded ? "expanded" : ""}`} layout>
      <button type="button" className="project-archive-toggle" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded}>
        <span className="project-archive-icon" aria-hidden="true">
          {projects.slice(0, 3).map((project, index) => <i key={project.title} data-card={index + 1} />)}
        </span>
        <span><strong>Proje Arşivi</strong><small>Gelecek projeler için modüler görünüm</small></span>
        <IconChevronDown size={18} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div className="project-archive-grid" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .24, ease: [0.22, 1, 0.36, 1] }}>
            {projects.map((project, index) => (
              <div key={project.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{project.title}</strong></div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.aside>
  );
}
