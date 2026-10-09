"use client";

import { useState } from "react";
import Section from "./Section";

/**
 * 07 · Cara Kerja — naskah content.md v2.3 S7.
 *
 * Format dua kolom: kiri = judul + daftar tahap (accordion, satu terbuka),
 * kanan = panel visual yang menampilkan tahap aktif. Tahap berganti otomatis;
 * klik untuk memilih, hover panel/daftar untuk menjeda.
 *
 * Empat langkah adalah turunan dari Business Discovery, Competitive Teardown,
 * Conversion Architecture, dan Continuous Improvement — ditulis tanpa satu pun
 * istilahnya, sesuai REQ-L1 dan REQ-L3.
 */
const steps = [
  {
    number: "01",
    title: "Konsultasi",
    lead: "Kami memahami bisnis dan tujuan Anda.",
    body: "Kami menggali kebutuhan bisnis, target pelanggan, serta tujuan yang ingin dicapai melalui website.",
    outputs: ["Kebutuhan bisnis", "Target pelanggan", "Tujuan website"],
  },
  {
    number: "02",
    title: "Riset",
    lead: "Kami menganalisis pasar dan kompetitor Anda.",
    body: "Kami mempelajari bagaimana kompetitor memposisikan bisnisnya untuk menemukan peluang yang dapat membuat website Anda lebih relevan dan kompetitif.",
    outputs: ["Posisi kompetitor", "Peluang pembeda", "Arah penyampaian"],
  },
  {
    number: "03",
    title: "Strategi & Konten",
    lead: "Kami menentukan apa yang perlu disampaikan.",
    body: "Kami menyusun struktur dan konten berdasarkan informasi yang dibutuhkan calon pelanggan untuk memahami, mempertimbangkan, dan menghubungi bisnis Anda.",
    outputs: ["Struktur halaman", "Naskah konten", "Alur menuju kontak"],
  },
  {
    number: "04",
    title: "Desain & Development",
    lead: "Kami mengubah strategi menjadi website.",
    body: "Konten dan struktur yang telah disepakati diterjemahkan ke dalam desain dan website yang responsif, cepat, dan siap digunakan.",
    outputs: ["Desain visual", "Website responsif", "Siap digunakan"],
  },
  {
    number: "05",
    title: "Launch & Optimization",
    lead: "Kami memastikan website terus memberikan nilai.",
    body: "Setelah website live, kami memantau performanya untuk melihat apa yang bekerja dan menentukan peluang perbaikan berikutnya.",
    outputs: ["Website live", "Pemantauan performa", "Rencana perbaikan"],
  },
];

const STEP_MS = 6000;

