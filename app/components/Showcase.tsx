"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "./Section";

/**
 * 04 · Contoh Hasil Kerja — showcase satu panggung besar + tab thumbnail.
 *
 * REQ-C5A.1 — judul memakai "Contoh Hasil Kerja", bukan "Portofolio".
 * REQ-C5A.4 — chip kedua di panggung memuat keputusan desain + alasannya.
 * REQ-C5A.5 — tanpa angka hasil / testimoni.
 *
 * Mockup sumbernya persegi & potret, sedangkan panggungnya lanskap. Supaya
 * tidak ter-crop: gambar utuh (contain) di depan, salinannya yang diblur
 * mengisi latar.
 */
const demos = [
  {
    tab: "Supplier",
    img: "/img/supplier-distributor.webp",
    alt: "Contoh halaman supplier hasil tani (bisnis fiktif)",
    chip: "Supplier hasil tani · Dieng",
    decision: "Foto produk di layar pertama — pembeli grosir langsung tahu apa yang dijual.",
  },
  {
    tab: "Jasa",
    img: "/img/Services.webp",
    alt: "Contoh halaman konsultan psikologi (bisnis fiktif)",
    chip: "Konsultan psikologi",
    decision: "Wajah konsultan di depan — jasa personal dibeli karena orangnya.",
  },
  {
    tab: "Brand",
    img: "/img/bbrand.webp",
    alt: "Contoh halaman brand batik tulis Gatra (bisnis fiktif)",
    chip: "Gatra · Batik tulis",
    decision: "Proses membatik jadi hero — harga premium perlu cerita pembuatannya.",
  },
  {
    tab: "Hospitality",
    img: "/img/Hospitality.webp",
    alt: "Contoh halaman resort Ardène Bali (bisnis fiktif)",
    chip: "Ardène · Bali resort",
    decision: "Suasana kolam lebih dulu dari daftar fasilitas — tamu memesan perasaan.",
  },
];

/** Lama tiap slide sebelum pindah otomatis */
const SLIDE_MS = 6000;

