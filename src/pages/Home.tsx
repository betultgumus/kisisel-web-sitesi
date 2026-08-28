import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import AuraCursor from "@/components/originkit/ui/aura-cursor";
import { Hero } from "@/components/hero/Hero";
import { TechnologyStrip } from "@/components/technology/TechnologyStrip";
import { InteractivePortfolio } from "@/components/portfolio/InteractivePortfolio";
import { CapsuleNavbar } from "@/components/layout/CapsuleNavbar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMouse } from "@/providers/MouseProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { sections } from "@/data/sections";

const CharacterStage = lazy(() => import("@/components/character/CharacterStage").then((module) => ({ default: module.CharacterStage })));
const LIGHT_AURA_PALETTE = ["#D8B4FE", "#F9A8D4", "#C4B5FD"];
const DARK_AURA_PALETTE = ["#A855F7", "#EC4899", "#7C3AED"];

export function Home() {
  const auraEnabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const { isInteractive } = useMouse();
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const selectSection = useCallback((next: number) => {
    const section = sections[next];
    if (!section) return;
    activeIndexRef.current = next;
    setActiveIndex(next);
    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${section.id}`);
  }, []);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const chooseActiveSection = () => {
      const readingLine = window.innerHeight * 0.36;
      let bestIndex = 0;
      let bestScore = Number.POSITIVE_INFINITY;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const containsReadingLine = rect.top <= readingLine && rect.bottom >= readingLine;
        const distance = containsReadingLine
          ? 0
          : Math.min(Math.abs(rect.top - readingLine), Math.abs(rect.bottom - readingLine));
        if (distance < bestScore) {
          bestScore = distance;
          bestIndex = index;
        }
      });

      if (bestIndex === activeIndexRef.current) return;
      activeIndexRef.current = bestIndex;
      setActiveIndex(bestIndex);
      window.history.replaceState(null, "", `#${sections[bestIndex].id}`);
    };

    const observer = new IntersectionObserver(chooseActiveSection, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: [0, 0.01, 0.25, 0.5],
    });
    elements.forEach((element) => observer.observe(element));
    chooseActiveSection();

    const hash = window.location.hash.slice(1);
    const hashIndex = sections.findIndex((section) => section.id === hash);
    const hashTarget = document.getElementById(hash);
    const frame = window.requestAnimationFrame(() => {
      if (hashIndex >= 0) {
        activeIndexRef.current = hashIndex;
        setActiveIndex(hashIndex);
      }
      hashTarget?.scrollIntoView({ behavior: "auto", block: "start" });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const scrollHome = useCallback(() => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#hero");
  }, []);

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
      <CapsuleNavbar activeIndex={activeIndex} onSelect={selectSection} onHome={scrollHome} />
      <Suspense fallback={<div className="scene-character hero-character character-loading" aria-hidden="true" />}>
        <CharacterStage />
      </Suspense>
      <Hero />
      <TechnologyStrip />
      <InteractivePortfolio activeIndex={activeIndex} onSelect={selectSection} />
    </div>
  );
}
