import Image from "next/image";
import { WA_NUMBER } from "@/app/lib/constants";

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

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
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
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.75h4V21H3V9.75zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M16.6 2h-3.4v13.3a3 3 0 11-2.1-2.86V9a6.4 6.4 0 105.5 6.33V8.6a8 8 0 004.4 1.32V6.5A4.6 4.6 0 0116.6 2z" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
        <path d="M8.2 11.4c.9-.4 1.5-1.2 1.5-2.4 0-2.2-1.6-3-3.7-3H1v12h5.2c2.2 0 4.2-1.1 4.2-3.5 0-1.5-.7-2.7-2.2-3.1zM3.4 8h2.2c.8 0 1.6.2 1.6 1.2 0 .9-.6 1.3-1.4 1.3H3.4V8zm2.5 8H3.4v-3.3h2.6c1 0 1.7.4 1.7 1.6 0 1.2-.8 1.7-1.8 1.7zM17.6 8.6c-2.9 0-4.8 2.1-4.8 4.8 0 2.8 1.8 4.8 4.8 4.8 2.2 0 3.7-1 4.4-3.2h-2.3c-.2.8-1.2 1.2-2 1.2-1.5 0-2.3-.9-2.3-2.4h6.7c.1-3.1-1.7-5.2-4.5-5.2zm-2.2 4c.1-1.3.9-2.1 2.1-2.1 1.3 0 1.9.8 2 2.1h-4.1zM15.1 6.5h5.2V7.8h-5.2z" />
      </svg>
    ),
  },
];

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
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
              {formatPhone(WA_NUMBER)}
            </a>
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
