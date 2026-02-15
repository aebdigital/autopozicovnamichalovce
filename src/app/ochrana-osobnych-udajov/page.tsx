import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobnych udajov - Autopozicovna Michalovce",
  description: "Zasady ochrany osobnych udajov Autopozicovne Michalovce.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Ochrana osobnych udajov</h1>
          <p className="mt-3 text-gray-300">Zasady spracovania a ochrany vasich osobnych udajov</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Prevadzkovatel</h2>
            <p className="text-gray-700">
              <strong>Darius Garage s. r. o.</strong><br />
              Priemyselna 6, 071 01 Michalovce<br />
              Slovenska republika<br />
              ICO: 54261945, DIC: 2121613626<br />
              IC DPH: SK2121613626, podla &sect;4, registracia od 15.5.2023<br />
              E-mail: info@dariusgarage.sk<br />
              Tel.: 0951 350 640
            </p>
            <p className="text-gray-600 mt-3">
              Tieto Zasady ochrany osobnych udajov popisuju, ake osobne udaje spracuvame v suvislosti s pouzivanim nasej webovej stranky a kontaktnych formularov.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">I. Kontaktny formular</h2>
              <p className="text-gray-600 mb-3">Na stranke www.dariusgarage.sk prevadzkujeme kontaktny formular, ktoreho ucelom je umoznit vam:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Polozit otazku k nasim produktom a sluzbam</li>
                <li>Poziadat o cenovu ponuku</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-2">Rozsah spracuvanych udajov:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Meno a priezvisko</li>
                <li>E-mailova adresa</li>
                <li>Telefonne cislo</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mb-2">Ucel spracovania:</h3>
              <p className="text-gray-600 mb-4">Spracuvame uvedene udaje, aby sme vas mohli kontaktovat a reagovat na vas dopyt.</p>

              <h3 className="font-semibold text-gray-900 mb-2">Pravny zaklad:</h3>
              <p className="text-gray-600 mb-4">Clanok 6 ods. 1 pism. b) GDPR - plnenie opatreni pred uzavretim zmluvy na ziadost dotknutej osoby.</p>

              <h3 className="font-semibold text-gray-900 mb-2">Doba uchovávania:</h3>
              <p className="text-gray-600">Osobne udaje budeme uchovavat maximalne 10 rokov od odozvy na vas dopyt, pokial nevznikne dalsi zmluvny vztah.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">II. Subory cookies</h2>
              <p className="text-gray-600 mb-3">Na nasej webovej stranke pouzivame cookies vylucne na nasledujuce ucely:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li><strong>Nevyhnutne cookies</strong> - zabezpecuju zakladnu funkcnost stranky.</li>
                <li><strong>Statisticke (analyticke) cookies</strong> - pomahaju nam pochopit, ako navstevnici stranku pouzivaju (nasadzujeme ich len so suhlasom pouzivatela).</li>
              </ul>
              <h3 className="font-semibold text-gray-900 mb-2">Sprava suhlasov:</h3>
              <p className="text-gray-600">Pouzivatel moze kedykolvek odvolat suhlas s vyuzivanim statistickych cookies prostredníctvom nastaveni cookie listy alebo priamo v prehliadaci.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">III. Prava dotknutej osoby</h2>
              <p className="text-gray-600 mb-3">Podla nariadenia GDPR mate nasledujuce prava:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Pristup k osobnym udajom, ktore spracuvame</li>
                <li>Oprava nepresnych alebo neuplnych udajov</li>
                <li>Vymazanie (&quot;pravo zabudnutia&quot;), ak na spracovanie uz nie je pravny zaklad</li>
                <li>Obmedzenie spracovania</li>
                <li>Prenosnost udajov</li>
                <li>Odvolanie suhlasu - stane sa ucinnym dnom odvolania</li>
                <li>Podanie staznosti u Uradu na ochranu osobnych udajov SR</li>
              </ul>
              <p className="text-gray-600 mb-4">V pripade otazok alebo uplatnenia Vasich prav nas mozete kontaktovat na info@dariusgarage.sk alebo telefonnom cisle 0951 350 640.</p>
              <p className="font-semibold text-gray-900">Tieto Zasady nadobudaju ucinnost dnom 25. 4. 2025.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
