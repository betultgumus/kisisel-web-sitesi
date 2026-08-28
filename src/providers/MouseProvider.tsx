import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { motionValue, type MotionValue } from "motion/react";

type MouseContextValue = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  normalizedX: MotionValue<number>;
  normalizedY: MotionValue<number>;
  isInteractive: boolean;
};

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: PropsWithChildren) {
  const values = useMemo(() => ({
    x: motionValue(-100),
    y: motionValue(-100),
    normalizedX: motionValue(0),
    normalizedY: motionValue(0),
  }), []);
  const [isInteractive, setInteractive] = useState(false);

  useEffect(() => {
    const resetPointer = () => {
      values.normalizedX.set(0);
      values.normalizedY.set(0);
      setInteractive(false);
    };
    const onPointerMove = (event: PointerEvent) => {
      values.x.set(event.clientX);
      values.y.set(event.clientY);
      values.normalizedX.set((event.clientX / window.innerWidth) * 2 - 1);
      values.normalizedY.set(-((event.clientY / window.innerHeight) * 2 - 1));
      const target = event.target as HTMLElement | null;
      setInteractive(Boolean(target?.closest("a, button, input, textarea, select, [data-interactive]")));
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.documentElement.addEventListener("pointerleave", resetPointer);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
    };
  }, [values]);

  return <MouseContext.Provider value={{ ...values, isInteractive }}>{children}</MouseContext.Provider>;
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (!context) throw new Error("useMouse must be used within MouseProvider");
  return context;
}