export default function Showcase() {
  const [active, setActive] = useState(0);

  /* Autoplay dimatikan untuk pengguna yang meminta gerak minimal */
  const next = () => setActive((i) => (i + 1) % demos.length);
  const current = demos[active];

  return (
    <Section
      id="contoh"
      track="demo"
      heading="Featured Project"
      surface="ink"
      sub="Bersua membantu bisnis membangun website dari konsep, desain, hingga siap digunakan sesuai dengan karakter dan kebutuhan bisnis Anda."
    >
      <div className="sc-stage" aria-roledescription="carousel" aria-label="Featured Project">
        {/* Slide ditumpuk; hanya yang aktif terlihat (crossfade) */}
        {demos.map((d, i) => (
          <div
            key={d.tab}
            className={`sc-slide${i === active ? " is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <Image
              src={d.img}
              alt=""
              fill
              sizes="100vw"
              unoptimized
              className="sc-backdrop"
            />
            <Image
              src={d.img}
              alt={d.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1240px"
              unoptimized
              priority={i === 0}
              className="sc-img"
            />
          </div>
        ))}

        <span className="sc-shade" aria-hidden="true" />

        {/* Chip status — kiri atas. key memicu ulang animasi masuk tiap ganti slide */}
        <div className="sc-chips" key={active} aria-live="polite">
          <p className="sc-chip">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5.3 8.2l1.8 1.8 3.6-3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {current.chip}
          </p>
          <p className="sc-chip sc-chip-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.8l5 2v3.6c0 3.1-2.1 5.6-5 6.8-2.9-1.2-5-3.7-5-6.8V3.8l5-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            {current.decision}
          </p>
        </div>

        {/* Tab thumbnail — tengah bawah, garis progres di bawah yang aktif */}
        <div className="sc-tabs" role="tablist">
          {demos.map((d, i) => (
            <button
              key={d.tab}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`sc-tab${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="sc-tab-label">{d.tab}</span>
              <span className="sc-thumb">
                <Image src={d.img} alt="" fill sizes="140px" unoptimized className="sc-thumb-img" />
              </span>
              <span className="sc-progress" aria-hidden="true">
                {i === active && (
                  <span
                    key={active}
                    className="sc-progress-bar"
                    onAnimationEnd={next}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .sc-stage {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #0d0d0d;
          isolation: isolate;
        }

        .sc-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-slide.is-active { opacity: 1; }

        .sc-stage img { border-radius: 0; }

        /* Latar: gambar yang sama diblur & digelapkan, mengisi sisa lanskap */
        .sc-backdrop {
          object-fit: cover;
          filter: blur(40px) brightness(0.45) saturate(1.1);
          transform: scale(1.2);
        }

        /* Depan: mockup utuh, tidak ter-crop */
        .sc-img {
          object-fit: contain;
          transform: scale(1.04);
          transition: transform 6s linear;
        }

        .sc-slide.is-active .sc-img { transform: scale(1); }

        /* Gelap di kiri & bawah menjaga chip dan tab tetap terbaca */
        .sc-shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 40%),
            linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 32%);
        }

        .sc-chips {
          position: absolute;
          top: clamp(16px, 3vw, 36px);
          left: clamp(16px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          max-width: min(420px, 70%);
        }

        .sc-chip {
          display: inline-flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(10, 10, 10, 0.35);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--color-card-white);
          font-size: clamp(14px, 1.2vw, 17px);
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: -0.3px;
          animation: sc-chip-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sc-chip svg { flex-shrink: 0; margin-top: 2px; }

        .sc-chip-muted {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
          border-color: rgba(255, 255, 255, 0.08);
          animation-delay: 0.15s;
        }

        @keyframes sc-chip-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sc-tabs {
          position: absolute;
          left: 50%;
          bottom: clamp(14px, 2vw, 20px);
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
        }

        .sc-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.65);
          -webkit-tap-highlight-color: transparent;
          transform: translateY(6px);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease;
        }

        .sc-tab:hover { color: var(--color-card-white); }

        .sc-tab.is-active {
          color: var(--color-card-white);
          transform: translateY(0);
        }

        .sc-tab-label {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }

        .sc-thumb {
          position: relative;
          display: block;
          width: 130px;
          aspect-ratio: 16 / 9;
          border-radius: 4px;
          overflow: hidden;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .sc-thumb-img { object-fit: cover; }

        .sc-tab:hover .sc-thumb,
        .sc-tab.is-active .sc-thumb { opacity: 1; }

        .sc-progress {
          display: block;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.18);
        }

        .sc-tab:not(.is-active) .sc-progress { background: transparent; }

        .sc-progress-bar {
          display: block;
          height: 100%;
          background: var(--color-card-white);
          transform-origin: left;
          animation: sc-progress ${SLIDE_MS}ms linear both;
        }

        /* Berhenti saat kursor di panggung — beri waktu membaca */
        .sc-stage:hover .sc-progress-bar { animation-play-state: paused; }


        @keyframes sc-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .sc-tab:focus-visible {
          outline: 2px solid var(--color-card-white);
          outline-offset: 4px;
        }

        /* Tablet: panggung sedikit lebih tinggi */
        @media (max-width: 1023px) {
          .sc-stage { aspect-ratio: 4 / 3; }
        }

        /* Mobile: potret, tab jadi baris yang bisa digeser */
        @media (max-width: 640px) {
          .sc-stage { aspect-ratio: 4 / 5; }
          .sc-chips { max-width: calc(100% - 32px); gap: 8px; }
          .sc-chip { padding: 10px 12px; font-size: 13px; }
          .sc-tabs {
            left: 0;
            right: 0;
            transform: none;
            justify-content: center;
            gap: 8px;
            padding-inline: 12px;
          }
          .sc-thumb { width: 72px; }
          .sc-tab-label { font-size: 9px; letter-spacing: 0.3px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-img { transition: none; transform: none; }
          /* Tanpa animasi progres = tanpa ganti slide otomatis. !important
             mengalahkan aturan global yang memendekkan durasi jadi 0.01ms
             (yang justru akan membuat slide berganti terus-menerus). */
          .sc-progress-bar { animation: none !important; transform: scaleX(1); }
        }
      `}</style>
    </Section>
  );
}
