import { motion } from "motion/react";
import type { Section } from "@/types/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = { sections: Section[]; activeIndex: number; onSelect: (index: number) => void };

export function SectionWheel({ sections, activeIndex, onSelect }: Props) {
  const mobile = useMediaQuery("(max-width: 620px)");
  const compact = useMediaQuery("(max-width: 1100px)");
  const activeSection = sections[activeIndex];
  const previousSection = sections[activeIndex - 1];
  const nextSection = sections[activeIndex + 1];

  if (mobile) {
    return (
      <div className="section-wheel section-wheel-mobile" aria-label="Bölüm çarkı">
        <div className="mobile-wheel-summary">
          <span className="mobile-wheel-eyebrow">Bölüm çarkı</span>
          <motion.strong
            key={activeSection.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSection.title.replace(" & Sertifikalar", "")}
          </motion.strong>
          <span className="mobile-wheel-count">
            {String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mobile-wheel-track" role="group" aria-label="Bölüm seçimi">
          <span className="mobile-wheel-arc" aria-hidden="true" />
          {sections.map((section, index) => (
            <button
              type="button"
              key={section.id}
              className={`mobile-wheel-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => onSelect(index)}
              aria-label={`${section.title} bölümüne git`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span />
            </button>
          ))}
        </div>

        <div className="mobile-wheel-neighbors">
          <button type="button" disabled={!previousSection} onClick={() => previousSection && onSelect(activeIndex - 1)}>
            <span>Önceki</span>
            <strong>{previousSection?.title.replace(" & Sertifikalar", "") ?? "Başlangıç"}</strong>
          </button>
          <span className="mobile-wheel-swipe" aria-hidden="true">↕</span>
          <button type="button" disabled={!nextSection} onClick={() => nextSection && onSelect(activeIndex + 1)}>
            <span>Sonraki</span>
            <strong>{nextSection?.title.replace(" & Sertifikalar", "") ?? "Bitiş"}</strong>
          </button>
        </div>
      </div>
    );
  }

  const geometry = compact
      ? { centerX: -390, centerY: 245, radiusX: 424, radiusY: 294, angleStep: 18 }
      : { centerX: -350, centerY: 270, radiusX: 475, radiusY: 326, angleStep: 17 };
  return (
    <div className="section-wheel" aria-label="Bölüm çarkı">
      <div
        className="wheel-arc"
        aria-hidden="true"
        style={{
          width: geometry.radiusX * 2,
          height: geometry.radiusY * 2,
          left: geometry.centerX - geometry.radiusX,
          top: geometry.centerY - geometry.radiusY,
        }}
      />
      {sections.map((section, index) => {
        const delta = index - activeIndex;
        const angle = delta * geometry.angleStep;
        const radians = (angle * Math.PI) / 180;
        const x = geometry.centerX + geometry.radiusX * Math.cos(radians);
        const y = geometry.centerY + geometry.radiusY * Math.sin(radians);
        const distance = Math.abs(delta);
        const isActive = index === activeIndex;
        const isNeighbor = distance === 1;
        return (
          <motion.button
            key={section.id}
            className={`wheel-item ${isActive ? "active" : ""}`}
            onClick={() => onSelect(index)}
            animate={{
              x,
              y,
              scale: isActive ? 1 : isNeighbor ? 0.9 : Math.max(0.66, 0.84 - (distance - 2) * 0.08),
              opacity: isActive ? 1 : isNeighbor ? 0.82 : Math.max(0.32, 0.57 - (distance - 2) * 0.1),
            }}
            transition={{ type: "spring", stiffness: 235, damping: 28, mass: 0.72 }}
            aria-current={isActive ? "true" : undefined}
            data-angle={angle}
            data-distance={distance}
          >
            <span className="wheel-dot" />
            <span className="wheel-label">{section.title.replace(" & Sertifikalar", "")}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
