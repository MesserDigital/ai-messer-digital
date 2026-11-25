import styles from './FAQ.module.css';

// Plain-text answers: rendered on the page and emitted as FAQPage structured
// data so search engines can show them directly in results.
export const FAQS = [
  {
    q: 'What is private, on-premise AI?',
    a: 'It means the AI models run on hardware you control — a server in your office or your own private cloud — instead of sending your documents and questions to a third-party AI service. You get modern AI capabilities while your data stays on your network.',
  },
  {
    q: 'Does our data ever leave our network?',
    a: 'Not in a local deployment: documents, questions, and answers stay on your hardware. If a project is better served by a cloud model, we explain exactly what is sent to the provider and under what terms before anything is built, so it is always your decision.',
  },
  {
    q: 'What hardware do we need?',
    a: 'It depends on the models and how many people use the system at once. For document search for a small team, a single server with a modern GPU — ideally 24 GB of video memory or more — is usually enough. We size it with you during the assessment, and you can see a pilot working before you buy anything.',
  },
  {
    q: 'Can it answer questions about our own documents?',
    a: 'Yes. Your PDFs, Word documents, and other files are indexed so the assistant can search them, and every answer cites the document and page it came from, so your team can verify it.',
  },
  {
    q: 'Is local AI as good as ChatGPT or Claude?',
    a: 'For answering questions from your own documents, current open models do very well. The largest cloud models still lead on the hardest open-ended reasoning, so where that matters we can combine the two — local by default, cloud only for the tasks that need it.',
  },
  {
    q: 'Will this make us HIPAA or SOC 2 compliant?',
    a: 'No software can make an organization compliant on its own. A local deployment supports your compliance work by keeping sensitive data under your control, which makes risk reviews and audits much simpler.',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on scope, so we quote each project after a short conversation. There are no per-query API fees with a local deployment; ongoing costs are hardware, power, and optional support. A fixed-scope AI readiness assessment is a low-risk way to start.',
  },
  {
    q: 'How long does a project take?',
    a: 'A focused pilot on a defined set of documents can usually be running within a few weeks. Larger integrations with your existing systems are scoped and scheduled during the assessment.',
  },
];

const FAQ_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}).replace(/</g, '\\u003c');

export default function FAQ() {
  return (
    <section id="faq" className={`${styles.section} dark-section`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">FAQ</span>
          <h2 className={styles.title}>
            Questions About<br />
            <span className={styles.gradient}>Private AI</span>
          </h2>
        </div>

        <div className={styles.list}>
          {FAQS.map(({ q, a }) => (
            <details key={q} className={styles.item}>
              <summary className={styles.question}>{q}</summary>
              <p className={styles.answer}>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }} />
    </section>
  );
}
