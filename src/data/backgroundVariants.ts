export const backgroundVariants = {
  "layered-aurora": {
    label: "Layered Aurora",
    description: "Aura hissi daha güçlü, katmanlı bir görünüm.",
  },
} as const;

export type BackgroundVariant = keyof typeof backgroundVariants;

export const DEFAULT_BACKGROUND_VARIANT: BackgroundVariant = "layered-aurora";
