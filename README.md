# Aprenda em Casa — Design System

> **Brincando de Aprender** · _Playing to learn._

Aprenda em Casa is a Brazilian children's-education brand that produces **apostilas** (illustrated workbooks) designed to make learning and literacy feel like play. The brand speaks to families and educators of children from pre-literacy (ABC) through early grades, organized in numbered levels (Nv1 → Nv5/ABC).

This design system captures the brand voice, visual foundations, and component vocabulary so any agent or designer can produce on-brand artifacts — apostila covers, social posts, ads, decks, and the marketing site at **aprendaemcasa.art.br**.

---

## Sources

| Source | Where it lives | Notes |
|---|---|---|
| Manual de Marca (v1.0, 2026) | `assets/Manual_de_Marca_Aprenda_em_Casa.pdf` | The canonical brand book — colors, type, voice, applications. |
| Master logos (PNG) | `assets/logo-*.png` | Completa / simplificada-tagline / simplificada / vertical. |
| Marketing site | https://aprendaemcasa.art.br | Reference only — not crawled into this system. |
| GitHub: `cris-zannini/ac-design-system` | — | Repo was empty at the time of build. |
| GitHub: `cris-zannini/ac-copyandimages-generator` | — | Not imported (out of scope). |

---

## Index

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← skill manifest (Agent Skills compatible)
├── colors_and_type.css        ← tokens (:root) + components (@layer components)
├── fonts.css                  ← Nunito @font-face (optional — skip if fonts load elsewhere)
├── tailwind.css               ← Tailwind v4 bridge: imports the tokens and maps them in @theme
├── MIGRATION.md               ← site → DS mapping (pt-BR)
├── assets/                    ← logos, brand PDF
├── fonts/                     ← Nunito, 8 weights (200–900) + italics
├── preview/                   ← cards rendered in the Design System tab
├── scripts/check_contrast.py  ← WCAG check of every declared bg/text pair
├── tests/tailwind/            ← proves tailwind.css builds and leaves Tailwind defaults alone
└── ui_kits/
    └── website/
        ├── components.html    ← Button, Badge, Card, Alert, Carousel — static HTML + Tailwind equivalents
        ├── carousel.css/.js   ← dependency-free scroll-snap carousel
        └── index.html + *.jsx ← full-page visual recreation (reference only; needs a local server)
```

---

## Brand essence (from the Manual)

| Pillar | Meaning |
|---|---|
| **Ludicidade** | Learn through play — bright energy, joyful visuals. |
| **Acolhimento** | Warm, friendly, safe for children and families. |
| **Clareza** | Direct, easy-to-read, no noise. |
| **Vivacidade** | Saturated colors, marked strokes, movement. |
| **Educativo** | Content respects the child's pace and universe. |

Tagline: **Brincando de Aprender** (Playing to Learn). Use it freely — it's the brand's mantra.

---

## Content fundamentals

### Language
The brand speaks **Brazilian Portuguese**, in the **first-person plural** ("a gente", "vamos", "nós") — never the corporate "you must." It addresses families like a friendly teacher, not a vendor.

### Tone matrix (from Manual §11)

| | |
|---|---|
| **Amigável** | Close, warm, no walls. |
| **Lúdica** | Playful, light, makes you smile. |
| **Didática** | Clear, patient, explains with care. |
| **Energética** | Vibrates, celebrates every win. |

### Say this · Don't say that

| ✅ Diga | ❌ Não diga |
|---|---|
| "Vamos brincar de aprender!" | "Conteúdo educacional formal" |
| "Cada conquista importa." | "Resultados garantidos" |
| "Criado pra criança ter alegria." | "Solução pedagógica avançada" |
| "A gente caminha junto com você." | "Adquira nosso pacote" |
| "Que tal a gente descobrir juntos?" | "Você precisa fazer assim" |

### Casing & punctuation
- **Headlines** — Title Case is fine, but the brand's typographic personality is loud caps (the logo and Nunito Black display). Reserve ALL-CAPS for short labels and the logotype itself.
- **Body** — sentence case, contractions encouraged ("pra" instead of "para", "a gente" instead of "nós").
- **Exclamations** — used sparingly but warmly. One per paragraph max.
- **Em-dashes** — yes, with breathing room: `—`. Used to add a friendly aside.

### Emoji
**Avoid emoji.** The brand has rich illustrated iconography (livro, globo, lápis, maçã, paleta, pincel) — those visuals replace what emoji would do elsewhere. If a teacher-style ✨ or 🎨 sneaks in, it should feel rare.

---

## Visual foundations

### Color
The palette is **highly saturated, RGB-vibrant, childhood-coded**. Pastels, desaturated tones, and neon/cyberpunk are explicitly forbidden in the Manual.

| Token | Hex | Role |
|---|---|---|
| `--ac-blue` | `#0082C2` | Primary brand color — headings (large text), base elements. |
| `--ac-blue-light` | `#0096C7` | Light blue — hero backgrounds, accents. |
| `--ac-green-splash` | `#89BD24` | Splash blobs and the **primary CTA**. Text on it is navy, never white. |
| `--ac-yellow` | `#FFCA28` | Lúdico — highlights, badges, secondary CTA. |
| `--ac-magenta` (`--ac-red`) | `#D1104A` | Pedagogical red — Nv4, strikethrough price, errors. |
| `--ac-lilac` · `--ac-teal` · `--ac-orange` | `#BA8DC0` · `#46B9B0` · `#F08055` | Level colors Nv1 · Nv2 · Nv3. |
| `--ac-forest` · `--ac-forest-dark` | `#385725` · `#233817` | Deep green accents. |
| `--ac-navy` | `#0E2A3D` | Body text. |
| `--ac-white` | `#FFFFFF` | The infinite background. |

