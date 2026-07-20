import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ai-messer-digital-backend' });
});

// ── Contact ───────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const CONTACT_REASONS = [
  'General Inquiry',
  'Local AI Deployment',
  'Document Search Solution',
  'Custom AI Assistant',
  'Project Consultation',
  'Partnership Opportunity',
  'Other',
];

app.get('/api/contact/reasons', (_req, res) => res.json(CONTACT_REASONS));

app.post('/api/contact', async (req, res) => {
  const { name, email, company, reason, message } = req.body;

  if (!name || !email || !reason || !message) {
    return res.status(400).json({ error: 'Name, email, reason, and message are required.' });
  }
  if (!CONTACT_REASONS.includes(reason)) {
    return res.status(400).json({ error: 'Invalid reason.' });
  }

  try {
    await transporter.sendMail({
      from:    `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to:      process.env.CONTACT_TO || 'hello@messerdigital.com',
      subject: `[${reason}] Message from ${name}${company ? ` — ${company}` : ''}`,
      text:    `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nReason: ${reason}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// ── AI / Ollama ───────────────────────────────────────────────────────────────

// Proxy to local Ollama instance — to be wired up
app.post('/api/chat', async (req, res) => {
  const { message, model = 'llama3' } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  // TODO: forward to http://localhost:11434/api/chat
  res.json({
    role: 'assistant',
    content: 'Ollama integration coming soon. This endpoint will proxy requests to your local Ollama instance.',
  });
});

// Document ingestion — placeholder for RAG pipeline
app.post('/api/documents', (_req, res) => {
  // TODO: chunk, embed, and store in local vector DB
  res.json({ success: true, message: 'Document ingestion pipeline coming soon.' });
});

app.listen(PORT, () => {
  console.log(`AI Messer Digital backend running on port ${PORT}`);
});
