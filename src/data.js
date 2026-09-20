// Everything configurable lives in .env (copy .env.example). The fallbacks keep
// the site working if a var is missing — an empty var means "hide that feature".
const env = import.meta.env
const val = (v, fallback = '') => (v ?? fallback).trim()

const formId = val(env.VITE_FORMSPREE_ID)

export const profile = {
  name: val(env.VITE_NAME, 'Royal Rao'),
  initials: val(env.VITE_INITIALS, 'RR'),
  role: val(env.VITE_ROLE, 'Senior Developer'),
  headline: val(env.VITE_HEADLINE, 'Full-Stack Engineer & AI Automation Developer'),
  blurb:
    'I build and ship scalable web platforms, AI-driven automation pipelines and data-intensive systems — across frontend, backend, cloud and workflow automation.',
  location: val(env.VITE_LOCATION, 'New Delhi, India'),
  credential: 'IIT Jodhpur',
  email: val(env.VITE_EMAIL, 'royalrao.edu@gmail.com'),
  phone: val(env.VITE_PHONE),
  github: val(env.VITE_GITHUB, 'https://github.com/dev-royalrao'),
  linkedin: val(env.VITE_LINKEDIN, 'https://www.linkedin.com/in/royal-rao-443298228'),
  resume: val(env.VITE_RESUME_URL, './Royal_Rao_Resume.pdf'),
  photo: val(env.VITE_PHOTO_URL, './profile.jpg'),
  video: val(env.VITE_VIDEO_URL),
  scheduleUrl: val(env.VITE_SCHEDULE_URL),
  formEndpoint: formId ? `https://formspree.io/f/${formId}` : '',
}

export const work = [
  {
    company: 'UK Telecom Distribution Ltd.',
    title: 'B2B eSIM Platform',
    period: 'Aug 2025 — Present',
    context:
      'A B2B eSIM distribution platform serving wholesale partners, plus a customer-facing mobile app and a live provisioning tracker.',
    owned: [
      'TypeScript backend and React frontend for the web platform',
      'Redis caching and Apache Kafka event pipelines',
      'Cross-platform mobile app in React Native with a Go service layer',
      'End-to-end PostgreSQL work — schema design, migrations and query tuning',
    ],
    decisions: [
      'Kafka for provisioning events so activation flows stay decoupled and replayable',
      'Redis in front of hot lookups to keep partner-facing API latency predictable',
      'Go for the provisioning service where throughput and concurrency mattered most',
    ],
    results: [
      'Secure OTA eSIM activation integrated with upstream provisioning APIs',
      'End-to-end API and webhook coverage driven through Postman',
    ],
    tags: ['TypeScript', 'React', 'React Native', 'Go', 'Redis', 'Kafka', 'PostgreSQL'],
  },
  {
    company: 'UK Telecom Distribution Ltd.',
    title: 'AI WhatsApp Support Automation',
    period: 'Aug 2025 — Present',
    context:
      'Customer support was absorbing hours of repetitive technical and non-technical queries arriving over WhatsApp.',
    owned: [
      'End-to-end AI support bot on a locally hosted LLM (Ollama / Qwen2.5 7B)',
      'LangChain and FastAPI services for context-aware replies and conversation memory',
      'WhatsApp Business Platform integration via the Meta Developer console, with multilingual templates',
      'A companion PWA admin dashboard for live conversation monitoring, analytics and bot configuration',
    ],
    decisions: [
      'A local LLM rather than a hosted API — customer conversation data never leaves our own infrastructure',
      'Conversation memory keyed per contact, so multi-turn troubleshooting actually holds context',
      'A PWA over a native app, so the ops team can install the dashboard on any device, with offline support',
    ],
    results: [
      'Manual support work cut by over 40% through n8n automation workflows',
      'Common technical queries auto-resolved without a human in the loop',
    ],
    tags: ['Python', 'Ollama', 'LangChain', 'FastAPI', 'n8n', 'WhatsApp API', 'PWA'],
  },
  {
    company: 'Microtek New Technologies Pvt. Ltd.',
    title: 'MIS Automation & KPI Dashboards',
    period: 'Aug 2024 — Aug 2025',
    context:
      'Manufacturing reporting across Sales, Purchase, BOM Costing and NPD ran on manual spreadsheet work, slowing decisions at the top.',
    owned: [
      'Automated databases, MIS reports and KPI dashboards using SAP, Google Sheets and Power BI',
      'A real-time web app tracking PDCL lab test runs with a completion-time estimation algorithm',
      'Coordination across 10+ cross-functional projects with R&D, Quality and Production',
    ],
    decisions: [
      'Pulled reporting straight off SAP rather than re-keyed exports, removing a whole class of manual error',
      'Estimated lab completion times from historical run data instead of fixed slot assumptions',
    ],
    results: [
      'Shortened NPD cycles and reduced defect rates',
      'Insights presented directly to the CMD and senior management to speed up decisions',
    ],
    tags: ['SAP', 'Power BI', 'JavaScript', 'Google Sheets', 'Data Modelling'],
  },
  {
    company: 'Extech Digital',
    title: 'Python Data Processing & Reporting',
    period: 'Aug 2023 — Aug 2024',
    context:
      'Recurring client reporting depended on datasets arriving in inconsistent shapes from several sources.',
    owned: [
      'Python applications for data processing and reporting, built for reuse rather than as one-off scripts',
      'Collection, cleaning and preparation of datasets with Python, SQL and Excel',
      'Interactive Power BI and Google Sheets visualisations for business insight',
    ],
    decisions: [
      'A shared cleaning layer instead of per-client scripts, so a new source meant config rather than new code',
    ],
    results: ['Reports maintained and delivered with 98% on-time accuracy'],
    tags: ['Python', 'SQL', 'Pandas', 'Power BI', 'Excel'],
  },
]

