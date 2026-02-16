import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://autopozicovnamichalovce.sk'),
  title: {
    default: "Autopožičovňa Michalovce - Spoľahlivá požičovňa áut | Darius Garage",
    template: "%s | Darius Garage",
  },
  description:
    "Prémiová autopožičovňa v Michalovciach. Široký výber nových vozidiel, kompletné poistenie, diaľničná známka v cene a profesionálny prístup. Rezervujte si auto online ešte dnes!",
  keywords: [
    "autopožičovňa Michalovce",
    "požičovňa áut Michalovce",
    "prenájom áut Michalovce",
    "dlhodobý prenájom áut",
    "lacná autopožičovňa",
    "Darius Garage",
    "auto na prenájom",
    "Michalovce car rental"
  ],
  authors: [{ name: "Darius Garage", url: "https://autopozicovnamichalovce.sk" }],
  creator: "AEB Digital",
  publisher: "Darius Garage s.r.o.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Autopožičovňa Michalovce - Spoľahlivá požičovňa áut | Darius Garage",
    description: "Prémiová autopožičovňa v Michalovciach. Široký výber vozidiel, výhodné ceny a profesionálne služby. Poistenie a diaľničná známka v cene.",
    url: "https://autopozicovnamichalovce.sk",
    siteName: "Darius Garage",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Darius Garage - Autopožičovňa Michalovce",
      },
    ],
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autopožičovňa Michalovce - Darius Garage",
    description: "Prenájom prémiových áut v Michalovciach. Férové ceny a skvelý prístup.",
    images: ["/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <PageTransition>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </PageTransition>
        <SmoothScroll />
      </body>
    </html>
  );
}
