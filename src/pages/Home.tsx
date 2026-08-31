import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { Hero } from "@/components/hero/Hero";
import { InteractivePortfolio } from "@/components/portfolio/InteractivePortfolio";
import { CapsuleNavbar } from "@/components/layout/CapsuleNavbar";
import { sections } from "@/data/sections";
import { DEFAULT_BACKGROUND_VARIANT } from "@/data/backgroundVariants";

const CharacterStage = lazy(() => import("@/components/character/CharacterStage").then((module) => ({ default: module.CharacterStage })));

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadCharacter, setLoadCharacter] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const idleWindow = window as Window & typeof globalThis & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(() => setLoadCharacter(true), { timeout: 350 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }
    const timeout = window.setTimeout(() => setLoadCharacter(true), 80);
    return () => window.clearTimeout(timeout);
  }, []);

  const selectSection = useCallback((next: number) => {
    const section = sections[next];
    if (!section) return;
    activeIndexRef.current = next;
    setActiveIndex(next);
    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    };

    const observer = new IntersectionObserver(chooseActiveSection, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: [0, 0.01, 0.25, 0.5],
    });
    elements.forEach((element) => observer.observe(element));
    chooseActiveSection();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-page">
      <AnimatedBackground variant={DEFAULT_BACKGROUND_VARIANT} />
      <CapsuleNavbar activeIndex={activeIndex} onSelect={selectSection} />
      {loadCharacter ? (
        <Suspense fallback={<div className="scene-character hero-character character-loading" aria-hidden="true" />}>
          <CharacterStage />
        </Suspense>
      ) : <div className="scene-character hero-character character-loading" aria-hidden="true" />}
      <Hero />
      <InteractivePortfolio activeIndex={activeIndex} onSelect={selectSection} />
    </div>
  );
}
