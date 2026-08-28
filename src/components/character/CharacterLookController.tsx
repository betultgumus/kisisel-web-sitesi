import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import type { Group } from "three";
import { useMouse } from "@/providers/MouseProvider";

export function CharacterLookController({ target, baseRotation }: { target: RefObject<Group | null>; baseRotation: [number, number] }) {
  const mouse = useMouse();
  useFrame(() => {
    if (!target.current) return;
    const [baseX, baseY] = baseRotation;
    target.current.rotation.y += (baseY + mouse.normalizedX.get() * 0.12 - target.current.rotation.y) * 0.04;
    target.current.rotation.x += (baseX - mouse.normalizedY.get() * 0.035 - target.current.rotation.x) * 0.035;
  });
  return null;
}
