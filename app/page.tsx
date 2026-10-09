"use client";

import { useEffect } from "react";
import { initScrollDepthTracking, initSectionViewTracking } from "@/app/lib/tracking";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import UntukSiapa from "./components/UntukSiapa";
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

        {/* 05 — Harga: dibuka kutipan founder, satu label CTA */}
        <Harga />

        {/* 07 — Cara kerja: empat langkah + dua batasan */}
        <ProseKerja />

        {/* 09 — Pertanyaan */}
        <FAQ />

        {/* 10 — Mulai */}
        <CTAPenutup />
      </main>
      <Footer />
      {/* Form leads — dibuka oleh semua CTA sebelum ke WhatsApp */}
      <LeadForm />
    </>
  );
}
