"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "Čo potrebujem na prenájom auta?",
    answer:
      "Potrebujete platný vodičský preukaz, kreditnú kartu a musíte mať aspoň 21 rokov. Zahraniční návštevníci potrebujú platný pas a medzinárodný vodičský preukaz.",
  },
  {
    question: "Je poistenie zahrnuté v cene prenájmu?",
    answer: "Ponúkame kompletné havarijné poistenie, ktoré je v cene.",
  },
  {
    question: "Môžem zmeniť alebo zrušiť rezerváciu?",
    answer:
      "Áno, môžete zmeniť alebo zrušiť rezerváciu až do 24 hodín pred prebratím bez akýchkoľvek poplatkov. Zmeny do 24 hodín môžu byť spoplatnené.",
  },
  {
    question: "Ponúkate službu doručenia?",
    answer:
      "Áno, ponúkame službu doručenia a vyzdvihnutia vozidla v rámci mesta za príplatok. Kontaktujte nás pre viac informácií a ceny.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Často kladené otázky
          </h2>
          <div className="w-24 h-1.5 bg-[#E41C31] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="overflow-hidden border-b border-gray-100">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left group transition-all"
              >
                <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-[#E41C31]' : 'text-gray-900 group-hover:text-[#E41C31]'}`}>
                  {item.question}
                </span>
                <span className={`text-2xl font-light ml-4 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-[#E41C31]' : 'text-gray-300'}`}>
                  +
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="pb-8">
                      <p className="text-gray-500 text-lg leading-relaxed max-w-2xl font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
