// CTABand.jsx
function CTABand() {
  return (
    <section className="ac-ctaband">
      <div className="ac-ctaband__inner">
        <div>
          <h2 className="ac-h2 ac-ctaband__title">Vamos brincar de aprender?</h2>
          <p className="ac-ctaband__lead">Comece pela apostila do nível da sua criança — chega em casa e a alegria começa.</p>
        </div>
        <button className="ac-btn ac-btn--primary ac-ctaband__btn">
          Quero a minha
          <i data-lucide="arrow-right" stroke-width="2.5" style={{width:20,height:20}}></i>
        </button>
      </div>
    </section>
  );
}

window.CTABand = CTABand;
