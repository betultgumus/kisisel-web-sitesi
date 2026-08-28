import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PointLight } from "three";

const LIGHT_CHARACTER_LIGHTING = {
  ambient: 0.7,
  hemisphere: 0.88,
  key: 2.2,
  fill: 1.75,
  rim: 1.95,
  sky: "#fff8ef",
  ground: "#c9c8d2",
  keyColor: "#fff0dc",
  fillColor: "#bfd1f2",
  rimColor: "#ec4899",
};

const DARK_CHARACTER_LIGHTING = {
  ambient: 0.52,
  hemisphere: 0.72,
  key: 1.65,
  fill: 2.15,
  rim: 2.55,
  sky: "#91aee3",
  ground: "#07111f",
  keyColor: "#c9ddff",
  fillColor: "#7768d8",
  rimColor: "#ec4899",
};

export function CharacterLighting({ theme = "light" }: { theme?: "light" | "dark" }) {
  const ambient = useRef<AmbientLight>(null);
  const hemisphere = useRef<HemisphereLight>(null);
  const key = useRef<DirectionalLight>(null);
  const fill = useRef<PointLight>(null);
  const rim = useRef<PointLight>(null);
  const dark = theme === "dark";
  const lighting = dark ? DARK_CHARACTER_LIGHTING : LIGHT_CHARACTER_LIGHTING;
  const colors = useMemo(() => ({
    sky: new Color(lighting.sky),
    ground: new Color(lighting.ground),
    key: new Color(lighting.keyColor),
    fill: new Color(lighting.fillColor),
    rim: new Color(lighting.rimColor),
  }), [lighting]);
  const initialLighting = useRef(lighting).current;
  const initialColors = useRef(colors).current;

  useFrame((_, delta) => {
    const blend = 1 - Math.exp(-delta * 5);
    if (ambient.current) ambient.current.intensity = MathUtils.damp(ambient.current.intensity, lighting.ambient, 5, delta);
    if (hemisphere.current) {
      hemisphere.current.intensity = MathUtils.damp(hemisphere.current.intensity, lighting.hemisphere, 5, delta);
      hemisphere.current.color.lerp(colors.sky, blend);
      hemisphere.current.groundColor.lerp(colors.ground, blend);
    }
    if (key.current) {
      key.current.intensity = MathUtils.damp(key.current.intensity, lighting.key, 5, delta);
      key.current.color.lerp(colors.key, blend);
    }
    if (fill.current) {
      fill.current.intensity = MathUtils.damp(fill.current.intensity, lighting.fill, 5, delta);
      fill.current.color.lerp(colors.fill, blend);
    }
    if (rim.current) {
      rim.current.intensity = MathUtils.damp(rim.current.intensity, lighting.rim, 5, delta);
      rim.current.color.lerp(colors.rim, blend);
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={initialLighting.ambient} />
      <hemisphereLight ref={hemisphere} args={[initialColors.sky, initialColors.ground, initialLighting.hemisphere]} />
      <directionalLight ref={key} position={[4, 5.5, 5]} intensity={initialLighting.key} color={initialColors.key} />
      <pointLight ref={fill} position={[-3.4, 1.6, 3.4]} intensity={initialLighting.fill} color={initialColors.fill} distance={9} />
      <pointLight ref={rim} position={[3.2, 2.2, -2.5]} intensity={initialLighting.rim} color={initialColors.rim} distance={8} />
    </>
  );
}
