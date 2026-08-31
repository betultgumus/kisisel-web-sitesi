import { useGLTF } from "@react-three/drei";
import { useThree, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Box3, LinearFilter, LinearMipmapLinearFilter, Mesh, Vector3, type Material, type Texture } from "three";

const MODEL_URL = "/models/businesswoman-web-v1.glb";

type Props = ThreeElements["group"] & {
  targetHeight: number;
};

function optimizeTexture(material: Material, maxAnisotropy: number) {
  const texture = (material as Material & { map?: Texture | null }).map;
  if (!texture) return;
  texture.anisotropy = Math.min(8, maxAnisotropy);
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
}

export function CharacterModel({ targetHeight, ...props }: Props) {
  const { scene } = useGLTF(MODEL_URL);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const model = useMemo(() => {
    const instance = scene.clone(true);
    const instanceMaterials: Material[] = [];
    instance.updateMatrixWorld(true);

    const bounds = new Box3().setFromObject(instance);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());

    instance.position.set(-center.x, -center.y, -center.z);
    instance.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => optimizeTexture(material, maxAnisotropy));
      instanceMaterials.push(...materials);
    });

    return { instance, materials: instanceMaterials, sourceHeight: size.y };
  }, [maxAnisotropy, scene]);

  useEffect(() => () => {
    model.materials.forEach((material) => material.dispose());
  }, [model]);

  return (
    <group {...props} scale={targetHeight / Math.max(model.sourceHeight, Number.EPSILON)} dispose={null}>
      <primitive object={model.instance} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
