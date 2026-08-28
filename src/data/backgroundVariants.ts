export const backgroundVariants = {
  "soft-flow": {
    label: "Soft Flow",
    description: "En hafif; geniş ve sakin renk alanları.",
  },
  "layered-aurora": {
    label: "Layered Aurora",
    description: "Aura hissi daha güçlü, katmanlı bir görünüm.",
  },
  "mist-waves": {
    label: "Mist Waves",
    description: "Daha sinematik ve sisimsi hareket.",
  },
} as const;

export type BackgroundVariant = keyof typeof backgroundVariants;

// Variants A ("soft-flow") and B ("layered-aurora") are intentionally
// preserved. Change only this value to return to either saved treatment.
export const DEFAULT_BACKGROUND_VARIANT: BackgroundVariant = "mist-waves";
