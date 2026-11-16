'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { PRIMARY_PHONE } from '../context/BookingContext';

export default function FloatingWidgets() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollY > 400);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="floating-actions-container">
      {/* Floating WhatsApp Direct Button */}
      <div className="floating-whatsapp-widget">
        <a
          href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
            'Hello VARMA CAR TRAVELS, I would like to book a car'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn"
          id="floatingWaBtn"
          aria-label="Chat with VARMA CAR TRAVELS on WhatsApp"
          title="Chat on WhatsApp"
        >
          <span className="floating-whatsapp-pulse"></span>
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      {/* Floating Phone Call Direct Button */}
      <div className="floating-call-widget">
        <a
          href={`tel:${PRIMARY_PHONE}`}
          className="floating-call-btn"
          id="floatingCallBtn"
          aria-label={`Call VARMA CAR TRAVELS: ${PRIMARY_PHONE}`}
          title={`Call VARMA CAR TRAVELS: ${PRIMARY_PHONE}`}
        >
          <i className="fa-solid fa-phone-volume"></i>
        </a>
      </div>

      {/* Back to Top Button */}
      <button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
        id="backToTopBtn"
        aria-label="Scroll back to top"
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  );
}
