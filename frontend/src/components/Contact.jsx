import { useState } from 'react';
import styles from './Contact.module.css';

const REASONS = [
  'General Inquiry',
  'Local AI Deployment',
  'Document Search Solution',
  'Custom AI Assistant',
  'Live Walkthrough',
  'AI Readiness Assessment',
  'Project Consultation',
  'Partnership Opportunity',
  'Other',
];

const EMPTY = { name: '', email: '', company: '', reason: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`${styles.section} dark-section`}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className="section-label">Contact</span>
          <h2 className={styles.title}>
            Let's Build Your<br />
            <span className={styles.gradient}>Local AI Solution</span>
          </h2>
          <p className={styles.subtitle}>
            Ready to bring AI inside your business? Tell us about your use case
            and we'll put together a custom solution. Not sure where to start?
            Ask for a live walkthrough or an AI readiness assessment.
          </p>

          <div className={styles.contactDetails}>
            <a href="mailto:hello@messerdigital.com" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span>hello@messerdigital.com</span>
            </a>
            <a href="https://messerdigital.com" target="_blank" rel="noreferrer" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span>messerdigital.com</span>
            </a>
          </div>
        </div>

        <div className={styles.formWrap}>
          {status === 'success' ? (
            <div className={styles.success}>
              <CheckIcon />
              <h3>Message sent!</h3>
              <p>Thanks for reaching out — we'll be in touch shortly.</p>
              <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set('name')}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={set('email')}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={set('company')}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reason">Reason for Contact</label>
                <div className={styles.selectWrap}>
                  <select
                    id="reason"
                    value={form.reason}
                    onChange={set('reason')}
                    required
                  >
                    <option value="" disabled>Select a reason…</option>
                    {REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project or question…"
                  value={form.message}
                  onChange={set('message')}
                  required
                />
              </div>

              {status === 'error' && (
                <p className={styles.errorMsg}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <path d="M14 24l7 7 13-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.chevron}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
