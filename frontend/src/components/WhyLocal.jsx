import styles from './WhyLocal.module.css';

const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Complete Data Privacy',
    description:
      'In a local deployment, your documents, queries, and responses never leave your network. No vendor can read, store, or train on your proprietary data.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Fast, Local Inference',
    description:
      'Eliminate cloud round-trip latency. Responses are generated on your own hardware in seconds, with no rate limits or quota restrictions.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Predictable Costs',
    description:
      'No per-query API fees and no seat licensing that scales with usage. After setup, your costs are hardware, power, and optional support — not every question your team asks.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Compliance-Friendly',
    description:
      'Support your HIPAA, SOC 2, and GDPR programs. With a local deployment, data handling stays under your control, which makes risk reviews and audits far simpler.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Always Available',
    description:
      'No dependency on external API uptime or rate limit throttling. Your AI runs whenever you need it, 24/7, on your schedule.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: 'Fully Customizable',
    description:
      'Choose your model, tune your prompts, and adapt the system to your exact use case. No vendor lock-in, ever.',
  },
];

export default function WhyLocal() {
  return (
    <section id="why-local" className={`${styles.section} dark-section`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">Why Local AI</span>
          <h2 className={styles.title}>
            The Cloud Is Not the<br />
            <span className={styles.gradient}>Only Option</span>
          </h2>
          <p className={styles.subtitle}>
            Most AI vendors want your data in their cloud. We build solutions
            that keep everything on your hardware — and bring in cloud models
            only when they're genuinely the better fit for the job.
          </p>
        </div>

        <div className={styles.grid}>
          {BENEFITS.map((b) => (
            <div key={b.title} className={styles.card}>
              <div className={styles.iconWrap}>{b.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.cardDesc}>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
