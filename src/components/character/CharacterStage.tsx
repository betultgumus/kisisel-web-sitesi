import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { CharacterScene } from "./CharacterScene";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/providers/ThemeProvider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getViewportHeight() {
  if (typeof window === "undefined") return 900;
  return Math.round(window.innerHeight);
}

function useViewportHeight() {
  const [height, setHeight] = useState(getViewportHeight);
  const widthRef = useRef(typeof window === "undefined" ? 1440 : window.innerWidth);

  useEffect(() => {
    let frame = 0;
    const update = (force = false) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextWidth = window.innerWidth;
        const mobileViewport = window.matchMedia("(max-width: 620px)").matches;
        const browserChromeResize = mobileViewport && Math.abs(nextWidth - widthRef.current) < 24;
        if (!force && browserChromeResize) return;
        widthRef.current = nextWidth;
        setHeight(getViewportHeight());
      });
    };
    const handleResize = () => update(false);
    const handleOrientation = () => update(true);
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleOrientation, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  return height;
}

export function CharacterStage() {
  const mobile = useMediaQuery("(max-width: 620px)");
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const viewportHeight = useViewportHeight();
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();
  const stage = useMemo(() => {
    if (mobile) {
      const top = clamp(viewportHeight * 0.44, 310, 385);
      const bottomReserve = 168;
      const availableHeight = Math.max(170, viewportHeight - top - bottomReserve);
      const height = Math.min(330, availableHeight);
      const heightProgress = clamp((viewportHeight - 640) / 200, 0, 1);
      return {
        top,
        height,
        targetHeight: 2.78 + heightProgress * 0.22,
        fov: 32,
      };
    }

    const top = clamp(viewportHeight * 0.115, 90, 112);
    const bottomReserve = 92;
    const availableHeight = Math.max(420, viewportHeight - top - bottomReserve);
    const targetHeight = clamp(2.84 + (availableHeight - 470) * 0.0017, 2.84, 3.38);

    return { top, height: availableHeight, targetHeight, fov: 36 };
  }, [mobile, viewportHeight]);
  const stageStyle = {
    "--character-stage-top": `${stage.top}px`,
    "--character-stage-height": `${stage.height}px`,
  } as CSSProperties;

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "100px 0px",
      threshold: 0,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="scene-character hero-character" style={stageStyle} data-rendering={visible ? "active" : "paused"} aria-hidden="true">
      <div className="character-halo" />
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: stage.fov }}
        dpr={mobile ? [1.5, 2] : [1.15, 1.8]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
        shadows
      >
        <Suspense fallback={null}>
          <CharacterScene
            theme={theme}
            mobile={mobile}
            targetHeight={stage.targetHeight}
            trackingEnabled={visible && !mobile && finePointer && !reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
