import type { IconType } from "react-icons";

export type SectionId = "about" | "skills" | "experience" | "portfolio" | "education" | "contact";

export type Section = {
  id: SectionId;
  title: string;
  shortTitle?: string;
  wheelTitle?: string;
};

export type DetailEntry = {
  title: string;
  meta: string;
  description: string;
  role?: string;
  organization?: string;
  location?: string;
  period?: string;
  source?: string;
  tags?: string[];
  bullets?: string[];
  highlights?: Array<{ value: string; text: string }>;
  href?: string;
  hrefLabel?: string;
};

export type Technology = {
  name: string;
  icon: IconType;
  color: string;
};