**Recommended proportion** (per Manual §07): 55% Blue · 18% Blue Light · 12% Green · 8% Red · 7% Yellow.

**Scales.** Blue, green, red and yellow each have a 50–900 scale anchored on the brand color at 500 (`--ac-blue-500` = `#0082C2`, etc.). `--ac-blue-800` (`#005A88`) is the dark-section background.

**Neutrals.** `--ac-neutral-50…950` (pure gray) are for surfaces, borders and disabled states. **Text does not use grays** — it uses the navy family: `--ac-fg` (body), `--ac-fg-muted` (secondary), `--ac-fg-soft` (meta/captions).

**Feedback.** `success` (green-800), `error` (magenta), `warning` (yellow), `info` (blue-600), each with `-on`, `-bg`, `-border` and `-fg`.

**Levels.** Each apostila level has `base`, `-dark` (hover, 3D edge, colored large text), `-soft` (tinted surface) and `-on` (text color on the base):

| Level | Base | Dark | Text on base |
|---|---|---|---|
| Nv1 roxo/lilás | `#BA8DC0` | `#946A9A` | navy |
| Nv2 verde-água | `#46B9B0` | `#31867F` | navy |
| Nv3 laranja | `#F08055` | `#C45D33` | navy |
| Nv4 magenta | `#D1104A` | `#980C36` | white |
| Nv5 verde splash | `#89BD24` | `#658E1A` | navy |
| ABC azul | `#0082C2` | `#005A88` | white (UI uses blue-600) |

Put `.ac-level-N` on any ancestor and `--level` components (`ac-btn--level`, `ac-badge--level`, `ac-card--level`) pick up that level's colors.

### Color means level; icon means category
Color is reserved for the apostila levels — on the site today and across the app, where the child's level themes the screen. **Categories never get their own color** (the palette has no hues left that don't already mean a level). Blog categories and, in the app, activity types use the same blue chip (`.ac-tag`) and are told apart by **icon + name**:

| Category | Lucide icon |
|---|---|
| Educação Infantil | `shapes` |
| Alfabetização | `book-open` |
| Atividades em Casa | `house` |
| Desenvolvimento | `sprout` |

Decoration inside articles (step numbers, list arrows, phase labels) uses `--ac-blue-600`, or the level color when the content belongs to one level. Off-palette colors (Material Design `#E91E63`, `#5C6BC0`, `#00ACC1`…) are not allowed.

### Contrast rules (WCAG AA)
Run `python3 scripts/check_contrast.py` after changing any color — every declared pair must pass.
- **Never white text on green splash** (2.24:1), teal, lilac or orange. Use navy (`--ac-on-green`, `--ac-level-N-on`).
- **Brand blue `#0082C2` with white is 4.22:1** — fine for headings ≥ 24px, not for buttons or body. Small blue text and blue buttons use `--ac-blue-600`.
- Level `-dark` colors on white are large-text only (3.9–4.4:1), except Nv4.
- Inputs use `--ac-border-strong` (3.54:1); `--ac-border` is for dividers and cards only.

### Type
- **One family: Nunito.** Full family in `fonts/` — ExtraLight 200 through Black 900, each with italics (16 files), all declared in `fonts.css` and tokenized (`--ac-weight-*`). Official across web, app and print.
- **Weight tiers** — all 8 weights exist, but each has a place:

| Tier | Weights | Where |
|---|---|---|
| **Primary** | 400 · 700 · 900 | Every component, site and app. No DS class uses anything else. |
| **Occasional** | 600 · 800 | Only with a reason (e.g. dense app UI: tabs, lists). The site loads them only if used. |
| **Print only** | 200 · 300 · 500 | Apostilas and printed material. Not for screens — too thin for the brand and for small mobile text. |

- **Display** — Nunito **Black (900)**, uppercase, slight negative tracking (`.ac-display`). No separate display face ships with this system.
- **Headings** — Nunito 900 (h1–h3) / 800 (h4), sentence case.

| Token | px | Use |
|---|---|---|
| `--ac-text-micro` | 11 | Badges, legal |
| `--ac-text-caption` | 12 | Eyebrows, captions |
| `--ac-text-meta` | 13 | Metadata, form helpers, small buttons |
| `--ac-text-sm` | 14 | Small body, card copy |
| `--ac-text-ui` | 15 | Buttons, nav, compact body |
| `--ac-text-base` | 16 | Body |
| `--ac-text-md` | 18 | Lead, large buttons |
| `--ac-text-lg` · `xl` · `2xl` · `3xl` | 22 · 28 · 36 · 48 | h4 · h3 · h2 · h1 |
| `--ac-text-4xl` · `5xl` | 64 · 84 | Display |

