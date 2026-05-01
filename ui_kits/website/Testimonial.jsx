// Testimonial.jsx
function Testimonial() {
  return (
    <section id="familias" className="ac-testi">
      <div className="ac-testi__card">
        <i data-lucide="quote" stroke-width="2.25" style={{width:40,height:40,color:"#0076B6"}}></i>
        <p className="ac-testi__quote">
          A Lia me pede a apostila antes do café. Aprender virou a parte mais alegre do dia da gente.
        </p>
        <div className="ac-testi__sig">
          <div className="ac-testi__avatar"></div>
          <div>
            <div className="ac-testi__name">Marina &amp; Lia, 5 anos</div>
            <div className="ac-testi__role">Família Aprenda em Casa · Curitiba</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Testimonial = Testimonial;
