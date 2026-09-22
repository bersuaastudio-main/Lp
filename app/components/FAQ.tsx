import Section from "./Section";

/** 09 · Pertanyaan */
const faqs = [
  {
    q: "Apa saja yang perlu saya siapkan?",
    a: "Anda cukup menyiapkan materi yang sudah tersedia, seperti logo, foto, informasi bisnis, daftar layanan atau produk, dan kontak yang ingin ditampilkan. Jika masih ada materi yang belum lengkap, kami akan membantu mengarahkan kebutuhan kontennya selama proses pengerjaan.",
  },
  {
    q: "Berapa lama website saya selesai?",
    a: "Waktu pengerjaan menyesuaikan paket dan kebutuhan website Anda. Secara umum, website dapat diselesaikan dalam 2–3 hari untuk paket standar dan 4–5 hari untuk paket yang lebih kompleks, setelah seluruh materi yang dibutuhkan tersedia dan proses pengerjaan dimulai.",
  },
  {
    q: "Apakah ada biaya tambahan di luar paket?",
    a: "Harga paket mencakup fitur dan layanan yang tercantum di dalamnya. Jika Anda membutuhkan fitur atau kebutuhan khusus di luar paket, seperti integrasi tertentu atau pengembangan custom, biaya tambahannya akan diinformasikan dan disepakati terlebih dahulu sebelum pengerjaan.",
  },
  {
    q: "Apakah saya bisa request desain?",
    a: "Bisa. Desain dapat disesuaikan dengan identitas dan kebutuhan brand Anda, mulai dari gaya visual, warna, tipografi, hingga referensi website yang Anda sukai. Kami akan memastikan desain tetap sesuai dengan tujuan dan kebutuhan bisnis Anda.",
  },
  {
    q: "Apakah saya bisa melakukan revisi?",
    a: "Bisa. Setiap paket memiliki jumlah revisi yang berbeda dan akan dijelaskan sejak awal. Revisi dilakukan pada tahap review untuk memastikan hasil akhir sesuai dengan kebutuhan yang telah disepakati.",
  },
  {
    q: "Apakah saya mendapatkan support setelah website selesai?",
    a: "Ya. Support tersedia melalui WhatsApp dan tiket support selama periode support yang termasuk dalam paket Anda. Untuk kebutuhan setelah periode tersebut, tersedia layanan maintenance yang dapat disesuaikan dengan kebutuhan website Anda.",
  },
  {
    q: "Apakah website dan domain menjadi milik saya?",
    a: "Ya. Website dan domain merupakan aset bisnis Anda. Kami tidak membuat Anda bergantung pada Bersua untuk memiliki atau mengakses aset tersebut.",
  },
];

export default function FAQ() {
  return (
    <Section
      id="faq"
      track="faq"
      heading="Yang biasanya ditanyakan."
    >
      <div>
        {faqs.map((f) => (
          <details key={f.q} className="faq-item">
            <summary>{f.q}</summary>
            <div className="faq-body">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
