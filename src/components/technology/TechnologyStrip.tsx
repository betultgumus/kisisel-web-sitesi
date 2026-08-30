import { technologies } from "@/data/technologies";
import type { CSSProperties } from "react";

function TechnologyGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="marquee-group" role={duplicate ? undefined : "list"} aria-hidden={duplicate || undefined}>
      {technologies.map(({ name, icon: Icon, color }) => (
        <div
          className="tech-item"
          key={name}
          style={{ "--brand-color": color } as CSSProperties}
          role={duplicate ? undefined : "listitem"}
          aria-label={duplicate ? undefined : name}
        >
          <span className="tech-logo" aria-hidden="true"><Icon /></span>
        </div>
      ))}
    </div>
  );
}

export function TechnologyStrip() {
  return (
    <div className="technology-transition" aria-label="Kullandığım araçlar">
      <div className="marquee-mask">
        <div className="marquee-track">
          <TechnologyGroup />
          <TechnologyGroup duplicate />
        </div>
      </div>
    </div>
  );
}
