function createFooter() {
    // Determine if we're in a subpage
    const isSubpage = window.location.pathname.includes('/subpages/') || 
                      ['kontakt', 'ponuka-vozidiel', 'vozidlo', 'ochrana-osobnych-udajov', 'podmienky-prenajmu'].includes(window.location.pathname.split('/').pop().replace('.html', ''));
    const basePath = isSubpage ? '../' : '';
    
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-brand">
                            <a href="${basePath}" class="footer-logo">
                      
                                Autopožičovňa Michalovce
                            </a>
                            <p>Váš spoľahlivý partner pre prémiovú požičovňu áut. Zažite slobodu na ceste s našou výnimočnou flotilou a službami.</p>
                            <div class="social-links">
                                <a href="#" class="social-link" aria-label="Facebook">
                                    <img src="${basePath}sources/icons/facebook.svg" alt="Facebook" width="20" height="20">
                                </a>
                            
                                <a href="#" class="social-link" aria-label="Instagram">
                                    <img src="${basePath}sources/icons/instagram.svg" alt="Instagram" width="20" height="20">
                                </a>
                              
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h3>Rýchle odkazy</h3>
                        <ul class="footer-links">
                            <li><a href="${basePath}">Domov</a></li>
                            <li><a href="${basePath}ponuka-vozidiel">Ponuka vozidiel</a></li>
                            <li><a href="${basePath}kontakt">Kontakt</a></li>
                        </ul>
                    </div>
                    
                    
                    <div class="footer-section">
                        <h3>Kontaktné informácie</h3>
                        <div class="footer-contact-info">
                            <div class="footer-contact-item">
                                <span class="contact-icon">
                                    <img src="${basePath}sources/icons/phone.svg" alt="Telefón" width="18" height="18">
                                </span>
                                <span>0951 350 640</span>
                            </div>
                            <div class="footer-contact-item">
                                <span class="contact-icon">
                                    <img src="${basePath}sources/icons/email.svg" alt="Email" width="18" height="18">
                                </span>
                                <span>info@dariusgarage.sk</span>
                            </div>
                            <div class="footer-contact-item">
                                <span class="contact-icon">
                                    <img src="${basePath}sources/icons/location.svg" alt="Adresa" width="18" height="18">
                                </span>
                                <span>Stavbárov 8<br>071 01 Michalovce</span>
                            </div>
                            <div class="footer-contact-item">
                                <span class="contact-icon">
                                    <img src="${basePath}sources/icons/clock.svg" alt="Otváracie hodiny" width="18" height="18">
                                </span>
                                <span>Po-Pia: 8:00-17:00</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <div class="copyright">
                            <p>&copy; ${new Date().getFullYear()} Darius Garage s. r. o. Všetky práva vyhradené.</p>
                        </div>
                        <div class="footer-bottom-links">
                            <a href="${basePath}ochrana-osobnych-udajov">Ochrana osobných údajov</a>
                            <a href="${basePath}podmienky-prenajmu">Podmienky prenájmu</a>
                            <a href="#" onclick="openCookieSettings()">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

function initFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}


function openBookingModal() {
    alert('Booking system would open here. This is a demo implementation.');
}

function openModal(type) {
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} modal would open here. This is a demo implementation.`);
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}