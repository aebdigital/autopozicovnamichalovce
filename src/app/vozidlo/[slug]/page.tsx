import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarBySlug } from "@/data/cars";
import CarDetailClient from "./CarDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Vozidlo nenájdené" };

  return {
    title: `${car.name} - Prenájom áut Michalovce`,
    description: car.description,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}
