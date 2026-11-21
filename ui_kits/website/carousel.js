/**
 * carousel.js — carrossel com scroll-snap, sem dependências.
 * Substitui ProductCarousel.tsx (Next.js) para o site em HTML estático.
 *
 * Markup:
 *   <div class="ac-carousel" data-autoplay="3500" aria-label="Fotos da apostila">
 *     <div class="ac-carousel__track">
 *       <img src="…" alt="…">  (qualquer filho direto vira um slide)
 *     </div>
 *   </div>
 *
 * - Setas (desktop) e pontos são criados aqui.
 * - Swipe e teclado vêm de graça do scroll nativo.
 * - Autoplay pausa com hover/foco e é desligado com prefers-reduced-motion.
 */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init(root) {
    var track = root.querySelector(".ac-carousel__track");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) return;

    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carrossel");
    track.setAttribute("tabindex", "0");

    function button(cls, label, glyph) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ac-carousel__arrow " + cls;
      b.setAttribute("aria-label", label);
      b.innerHTML = glyph;
      root.appendChild(b);
      return b;
    }
    var chevron = function (d) {
      return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
    };
    var prev = button("ac-carousel__arrow--prev", "Anterior", chevron("M15 18l-6-6 6-6"));
    var next = button("ac-carousel__arrow--next", "Próximo", chevron("M9 18l6-6-6-6"));

    var nav = document.createElement("div");
    nav.className = "ac-carousel__dots";
    var dots = slides.map(function (_, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "ac-carousel__dot";
      d.setAttribute("aria-label", "Imagem " + (i + 1) + " de " + slides.length);
      d.addEventListener("click", function () { go(i); restart(); });
      nav.appendChild(d);
      return d;
    });
    root.appendChild(nav);

    function index() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }
    function go(i) {
      var n = (i + slides.length) % slides.length;
      track.scrollTo({ left: n * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    }
    function sync() {
      var cur = index();
      dots.forEach(function (d, i) { d.setAttribute("aria-current", i === cur ? "true" : "false"); });
    }

    prev.addEventListener("click", function () { go(index() - 1); restart(); });
    next.addEventListener("click", function () { go(index() + 1); restart(); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); restart(); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); restart(); }
    });

    var raf;
    track.addEventListener("scroll", function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    }, { passive: true });
    sync();

    var delay = parseInt(root.getAttribute("data-autoplay"), 10);
    var timer = null;
    var paused = false;
    function stop() { clearInterval(timer); timer = null; }
    function start() {
      if (!delay || reduceMotion || paused) return;
      stop();
      timer = setInterval(function () { go(index() + 1); }, delay);
    }
    function restart() { start(); }
    ["mouseenter", "focusin", "touchstart"].forEach(function (ev) {
      root.addEventListener(ev, function () { paused = true; stop(); }, { passive: true });
    });
    ["mouseleave", "focusout"].forEach(function (ev) {
      root.addEventListener(ev, function () { paused = false; start(); });
    });
    start();
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll(".ac-carousel"), init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
