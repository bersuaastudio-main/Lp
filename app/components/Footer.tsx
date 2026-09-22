/**
 * Footer — permukaan Studio Ink (gelap) dengan teks putih, menutup halaman
 * dengan kontras penuh terhadap canvas cream di atasnya.
 */
/* Hanya section yang benar-benar dirender di page.tsx — jangan tambah anchor
   ke komponen yang sedang disembunyikan (Layanan, Demo) */
const FOOTER_LINKS = [
  { href: "#kategori", label: "Portofolio" },
  { href: "#untuk-siapa", label: "Untuk siapa" },
  { href: "#harga", label: "Harga" },
  { href: "#proses", label: "Cara kerja" },
  { href: "#tentang", label: "Tentang" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="section-container footer-inner">
        <nav className="footer-nav" aria-label="Navigasi footer">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="footer-meta">
          © {year} Bersua
        </p>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-studio-ink);
          color: var(--color-card-white);
          padding-block: var(--spacing-64) var(--spacing-48);
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--spacing-24);
        }

        .footer-nav {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-24);
        }

        .footer-nav a {
          font-size: var(--text-caption);
          letter-spacing: var(--tracking-caption);
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-nav a:hover { color: var(--color-card-white); }

        .footer-meta {
          font-size: var(--text-caption);
          letter-spacing: var(--tracking-caption);
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 767px) {
          /* Target sentuh 44px — REQ-N6 */
          .footer-nav a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
        }

        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-16);
          }

          .footer-nav { gap: var(--spacing-16); }
        }
      `}</style>
    </footer>
  );
}
