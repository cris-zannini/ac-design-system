# Migração do site para o DS v1.1

Guia para aplicar este design system no `aprenda-em-casa-site` (HTML estático + Tailwind v4). Nada aqui foi aplicado no site ainda.

## 1. Trocar o tema (sem mudança visual)

Em `dist/css/input.css`, substitua o bloco `@theme inline { … }` do site por:

```css
@import "tailwindcss";
@import "<caminho-do-ds>/tailwind.css";
```

**Isso foi testado:** compilamos o `input.css` real do site duas vezes contra o HTML de `dist/`, uma com o `@theme` original e outra com o DS no lugar. **Os 421 utilitários que o site gera saem com o mesmo valor resolvido.** A única diferença é que `text-dark/60` passa a ter um fallback para navegadores sem `color-mix()` (Safari < 16.2), o que é uma melhoria.

Depois disso, o bloco `:root` do site (`--color-blue-primary`, `--color-text-body`, `--shadow-card`…) vira redundante. Ele pode ser apagado, trocando as referências em `body {}` por `var(--ac-fg)` e `var(--ac-bg)`.

`fonts.css` **não** precisa ser importado: o site já carrega a Nunito via `INLINE_FONTS` no `build-pages.js`, com os pesos 400, 700 e 900. Esses são exatamente os pesos da faixa principal do DS, que todos os componentes usam, então nada precisa mudar. Só acrescente 600 ou 800 ao `INLINE_FONTS` se alguma página passar a usar esses pesos de propósito.

## 2. Mudanças visuais intencionais (fazer em PRs separados)

| O quê | Hoje no site | Com o DS | Por quê |
|---|---|---|---|
| Texto do CTA verde | branco sobre `#89BD24` | navy `#0E2A3D` (`text-on-green`, ou `.ac-btn`) | branco dá 2,24:1 e reprova no WCAG AA |
| Texto cinza | `#333` `#444` `#555` `#666` `#777` `#888` `#999` | `text-body` / `text-muted` / `text-soft` | texto da marca é navy; `#888` e `#999` reprovam em contraste |
| Botão azul | `#0082C2` com texto branco | `bg-brand-blue-600` (`#0075AF`) | 4,22:1 → 5,04:1 |
| Feedback do quiz | `#4CAF50` / `#E53935` | `success` / `error` (ou `.ac-alert--*`) | cores fora da paleta |

## 3. Tabela de troca: hex fixo → token

### Neutros (superfícies e bordas)

| Hex no site | Uso | Token Tailwind |
|---|---|---|
| `#FAFAFA` | superfície | `bg-neutral-50` / `bg-surface-subtle` |
| `#F5F5F5` | superfície | `bg-neutral-100` / `bg-surface-muted` |
| `#F0F0F0` | superfície / divisor | `bg-neutral-200` |
| `#E8E8E8` `#EBEBEB` | borda | `border-neutral-300` / `border-border` |
| `#E0E0E0` | borda forte | `border-neutral-400` |
| `#AAAAAA` | desabilitado | `text-disabled` / `neutral-500` |
| `#111` | texto quase preto | `text-body` |

### Texto

| Hex no site | Token |
|---|---|
| `#333` `#444` | `text-body` (`#0E2A3D`) |
| `#555` `#666` | `text-muted` (`#4A6A7E`) |
| `#777` `#888` `#999` | `text-soft` (`#5F7A8C`) |

> Se a troca para navy ficar forte demais num primeiro momento, `neutral-700` (`#666`), `neutral-800` (`#444`) e `neutral-900` (`#333`) reproduzem os cinzas atuais 1:1. Mas o alvo é o navy.

### Cores

