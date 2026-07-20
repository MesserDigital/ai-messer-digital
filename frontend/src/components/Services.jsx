import styles from './Services.module.css';

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    title: 'Local Document Search',
    description:
      'Upload your internal documents — manuals, policies, reports — and query them in plain English. Answers are pulled directly from your files with source citations, all on your own hardware.',
    tags: ['RAG Pipeline', 'Ollama', 'Vector Search'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Custom AI Assistants',
    description:
      'Purpose-built AI assistants tailored to your workflows. Customer support bots, internal knowledge bases, HR assistants — trained on your data and deployed locally.',
    tags: ['Fine-tuning', 'Custom LLMs', 'Chat UI'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Private AI Deployment',
    description:
      'Full-stack AI infrastructure deployed on your servers or private cloud. No shared environments, no third-party API calls. Complete isolation for sensitive industries.',
    tags: ['On-Premise', 'Docker', 'Air-Gapped'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <path d="M12 12v6M9 15l3-3 3 3" />
      </svg>
    ),
    title: 'Cloud AI Integration',
    description:
      'When cloud is the right fit, we wire providers like Anthropic Claude and OpenAI directly into your applications — secure API key management, usage monitoring, and clean integration with your existing systems.',
    tags: ['Claude API', 'OpenAI', 'API Keys'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI Integration Consulting',
    description:
      'Not sure where to start? We assess your existing systems, identify high-value AI opportunities, and build a roadmap for integrating AI into your operations.',
    tags: ['Strategy', 'Assessment', 'Roadmap'],
  },
];

export default function Services() {
  return (
    <section id="services" className={`${styles.services} dark-section`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">Services</span>
          <h2 className={styles.title}>
            AI Built for Your<br />
            <span className={styles.gradient}>Specific Needs</span>
          </h2>
          <p className={styles.subtitle}>
            Every solution is custom-built, locally deployed, and designed around
            your workflows — not a generic SaaS product.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((svc) => (
            <div key={svc.title} className={styles.card}>
              <div className={styles.iconWrap}>{svc.icon}</div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.description}</p>
              <div className={styles.tags}>
                {svc.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
