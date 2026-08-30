import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { ExpandableProjects } from "@/components/projects/ExpandableProjects";
import { TechnologyStrip } from "@/components/technology/TechnologyStrip";
import { SectionWheel } from "@/components/wheel/SectionWheel";
import { contactLinks } from "@/data/contact";
import { certificationEntries, educationEntries, experienceEntries, portfolioEntries } from "@/data/details";
import { profile, technicalSkills, technologies } from "@/data/portfolio";
import { sections } from "@/data/sections";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Section } from "@/types/content";

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

const technologyByName = new Map(technologies.map((technology) => [technology.name, technology]));

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

function SectionHeader({ section }: { section: Section }) {
  return (
    <header className="section-heading">
      <h2 id={`${section.id}-title`}>{section.title}</h2>
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
            <h3>{group.category}</h3>
            <div className="skill-chip-list">
              {group.items.map((skill) => {
                const technology = technologyByName.get(skill);
                const Icon = technology?.icon;
                return (
                  <span className={Icon ? "skill-chip-with-logo" : ""} style={technology ? { "--skill-color": technology.color } as CSSProperties : undefined} key={skill}>
                    {Icon ? <Icon aria-hidden="true" /> : null}<span>{skill}</span>
                  </span>
                );
              })}
            </div>
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
      {experienceEntries.map((entry) => (
        <article className="timeline-item" key={entry.title}>
          <span className="timeline-marker" aria-hidden="true"><i /></span>
          <div className="timeline-card">
            <header className="timeline-card-header">
              <div>
                <h3>{entry.role}</h3>
                <span className="timeline-company">{entry.title}</span>
              </div>
              <time>{entry.period}</time>
            </header>
            <div className="timeline-location"><IconMapPin size={14} aria-hidden="true" />{entry.location}</div>
            <p>{entry.description}</p>
            {entry.bullets ? <ul className="entry-bullets">{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            <TagList tags={entry.tags} />
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectShowcase() {
  return <ExpandableProjects projects={portfolioEntries} />;
}

function EducationContent() {
  return (
    <div className="education-content">
      <div className="education-list" aria-label="Eğitim kayıtları">
        {educationEntries.map((entry, index) => (
          <article className="education-item" key={entry.title}>
            <header className="education-item-header">
              <div>
                <h3>{entry.role}</h3>
                <strong className="education-organization">{entry.title}</strong>
              </div>
              <time>{entry.meta}</time>
            </header>
            <p>{entry.description}</p>
            {index === 0 && entry.tags?.length ? <div className="education-tag-label">İlgili Dersler</div> : null}
            <TagList tags={entry.tags} />
          </article>
        ))}
      </div>
      <div className="certificate-area">
        <div className="subsection-heading"><h3>Sertifikalar</h3></div>
        <div className="certificate-grid">
          {certificationEntries.map((entry) => (
            <article className="certificate-card" key={entry.title}>
              <small>{entry.meta}</small>
              <h4>{entry.title}</h4>
              <strong>{entry.source}</strong>
              {entry.href ? <a href={entry.href} target="_blank" rel="noreferrer" aria-label={`${entry.title} GitHub reposunu aç`}>{entry.hrefLabel}<IconExternalLink size={15} aria-hidden="true" /></a> : null}
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
        <h3>Data - AI - Web</h3>
        <p>İş teklifleri ve birlikte proje geliştirmek için iletişime geçebilirsiniz.</p>
        <a className="contact-primary" href={contactLinks.email}><IconMail size={18} aria-hidden="true" /> E-posta gönder</a>
      </div>
      <div className="contact-link-grid" aria-label="Betül Tuba Gümüş iletişim bağlantıları">
        <a href={contactLinks.email}><span className="contact-icon"><IconMail aria-hidden="true" /></span><span className="contact-link-copy"><small>E-posta</small>{contactLinks.emailAddress}</span></a>
        <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><span className="contact-icon"><IconBrandLinkedin aria-hidden="true" /></span><span className="contact-link-copy"><small>LinkedIn</small>Bağlantı kur</span></a>
        <a href={contactLinks.github} target="_blank" rel="noreferrer"><span className="contact-icon"><IconBrandGithub aria-hidden="true" /></span><span className="contact-link-copy"><small>GitHub</small>Projeleri incele</span></a>
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
