"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Domov", key: "home" },
    { href: "/ponuka-vozidiel", label: "Ponuka vozidiel", key: "ponuka-vozidiel" },
    { href: "/kontakt", label: "Kontakt", key: "kontakt" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/50 to-transparent pt-2 pb-8">
      <div className="max-w-[90%] mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="group flex items-center">
            <span className="bg-[#E41C31] text-white px-4 py-2 text-sm md:text-base font-black uppercase tracking-tighter italic transition-transform group-hover:scale-105 shadow-lg shadow-red-900/20">
              Autopožičovňa Michalovce
            </span>
          </Link>

          <nav className={`${menuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 bg-black/95 md:bg-transparent flex-col md:flex-row items-center gap-1 md:gap-4 p-6 md:p-0 shadow-2xl md:shadow-none`}>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all w-full md:w-auto text-center ${isActive(link.href)
                  ? "text-white bg-[#E41C31]/90"
                  : "text-gray-100 hover:text-[#E41C31] hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:0951350640"
              className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-[#E41C31] text-white px-5 py-2.5 rounded-full text-sm font-black transition-all border border-white/10 hover:border-transparent"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0951 350 640
            </a>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
