// Import and initialize components
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer components
    loadComponents();
    
    // Initialize page-specific functionality
    initPageFunctionality();
    
    // Initialize global functionality
    initGlobalFunctions();
});

function loadComponents() {
    // Components are loaded via their individual files
    // header.js and footer.js auto-initialize themselves
}

function initPageFunctionality() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    switch (currentPage) {
        case 'index':
        case '':
            initHomePage();
            break;
        case 'ponuka-vozidiel':
            initFleetPage();
            break;
        case 'kontakt':
            initContactPage();
            break;
        case 'vozidlo':
            // Car detail page functionality handled by car-detail.js
            break;
    }
}

function initHomePage() {
    // FAQ functionality
    initFAQ();
    
    // Smooth scrolling for navigation
    initSmoothScrolling();
    
    // Hero section animations
    initHeroAnimations();
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('open');
                faqItem.querySelector('.faq-icon').textContent = '+';
            });
            
            // Open clicked item if it wasn't already open
            if (!isOpen) {
                item.classList.add('open');
                icon.textContent = '-';
            }
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('animate-in');
    }
}

function initFleetPage() {
    // Car filtering functionality
    initCarFilters();
}

function initCarFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cars
            carCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initContactPage() {
    // Contact form functionality
    initContactForm();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Odosielanie...';
            
            // Send to PHP script
            fetch('contact-form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    this.reset();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Došlo k chybe pri odosielaní správy. Skúste to prosím neskôr.');
            })
            .finally(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
        });
    }
}


function initGlobalFunctions() {
    // Global booking buttons
    initBookingButtons();
    
    // Back to top button
    initBackToTop();
    
    // Loading states
    initLoadingStates();
}

function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('.btn-primary');
    
    bookingButtons.forEach(button => {
        if (button.textContent.includes('Book Now')) {
            button.addEventListener('click', () => {
                openBookingModal();
            });
        }
    });
}

function initBackToTop() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initLoadingStates() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
}

// Global utility functions
function openBookingModal() {
    alert('Booking system would open here. This is a demo implementation.');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions for global use
window.openBookingModal = openBookingModal;
window.showNotification = showNotification;