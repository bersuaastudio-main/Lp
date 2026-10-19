import Section from "./Section";
import CarouselDots from "./CarouselDots";

/** Testimoni klien — diletakkan setelah Harga, sebelum FAQ.
 *
 *  Isi `quote` HANYA dengan kutipan asli yang sudah disetujui klien (tertulis,
 *  mis. lewat WhatsApp). Kartu dengan `quote` kosong tidak ditampilkan, dan
 *  seluruh section tersembunyi selama belum ada satu pun kutipan.
 *  Testimoni karangan dilarang (prd.md G5, Requirement.md REQ-C5A.5). */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Harus sama dengan nama proyek di Showcase. */
  project: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dengan adanya website, kami punya kesempatan untuk memperkenalkan Gatra ke pasar yang lebih luas, nggak hanya mengandalkan jangkauan yang sudah ada. Produk batik kami juga bisa ditampilkan dengan lebih profesional, sehingga nilai dan karakter brand bisa tersampaikan dengan lebih baik.",
    name: "Annisa",
    role: "",
    project: "Gatra · Batik Tulis",
  },
  {
    quote:
      "Cocok buat bisnis yang ingin membangun kredibilitas dan terlihat lebih profesional di mata calon klien.",
    name: "Ridho",
    role: "",
    project: "Hayati House · Greenhouse & Hidroponik",
  },
  {
    quote:
      "Website membantu kami memperkenalkan bisnis secara lebih terbuka, mulai dari informasi usaha hingga produk yang kami tawarkan.",
    name: "Rizky",
    role: "",
    project: "Freshville · Distributor Sayur",
  },
];

/* Selama pengembangan (localhost), slot kosong tampil sebagai kartu penanda
 * supaya desainnya bisa dinilai. Di build produksi slot kosong tidak pernah tampil. */
const IS_DEV = process.env.NODE_ENV !== "production";

export default function Testimoni() {
  const filled = TESTIMONIALS.filter((t) => t.quote.trim() && t.name.trim());
  const preview = filled.length === 0 && IS_DEV;
  if (filled.length === 0 && !preview) return null;

  const items = preview
    ? TESTIMONIALS.map((t) => ({
        ...t,
        quote: "[Kutipan asli dari klien — isi di Testimoni.tsx]",
        name: "[Nama klien]",
        role: "[Jabatan]",
      }))
    : filled;

  return (
    <Section
      id="testimoni"
      track="testimoni"
      heading="Kata mereka yang sudah bekerja bersama kami."
      surface="cream"
    >
      {preview && (
        <p className="tm-dev">
          Pratinjau desain (hanya di localhost). Section ini tersembunyi di website
          live sampai kutipan asli diisi.
        </p>
      )}
      <ul className="tm-grid" id="tm-grid">
        {items.map((t) => (
          <li key={t.project} className={`tm-card${preview ? " is-placeholder" : ""}`}>
            <blockquote className="tm-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="tm-who">
              <p className="tm-name">{t.name}</p>
              <p className="tm-role">
                {t.role ? `${t.role} · ` : ""}
                {t.project}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <CarouselDots targetId="tm-grid" count={items.length} label="Pilih testimoni" />

      <style>{`
        .tm-dev {
          margin: 0 0 var(--spacing-24, 24px);
          padding: 10px 14px;
          border: 1px dashed var(--color-ink-20);
          border-radius: 10px;
          font-size: 13px;
          color: var(--color-ink-60);
        }
        .tm-card.is-placeholder { outline: 1.5px dashed var(--color-ink-20); outline-offset: -1px; }
        .tm-card.is-placeholder .tm-quote,
        .tm-card.is-placeholder .tm-name { color: var(--color-ink-60); }
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-24, 24px);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tm-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: var(--spacing-32, 32px);
          padding: clamp(24px, 3vw, 36px);
          border: 1px solid var(--color-ink-08);
          border-radius: 16px;
          background: var(--color-card-white);
        }
        .tm-quote {
          margin: 0;
          font-size: clamp(18px, 1.5vw, 21px);
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: var(--color-studio-ink);
        }
        .tm-name { margin: 0; font-size: 16px; color: var(--color-studio-ink); }
        .tm-role { margin: 4px 0 0; font-size: 14px; color: var(--color-ink-60); }
        .tm-grid { position: relative; }

        /* HP: tiga kutipan panjang jadi carousel geser */
        @media (max-width: 767px) {
          .tm-grid {
            display: flex;
            gap: 12px;
            margin-inline: -24px;
            padding: 2px 24px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-inline: 24px;
            scrollbar-width: none;
          }
          .tm-grid::-webkit-scrollbar { display: none; }
          .tm-card { flex: 0 0 86%; scroll-snap-align: center; padding: 22px; gap: 24px; }
          .tm-quote { font-size: 16px; }
        }
      `}</style>
    </Section>
  );
}
