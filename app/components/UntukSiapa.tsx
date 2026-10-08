import Image from "next/image";

/**
 * 03 · Untuk Siapa — naskah content.md v2.3 S3.
 * Gaya: foto full-bleed + judul terpusat + empat kartu kaca melayang
 * di kiri-kanan subjek (pola hero "Superhuman").
 * Tiap kartu punya anchor sendiri supaya DM outbound bisa menaut langsung
 * ke keadaan yang relevan: #pertanyaan-berulang · #minta-profil · #sudah-iklan
 */
/* Material Symbols Outlined (fonts.google.com/icons) — inline SVG path,
 * viewBox "0 -960 960 960". Nama icon: public · verified · trending_up · hub */
const ICONS: Record<string, string> = {
  public:
    "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z",
  verified:
    "m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z",
  trending_up:
    "m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z",
  hub:
    "M240-40q-50 0-85-35t-35-85q0-50 35-85t85-35q14 0 26 3t23 8l57-71q-28-31-39-70t-5-78l-81-27q-17 25-43 40t-58 15q-50 0-85-35T0-580q0-50 35-85t85-35q50 0 85 35t35 85v8l81 28q20-36 53.5-61t75.5-32v-87q-39-11-64.5-42.5T360-840q0-50 35-85t85-35q50 0 85 35t35 85q0 42-26 73.5T510-724v87q42 7 75.5 32t53.5 61l81-28v-8q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-32 0-58.5-15T739-515l-81 27q6 39-5 77.5T614-340l57 70q11-5 23-7.5t26-2.5q50 0 85 35t35 85q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-20 6.5-38.5T624-232l-57-71q-41 23-87.5 23T392-303l-56 71q11 15 17.5 33.5T360-160q0 50-35 85t-85 35ZM120-540q17 0 28.5-11.5T160-580q0-17-11.5-28.5T120-620q-17 0-28.5 11.5T80-580q0 17 11.5 28.5T120-540Zm120 420q17 0 28.5-11.5T280-160q0-17-11.5-28.5T240-200q-17 0-28.5 11.5T200-160q0 17 11.5 28.5T240-120Zm240-680q17 0 28.5-11.5T520-840q0-17-11.5-28.5T480-880q-17 0-28.5 11.5T440-840q0 17 11.5 28.5T480-800Zm0 440q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm240 240q17 0 28.5-11.5T760-160q0-17-11.5-28.5T720-200q-17 0-28.5 11.5T680-160q0 17 11.5 28.5T720-120Zm120-420q17 0 28.5-11.5T880-580q0-17-11.5-28.5T840-620q-17 0-28.5 11.5T800-580q0 17 11.5 28.5T840-540ZM480-840ZM120-580Zm360 120Zm360-120ZM240-160Zm480 0Z",
};

const keadaan = [
  {
    id: "pasar-global",
    icon: "public",
    lead: "Menjangkau pasar global",
    body: "Tampilkan bisnis Anda dengan standar yang siap diperkenalkan ke pasar yang lebih luas.",
    tint: "var(--color-powder-blue)",
  },
  {
    id: "kredibilitas-awal",
    icon: "verified",
    lead: "Membangun kredibilitas sejak awal",
    body: "Bahkan bagi bisnis yang baru merintis, kehadiran digital yang tepat dapat menjadi fondasi kepercayaan.",
    tint: "var(--color-mint-wash)",
  },
  {
    id: "naik-kelas",
    icon: "trending_up",
    lead: "Naik kelas",
    body: "Ketika kualitas bisnis berkembang, digital presence Anda seharusnya ikut berkembang.",
    tint: "var(--color-blush-tint)",
  },
  {
    id: "peluang-baru",
    icon: "hub",
    lead: "Membuka peluang baru",
    body: "Jadikan website sebagai pintu masuk bagi pelanggan, partner, dan peluang bisnis berikutnya.",
    tint: "var(--color-cream-paper)",
  },
];

