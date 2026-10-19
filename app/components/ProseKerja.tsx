import Image from "next/image";
import Section from "./Section";
import CarouselDots from "./CarouselDots";
import CTAButton from "./CTAButton";
import { CTA_LABEL, WA_DEFAULT } from "@/app/lib/constants";

/**
 * 06 · Cara Kerja — tiga kartu, masing-masing panel visual di atas dan teks
 * di bawah, dibaca dalam sekali lihat (tanpa klik). Mockup dibuat dengan
 * HTML/CSS supaya tajam di semua layar dan tanpa aset baru.
 * Diletakkan setelah Harga; tombol di bawah membuka form konsultasi.
 */
const steps = [
  {
    title: "1. Ceritakan bisnis Anda",
    line: "Kami pelajari bisnis, pelanggan, dan kebutuhan Anda untuk menentukan website yang tepat.",
    visual: "chat",
  },
  {
    title: "2. Rancang & Bangun Website",
    line: "Struktur, konten, dan desain disesuaikan dengan bisnis Anda agar calon pelanggan lebih mudah memahami produk dan layanan Anda.",
    visual: "build",
  },
  {
    title: "3. Publikasikan & Pendampingan",
    line: "Website siap online dengan domain dan hosting sesuai paket. Kami juga membantu Anda memahami cara menggunakan website.",
    visual: "launch",
  },
] as const;

/* ── Mockup 1: percakapan awal di WhatsApp ── */
function ChatMock() {
  return (
    <div className="pk-chat">
      <p className="pk-bubble pk-bubble-in">
        Halo, saya punya usaha distributor kopi. Website seperti apa yang cocok?
      </p>
      <p className="pk-bubble pk-bubble-out">
        Siapa pelanggan utama Anda, dan apa yang biasanya mereka tanyakan dulu?
      </p>
      <div className="pk-chat-input" aria-hidden="true">
        <span>Ketik pesan…</span>
        <i className="pk-send">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </i>
      </div>
    </div>
  );
}

/* ── Mockup 2: wireframe halaman (abu-abu) dengan anotasi tiap bagian ── */
function BuildMock() {
  return (
    <div className="pk-wf">
      <div className="pk-window pk-build">
        {/* Navigasi */}
        <div className="wf-nav">
          <i className="wf-logo" />
          <span className="wf-links">
            <i />
            <i />
            <i />
            <i />
          </span>
          <i className="wf-nav-btn" />
        </div>
        {/* Hero: teks kiri, gambar kanan */}
        <div className="wf-hero">
          <div className="wf-hero-copy">
            <i className="wf-badge" />
            <p className="wf-title">Judul Utama</p>
            <i className="wf-line" />
            <i className="wf-line wf-line-short" />
            <span className="wf-btns">
              <i className="wf-btn wf-btn-dark" />
              <i className="wf-btn" />
            </span>
          </div>
          <i className="wf-img" />
        </div>
        {/* Logo mitra */}
        <div className="wf-logos">
          <i />
          <i />
          <i />
          <i />
        </div>
        {/* Keunggulan */}
        <p className="wf-sec-title">Keunggulan</p>
        <div className="wf-features">
          <i />
          <i />
        </div>
      </div>

      <span className="wf-notes">
        <span className="wf-note" style={{ top: "6%" }}>Navigasi</span>
        <span className="wf-note" style={{ top: "30%" }}>Hero</span>
        <span className="wf-note" style={{ top: "62%" }}>Bukti</span>
        <span className="wf-note" style={{ top: "84%" }}>Keunggulan</span>
      </span>
    </div>
  );
}

/* ── Mockup 3: website sudah online ── */
function LaunchMock() {
  return (
    <>
      <Image
        className="pk-photo"
        src="/img/proses-online.webp"
        alt=""
        fill
        sizes="(max-width: 767px) 84vw, (max-width: 1023px) 520px, 400px"
      />
      <span className="pk-live pk-live-float">Online</span>
    </>
  );
}

const VISUALS = { chat: ChatMock, build: BuildMock, launch: LaunchMock };

