#!/usr/bin/env python3
"""Verifica o contraste WCAG dos pares fundo/texto declarados no design system.

Lê os tokens de colors_and_type.css (bloco :root), resolve var() e checa
cada par de PAIRS. Sai com código 1 se algum par ficar abaixo do mínimo.

    python3 scripts/check_contrast.py
"""
import re
import sys
from pathlib import Path

CSS = Path(__file__).resolve().parent.parent / "colors_and_type.css"

AA = 4.5        # texto normal
AA_LARGE = 3.0  # texto grande (>= 24px ou >= 18.66px negrito) e elementos de UI

# (fundo, texto, mínimo, descrição)
PAIRS = [
    # Texto sobre o chão branco
    ("--ac-bg", "--ac-fg", AA, "corpo"),
    ("--ac-bg", "--ac-fg-muted", AA, "texto secundário"),
    ("--ac-bg", "--ac-fg-soft", AA, "meta / legenda"),
    ("--ac-bg", "--ac-fg-link", AA, "link"),
    ("--ac-bg", "--ac-fg-brand", AA_LARGE, "título azul (texto grande)"),
    ("--ac-bg", "--ac-neutral-700", AA, "menor cinza para texto"),
    ("--ac-bg", "--ac-border-strong", AA_LARGE, "borda de input (não-texto)"),
    ("--ac-bg-soft", "--ac-fg", AA, "corpo em seção soft"),
    ("--ac-bg-soft", "--ac-fg-muted", AA, "secundário em seção soft"),
    ("--ac-bg-warm", "--ac-fg-muted", AA, "secundário em seção warm"),
    ("--ac-bg-dark", "--ac-fg-on-dark", AA, "texto em seção escura"),
    # Botões
    ("--ac-green-500", "--ac-on-green", AA, "botão primário"),
    ("--ac-green-600", "--ac-on-green", AA, "botão primário hover"),
    ("--ac-blue-600", "--ac-on-blue", AA, "botão azul"),
    ("--ac-blue-700", "--ac-on-blue", AA, "botão azul hover"),
    ("--ac-yellow-500", "--ac-on-yellow", AA, "botão amarelo"),
    ("--ac-yellow-400", "--ac-on-yellow", AA, "botão amarelo hover"),
    ("--ac-bg", "--ac-blue-600", AA, "botão ghost"),
    ("--ac-blue-50", "--ac-blue-600", AA, "botão ghost hover"),
    ("--ac-bg-dark", "--ac-white", AA, "botão ghost-light"),
    # Níveis
    ("--ac-level-1", "--ac-level-1-on", AA, "Nv1 sólido"),
    ("--ac-level-2", "--ac-level-2-on", AA, "Nv2 sólido"),
    ("--ac-level-3", "--ac-level-3-on", AA, "Nv3 sólido"),
    ("--ac-level-4", "--ac-level-4-on", AA, "Nv4 sólido"),
    ("--ac-level-5", "--ac-level-5-on", AA, "Nv5 sólido"),
    ("--ac-blue-600", "--ac-level-abc-on", AA, "ABC sólido (UI)"),
    ("--ac-level-abc", "--ac-level-abc-on", AA_LARGE, "ABC capa (texto grande)"),
    ("--ac-bg", "--ac-level-1-dark", AA_LARGE, "Nv1 dark sobre branco (texto grande)"),
    ("--ac-bg", "--ac-level-2-dark", AA_LARGE, "Nv2 dark sobre branco (texto grande)"),
    ("--ac-bg", "--ac-level-3-dark", AA_LARGE, "Nv3 dark sobre branco (texto grande)"),
    ("--ac-bg", "--ac-level-4-dark", AA, "Nv4 dark sobre branco"),
    ("--ac-bg", "--ac-level-5-dark", AA_LARGE, "Nv5 dark sobre branco (texto grande)"),
    ("--ac-level-1-soft", "--ac-fg", AA, "Nv1 soft + corpo"),
    ("--ac-level-2-soft", "--ac-fg", AA, "Nv2 soft + corpo"),
    ("--ac-level-3-soft", "--ac-fg", AA, "Nv3 soft + corpo"),
    ("--ac-level-4-soft", "--ac-fg", AA, "Nv4 soft + corpo"),
    ("--ac-level-5-soft", "--ac-fg", AA, "Nv5 soft + corpo"),
    # Badges
    ("--ac-blue-50", "--ac-blue-700", AA, "badge padrão"),
    ("--ac-red-500", "--ac-on-red", AA, "badge vermelho"),
    ("--ac-neutral-100", "--ac-fg-muted", AA, "badge neutro"),
    # Tag de categoria
    ("--ac-blue-50", "--ac-blue-700", AA, "tag de categoria"),
    ("--ac-blue-100", "--ac-blue-700", AA, "tag de categoria hover"),
    ("--ac-blue-600", "--ac-on-blue", AA, "tag de categoria ativa"),
    ("--ac-bg", "--ac-blue-600", AA, "decoração em artigo (números, setas)"),
    # Feedback
    ("--ac-success", "--ac-success-on", AA, "sucesso sólido"),
    ("--ac-success-bg", "--ac-success-fg", AA, "alerta sucesso"),
    ("--ac-bg", "--ac-success-fg", AA, "texto sucesso"),
    ("--ac-error", "--ac-error-on", AA, "erro sólido"),
    ("--ac-error-bg", "--ac-error-fg", AA, "alerta erro"),
    ("--ac-bg", "--ac-error-fg", AA, "texto erro"),
    ("--ac-warning", "--ac-warning-on", AA, "aviso sólido"),
    ("--ac-warning-bg", "--ac-warning-fg", AA, "alerta aviso"),
    ("--ac-info", "--ac-info-on", AA, "info sólido"),
    ("--ac-info-bg", "--ac-info-fg", AA, "alerta info"),
    ("--ac-bg", "--ac-info-fg", AA, "texto info"),
]

