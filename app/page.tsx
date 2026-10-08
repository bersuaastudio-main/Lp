"use client";

import { useEffect } from "react";
import { initScrollDepthTracking, initSectionViewTracking } from "@/app/lib/tracking";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KategoriBisnis from "./components/KategoriBisnis";
import Showcase from "./components/Showcase";
import UntukSiapa from "./components/UntukSiapa";
import Harga from "./components/Harga";
import ProseKerja from "./components/ProseKerja";
import Tentang from "./components/Tentang";
import FAQ from "./components/FAQ";
import CTAPenutup from "./components/CTAPenutup";
import Footer from "./components/Footer";

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

        {/* 02 — Kategori bisnis: empat jenis, empat isi halaman */}
        <KategoriBisnis />

        {/* 03 — Untuk siapa: tiga keadaan pemicu, anchor tujuan DM */}
        <UntukSiapa />

        {/* 04 — Contoh hasil kerja: panggung showcase + tab thumbnail */}
        <Showcase />

        {/* Founder quote — latar ink, jembatan showcase → harga */}
        <Tentang />

        {/* 05 — Harga: solution-based pricing */}
        <Harga />

        {/* 07 — Cara kerja: empat langkah + dua batasan */}
        <ProseKerja />

        {/* 09 — Pertanyaan */}
        <FAQ />

        {/* 10 — Mulai */}
        <CTAPenutup />
      </main>
      <Footer />
    </>
  );
}
