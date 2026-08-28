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

// Variant A ("soft-flow") is intentionally preserved for a future return.
// Change only this value to switch between the saved background treatments.
export const DEFAULT_BACKGROUND_VARIANT: BackgroundVariant = "layered-aurora";
