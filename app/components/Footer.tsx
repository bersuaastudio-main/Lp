import Image from "next/image";
import { WA_NUMBER } from "@/app/lib/constants";
import FooterWALink from "./FooterWALink";

/**
 * Footer — permukaan gelap (Studio Ink), tiga kolom editorial:
 * logo mark · kontak · navigasi, lalu baris bawah © + ikon sosial.
 */

/* Hanya section yang benar-benar dirender di page.tsx */
const FOOTER_LINKS = [
  { href: "#top", label: "Beranda" },
  { href: "#contoh", label: "Portofolio" },
  { href: "#harga", label: "Harga" },
  { href: "#faq", label: "FAQ" },
];

/* TODO: isi email & tautan sosial asli sebelum launch ("#" = placeholder).
   Hapus entri sosial yang tidak dipakai. */
const CONTACT_EMAIL = "hello@bersua.space";

/* Isi `href` dengan URL profil asli. Ikon dengan href "#" disembunyikan otomatis —
 * tautan mati lebih merusak kepercayaan daripada tidak ada ikon sama sekali. */
const ALL_SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const SOCIALS = ALL_SOCIALS.filter((s) => s.href && s.href !== "#");

/** "6287890205695" → "+62 878 9020 5695" */
const formatPhone = (n: string) =>
  `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 9)} ${n.slice(9)}`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-top">
          <a href="#top" className="footer-logo" aria-label="Bersua Lab Studio — kembali ke atas">
            <Image
              src="/img/logo-bersua-light.png"
              alt=""
              width={400}
              height={330}
              className="footer-logo-img"
              unoptimized /* PNG 400px, 24KB — sudah siap pakai */
            />
          </a>

          <div className="footer-contact">
            <p className="footer-label">Konsultasi &amp; pertanyaan</p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <FooterWALink href={`https://wa.me/${WA_NUMBER}`}>
              {formatPhone(WA_NUMBER)}
            </FooterWALink>
          </div>

          <nav className="footer-nav" aria-label="Navigasi footer">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-meta">© {year} Bersua Lab Studio</p>

          {SOCIALS.length > 0 && (
            <ul className="footer-socials">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-studio-ink);
          color: var(--color-card-white);
          padding-block: var(--spacing-64) var(--spacing-48);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: var(--spacing-48);
          align-items: start;
        }

        .footer-logo { display: inline-block; line-height: 0; }

        .footer-logo-img {
          width: clamp(72px, 7vw, 100px);
          height: auto;
          border-radius: 0;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-label {
          font-size: clamp(16px, 1.3vw, 19px);
          letter-spacing: -0.2px;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: var(--spacing-32);
        }

        .footer-contact a,
        .footer-nav a {
          font-size: clamp(17px, 1.4vw, 20px);
          line-height: 1.5;
          letter-spacing: -0.3px;
          font-weight: 400;
          color: var(--color-card-white);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .footer-contact a:hover,
        .footer-nav a:hover { opacity: 0.55; }

        .footer-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          padding-top: 4px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-24);
          margin-top: clamp(64px, 9vw, 128px);
        }

        .footer-meta {
          font-size: clamp(15px, 1.2vw, 17px);
          letter-spacing: -0.2px;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-socials {
          list-style: none;
          display: flex;
          gap: 10px;
        }

        .footer-socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 6px;
          background: var(--color-card-white);
          color: var(--color-studio-ink);
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
        }

        .footer-socials a:hover { transform: translateY(-2px); opacity: 0.85; }

        @media (max-width: 767px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-40) var(--spacing-24);
          }
          .footer-logo { grid-column: 1 / -1; }
          .footer-nav { align-items: flex-end; }
          .footer-label { margin-bottom: var(--spacing-16); }

          /* Target sentuh 44px — REQ-N6 */
          .footer-contact a,
          .footer-nav a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
          .footer-socials { gap: 8px; }
          .footer-socials a { width: 44px; height: 44px; border-radius: 8px; }
        }

        @media (max-width: 480px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-nav { align-items: flex-start; }
          .footer-bottom { flex-direction: column-reverse; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
