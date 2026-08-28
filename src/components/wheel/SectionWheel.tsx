import { AnimatePresence, motion } from "motion/react";
import type { Section } from "@/types/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = { sections: Section[]; activeIndex: number; onSelect: (index: number) => void };

export function SectionWheel({ sections, activeIndex, onSelect }: Props) {
  const mobile = useMediaQuery("(max-width: 620px)");
  const compact = useMediaQuery("(max-width: 1100px)");
  const geometry = compact
      ? { centerX: -390, centerY: 245, radiusX: 424, radiusY: 294, angleStep: 18 }
      : { centerX: -350, centerY: 270, radiusX: 475, radiusY: 326, angleStep: 17 };

  if (mobile) {
    const mobileGeometry = { centerX: -95, centerY: 160, radiusX: 155, radiusY: 132, angleStep: 34 };
    const visibleSections = sections
      .map((section, index) => ({ section, index, delta: index - activeIndex }))
      .filter(({ delta }) => Math.abs(delta) <= 1);

    return (
      <div className="section-wheel mobile-arc-wheel" aria-label="Mobil bölüm çarkı">
        <motion.div
          className="wheel-arc"
          aria-hidden="true"
          style={{
            width: mobileGeometry.radiusX * 2,
            height: mobileGeometry.radiusY * 2,
            left: mobileGeometry.centerX - mobileGeometry.radiusX,
            top: mobileGeometry.centerY - mobileGeometry.radiusY,
          }}
          animate={{ rotate: activeIndex * -1.4 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        />
        <AnimatePresence initial={false}>
          {visibleSections.map(({ section, index, delta }) => {
            const angle = delta * mobileGeometry.angleStep;
            const radians = (angle * Math.PI) / 180;
            const x = mobileGeometry.centerX + mobileGeometry.radiusX * Math.cos(radians);
            const y = mobileGeometry.centerY + mobileGeometry.radiusY * Math.sin(radians);
            const isActive = delta === 0;

            return (
              <motion.button
                type="button"
                key={section.id}
                className={`wheel-item ${isActive ? "active" : "mobile-neighbor"}`}
                onClick={() => onSelect(index)}
                initial={{ x, y: y + (delta < 0 ? -9 : 9), opacity: 0, scale: 0.84 }}
                animate={{ x, y, opacity: isActive ? 1 : 0.72, scale: isActive ? 1 : 0.92 }}
                exit={{ opacity: 0, scale: 0.82 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                aria-current={isActive ? "true" : undefined}
                aria-label={isActive ? `${section.title} aktif bölüm` : `${section.title} bölümüne git`}
                data-mobile-delta={delta}
              >
                <span className="wheel-dot" />
                <AnimatePresence initial={false}>
                  {!isActive ? (
                    <motion.span
                      key={`${section.id}-label`}
                      className="wheel-label"
                      initial={{ opacity: 0, y: delta < 0 ? 4 : -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: delta < 0 ? -3 : 3 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {section.title.replace(" & Sertifikalar", "")}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }

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
