"use client";

import { useEffect } from "react";
import { initScrollDepthTracking, initSectionViewTracking } from "@/app/lib/tracking";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import UntukSiapa from "./components/UntukSiapa";
import Testimoni from "./components/Testimoni";
import Tentang from "./components/Tentang";
import Harga from "./components/Harga";
import ProseKerja from "./components/ProseKerja";
import FAQ from "./components/FAQ";
import CTAPenutup from "./components/CTAPenutup";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";

export default function Home() {
  useEffect(() => {
    const cleanupScroll = initScrollDepthTracking();
    const cleanupSection = initSectionViewTracking();
    return () => {
      cleanupScroll?.();
      cleanupSection?.();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — Untuk siapa: empat jenis bisnis (gabungan Kategori),
            klik kartu → tab portofolio yang relevan di Featured Project */}
        <UntukSiapa />

        {/* 04 — Contoh hasil kerja: panggung showcase + tab thumbnail */}
        <Showcase />

        {/* 06 — Harga */}
        <Harga />

        {/* 07 — Cara kerja: setelah harga, menjawab "lalu bagaimana prosesnya?" */}
        <ProseKerja />

        {/* 08 — Testimoni: bukti sosial setelah harga & proses.
            Di website live tersembunyi sampai ada kutipan klien asli. */}
        <Testimoni />

        {/* 09 — Pertanyaan */}
        <FAQ />

        {/* Kutipan founder — jembatan personal sebelum ajakan terakhir */}
        <Tentang />

        {/* 10 — Mulai */}
        <CTAPenutup />
      </main>
      <Footer />
      {/* Form leads — dibuka oleh semua CTA sebelum ke WhatsApp */}
      <LeadForm />
    </>
  );
}
