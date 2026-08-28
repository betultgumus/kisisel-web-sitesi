import { AnimatePresence, motion } from "motion/react";
import { IconArrowUpRight, IconMailForward } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import type { Section } from "@/types/content";

export function SectionContent({ section, direction, onOpenContact }: { section: Section; direction: number; onOpenContact: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="content-stage" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={section.id}
          className="glass-card glass3d"
          initial={{ opacity: 0, y: direction > 0 ? 34 : -34, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: direction > 0 ? -28 : 28, filter: "blur(8px)" }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="card-topline">
            <span>{section.eyebrow}</span>
            <span className="card-signal"><i /> aktif bölüm</span>
          </div>
          <h2>{section.title}</h2>
          <p className="card-lead">{section.description}</p>
          <div className="card-note"><span>Not</span><p>{section.note}</p></div>
          <div className="card-footer">
            <strong>{section.metric}</strong>
            {section.route && (
              <button className="text-cta" onClick={() => navigate(section.route!)}>
                Detaylı incele <IconArrowUpRight size={18} />
              </button>
            )}
            {section.id === "contact" && (
              <button className="text-cta" onClick={onOpenContact}>
                Mesaj gönder <IconMailForward size={18} />
              </button>
            )}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
