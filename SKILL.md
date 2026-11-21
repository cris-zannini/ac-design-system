---
name: aprenda-em-casa-design
description: Use this skill to generate well-branded interfaces and assets for Aprenda em Casa, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Aprenda em Casa — Design Skill

Aprenda em Casa is a Brazilian children's-education brand with the tagline **"Brincando de Aprender"**. The visual language is loud, joyful and gently dimensional ("Volume" style: light top-to-bottom gradients, inner gloss, soft blue-tinted shadows) — saturated RGB colors, organic green splash blobs, rounded-cartoon display type, generous radii, infinite white grounds.

## How to use this skill

1. **Read `README.md`** — it has the full visual + voice + content rules.
2. **Inspect `colors_and_type.css`** — tokens + ready components (`.ac-btn`, `.ac-badge`, `.ac-card`, `.ac-alert`, `.ac-level-N`). Link it with `fonts.css`; in Tailwind v4 projects import `tailwind.css` instead.
3. **Copy logos and assets** out of `assets/` rather than re-drawing them. Never invent SVG illustrations.
4. **Lift components** from `ui_kits/website/components.html` (static HTML + Tailwind equivalents). The JSX files there are a visual reference for page sections, not production code.
5. **Stay in Brazilian Portuguese, first-person plural**, with the warm-teacher tone documented under "Content fundamentals."

## When invoked without context

Ask the user:
1. What are you making? (apostila cover, social post, landing section, deck slide, app screen…)
2. Which audience — families, educators, kids?
3. Any specific apostila level (Nv1–Nv5/ABC) or color theme?
4. Production code, or a throwaway mock?

Then produce static HTML artifacts (or production code, if asked), copying assets from this skill folder and using the tokens in `colors_and_type.css`.

## Hard rules (from the brand manual)

- **Never** distort, rotate, recolor, shadow, or crop the logo.
- **Never** use desaturated/pastel/neon palettes, dark mode, photo-realism, classic serifs, or moody filters.
- **Never** depict sad/anxious children or non-educational settings.
- **Always** allow generous white space (the "X" of clear area around the logo).
- **Always** prefer the simplified/horizontal logo at small sizes (< 120 px wide).
- **Primary CTA is green with navy text.** Never white text on green splash, teal, lilac or orange. Small blue text and blue buttons use `--ac-blue-600`, not the brand blue.
- **Text is navy** (`--ac-fg`, `--ac-fg-muted`, `--ac-fg-soft`), never gray. Grays (`--ac-neutral-*`) are for surfaces and borders.
- **Color = level, icon = category.** Never give a category (blog topic, activity type) its own color; use `.ac-tag` with an icon.
- **Screen weights are 400, 700, 900.** 600/800 only with a reason; 200/300/500 are print only.
- After changing any color, run `python3 scripts/check_contrast.py`.

## Substitutions to flag

- **Lucide** is the chosen UI icon system — there is no shipped brand icon font in the manual.

## Fonts shipped in this skill

- `fonts/Nunito-*.ttf` — full Nunito family (200–900 + italics), declared in `fonts.css`. It is the only typeface: display moments use Nunito Black (900).