| Hex no site | Token |
|---|---|
| `#4CAF50` `#43A047` `#1C7B39` | `success` / `success-fg` |
| `#E8F5E9` | `success-bg` |
| `#E53935` | `error` (`#D1104A`) |
| `#FFF5F5` `#FFD0CC` | `error-bg` / `error-border` |
| `#FB8C00` `#FF9800` `#FF6F00` | `warning` (amarelo) ou `brand-orange` / `level-3`, conforme o contexto |
| `#FFF3E0` | `warning-bg` |
| `#0076B6` | `brand-blue-600` (era o azul primário antigo) |
| `#8BC34A` | `brand-green` (era o verde antigo) |
| `#1A3D00` `#1A5C0A` | `brand-forest-dark` / `brand-green-900` |
| `#002233` | `brand-navy` |
| `#F0F7FF` `#EFF4FF` | `bg-soft` (`#EDF7FD`) |

### Categorias do blog: cor = nível, ícone = categoria

As cores de categoria e de decoração do blog saem. Hoje são cores do Material Design, em `dist/blog/` (6 arquivos).

| Hoje | Com o DS |
|---|---|
| chip `style="background-color:#E91E6315;color:#E91E63"` (Educação Infantil) | `<a class="ac-tag">` + ícone `shapes` |
| chip `#5C6BC0` (Alfabetização) | `.ac-tag` + ícone `book-open` |
| chip `#43A047` (Atividades em Casa) | `.ac-tag` + ícone `house` |
| chip `#FB8C00` (Desenvolvimento) | `.ac-tag` + ícone `sprout` |
| barrinha vertical colorida ao lado do título da seção | `bg-brand-blue-600` (ou removê-la) |
| números de passo, setas, etiquetas de fase em `#00ACC1` `#9C27B0` `#2196F3` `#7B61FF` `#00897B` | `brand-blue-600` (texto) / `bg-brand-blue-600 text-on-blue` (sólido), ou a cor do nível quando o conteúdo for de um nível |

### Tamanhos de texto

| Classe no site | Ocorrências | Token |
|---|---|---|
| `text-[10px]` | 26 | `text-ac-micro` (11) |
| `text-[11px]` | 183 | `text-ac-micro` |
| `text-[12px]` | 179 | `text-ac-caption` |
| `text-[13px]` | 359 | `text-ac-meta` |
| `text-[14px]` | 454 | `text-ac-sm` |
| `text-[15px]` | 427 | `text-ac-ui` |
| `text-[16px]` / `.text-md` | 166 | `text-ac-base` |
| `text-[17px]` `text-[18px]` | 55 | `text-ac-md` (18) |
| `text-[20px]` `text-[22px]` | 19 | `text-ac-lg` (22) |
| `text-[24px]` `text-[28px]` | 4 | `text-ac-xl` (28) |
| `text-[32px]` | 5 | `text-ac-2xl` (36) |

`text-lg`, `text-2xl`, `text-3xl`, `rounded-2xl`, `shadow-md` etc. continuam funcionando, porque o DS não sobrescreve os padrões do Tailwind. Podem ser migrados aos poucos para `text-ac-*`, `rounded-ac-*` e `shadow-ac-*`.

## 4. Componentes

| No site | No DS |
|---|---|
| `.btn` + `bg-brand-green` | `.ac-btn` |
| `.btn` + `bg-brand-yellow` | `.ac-btn ac-btn--yellow` |
| botão "inline" no texto | `.ac-btn ac-btn--inline` |
| `.badge` | `.ac-badge` (+ variante) |
| `.badge-outline` | `.ac-badge ac-badge--outline` |
| `.badge-monochrome` | `.ac-badge ac-badge--on-dark ac-badge--lg` |
| chips de categoria do blog | `.ac-tag` + ícone |
| `carousel-wrap` / `carousel-track` + `/js/carousel.js` | `.ac-carousel` / `.ac-carousel__track` + `ui_kits/website/carousel.js` (opcional; o do site continua funcionando) |
| cores de nível em páginas `/nivel-N/` | `class="ac-level-N"` no `<main>` e `ac-btn--level` / `ac-badge--level` / `ac-card--level` dentro |

Exemplos completos: `ui_kits/website/components.html`.
