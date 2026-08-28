import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CharacterScene } from "./CharacterScene";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/providers/ThemeProvider";

export function CharacterStage({ placement }: { placement: "hero" | "portfolio" }) {
  const mobile = useMediaQuery("(max-width: 620px)");
  const { theme } = useTheme();

  return (
    <div className={`scene-character ${placement}-character`} aria-hidden="true">
      <div className="character-halo" />
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: 36 }}
        dpr={mobile ? [1, 1.25] : [1, 1.6]}
        gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}
        shadows
      >
        <Suspense fallback={null}>
          <CharacterScene theme={theme} placement={placement} mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
