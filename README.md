# hassan285hk.github.io — Rebuild Notes

A ground-up visual and structural rebuild of your portfolio. No build step, no framework —
pure HTML/CSS/JS so it deploys to GitHub Pages exactly as before.

## File structure

```
index.html                 → all markup/sections
assets/css/style.css       → design system (tokens, components, responsive rules)
assets/js/data.js          → EVERYTHING you'd want to edit: name, roles, skills, projects, timeline, certificates, contact
assets/js/main.js          → all behaviour (cursor, mesh bg, nav, GitHub API, forms, palette, etc.)
robots.txt / sitemap.xml   → SEO
```

## Before you push this live — 3 required steps

1. **Copy your existing image files into the repo root** (same filenames as your current site):
   `logo.png, robotics1.jpg, sports-game-logo-260nw-698317408.webp, "Blue Red and White Modern Delivery Logo.png",
   JUST.png, "JUST (1).png", "Black minimalist architect logo.png", Aura.png`
   These are referenced by `assets/js/data.js` and load correctly once they're in the root.

2. **Add a real resume**: drop a `resume.pdf` in the repo root (the Resume button expects `./resume.pdf`).

3. **Set your Formspree endpoint**: in `assets/js/data.js`, replace
   `formEndpoint: "https://formspree.io/f/YOUR_FORM_ID"` with your real form ID from formspree.io
   (free tier is fine). Until you do this, the form will show a graceful fallback error asking
   people to email you directly — it won't silently fail.

## Content you should personalize (currently placeholders, clearly marked in `data.js`)

- **Experience & Education timeline** — I didn't have your real roles/dates, so it ships with
  sample entries marked "Add your…". Replace with your actual history.
- **Certificates** — same, 3 placeholder cards ready for your real certificates/images.
- **Skill proficiency %** — I set reasonable defaults across your stated stack (Flutter, Python,
  TensorFlow, OpenCV, React, Firebase, etc.); adjust the `level` values in `data.js` to match your
  real confidence in each.

## What's new vs. the old site

- **Visual system**: dark theme, glass surfaces, animated gradient (violet→cyan→pink), and a
  signature canvas "neural mesh" background that reacts to your cursor — nods to the AI-engineer
  identity without being generic particle confetti.
- **Hero**: animated gradient name, typed rotating roles (AI Engineer → Flutter → Full-Stack →
  Designer), mouse-follow glow, magnetic CTA buttons, scroll indicator.
- **Navbar**: floating glass pill, scroll-spy active state, hides on scroll-down/shows on scroll-up,
  mobile hamburger, theme toggle (persisted), `⌘K` command palette trigger.
- **About**: animated stat counters, gradient-framed photo.
- **Skills**: tilt-on-hover glass cards with animated progress bars, real tech logos via Simple Icons CDN.
- **Projects**: two tabs — "Code Projects" pulled **live from the GitHub API** (stars, forks,
  language, links) and "Design Work" using your real graphic-design pieces.
- **GitHub Stats**: live public repo count, followers, total stars, and a contribution graph image.
- **Experience/Education**: animated vertical timeline.
- **Certificates**: card grid + modal preview.
- **Contact**: validated form (Formspree), copy-email button, confetti burst + success message on send.
- **Footer**: animated gradient divider, back-to-top button.
- **Extras**: custom cursor, loading screen, scroll progress bar, command palette with keyboard
  nav (`↑↓`, `Enter`, `Esc`), an easter egg command, `prefers-reduced-motion` support throughout,
  skip-link, visible focus states, semantic landmarks, meta/OG tags, robots.txt + sitemap.xml.

## Deploying

This is already a valid GitHub Pages site — just commit these files to the root of
`hassan285hk.github.io` (replacing the old ones) and push to `main`. No build step required.

## A note on honesty

I didn't fabricate project descriptions, employers, or credentials you haven't given me — the
timeline and certificates ship as clearly-labeled placeholders rather than invented history, and
the "Code Projects" tab pulls your actual repos live instead of guessing at fake ones. Fill in the
placeholders whenever you're ready.
