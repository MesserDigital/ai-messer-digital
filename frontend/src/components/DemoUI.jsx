import { useState, useRef, useEffect } from 'react';
import styles from './DemoUI.module.css';

const SAMPLE_DOCS = [
  { name: 'employee-handbook-2024.pdf', size: '2.4 MB', pages: 84 },
  { name: 'q3-financial-report.pdf', size: '1.1 MB', pages: 32 },
  { name: 'product-specs-v3.docx', size: '890 KB', pages: 18 },
];

const SAMPLE_MESSAGES = [
  {
    role: 'user',
    content: 'What is the remote work policy for full-time employees?',
  },
  {
    role: 'assistant',
    content:
      'According to the Employee Handbook (Section 4.2), full-time employees are eligible for up to 3 days of remote work per week after completing their 90-day probationary period. Remote work arrangements must be approved by the direct manager and documented in HR systems.',
    sources: ['employee-handbook-2024.pdf · p.41'],
  },
  {
    role: 'user',
    content: 'What were the Q3 revenue figures?',
  },
  {
    role: 'assistant',
    content:
      'Q3 total revenue was $4.2M, representing a 18% year-over-year increase. Product revenue accounted for $3.1M and services revenue contributed $1.1M. Full details including segment breakdowns are on pages 8-12 of the Q3 report.',
    sources: ['q3-financial-report.pdf · p.8', 'q3-financial-report.pdf · p.12'],
  },
];

export default function DemoUI() {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [model, setModel] = useState('llama3');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setSending(true);

    // Placeholder — will be wired to /api/chat once Ollama is connected
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'This demo UI is not yet connected to a live Ollama instance. Once wired up, responses will be generated locally from your uploaded documents.',
          sources: [],
          placeholder: true,
        },
      ]);
      setSending(false);
    }, 1200);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section id="demo" className={`${styles.section} dark-section`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">Live Demo</span>
          <h2 className={styles.title}>
            Ask Your Documents<br />
            <span className={styles.gradient}>Anything</span>
          </h2>
          <p className={styles.subtitle}>
            This is the interface your team would use. Upload documents on the left,
            ask questions on the right — all running on your local infrastructure.
          </p>
        </div>

        <div className={styles.demoWrapper}>
          {/* Sidebar — document panel */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>Documents</span>
              <span className={styles.modelBadge}>{model}</span>
            </div>

            <div className={styles.docList}>
              {SAMPLE_DOCS.map((doc) => (
                <div key={doc.name} className={styles.docItem}>
                  <div className={styles.docIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className={styles.docInfo}>
                    <span className={styles.docName}>{doc.name}</span>
                    <span className={styles.docMeta}>{doc.size} · {doc.pages} pages</span>
                  </div>
                  <div className={styles.docStatus} title="Indexed" />
                </div>
              ))}
            </div>

            <button className={styles.uploadBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Documents
            </button>

            <div className={styles.modelSelect}>
              <label className={styles.selectLabel}>Model</label>
              <select
                className={styles.select}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="llama3">llama3</option>
                <option value="mistral">mistral</option>
                <option value="phi3">phi3</option>
                <option value="gemma">gemma</option>
              </select>
            </div>

            <div className={styles.statusRow}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>Ollama — not connected</span>
            </div>
          </aside>

          {/* Main chat panel */}
          <div className={styles.chat}>
            <div className={styles.chatMessages}>
              <div className={styles.systemMsg}>
                Indexed 3 documents · {SAMPLE_DOCS.reduce((a, d) => a + d.pages, 0)} pages · Model: {model}
              </div>

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.assistantMsg}`}
                >
                  <div className={styles.msgBubble}>
                    <p>{msg.content}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className={styles.sources}>
                        {msg.sources.map((s) => (
                          <span key={s} className={styles.source}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {sending && (
                <div className={`${styles.message} ${styles.assistantMsg}`}>
                  <div className={styles.msgBubble}>
                    <div className={styles.typing}>
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className={styles.inputRow}>
              <textarea
                className={styles.input}
                placeholder="Ask a question about your documents..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
              />
              <button
                className={styles.sendBtn}
                onClick={send}
                disabled={!input.trim() || sending}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
