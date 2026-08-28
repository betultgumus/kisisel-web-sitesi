import { motion } from "motion/react";
import { sections } from "@/data/sections";
import { ThemeToggle } from "./ThemeToggle";

type Props = { activeIndex: number; onSelect: (index: number) => void; onHome: () => void };

const compactLabels: Record<string, string> = {
  about: "Ben",
  education: "Eğitim",
  experience: "Deneyim",
  portfolio: "İşler",
  gallery: "Galeri",
  contact: "İletişim",
};

export function CapsuleNavbar({ activeIndex, onSelect, onHome }: Props) {
  return (
    <nav className="capsule-nav" aria-label="Ana portfolyo menüsü">
      <button type="button" className="nav-monogram" onClick={onHome} aria-label="Ana sayfaya dön">P.</button>
      <div className="nav-items">
        {sections.map((section, index) => (
          <button key={section.id} className={index === activeIndex ? "active" : ""} onClick={() => onSelect(index)}>
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
