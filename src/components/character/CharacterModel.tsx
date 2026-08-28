import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";
import { Box3, Mesh, Vector3 } from "three";

const MODEL_URL = "/models/eva.glb";

type Props = ThreeElements["group"] & { targetHeight: number };

export function CharacterModel({ targetHeight, ...props }: Props) {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => {
    const instance = scene.clone(true);
    instance.updateMatrixWorld(true);

    const bounds = new Box3().setFromObject(instance);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const normalizedScale = targetHeight / Math.max(size.y, Number.EPSILON);

    instance.scale.setScalar(normalizedScale);
    instance.position.set(
      -center.x * normalizedScale,
      -center.y * normalizedScale,
      -center.z * normalizedScale,
    );
    instance.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
    });

    return instance;
  }, [scene, targetHeight]);

  return (
    <group {...props} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
