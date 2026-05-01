// Header.jsx — top nav for the Aprenda em Casa marketing site
const { useState } = React;

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Apostilas", href: "#apostilas" },
    { label: "Como funciona", href: "#como" },
    { label: "Famílias", href: "#familias" },
    { label: "Contato", href: "#contato" },
  ];
  return (
    <header className="ac-header">
      <a href="#" className="ac-header__brand">
        <img src="../../assets/logo-simplificada.png" alt="Aprenda em Casa" />
      </a>
      <nav className="ac-header__nav">
        {links.map((l) => (
          <a key={l.label} href={l.href}>{l.label}</a>
        ))}
      </nav>
      <div className="ac-header__cta">
        <button className="ac-btn ac-btn--primary">Quero conhecer</button>
      </div>
      <button className="ac-header__menu" onClick={() => setOpen(!open)} aria-label="Menu">
        <i data-lucide="menu" stroke-width="2.25"></i>
      </button>
    </header>
  );
}

window.Header = Header;
