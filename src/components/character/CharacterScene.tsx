import { ContactShadows } from "@react-three/drei";
import { CharacterLighting } from "./CharacterLighting";
import { CharacterModel } from "./CharacterModel";

type Props = {
  theme: "light" | "dark";
  mobile: boolean;
  targetHeight: number;
  trackingEnabled: boolean;
};

export function CharacterScene({ theme, mobile, targetHeight }: Props) {
  const groundY = -targetHeight / 2;
  const shadowScale = mobile ? 2.45 : 3.55;
  const shadowOpacity =
    theme === "dark" ? (mobile ? 0.48 : 0.4) : mobile ? 0.32 : 0.25;

  return (
    <>
      <CharacterLighting theme={theme} />
      <group>
        <CharacterModel targetHeight={targetHeight} />
      </group>

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