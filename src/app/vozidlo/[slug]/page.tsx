import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarBySlug, getCars } from "@/data/cars";
import CarDetailClient from "./CarDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cars = await getCars();
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Vozidlo nenájdené" };

  const title = `${car.name} - Prenájom áut Michalovce`;
  const description = `${car.name} na prenájom v Michalovciach. ${car.seats} miest, ${car.transmission}, ${car.fuel}. Cena od ${car.pricing["7-21days"]}€/deň. Poistenie v cene.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: car.image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [car.image],
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": car.name,
    "description": car.description,
    "image": car.image,
    "brand": {
      "@type": "Brand",
      "name": car.name.split(' ')[0]
    },
    "bodyType": car.category,
    "vehicleConfiguration": `${car.transmission}, ${car.fuel}, ${car.seats} miest`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": car.pricing["7-21days"],
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarDetailClient car={car} />
    </>
  );
}
