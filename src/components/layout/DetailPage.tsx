import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import type { DetailEntry } from "@/types/content";

export function DetailPage({ eyebrow, title, intro, entries, variant = "list" }: { eyebrow: string; title: string; intro: string; entries: DetailEntry[]; variant?: "list" | "grid" | "gallery" }) {
  return (
    <main className="detail-page">
      <div className="detail-glow" />
      <header className="detail-header">
        <Link to="/" className="back-link"><IconArrowLeft size={18} /> Ana deneyime dön</Link>
        <span className="detail-brand">P.</span>
      </header>
      <section className="detail-intro">
        <span className="kicker"><i /> {eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className={`detail-entries ${variant}`}>
        {entries.map((entry, index) => (
          <article className="detail-card" key={`${entry.title}-${index}`}>
            {variant === "gallery" && <div className="gallery-placeholder"><span>{String(index + 1).padStart(2, "0")}</span></div>}
            <div className="detail-card-copy">
              <span className="entry-index">{String(index + 1).padStart(2, "0")}</span>
              <div><small>{entry.meta}</small><h2>{entry.title}</h2><p>{entry.description}</p>
                {entry.tags && <div className="tag-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
              </div>
              {variant !== "gallery" && <IconArrowUpRight className="entry-icon" size={22} />}
            </div>
          </article>
        ))}
      </section>
      <footer className="detail-footer"><span>İçerikleriniz eklendiğinde yer tutucular kaldırılacak.</span><Link to="/">Portfolyoyu keşfet</Link></footer>
    </main>
  );
}
