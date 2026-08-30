import { IconArrowDown } from "@tabler/icons-react";
import { motion } from "motion/react";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>
        <span className="kicker"><i /> {profile.fullName}</span>
        <h1 id="hero-title" aria-label={profile.fullName}>Betül<br /><em>Gümüş.</em></h1>
        <strong className="hero-focus">{profile.focus}</strong>
        <p>{profile.heroSummary}</p>
      </motion.div>
      <a className="scroll-cue" href="#about" aria-label="Hakkımda bölümüne ilerle">
        <span>Keşfetmek için kaydır</span>
        <IconArrowDown size={18} stroke={1.6} />
      </a>
      <span className="hero-index" aria-hidden="true">01 — 07</span>
    </section>
  );
}
