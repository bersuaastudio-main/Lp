import Section from "./Section";

/**
 * 03 · Untuk Siapa — naskah content.md v2.3 S3.
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
    <Section
      id="untuk-siapa"
      track="untuk_siapa"
      heading="Dibangun untuk bisnis yang ingin bergerak lebih jauh."
      surface="white"
    >
      <div className="grid-2">
        {keadaan.map((k) => (
          <div key={k.id} id={k.id} className="us-card" style={{ backgroundColor: k.tint }}>
            <div className="us-head">
              <p className="us-lead">{k.lead}</p>
              <svg
                className="us-icon"
                viewBox="0 -960 960 960"
                aria-hidden="true"
                focusable="false"
              >
                <path d={ICONS[k.icon]} />
              </svg>
            </div>
            <p className="us-body">{k.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        /* Layout mengikuti pola "label kecil di atas · icon kanan atas ·
         * pernyataan besar didorong ke bawah" — card punya aspect ratio
         * supaya area kosong di tengah terasa disengaja. */
        .us-card {
          position: relative;
          border-radius: var(--radius-xl);
          padding: var(--card-padding);
          display: flex;
          flex-direction: column;
          color: var(--color-studio-ink);
          aspect-ratio: 16 / 9;
        }

        .us-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--spacing-16);
        }

        /* Label kecil — nama keadaan */
        .us-lead {
          font-size: var(--text-subheading);
          line-height: var(--leading-subheading);
          letter-spacing: var(--tracking-subheading);
          font-weight: 400;
          opacity: 0.85;
        }

        .us-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          fill: currentColor;
        }

        /* Pernyataan utama — besar, medium, di dasar card */
        .us-body {
          margin-top: auto;
          padding-top: var(--spacing-32);
          max-width: 540px;
          font-size: var(--text-heading);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          font-weight: 500;
          text-wrap: balance;
        }

        /* Tablet: 2 kolom masih muat, tapi kartu jadi persegi & tipografi turun
           satu tingkat supaya judul panjang tidak pecah 3 baris */
        @media (max-width: 1100px) {
          .us-card { aspect-ratio: 1 / 1; }
          .us-icon { width: 40px; height: 40px; }
          .us-lead {
            font-size: var(--text-subheading);
            line-height: var(--leading-subheading);
            letter-spacing: var(--tracking-subheading);
          }
          .us-body {
            font-size: 22px;
            line-height: 1.3;
            letter-spacing: -0.4px;
          }
        }

        /* Mobile: 1 kolom. aspect-ratio dilepas — tinggi mengikuti isi,
           jadi teks tidak pernah terpotong di layar sempit */
        @media (max-width: 640px) {
          #untuk-siapa .grid-2 { grid-template-columns: 1fr; }
          .us-card {
            aspect-ratio: auto;
            min-height: 200px;
            padding: var(--spacing-24);
          }
          .us-lead {
            font-size: var(--text-body);
            line-height: var(--leading-body);
            letter-spacing: var(--tracking-body);
          }
          .us-body {
            font-size: var(--text-subheading);
            line-height: var(--leading-subheading);
            letter-spacing: var(--tracking-subheading);
            padding-top: var(--spacing-24);
            max-width: none;
          }
          .us-icon { width: 32px; height: 32px; }
        }

        .us-link { align-self: flex-start; }
      `}</style>
    </Section>
  );
}
