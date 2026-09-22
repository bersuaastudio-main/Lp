import Section from "./Section";

/**
 * 07 · Cara Kerja — naskah content.md v2.3 S7.
 *
 * Empat langkah adalah turunan dari Business Discovery, Competitive Teardown,
 * Conversion Architecture, dan Continuous Improvement — ditulis tanpa satu pun
 * istilahnya, sesuai REQ-L1 dan REQ-L3.
 *
 * Blok batasan ditutup dengan dua butir (REQ-C4.4). Butir SEO dipersempit:
 * menolak menjanjikan POSISI, bukan menolak jangkauan — supaya tidak
 * bertabrakan dengan janji di section Layanan (REQ-C5L.6/.7).
 */
const steps = [
  {
    number: "01",
    title: "Konsultasi",
    body: "Kami menggali kebutuhan bisnis, target pelanggan, serta tujuan yang ingin dicapai melalui website.",
    lead: "Kami memahami bisnis dan tujuan Anda.",
  },
  {
    number: "02",
    title: "Riset",
    body: "Kami mempelajari bagaimana kompetitor memposisikan bisnisnya untuk menemukan peluang yang dapat membuat website Anda lebih relevan dan kompetitif.",
    lead: "Kami menganalisis pasar dan kompetitor Anda.",
  },
  {
    number: "03",
    title: "Strategi & Konten",
    body: "Kami menyusun struktur dan konten berdasarkan informasi yang dibutuhkan calon pelanggan untuk memahami, mempertimbangkan, dan menghubungi bisnis Anda.",
    lead: "Kami menentukan apa yang perlu disampaikan.",
  },
  {
    number: "04",
    title: "Desain & Development",
    body: "Konten dan struktur yang telah disepakati diterjemahkan ke dalam desain dan website yang responsif, cepat, dan siap digunakan.",
    lead: "Kami mengubah strategi menjadi website.",
  },
  {
    number: "05",
    title: "Launch & Optimization",
    body: "Setelah website live, kami memantau performanya untuk melihat apa yang bekerja dan menentukan peluang perbaikan berikutnya.",
    lead: "Kami memastikan website terus memberikan nilai.",
  },
];


export default function ProseKerja() {
  return (
    <Section
      id="proses"
      track="proses_kerja"
      heading="Proses terstruktur untuk menghasilkan website yang tepat untuk bisnis Anda."
      sub="Dari memahami kebutuhan hingga website siap digunakan, setiap tahap memiliki tujuan yang jelas."
    >
      <div className="pk-steps">
        {steps.map((s) => (
          <div key={s.number} className="pk-step">
            <div className="pk-num" aria-hidden="true">{s.number}</div>
            <div className="pk-content">
              <h3 className="pk-title">{s.title}</h3>
              <p className="pk-lead">{s.lead}</p>
              <p className="pk-body">{s.body}</p>
            </div>
          </div>
        ))}
      </div>


      <style>{`
        #proses .sec-head {
          max-width: 100%;
          margin-inline: 0;
          text-align: left;
        }

        .pk-steps { display: flex; flex-direction: column; }

        .pk-step {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: var(--spacing-24);
          align-items: start;
          padding-bottom: var(--spacing-32);
        }

        .pk-step + .pk-step {
          border-top: 1px solid var(--color-ink-08);
          padding-top: var(--spacing-32);
        }

        .pk-num {
          font-size: var(--text-subheading);
          font-weight: var(--weight-display);
          line-height: 1.3;
          color: var(--color-ink-20);
          font-variant-numeric: tabular-nums;
        }

        .pk-content {
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
        }

        .pk-title {
          font-size: var(--text-subheading);
          line-height: var(--leading-subheading);
          letter-spacing: var(--tracking-subheading);
          font-weight: var(--weight-display);
        }

        .pk-lead {
          font-size: var(--text-body);
          line-height: var(--leading-body);
          font-weight: var(--weight-medium);
          color: var(--color-ink-80);
        }

        .pk-body {
          font-size: var(--text-body);
          line-height: var(--leading-body);
          color: var(--color-ink-60);
        }

        @media (max-width: 640px) {
          .pk-step { grid-template-columns: 1fr; gap: var(--spacing-8); }
        }
      `}</style>
    </Section>
  );
}
