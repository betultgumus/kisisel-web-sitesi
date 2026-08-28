import { lazy, Suspense, useCallback, useState } from "react";
import AuraCursor from "@/components/originkit/ui/aura-cursor";
import { Hero } from "@/components/hero/Hero";
import { TechnologyStrip } from "@/components/technology/TechnologyStrip";
import { InteractivePortfolio } from "@/components/portfolio/InteractivePortfolio";
import { CapsuleNavbar } from "@/components/layout/CapsuleNavbar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMouse } from "@/providers/MouseProvider";
import { useTheme } from "@/providers/ThemeProvider";

const CharacterStage = lazy(() => import("@/components/character/CharacterStage").then((module) => ({ default: module.CharacterStage })));
const LIGHT_AURA_PALETTE = ["#D8B4FE", "#F9A8D4", "#C4B5FD"];
const DARK_AURA_PALETTE = ["#A855F7", "#EC4899", "#7C3AED"];

export function Home() {
  const auraEnabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const { isInteractive } = useMouse();
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const selectSection = useCallback((next: number, nextDirection?: number) => {
    setDirection(nextDirection ?? (next >= activeIndex ? 1 : -1));
    setActiveIndex(next);
  }, [activeIndex]);

  return (
    <div className="home-page">
      {auraEnabled ? (
        <div className={`aura-cursor-layer${isInteractive ? " is-interactive" : ""}`} aria-hidden="true">
          <AuraCursor
            label={false}
            backdrop={theme}
            paletteColors={theme === "dark" ? DARK_AURA_PALETTE : LIGHT_AURA_PALETTE}
            densityDissipation={7}
            curl={3}
            splatRadius={4}
            splatForce={6}
          />
        </div>
      ) : null}
      <CapsuleNavbar activeIndex={activeIndex} onSelect={(index) => selectSection(index)} />
      <Suspense fallback={<div className="scene-character hero-character character-loading" aria-hidden="true" />}>
        <CharacterStage placement="hero" />
      </Suspense>
      <Hero />
      <TechnologyStrip />
      <InteractivePortfolio activeIndex={activeIndex} direction={direction} onSelect={selectSection} />
    </div>
  );
}
