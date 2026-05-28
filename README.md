# Arta Tejarat — International Trading Company Website

A premium, fully bilingual (Persian RTL / English LTR) corporate website for
**Arta Tejarat International Apadana** (آرتا تجارت بین‌الملل آپادانا), built with
Next.js 14 App Router, TypeScript, Tailwind CSS and Framer Motion.

- Default language: **Persian (fa)** · Full **English (en)** support
- Light theme, navy + turquoise identity, generous whitespace
- SEO-optimised (metadata, Open Graph, JSON-LD, sitemap, robots)
- No external image dependencies — all visuals are SVG/CSS
- Production-ready and deployable to Vercel out of the box

---

## Tech stack

| Layer        | Choice                                  |
|--------------|-----------------------------------------|
| Framework    | Next.js 14 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS                            |
| Animation    | Framer Motion                           |
| i18n         | Custom dictionaries + middleware        |
| Fonts        | Plus Jakarta Sans + Fraunces (EN), Estedad (FA) |

---

## Getting started (local development)

Requirements: **Node.js 18.17+** (Node 20+ recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you will be redirected to `/fa` (or `/en` based on
your browser language). Switch languages with the FA/EN toggle in the navbar.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

## Project structure

```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx        # root <html>/<body>, Navbar + Footer, metadata
│  │  ├─ page.tsx          # Home
│  │  ├─ about/page.tsx    # About
│  │  ├─ services/page.tsx # Services
│  │  ├─ contact/page.tsx  # Contact
│  │  └─ not-found.tsx     # 404
│  ├─ globals.css          # Tailwind + fonts + base styles
│  ├─ sitemap.ts           # /sitemap.xml
│  └─ robots.ts            # /robots.txt
├─ components/
│  ├─ layout/   # Navbar, Footer, LanguageSwitcher
│  ├─ sections/ # Hero, ContactForm
│  └─ ui/       # Button, Logo, Reveal, SectionHeading, WorldGraphic, icons, JsonLd
├─ i18n/
│  ├─ config.ts            # locales, direction, helpers
│  ├─ get-dictionary.ts    # server-only dictionary loader
│  └─ dictionaries/        # en.json, fa.json (all copy lives here)
├─ lib/site.ts             # company constants (address, contact, reg. no.)
└─ middleware.ts           # locale detection & redirects

public/
├─ favicon.svg
├─ images/og.svg
├─ fonts/estedad/          # drop Estedad .woff2 files here (see README.txt)
└─ logo/                   # drop final logo files here (see README.txt)
```

---

## Editing content

All visible text lives in `src/i18n/dictionaries/en.json` and `fa.json`.
The two files share an identical structure — edit the matching keys to update
copy in each language. Company details (address, WhatsApp, email, registration
number, Instagram) are centralised in `src/lib/site.ts`.

---

## Adding the Persian font (Estedad)

The Persian interface uses **Estedad**. The site runs without it (a system
fallback applies), but for the intended look:

1. Download Estedad from https://github.com/aminabedi68/Estedad
2. Place these files in `public/fonts/estedad/`:
   `Estedad-Regular.woff2`, `Estedad-Medium.woff2`, `Estedad-Bold.woff2`

The `@font-face` rules in `globals.css` already reference these paths.

## Adding your logo

A clean text wordmark ships by default. To use image artwork, drop your files
in `public/logo/` and follow the steps in `public/logo/README.txt`
(uncomment the `<Image>` block in `src/components/ui/Logo.tsx`).

---

## The contact form

`src/components/sections/ContactForm.tsx` is a client component. On submit it
validates the required fields and opens a pre-filled **WhatsApp** message — so
it works with **no backend**. To deliver inquiries server-side instead, create
an API route (e.g. `src/app/api/contact/route.ts`) and post the form values to
it from the component.

---

## Deploying to Vercel

1. Push this project to a GitHub/GitLab repository.
2. In [Vercel](https://vercel.com), **Add New → Project** and import the repo.
3. Framework preset is auto-detected as **Next.js** — no extra config needed.
   Build command `next build`, output handled automatically.
4. Click **Deploy**.

### Custom domain (www.artaintl.com)

1. In the Vercel project: **Settings → Domains → Add** `artaintl.com` and
   `www.artaintl.com`.
2. At your DNS provider, add the records Vercel shows (typically an `A` record
   for the apex domain and a `CNAME` to `cname.vercel-dns.com` for `www`).
3. Wait for DNS to propagate; Vercel issues the SSL certificate automatically.

If you change the production domain, update `SITE.url` in `src/lib/site.ts`
so canonical URLs, sitemap, robots and JSON-LD stay correct.

---

## Notes

- Light theme only by design (no dark mode).
- All imagery is vector (SVG) — there are no raster assets to optimise or break.
- `metadataBase` and structured data derive from `SITE.url`; keep it accurate.
