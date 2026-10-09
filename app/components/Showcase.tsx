"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Section from "./Section";
import CTAButton from "./CTAButton";
import { CTA_LABEL, WA_DEFAULT } from "@/app/lib/constants";

/**
 * 04 · Contoh Hasil Kerja — showcase satu panggung besar + tab thumbnail.
 *
 * REQ-C5A.1 — judul memakai "Contoh Hasil Kerja", bukan "Portofolio".
 * REQ-C5A.4 — chip kedua di panggung memuat keputusan desain + alasannya.
 * REQ-C5A.5 — tanpa angka hasil / testimoni.
 *
 * Gambar = tangkapan layar hero tiap website (WebP 1600px di /img/porto-web).
 * Gambar memenuhi panggung penuh; tinggi panggung mengikuti rasio gambar aktif
 * (padding-top %, bisa dianimasikan). Keterangan & tab diletakkan di bawah
 * panggung supaya tidak menutupi tangkapan layar.
 */
const demos = [
  {
    tab: "Batik",
    img: "/img/porto-web/gatra-v2.webp",
    w: 1600,
    h: 748,
    alt: "Website Gatra — batik tulis & tekstil Indonesia",
    chip: "Gatra · Batik tulis",
    decision: "Proses membatik jadi hero — harga premium perlu cerita pembuatannya.",
  },
  {
    tab: "Greenhouse",
    img: "/img/porto-web/hayati-house.webp",
    w: 1600,
    h: 811,
    alt: "Website Hayati House — solusi greenhouse untuk pertanian modern",
    chip: "Hayati House · Greenhouse & hidroponik",
    decision: "Struktur greenhouse nyata di layar pertama — pembeli proyek komersial butuh bukti skala.",
  },
  {
    tab: "Energi",
    img: "/img/porto-web/aruna-energi.webp",
    w: 1600,
    h: 777,
    alt: "Website Aruna Energi — panel surya Indonesia",
    chip: "Aruna Energi · Panel surya",
    decision: "Studi kasus langsung di hero — keputusan investasi energi butuh bukti, bukan janji.",
  },
  {
    tab: "Interior",
    img: "/img/porto-web/sakhia-v2.webp",
    w: 1600,
    h: 765,
    alt: "Website Sakhia — gorden custom Bali",
    chip: "Sakhia · Gorden custom, Bali",
    decision: "Ruang yang sudah jadi lebih dulu dari katalog — orang membeli suasana, bukan kain.",
  },
  {
    tab: "Fashion",
    img: "/img/porto-web/niken-ecoprint.webp",
    w: 1600,
    h: 773,
    alt: "Website Niken Ecoprint — fashion ecoprint dari Balikpapan",
    chip: "Niken Ecoprint · Fashion, Balikpapan",
    decision: "Produk dikenakan, bukan dipajang — berbahasa Inggris untuk pembeli luar negeri.",
  },
  {
    tab: "Agrikultur",
    img: "/img/porto-web/freshville.webp",
    w: 1600,
    h: 750,
    alt: "Website Freshville — sayuran premium untuk dapur profesional",
    chip: "Freshville · Sayuran premium B2B",
    decision: "Segmen pembeli disebut jelas — restoran dan hotel langsung tahu ini untuk mereka.",
  },
];

const SELECT_EVENT = "showcase:select";

/** Dipanggil dari section lain (kartu Untuk Siapa): gulir ke Featured Project
 *  dan aktifkan tab portofolio ke-`index`. */
