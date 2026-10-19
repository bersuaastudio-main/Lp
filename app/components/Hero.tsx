import Image from "next/image";
import CTAButton from "./CTAButton";
import { CTA_LABEL, WA_DEFAULT } from "@/app/lib/constants";

const HEADLINE = "Buat bisnis Anda tampil lebih profesional dan dipercaya.";
const HERO_CTA = CTA_LABEL;

/* Tiga manfaat, masing-masing dengan tanda centang. Sengaja tanpa harga. */
const POINTS = [
  "Tampilkan produk dan layanan dengan lebih profesional",
  "Bangun kepercayaan melalui website bisnis Anda",
  "Permudah pelanggan menemukan informasi dan menghubungi Anda",
];

/* Visual hero: permintaan klien di kolom chat → website yang jadi (Nusaraya).
 * Warna di pemilih warna = palet website Nusaraya. */
const CHAT_TEXT = "Saya ingin membuat website untuk bisnis vanili saya.";
const SITE_COLORS = ["#24543c", "#a9b8a2", "#c9a25a"];

/** 01 · Hero — naskah content.md v2.3 S1. */
export default function Hero() {
  const words = HEADLINE.split(" ");

  return (
    <section
      id="top"
      data-track-section="hero"
      style={{
        backgroundColor: "var(--color-cream-paper)",
        /* Whitespace lapang ala studio editorial: jarak atas besar dari navbar,
           headline duduk di bawah, kiri-rata. */
        paddingTop: "clamp(48px, 10vh, 120px)",
        paddingBottom: "clamp(56px, 9vh, 104px)",
      }}
    >
      <div className="section-container hero-grid" style={{ width: "100%" }}>
        <div className="hero-copy">
          <p className="hero-eyebrow">(Studio website profil bisnis)</p>

          {/* Reveal per kata: tiap kata naik dari balik mask, berurutan.
              aria-label memberi pembaca layar kalimat utuh, bukan potongan kata. */}
          <h1 className="hero-title" aria-label={HEADLINE}>
            {words.map((word, i) => (
              <span key={i} aria-hidden="true">
                <span className="hero-word">
                  <span
                    className="hero-word-inner"
                    style={{ animationDelay: `${150 + i * 70}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="hero-sub">
            Kami bantu bisnis Anda memiliki website profesional untuk menampilkan
            produk, memperkuat kredibilitas, dan memudahkan pelanggan mengenal
            bisnis Anda.
          </p>
          <ul className="hero-checks">
            {POINTS.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="hero-cta-wrap">
            <CTAButton location="hero" message={WA_DEFAULT} className="hero-cta">
              <span className="hero-cta-label">
                <span className="hero-cta-roll" data-text={HERO_CTA}>
                  {HERO_CTA}
                </span>
              </span>
              <span className="hero-cta-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </CTAButton>
            <a href="#contoh" className="hero-link">
              Lihat Portfolio <span aria-hidden="true">→</span>
            </a>
            <p className="hero-note">Lewat WhatsApp. Tanpa kewajiban lanjut.</p>
          </div>
        </div>

        <a href="#contoh" className="hero-visual" aria-label="Lihat contoh hasil kerja: website Nusaraya Vanilla">
          {/* Website jadi */}
          <figure className="hv-site">
            <Image
              src="/img/porto-web/nusaraya-hero.png"
              alt="Website Nusaraya — eksportir vanili Indonesia"
              width={1600}
              height={900}
              sizes="(max-width: 1023px) 90vw, 600px"
              priority
            />
            {/* Headline website sedang disunting */}
            <span className="hv-tag" aria-hidden="true">
              <i>✦</i> Struktur &amp; konten
            </span>
            <span className="hv-select" aria-hidden="true">
              <i className="hv-handle hv-handle-l" />
              <i className="hv-handle hv-handle-r" />
            </span>
            {/* Pemilih warna */}
            <span className="hv-palette" aria-hidden="true">
              <span className="hv-aa">Aa</span>
              {SITE_COLORS.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </span>
          </figure>

          {/* Kolom chat — format WhatsApp: header kontak, gelembung terkirim, kolom ketik */}
          <span className="hv-chat" aria-hidden="true">
            <span className="hv-wa-head">
              <span className="hv-wa-avatar">B</span>
              <span className="hv-wa-contact">
                <span className="hv-wa-name">Bersua</span>
                <span className="hv-wa-status">online</span>
              </span>
            </span>
            <span className="hv-wa-body">
              <span className="hv-wa-bubble">
                {CHAT_TEXT}
                <span className="hv-wa-meta">
                  09.41
                  <svg viewBox="0 0 18 12" width="16" height="11" fill="none" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6.5l3 3L10 3M7 9.5l1 0.5L15 3" />
                  </svg>
                </span>
              </span>
              <span className="hv-wa-typing">
                <i />
                <i />
                <i />
              </span>
            </span>
            <span className="hv-wa-input">
              <span className="hv-wa-field">Ketik pesan</span>
              <span className="hv-wa-mic">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="9" y="3.5" width="6" height="11" rx="3" />
                  <path d="M6 11.5a6 6 0 0012 0M12 17.5v3" />
                </svg>
              </span>
            </span>
          </span>

        </a>
      </div>

      <style>{`
        .hero-eyebrow {
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.4;
          letter-spacing: -0.2px;
          font-weight: 400;
          color: var(--color-studio-ink);
          margin-bottom: clamp(16px, 2vw, 28px);
          animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Headline besar, bobot regular, leading rapat — mengikuti referensi.
           Ukuran ikut lebar DAN tinggi layar, supaya di layar 1080p (skala 125%,
           ruang ±1536×730) headline + CTA tetap muat tanpa scroll. */
        .hero-title {
          font-size: clamp(34px, min(3.6vw, 6.8vh), 64px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          font-weight: 400;
          color: var(--color-studio-ink);
          margin-bottom: clamp(16px, 1.6vw, 24px);
          max-width: 13em;
          text-wrap: balance;
        }

        /* Mask: padding bawah memberi ruang descender (g, p) agar tidak terpotong */
        .hero-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
        }

        .hero-word-inner {
          display: inline-block;
          animation: hero-word-up 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes hero-word-up {
          from { transform: translateY(110%); }
          to   { transform: translateY(0); }
        }

        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── CTA interaktif ── */
        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-block: 12px;
          font-size: 16px;
          color: var(--color-studio-ink);
          text-decoration: underline;
          text-underline-offset: 5px;
          text-decoration-thickness: 1px;
        }
        .hero-link span { transition: transform 0.3s ease; }
        .hero-link:hover span { transform: translateX(4px); }
        .hero-cta-wrap {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px 24px;
          animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.75s both;
        }

        .hero-cta-wrap a.hero-cta {
          display: inline-flex;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          gap: 14px;
          padding-right: 10px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s ease;
        }

        /* Lapisan isi yang menyapu dari bawah saat hover */
        .hero-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #333;
          border-radius: inherit;
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -12px rgba(26, 26, 26, 0.55);
        }

        .hero-cta:hover::before { transform: translateY(0); }
        .hero-cta:active { transform: translateY(0) scale(0.97); }

        /* Label bergulir: teks lama naik keluar, salinannya masuk dari bawah */
        .hero-cta-label {
          display: inline-block;
          overflow: hidden;
          line-height: 1.2;
          height: 1.2em;
        }

        .hero-cta-roll {
          display: inline-block;
          position: relative;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta-roll::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 100%;
        }

        .hero-cta:hover .hero-cta-roll { transform: translateY(-100%); }

        /* Panah dalam lingkaran: berputar dari diagonal ke lurus saat hover */
        .hero-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: var(--color-card-white);
          color: var(--color-studio-ink);
          transform: rotate(-45deg);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta:hover .hero-cta-arrow { transform: rotate(0deg) scale(1.08); }

        /* ── Layout dua kolom: teks kiri, contoh hasil kerja kanan ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.05fr 1fr; gap: 64px; }
        }
        .hero-sub {
          font-size: clamp(17px, 1.35vw, 21px);
          line-height: 1.5;
          color: var(--color-ink-60);
          max-width: 34em;
          margin-bottom: clamp(18px, 1.8vw, 24px);
          animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
        }
        .hero-note {
          flex-basis: 100%;
          margin-top: 8px;
          font-size: 14px;
          color: var(--color-ink-60);
        }
        .hero-checks {
          list-style: none;
          margin: 0 0 clamp(24px, 2.6vw, 36px);
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both;
        }
        .hero-checks li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: clamp(15px, 1.1vw, 17px);
          line-height: 1.45;
          color: var(--color-studio-ink);
        }
        .hero-checks svg {
          flex: none;
          margin-top: 2px;
          padding: 2px;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: var(--color-studio-ink);
          color: var(--color-card-white);
        }
        /* ── Visual: chat → website jadi ── */
        .hero-visual {
          position: relative;
          display: block;
          padding-bottom: 4px;
          color: inherit;
          text-decoration: none;
          animation: hero-fade 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        /* Cahaya hijau-hangat (warna Nusaraya) di belakang komposisi */
        .hero-visual::before {
          content: "";
          position: absolute;
          inset: 8% 0 -4% 10%;
          background: radial-gradient(60% 60% at 60% 45%, rgba(36, 84, 60, 0.22) 0%, rgba(201, 162, 90, 0.12) 45%, rgba(248, 248, 242, 0) 75%);
          filter: blur(10px);
        }
        .hv-site {
          position: relative;
          width: 90%;
          margin: 0 0 0 auto;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 30px 60px -30px rgba(26, 26, 26, 0.5);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* Sedikit diperbesar untuk menyembunyikan bingkai krem di tepi screenshot */
        .hv-site img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.018);
        }
        .hv-tag {
          position: absolute;
          left: 3%;
          top: 18%;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px 5px 6px;
          border-radius: 9999px;
          background: var(--color-card-white);
          color: var(--color-studio-ink);
          font-size: clamp(10px, 0.85vw, 12px);
          line-height: 1;
          box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.4);
        }
        .hv-tag i {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #24543c;
          color: var(--color-card-white);
          font-style: normal;
          font-size: 10px;
        }
        /* Kotak seleksi di atas headline screenshot (posisi = koordinat headline asli) */
        .hv-select {
          position: absolute;
          left: 2.2%;
          top: 30%;
          width: 43.5%;
          height: 34%;
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
        }
        .hv-handle {
          position: absolute;
          top: 50%;
          width: 5px;
          height: 34%;
          border-radius: 9999px;
          background: var(--color-card-white);
          transform: translateY(-50%);
        }
        .hv-handle-l { left: -3px; }
        .hv-handle-r { right: -3px; }

        /* Menimpa tepi bawah website; margin % dihitung dari lebar wadah */
        .hv-chat {
          position: relative;
          margin-top: -9%;
          width: 54%;
          z-index: 2;
          display: flex;
          flex-direction: column;
          border-radius: 14px;
          overflow: hidden;
          background: #efeae2; /* latar percakapan WhatsApp */
          box-shadow: 0 0 0 1px rgba(26, 26, 26, 0.08), 0 24px 48px -20px rgba(26, 26, 26, 0.45);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hv-wa-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          background: #008069;
          color: #fff;
        }
        .hv-wa-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: var(--color-cream-paper);
          color: var(--color-studio-ink);
          font-size: 13px;
          font-weight: 600;
        }
        .hv-wa-contact { display: flex; flex-direction: column; line-height: 1.2; }
        .hv-wa-name { font-size: 14px; font-weight: 600; }
        .hv-wa-status { font-size: 11px; opacity: 0.8; }
        .hv-wa-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px 12px 10px;
        }
        /* Gelembung terkirim (hijau, ekor kanan atas) */
        .hv-wa-bubble {
          position: relative;
          align-self: flex-end;
          max-width: 88%;
          padding: 7px 9px 6px 10px;
          border-radius: 8px 0 8px 8px;
          background: #d9fdd3;
          color: #111b21;
          font-size: clamp(13px, 1.05vw, 15px);
          line-height: 1.4;
          box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);
        }
        .hv-wa-bubble::after {
          content: "";
          position: absolute;
          top: 0;
          right: -7px;
          border-top: 8px solid #d9fdd3;
          border-right: 8px solid transparent;
        }
        .hv-wa-meta {
          float: right;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          margin: 6px 0 -2px 10px;
          font-size: 10.5px;
          color: #667781;
        }
        /* "Bersua sedang mengetik…" — gelembung masuk dengan tiga titik */
        .hv-wa-typing {
          align-self: flex-start;
          display: inline-flex;
          gap: 4px;
          padding: 9px 11px;
          border-radius: 0 8px 8px 8px;
          background: #fff;
          box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);
        }
        .hv-wa-typing i {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #8696a0;
          animation: hv-typing 1.2s ease-in-out infinite;
        }
        .hv-wa-typing i:nth-child(2) { animation-delay: 0.15s; }
        .hv-wa-typing i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes hv-typing {
          0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
        .hv-wa-input {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 10px 10px;
        }
        .hv-wa-field {
          flex: 1;
          padding: 8px 14px;
          border-radius: 9999px;
          background: #fff;
          font-size: 12px;
          color: #8696a0;
        }
        .hv-wa-mic {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          background: #00a884;
          color: #fff;
        }

        /* Pemilih warna menempel di sudut kanan bawah website */
        .hv-palette {
          position: absolute;
          right: 3%;
          bottom: 6%;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px 7px 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 12px 28px -14px rgba(26, 26, 26, 0.45);
        }
        .hv-aa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: var(--color-card-white);
          box-shadow: 0 0 0 1px var(--color-ink-08);
          font-size: 12px;
          color: var(--color-studio-ink);
        }
        .hv-palette i {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9);
        }
        .hero-visual:hover .hv-site { transform: translate(4px, -4px); }
        .hero-visual:hover .hv-chat { transform: translate(-4px, 4px); }

        @media (max-width: 1023px) {
          .hero-visual { max-width: 600px; }
          .hv-site { width: 96%; }
          .hv-chat { width: 80%; margin-top: -7%; }
        }
        @media (max-width: 480px) {
          .hv-tag { top: 10%; padding: 3px 8px 3px 4px; font-size: 9px; }
          .hv-tag i { width: 14px; height: 14px; font-size: 8px; }
          .hv-palette { bottom: auto; top: 6px; right: 6px; gap: 5px; padding: 4px 8px 4px 4px; }
          .hv-aa { width: 20px; height: 20px; font-size: 9px; }
          .hv-palette i { width: 11px; height: 11px; }
          .hv-wa-head { padding: 7px 10px; gap: 8px; }
          .hv-wa-avatar { width: 24px; height: 24px; font-size: 11px; }
          .hv-wa-name { font-size: 12px; }
          .hv-wa-body { padding: 10px 10px 8px; }
          .hv-wa-mic { width: 28px; height: 28px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-word-inner, .hero-eyebrow, .hero-sub, .hero-cta-wrap, .hero-checks, .hero-visual { animation: none; }
        }
        @media (max-width: 480px) {
          .hero-cta-wrap a.hero-cta { width: 100%; justify-content: center; }
          .hero-link { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