h1/h2/h3 and display use `clamp()` so they scale down on mobile.

### Buttons
The **primary CTA is green** (`.ac-btn`): green splash, navy text, uppercase 15px Black, pill, 4px "3D" bottom edge, rises on hover. Variants: `--blue`, `--yellow`, `--ghost`, `--ghost-light` (on dark sections), `--level`. Sizes `--sm` / `--lg`; modifiers `--block`, `--icon`, `--inline`. See `preview/components-buttons.html`.

### Backgrounds
- **Default ground:** infinite white. The Manual is explicit: white background, brand color punctuation.
- **Splash motif:** organic green-paint blobs (the brand's signature). Use as a hero device, behind the logo, or as a level-coded patch on covers.
- **Never** use full-bleed photography, dark mode, gradients-as-background, or pastels.

### Borders & corners
- **Generous rounding.** Radii: `sm` 8 · `md` 12 · `lg` 16 (cards) · `xl` 24 · `2xl` 32 · `pill` 999 (buttons, badges).
- **Bold strokes.** When used, borders are 3–4 px solid in primary blue or white-with-shadow (cartoon offset).
- **Cartoon shadow:** elements often carry a flat **white outline + soft drop shadow** echoing the logo. Never use realistic/soft shadows alone.

### Shadows
Two shadow systems coexist:

| Token | Use |
|---|---|
| `--ac-shadow-sticker` | A flat white stroke + tight dark drop. Mimics the logo's sticker effect. |
| `--ac-shadow-card` | A soft `0 8px 24px rgba(0,118,182,.18)` blue-tinted lift for content cards. |

### Animation
- **Bounce, hover-rise, tilt-back-and-forth.** Easing should feel like a kid skipping — `cubic-bezier(.34, 1.56, .64, 1)` or a gentle spring.
- **Fades** are allowed but should never feel slow or moody.
- **Hover** on interactive elements: rise 2–4 px, scale to 1.02, optional 1–2 deg wiggle.
- **Press** on buttons: scale to 0.96, deepen color one step.

### Layout rules
- **Big headings, generous breathing.** White space is part of the design — the Manual mandates an "X" of clear space around the logo equal to the height of the "A" in the letterform.
- **Center compositions** for hero / first impression. Off-center asymmetry for repeating content.
- **Minimum digital logo widths:** 120 px for completa, 90 px for horizontal. Below those, switch versions.

### Imagery
- 2D flat illustration, **bold rounded strokes**, cartoon style.
- Subjects: open book, cartoon globe, color pencils, watercolor palette, school apple, paint splashes.
- **Mood:** warm, saturated, energetic. Children laughing/curious — never sad, anxious, or in non-educational settings.
- No photo-realism. No moody/dark filters. No grain.

### Transparency & blur
- Avoid blurs. The brand reads as crisp, sticker-flat.
- Transparency is fine on the green splash motif (60–80% on white) and for soft-overlay color accents — never on text.

---

## Iconography

The brand does **not** ship a packaged icon system in the Manual. Instead, it relies on the **illustrated pedagogical objects** that appear in and around the logo (livro, globo, paleta, lápis, pincel, maçã) — those are the brand's "icons."

For UI iconography (chevrons, hamburger, search, cart, etc.) we use **[Lucide](https://lucide.dev/)** via CDN — its rounded-stroke geometry pairs naturally with Nunito and the brand's friendly weight. Stroke width is fixed at **2.25 px** to feel slightly bolder than the Lucide default and align with the cartoon "thick line" personality.

```html
<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
<i data-lucide="book-open" stroke-width="2.25"></i>
```

**Substitution flag** — Lucide is a substitute. If a custom icon set exists in production, please share it and we'll swap.

**Emoji:** see Content Fundamentals — avoided.

**Unicode marks:** the brand uses real em-dashes (`—`), curly quotes (`"…"`), and the multiplication × for "times". Avoid `*` or `--` substitutes.

---

## Quick start

**Plain HTML**
```html
<link rel="stylesheet" href="fonts.css">
<link rel="stylesheet" href="colors_and_type.css">

<a class="ac-btn" href="#">Quero conhecer</a>
<span class="ac-badge ac-badge--yellow">Mais vendido</span>
```

**Tailwind CSS v4**
```css
@import "tailwindcss";
@import "path/to/fonts.css";      /* optional */
@import "path/to/tailwind.css";
```
Colors keep the site's existing names (`bg-brand-green`, `text-level-3-dark`, `text-body`, `bg-dark`…). Type, radius, shadow and easing are prefixed `ac-` (`text-ac-ui`, `rounded-ac-lg`, `shadow-ac-card`) so Tailwind defaults like `text-2xl` and `rounded-2xl` are untouched. Components (`.ac-btn`…) live in `@layer components`, so utilities override them. Verify with `cd tests/tailwind && npm install && npm test`.

See `ui_kits/website/components.html` for every component with its Tailwind equivalent, and `MIGRATION.md` for moving the site over.
