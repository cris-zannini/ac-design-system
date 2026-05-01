// Footer.jsx
function Footer() {
  return (
    <footer id="contato" className="ac-footer">
      <div className="ac-footer__cols">
        <div className="ac-footer__brand">
          <img src="../../assets/logo-simplificada.png" alt="Aprenda em Casa" />
          <p>Brincando de Aprender — desde o primeiro rabisco.</p>
        </div>
        <div className="ac-footer__col">
          <h5>Apostilas</h5>
          <a href="#">Nv1 · 3–4 anos</a>
          <a href="#">Nv2 · 4–5 anos</a>
          <a href="#">Nv3 · 5–6 anos</a>
          <a href="#">Nv4 · 6–7 anos</a>
          <a href="#">ABC · Alfabetização</a>
        </div>
        <div className="ac-footer__col">
          <h5>A gente</h5>
          <a href="#">Quem somos</a>
          <a href="#">Nosso jeito</a>
          <a href="#">Famílias</a>
          <a href="#">Educadores</a>
        </div>
        <div className="ac-footer__col">
          <h5>Conversa</h5>
          <a href="#">oi@aprendaemcasa.art.br</a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
      </div>
      <div className="ac-footer__base">
        <span>© Aprenda em Casa · 2026</span>
        <span>Brincando de Aprender</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
