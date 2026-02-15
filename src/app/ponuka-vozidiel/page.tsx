import type { Metadata } from "next";
import { getCars } from "@/data/cars";
import CarCard from "@/components/CarCard";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ponuka vozidiel - Autopožičovňa Michalovce",
  description:
    "Ponuka vozidiel na prenájom v Michalovciach. Škoda, Kia, Toyota, Peugeot. Od 25eur/deň s kompletným poistením.",
};

export default async function FleetPage() {
  const cars = await getCars();

  return (
    <>
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.webp"
            alt="Naša flotila"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-[90%] mx-auto sm:px-6 lg:px-8 w-full text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-2xl">
            Naša flotila<br className="hidden md:block" /> vozidiel
          </h1>
          <p className="mt-6 text-xl text-gray-300 font-medium max-w-2xl drop-shadow-md">
            Vyberte si z našej ponuky pravidelne servisovaných vozidiel. Všetky autá sú pripravené na okamžitý prenájom.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
