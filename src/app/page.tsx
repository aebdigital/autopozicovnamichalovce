import Image from "next/image";
import { getCars } from "@/data/cars";
import CarCard from "@/components/CarCard";
import FAQ from "@/components/FAQ";

const reasons = [
  {
    icon: "/icons/novevozidla.svg",
    title: "Nové vozidlá",
    desc: "Široký výber nových, moderných vozidiel od prémiových značiek",
  },
  {
    icon: "/icons/plnepoistene.svg",
    title: "Plne poistené",
    desc: "Kompletné poistné krytie a ochrana pre váš bezstarostný prenájom",
  },
  {
    icon: "/icons/pravidelneservisovane.svg",
    title: "Pravidelne servisované",
    desc: "Všetky vozidlá sú pravidelne kontrolované a servisované odborníkmi",
  },
  {
    icon: "/icons/dialnicna znamka.svg",
    title: "Diaľničná známka v cene",
    desc: "Slovenská diaľničná známka je zahrnutá v cene prenájmu",
  },
  {
    icon: "/icons/sezonne prezutie.svg",
    title: "Sezónne prezutie",
    desc: "Vozidlá vybavené sezónnymi pneumatikami pre maximálnu bezpečnosť",
  },
  {
    icon: "/icons/skvelete hodnotenia.svg",
    title: "Skvelé hodnotenia",
    desc: "Vysoké hodnotenia spokojnosti od našich zákazníkov",
  },
];

import Hero from "@/components/Hero";

export default async function HomePage() {
  const cars = await getCars();
  const featuredCars = cars.filter(c => c.show_on_homepage);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Cars */}
      <section id="cars" className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Naše vozidlá
            </h2>
            <div className="w-24 h-1.5 bg-[#E41C31] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/ponuka-vozidiel" className="inline-block border border-gray-300 hover:border-[#E41C31] hover:text-[#E41C31] text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors">
              Zobraziť všetky vozidlá
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Prečo práve my?
            </h2>
            <div className="w-24 h-1.5 bg-[#E41C31] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="group p-8 rounded-[2rem] bg-white/[0.08] border border-white/[0.05] hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center bg-white/[0.05] rounded-2xl shadow-sm group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <img
                    src={reason.icon}
                    alt={reason.title}
                    className="w-10 h-10 invert brightness-0 opacity-90"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </>
  );
}
