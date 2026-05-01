// LevelGrid.jsx — apostilas grid colored by level
function LevelGrid() {
  const levels = [
    { id: "nv1", color: "#9C5BD2", label: "Nv1", age: "3–4 anos", title: "Pinta & Descobre", icon: "palette" },
    { id: "nv2", color: "#1ABFA5", label: "Nv2", age: "4–5 anos", title: "Forma & Cor",       icon: "shapes" },
    { id: "nv3", color: "#F47B20", label: "Nv3", age: "5–6 anos", title: "Letras Primeiras",  icon: "pencil" },
    { id: "nv4", color: "#E53935", label: "Nv4", age: "6–7 anos", title: "Lendo Sozinho",     icon: "book-open" },
    { id: "abc", color: "#8BC34A", label: "ABC", age: "Alfabetização", title: "Brincando o ABC", icon: "sparkles" },
  ];
  return (
    <section id="apostilas" className="ac-levels">
      <div className="ac-section__head">
        <div className="ac-eyebrow">Nossas apostilas</div>
        <h2 className="ac-h2">Um nível pra cada idade</h2>
        <p className="ac-lead">A criança aprende no ritmo dela — a gente acompanha com cor, traço e jogo.</p>
      </div>
      <div className="ac-levels__grid">
        {levels.map((l) => (
          <article key={l.id} className="ac-level" style={{ "--lvl": l.color }}>
            <div className="ac-level__cover">
              <div className="ac-level__splash"></div>
              <div className="ac-level__icon">
                <i data-lucide={l.icon} stroke-width="2.25" style={{width:36,height:36}}></i>
              </div>
              <div className="ac-level__tag">{l.label}</div>
            </div>
            <div className="ac-level__body">
              <div className="ac-level__age">{l.age}</div>
              <div className="ac-level__title">{l.title}</div>
              <button className="ac-level__cta">Conhecer<i data-lucide="arrow-right" stroke-width="2.5" style={{width:14,height:14}}></i></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

window.LevelGrid = LevelGrid;
