import { forwardRef, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconMessageCircle } from "@tabler/icons-react";
import { contactLinks } from "@/data/contact";

type DockItemProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  children: React.ReactNode;
};

function DockItem({ label, href, onClick, mouseX, children }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? value - bounds.x - bounds.width / 2 : 180;
  });
  const width = useSpring(useTransform(distance, [-150, 0, 150], [44, 72, 44]), { mass: 0.1, stiffness: 150, damping: 12 });
  const iconSize = useSpring(useTransform(distance, [-150, 0, 150], [21, 36, 21]), { mass: 0.1, stiffness: 150, damping: 12 });
  const common = { ref: ref as never, className: "dock-item", style: { width, height: width }, "aria-label": label };
  const content = <><motion.span style={{ width: iconSize, height: iconSize }}>{children}</motion.span><span className="dock-tooltip">{label}</span></>;
  return href ? <motion.a {...common} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{content}</motion.a> : <motion.button {...common} onClick={onClick}>{content}</motion.button>;
}

export const FloatingDock = forwardRef<HTMLDivElement, { onOpenContact: () => void }>(function FloatingDock({ onOpenContact }, ref) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  return (
    <motion.div ref={ref} className="floating-dock" onMouseMove={(event) => mouseX.set(event.pageX)} onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}>
      <DockItem label="Mail" href={contactLinks.email} mouseX={mouseX}><IconMail /></DockItem>
      <DockItem label="GitHub" href={contactLinks.github} mouseX={mouseX}><IconBrandGithub /></DockItem>
      <DockItem label="LinkedIn" href={contactLinks.linkedin} mouseX={mouseX}><IconBrandLinkedin /></DockItem>
      <DockItem label="İletişim" onClick={onOpenContact} mouseX={mouseX}><IconMessageCircle /></DockItem>
    </motion.div>
  );
});
