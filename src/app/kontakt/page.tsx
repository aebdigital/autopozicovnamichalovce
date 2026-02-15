"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";

const contactMethods = [
  {
    icon: "phone",
    title: "Telefón",
    value: "0951 350 640",
    href: "tel:0951350640"
  },
  {
    icon: "email",
    title: "Email",
    value: "info@dariusgarage.sk",
    href: "mailto:info@dariusgarage.sk"
  },
  {
    icon: "location",
    title: "Adresa",
    value: "Stavbárov 8, 071 01 Michalovce",
    href: "https://maps.google.com/?q=Stavbárov+8,+071+01+Michalovce"
  },
  {
    icon: "clock",
    title: "Otváracie hodiny",
    value: "Po-Pia: 8:00 - 17:00",
  },
];

function ContactIcon({ type }: { type: string }) {
  switch (type) {
    case "phone":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "email":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "location":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "clock":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactPage() {
  const [mapActive, setMapActive] = useState(false);

  return (
    <>
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.webp"
            alt="Kontaktujte nás"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-[90%] mx-auto sm:px-6 lg:px-8 w-full text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-2xl">
            Budeme radi,<br className="hidden md:block" /> ak sa nám ozvete
          </h1>
          <p className="mt-6 text-xl text-gray-300 font-medium max-w-2xl drop-shadow-md">
            Sme tu pre vás každý pracovný deň. Či už potrebujete rezerváciu, alebo máte otázku, náš tím vám ochotne poradí.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Kontaktujte nás</h2>
              <p className="text-gray-500 font-medium mb-12">
                Sme k dispozícii na telefóne, emaile alebo osobne na našej prevádzke.
              </p>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <div key={method.title} className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gray-50 group-hover:bg-[#E41C31] group-hover:text-white rounded-2xl flex items-center justify-center text-[#E41C31] transition-all">
                        <ContactIcon type={method.icon} />
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{method.title}</h3>
                        {method.href ? (
                          <a href={method.href} className="text-lg font-bold text-gray-900 hover:text-[#E41C31] transition-colors">{method.value}</a>
                        ) : (
                          <p className="text-lg font-bold text-gray-900">{method.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[500px] relative group overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21360.29232!2d21.91427!3d48.75626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ecf8eb8818279%3A0x6a0c5c4e9f5e5f5!2sStavb%C3%A1rov%208%2C%20071%2001%20Michalovce!5e0!3m2!1ssk!2ssk!4v1700000000000!5m2!1ssk!2ssk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`grayscale hover:grayscale-0 transition-all duration-1000 ${mapActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        />

        {!mapActive && (
          <div
            onClick={() => setMapActive(true)}
            className="absolute inset-0 z-10 cursor-pointer bg-transparent"
          />
        )}

        {!mapActive && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold text-black uppercase tracking-widest shadow-lg">
              Kliknite pre interakciu s mapou
            </span>
          </div>
        )}

        {mapActive && (
          <button
            onClick={() => setMapActive(false)}
            className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-[#E41C31] text-white p-2 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Zamknúť mapu
          </button>
        )}
      </section>
    </>
  );
}
