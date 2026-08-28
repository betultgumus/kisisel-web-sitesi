import {
  SiGit,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import type { Technology } from "@/types/content";

export const technologies: Technology[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#013243" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Three.js", icon: SiThreedotjs, color: "#16171B" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];
