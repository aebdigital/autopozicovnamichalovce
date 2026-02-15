function createHeader() {
    // Determine if we're in a subpage
    const isSubpage = window.location.pathname.includes('/subpages/') || 
                      ['kontakt', 'ponuka-vozidiel', 'vozidlo', 'ochrana-osobnych-udajov', 'podmienky-prenajmu'].includes(window.location.pathname.split('/').pop().replace('.html', ''));
    const basePath = isSubpage ? '../' : '';
    
    return `
        <header class="header">
            <div class="container">
                <div class="nav-brand">
                    <a href="${basePath}" class="logo">
                        Autopožičovňa Michalovce
                    </a>
                </div>
                
                <nav class="nav-menu" id="navMenu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="${basePath}" class="nav-link" data-page="home">Domov</a>
                        </li>
                        <li class="nav-item">
                            <a href="${basePath}ponuka-vozidiel" class="nav-link" data-page="ponuka-vozidiel">Ponuka vozidiel</a>
                        </li>
                        <li class="nav-item">
                            <a href="${basePath}kontakt" class="nav-link" data-page="kontakt">Kontakt</a>
                        </li>
                    </ul>
                </nav>
                
                <div class="nav-actions">
                    <a href="tel:0951350640" class="btn-primary nav-btn">
                        <img src="${basePath}sources/icons/phone.svg" alt="Telefón" width="18" height="18" style="margin-right: 8px;">
                        0951 350 640
                    </a>
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    `;
}

function initHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader();
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
        
        // Active page highlighting
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const dataPage = link.getAttribute('data-page');
            if (dataPage === 'home' && (currentPage === 'index' || currentPage === '' || window.location.pathname === '/')) {
                link.classList.add('active');
            } else if (dataPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
} else {
    initHeader();
}