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
├── colors_and_type.css        ← CSS variables: palette + type scale
├── assets/                    ← logos, brand PDF
├── fonts/                     ← Nunito (5 weights) + Bangers (Blambot substitute)
├── preview/                   ← cards rendered in the Design System tab
└── ui_kits/
    └── website/               ← marketing-site UI kit (recreation)
        ├── README.md
        ├── index.html
        └── *.jsx
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
- **Headlines** — Title Case is fine, but the brand's typographic personality is loud caps (the logo and Bangers display). Reserve ALL-CAPS for short labels and the logotype itself.
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
| `--ac-blue` | `#0076B6` | Primary. Carries the brand — letterforms, headings, base elements. |
| `--ac-blue-light` | `#0096C7` | Secondary. Hovers, accents, link underlines. |
| `--ac-green-splash` | `#8BC34A` | Splash/blob backgrounds. Energy, "yes!" states. |
| `--ac-red` | `#E53935` | Pedagogical red — apple, attention, level Nv4. |
| `--ac-yellow` | `#FFCA28` | Lúdico — highlights, level coding, sun-warmth. |
| `--ac-white` | `#FFFFFF` | The infinite background. |

**Recommended proportion** (per Manual §07): 55% Blue · 18% Blue Light · 12% Green · 8% Red · 7% Yellow.

Per-level splash colors used on apostila covers:
- Nv1 → roxo (purple)
- Nv2 → verde-água (teal)
- Nv3 → laranja (orange)
- Nv4 → vermelho (red)
- Nv5/ABC → verde-claro (light green)

### Type
- **Display / logotype** — **Blambot FXPro Heavy BB** (`fonts/Blambot_FXPro_BB_W00_Heavy.ttf`). The same face used for the logotype — reserve for headlines, taglines, and short display moments. Never use for body copy.
- **UI / body** — **Nunito**, full family in `fonts/`: ExtraLight 200, Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, Black 900 (each with matching italics). Official across web, app, and print.

### Backgrounds
- **Default ground:** infinite white. The Manual is explicit: white background, brand color punctuation.
- **Splash motif:** organic green-paint blobs (the brand's signature). Use as a hero device, behind the logo, or as a level-coded patch on covers.
- **Never** use full-bleed photography, dark mode, gradients-as-background, or pastels.

### Borders & corners
- **Generous rounding.** 16–24 px on cards, 999 px (full pill) on buttons and chips.
- **Bold strokes.** When used, borders are 3–4 px solid in primary blue or white-with-shadow (cartoon offset).
- **Cartoon shadow:** elements often carry a flat **white outline + soft drop shadow** echoing the logo. Never use realistic/soft shadows alone.

### Shadows
Two shadow systems coexist:

| Token | Use |
|---|---|
| `--shadow-sticker` | A flat white stroke + tight dark drop. Mimics the logo's sticker effect. |
| `--shadow-card` | A soft `0 8px 24px rgba(0,118,182,.18)` blue-tinted lift for content cards. |

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
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="book-open" stroke-width="2.25"></i>
```

**Substitution flag** — Lucide is a substitute. If a custom icon set exists in production, please share it and we'll swap.

**Emoji:** see Content Fundamentals — avoided.

**Unicode marks:** the brand uses real em-dashes (`—`), curly quotes (`"…"`), and the multiplication × for "times". Avoid `*` or `--` substitutes.

---

## Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">
<script src="https://unpkg.com/lucide@latest"></script>

<button class="ac-btn ac-btn--primary">Quero conhecer</button>
```

See `ui_kits/website/index.html` for a full-page recreation.
