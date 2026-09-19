/* ===== Nafs Warrior — Translation Engine ===== */
(function () {
  'use strict';

  var LANG_KEY = 'nafsLang';

  /* Apply saved language on load */
  function initLang() {
    var saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ur') applyLang('ur');
  }

  /* Apply a language to the page */
  function applyLang(lang) {
    var isUrdu = (lang === 'ur');
    var html = document.documentElement;

    /* Set dir and lang */
    html.setAttribute('dir', isUrdu ? 'rtl' : 'ltr');
    html.setAttribute('lang', isUrdu ? 'ur' : 'en');

    /* Walk all elements with data-translate */
    var els = document.querySelectorAll('[data-translate]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-translate');
      if (isUrdu) {
        if (TRANSLATIONS && TRANSLATIONS[key]) {
          if (el.tagName === 'INPUT' && el.type !== 'submit') {
            el.placeholder = TRANSLATIONS[key];
          } else {
            el.textContent = TRANSLATIONS[key];
          }
        }
      } else {
        /* Restore original English text */
        if (el.dataset.origText !== undefined) {
          if (el.tagName === 'INPUT' && el.type !== 'submit') {
            el.placeholder = el.dataset.origText;
          } else {
            el.textContent = el.dataset.origText;
          }
        }
      }
    }

    /* Toggle the translate button label */
    var btns = document.querySelectorAll('.translate-toggle');
    for (var j = 0; j < btns.length; j++) {
      btns[j].textContent = isUrdu ? 'English' : 'اردو';
    }

    /* Update dark mode button label if it says Dark Mode / Light Mode */
    var modeBtn = document.querySelector('.mode-toggle');
    if (modeBtn) {
      var isDark = html.getAttribute('data-theme') === 'dark';
      if (isUrdu) {
        modeBtn.textContent = isDark ? 'لائٹ موڈ' : 'ڈارک موڈ';
      } else {
        modeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    }

    localStorage.setItem(LANG_KEY, lang);
  }

  /* Store original text of all translatable elements */
  function storeOriginals() {
    var els = document.querySelectorAll('[data-translate]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.tagName === 'INPUT' && el.type !== 'submit') {
        el.dataset.origText = el.placeholder || '';
      } else {
        el.dataset.origText = el.textContent;
      }
    }
  }

  /* Toggle between English and Urdu */
  window.toggleLanguage = function () {
    var current = localStorage.getItem(LANG_KEY) || 'en';
    var next = (current === 'ur') ? 'en' : 'ur';
    applyLang(next);
  };

  /* Insert translate button next to mode-toggle in each page */
  function insertTranslateButton() {
    /* Find the right container for the button based on page structure */

    /* Pattern 1: topbar (change.html style) */
    var topbar = document.querySelector('.topbar');
    if (topbar) {
      var btn = document.createElement('button');
      btn.className = 'mode-toggle translate-toggle';
      btn.textContent = 'اردو';
      btn.onclick = toggleLanguage;
      topbar.insertBefore(btn, topbar.querySelector('.mode-toggle'));
      return;
    }

    /* Pattern 2: header-right (index.html style) */
    var headerRight = document.querySelector('.header-right');
    if (headerRight) {
      var btn2 = document.createElement('button');
      btn2.className = 'mode-toggle translate-toggle';
      btn2.textContent = 'اردو';
      btn2.onclick = toggleLanguage;
      headerRight.insertBefore(btn2, headerRight.querySelector('.mode-toggle'));
      return;
    }

    /* Pattern 3: header with just mode-toggle (home, sabr, community, etc.) */
    var header = document.querySelector('header');
    if (header) {
      var btn3 = document.createElement('button');
      btn3.className = 'mode-toggle translate-toggle';
      btn3.textContent = 'اردو';
      btn3.onclick = toggleLanguage;
      var modeToggle = header.querySelector('.mode-toggle');
      if (modeToggle) {
        header.insertBefore(btn3, modeToggle);
      } else {
        header.appendChild(btn3);
      }
      return;
    }
  }

  /* Add RTL styles dynamically */
  function addRTLStyles() {
    var css = document.createElement('style');
    css.id = 'rtl-overrides';
    css.textContent =
      'html[dir="rtl"] .topbar .back-link { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .back-link svg, html[dir="rtl"] .back-link .arrow { transform: scaleX(-1); }' +
      'html[dir="rtl"] .para ul, html[dir="rtl"] .card ul { margin-left: 0; margin-right: 18px; }' +
      'html[dir="rtl"] .journal li { padding-left: 0; padding-right: 22px; }' +
      'html[dir="rtl"] .journal li::before { left: auto; right: 0; }' +
      'html[dir="rtl"] .prophet-item { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .step-item { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .story-header { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .story-name, html[dir="rtl"] .story-label { text-align: right; }' +
      'html[dir="rtl"] .story-body .hadith-ref { border-left: none; border-right: 3px solid var(--sage-mid); }' +
      'html[dir="rtl"] .card { border-left: none; border-right: 4px solid var(--sage-dark); }' +
      'html[dir="rtl"] .steps { border-left: none; }' +
      'html[dir="rtl"] .dropdown-item { text-align: right; }' +
      'html[dir="rtl"] .menu-toggle { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .welcome-pill { direction: rtl; }' +
      'html[dir="rtl"] .hero-slogan { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .hero-ctas { text-align: center; }' +
      'html[dir="rtl"] .footer-links { gap: 1rem; }' +
      'html[dir="rtl"] body { text-align: right; }' +
      'html[dir="rtl"] .disclaimer-strip { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .disclaimer-icon { flex-shrink: 0; }' +
      'html[dir="rtl"] .notif-card .notif-row { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .action-item { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .header-left { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .brand { flex-direction: row-reverse; }' +
      'html[dir="rtl"] .brand-name { letter-spacing: 0; }' +
      'html[dir="rtl"] h1, html[dir="rtl"] h2, html[dir="rtl"] h3 { text-align: right; }' +
      'html[dir="rtl"] .section-divider { direction: rtl; }';
    document.head.appendChild(css);
  }

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addRTLStyles();
      insertTranslateButton();
      storeOriginals();
      initLang();
    });
  } else {
    addRTLStyles();
    insertTranslateButton();
    storeOriginals();
    initLang();
  }
})();
