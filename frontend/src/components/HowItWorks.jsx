import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Assessment',
    description:
      'We start by understanding your business, your data, and your goals. We identify the highest-value AI opportunities and define clear success metrics.',
    detail: 'Workshops · Stakeholder interviews · Data audit',
  },
  {
    num: '02',
    title: 'Infrastructure Setup',
    description:
      'We set up a local AI environment on your hardware using Ollama, select the right models for your use case, and configure the pipeline for your document formats.',
    detail: 'Ollama · GPU configuration · Document parsing',
  },
  {
    num: '03',
    title: 'Build & Integrate',
    description:
      'We build the AI solution — document indexing, vector embeddings, retrieval pipeline, and a clean user interface — and integrate it into your existing workflows.',
    detail: 'RAG pipeline · Vector DB · Custom UI',
  },
  {
    num: '04',
    title: 'Deploy & Iterate',
    description:
      'We deploy to your environment, train your team, and remain available to tune, expand, and improve the system as your needs evolve.',
    detail: 'Documentation · Training · Ongoing support',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={`${styles.section} dark-section`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">Process</span>
          <h2 className={styles.title}>
            From Idea to Running AI<br />
            <span className={styles.gradient}>In Four Steps</span>
          </h2>
          <p className={styles.subtitle}>
            A structured, transparent process that gets you to a working AI system
            without months of research or a dedicated ML team.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepLeft}>
                  <div className={styles.numWrap}>
                    <span className={styles.num}>{step.num}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={styles.line} />}
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal — for the technical folks */}
          <div className={styles.terminalWrap}>
            <div className={styles.terminalLabel}>Under the hood</div>
            <div className={styles.terminal}>
              <div className={styles.terminalBar}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
                <span className={styles.terminalTitle}>local-ai — search</span>
              </div>
              <div className={styles.terminalBody}>
                <p><span className={styles.prompt}>$</span> query --model llama3 --docs ./company-docs/</p>
                <p className={styles.dim}>Indexing 847 documents... done</p>
                <p className={styles.dim}>Loading model: llama3 (4.7GB) ... ready</p>
                <br />
                <p><span className={styles.prompt}>&gt;</span> What is our Q3 refund policy?</p>
                <br />
                <p className={styles.answer}>
                  Based on <span className={styles.highlight}>policies/refunds-2024.pdf</span>, your Q3 refund
                  policy allows full refunds within 30 days of purchase, with store credit
                  offered up to 90 days...
                </p>
                <br />
                <p className={styles.sources}>Sources: policies/refunds-2024.pdf · hr/handbook-v3.pdf</p>
                <span className={styles.cursor}>|</span>
              </div>
            </div>
            <p className={styles.terminalNote}>
              Everything runs on your hardware. No cloud calls, no third-party APIs — just your model, your documents, your network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
