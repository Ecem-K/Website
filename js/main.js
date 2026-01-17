import { translations } from './lang.js';

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(savedLang);

    // 2. Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Setup Language & Theme Toggles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            applyLanguage(lang);
        });
    });

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // 4. Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && window.getComputedStyle(hamburger).display !== 'none') {
        // Toggle Menu
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            const isOpen = nav.classList.contains('nav-open');

            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        });
    }

    // Common listeners: Close menu when clicking link (Mobile only effect mostly, but harmless on desktop)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Only act if menu is actually open
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close menu when clicking backdrop (Mobile only)
    if (nav) {
        nav.addEventListener('click', (e) => {
            // Check for pseudo-element click (backdrop)
            // Pseudo-elements are part of the element, but if we click 'nav' itself (which covers screen when open via before)
            if (e.target === nav && nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    }
});

function applyTheme(theme) {
    // Persist
    localStorage.setItem('theme', theme);

    // Apply (Default is dark, so we only need to explicitly set 'light' to trigger the CSS override)
    document.documentElement.setAttribute('data-theme', theme);
}

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
const savedLang = localStorage.getItem('preferredLang') || 'en';
document.documentElement.lang = savedLang;
function applyLanguage(lang) {
    if (!translations[lang]) return;

    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

