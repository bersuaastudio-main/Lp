import Section from "./Section";

/**
 * 04 · Contoh Hasil Kerja — naskah content.md v2.3 S4.
 *
 * REQ-C5A.1 / PRD G5 — judul section DILARANG memakai kata "Portofolio",
 * "Case Study", atau "Klien Kami". Isinya tiga bisnis fiktif; salah nama akan
 * terbongkar saat prospek bertanya di WhatsApp.
 *
 * Saat AST-6 siap: ganti <div className="demo-thumb"> dengan <Image fill … />.
 */
const demos = [
  {
    id: "demo-1",
    businessName: "Klinik Gigi Sewangi",
    businessType: "Praktik dokter gigi, Bekasi",
    alt: "Contoh halaman klinik gigi — Klinik Gigi Sewangi (nama fiktif)",
  },
  {
    id: "demo-2",
    businessName: "Ruangwarna Interior",
    businessType: "Kontraktor interior, Tangerang",
    alt: "Contoh halaman kontraktor interior — Ruangwarna Interior (nama fiktif)",
  },
  {
    id: "demo-3",
    businessName: "CV Prima Teknika",
    businessType: "Distributor alat teknik, Jakarta Timur",
    alt: "Contoh company profile distributor alat teknik — CV Prima Teknika (nama fiktif)",
  },
];

export default function Demo() {
  return (
    <Section
      id="hasil-kerja"
      track="demo"
      heading="Hasil Kerja."
      sub="Tiga ini saya buat sendiri sebagai contoh, bukan pekerjaan klien. Nama bisnisnya karangan."
    >
      <div className="grid-3">
        {demos.map((d) => (
          <article key={d.id} className="demo-card">
            <div className="demo-thumb" role="img" aria-label={d.alt}>
              <span>Gambar menyusul</span>
            </div>
            <div className="demo-body">
              <h3 className="demo-name">{d.businessName}</h3>
              <p className="demo-type">{d.businessType}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .demo-card { display: flex; flex-direction: column; gap: var(--spacing-16); }

        .demo-thumb {
          aspect-ratio: 3 / 2;
          border-radius: var(--radius-xl);
          background-color: var(--color-ink-08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-caption);
          letter-spacing: var(--tracking-caption);
          color: var(--color-ink-20);
        }

        .demo-body { display: flex; flex-direction: column; gap: 2px; }

        .demo-name {
          font-size: var(--text-subheading);
          line-height: var(--leading-subheading);
          letter-spacing: var(--tracking-subheading);
          font-weight: var(--weight-display);
        }

        .demo-type {
          font-size: var(--text-caption);
          letter-spacing: var(--tracking-caption);
          color: var(--color-ink-60);
        }
      `}</style>
    </Section>
  );
}
