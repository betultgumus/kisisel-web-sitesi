import { IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      data-native-cursor="true"
      aria-label={dark ? "Açık temaya geç" : "Koyu temaya geç"}
      aria-pressed={dark}
      onClick={toggleTheme}
    >
      <IconSun className="theme-icon theme-icon-sun" aria-hidden="true" />
      <IconMoon className="theme-icon theme-icon-moon" aria-hidden="true" />
      <motion.span
        className="theme-toggle-knob"
        animate={{ x: dark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />
    </button>
  );
}
