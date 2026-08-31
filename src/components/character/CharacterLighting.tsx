import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
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
  ambient: 0.66,
  hemisphere: 1.02,
  key: 2.08,
  fill: 1.98,
  rim: 2.06,
  sky: "#dbeafe",
  ground: "#091829",
  keyColor: "#eef7ff",
  fillColor: "#bfdbfe",
  rimColor: "#93c5fd",
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
  const invalidate = useThree((state) => state.invalidate);
  const previousTheme = useRef(theme);
  const transitionFrames = useRef(0);

  useEffect(() => {
    if (previousTheme.current === theme) return;
    previousTheme.current = theme;
    transitionFrames.current = 36;
    invalidate();
  }, [invalidate, theme]);

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
    if (transitionFrames.current > 0) {
      transitionFrames.current -= 1;
      if (transitionFrames.current > 0) invalidate();
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
