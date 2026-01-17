import { translations } from './lang.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Language
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    applyLanguage(savedLang);

    // 2. Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Setup Language Toggles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            applyLanguage(lang);
        });
    });

    // 4. Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            const isOpen = nav.classList.contains('nav-open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

function applyLanguage(lang) {
    // Validations
    if (!translations[lang]) return;

    // Persist
    localStorage.setItem('preferredLang', lang);

    // Update HTML attribute for A11y
    document.documentElement.lang = lang;

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update Active State on Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isCurrent = btn.dataset.lang === lang;
        btn.classList.toggle('active', isCurrent);
        btn.setAttribute('aria-pressed', isCurrent);
    });
}
