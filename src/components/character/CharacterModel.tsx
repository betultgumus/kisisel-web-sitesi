import { useGLTF } from "@react-three/drei";
import { useThree, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Box3, LinearFilter, LinearMipmapLinearFilter, Mesh, Vector3, type Material, type Texture } from "three";

const MODEL_URL = "/models/businesswoman.glb";
const NECK_START_RATIO = 0.622;
const HEAD_START_RATIO = 0.7;
const HEAD_PIVOT_RATIO = 0.65;

export type HeadTrackingUniforms = {
  yaw: { value: number };
  pitch: { value: number };
};

type Props = ThreeElements["group"] & {
  targetHeight: number;
  headTracking: HeadTrackingUniforms;
};

const HEAD_DEFORMATION_SHADER = `
uniform float uHeadYaw;
uniform float uHeadPitch;
uniform vec3 uHeadPivot;
uniform float uNeckStart;
uniform float uHeadStart;

mat3 businesswomanRotationX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

mat3 businesswomanRotationY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}
`;

function withHeadDeformation(
  source: Material,
  headTracking: HeadTrackingUniforms,
  pivot: Vector3,
  neckStart: number,
  headStart: number,
) {
  const material = source.clone();
  const originalCompile = material.onBeforeCompile.bind(material);

  material.onBeforeCompile = (shader, renderer) => {
    originalCompile(shader, renderer);
    shader.uniforms.uHeadYaw = headTracking.yaw;
    shader.uniforms.uHeadPitch = headTracking.pitch;
    shader.uniforms.uHeadPivot = { value: pivot };
    shader.uniforms.uNeckStart = { value: neckStart };
    shader.uniforms.uHeadStart = { value: headStart };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${HEAD_DEFORMATION_SHADER}`)
      .replace(
        "#include <beginnormal_vertex>",
        `#include <beginnormal_vertex>
        float businesswomanHeadNormalWeight = smoothstep(uNeckStart, uHeadStart, position.y);
        mat3 businesswomanHeadNormalRotation = businesswomanRotationY(uHeadYaw * businesswomanHeadNormalWeight)
          * businesswomanRotationX(uHeadPitch * businesswomanHeadNormalWeight);
        objectNormal = businesswomanHeadNormalRotation * objectNormal;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        float businesswomanHeadWeight = smoothstep(uNeckStart, uHeadStart, position.y);
        mat3 businesswomanHeadRotation = businesswomanRotationY(uHeadYaw * businesswomanHeadWeight)
          * businesswomanRotationX(uHeadPitch * businesswomanHeadWeight);
        transformed = uHeadPivot + businesswomanHeadRotation * (transformed - uHeadPivot);`,
      );
  };
  material.customProgramCacheKey = () => "businesswoman-head-deformation-v1";
  return material;
}

function optimizeTexture(material: Material, maxAnisotropy: number) {
  const texture = (material as Material & { map?: Texture | null }).map;
  if (!texture) return;
  texture.anisotropy = Math.min(8, maxAnisotropy);
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
}

export function CharacterModel({ targetHeight, headTracking, ...props }: Props) {
  const { scene } = useGLTF(MODEL_URL);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const model = useMemo(() => {
    const instance = scene.clone(true);
    const instanceMaterials: Material[] = [];
    instance.updateMatrixWorld(true);

    const bounds = new Box3().setFromObject(instance);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const neckStart = bounds.min.y + size.y * NECK_START_RATIO;
    const headStart = bounds.min.y + size.y * HEAD_START_RATIO;
    const headPivot = new Vector3(
      center.x,
      bounds.min.y + size.y * HEAD_PIVOT_RATIO,
      center.z + size.z * 0.015,
    );

    instance.position.set(-center.x, -center.y, -center.z);
    instance.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const materials = Array.isArray(object.material)
        ? object.material.map((material) => withHeadDeformation(material, headTracking, headPivot, neckStart, headStart))
        : withHeadDeformation(object.material, headTracking, headPivot, neckStart, headStart);
      object.material = materials;
      const materialList = Array.isArray(materials) ? materials : [materials];
      materialList.forEach((material) => optimizeTexture(material, maxAnisotropy));
      instanceMaterials.push(...materialList);
    });

    return { instance, materials: instanceMaterials, sourceHeight: size.y };
  }, [headTracking, maxAnisotropy, scene]);

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
