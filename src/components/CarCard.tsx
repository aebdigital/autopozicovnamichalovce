import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/data/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/vozidlo/${car.id}`} className="group block">
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#E41C31]/5 hover:-translate-y-2">
        <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-contain p-6 transform group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tight">{car.name}</h3>
            <p className="text-xs font-bold text-[#E41C31] uppercase tracking-[0.2em] mt-1">{car.category || "Osobné vozidlo"}</p>
          </div>

          <div className="flex flex-wrap items-start gap-2 mt-4 min-h-[40px]">
            {car.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-gray-100"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="text-[10px] font-bold text-gray-300 py-2">+ ďalšie</span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Cena od</span>
              <span className="text-2xl font-black text-gray-900">
                {car.price}€<span className="text-xs font-bold text-gray-400 ml-1">/ deň</span>
              </span>
            </div>
            <div className="bg-[#E41C31] text-white w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-black transition-all duration-500 shadow-lg shadow-[#E41C31]/20 group-hover:shadow-black/20">
              <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
