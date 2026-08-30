import {
  IconArrowsVertical,
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconFileText,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { TechnologyStrip } from "@/components/technology/TechnologyStrip";
import { SectionWheel } from "@/components/wheel/SectionWheel";
import { contactLinks } from "@/data/contact";
import { certificationEntries, educationEntries, experienceEntries, portfolioEntries } from "@/data/details";
import { profile, technicalSkills } from "@/data/portfolio";
import { sections } from "@/data/sections";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { DetailEntry, Section } from "@/types/content";

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

function SectionHeader({ section }: { section: Section }) {
  return (
    <header className="section-heading">
      <div className="section-topline"><span>{section.eyebrow}</span><span>{section.metric}</span></div>
      <h2 id={`${section.id}-title`}>{section.title}</h2>
      <p className="section-lead">{section.description}</p>
    </header>
  );
}

function AboutContent() {
  const facts = [
    { label: "Konum", value: profile.location },
    { label: "Alan", value: "Veri Bilimi / Makine Öğrenmesi / Yapay Zekâ" },
    { label: "Odak", value: "Data Analytics / AI" },
  ];

  return (
    <div className="about-editorial">
      <div className="about-narrative">
        {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <a className="cv-link" href={profile.cvPath} target="_blank" rel="noreferrer" aria-label="Betül Tuba Gümüş güncel CV'sini görüntüle">
          <IconFileText size={17} aria-hidden="true" /> CV'yi Gör <IconExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="profile-facts" aria-label="Profil özeti">
        {facts.map((fact) => (
          <div className="profile-fact" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="skills-content">
      <div className="skills-section-grid" aria-label="Teknik yetkinlik kategorileri">
        {technicalSkills.map((group, index) => (
          <article className={`skill-category skill-category-${index + 1}`} key={group.category}>
            <span className="skill-category-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.category}</h3>
            <div className="skill-chip-list">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </article>
        ))}
      </div>
      <TechnologyStrip />
    </div>
  );
}

function ExperienceTimeline() {
  return (
    <div className="experience-timeline">
      {experienceEntries.map((entry, index) => (
        <article className="timeline-item" key={entry.title}>
          <span className="timeline-marker" aria-hidden="true"><i /></span>
          <div className="timeline-card">
            <header className="timeline-card-header">
              <div>
                <span className="timeline-role">{entry.role}</span>
                <h3>{entry.title}</h3>
              </div>
              <time>{entry.period}</time>
            </header>
            <div className="timeline-location"><IconMapPin size={14} aria-hidden="true" />{entry.location}</div>
            <p>{entry.description}</p>
            {entry.bullets ? <ul className="entry-bullets">{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            <TagList tags={entry.tags} />
            <span className="timeline-count" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectHighlights({ highlights }: Pick<DetailEntry, "highlights">) {
  if (!highlights?.length) return null;
  return (
    <ul className="project-highlights">
      {highlights.map((highlight) => (
        <li key={highlight.value}><strong>{highlight.value}</strong><span>{highlight.text}</span></li>
      ))}
    </ul>
  );
}

function ProjectShowcase() {
  return (
    <div className="project-showcase">
      {portfolioEntries.map((entry, index) => (
        <article className={`project-card ${index === 0 ? "featured" : ""}`} key={entry.title}>
          <div className="project-card-topline"><span>{String(index + 1).padStart(2, "0")}</span><small>{entry.meta}</small></div>
          <h3>{entry.title}</h3>
          <p>{entry.description}</p>
          {entry.bullets ? <ul className="project-details">{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          <ProjectHighlights highlights={entry.highlights} />
          <div className="project-card-footer">
            <TagList tags={entry.tags} />
            {entry.href ? <a className="entry-link" href={entry.href} target="_blank" rel="noreferrer">GitHub <IconExternalLink size={15} aria-hidden="true" /></a> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function EducationContent() {
  return (
    <div className="education-content">
      <div className="education-list" aria-label="Eğitim kayıtları">
        {educationEntries.map((entry, index) => (
          <article className="education-item" key={entry.title}>
            <span className="education-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{entry.meta}</small>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <TagList tags={entry.tags} />
            </div>
          </article>
        ))}
      </div>
      <div className="certificate-area">
        <div className="subsection-heading"><span>Güncel kayıtlar</span><h3>Sertifika & Eğitimler</h3></div>
        <div className="certificate-grid">
          {certificationEntries.map((entry, index) => (
            <article className="certificate-card" key={entry.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{entry.meta}</small>
              <h4>{entry.title}</h4>
              {entry.href ? <a href={entry.href} target="_blank" rel="noreferrer" aria-label={`${entry.title} GitHub reposunu aç`}><IconExternalLink size={15} aria-hidden="true" /></a> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="contact-editorial">
      <div className="contact-callout">
        <span>{profile.fullName}</span>
        <h3>Veri odaklı bir fikir üzerinde birlikte çalışalım.</h3>
        <p>Veri analizi, makine öğrenmesi ve yapay zekâ projeleri için doğrudan iletişime geçebilirsiniz.</p>
        <a className="contact-primary" href={contactLinks.email}><IconMail size={18} aria-hidden="true" /> E-posta gönder</a>
      </div>
      <div className="contact-link-grid" aria-label="Betül Tuba Gümüş iletişim bağlantıları">
        <a href={contactLinks.email}><IconMail aria-hidden="true" /><span><small>E-posta</small>{contactLinks.emailAddress}</span></a>
        <a href={contactLinks.phone}><IconPhone aria-hidden="true" /><span><small>Telefon</small>{contactLinks.phoneDisplay}</span></a>
        <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><IconBrandLinkedin aria-hidden="true" /><span><small>LinkedIn</small>Bağlantı kur</span></a>
        <a href={contactLinks.github} target="_blank" rel="noreferrer"><IconBrandGithub aria-hidden="true" /><span><small>GitHub</small>Projeleri incele</span></a>
        <div className="contact-static"><IconMapPin aria-hidden="true" /><span><small>Konum</small>{contactLinks.location}</span></div>
        <a href={profile.cvPath} target="_blank" rel="noreferrer"><IconFileText aria-hidden="true" /><span><small>Özgeçmiş</small>CV'yi görüntüle</span></a>
      </div>
    </div>
  );
}

function SectionContent({ section }: { section: Section }) {
  switch (section.id) {
    case "about": return <AboutContent />;
    case "skills": return <SkillsContent />;
    case "experience": return <ExperienceTimeline />;
    case "portfolio": return <ProjectShowcase />;
    case "education": return <EducationContent />;
    case "contact": return <ContactContent />;
  }
}

function ContentSection({ section }: { section: Section }) {
  return (
    <section id={section.id} className={`content-section content-section-${section.id}`} aria-labelledby={`${section.id}-title`}>
      <article className={`section-glass glass3d section-glass-${section.id}`}>
        <SectionHeader section={section} />
        <SectionContent section={section} />
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
