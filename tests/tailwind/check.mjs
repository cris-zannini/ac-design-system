// Verifica o CSS gerado: utilitários do DS existem e os padrões do Tailwind ficaram intactos.
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./out.css", import.meta.url), "utf8");
const rule = (cls) => {
  const esc = cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = css.match(new RegExp(`\\.${esc}\\s*\\{([^}]*)\\}`));
  return m ? m[1] : null;
};

const expectations = [
  // [classe, trecho esperado no corpo da regra]
  ["bg-brand-blue", "var(--ac-blue)"],
  ["bg-brand-blue-light", "var(--ac-blue-light)"],
  ["bg-brand-green", "var(--ac-green-splash)"],
  ["text-brand-red", "var(--ac-magenta)"],
  ["bg-brand-blue-600", "var(--ac-blue-600)"],
  ["bg-neutral-300", "var(--ac-neutral-300)"],
  ["bg-level-1-dark", "var(--ac-level-1-dark)"],
  ["bg-level", "var(--ac-level)"],
  ["text-body", "var(--ac-fg)"],
  ["text-muted", "var(--ac-fg-muted)"],
  ["bg-dark-mid", "var(--ac-bg-dark)"],
  ["border-border", "var(--ac-border)"],
  ["text-success-fg", "var(--ac-success-fg)"],
  ["text-ac-micro", "var(--ac-text-micro)"],
  ["text-ac-ui", "var(--ac-text-ui)"],
  ["leading-ac-tight", "var(--ac-leading-tight)"],
  ["tracking-ac-widest", "var(--ac-tracking-widest)"],
  ["rounded-ac-lg", "var(--ac-radius-lg)"],
  ["shadow-ac-card", "var(--ac-shadow-card)"],
  ["shadow-ac-sm", "var(--ac-shadow-sm)"],
  ["shadow-ac-gloss", "var(--ac-gloss)"],
  ["from-brand-blue-top", "var(--ac-blue-top)"],
  ["ease-ac-bounce", "var(--ac-ease-bounce)"],
  ["font-display", "var(--ac-font-display)"],
  // Padrões do Tailwind precisam continuar apontando para os próprios tokens
  ["text-2xl", "var(--text-2xl)"],
  ["text-lg", "var(--text-lg)"],
  ["rounded-2xl", "var(--radius-2xl)"],
  ["rounded-xl", "var(--radius-xl)"],
  ["shadow-md", "--tw-shadow"],
  ["leading-normal", "var(--leading-normal)"],
];

const defaults = [
  // [variável de tema do Tailwind, valor padrão]
  ["--text-2xl", "1.5rem"],
  ["--text-lg", "1.125rem"],
  ["--radius-2xl", "1rem"],
  ["--radius-xl", "0.75rem"],
  ["--leading-normal", "1.5"],
];

let fail = 0;
for (const [cls, needle] of expectations) {
  const body = rule(cls);
  const ok = body !== null && body.includes(needle);
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"} .${cls} → ${needle}${body === null ? " (regra ausente)" : ""}`);
}
for (const [name, value] of defaults) {
  const ok = new RegExp(`${name}:\\s*${value.replace(".", "\\.")}[;\\s]`).test(css);
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}: ${value} (padrão Tailwind preservado)`);
}
for (const cls of [".ac-btn", ".ac-badge", ".ac-card", ".ac-alert", ".ac-level-3"]) {
  const ok = css.includes(cls);
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"} componente ${cls} presente`);
}
const layered = /@layer components\s*\{[\s\S]*\.ac-btn\s*\{/.test(css);
if (!layered) fail++;
console.log(`${layered ? "ok  " : "FAIL"} componentes dentro de @layer components (utilitários vencem)`);

console.log(fail ? `\n${fail} falha(s).` : "\nTudo certo.");
process.exit(fail ? 1 : 0);
