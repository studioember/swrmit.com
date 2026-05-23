# swrm marketing homepage

Static one-pager deployed to Vercel as the public marketing site for swrmit.com.

- Logged-out marketing page (hero, how it works, for brands, for taskers, task types, FAQ, CTA, footer).
- Pure HTML + Tailwind CDN — same brand tokens as the main app (`#C5E309` on near-black).
- All sign-up / log-in CTAs route to the existing app at `lets.swrmit.com`.

## Deploy

This folder is its own Vercel root. From inside this directory:

```bash
vercel --prod
```

Vercel auto-detects it as a static site and serves `index.html` at `/`.

## Brand tokens (kept in sync with `web/templates/layout.html`)

| Token | Value |
|---|---|
| `primary` | `#C5E309` |
| `bg` | `#090909` |
| `bg-elevated` | `#1a1a1a` |
| `bg-card` | `#000000` |
| `border` | `#2a2a2a` |
| `muted` | `#737373` |

Logos at `/assets/logo-full.svg` and `/assets/logo.svg` are copies of the in-app assets — keep them in sync.
