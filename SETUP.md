# Royal Rao — Portfolio

React + Vite.

- **Contact details, links, service IDs** → `.env`
- **Everything else** (work history, projects, skills, education) → `src/data.js`

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Configuration — `.env`

Contact details, links and service IDs live in `.env` (already created from
`.env.example`). Edit it, then restart the dev server — Vite only reads `.env`
at startup.

> **`.env` here is public config, not a secret store.** Vite inlines every
> `VITE_*` var into the built JavaScript, so anyone can read it in the browser.
> Never put an API key, token or database URL in it. Everything currently in
> there — email, social links, a Formspree form ID — is meant to be public.

An **empty value hides that feature** rather than breaking the page:

| Variable | Empty means |
|---|---|
| `VITE_PHONE` | No phone link shown (current default — you asked to keep it off) |
| `VITE_SCHEDULE_URL` | "Schedule a call" buttons are hidden |
| `VITE_FORMSPREE_ID` | Contact form tells visitors to email you instead |
| `VITE_VIDEO_URL` | Hero shows your photo with a "coming soon" caption |

### Two to fill in before publishing

1. `VITE_SCHEDULE_URL` — your Calendly / Cal.com booking link.
2. `VITE_FORMSPREE_ID` — sign up at [formspree.io](https://formspree.io), create a
   form, and paste **just the ID** (the part after `/f/`).

### Adding the intro video later

Drop the clip in `public/intro.mp4` and set `VITE_VIDEO_URL="./intro.mp4"`.
The hero swaps the photo for a `<video>` automatically; no code change needed.

### On Netlify / Vercel

`.env` is gitignored, so set the same `VITE_*` vars in the host's
environment-variables settings and redeploy.

## Deploying

`vite.config.js` uses `base: './'`, so the build works from any path.

- **Netlify / Vercel** — connect the repo, build `npm run build`, publish `dist`.
- **GitHub Pages** — push `dist/` to a `gh-pages` branch, or use the Pages action.

## What's deliberately left out

- Phone number and client domains (esim-api.com etc.) — you asked to keep those private.
  They're still in the PDF at `public/Royal_Rao_Resume.pdf`, so swap that file for a
  redacted version if you want them off the site entirely.
- No CSS framework, no router, no analytics — plain CSS variables handle theming,
  and anchors handle navigation.
