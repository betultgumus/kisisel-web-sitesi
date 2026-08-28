import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from "react";
import { motionValue, type MotionValue } from "motion/react";

type MouseContextValue = {
  normalizedX: MotionValue<number>;
  normalizedY: MotionValue<number>;
};

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: PropsWithChildren) {
  const values = useMemo(() => ({
    normalizedX: motionValue(0),
    normalizedY: motionValue(0),
  }), []);

  useEffect(() => {
    const resetPointer = () => {
      values.normalizedX.set(0);
      values.normalizedY.set(0);
    };
    const onPointerMove = (event: PointerEvent) => {
      values.normalizedX.set((event.clientX / window.innerWidth) * 2 - 1);
      values.normalizedY.set(-((event.clientY / window.innerHeight) * 2 - 1));
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

  return <MouseContext.Provider value={values}>{children}</MouseContext.Provider>;
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (!context) throw new Error("useMouse must be used within MouseProvider");
  return context;
}
