import { useState, type FormEvent } from "react";
import {
  IconArrowRight,
  IconArrowsVertical,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconExternalLink,
  IconFileText,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { SectionWheel } from "@/components/wheel/SectionWheel";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { Button } from "@/components/ui/Button";
import { sections } from "@/data/sections";
import { contactLinks } from "@/data/contact";
import { certificationEntries, educationEntries, experienceEntries, galleryEntries, portfolioEntries } from "@/data/details";
import { profile, technicalSkills } from "@/data/portfolio";
import { contactSubmitAdapter } from "@/lib/contactAdapter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { DetailEntry, Section, SectionId } from "@/types/content";

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

const entriesBySection: Partial<Record<SectionId, DetailEntry[]>> = {
  education: educationEntries,
  experience: experienceEntries,
  portfolio: portfolioEntries,
  gallery: galleryEntries,
};

function EntryGrid({ sectionId, entries }: { sectionId: SectionId; entries: DetailEntry[] }) {
  return (
    <div className={`section-entry-grid ${sectionId}`}>
      {entries.map((entry, index) => (
        <article className="section-entry" key={`${entry.title}-${index}`}>
          {sectionId === "gallery" ? (
            <div className="section-gallery-visual" aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
          ) : null}
          <div className="section-entry-copy">
            <span className="entry-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{entry.meta}</small>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              {entry.metric ? <strong className="entry-metric">{entry.metric}</strong> : null}
              {entry.bullets ? <ul className="entry-bullets">{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              {entry.tags ? <div className="tag-list">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
              {entry.href ? <a className="entry-link" href={entry.href} target="_blank" rel="noreferrer">{entry.hrefLabel ?? "Bağlantıyı aç"}<IconExternalLink size={15} aria-hidden="true" /></a> : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    const data = new FormData(event.currentTarget);
    await contactSubmitAdapter({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setSubmitted(true);
  };

  return (
    <div className="contact-section-grid">
      <div className="contact-links" aria-label="Betül Tuba Gümüş iletişim bağlantıları">
        <a href={contactLinks.email}><IconMail aria-hidden="true" /><span><small>E-posta</small>{contactLinks.emailAddress}</span></a>
        <a href={contactLinks.phone}><IconPhone aria-hidden="true" /><span><small>Telefon</small>{contactLinks.phoneDisplay}</span></a>
        <a href={contactLinks.github} target="_blank" rel="noreferrer"><IconBrandGithub aria-hidden="true" /><span><small>GitHub</small>Projeleri incele</span></a>
        <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><IconBrandLinkedin aria-hidden="true" /><span><small>LinkedIn</small>Bağlantı kur</span></a>
        <div className="contact-static"><IconMapPin aria-hidden="true" /><span><small>Konum</small>{contactLinks.location}</span></div>
      </div>
      <div className="inline-contact-form">
        {submitted ? (
          <div className="inline-form-success">
            <IconCheck aria-hidden="true" />
            <h3>Form arayüzü hazır.</h3>
            <p>Gönderim sağlayıcısı bağlandığında mesajınız doğrudan iletilecek. Şimdilik e-posta bağlantısını kullanabilirsiniz.</p>
            <Button onClick={() => setSubmitted(false)}>Forma dön</Button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3>Bir fikriniz mi var?</h3>
            <p>Yeni bir proje, iş birliği veya yalnızca merhaba demek için mesaj bırakın.</p>
            <label>Adınız<input name="name" required autoComplete="name" placeholder="Ad Soyad" /></label>
            <label>E-posta<input type="email" name="email" required autoComplete="email" placeholder="siz@example.com" /></label>
            <label>Mesajınız<textarea name="message" required minLength={10} rows={4} placeholder="Kısaca anlatın…" /></label>
            <Button type="submit">Devam et <IconArrowRight size={18} /></Button>
          </form>
        )}
      </div>
    </div>
  );
}

function ContentSection({ section }: { section: Section }) {
  const entries = entriesBySection[section.id];
  return (
    <section id={section.id} className={`content-section content-section-${section.id}`} aria-labelledby={`${section.id}-title`}>
      <article className="section-glass glass3d">
        <div className="section-topline"><span>{section.eyebrow}</span><span>{section.metric}</span></div>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
        <p className="section-lead">{section.description}</p>
        {section.id === "about" ? (
          <div className="about-detail">
            <div className="about-summary">
              {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <a className="cv-link" href={profile.cvPath} target="_blank" rel="noreferrer" aria-label="Betül Tuba Gümüş güncel CV'sini görüntüle">
                <IconFileText size={17} aria-hidden="true" /> CV'yi Gör <IconExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="skills-grid" aria-label="Teknik yetkinlikler">
              {technicalSkills.map((group) => (
                <div className="skill-group" key={group.category}>
                  <span>{group.category}</span>
                  <div>{group.items.map((skill) => <strong key={skill}>{skill}</strong>)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {entries ? <EntryGrid sectionId={section.id} entries={entries} /> : null}
        {section.id === "education" ? (
          <div className="education-subsection">
            <div className="subsection-heading"><span>Güncel kayıtlar</span><h3>Sertifika & Eğitimler</h3></div>
            <EntryGrid sectionId="education" entries={certificationEntries} />
          </div>
        ) : null}
        {section.id === "contact" ? <ContactContent /> : null}
      </article>
    </section>
  );
}

export function InteractivePortfolio({ activeIndex, onSelect }: Props) {
  const showDesktopWheel = useMediaQuery("(min-width: 768px)");
  const scrollToContact = () => {
    const contactIndex = sections.findIndex((section) => section.id === "contact");
    onSelect(contactIndex);
  };

  return (
    <section className="portfolio-shell" aria-label="Portfolyo içeriği">
      <div className="portfolio-layout">
        {showDesktopWheel ? (
          <aside className="sticky-wheel-shell" aria-label="Sticky bölüm navigasyonu">
            <SectionWheel sections={sections} activeIndex={activeIndex} onSelect={onSelect} />
            <div className="portfolio-footnote"><IconArrowsVertical size={17} /><span>Kaydırarak döndür</span></div>
          </aside>
        ) : null}
        <div className="content-sections">
          {sections.map((section) => <ContentSection key={section.id} section={section} />)}
        </div>
      </div>
      <FloatingDock onOpenContact={scrollToContact} />
    </section>
  );
}
