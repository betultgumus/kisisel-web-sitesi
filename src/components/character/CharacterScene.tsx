import { ContactShadows } from "@react-three/drei";
import { useMemo } from "react";
import { CharacterLighting } from "./CharacterLighting";
import { CharacterLookController } from "./CharacterLookController";
import { CharacterModel, type HeadTrackingUniforms } from "./CharacterModel";

type Props = {
  theme: "light" | "dark";
  placement: "hero" | "portfolio";
  mobile: boolean;
  trackingEnabled: boolean;
};

export function CharacterScene({ theme, placement, mobile, trackingEnabled }: Props) {
  const headTracking = useMemo<HeadTrackingUniforms>(() => ({
    yaw: { value: 0 },
    pitch: { value: 0 },
  }), []);
  const targetHeight = placement === "portfolio" ? 3.05 : mobile ? 2.72 : 3.32;
  const baseRotationY = placement === "portfolio" ? -0.08 : 0;
  const groundY = -targetHeight / 2;

  return (
    <>
      <CharacterLighting theme={theme} />
      <group rotation={[0, baseRotationY, 0]}>
        <CharacterModel targetHeight={targetHeight} headTracking={headTracking} />
      </group>
      <CharacterLookController headTracking={headTracking} placement={placement} enabled={trackingEnabled} />
      <ContactShadows
        position={[0, groundY + 0.015, 0]}
        scale={placement === "hero" ? 3.7 : 3.5}
        opacity={theme === "dark" ? 0.42 : 0.27}
        color={theme === "dark" ? "#020817" : "#58434f"}
        blur={2.8}
        far={4.5}
        frames={1}
      />
    </>
  );
}
