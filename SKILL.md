---
name: aprenda-em-casa-design
description: Use this skill to generate well-branded interfaces and assets for Aprenda em Casa, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Aprenda em Casa — Design Skill

Aprenda em Casa is a Brazilian children's-education brand with the tagline **"Brincando de Aprender"**. The visual language is loud, joyful, sticker-flat — saturated RGB colors, organic green splash blobs, rounded-cartoon display type, generous radii, infinite white grounds.

## How to use this skill

1. **Read `README.md`** — it has the full visual + voice + content rules.
2. **Inspect `colors_and_type.css`** — copy these tokens into any new artifact.
3. **Copy logos and assets** out of `assets/` rather than re-drawing them. Never invent SVG illustrations.
4. **Lift components** from `ui_kits/website/` (Header, Hero, LevelGrid, FeatureRow, Testimonial, CTABand, Footer) when building new pages.
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

## Substitutions to flag

- **Lucide** is the chosen UI icon system — there is no shipped brand icon font in the manual.

## Fonts shipped in this skill

- `fonts/Blambot_FXPro_BB_W00_Heavy.ttf` — display face (logotype + display headings).
- `fonts/Nunito-*.ttf` — full Nunito family (200–900 + italics) for body and UI.
