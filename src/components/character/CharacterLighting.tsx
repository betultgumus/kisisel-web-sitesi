import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PointLight } from "three";

const LIGHT_CHARACTER_LIGHTING = {
  ambient: 0.62,
  hemisphere: 0.94,
  key: 2.05,
  fill: 1.48,
  rim: 1.7,
  sky: "#fffaf5",
  ground: "#bfc5d0",
  keyColor: "#fff2e6",
  fillColor: "#c3d5f2",
  rimColor: "#ec4899",
};

const DARK_CHARACTER_LIGHTING = {
  ambient: 0.5,
  hemisphere: 0.8,
  key: 1.82,
  fill: 1.82,
  rim: 2.25,
  sky: "#9bb6e4",
  ground: "#07111f",
  keyColor: "#d9e6ff",
  fillColor: "#8b7de0",
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
      <directionalLight ref={key} position={[4.2, 5.8, 5.2]} intensity={initialLighting.key} color={initialColors.key} />
      <pointLight ref={fill} position={[-3.6, 1.8, 3.6]} intensity={initialLighting.fill} color={initialColors.fill} distance={9} />
      <pointLight ref={rim} position={[3.25, 2.5, -2.7]} intensity={initialLighting.rim} color={initialColors.rim} distance={8.5} />
    </>
  );
}
