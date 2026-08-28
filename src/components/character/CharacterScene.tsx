import { ContactShadows } from "@react-three/drei";
import { useMemo } from "react";
import { CharacterLighting } from "./CharacterLighting";
import { CharacterLookController } from "./CharacterLookController";
import { CharacterModel, type HeadTrackingUniforms } from "./CharacterModel";

type Props = {
  theme: "light" | "dark";
  placement: "hero" | "portfolio";
  mobile: boolean;
  targetHeight: number;
  trackingEnabled: boolean;
};

export function CharacterScene({ theme, placement, mobile, targetHeight, trackingEnabled }: Props) {
  const headTracking = useMemo<HeadTrackingUniforms>(() => ({
    yaw: { value: 0 },
    pitch: { value: 0 },
  }), []);
  const baseRotationY = placement === "portfolio" ? -0.08 : 0;
  const groundY = -targetHeight / 2;
  const shadowScale = mobile ? 2.45 : placement === "hero" ? 3.55 : 3.25;
  const shadowOpacity = theme === "dark" ? (mobile ? 0.48 : 0.4) : mobile ? 0.32 : 0.25;

  return (
    <>
      <CharacterLighting theme={theme} />
      <group rotation={[0, baseRotationY, 0]}>
        <CharacterModel targetHeight={targetHeight} headTracking={headTracking} />
      </group>
      <CharacterLookController headTracking={headTracking} placement={placement} enabled={trackingEnabled} />
      <ContactShadows
        position={[0, groundY + 0.015, 0]}
        scale={shadowScale}
        opacity={shadowOpacity}
        color={theme === "dark" ? "#020817" : "#58434f"}
        blur={mobile ? 2.15 : 2.65}
        far={4.5}
        frames={1}
      />
    </>
  );
}
