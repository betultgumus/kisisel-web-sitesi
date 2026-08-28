import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { sections } from "@/data/sections";
import { ThemeToggle } from "./ThemeToggle";

type Props = { activeIndex: number; onSelect: (index: number) => void; onHome: () => void };

const compactLabels: Record<string, string> = {
  about: "Hakkımda",
  education: "Eğitim",
  experience: "Deneyim",
  portfolio: "Portfolyo",
  gallery: "Galeri",
  contact: "İletişim",
};

export function CapsuleNavbar({ activeIndex, onSelect, onHome }: Props) {
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
      <button type="button" className="nav-monogram" onClick={onHome} aria-label="Ana sayfaya dön">P.</button>
      <div ref={itemsRef} className="nav-items">
        {sections.map((section, index) => (
          <button
            ref={(element) => { itemRefs.current[index] = element; }}
            key={section.id}
            className={index === activeIndex ? "active" : ""}
            onClick={() => onSelect(index)}
          >
            {index === activeIndex && <motion.span className="nav-pill" layoutId="active-nav" transition={{ type: "spring", stiffness: 380, damping: 36 }} />}
            <span className="nav-label-full">{section.title.replace(" & Sertifikalar", "")}</span>
            <span className="nav-label-compact">{compactLabels[section.id] ?? section.title}</span>
          </button>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
}
