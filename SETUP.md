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
| `VITE_FORM_ENDPOINT` | Contact form tells visitors to email you instead |
| `VITE_VIDEO_URL` | Hero shows your photo with a "coming soon" caption |

### Making the contact form and the call button work

Both are free and neither needs a server.

**Contact form -> Google Sheet.** GitHub Pages only serves static files, so the
form posts to a Google Apps Script that writes to a Sheet and emails you.

1. New Google Sheet -> Extensions -> Apps Script.
2. Paste in `scripts/contact-form.gs` and set `NOTIFY_EMAIL` at the top.
3. Run `selfTest` once from the editor to confirm it writes a row, then delete
   that test row.
4. Deploy -> New deployment -> Web app. **Execute as: Me. Who has access: Anyone.**
   ("Anyone with a Google account" will not work - visitors are not signed in.)
5. Copy the `/exec` URL into `VITE_FORM_ENDPOINT`.

Re-deploy after editing the script (Deploy -> Manage deployments -> pencil ->
Version: New). Editing the code alone does not update the live URL.

A Formspree endpoint works in the same variable if you would rather use that -
the form posts the same way to either.

**Call button.** Sign up at [cal.com](https://cal.com) (free, unlimited) or
Calendly, make a 15-minute event, and put the booking link in
`VITE_SCHEDULE_URL`. Left blank, the buttons fall back to a mailto.

### Adding the intro video later

Drop the clip in `public/intro.mp4` and set `VITE_VIDEO_URL="./intro.mp4"`.
The hero swaps the photo for a `<video>` automatically; no code change needed.

### Setting these for the live site

`.env` is gitignored, so the GitHub Actions build cannot see it. Set them at
**Settings -> Secrets and variables -> Actions -> Variables** (the *Variables*
tab, not Secrets - Vite inlines these into the public JS bundle, so they are not
secrets and should never hold an API key):

- `VITE_FORM_ENDPOINT`
- `VITE_SCHEDULE_URL`

The workflow already passes them to the build. Adding or changing one needs a
re-run of the workflow to take effect.

On Netlify / Vercel, set the same names in that host's environment settings.

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
