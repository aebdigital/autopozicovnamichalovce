"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch {
      setMessage({ type: "error", text: "Došlo k chybe pri odosielaní správy. Skúste to prosím neskôr." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic">Pošlite nám správu</h2>

      {message && (
        <div className={`mb-8 p-6 rounded-2xl text-sm font-bold ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-100" : "bg-red-50 text-red-800 border border-red-100"}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Celé meno *</label>
            <input type="text" id="name" name="name" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all" placeholder="Jozef Mrkvička" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Emailová adresa *</label>
            <input type="email" id="email" name="email" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all" placeholder="jozef@gmail.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Telefónne číslo</label>
            <input type="tel" id="phone" name="phone" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all" placeholder="+421 9xx xxx xxx" />
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Predmet *</label>
            <select id="subject" name="subject" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all appearance-none">
              <option value="">Vyberte predmet</option>
              <option value="booking">Nová rezervácia</option>
              <option value="modification">Úprava rezervácie</option>
              <option value="support">Zákaznícka podpora</option>
              <option value="other">Iné</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contactMessage" className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Správa *</label>
          <textarea id="contactMessage" name="message" rows={5} required placeholder="Napíšte nám, ako vám môžeme pomôcť..." className="w-full px-6 py-5 bg-gray-50 border-none rounded-[2rem] focus:ring-4 focus:ring-[#E41C31]/10 outline-none text-base font-medium transition-all resize-none" />
        </div>

        <div className="flex items-center gap-3 py-2">
          <input type="checkbox" id="gdpr" name="gdpr" required className="h-5 w-5 rounded-lg border-none bg-gray-100 text-[#E41C31] focus:ring-[#E41C31]/20 cursor-pointer" />
          <label htmlFor="gdpr" className="text-sm font-bold text-gray-400 uppercase tracking-tight cursor-pointer">
            Súhlasím so{" "}
            <a href="/ochrana-osobnych-udajov" target="_blank" className="text-[#E41C31] hover:underline">
              spracovaním údajov
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E41C31] hover:bg-[#C8192B] disabled:opacity-50 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl shadow-[#E41C31]/20 hover:-translate-y-1 active:scale-95"
        >
          {loading ? "Odosielanie..." : "Odoslať správu"}
        </button>
      </div>
    </form>
  );
}
