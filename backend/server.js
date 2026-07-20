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

// ── AI Chat ───────────────────────────────────────────────────────────────────
//
// Pluggable provider, selected via AI_PROVIDER env var:
//   ollama    — local inference   (OLLAMA_URL, OLLAMA_MODEL)
//   anthropic — Claude API        (ANTHROPIC_API_KEY, ANTHROPIC_MODEL)
//   openai    — OpenAI API        (OPENAI_API_KEY, OPENAI_MODEL)
//   builtin   — no LLM required; keyword-matched answers (default)
// If AI_PROVIDER is unset, the first configured provider wins: ollama if
// OLLAMA_URL is set, anthropic if ANTHROPIC_API_KEY is set, then openai,
// otherwise builtin.

const SYSTEM_PROMPT = `You are the AI assistant on the Messer Digital AI website (ai.messerdigital.com).
You are a live demonstration of the services Messer Digital sells, so be helpful, concise, and professional.

About Messer Digital AI:
- Custom AI solutions for businesses, with a local-first philosophy: models run on the client's own hardware so data never leaves their network.
- Services: local document search (RAG pipelines with source citations), custom AI assistants (support bots, internal knowledge bases, HR assistants), private AI deployment (on-premise, Docker, air-gapped), cloud AI integration (wiring Claude, OpenAI, and other cloud AI APIs into existing applications when cloud is the right fit), and AI integration consulting (assessment, strategy, roadmap).
- Why local AI: complete data privacy, no per-query API fees, low-latency inference, easier HIPAA/SOC 2/GDPR compliance, no dependency on external API uptime, full customization with no vendor lock-in.
- When cloud AI makes sense (spiky workloads, frontier-model capability needs, no GPU budget), Messer Digital can integrate cloud providers securely via API keys instead — the point is fitting the deployment to the client's needs.
- Contact: hello@messerdigital.com, or the contact form on this page. Parent site: messerdigital.com.

Keep answers to a few sentences. If asked something unrelated to Messer Digital or AI services, politely steer back. Never invent pricing; suggest contacting for a quote.`;

const MAX_CHAT_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

function resolveProvider() {
  const explicit = (process.env.AI_PROVIDER || '').toLowerCase();
  if (['ollama', 'anthropic', 'openai', 'builtin'].includes(explicit)) return explicit;
  if (process.env.OLLAMA_URL) return 'ollama';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return 'builtin';
}

async function chatOllama(messages) {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  const resp = await fetch(`${url}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL || 'llama3.1',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      stream: false,
    }),
  });
  if (!resp.ok) throw new Error(`Ollama responded ${resp.status}`);
  const data = await resp.json();
  return data.message?.content || '';
}

async function chatAnthropic(messages) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic();
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-opus-4-8',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });
  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock?.text || '';
}

async function chatOpenAI(messages) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!resp.ok) throw new Error(`OpenAI responded ${resp.status}`);
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || '';
}

// No-LLM fallback so the widget works before the GPU/Ollama is set up.
const BUILTIN_ANSWERS = [
  {
    match: /price|pricing|cost|fee|quote|charge/i,
    reply:
      "Pricing depends on the scope of the solution — a document-search deployment is very different from a full custom assistant. Reach out at hello@messerdigital.com or the contact form below and we'll put together a quote.",
  },
  {
    match: /document|search|rag|pdf|file/i,
    reply:
      'Our local document search lets you upload internal documents — manuals, policies, reports — and query them in plain English. Answers come with source citations, and everything runs on your own hardware. Check out the live demo section above!',
  },
  {
    match: /cloud|api key|openai|anthropic|claude|gpt|gemini/i,
    reply:
      "Local-first is our specialty, but cloud AI is sometimes the right fit — spiky workloads, frontier-model capabilities, or no GPU budget. We integrate cloud providers like Anthropic's Claude and OpenAI into your applications securely via API keys, so you get the best of both worlds.",
  },
  {
    match: /privacy|private|secure|security|hipaa|gdpr|soc\s?2|complian/i,
    reply:
      'Privacy is the core of what we do: with a local deployment your documents, queries, and responses never leave your network. That makes HIPAA, SOC 2, and GDPR compliance far simpler — you keep full audit control over data handling.',
  },
  {
    match: /deploy|install|on.?prem|server|hardware|gpu|docker|air.?gap/i,
    reply:
      'We deploy full-stack AI infrastructure on your servers or private cloud — Docker-based, and air-gapped if needed. No shared environments and no third-party API calls, which is ideal for sensitive industries.',
  },
  {
    match: /assistant|chatbot|chat bot|support bot|knowledge base/i,
    reply:
      'We build purpose-built AI assistants around your workflows — customer support bots, internal knowledge bases, HR assistants — trained on your data and deployed locally. This chat widget is a small taste of what that looks like.',
  },
  {
    match: /contact|email|reach|talk|call|hire/i,
    reply:
      "You can reach us at hello@messerdigital.com or through the contact form at the bottom of this page. Tell us a bit about your use case and we'll take it from there.",
  },
  {
    match: /ollama|local (ai|model|llm)|llama|mistral/i,
    reply:
      'We typically deploy open models like Llama through Ollama on your own hardware — zero cloud API fees, low latency, and your data stays put. This assistant itself will soon run on exactly that stack.',
  },
];

function chatBuiltin(messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const text = lastUser?.content || '';
  for (const { match, reply } of BUILTIN_ANSWERS) {
    if (match.test(text)) return reply;
  }
  return "I can tell you about Messer Digital's services — local document search, custom AI assistants, private deployments, cloud AI integration, and consulting. What would you like to know? For anything specific, hello@messerdigital.com is the fastest route.";
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  const cleaned = messages
    .slice(-MAX_CHAT_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Last message must be from the user.' });
  }

  const provider = resolveProvider();

  try {
    let content;
    switch (provider) {
      case 'ollama':    content = await chatOllama(cleaned); break;
      case 'anthropic': content = await chatAnthropic(cleaned); break;
      case 'openai':    content = await chatOpenAI(cleaned); break;
      default:          content = chatBuiltin(cleaned);
    }
    res.json({ role: 'assistant', content, provider });
  } catch (err) {
    console.error(`Chat error (${provider}):`, err.message);
    // Degrade gracefully to the builtin answers rather than erroring the widget
    res.json({ role: 'assistant', content: chatBuiltin(cleaned), provider: 'builtin' });
  }
});

// Document ingestion — placeholder for RAG pipeline
app.post('/api/documents', (_req, res) => {
  // TODO: chunk, embed, and store in local vector DB
  res.json({ success: true, message: 'Document ingestion pipeline coming soon.' });
});

app.listen(PORT, () => {
  console.log(`AI Messer Digital backend running on port ${PORT}`);
});
