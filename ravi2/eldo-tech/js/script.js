/**
 * ELDO TECH — Minimal Premium Social Media Agency
 * Tirunelveli, Tamil Nadu, India
 * Pure Vanilla JavaScript (No Frameworks, No Libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================================================
  // 1. CONFIGURATION (CENTRAL WHATSAPP VARIABLE)
  // ==================================================
  // Replace WHATSAPP_NUMBER_HERE with your 10 or 12 digit WhatsApp number with country code (e.g. "919876543210")
  const WHATSAPP_NUMBER = "WHATSAPP_NUMBER_HERE";
  const DEFAULT_MESSAGE = encodeURIComponent("Hi ELDO TECH, I would like to discuss social media and advertising strategies for my brand.");

  // Dynamically attach WhatsApp URLs to all relevant buttons/links
  const updateWhatsAppLinks = () => {
    const whatsappElements = document.querySelectorAll('[data-whatsapp-cta]');
    const targetUrl = WHATSAPP_NUMBER && WHATSAPP_NUMBER !== "WHATSAPP_NUMBER_HERE"
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`
      : `https://api.whatsapp.com/send?text=${DEFAULT_MESSAGE}`;

    whatsappElements.forEach(el => {
      el.setAttribute('href', targetUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  };

  updateWhatsAppLinks();

  // ==================================================
  // 2. STICKY NAVBAR SCROLL BEHAVIOR
  // ==================================================
  const header = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ==================================================
  // 3. ACCESSIBLE MOBILE MENU DRAWER
  // ==================================================
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (!navToggle || !mobileDrawer) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!navToggle || !mobileDrawer) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close drawer when clicking any mobile navigation link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      navToggle.focus();
    }
  });

  // ==================================================
  // 4. FAQ ACCORDION (SMOOTH & ACCESSIBLE)
  // ==================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (!questionBtn || !panel) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all open items for clean editorial accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  // ==================================================
  // 5. INTERSECTION OBSERVER (SCROLL REVEALS)
  // ==================================================
  const reveals = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ==================================================
  // 6. VIDEO PLAYBACK SAFETY
  // ==================================================
  // Ensure placeholder videos pause if user clicks another or leave viewport
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });

});
