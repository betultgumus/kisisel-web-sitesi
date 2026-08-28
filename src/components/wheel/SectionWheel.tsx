import { motion } from "motion/react";
import type { Section } from "@/types/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = { sections: Section[]; activeIndex: number; onSelect: (index: number) => void };

export function SectionWheel({ sections, activeIndex, onSelect }: Props) {
  const mobile = useMediaQuery("(max-width: 620px)");
  const compact = useMediaQuery("(max-width: 1100px)");
  const geometry = mobile
    ? { centerX: -150, centerY: 210, radiusX: 192, radiusY: 198, angleStep: 22 }
    : compact
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
