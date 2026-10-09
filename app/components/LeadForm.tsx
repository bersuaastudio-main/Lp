"use client";

import { useEffect, useRef, useState } from "react";
import { trackLeadFormOpen, trackWAClick } from "@/app/lib/tracking";
import { WA_NUMBER, PACKAGE_OPTIONS } from "@/app/lib/constants";

/**
 * Form singkat sebelum WhatsApp — menyaring leads.
 *
 * Semua CTA (CTAButton + tombol navbar) memanggil `openLeadForm()`; form ini
 * tampil sebagai <dialog> modal. Setelah diisi, "Lanjut ke WhatsApp" membuka
 * chat dengan pesan yang sudah memuat nama, jenis bisnis, paket, dan pesan.
 * Event `wa_click` (konversi) baru dikirim saat form dikirim, bukan saat dibuka.
 */

const OPEN_EVENT = "lead:open";

type OpenDetail = { location: string; paket?: string };

export function openLeadForm(detail: OpenDetail) {
  window.dispatchEvent(new CustomEvent<OpenDetail>(OPEN_EVENT, { detail }));
}

type Errors = { nama?: string; namaBisnis?: string; bisnis?: string };

export default function LeadForm() {
  const ref = useRef<HTMLDialogElement>(null);
  const [location, setLocation] = useState("unknown");
  const [nama, setNama] = useState("");
  const [namaBisnis, setNamaBisnis] = useState("");
  const [bisnis, setBisnis] = useState("");
  const [paket, setPaket] = useState("");
  const [pesan, setPesan] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<OpenDetail>).detail;
      setLocation(d.location);
      if (d.paket) setPaket(d.paket);
      setErrors({});
      ref.current?.showModal();
      trackLeadFormOpen(d.location);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = () => ref.current?.close();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!nama.trim()) next.nama = "Isi nama Anda dulu.";
    if (!namaBisnis.trim()) next.namaBisnis = "Isi nama bisnis Anda dulu.";
    if (!bisnis.trim()) next.bisnis = "Isi jenis bisnis Anda dulu.";
    setErrors(next);
    if (next.nama || next.namaBisnis || next.bisnis) return;

    /* Kalimat pembuka mengikuti tombol asal, supaya chat sama dengan yang diklik */
    const fixedPrice = paket === "Starter" || paket === "Business Website";
    const opening =
      location.startsWith("pricing_") && fixedPrice
        ? `Halo Bersua, saya ingin *memilih paket ${paket}*.`
        : location === "cta_penutup"
          ? "Halo Bersua, saya ingin *mendiskusikan bisnis saya* untuk dibuatkan website."
          : "Halo Bersua, saya ingin *konsultasi gratis*.";

    const lines = [
      opening,
      "",
      `Nama: *${nama.trim()}*`,
      `Nama bisnis: *${namaBisnis.trim()}*`,
      `Jenis bisnis: *${bisnis.trim()}*`,
      `Tertarik paket: *${paket || "Belum yakin"}*`,
    ];
    if (pesan.trim()) lines.push("", pesan.trim());

    trackWAClick(location);
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  return (
    <dialog
      ref={ref}
      className="lf"
      aria-labelledby="lf-title"
      onClick={(e) => {
        /* Klik di luar panel (backdrop) menutup dialog */
        if (e.target === ref.current) close();
      }}
    >
      <form className="lf-panel" onSubmit={submit} noValidate>
        <button type="button" className="lf-close" onClick={close} aria-label="Tutup form">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <header className="lf-head">
          <h2 id="lf-title" className="lf-title">Siap mulai project?</h2>
          <p className="lf-sub">Isi form singkat ini, kami balas langsung via WhatsApp.</p>
        </header>

        <div className="lf-row">
          <label className="lf-field">
            <span className="lf-label">Nama Anda</span>
            <input
              className={`lf-input${errors.nama ? " has-error" : ""}`}
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (errors.nama) setErrors((x) => ({ ...x, nama: undefined }));
              }}
              placeholder="Contoh: Budi"
              autoComplete="name"
              aria-invalid={Boolean(errors.nama)}
            />
            {errors.nama && <span className="lf-error">{errors.nama}</span>}
          </label>

          <label className="lf-field">
            <span className="lf-label">Nama bisnis</span>
            <input
              className={`lf-input${errors.namaBisnis ? " has-error" : ""}`}
              value={namaBisnis}
              onChange={(e) => {
                setNamaBisnis(e.target.value);
                if (errors.namaBisnis) setErrors((x) => ({ ...x, namaBisnis: undefined }));
              }}
              placeholder="Contoh: Kopi Nusantara"
              autoComplete="organization"
              aria-invalid={Boolean(errors.namaBisnis)}
            />
            {errors.namaBisnis && <span className="lf-error">{errors.namaBisnis}</span>}
          </label>

          <label className="lf-field lf-span">
            <span className="lf-label">Jenis bisnis</span>
            <input
              className={`lf-input${errors.bisnis ? " has-error" : ""}`}
              value={bisnis}
              onChange={(e) => {
                setBisnis(e.target.value);
                if (errors.bisnis) setErrors((x) => ({ ...x, bisnis: undefined }));
              }}
              placeholder="Contoh: Distributor kopi / Villa"
              aria-invalid={Boolean(errors.bisnis)}
            />
            {errors.bisnis && <span className="lf-error">{errors.bisnis}</span>}
          </label>
        </div>

        <fieldset className="lf-field lf-fieldset">
          <legend className="lf-label">Tertarik paket?</legend>
          <div className="lf-options">
            {PACKAGE_OPTIONS.map((o) => (
              <button
                key={o.name}
                type="button"
                className={`lf-option${paket === o.name ? " is-selected" : ""}`}
                aria-pressed={paket === o.name}
                onClick={() => setPaket(paket === o.name ? "" : o.name)}
              >
                <span className="lf-option-name">{o.name}</span>
                <span className="lf-option-price">
                  {o.anchor && <s className="lf-option-anchor">{o.anchor}</s>}
                  {o.price}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <label className="lf-field">
          <span className="lf-label">
            Pesan <span className="lf-optional">(opsional)</span>
          </span>
          <textarea
            className="lf-input lf-textarea"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Contoh: Saya ingin tanya detail paket Business Website. Atau: saya belum punya logo…"
            rows={4}
          />
        </label>

        <button type="submit" className="lf-submit">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
          </svg>
          Lanjut ke WhatsApp
        </button>

        <p className="lf-note">Data hanya dipakai untuk membalas pesan Anda.</p>
      </form>

      <style>{`
        .lf {
          margin: auto;
          padding: 0;
          border: none;
          border-radius: 16px;
          width: min(640px, calc(100vw - 32px));
          max-height: calc(100dvh - 32px);
          background: var(--color-cream-paper);
          color: var(--color-studio-ink);
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.45);
        }

        .lf[open] { animation: lf-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); }

        .lf::backdrop {
          background: rgba(26, 26, 26, 0.55);
          backdrop-filter: blur(4px);
        }

        @keyframes lf-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lf-panel {
          position: relative;
          padding: clamp(24px, 5vw, 44px);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lf-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--color-ink-60);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .lf-close:hover { background: var(--color-ink-08); color: var(--color-studio-ink); }

        .lf-head { text-align: center; padding-inline: 24px; }

        .lf-title {
          font-size: clamp(26px, 3.4vw, 36px);
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }

        .lf-sub { font-size: 15px; line-height: 1.5; color: var(--color-ink-60); }

        .lf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .lf-span { grid-column: 1 / -1; }

        .lf-field { display: flex; flex-direction: column; gap: 8px; min-width: 0; }

        .lf-fieldset { border: none; padding: 0; margin: 0; }

        .lf-label {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--color-studio-ink);
          padding: 0;
          margin-bottom: 0;
        }

        .lf-fieldset .lf-label { margin-bottom: 8px; }

        .lf-optional { text-transform: none; letter-spacing: 0; color: var(--color-ink-60); }

        .lf-input {
          width: 100%;
          font: inherit;
          font-size: 16px; /* ≥16px: Safari iOS tidak zoom saat fokus */
          letter-spacing: -0.2px;
          color: var(--color-studio-ink);
          background: var(--color-card-white);
          border: 1px solid var(--color-ink-20);
          border-radius: var(--radius-lg);
          padding: 12px 14px;
          min-height: 48px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .lf-input::placeholder { color: rgba(26, 26, 26, 0.38); }

        .lf-input:focus {
          outline: none;
          border-color: var(--color-studio-ink);
          box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.08);
        }

        .lf-input.has-error { border-color: #c2410c; }

        .lf-textarea { resize: vertical; min-height: 104px; line-height: 1.5; }

        .lf-error { font-size: 13px; color: #c2410c; }

        .lf-options {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .lf-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          min-height: 56px;
          padding: 8px 6px;
          font: inherit;
          background: var(--color-card-white);
          border: 1px solid var(--color-ink-20);
          border-radius: var(--radius-lg);
          color: var(--color-studio-ink);
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .lf-option:hover { border-color: var(--color-studio-ink); }

        .lf-option.is-selected {
          background: var(--color-studio-ink);
          border-color: var(--color-studio-ink);
          color: var(--color-card-white);
        }

        .lf-option-name { font-size: 14px; letter-spacing: -0.2px; text-align: center; line-height: 1.25; }
        .lf-option-price {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0 6px;
          font-size: 12px;
          opacity: 0.7;
        }

        .lf-option-anchor { opacity: 0.6; }

        .lf-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 54px;
          font: inherit;
          font-size: 16px;
          letter-spacing: -0.3px;
          color: var(--color-card-white);
          background: var(--color-studio-ink);
          border: none;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.15s ease;
        }

        .lf-submit:hover { opacity: 0.88; }
        .lf-submit:active { transform: scale(0.98); }

        .lf-note { font-size: 13px; color: var(--color-ink-60); text-align: center; margin-top: -6px; }

        @media (max-width: 560px) {
          .lf-row { grid-template-columns: 1fr; }
          .lf-options { grid-template-columns: 1fr 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lf[open] { animation: none; }
        }
      `}</style>
    </dialog>
  );
}
