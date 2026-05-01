// FeatureRow.jsx
function FeatureRow() {
  const features = [
    { icon: "heart",     title: "Lúdico de verdade",   desc: "Atividades pensadas pra criança rir enquanto descobre." },
    { icon: "sparkles",  title: "Cada conquista importa", desc: "Pequenos passos celebrados — porque autoestima é tudo." },
    { icon: "users",     title: "Família junto",       desc: "Materiais que aproximam pais, educadores e crianças." },
  ];
  return (
    <section id="como" className="ac-features">
      {features.map((f) => (
        <div key={f.title} className="ac-feature">
          <div className="ac-feature__icon">
            <i data-lucide={f.icon} stroke-width="2.25" style={{width:32,height:32}}></i>
          </div>
          <h3 className="ac-feature__title">{f.title}</h3>
          <p className="ac-feature__desc">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}

window.FeatureRow = FeatureRow;
