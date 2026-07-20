import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`${styles.hero} dark-section`}>
      <div className={styles.heroInner}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Bring AI Inside<br />
          <span className={styles.gradient}>Your Business</span>
        </h1>

        <p className={styles.subtitle}>
          Custom AI solutions that search your documents, answer your team's questions,
          and process your data — all running on your own infrastructure.
          <strong> Your data never leaves your network.</strong>
        </p>

        <div className={styles.actions}>
          <a href="#demo" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            See It In Action
          </a>
          <a href="#contact" className="btn-secondary">
            Talk to an Expert
          </a>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Private &amp; On-Premise</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>Zero</span>
            <span className={styles.statLabel}>Cloud API Fees</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>Local</span>
            <span className={styles.statLabel}>Low-Latency Inference</span>
          </div>
        </div>
      </div>

      {/* Chat window mockup */}
      <div className={styles.visual}>
        <div className={styles.chatWindow}>

          {/* Title bar */}
          <div className={styles.titleBar}>
            <div className={styles.titleDots}>
              <span className={styles.dot1} />
              <span className={styles.dot2} />
              <span className={styles.dot3} />
            </div>
            <div className={styles.titleCenter}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              AI Chat
            </div>
            <div className={styles.modelPill}>llama3</div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            <div className={styles.dateChip}>Today</div>

            <div className={styles.msgRow}>
              <div className={`${styles.bubble} ${styles.bubbleUser}`}>
                Can you look up our vacation policy for new hires?
              </div>
            </div>

            <div className={styles.msgRow}>
              <div className={styles.aiRow}>
                <div className={styles.aiAvatar}>AI</div>
                <div className={styles.aiBody}>
                  <div className={`${styles.bubble} ${styles.bubbleAI}`}>
                    New employees earn 10 days of PTO after their 90-day probationary period. After year one it bumps to 15 days.
                  </div>
                  <div className={styles.sourceTag}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    hr-handbook-2024.pdf · p.14
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.msgRow}>
              <div className={`${styles.bubble} ${styles.bubbleUser}`}>
                What about remote work days?
              </div>
            </div>

            <div className={styles.msgRow}>
              <div className={styles.aiRow}>
                <div className={styles.aiAvatar}>AI</div>
                <div className={styles.aiBody}>
                  <div className={`${styles.bubble} ${styles.bubbleAI}`}>
                    Up to 3 remote days per week after the probationary period, with manager approval.
                  </div>
                  <div className={styles.sourceTag}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    hr-handbook-2024.pdf · p.41
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className={styles.inputBar}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Ask your documents anything…"
              readOnly
            />
            <button className={styles.sendBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
