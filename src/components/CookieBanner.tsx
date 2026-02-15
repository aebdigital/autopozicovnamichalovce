"use client";

import { useState, useEffect } from "react";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    } else {
      const saved = localStorage.getItem("cookieSettings");
      if (saved) setSettings(JSON.parse(saved));
    }
  }, []);

  const saveConsent = (newSettings: CookieSettings) => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookieSettings", JSON.stringify(newSettings));
    setSettings(newSettings);
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () =>
    saveConsent({ necessary: true, analytics: true, marketing: true });

  const rejectAll = () =>
    saveConsent({ necessary: true, analytics: false, marketing: false });

  if (!visible && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {visible && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Cookies na našej stránke</p>
              <p className="text-sm text-gray-600 mt-1">
                Používame cookies na zlepšenie vašej používateľskej skúsenosti a na analýzu návštevnosti. Kliknutím na &quot;Súhlasím&quot; súhlasíte s používaním všetkých cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={acceptAll} className="bg-[#E41C31] hover:bg-[#C8192B] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Súhlasím
              </button>
              <button onClick={rejectAll} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Odmietnuť
              </button>
              <button onClick={() => setShowSettings(true)} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Nastavenia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Nastavenia cookies</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-6">
              {/* Necessary */}
              <div className="flex items-start gap-4">
                <input type="checkbox" checked disabled className="mt-1 h-5 w-5 rounded accent-[#E41C31]" />
                <div>
                  <p className="font-medium text-gray-900">Nevyhnutné cookies</p>
                  <p className="text-sm text-gray-600">Tieto cookies sú potrebné pre základnú funkčnosť stránky a nemožno ich vypnúť.</p>
                </div>
              </div>
              {/* Analytics */}
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded accent-[#E41C31]"
                />
                <div>
                  <p className="font-medium text-gray-900">Analytické cookies</p>
                  <p className="text-sm text-gray-600">Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku, aby sme ju mohli zlepšiť.</p>
                </div>
              </div>
              {/* Marketing */}
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={settings.marketing}
                  onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded accent-[#E41C31]"
                />
                <div>
                  <p className="font-medium text-gray-900">Marketingové cookies</p>
                  <p className="text-sm text-gray-600">Používajú sa na personalizáciu reklám a meranie ich účinnosti.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => saveConsent(settings)} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Uložiť nastavenia
              </button>
              <button onClick={acceptAll} className="bg-[#E41C31] hover:bg-[#C8192B] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Súhlasím so všetkými
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
