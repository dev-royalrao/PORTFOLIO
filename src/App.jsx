import { useEffect, useState } from 'react'
import {
  profile,
  work,
  experience,
  capabilities,
  projects,
  education,
  certifications,
  nav,
} from './data.js'

/* ---------- small shared bits ---------- */

// ponytail: no booking link set -> every "schedule" link falls back to a mailto
const scheduleHref =
  profile.scheduleUrl || `mailto:${profile.email}?subject=15-minute call`
const external = { target: '_blank', rel: 'noreferrer' }
const scheduleProps = profile.scheduleUrl ? external : {}

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <header className="section-head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {intro && <p className="section-intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

const Tags = ({ items }) => (
  <ul className="tags">
    {items.map((t) => (
      <li key={t}>{t}</li>
    ))}
  </ul>
)

/* ---------- theme ---------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private mode — theme just won't persist */
    }
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

/* ---------- nav ---------- */

function Nav() {
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // highlight the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting)
        if (seen.length) setActive(seen[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">{profile.initials}</span>
          <span>{profile.name}</span>
        </a>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            {profile.role} · {profile.credential} · {profile.location}
          </p>
          <h1 className="display">{profile.name}</h1>
          <p className="tagline">{profile.headline}</p>
          <p className="lede">{profile.blurb}</p>

          <div className="cta-row">
            <a className="btn primary" href="#work">
              View selected work
            </a>
            <a className="btn" href={scheduleHref} {...scheduleProps}>
              Schedule a 15-minute call
            </a>
          </div>

          <div className="link-row">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Résumé (PDF)</a>
          </div>
        </div>

        <figure className="hero-media">
          {profile.video ? (
            <video src={profile.video} poster={profile.photo} controls playsInline />
          ) : (
            <img src={profile.photo} alt={profile.name} />
          )}
          <figcaption>
            {profile.video
              ? `A short introduction from ${profile.name}.`
              : 'A short video introduction is coming soon.'}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ---------- sections ---------- */

const Work = () => (
  <Section
    id="work"
    eyebrow="Selected work"
    title="What I have built"
    intro="Four pieces of work, with the context, the decisions behind them and what actually came out."
  >
    <div className="cards">
      {work.map((w) => (
        <article className="card" key={w.title}>
          <div className="card-head">
            <div>
              <h3>{w.title}</h3>
              <p className="muted">{w.company}</p>
            </div>
            <span className="period">{w.period}</span>
          </div>

          <p className="context">{w.context}</p>

          <div className="card-cols">
            <div>
              <h4>What I owned</h4>
              <ul>{w.owned.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <h4>Decisions</h4>
              <ul>{w.decisions.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <h4>Results</h4>
              <ul>{w.results.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          </div>

          <Tags items={w.tags} />
        </article>
      ))}
    </div>
  </Section>
)

const Experience = () => (
  <Section id="experience" eyebrow="Experience" title="Where I have worked">
    <ol className="timeline">
      {experience.map((e) => (
        <li key={e.role + e.company}>
          <div className="timeline-head">
            <div>
              <h3>{e.role}</h3>
              <p className="muted">{e.company} · {e.location}</p>
            </div>
            <span className="period">{e.period}</span>
          </div>
          <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </li>
      ))}
    </ol>
  </Section>
)

const Capabilities = () => (
  <Section
    id="capabilities"
    eyebrow="Capabilities"
    title="Tools I use in production"
    intro="Not a list of everything I have touched — this is what I reach for when something has to ship and stay up."
  >
    <div className="grid-3">
      {capabilities.map((c) => (
        <div className="panel" key={c.group}>
          <h3>{c.group}</h3>
          <Tags items={c.items} />
        </div>
      ))}
    </div>
  </Section>
)

const Projects = () => (
  <Section id="projects" eyebrow="Projects" title="Side and academic work">
    <div className="grid-3">
      {projects.map((g) => (
        <div className="panel" key={g.group}>
          <h3>{g.group}</h3>
          <ul className="project-list">
            {g.items.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong>
                <span>{p.note}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
)

const About = () => (
  <Section id="about" eyebrow="About" title="Background">
    <div className="about-grid">
      <div className="prose">
        <p>
          I am a Senior Developer based in {profile.location}, working across full-stack
          development and AI-driven automation. Most of my day is spent somewhere between a
          TypeScript service, a Python automation pipeline and a PostgreSQL query that needs to be
          faster than it currently is.
        </p>
        <p>
          I am finishing an M.Tech in Data Engineering at IIT Jodhpur alongside my work, which keeps
          the data side of what I build honest — pipelines, model work and the infrastructure
          underneath them rather than just the application layer.
        </p>
        <p>
          The work I enjoy most sits where a business process is still manual and does not need to
          be: support queues, reporting, provisioning. That is where automation pays for itself
          quickly and measurably.
        </p>
      </div>

      <aside className="panel">
        <h3>Education</h3>
        <ul className="plain">
          {education.map((e) => (
            <li key={e.degree}>
              <strong>{e.degree}</strong>
              <span className="muted">{e.school}</span>
              <span className="period">{e.period}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>

    <div className="panel certs">
      <h3>Certifications</h3>
      <Tags items={certifications} />
    </div>
  </Section>
)

function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    // ponytail: VITE_FORMSPREE_ID not set -> say so instead of failing silently
    if (!profile.formEndpoint) {
      setError(`The form is not wired up yet — email me at ${profile.email}.`)
      return
    }
    setBusy(true)
    setError('')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (!res.ok) throw new Error('Request failed')
      setSent(true)
      e.target.reset()
    } catch {
      setError(`Could not send just now — email me directly at ${profile.email}.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      intro="Open to senior full-stack and AI automation roles, and to consulting work."
    >
      <div className="contact-grid">
        <form className="panel form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send message'}
          </button>
          {sent && <p className="note ok">Thanks — I will get back to you shortly.</p>}
          {error && <p className="note err">{error}</p>}
        </form>

        <aside className="panel">
          <h3>Direct</h3>
          <ul className="plain">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            {profile.phone && (
              <li><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></li>
            )}
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={profile.resume} target="_blank" rel="noreferrer">Download résumé (PDF)</a></li>
          </ul>
          <a className="btn primary full mt" href={scheduleHref} {...scheduleProps}>
            Schedule a 15-minute call
          </a>
        </aside>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Capabilities />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>{profile.name} · {new Date().getFullYear()}</span>

          <nav className="link-row footer-links">
            <a href={profile.github} {...external}>GitHub</a>
            <a href={profile.linkedin} {...external}>LinkedIn</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.resume} {...external}>Résumé</a>
            <a href={scheduleHref} {...scheduleProps}>Calendar</a>
          </nav>

          <span>Built with React</span>
        </div>
      </footer>
    </>
  )
}
