"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Car, calculateDailyRate, calculateDaysBetween } from "@/data/cars";

function formatDate(dateString: string): string {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("sk-SK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

const timeOptions = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function CarDetailClient({ car }: { car: Car }) {
  const [pickupDate, setPickupDate] = useState(getToday());
  const [returnDate, setReturnDate] = useState(getTomorrow());
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [services, setServices] = useState({ gps: false, cleaning: false, delivery: false, pickup: false });
  const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", birthDate: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const days = useMemo(() => calculateDaysBetween(pickupDate, returnDate), [pickupDate, returnDate]);
  const dailyRate = useMemo(() => calculateDailyRate(car, days), [car, days]);
  const basePrice = days * dailyRate;

  const servicesPrice =
    (services.gps ? 15 : 0) +
    (services.cleaning ? 35 : 0) +
    (services.delivery ? 5 : 0) +
    (services.pickup ? 5 : 0);

  const totalPrice = basePrice + servicesPrice;

  // Ensure returnDate is always after pickupDate
  useEffect(() => {
    if (returnDate <= pickupDate) {
      const d = new Date(pickupDate);
      d.setDate(d.getDate() + 1);
      setReturnDate(d.toISOString().split("T")[0]);
    }
  }, [pickupDate, returnDate]);

  const pricingTiers = [
    { label: "1 deň", price: car.pricing["1day"] + "€" },
    { label: "2 - 3 dni", price: car.pricing["2-3days"] + "€" },
    { label: "4 - 7 dní", price: car.pricing["4-7days"] + "€" },
    { label: "7 - 21 dní", price: car.pricing["7-21days"] + "€" },
    { label: "21 dní a viac", price: car.pricing["21plus"] },
  ];

  function openModal() {
    if (!pickupTime || !returnTime || !pickupLocation || !returnLocation) return;
    setShowModal(true);
    setStep(1);
  }

  async function submitReservation() {
    if (!termsAccepted) {
      alert("Musíte súhlasiť s ochranou osobných údajov.");
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...personalInfo,
          carTitle: car.name,
          pickupDate,
          returnDate,
          pickupTime,
          returnTime,
          pickupLocation,
          returnLocation,
          totalDays: days,
          totalPrice,
          servicesPrice,
          deposit: car.pricing.deposit,
          selectedServices: Object.entries(services)
            .filter(([, v]) => v)
            .map(([k]) => k),
          termsAccepted,
        }),
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        setShowModal(false);
        window.location.href = "/";
      }
    } catch {
      alert("Došlo k chybe pri odosielaní rezervácie. Skúste to prosím neskôr.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Mini Hero */}
      <section className="relative h-[20vh] min-h-[150px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.webp"
            alt="Darius Garage"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
        </div>
      </section>

      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-gray-50">
        <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Car Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">{car.name}</h1>
                <p className="text-gray-500 text-lg uppercase tracking-widest font-medium">{car.category}</p>
              </div>

              <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-inner group overflow-hidden">
                <div className="relative aspect-[16/10] transform group-hover:scale-105 transition-transform duration-700">
                  <Image src={car.image} alt={car.name} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" priority unoptimized />
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Špecifikácie vozidla</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Počet miest", value: car.seats, icon: "👤" },
                    { label: "Prevodovka", value: car.transmission, icon: "⚙️" },
                    { label: "Palivo", value: car.fuel, icon: "⛽" },
                    { label: "Batožina", value: car.luggage, icon: "💼" },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-2xl mb-2 block">{spec.icon}</span>
                      <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">{spec.label}</p>
                      <p className="font-bold text-gray-900 text-sm">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Table */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="grid grid-cols-2 bg-gray-900 px-6 py-4 text-sm font-bold text-white uppercase tracking-widest">
                  <span>Trvanie</span>
                  <span className="text-right">Cena za deň</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {pricingTiers.map((tier) => (
                    <div key={tier.label} className="grid grid-cols-2 px-6 py-4 text-base hover:bg-gray-50 transition-colors">
                      <span className="text-gray-600 font-medium">{tier.label}</span>
                      <span className="text-right font-bold text-gray-900">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Reservation Form */}
            <div className="relative">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-2xl sticky top-28">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Nezáväzná rezervácia</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Dátum prevzatia</label>
                      <input type="date" value={pickupDate} min={getToday()} onChange={(e) => setPickupDate(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Dátum vrátenia</label>
                      <input type="date" value={returnDate} min={pickupDate} onChange={(e) => setReturnDate(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Čas prevzatia</label>
                      <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all appearance-none">
                        <option value="">Vyberte čas</option>
                        {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Čas vrátenia</label>
                      <select value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all appearance-none">
                        <option value="">Vyberte čas</option>
                        {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Miesto prevzatia</label>
                      <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all appearance-none text-overflow-ellipsis">
                        <option value="">Vyberte miesto</option>
                        <option value="michalovce">Michalovce - Stavbárov 8</option>
                        <option value="delivery">Michalovce dovoz (+5€)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Miesto vrátenia</label>
                      <select value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all appearance-none text-overflow-ellipsis">
                        <option value="">Vyberte miesto</option>
                        <option value="michalovce">Michalovce - Stavbárov 8</option>
                        <option value="pickup">Michalovce vyzdvihnutie (+5€)</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Summary Card */}
                  <div className="bg-gray-900 rounded-3xl p-6 text-white space-y-4 shadow-xl">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-400">
                      <span>Počet dní:</span>
                      <span className="text-white text-lg">{days}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-400">
                      <span>Cena za deň:</span>
                      <span className="text-white text-lg">{dailyRate}€</span>
                    </div>
                    <div className="pt-4 border-t border-gray-800 flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#E41C31] uppercase tracking-widest">Celková cena</span>
                        <div className="text-3xl font-black">{basePrice}€</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Vratná kaucia</span>
                        <span className="text-sm font-bold">{car.pricing.deposit}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-xs text-red-900 leading-relaxed italic">
                    <p className="font-bold mb-1">Poistenie a Slovenská diaľničná známka v cene prenájmu.</p>
                    <p>Denný limit {car.limits.daily}, nad limit {car.limits.excess}.</p>
                  </div>

                  <button type="submit" className="w-full bg-[#E41C31] hover:bg-[#C8192B] text-white py-5 rounded-2xl font-bold transition-all text-xl shadow-lg hover:shadow-[#E41C31]/20 hover:-translate-y-1 active:scale-95">
                    Pokračovať v rezervácii
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-20 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">O tomto vozidle</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">{car.description}</p>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Štandardné vybavenie</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {["Klimatizácia", "Elektrické okná", "Centrálne zamykanie", "Audio systém", "USB pripojenie", "Bezpečnostné airbagy", "ABS brzdový systém", "Parkovacie senzory"].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy-style Reservation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] max-w-6xl w-full max-h-[90vh] flex flex-col relative shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header with Step Indicator */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-t-[2.5rem] relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl transition-all"
              >
                &times;
              </button>

              <div className="flex items-center justify-center gap-4 sm:gap-12">
                {[
                  { num: 1, label: "Vozidlo", icon: "🚗" },
                  { num: 2, label: "Služby", icon: "✨" },
                  { num: 3, label: "Údaje", icon: "📝" },
                ].map((s) => (
                  <div
                    key={s.num}
                    className={`flex flex-col sm:flex-row items-center gap-2 transition-all duration-500 ${step >= s.num ? "opacity-100 scale-100" : "opacity-30 scale-95"
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg transition-colors ${step === s.num ? "bg-[#E41C31] text-white" : step > s.num ? "bg-green-500 text-white" : "bg-gray-800 text-gray-400"
                      }`}>
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left - Sticky Summary (Always visible in steps) */}
                <div className="lg:col-span-1 border-r border-gray-100 pr-0 lg:pr-10">
                  <div className="sticky top-0 space-y-8">
                    <div className="relative aspect-[16/10] bg-gray-50 rounded-3xl p-4 overflow-hidden border border-gray-100">
                      <Image src={car.image} alt={car.name} fill className="object-contain" sizes="300px" unoptimized />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{car.name}</h3>

                      <div className="space-y-4 text-sm text-gray-500 border-l-2 border-[#E41C31] pl-6 py-2">
                        <p>
                          <span className="font-bold uppercase text-[10px] block mb-1 text-gray-400">Dátum prevzatia</span>
                          {formatDate(pickupDate)} o {pickupTime || "--:--"}
                        </p>
                        <p>
                          <span className="font-bold uppercase text-[10px] block mb-1 text-gray-400">Dátum vrátenia</span>
                          {formatDate(returnDate)} o {returnTime || "--:--"}
                        </p>
                        <p>
                          <span className="font-bold uppercase text-[10px] block mb-1 text-gray-400">Doba prenájmu</span>
                          {days} {days === 1 ? "deň" : (days >= 2 && days <= 4 ? "dni" : "dní")}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-3xl p-6 space-y-3 border border-gray-100">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-medium">Prenájom:</span>
                          <span className="font-bold text-gray-900">{basePrice}€</span>
                        </div>
                        {servicesPrice > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400 font-medium">Extra služby:</span>
                            <span className="font-bold text-gray-900">{servicesPrice}€</span>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-xs font-black uppercase tracking-widest text-[#E41C31]">Celkom</span>
                          <span className="text-2xl font-black text-gray-900">{totalPrice}€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Dynamic Steps Content */}
                <div className="lg:col-span-2">

                  {/* Step 1: Summary / Confirmation */}
                  {step === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Prehľad rezervácie</h2>
                      <p className="text-gray-500 leading-relaxed">Prosím, skontrolujte si vybrané vozidlo a termíny pred pokračovaním k výberu doplnkových služieb.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Prevzatie</span>
                          <p className="font-bold text-gray-900">{pickupLocation === "michalovce" ? "Michalovce - Stavbárov 8" : "Dovoz na adresu"}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Vrátenie</span>
                          <p className="font-bold text-gray-900">{returnLocation === "michalovce" ? "Michalovce - Stavbárov 8" : "Vyzdvihnutie na adrese"}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-8">
                        <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 font-bold uppercase text-xs tracking-widest transition-colors">Zrušiť</button>
                        <button onClick={() => setStep(2)} className="bg-[#E41C31] hover:bg-[#C8192B] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-[#E41C31]/20 hover:-translate-y-1">Pokračovať</button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Services */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Doplnkové služby</h2>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">Zahrnuté poistenie</h4>
                        <div className="bg-green-50/50 border border-green-100 rounded-3xl p-5 flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                          <div>
                            <p className="font-bold text-gray-900">Kompletné havarijné poistenie</p>
                            <p className="text-xs text-green-700 font-medium tracking-tight">V cene prenájmu na celú dobu</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">Extra doplnky</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { key: "gps" as const, label: "GPS navigácia", desc: "Najnovšie mapy Slovenska", price: "+15€" },
                            { key: "cleaning" as const, label: "Čistenie vozidla", desc: "Bez starostí s umývaním", price: "+35€" },
                            { key: "delivery" as const, label: "Doručenie vozidla", desc: "V rámci Michaloviec", price: "+5€" },
                            { key: "pickup" as const, label: "Prevzatie vozidla", desc: "Z vašej adresy", price: "+5€" },
                          ].map((svc) => (
                            <label key={svc.key} className={`flex flex-col gap-4 p-6 rounded-3xl cursor-pointer transition-all border-2 ${services[svc.key] ? "border-[#E41C31] bg-red-50/50 ring-4 ring-[#E41C31]/5" : "border-gray-100 bg-white hover:border-gray-200"
                              }`}>
                              <div className="flex justify-between items-start">
                                <input
                                  type="checkbox"
                                  checked={services[svc.key]}
                                  onChange={(e) => setServices({ ...services, [svc.key]: e.target.checked })}
                                  className="h-6 w-6 accent-[#E41C31] hidden"
                                />
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${services[svc.key] ? "bg-[#E41C31] border-[#E41C31] text-white" : "border-gray-200 bg-white text-transparent"
                                  }`}>✓</div>
                                <span className="text-xs font-black text-gray-900">{svc.price}</span>
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{svc.label}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-tight">{svc.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-8">
                        <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-900 font-bold uppercase text-xs tracking-widest transition-colors">Naspäť</button>
                        <button onClick={() => setStep(3)} className="bg-[#E41C31] hover:bg-[#C8192B] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-[#E41C31]/20 hover:-translate-y-1">Pokračovať</button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Personal Info */}
                  {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Osobné údaje</h2>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Meno *</label>
                            <input type="text" required value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-sm font-bold transition-all" placeholder="Ján" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Priezvisko *</label>
                            <input type="text" required value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-sm font-bold transition-all" placeholder="Novák" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">E-mail *</label>
                            <input type="email" required value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-sm font-bold transition-all" placeholder="jan.novak@priklad.sk" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Telefón *</label>
                            <input type="tel" required value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-sm font-bold transition-all" placeholder="+421 ..." />
                          </div>
                        </div>
                        <div className="max-w-xs space-y-2">
                          <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Dátum narodenia *</label>
                          <input type="date" required value={personalInfo.birthDate} onChange={(e) => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-sm font-bold transition-all" />
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-3xl p-6 border-l-4 border-amber-400">
                        <label className="flex items-start gap-4 cursor-pointer">
                          <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 h-6 w-6 accent-[#E41C31]" />
                          <span className="text-xs text-gray-500 font-bold uppercase tracking-tight leading-normal">
                            Súhlasím s{" "}
                            <a href="/ochrana-osobnych-udajov" target="_blank" className="text-[#E41C31] hover:underline">
                              ochranou osobných údajov
                            </a> a podmienkami rezervácie.
                          </span>
                        </label>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <button onClick={() => setStep(2)} className="text-gray-400 hover:text-gray-900 font-bold uppercase text-xs tracking-widest transition-colors">Naspäť</button>
                        <button
                          onClick={submitReservation}
                          disabled={submitting || !personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone || !personalInfo.birthDate || !termsAccepted}
                          className="bg-gray-900 hover:bg-black disabled:opacity-30 text-white px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                        >
                          {submitting ? "Spracúva sa..." : "Odoslať dopyt"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
