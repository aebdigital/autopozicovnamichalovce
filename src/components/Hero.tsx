"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <section ref={containerRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src="/hero.webp"
                    alt="Autopožičovňa Michalovce"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 max-w-[90%] mx-auto sm:px-6 lg:px-8 text-left w-full">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-2xl">
                    Spoľahlivá autopožičovňa<br />v Michalovciach
                </h1>
                <p className="mt-6 text-lg md:text-2xl text-gray-100 max-w-3xl font-light drop-shadow-md">
                    Objavte slobodu na ceste s našou kvalitnou flotilou vozidiel. Profesionálne služby, dobré ceny a spoľahlivá podpora.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-start">
                    <a
                        href="/ponuka-vozidiel"
                        className="inline-block bg-[#E41C31] hover:bg-[#C8192B] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-xl hover:shadow-red-900/20"
                    >
                        Ponuka vozidiel
                    </a>
                    <a
                        href="/kontakt"
                        className="inline-block bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                    >
                        Kontaktujte nás
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <button
                    onClick={() => {
                        const nextSection = document.getElementById("cars");
                        if (nextSection) {
                            nextSection.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm hover:bg-[#E41C31] hover:border-transparent transition-all group"
                >
                    <motion.svg
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                </button>
            </motion.div>
        </section>
    );
}
