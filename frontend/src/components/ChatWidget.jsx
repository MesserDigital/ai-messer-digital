import { useState, useRef, useEffect } from 'react';
import mark from '../assets/brand/messer-mark-white.svg';
import styles from './ChatWidget.module.css';

const GREETING = {
  role: 'assistant',
  content:
    "Hi! I'm the Messer Digital AI assistant. Ask me anything about our local AI solutions, cloud integrations, or how we could help your business.",
};

const SUGGESTIONS = [
  'What services do you offer?',
  'Why local AI instead of cloud?',
  'Can you integrate cloud AI APIs?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const history = [...messages, { role: 'user', content: trimmed }];
    setMessages(history);
    setInput('');
    setBusy(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history
            .filter((m) => m !== GREETING)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry — I couldn't reach the server just now. Try again in a moment, or email hello@messerdigital.com.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className={styles.widget}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}><img src={mark} alt="" /></div>
              <div>
                <div className={styles.title}>Messer AI</div>
                <div className={styles.status}>
                  <span className={styles.statusDot} />
                  Online — ask me anything
                </div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.aiBubble}`}
              >
                {m.content}
              </div>
            ))}

            {busy && (
              <div className={`${styles.bubble} ${styles.aiBubble} ${styles.typing}`}>
                <span />
                <span />
                <span />
              </div>
            )}

            {messages.length === 1 && !busy && (
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} className={styles.suggestion} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className={styles.inputRow} onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="Ask about our services…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={busy || !input.trim()}
              aria-label="Send message"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