# Pares com transparência: (fundo base, overlay rgba do fundo, texto rgba, mínimo, descrição)
ALPHA_PAIRS = [
    ("--ac-bg-dark", (255, 255, 255, 0.14), (255, 255, 255, 1.0), AA, "badge on-dark"),
    ("--ac-bg-dark", (0, 0, 0, 0.0), (255, 255, 255, 0.82), AA, "texto on-dark-muted"),
]


def load_tokens():
    root = re.search(r":root\s*\{(.*?)\n\}", CSS.read_text(), re.S).group(1)
    root = re.sub(r"/\*.*?\*/", "", root, flags=re.S)
    return {k: v.strip() for k, v in re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", root)}


def resolve(name, tokens, depth=0):
    if depth > 10:
        raise ValueError(f"ciclo em {name}")
    value = tokens[name]
    m = re.fullmatch(r"var\((--[\w-]+)\)", value)
    return resolve(m.group(1), tokens, depth + 1) if m else value


def hex_rgb(value):
    h = value.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if not re.fullmatch(r"[0-9a-fA-F]{6}", h):
        raise ValueError(f"cor não suportada: {value}")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def blend(base, rgba):
    r, g, b, a = rgba
    return tuple(round(a * c + (1 - a) * bc) for c, bc in zip((r, g, b), base))


def luminance(rgb):
    def ch(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a, b):
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def main():
    tokens = load_tokens()
    failures = 0
    rows = []
    for bg, fg, minimum, label in PAIRS:
        r = ratio(hex_rgb(resolve(bg, tokens)), hex_rgb(resolve(fg, tokens)))
        rows.append((r >= minimum, r, minimum, label, f"{fg} sobre {bg}"))
    for bg, overlay, text, minimum, label in ALPHA_PAIRS:
        base = blend(hex_rgb(resolve(bg, tokens)), overlay)
        r = ratio(base, blend(base, text))
        rows.append((r >= minimum, r, minimum, label, f"rgba sobre {bg}"))
    for ok, r, minimum, label, detail in rows:
        failures += not ok
        print(f"{'ok  ' if ok else 'FAIL'} {r:5.2f} (mín {minimum})  {label:<38} {detail}")
    print(f"\n{len(rows) - failures}/{len(rows)} pares passam.")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
