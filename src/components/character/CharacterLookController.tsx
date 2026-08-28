import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useMouse } from "@/providers/MouseProvider";
import type { HeadTrackingUniforms } from "./CharacterModel";

const HERO_LIMITS = {
  yaw: MathUtils.degToRad(12),
  pitch: MathUtils.degToRad(7),
  damping: 7.5,
};

type Props = {
  headTracking: HeadTrackingUniforms;
  enabled: boolean;
};

export function CharacterLookController({ headTracking, enabled }: Props) {
  const mouse = useMouse();
  const limits = HERO_LIMITS;

  useFrame((_, delta) => {
    const targetYaw = enabled
      ? MathUtils.clamp(mouse.normalizedX.get() * limits.yaw, -limits.yaw, limits.yaw)
      : 0;
    const targetPitch = enabled
      ? MathUtils.clamp(-mouse.normalizedY.get() * limits.pitch, -limits.pitch, limits.pitch)
      : 0;

    headTracking.yaw.value = MathUtils.damp(headTracking.yaw.value, targetYaw, limits.damping, delta);
    headTracking.pitch.value = MathUtils.damp(headTracking.pitch.value, targetPitch, limits.damping, delta);
  });

  return null;
}
