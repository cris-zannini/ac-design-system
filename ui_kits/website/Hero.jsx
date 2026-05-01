// Hero.jsx
function Hero() {
  return (
    <section className="ac-hero">
      <div className="ac-hero__copy">
        <div className="ac-eyebrow">Para famílias e educadores</div>
        <h1 className="ac-hero__headline">
          Brincando<br />de Aprender
        </h1>
        <p className="ac-lead ac-hero__lead">
          Apostilas que estimulam o aprendizado e a alfabetização através da diversão — pensadas pra cada faixa etária da criança.
        </p>
        <div className="ac-hero__ctas">
          <button className="ac-btn ac-btn--primary">
            Ver apostilas
            <i data-lucide="arrow-right" stroke-width="2.5" style={{width:18,height:18}}></i>
          </button>
          <button className="ac-btn ac-btn--ghost">
            <i data-lucide="play" stroke-width="2.5" style={{width:18,height:18}}></i>
            Como funciona
          </button>
        </div>
        <div className="ac-hero__trust">
          <div className="ac-hero__trust-item"><b>+5.000</b> famílias felizes</div>
          <span className="ac-hero__dot"></span>
          <div className="ac-hero__trust-item"><b>5</b> níveis lúdicos</div>
          <span className="ac-hero__dot"></span>
          <div className="ac-hero__trust-item"><b>100%</b> em casa</div>
        </div>
      </div>
      <div className="ac-hero__art">
        <img src="../../assets/logo-completa.png" alt="" className="ac-hero__logo-art" />
      </div>
    </section>
  );
}

window.Hero = Hero;
