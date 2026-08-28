import { lazy, Suspense, useCallback, useEffect, useRef, useState, type WheelEvent } from "react";
import { IconArrowsVertical } from "@tabler/icons-react";
import { sections } from "@/data/sections";
import { SectionWheel } from "@/components/wheel/SectionWheel";
import { SectionContent } from "./SectionContent";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { ContactModal } from "@/components/dock/ContactModal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const CharacterStage = lazy(() => import("@/components/character/CharacterStage").then((module) => ({ default: module.CharacterStage })));

type Props = {
  activeIndex: number;
  direction: number;
  onSelect: (index: number, direction?: number) => void;
};

export type PortfolioScrollMode = "document" | "entering" | "interactive" | "leaving";

const ARM_DELAY = 340;
const GESTURE_END_DELAY = 170;
const TRANSITION_LOCK = 580;

export function InteractivePortfolio({ activeIndex, direction, onSelect }: Props) {
  const mobile = useMediaQuery("(max-width: 620px)");
  const showPortfolioCharacter = useMediaQuery("(min-width: 901px)");
  const [contactOpen, setContactOpen] = useState(false);
  const [scrollMode, setScrollMode] = useState<PortfolioScrollMode>("document");
  const shellRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<PortfolioScrollMode>("document");
  const sceneReady = useRef(false);
  const accumulator = useRef(0);
  const locked = useRef(false);
  const gestureConsumed = useRef(false);
  const touchStart = useRef(0);
  const touchLast = useRef(0);
  const touchActive = useRef(false);
  const snapRequested = useRef(false);
  const lockTimer = useRef<number | null>(null);
  const gestureTimer = useRef<number | null>(null);
  const armTimer = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

  const changeMode = useCallback((mode: PortfolioScrollMode) => {
    modeRef.current = mode;
    setScrollMode(mode);
  }, []);

  const clearGesture = useCallback(() => {
    accumulator.current = 0;
    gestureConsumed.current = false;
  }, []);

  const scheduleArm = useCallback(() => {
    if (armTimer.current) window.clearTimeout(armTimer.current);
    armTimer.current = window.setTimeout(() => {
      if ((sceneReady.current || mobile) && modeRef.current === "entering") {
        snapRequested.current = false;
        clearGesture();
        changeMode("interactive");
      }
    }, mobile ? 460 : ARM_DELAY);
  }, [changeMode, clearGesture, mobile]);

  useEffect(() => {
    const measure = () => {
      frame.current = null;
      const shell = shellRef.current;
      const dock = dockRef.current;
      if (!shell || !dock) return;
      const shellRect = shell.getBoundingClientRect();
      const dockRect = dock.getBoundingClientRect();
      const settleTolerance = mobile ? 18 : 3;
      const settled = Math.abs(shellRect.top) <= settleTolerance && shellRect.bottom <= window.innerHeight + settleTolerance;
      const dockVisible = dockRect.top >= -settleTolerance && dockRect.bottom <= window.innerHeight + settleTolerance;
      const ready = settled && dockVisible;
      sceneReady.current = ready;

      if (ready) {
        snapRequested.current = false;
        if (modeRef.current === "document" || modeRef.current === "leaving") {
          changeMode("entering");
          clearGesture();
          onSelect(0, -1);
        }
        if (modeRef.current === "entering") scheduleArm();
      } else if (
        mobile
        && modeRef.current === "document"
        && Math.abs(shellRect.top) <= window.innerHeight * 0.52
        && shellRect.bottom >= window.innerHeight * 0.55
      ) {
        snapRequested.current = true;
        changeMode("entering");
        clearGesture();
        onSelect(0, -1);
        shell.scrollIntoView({ behavior: "smooth", block: "start" });
        scheduleArm();
      } else if (!ready && modeRef.current !== "document" && !snapRequested.current) {
        const mobileWithinGate = mobile
          && Math.abs(shellRect.top) <= window.innerHeight * 0.52
          && shellRect.bottom >= window.innerHeight * 0.55;
        if (mobileWithinGate) return;
        if (armTimer.current) window.clearTimeout(armTimer.current);
        changeMode("document");
        clearGesture();
      }
    };
    const requestMeasure = () => {
      if (frame.current === null) frame.current = window.requestAnimationFrame(measure);
    };
    requestMeasure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure, { passive: true });
    const observer = new IntersectionObserver(requestMeasure, { threshold: [0, 1] });
    if (shellRef.current) observer.observe(shellRef.current);
    if (dockRef.current) observer.observe(dockRef.current);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      observer.disconnect();
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [changeMode, clearGesture, mobile, onSelect, scheduleArm]);

  useEffect(() => () => {
    if (lockTimer.current) window.clearTimeout(lockTimer.current);
    if (gestureTimer.current) window.clearTimeout(gestureTimer.current);
    if (armTimer.current) window.clearTimeout(armTimer.current);
  }, []);

  const move = useCallback((delta: number) => {
    if (locked.current) return;
    locked.current = true;
    const nextDirection = delta > 0 ? 1 : -1;
    const nextIndex = (activeIndex + nextDirection + sections.length) % sections.length;
    onSelect(nextIndex, nextDirection);
    lockTimer.current = window.setTimeout(() => {
      locked.current = false;
      accumulator.current = 0;
    }, TRANSITION_LOCK);
  }, [activeIndex, onSelect]);

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    if (modeRef.current === "entering") {
      scheduleArm();
      return;
    }
    if (modeRef.current !== "interactive") return;
    if (activeIndex === 0 && event.deltaY < 0) {
      changeMode("leaving");
      sceneReady.current = false;
      clearGesture();
      return;
    }
    event.preventDefault();
    if (gestureTimer.current) window.clearTimeout(gestureTimer.current);
    gestureTimer.current = window.setTimeout(clearGesture, GESTURE_END_DELAY);
    if (locked.current || gestureConsumed.current) return;
    accumulator.current += event.deltaY;
    if (Math.abs(accumulator.current) >= 38) {
      gestureConsumed.current = true;
      move(accumulator.current);
    }
  };

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const startTouch = (event: TouchEvent) => {
      touchActive.current = event.touches.length === 1 && modeRef.current === "interactive";
      if (!touchActive.current) return;
      touchStart.current = event.touches[0].clientY;
      touchLast.current = touchStart.current;
      if (!locked.current) gestureConsumed.current = false;
    };

    const moveTouch = (event: TouchEvent) => {
      if (!touchActive.current || modeRef.current !== "interactive" || event.touches.length !== 1) return;
      touchLast.current = event.touches[0].clientY;
      const delta = touchStart.current - touchLast.current;
      const canLeavePortfolio = activeIndex === 0 && delta < 0;
      if (event.cancelable) event.preventDefault();
      if (Math.abs(delta) < 34 || gestureConsumed.current || locked.current) return;
      if (canLeavePortfolio) {
        gestureConsumed.current = true;
        touchActive.current = false;
        changeMode("leaving");
        sceneReady.current = false;
        snapRequested.current = false;
        window.scrollTo({ top: Math.max(0, window.scrollY - window.innerHeight * 0.55), behavior: "smooth" });
        return;
      }
      gestureConsumed.current = true;
      move(delta);
    };

    const endTouch = (event: TouchEvent) => {
      if (!touchActive.current) return;
      const endY = event.changedTouches[0]?.clientY ?? touchLast.current;
      const delta = touchStart.current - endY;
      touchActive.current = false;
      if (modeRef.current !== "interactive") {
        clearGesture();
        return;
      }
      if (activeIndex === 0 && delta < -34) {
        changeMode("leaving");
        sceneReady.current = false;
        snapRequested.current = false;
        clearGesture();
        window.scrollTo({ top: Math.max(0, window.scrollY - window.innerHeight * 0.55), behavior: "smooth" });
        return;
      }
      if (!gestureConsumed.current && !locked.current && Math.abs(delta) >= 34) {
        gestureConsumed.current = true;
        move(delta);
      }
      if (!locked.current) clearGesture();
    };

    const cancelTouch = () => {
      touchActive.current = false;
      clearGesture();
    };

    shell.addEventListener("touchstart", startTouch, { passive: true });
    shell.addEventListener("touchmove", moveTouch, { passive: false });
    shell.addEventListener("touchend", endTouch, { passive: true });
    shell.addEventListener("touchcancel", cancelTouch, { passive: true });
    return () => {
      shell.removeEventListener("touchstart", startTouch);
      shell.removeEventListener("touchmove", moveTouch);
      shell.removeEventListener("touchend", endTouch);
      shell.removeEventListener("touchcancel", cancelTouch);
    };
  }, [activeIndex, changeMode, clearGesture, move]);

  return (
    <section ref={shellRef} className="portfolio-shell" data-scroll-mode={scrollMode} data-active-index={activeIndex} aria-label="İnteraktif portfolyo" onWheel={onWheel}>
      <div className="portfolio-backdrop"><span /><span /><span /></div>
      {showPortfolioCharacter ? (
        <Suspense fallback={<div className="scene-character portfolio-character character-loading" aria-hidden="true" />}>
          <CharacterStage placement="portfolio" />
        </Suspense>
      ) : null}
      <span className="mobile-wheel-guide mobile-wheel-guide-top">Kaydır veya noktaya dokun</span>
      <div className="portfolio-layout">
        <SectionWheel sections={sections} activeIndex={activeIndex} onSelect={(index) => onSelect(index)} />
        <SectionContent section={sections[activeIndex]} direction={direction} onOpenContact={() => setContactOpen(true)} />
        <div className="character-clear-space" aria-hidden="true"><span>portfolio sahnesi · ayrı karakter</span></div>
      </div>
      <span className="mobile-wheel-guide mobile-wheel-guide-bottom">Yukarı · aşağı kaydır</span>
      <div className="portfolio-footnote"><IconArrowsVertical size={17} /><span>Kaydırarak döndür</span></div>
      <FloatingDock ref={dockRef} onOpenContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
