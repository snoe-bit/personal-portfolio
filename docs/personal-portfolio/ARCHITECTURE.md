# ARCHITECTURE.md — personal-portfolio

**Project:** Sinokubonga Bhebe Personal Portfolio  
**Stack:** Vanilla HTML5 · CSS3 · JavaScript (ES6+)  
**Type:** Single-page application (SPA-style scroll)

---

## Design System

| Token | Value |
|---|---|
| Background | `#0f0d0e` |
| Accent | `#6ee7f7` (electric cyan) |
| Font Display | Inter 900 |
| Font Script | Playfair Display italic |
| Font Mono | Space Mono |
| Cards | Glassmorphism (`backdrop-filter: blur`) |
| Animations | CSS keyframes + IntersectionObserver |

---

## File Structure

```
personal-portfolio/
├── index.html          ← All 5 sections in one page
├── styles.css          ← Full design system + responsive
├── main.js             ← Scroll-reveal, typing terminal, parallax
├── assets/
│   └── images/
│       └── hero-bg.png ← AI-generated dark tech background
└── docs/
    └── personal-portfolio/
        ├── ARCHITECTURE.md   ← This file
        └── BUILD-PROGRESS.md
```

---

## Section Architecture

| Section | ID | Description |
|---|---|---|
| Navigation | `#nav` | Fixed 3-col: tag · logo · CTA pill |
| Hero | `#hero` | Mixed typography headline + 5 tilted concept cards |
| About | `#about` | 2-col: bio text + animated terminal widget |
| Skills | `#skills` | 4 groups of glassmorphic pill badges |
| Projects | `#projects` | 3 tilted project cards with code previews |
| Contact | `#contact` | CTA heading + 3 contact link pills + footer |

---

## JavaScript Architecture

| Feature | Implementation |
|---|---|
| Scroll Reveal | `IntersectionObserver` on `.reveal` elements |
| Nav Scroll State | `window.scroll` listener → `.scrolled` class |
| Typing Terminal | Async/await character-by-character typing loop |
| Hero Parallax | `mousemove` → translate `hero-bg`, `hero-content`, `hero-glow` |
| Card 3D Tilt | Per-card `mousemove` → `rotateX/Y` transform |

---

## Responsive Breakpoints

| Breakpoint | Change |
|---|---|
| `≤ 960px` | Projects → 1 col, About → 1 col, Skills → 1 col |
| `≤ 768px` | Nav padding reduced, hero cards scroll horizontally |
| `≤ 480px` | Contact links stack vertically, cards snap scroll |
