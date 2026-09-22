import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

/* Self-host + preload otomatis; display swap mencegah teks tak terlihat saat
   font belum siap. Hanya subset latin — halaman ini seluruhnya bahasa Indonesia. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
import { SITE_URL } from "@/app/lib/constants";

/* ID analytics dibaca dari environment, bukan hardcode. Script hanya dirender
   jika ID-nya terisi — tanpa env, halaman tidak memanggil pihak ketiga sama
   sekali (menghindari request gagal & beban load percuma).
   Set di hosting: NEXT_PUBLIC_GA_ID=G-… dan NEXT_PUBLIC_CLARITY_ID=… */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const SITE_NAME = "Bersua";

/* Judul & deskripsi mengikuti positioning hero: kredibilitas digital → pasar global.
   Title ≤ 60 karakter, description ≤ 155 karakter agar tidak terpotong di Google. */
const SITE_TITLE = "Bersua — Website Profil Bisnis yang Membangun Kredibilitas";
const SITE_DESC =
  "Bersua membantu bisnis Anda tumbuh melalui website profil bisnis profesional yang meningkatkan kredibilitas dan membuka kesempatan menjangkau pasar global.";

/* Preview WhatsApp — tautan ini paling sering dibagikan lewat WA (REQ-F8),
   jadi judul preview mengulang headline hero agar konsisten saat dibuka. */
const OG_TITLE = "Partner Membangun Kredibilitas Digital Bisnis Anda";
const OG_DESC =
  "Website profil bisnis yang membuat calon pelanggan, partner, dan pasar global cukup yakin untuk memulai percakapan dengan Anda.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: OG_DESC,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: OG_TITLE,
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        {CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