export const experience = [
  {
    role: 'Senior Developer',
    company: 'UK Telecom Distribution Ltd.',
    location: 'New Delhi, India',
    period: 'Aug 2025 — Present',
    points: [
      'Built and deployed AI automation workflows in n8n, cutting manual work by over 40%.',
      'Designed an AI-powered WhatsApp support system on a local LLM (Ollama) to auto-resolve technical and non-technical user queries.',
      'Developed the B2B eSIM web platform with a TypeScript backend, React frontend, Redis and Kafka.',
      'Built a cross-platform eSIM mobile app using React Native and Go, integrated with provisioning APIs.',
      'Provisioned Google Cloud infrastructure (VM, load balancer, DNS, SSL) and configured Cloudflare rules to block bots and threats.',
      'Led client-facing work — meetings, onboarding and API setups — and drove end-to-end API and webhook testing.',
    ],
  },
  {
    role: 'Analyst',
    company: 'Microtek New Technologies Pvt. Ltd.',
    location: 'Himachal Pradesh, India',
    period: 'Aug 2024 — Aug 2025',
    points: [
      'Automated databases, MIS reports and KPI dashboards (Sales, Purchase, BOM Costing, NPD) using SAP, Google Sheets and Power BI.',
      'Coordinated 10+ cross-functional projects, shortening NPD cycles and reducing defect rates.',
      'Built a real-time web app to track PDCL lab test runs with a completion-time estimation algorithm.',
      'Presented data insights to the CMD and senior management to support faster decision-making.',
    ],
  },
  {
    role: 'Python Developer / Data Analyst',
    company: 'Extech Digital',
    location: 'Mohali, Punjab',
    period: 'Aug 2023 — Aug 2024',
    points: [
      'Developed and maintained Python applications for data processing and reporting.',
      'Collected, cleaned and prepared datasets using Python, SQL and Excel.',
      'Built interactive visualisations in Power BI and Google Sheets.',
      'Maintained and delivered reports with 98% on-time accuracy.',
    ],
  },
  {
    role: 'Telecom Networks & Cybersecurity Trainee',
    company: 'ALTTC, BSNL',
    location: 'Uttar Pradesh, India',
    period: 'Jul 2023',
    points: [
      'Industrial training on integrated telecom and data networks — architecture, protocols and cybersecurity practice.',
    ],
  },
]

export const capabilities = [
  {
    group: 'Product & Frontend',
    items: ['React', 'React Native', 'Next.js', 'TypeScript', 'JavaScript', 'HTML / CSS', 'PWA'],
  },
  {
    group: 'Backend & Integrations',
    items: ['Node.js', 'Python', 'FastAPI', 'Go', 'REST APIs', 'Webhooks', 'Redis', 'Apache Kafka'],
  },
  {
    group: 'AI & Automation',
    items: ['n8n', 'Ollama', 'OpenAI API', 'LangChain', 'TensorFlow', 'scikit-learn', 'OpenCV'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'VectorDB', 'SQL', 'SAP', 'Pandas', 'NumPy'],
  },
  {
    group: 'Cloud & Security',
    items: ['Google Cloud', 'Microsoft Azure', 'Cloudflare WAF', 'Firebase', 'Docker', 'Git / GitHub'],
  },
  {
    group: 'Analytics',
    items: ['Power BI', 'Tableau', 'Matplotlib', 'Excel', 'Google Sheets'],
  },
]

export const projects = [
  {
    group: 'AI & Machine Learning',
    items: [
      { name: 'SignSense', note: 'Real-time webcam sign-language-to-text recognition (OpenCV, TensorFlow).' },
      { name: 'Diabetic Retinopathy Diagnosis', note: 'CNN–Transformer multi-class classification with a clinical-recommendation GUI.' },
      { name: 'Predictive Models', note: 'Movie rating, credit card fraud detection and stock price prediction (scikit-learn, TensorFlow).' },
    ],
  },
  {
    group: 'Data Engineering',
    items: [
      { name: 'AQI Forecasting Pipeline', note: 'Air Quality Index forecasting and analysis on an Azure data engineering pipeline.' },
      { name: 'KPI Dashboard Suite', note: 'Automated dashboards across Sales, Purchase, BOM Costing, NPD, Quality and R&D.' },
      { name: 'Madhav E-commerce Dashboard', note: 'Sales and category performance analytics.' },
    ],
  },
  {
    group: 'Web & Mobile',
    items: [
      { name: 'eSIM Mobile App', note: 'React Native and Go, with secure provisioning and OTA activation.' },
      { name: 'Lab Test Run Tracker', note: 'Real-time run tracking with completion-time estimation.' },
      { name: 'Support Admin PWA', note: 'Installable dashboard with offline support for live conversation monitoring.' },
    ],
  },
]

export const education = [
  { degree: 'M.Tech, Data Engineering', school: 'IIT Jodhpur', period: '2024 — 2026' },
  {
    degree: 'B.Tech, Electronics & Communication Engineering',
    school: 'Guru Jambheshwar University of Science and Technology',
    period: '2020 — 2024',
  },
]

export const certifications = [
  'Integrated Telecom / Data Network & Cyber Security — ALTTC, BSNL',
  'Data Science Internship — Codsoft, Internpe',
  'AWS — Simplilearn',
  'Power BI — LUDIFU',
  'Python — LUDIFU, Excellence Technology',
  'C / C++ — Aptech Learning',
  'AI For India 2.0 — GUVI (Skill India Digital)',
]

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
