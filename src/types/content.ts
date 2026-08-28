import type { IconType } from "react-icons";

export type SectionId = "about" | "education" | "experience" | "portfolio" | "gallery" | "contact";

export type Section = {
  id: SectionId;
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  metric: string;
};

export type DetailEntry = {
  title: string;
  meta: string;
  description: string;
  tags?: string[];
};

export type Technology = {
  name: string;
  icon: IconType;
  color: string;
};
