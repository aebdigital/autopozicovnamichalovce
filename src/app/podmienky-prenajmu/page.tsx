import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podmienky prenajmu - Autopozicovna Michalovce",
  description: "Vseobecne podmienky prenajmu vozidiel v Autopozicovni Michalovce.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Podmienky prenajmu</h1>
          <p className="mt-3 text-gray-300">Vsetky dolezite informacie o prenajme vozidiel</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Potrebne doklady k prenajmu vozidla</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>platny obciansky preukaz alebo cestovny pas</li>
                <li>vodicsky preukaz platny minimalne 1 rok</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Platobne podmienky</h2>
              <p className="text-gray-600 mb-3">
                Platba za prenajom vozidla sa uskutocnuje v hotovosti pri jeho preberani. Sucastou platby je aj vratna kaucia, ktora bude zakaznikovi vratena v plnej vyske po vrateni neposkodeneho vozidla.
              </p>
              <p className="text-gray-600">
                Denny limit prejazdenych kilometrov je stanoveny na 200 az 300 kilometrov v zavislosti od konkretneho vozidla. V pripade, ze tento limit je prekroceny, uctuje sa poplatok 0,10 az 0,20 EUR za kazdy dodatocny kilometer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Poistenie vozidla</h2>
              <p className="text-gray-600">
                Pri prenajme ktory prebehol bez poskodenia vozidla je zaloha vratena v plnej vyske. V pripade nehody resp. poskodenia vozidla vinou najomcu, bude zaloha zauctovana v prospech prenajímatela ako spoluucast pre poistovnu. V pripade poruchy alebo havarie je prenajimatel povinny kontaktovat nas alebo asistencnu sluzbu.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Vseobecne podmienky</h2>
              <p className="text-gray-600 mb-3">
                Vozidlo najomca prebera a vracia s plnou nadrz paliva. Prevadzkovy cas autopozicovne je kazdy pracovny den od 8:00 do 17:00 (Po - Pia). Vozidlo je mozne prebrat a odovzdat aj mimo pracovnych hodin po dohode vopred.
              </p>
              <p className="text-gray-600">
                S vozidlom je mozne vycestovat iba do krajin Europskej unie. Vo vsetkych vozidlach je prisny zakaz fajcenia. Vozidlo sa najomcovi odovzdava vycistene a v podobnom stave by sa malo aj vratit. Pri nadmernom znecisteni uctujeme sankciu vo vyske 50&euro;.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
