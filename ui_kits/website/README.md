# Aprenda em Casa — Website UI Kit

Two things live here:

| File | What it is | Status |
|---|---|---|
| `components.html` | Button, Badge, Card, Alert and product Carousel as **static HTML**, each with its Tailwind v4 equivalent. Replaces the former `Button.tsx`, `Badge.tsx` and `ProductCarousel.tsx`, which depended on Next.js. | **Use this** for production markup. |
| `carousel.css` + `carousel.js` | Dependency-free scroll-snap carousel (swipe, keyboard, arrows on desktop, autoplay that pauses on hover/focus and respects reduced motion). | Production-ready. |
| `index.html` + `*.jsx` + `site.css` | Full-page recreation of the marketing site, composed from the brand manual before the real site code was available. | **Visual reference only.** Section layouts (Header, Hero, LevelGrid, FeatureRow, Testimonial, CTABand, Footer) — not the site's real markup. Needs a local server (`python3 -m http.server`) because Babel loads the `.jsx` files over XHR. |

## Patterns

- **Buttons** — green pill by default, navy text, Volume style (light gradient, inner gloss, soft tinted shadow); hover rises, press sinks with an inner shadow.
- **Cards** — 16 px radius, white → faint blue gradient with a layered soft shadow; level cards carry a 6px top stripe with the level gradient.
- **Display copy** — Nunito Black, uppercase, slight negative tracking.
- **Splash** — `border-radius: 62% 38% 55% 45% / 48% 60% 40% 52%` for organic blobs (`.ac-splash`).