export default function UntukSiapa() {
  return (
    <section id="untuk-siapa" data-track-section="untuk_siapa" className="us-sec">
      <div className="us-stage">
        <Image
          src="/img/untuk-siapa-bg-2.webp"
          alt=""
          fill
          sizes="100vw"
          unoptimized /* WebP 1672px, 95KB — sudah dioptimalkan */
          className="us-bg"
        />

        <header className="us-heading-wrap">
          <h2 className="us-heading">
            Dibangun untuk bisnis yang ingin bergerak lebih jauh.
          </h2>
        </header>

        <div className="us-floats">
          {keadaan.map((k, i) => (
            <div key={k.id} id={k.id} className={`us-card us-pos-${i + 1}`}>
              <div className="us-card-head">
                <span className="us-icon-wrap">
                  <svg className="us-icon" viewBox="0 -960 960 960" aria-hidden="true" focusable="false">
                    <path d={ICONS[k.icon]} />
                  </svg>
                </span>
                <p className="us-lead">{k.lead}</p>
              </div>
              <p className="us-body">{k.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .us-sec {
          position: relative;
          background: var(--color-studio-ink); /* sama dengan section Showcase di bawahnya */
          color: var(--color-card-white);
        }

        .us-stage {
          position: relative;
          height: clamp(600px, 56.25vw, 1000px);
          overflow: hidden;
        }

        .us-bg {
          object-fit: cover;
          object-position: center 62%;
          border-radius: 0;
        }

        /* Judul di area langit yang terang — teks gelap */
        .us-heading-wrap {
          position: relative;
          z-index: 1;
          padding: clamp(40px, 4.5vw, 72px) var(--spacing-24) 0;
          text-align: center;
        }

        .us-heading {
          margin-inline: auto;
          max-width: 13em;
          font-size: clamp(30px, 3.6vw, 56px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--color-studio-ink);
          text-wrap: balance;
        }

        /* ── Kartu kaca melayang ── */
        /* Gradasi di dasar foto: hitam rumput → ink, menyatu ke section berikutnya */
        .us-stage::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 32%;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(26, 26, 26, 0) 0%,
            rgba(26, 26, 26, 0.55) 45%,
            rgba(26, 26, 26, 0.9) 75%,
            #1a1a1a 100%
          );
        }

        .us-floats {
          z-index: 2;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .us-card {
          position: absolute;
          width: clamp(240px, 19vw, 300px);
          padding: 18px 20px 20px;
          border-radius: 14px;
          background: rgba(24, 26, 20, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(18px) saturate(1.2);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.45);
          pointer-events: auto;
          scroll-margin-top: calc(var(--nav-height) + 16px);
          animation: us-float 7s ease-in-out infinite;
        }

        /* Posisi: dua di kiri, dua di kanan — menjauhi layar & sosok di tengah */
        .us-pos-1 { left: 3%;  top: 42%; }
        .us-pos-2 { left: 5%;  top: 68%; animation-delay: -2.5s; }
        .us-pos-3 { right: 3%; top: 40%; animation-delay: -1.2s; }
        .us-pos-4 { right: 5%; top: 66%; animation-delay: -4s; }

        @keyframes us-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        .us-card-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .us-icon-wrap {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.14);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .us-icon { width: 18px; height: 18px; fill: currentColor; }

        .us-lead {
          font-size: 16px;
          line-height: 1.3;
          letter-spacing: -0.3px;
          color: var(--color-card-white);
        }

        .us-body {
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: -0.1px;
          color: rgba(255, 255, 255, 0.82);
        }

        /* ── Tablet & mobile: foto jadi banner, kartu tersusun di bawahnya ── */
        @media (max-width: 1100px) {
          .us-stage { height: auto; overflow: visible; }

          .us-bg {
            position: relative !important;
            height: auto !important;
            aspect-ratio: 3 / 2;
            object-position: center bottom;
          }

          .us-heading-wrap {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding-top: clamp(24px, 5vw, 56px);
          }

          .us-heading { font-size: clamp(24px, 4.4vw, 40px); }

          /* Gradasi pindah ke dasar banner foto (rasio 3:2), bukan dasar stage */
          .us-stage::after {
            bottom: auto;
            top: calc(100vw / 1.5 - 160px);
            height: 160px;
          }

          .us-floats {
            position: relative;
            inset: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 0 var(--spacing-24) var(--spacing-64);
            margin-top: -48px;
          }

          .us-card {
            position: relative;
            left: auto; right: auto; top: auto;
            width: auto;
            animation: none;
          }
        }

        @media (max-width: 640px) {
          .us-floats { grid-template-columns: 1fr; margin-top: -24px; padding-bottom: var(--spacing-48); }
          .us-heading { max-width: 11em; font-size: clamp(22px, 6.2vw, 26px); }
          .us-heading-wrap { padding-top: 20px; }
          /* Banner lebih tinggi supaya judul punya ruang langit, tidak menimpa layar */
          .us-bg { aspect-ratio: 4 / 5; object-position: center 70%; }
          .us-stage::after { top: calc(100vw * 1.25 - 160px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .us-card { animation: none; }
        }
      `}</style>
    </section>
  );
}