export default function ProseKerja() {
  return (
    <Section id="proses" track="proses_kerja" surface="white">
      <header className="pk-head">
        <h2 className="pk-title">
          Belum Punya Website?
          <br />
          <span>Tenang saja.</span>
        </h2>
        <p className="pk-sub">
          Hanya dalam 3 langkah, bisnis Anda siap tampil online secara profesional.
        </p>
      </header>

      <ol className="pk-grid" id="pk-grid">
        {steps.map((s) => {
          const Visual = VISUALS[s.visual];
          return (
            <li key={s.title} className="pk-card">
              <div className={`pk-visual pk-visual-${s.visual}`} aria-hidden="true">
                <Visual />
              </div>
              <div className="pk-text">
                <h3 className="pk-step">{s.title}</h3>
                <p className="pk-line">{s.line}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <CarouselDots targetId="pk-grid" count={steps.length} label="Pilih langkah" />

      <div className="pk-cta-wrap">
        <CTAButton location="proses" message={WA_DEFAULT} className="pk-cta">
          {CTA_LABEL} <span aria-hidden="true">→</span>
        </CTAButton>
      </div>

      <style>{`
        #proses .sec-body { border-top: none; padding-top: 0; }

        /* ── Judul tengah ── */
        .pk-head { text-align: center; max-width: 680px; margin: 0 auto clamp(32px, 4vw, 56px); }
        .pk-title {
          margin: 0;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--color-studio-ink);
        }
        .pk-title span { color: var(--color-ink-60); }
        .pk-sub {
          margin: 16px 0 0;
          font-size: 17px;
          line-height: 1.5;
          color: var(--color-ink-60);
        }

        /* ── Kartu ── */
        .pk-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .pk-card {
          display: flex;
          flex-direction: column;
          background: var(--color-cream-paper); /* section berlatar putih → kartu krem */
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 0 0 1px var(--color-ink-08);
        }
        .pk-visual {
          position: relative;
          height: 230px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 28px 24px 0;
          background:
            radial-gradient(70% 60% at 50% 18%, rgba(214, 196, 160, 0.45) 0%, rgba(214, 196, 160, 0) 70%),
            #f1f1ec;
        }
        .pk-text { padding: 22px 24px 26px; }
        .pk-step {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--color-studio-ink);
        }
        .pk-line {
          margin: 8px 0 0;
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-ink-60);
        }

        /* ── Mockup: dasar ── */
        .pk-window {
          width: 100%;
          max-width: 340px;
          background: var(--color-card-white);
          border-radius: 10px 10px 0 0;
          box-shadow: 0 0 0 1px var(--color-ink-08), 0 18px 36px -18px rgba(26, 26, 26, 0.35);
          overflow: hidden;
        }

        /* Mockup 1 — chat */
        .pk-chat {
          width: 100%;
          max-width: 320px;
          align-self: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 20px;
        }
        .pk-bubble {
          margin: 0;
          max-width: 85%;
          padding: 9px 12px;
          font-size: 12.5px;
          line-height: 1.4;
          border-radius: 12px;
          box-shadow: 0 6px 16px -10px rgba(26, 26, 26, 0.35);
        }
        .pk-bubble-in { align-self: flex-start; background: var(--color-card-white); color: var(--color-studio-ink); border-bottom-left-radius: 4px; }
        .pk-bubble-out { align-self: flex-end; background: var(--color-studio-ink); color: var(--color-card-white); border-bottom-right-radius: 4px; }
        .pk-chat-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
          padding: 8px 8px 8px 14px;
          background: var(--color-card-white);
          border-radius: 9999px;
          font-size: 12px;
          color: var(--color-ink-60);
          box-shadow: 0 0 0 1px var(--color-ink-08);
        }
        .pk-send {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 9999px;
          background: var(--color-studio-ink);
          color: var(--color-card-white);
        }

        /* Mockup 2 — wireframe abu-abu + anotasi di kanan (gaya referensi) */
        .pk-wf {
          position: relative;
          align-self: stretch;
          display: flex;
          width: 100%;
          max-width: 360px;
          gap: 10px;
        }
        .pk-wf .pk-build {
          flex: 0 0 74%;
          align-self: flex-end;
          height: 100%;
          padding: 0 0 10px;
          color: #9a9a95;
        }
        .pk-build i { display: block; background: #e7e7e2; border-radius: 3px; }
        .wf-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-bottom: 1px solid var(--color-ink-08);
        }
        .pk-build .wf-logo { width: 10px; height: 10px; border-radius: 9999px; background: var(--color-studio-ink); }
        .wf-links { flex: 1; display: flex; justify-content: center; gap: 6px; }
        .pk-build .wf-links i { width: 16px; height: 4px; }
        .pk-build .wf-nav-btn { width: 24px; height: 9px; border-radius: 9999px; background: var(--color-studio-ink); }
        .wf-hero {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 8px;
          padding: 10px 10px 8px;
        }
        .wf-hero-copy { display: flex; flex-direction: column; gap: 4px; }
        .pk-build .wf-badge { width: 34px; height: 6px; border-radius: 9999px; }
        .wf-title {
          margin: 2px 0;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-studio-ink);
        }
        .pk-build .wf-line { height: 4px; width: 92%; }
        .pk-build .wf-line-short { width: 62%; }
        .wf-btns { display: flex; gap: 4px; margin-top: 4px; }
        .pk-build .wf-btn { width: 26px; height: 9px; border-radius: 3px; background: transparent; box-shadow: inset 0 0 0 1px #cfcfc9; }
        .pk-build .wf-btn-dark { background: var(--color-studio-ink); box-shadow: none; }
        .pk-build .wf-img { min-height: 58px; border-radius: 5px; background: #ededea; }
        .wf-logos { display: flex; justify-content: center; gap: 10px; padding: 6px 10px 8px; }
        .pk-build .wf-logos i { width: 20px; height: 5px; background: #dcdcd6; }
        .wf-sec-title {
          margin: 0 0 6px;
          text-align: center;
          font-size: 9px;
          color: var(--color-studio-ink);
        }
        .wf-features { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 0 10px; }
        .pk-build .wf-features i { height: 30px; border-radius: 5px; background: #f1f1ec; }

        /* Anotasi: label + garis penunjuk ke bagian wireframe */
        .wf-notes { position: relative; flex: 1; }
        .wf-note {
          position: absolute;
          left: 12px;
          font-size: 10px;
          line-height: 1;
          white-space: nowrap;
          color: var(--color-studio-ink);
        }
        .wf-note::before {
          content: "";
          position: absolute;
          right: calc(100% + 3px);
          top: 50%;
          width: 18px;
          border-top: 1px solid rgba(26, 26, 26, 0.45);
        }
        .wf-note::after {
          content: "";
          position: absolute;
          right: calc(100% + 19px);
          top: calc(50% - 2px);
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: var(--color-studio-ink);
        }

        /* Mockup 3 — website online */
        .pk-live {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: var(--color-studio-ink);
          color: var(--color-card-white);
        }
        .pk-live::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--color-signal-green);
        }
        /* Foto laptop menampilkan website yang sudah online — memenuhi panel */
        .pk-visual-launch { padding: 0; background: #e9dfd2; }
        .pk-photo { object-fit: cover; object-position: center 52%; }
        .pk-live-float {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 1;
          box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.5);
        }

        /* ── Tombol ── */
        .pk-cta-wrap { display: flex; justify-content: center; margin-top: clamp(28px, 3.5vw, 44px); }
        .pk-cta span { transition: transform 0.3s ease; }
        .pk-cta:hover span { transform: translateX(4px); }

        @media (max-width: 1023px) {
          .pk-grid { grid-template-columns: 1fr; max-width: 520px; margin-inline: auto; }
        }
        /* HP: kartu jadi carousel geser, kartu berikutnya mengintip di kanan */
        @media (max-width: 767px) {
          .pk-grid {
            display: flex;
            max-width: none;
            margin-inline: -24px;
            padding: 2px 24px;
            gap: 12px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-inline: 24px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .pk-grid::-webkit-scrollbar { display: none; }
          .pk-card { flex: 0 0 84%; scroll-snap-align: center; }
        }
        @media (max-width: 480px) {
          .pk-visual { height: 190px; padding-inline: 18px; }
          .pk-cta-wrap a { width: 100%; }
        }
      `}</style>
    </Section>
  );
}
