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
});

export const metadata: Metadata = {
  title: {
    default:
      "Autopožičovňa Michalovce - Spoľahlivá požičovňa áut | Darius Garage",
    template: "%s | Darius Garage",
  },
  description:
    "Autopožičovňa Michalovce ponúka spoľahlivú požičovňu prémiových áut. Široký výber vozidiel, výhodné ceny, kompletné poistenie a profesionálne služby. Rezervujte online!",
  keywords: [
    "autopožičovňa Michalovce",
    "požičovňa áut",
    "prenájom áut",
    "Košice",
    "Prešov",
  ],
  authors: [{ name: "Darius Garage s.r.o." }],
  openGraph: {
    title: "Autopožičovňa Michalovce - Spoľahlivá požičovňa áut",
    description:
      "Prenájom prémiových áut v Michalovciach. Široký výber vozidiel, výhodné ceny a profesionálne služby.",
    url: "https://autopozicovnamichalovce.sk",
    siteName: "Darius Garage - Autopožičovňa Michalovce",
    locale: "sk_SK",
    type: "website",
    images: [{ url: "/hero.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autopožičovňa Michalovce - Spoľahlivá požičovňa áut",
    description:
      "Prenájom prémiových áut v Michalovciach. Široký výber vozidiel, výhodné ceny a profesionálne služby.",
    images: ["/hero.webp"],
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
