import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
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
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
    if (!enabled) return;
    const requestFrame = () => invalidate();
    const stopX = mouse.normalizedX.on("change", requestFrame);
    const stopY = mouse.normalizedY.on("change", requestFrame);
    return () => {
      stopX();
      stopY();
    };
  }, [enabled, invalidate, mouse]);

  useFrame((_, delta) => {
    const targetYaw = enabled
      ? MathUtils.clamp(mouse.normalizedX.get() * limits.yaw, -limits.yaw, limits.yaw)
      : 0;
    const targetPitch = enabled
      ? MathUtils.clamp(-mouse.normalizedY.get() * limits.pitch, -limits.pitch, limits.pitch)
      : 0;

    headTracking.yaw.value = MathUtils.damp(headTracking.yaw.value, targetYaw, limits.damping, delta);
    headTracking.pitch.value = MathUtils.damp(headTracking.pitch.value, targetPitch, limits.damping, delta);
    if (Math.abs(headTracking.yaw.value - targetYaw) > 0.0001 || Math.abs(headTracking.pitch.value - targetPitch) > 0.0001) {
      invalidate();
    }
  });

  return null;
}
