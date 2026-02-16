import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Kontakt - Autopožičovňa Michalovce",
  description:
    "Kontaktujte Darius Garage v Michalovciach. Rezervácie áut, ceny a informácie na telefóne 0951 350 640 alebo osobne na Stavbárov 8.",
  openGraph: {
    title: "Kontakt - Autopožičovňa Michalovce | Darius Garage",
    description: "Sme tu pre vás v Michalovciach. Zavolajte nám alebo nás navštívte osobne.",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
