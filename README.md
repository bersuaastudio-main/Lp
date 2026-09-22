# Bersua — Landing Page

Landing page Bersua (https://bersua.space). Next.js 15 App Router, prerender statis.

```bash
npm install
npm run dev      # http://localhost:3000
```

**Sebelum deploy, baca [DEPLOY.md](./DEPLOY.md)** — environment variables, DNS,
dan pre-launch checklist.

## Struktur

```
app/
  layout.tsx          meta, OG, font, analytics (env-gated)
  page.tsx            komposisi section
  robots.ts           /robots.txt
  sitemap.ts          /sitemap.xml
  globals.css         design token + utilities
  lib/constants.ts    NOMOR WA, DOMAIN, copy CTA  ← ubah di sini
  lib/tracking.ts     event GA4
  components/         satu file per section
public/img/           aset gambar (WebP)
```
