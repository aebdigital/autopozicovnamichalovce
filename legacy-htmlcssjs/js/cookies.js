// Cookies functionality
class CookiesManager {
    constructor() {
        this.cookieSettings = {
            necessary: true, // Always true, can't be disabled
            analytics: false,
            marketing: false
        };
        this.init();
    }

    init() {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            this.showCookieBanner();
        } else {
            this.cookieSettings = JSON.parse(localStorage.getItem('cookieSettings')) || this.cookieSettings;
        }
        this.createCookieHTML();
    }

    createCookieHTML() {
        // Create cookie banner
        const bannerHTML = `
            <div id="cookieBanner" class="cookie-banner">
                <div class="cookie-content">
                    <span class="cookie-icon">🍪</span>
                    <div class="cookie-text">
                        <strong>Cookies na našej stránke</strong>
                        <p>Používame cookies na zlepšenie vašej používateľskej skúsenosti a na analýzu návštevnosti. Kliknutím na "Súhlasím" súhlasíte s používaním všetkých cookies.</p>
                    </div>
                    <div class="cookie-buttons">
                        <button class="btn-primary cookie-btn" onclick="cookiesManager.acceptAll()">Súhlasím</button>
                        <button class="btn-secondary cookie-btn" onclick="cookiesManager.rejectAll()">Odmietnuť</button>
                        <button class="btn-outline cookie-btn" onclick="cookiesManager.showSettings()">Nastavenia</button>
                    </div>
                </div>
            </div>
        `;

        // Create cookie settings modal
        const modalHTML = `
            <div id="cookieModal" class="cookie-modal">
                <div class="cookie-modal-content">
                    <div class="cookie-modal-header">
                        <h2>Nastavenia cookies</h2>
                        <button class="cookie-modal-close" onclick="cookiesManager.closeSettings()">×</button>
                    </div>
                    <div class="cookie-modal-body">
                        <div class="cookie-category">
                            <div class="cookie-toggle-header">
                                <div class="toggle-container">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="necessaryCookies" checked disabled>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="cookie-info">
                                    <h3>Nevyhnutné cookies</h3>
                                    <p>Tieto cookies sú potrebné pre základnú funkčnosť stránky a nemožno ich vypnúť.</p>
                                </div>
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-toggle-header">
                                <div class="toggle-container">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="analyticsCookies" ${this.cookieSettings.analytics ? 'checked' : ''}>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="cookie-info">
                                    <h3>Analytické cookies</h3>
                                    <p>Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku, aby sme ju mohli zlepšiť.</p>
                                </div>
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-toggle-header">
                                <div class="toggle-container">
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="marketingCookies" ${this.cookieSettings.marketing ? 'checked' : ''}>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="cookie-info">
                                    <h3>Marketingové cookies</h3>
                                    <p>Používajú sa na personalizáciu reklám a meranie ich účinnosti.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cookie-modal-footer">
                        <button class="btn-outline" onclick="cookiesManager.saveSettings()">Uložiť nastavenia</button>
                        <button class="btn-primary" onclick="cookiesManager.acceptAllFromModal()">Súhlasím so všetkými</button>
                    </div>
                </div>
            </div>
        `;

        // Add to body if not already present
        if (!document.getElementById('cookieBanner')) {
            document.body.insertAdjacentHTML('beforeend', bannerHTML);
        }
        if (!document.getElementById('cookieModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    showCookieBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    showSettings() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    closeSettings() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    acceptAll() {
        this.cookieSettings = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        this.saveConsent();
        this.hideCookieBanner();
    }

    rejectAll() {
        this.cookieSettings = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        this.saveConsent();
        this.hideCookieBanner();
    }

    acceptAllFromModal() {
        this.acceptAll();
        this.closeSettings();
    }

    saveSettings() {
        const analytics = document.getElementById('analyticsCookies').checked;
        const marketing = document.getElementById('marketingCookies').checked;
        
        this.cookieSettings = {
            necessary: true,
            analytics: analytics,
            marketing: marketing
        };
        this.saveConsent();
        this.closeSettings();
        this.hideCookieBanner();
    }

    saveConsent() {
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieSettings', JSON.stringify(this.cookieSettings));
        
        // Here you would typically initialize analytics/marketing scripts based on consent
        if (this.cookieSettings.analytics) {
            console.log('Analytics cookies enabled');
            // Initialize analytics (Google Analytics, etc.)
        }
        if (this.cookieSettings.marketing) {
            console.log('Marketing cookies enabled');
            // Initialize marketing pixels, etc.
        }
    }

    openSettingsFromFooter() {
        this.createCookieHTML(); // Ensure HTML is present
        this.showSettings();
    }
}

// Initialize cookies manager
let cookiesManager;
document.addEventListener('DOMContentLoaded', function() {
    cookiesManager = new CookiesManager();
});

// Function to open settings from footer
function openCookieSettings() {
    if (cookiesManager) {
        cookiesManager.openSettingsFromFooter();
    }
}