export default function ProseKerja() {
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % steps.length);
  const cur = steps[active];

  return (
    <Section id="proses" track="proses_kerja">
      <div className="pk-grid">
        {/* ── Kiri: judul + daftar tahap ── */}
        <div className="pk-left">
          <header>
            <p className="pk-eyebrow">Cara kerja</p>
            <h2 className="pk-heading">
              Proses terstruktur untuk website yang tepat bagi bisnis Anda.
            </h2>
            <p className="pk-sub">
              Dari memahami kebutuhan hingga website siap digunakan, setiap tahap
              memiliki tujuan yang jelas.
            </p>
          </header>

          <ol className="pk-list">
            {steps.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.number} className={`pk-item${open ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="pk-trigger"
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                  >
                    <span className="pk-item-num">{s.number}</span>
                    {s.title}
                  </button>

                  {open && (
                    <span
                      key={active}
                      className="pk-progress"
                      aria-hidden="true"
                      onAnimationEnd={next}
                    />
                  )}

                  <div className="pk-panel-text">
                    <div>
                      <p className="pk-item-body">{s.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Kanan: panel visual tahap aktif ── */}
        <div className="pk-visual" aria-hidden="true">
          <div className="pk-card" key={active}>
            <div className="pk-card-top">
              <span className="pk-card-label">
                <span className="pk-dot" />
                Tahap {cur.number}
              </span>
              <span className="pk-card-count">
                {cur.number} / {String(steps.length).padStart(2, "0")}
              </span>
            </div>

            <p className="pk-card-title">{cur.title}</p>
            <p className="pk-card-lead">{cur.lead}</p>

            <ul className="pk-outputs">
              {cur.outputs.map((o, i) => (
                <li key={o} style={{ animationDelay: `${150 + i * 90}ms` }}>
                  <span className="pk-check">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                      <path d="M3.5 8.3l3 3 6-6.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {o}
                </li>
              ))}
            </ul>

            {/* Linimasa lima tahap — terisi sampai tahap aktif */}
            <div className="pk-timeline">
              {steps.map((s, i) => (
                <div key={s.number} className={`pk-seg${i <= active ? " is-done" : ""}`}>
                  <span className="pk-seg-bar" />
                  <span className="pk-seg-label">{s.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pk-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: clamp(40px, 6vw, 112px);
          align-items: stretch;
        }

        .pk-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: var(--spacing-48);
        }

        .pk-eyebrow {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--color-ink-60);
          margin-bottom: var(--spacing-16);
        }

        .pk-heading {
          font-size: clamp(28px, 2.6vw, 36px);
          line-height: 1.2;
          letter-spacing: -0.03em;
          font-weight: 400;
          margin-bottom: var(--spacing-16);
          max-width: 15em;
        }

        .pk-sub {
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.45;
          letter-spacing: -0.2px;
          color: var(--color-studio-ink);
          max-width: 26em;
        }

        /* ── Daftar tahap ── */
        .pk-list {
          list-style: none;
          padding-top: var(--spacing-16);
          max-width: 360px;
        }

        .pk-item {
          position: relative;
          border: 1px solid transparent;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }

        .pk-item.is-open { border-color: var(--color-studio-ink); }

        .pk-trigger {
          display: flex;
          align-items: baseline;
          gap: 10px;
          width: 100%;
          min-height: 44px;
          padding: 12px 16px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font: inherit;
          font-size: 17px;
          letter-spacing: -0.3px;
          color: var(--color-ink-60);
          transition: color 0.2s ease;
        }

        .pk-trigger:hover,
        .pk-item.is-open .pk-trigger { color: var(--color-studio-ink); }

        /* Nomor tahap: cukup kontras agar terbaca (ink-20 sebelumnya hampir hilang) */
        .pk-item-num {
          min-width: 1.6em;
          font-size: 13px;
          font-variant-numeric: tabular-nums;
          color: rgba(26, 26, 26, 0.5);
          transition: color 0.2s ease;
        }

        .pk-trigger:hover .pk-item-num,
        .pk-item.is-open .pk-item-num { color: var(--color-studio-ink); }

        /* Garis progres di tepi atas item yang terbuka */
        .pk-progress {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          height: 2px;
          background: var(--color-studio-ink);
          transform-origin: left;
          animation: pk-progress ${STEP_MS}ms linear both;
        }

        .pk-grid:hover .pk-progress { animation-play-state: paused; }

        @keyframes pk-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Isi accordion: grid-rows 0fr → 1fr agar tinggi beranimasi mulus */
        .pk-panel-text {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pk-panel-text > div { overflow: hidden; }

        .pk-item.is-open .pk-panel-text { grid-template-rows: 1fr; }

        .pk-item-body {
          padding: 0 16px 18px;
          font-size: 15px;
          line-height: 1.5;
          letter-spacing: -0.2px;
          color: var(--color-ink-60);
        }

        /* ── Panel visual ── */
        .pk-visual {
          position: relative;
          min-height: 560px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background:
            radial-gradient(120% 80% at 100% 100%, #5a4636 0%, rgba(90,70,54,0) 55%),
            radial-gradient(90% 70% at 0% 0%, #4a3a2e 0%, rgba(74,58,46,0) 60%),
            linear-gradient(135deg, #2a2420 0%, #1a1a1a 55%, #2e2620 100%);
        }

        .pk-card {
          position: absolute;
          top: clamp(32px, 4vw, 48px);
          left: 0;
          right: clamp(32px, 4vw, 48px);
          bottom: 0;
          background: var(--color-card-white);
          border-top-right-radius: 16px;
          padding: clamp(24px, 3vw, 40px);
          display: flex;
          flex-direction: column;
          animation: pk-card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes pk-card-in {
          from { opacity: 0.4; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pk-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: var(--color-ink-60);
          margin-bottom: clamp(24px, 4vw, 48px);
        }

        .pk-card-label { display: inline-flex; align-items: center; gap: 8px; }

        .pk-dot {
          width: 10px;
          height: 6px;
          border-radius: 3px;
          background: var(--color-studio-ink);
        }

        .pk-card-count { font-variant-numeric: tabular-nums; }

        .pk-card-title {
          font-size: clamp(32px, 3.6vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--color-studio-ink);
          margin-bottom: 12px;
        }

        .pk-card-lead {
          font-size: clamp(16px, 1.3vw, 19px);
          line-height: 1.4;
          letter-spacing: -0.2px;
          color: var(--color-ink-60);
          max-width: 26em;
        }

        .pk-outputs {
          list-style: none;
          margin-top: clamp(24px, 3vw, 40px);
          border-top: 1px solid var(--color-ink-08);
        }

        .pk-outputs li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-block: 14px;
          border-bottom: 1px solid var(--color-ink-08);
          font-size: 16px;
          letter-spacing: -0.2px;
          color: var(--color-studio-ink);
          animation: pk-row-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes pk-row-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .pk-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-studio-ink);
          color: var(--color-card-white);
          flex-shrink: 0;
        }

        .pk-timeline {
          margin-top: auto;
          padding-top: var(--spacing-32);
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }

        .pk-seg { display: flex; flex-direction: column; gap: 8px; }

        .pk-seg-bar {
          height: 4px;
          border-radius: 2px;
          background: var(--color-ink-08);
          transition: background-color 0.4s ease;
        }

        .pk-seg.is-done .pk-seg-bar { background: var(--color-studio-ink); }

        .pk-seg-label {
          font-size: 12px;
          font-variant-numeric: tabular-nums;
          color: rgba(26, 26, 26, 0.4);
        }

        .pk-seg.is-done .pk-seg-label { color: var(--color-ink-60); }

        /* Tablet: satu kolom, panel di bawah daftar */
        @media (max-width: 1023px) {
          .pk-grid { grid-template-columns: 1fr; }
          .pk-list { max-width: none; }
          .pk-visual { min-height: 480px; }
        }

        /* Mobile: panel visual disembunyikan — isi tahap cukup dari accordion */
        @media (max-width: 640px) {
          .pk-visual { display: none; }
          .pk-left { gap: var(--spacing-32); }
        }

        @media (prefers-reduced-motion: reduce) {
          .pk-card, .pk-outputs li { animation: none; }
          /* Tanpa animasi progres = tanpa ganti tahap otomatis (lihat Showcase) */
          .pk-progress { animation: none !important; display: none; }
        }
      `}</style>
    </Section>
  );
}
