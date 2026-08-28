import type { BackgroundVariant } from "@/data/backgroundVariants";

export function AnimatedBackground({ variant }: { variant: BackgroundVariant }) {
  return (
    <div className={`animated-background animated-background--${variant}`} aria-hidden="true">
      <span className="ambient-orb ambient-orb-one" />
      <span className="ambient-orb ambient-orb-two" />
      <span className="ambient-orb ambient-orb-three" />
      <span className="ambient-vignette" />
    </div>
  );
}
