import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, type CSSProperties } from "react";
import { CharacterScene } from "./CharacterScene";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/providers/ThemeProvider";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getViewportHeight() {
  if (typeof window === "undefined") return 900;
  return Math.round(window.visualViewport?.height ?? window.innerHeight);
}

function useViewportHeight() {
  const [height, setHeight] = useState(getViewportHeight);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setHeight(getViewportHeight()));
    };
    const viewport = window.visualViewport;
    window.addEventListener("resize", update, { passive: true });
    viewport?.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      viewport?.removeEventListener("resize", update);
    };
  }, []);

  return height;
}

export function CharacterStage({ placement }: { placement: "hero" | "portfolio" }) {
  const mobile = useMediaQuery("(max-width: 620px)");
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const viewportHeight = useViewportHeight();
  const { theme } = useTheme();
  const stage = useMemo(() => {
    if (mobile) {
      const top = clamp(viewportHeight * 0.44, 310, 385);
      const bottomReserve = 94;
      const availableHeight = Math.max(220, viewportHeight - top - bottomReserve);
      const height = Math.min(330, availableHeight);
      const heightProgress = clamp((viewportHeight - 640) / 200, 0, 1);
      return {
        top,
        height,
        targetHeight: 2.78 + heightProgress * 0.22,
        fov: 32,
      };
    }

    const hero = placement === "hero";
    const top = clamp(viewportHeight * 0.115, 90, hero ? 112 : 106);
    const bottomReserve = hero ? 92 : 86;
    const availableHeight = Math.max(420, viewportHeight - top - bottomReserve);
    const targetHeight = hero
      ? clamp(2.84 + (availableHeight - 470) * 0.0017, 2.84, 3.38)
      : clamp(2.76 + (availableHeight - 470) * 0.0015, 2.76, 3.18);

    return { top, height: availableHeight, targetHeight, fov: 36 };
  }, [mobile, placement, viewportHeight]);
  const stageStyle = {
    "--character-stage-top": `${stage.top}px`,
    "--character-stage-height": `${stage.height}px`,
  } as CSSProperties;

  return (
    <div className={`scene-character ${placement}-character`} style={stageStyle} aria-hidden="true">
      <div className="character-halo" />
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: stage.fov }}
        dpr={mobile ? [1.5, 2] : [1.15, 1.8]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        <Suspense fallback={null}>
          <CharacterScene
            theme={theme}
            placement={placement}
            mobile={mobile}
            targetHeight={stage.targetHeight}
            trackingEnabled={!mobile && finePointer && !reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
