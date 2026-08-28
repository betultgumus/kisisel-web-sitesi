import { ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { CharacterLighting } from "./CharacterLighting";
import { CharacterLookController } from "./CharacterLookController";
import { CharacterModel } from "./CharacterModel";

type Props = {
  theme: "light" | "dark";
  placement: "hero" | "portfolio";
  mobile: boolean;
};

export function CharacterScene({ theme, placement, mobile }: Props) {
  const character = useRef<Group>(null);
  const targetHeight = placement === "portfolio" ? 3.25 : mobile ? 3.05 : 3.5;
  const baseRotation: [number, number] = placement === "hero"
    ? [0.015, Math.PI - 0.14]
    : [0.01, Math.PI - 0.24];
  const groundY = -targetHeight / 2;

  return (
    <>
      <CharacterLighting theme={theme} />
      <group ref={character} rotation={[baseRotation[0], baseRotation[1], 0]}>
        <CharacterModel targetHeight={targetHeight} />
      </group>
      <CharacterLookController target={character} baseRotation={baseRotation} />
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
