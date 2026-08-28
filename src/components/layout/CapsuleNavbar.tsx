import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { sections } from "@/data/sections";
import { ThemeToggle } from "./ThemeToggle";

type Props = { activeIndex: number; onSelect: (index: number) => void };

const compactLabels: Record<string, string> = {
  about: "Ben",
  education: "Eğitim",
  experience: "Deneyim",
  portfolio: "İşler",
  gallery: "Galeri",
  contact: "İletişim",
};

export function CapsuleNavbar({ activeIndex, onSelect }: Props) {
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    const section = sections[index];
    onSelect(index);
    if (section.route) navigate(section.route);
  };

  return (
    <nav className="capsule-nav" aria-label="Ana portfolyo menüsü">
      <span className="nav-monogram" aria-label="Ana sayfa">P.</span>
      <div className="nav-items">
        {sections.map((section, index) => (
          <button key={section.id} className={index === activeIndex ? "active" : ""} onClick={() => handleClick(index)}>
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
