'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function FloatingWidgets() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

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

  useEffect(() => {
    const handleDocClick = (e) => {
      if (!e.target.closest('.floating-whatsapp-widget')) {
        setIsWaOpen(false);
      }
      if (!e.target.closest('.floating-call-widget')) {
        setIsCallOpen(false);
      }
    };
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  const handleWaClick = (e) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setIsWaOpen((prev) => !prev);
    } else {
      window.open(
        `https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
          'Hello VARMA CAR TRAVELS, I want to book a car ride.'
        )}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const handleCallClick = (e) => {
    e.stopPropagation();
    setIsCallOpen((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="floating-actions-container">
        {/* Floating WhatsApp Widget */}
        <div className={`floating-whatsapp-widget ${isWaOpen ? 'open' : ''}`}>
          <div className="floating-popover">
            <div className="popover-header">
              <i className="fa-brands fa-whatsapp text-green"></i>
              <div>
                <h5>WhatsApp Quick Support</h5>
                <span>Instant Reply from Booking Desk</span>
              </div>
            </div>
            <div className="popover-body">
              <a
                href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                  'Hello VARMA CAR TRAVELS, I need a car rental'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="popover-item"
              >
                <div>
                  <strong>Primary Line</strong>
                  <span>+91 {PRIMARY_PHONE}</span>
                </div>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a
                href={`https://wa.me/91${SECONDARY_PHONE}?text=${encodeURIComponent(
                  'Hello VARMA CAR TRAVELS, I need a car rental'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="popover-item"
              >
                <div>
                  <strong>Secondary Line</strong>
                  <span>+91 {SECONDARY_PHONE}</span>
                </div>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <button
            type="button"
            className="floating-whatsapp-btn"
            id="floatingWaBtn"
            aria-label="Chat on WhatsApp"
            onClick={handleWaClick}
          >
            <i className="fa-brands fa-whatsapp"></i>
          </button>
        </div>

        {/* Floating Phone Call Widget */}
        <div className={`floating-call-widget ${isCallOpen ? 'open' : ''}`}>
          <div className="floating-popover">
            <div className="popover-header">
              <i className="fa-solid fa-phone-volume text-gold"></i>
              <div>
                <h5>24/7 Telephone Helpline</h5>
                <span>Tap any number to call immediately</span>
              </div>
            </div>
            <div className="popover-body">
              <a href={`tel:${PRIMARY_PHONE}`} className="popover-item">
                <div>
                  <strong>Call Primary Line</strong>
                  <span>+91 {PRIMARY_PHONE}</span>
                </div>
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href={`tel:${SECONDARY_PHONE}`} className="popover-item">
                <div>
                  <strong>Call Secondary Line</strong>
                  <span>+91 {SECONDARY_PHONE}</span>
                </div>
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>

          <button
            type="button"
            className="floating-call-btn"
            id="floatingCallBtn"
            aria-label="Call VARMA CAR TRAVELS"
            onClick={handleCallClick}
          >
            <i className="fa-solid fa-phone-volume"></i>
          </button>
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
    </>
  );
}
