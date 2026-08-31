import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { sections } from "@/data/sections";
import { ThemeToggle } from "./ThemeToggle";

type Props = { activeIndex: number; onSelect: (index: number) => void };

const compactLabels: Record<string, string> = {
  about: "Hakkımda",
  skills: "Teknik",
  experience: "Deneyim",
  portfolio: "Projeler",
  education: "Eğitim",
  contact: "İletişim",
};

export function CapsuleNavbar({ activeIndex, onSelect }: Props) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 620px)").matches) return;
    const container = itemsRef.current;
    const item = itemRefs.current[activeIndex];
    if (!container || !item) return;
    const left = item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeIndex]);

  return (
    <nav className="capsule-nav" aria-label="Ana portfolyo menüsü">
      <div ref={itemsRef} className="nav-items">
        {sections.map((section, index) => (
          <button
            ref={(element) => { itemRefs.current[index] = element; }}
            key={section.id}
            type="button"
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "location" : undefined}
            onClick={() => onSelect(index)}
          >
            {index === activeIndex && <motion.span className="nav-pill" layoutId="active-nav" transition={{ type: "spring", stiffness: 380, damping: 36 }} />}
            <span className="nav-label-full">{section.shortTitle ?? section.title}</span>
            <span className="nav-label-compact">{compactLabels[section.id] ?? section.title}</span>
          </button>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
}
