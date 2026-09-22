"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trackWAClick } from "@/app/lib/tracking";
import { WA_NUMBER, WA_DEFAULT } from "@/app/lib/constants";

/* Link nav — tiga titik keputusan: lihat contoh, lihat harga, baca FAQ.
 * "Portofolio" mengarah ke section kategori bisnis (kartu contoh halaman). */
const NAV_LINKS = [
  { id: "kategori", label: "Portofolio" },
  { id: "harga", label: "Harga" },
  { id: "faq", label: "FAQ" },
];

const NAV_WA_MESSAGE = WA_DEFAULT;

export default function Navbar() {
  const [activeId, setActiveId] = useState<string | null>(null);

  /* Scroll-spy — active link ter-underline, sesuai spec DESIGN.md.
   * Pakai scroll listener, bukan IntersectionObserver: tinggi section di sini
   * bervariasi 1–4 layar, sehingga intersectionRatio bukan sinyal yang andal. */
  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    let lastRun = 0;

    const compute = () => {
      lastRun = Date.now();

      const navHeight =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-height"),
          10
        ) || 60;
      /* Garis pembacaan sedikit di bawah navbar — section yang melewatinya yang aktif */
      const line = window.scrollY + navHeight + 24;

      let current: string | null = null;
      for (const el of targets) {
        if (el.offsetTop <= line) current = el.id;
      }

      /* Section terakhir tetap aktif saat sudah menyentuh dasar halaman */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = targets[targets.length - 1].id;

      setActiveId(current);
    };

    /* Throttle 16ms — offsetTop sudah ter-cache, jadi ini murah */
    const onScroll = () => {
      if (Date.now() - lastRun < 16) return;
      compute();
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="nav-root">
      <div className="section-container nav-inner">
        {/* Wordmark */}
        <a href="#top" className="nav-wordmark" aria-label="Bersua — kembali ke atas">
          <Image
            src="/img/logo-mark.png"
            alt=""
            width={32}
            height={32}
            priority
            className="nav-logo"
          />
          <span>Bersua</span>
        </a>

        {/* Link navigasi */}
        <nav className="nav-links" aria-label="Navigasi halaman">
          {NAV_LINKS.map((link) => (
              <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${activeId === link.id ? " is-active" : ""}`}
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Kanan: CTA persisten */}
        <div className="nav-right">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(NAV_WA_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            onClick={() => trackWAClick("navbar")}
            aria-label="Hubungi kami via WhatsApp"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      <style>{`
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          background-color: var(--color-card-white);
          /* Tanpa shadow — pemisahan lewat pergeseran warna, sesuai DESIGN.md */
          border-bottom: 1px solid var(--color-ink-08);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          gap: var(--spacing-32);
          min-height: var(--nav-height);
        }

        .nav-wordmark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 44px;
          font-size: 17px;
          font-weight: var(--weight-medium);
          letter-spacing: -0.5px;
          color: var(--color-studio-ink);
          text-decoration: none;
          flex-shrink: 0;
        }

        /* Logo mark — tile gelap (bg ikut dari file), sudut membulat */
        .nav-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-24);
          flex: 1;
        }

        .nav-link {
          font-size: var(--text-body);
          font-weight: 500;
          letter-spacing: var(--tracking-body);
          color: var(--color-ink-60);
          text-decoration: none;
          padding-block: 4px;
          border-bottom: 1.5px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }

        .nav-link-num {
          font-variant-numeric: tabular-nums;
          font-size: 11px;
          font-weight: var(--weight-display);
          opacity: 0.45;
          margin-right: 5px;
        }

        .nav-link:hover { color: var(--color-studio-ink); }

        .nav-link.is-active {
          color: var(--color-studio-ink);
          border-bottom-color: var(--color-studio-ink);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-16);
          flex-shrink: 0;
        }

        /* CTA persisten — inilah yang menutup jarak antar-CTA di sepanjang halaman */
        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-studio-ink);
          color: var(--color-card-white);
          font-size: var(--text-caption);
          font-weight: 500;
          letter-spacing: -0.2px;
          line-height: 1;
          padding: 11px 18px;
          border-radius: var(--radius-lg);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-cta:hover { opacity: 0.85; }

        /* ── Tablet: status text disembunyikan lebih dulu ── */
        @media (max-width: 1023px) {
          .nav-inner { gap: var(--spacing-24); }
          .nav-links { gap: var(--spacing-16); }
        }

        /* ── Mobile: dua baris — brand+CTA di atas, link strip di bawah ── */
        @media (max-width: 767px) {
          .nav-inner {
            flex-wrap: wrap;
            gap: 0;
            padding-block: 10px;
          }

          .nav-wordmark { order: 1; }
          .nav-right { order: 2; margin-left: auto; }

          .nav-links {
            order: 3;
            flex-basis: 100%;
            gap: var(--spacing-16);
            margin-top: 10px;
            /* Strip horizontal — 4 item terlalu sedikit untuk disembunyikan di hamburger */
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .nav-links::-webkit-scrollbar { display: none; }

          .nav-link {
            font-size: var(--text-caption);
            /* Target sentuh 44px — REQ-N6 */
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }

          .nav-cta { min-height: 44px; padding-block: 0; }
        }
      `}</style>
    </header>
  );
}