export function selectShowcase(index: number) {
  window.dispatchEvent(new CustomEvent<number>(SELECT_EVENT, { detail: index }));
  document.getElementById("contoh")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Lama tiap slide sebelum pindah otomatis */
const SLIDE_MS = 6000;

export default function Showcase() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  /* Di HP baris tab bisa digeser — pastikan tab aktif selalu terlihat.
     Hanya menggeser kontainer tab (scrollLeft), bukan halaman. */
  useEffect(() => {
    const box = tabsRef.current;
    const tab = box?.children[active] as HTMLElement | undefined;
    if (!box || !tab || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({ left: tab.offsetLeft - 12, behavior: "smooth" });
  }, [active]);

  /* Pilihan tab dari kartu Untuk Siapa */
  useEffect(() => {
    const onSelect = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener(SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_EVENT, onSelect);
  }, []);

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
      <div className="sc-wrap">
        <div
          className="sc-stage"
          aria-roledescription="carousel"
          aria-label="Featured Project"
          style={{ paddingTop: `${(current.h / current.w) * 100}%` }}
        >
          {/* Slide ditumpuk; hanya yang aktif terlihat (crossfade) */}
          {demos.map((d, i) => (
            <div
              key={d.tab}
              className={`sc-slide${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
            >
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
        </div>

        <div className="sc-meta">
          {/* Keterangan — key memicu ulang animasi masuk tiap ganti slide */}
          <div className="sc-caption" key={active} aria-live="polite">
            <p className="sc-name">{current.chip}</p>
            <p className="sc-decision">{current.decision}</p>
          </div>

          {/* Tab thumbnail — garis progres di bawah yang aktif */}
          <div className="sc-tabs" role="tablist" ref={tabsRef}>
            {demos.map((d, i) => (
              <button
                key={d.tab}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`sc-tab${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="sc-thumb">
                  <Image src={d.img} alt="" fill sizes="140px" unoptimized className="sc-thumb-img" />
                </span>
                <span className="sc-tab-label">{d.tab}</span>
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
      </div>

      {/* Zona "sudah yakin" — satu pintu ke WhatsApp setelah bukti terkuat */}
      <div className="sc-cta">
        <CTAButton location="showcase" message={WA_DEFAULT} inverted>
          {CTA_LABEL}
        </CTAButton>
      </div>

      <style>{`
        /* Tinggi panggung = lebar × rasio gambar aktif (padding-top di inline
           style). padding beranimasi, jadi pergantian rasio terasa mulus. */
        .sc-stage {
          position: relative;
          height: 0;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #0d0d0d;
          isolation: isolate;
          transition: padding-top 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-slide.is-active { opacity: 1; }

        /* Gambar memenuhi panggung penuh — rasionya sama, jadi tidak ter-crop */
        .sc-img {
          object-fit: cover;
          border-radius: 0;
          transform: scale(1.02);
          transition: transform 6s linear;
        }

        .sc-slide.is-active .sc-img { transform: scale(1); }

        .sc-cta {
          display: flex;
          justify-content: center;
          margin-top: clamp(40px, 5vw, 64px);
        }

        @media (max-width: 480px) {
          .sc-cta a { width: 100%; }
        }

        /* ── Bar bawah: keterangan kiri · tab kanan ── */
        .sc-meta {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--spacing-32);
          margin-top: var(--spacing-24);
        }

        .sc-caption {
          max-width: 440px;
          animation: sc-chip-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sc-name {
          font-size: clamp(17px, 1.4vw, 20px);
          line-height: 1.35;
          letter-spacing: -0.3px;
          color: var(--color-card-white);
          margin-bottom: 6px;
        }

        .sc-decision {
          font-size: 15px;
          line-height: 1.5;
          letter-spacing: -0.2px;
          color: rgba(255, 255, 255, 0.65);
        }

        @keyframes sc-chip-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sc-tabs {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
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
          color: rgba(255, 255, 255, 0.55);
          -webkit-tap-highlight-color: transparent;
          transition: color 0.3s ease;
        }

        .sc-tab:hover { color: var(--color-card-white); }

        .sc-tab.is-active { color: var(--color-card-white); }

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
          width: clamp(64px, 6.5vw, 96px);
          aspect-ratio: 16 / 9;
          border-radius: 4px;
          overflow: hidden;
          opacity: 0.5;
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

        /* Berhenti saat kursor di panggung/tab — beri waktu membaca */
        .sc-wrap:hover .sc-progress-bar { animation-play-state: paused; }


        @keyframes sc-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .sc-tab:focus-visible {
          outline: 2px solid var(--color-card-white);
          outline-offset: 4px;
        }

        /* Tablet: keterangan di atas, tab di bawahnya */
        @media (max-width: 1023px) {
          .sc-meta { flex-direction: column; gap: var(--spacing-16); }
          .sc-caption { max-width: none; }
        }

        /* Mobile: 6 tab tidak muat — baris digeser horizontal */
        @media (max-width: 640px) {
          .sc-tabs {
            align-self: stretch;
            gap: 8px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .sc-tabs::-webkit-scrollbar { display: none; }
          .sc-tab { flex-shrink: 0; scroll-snap-align: start; }
          .sc-thumb { width: 72px; }
          .sc-tab-label { font-size: 9px; letter-spacing: 0.3px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-stage { transition: none; }
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
