'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function FloatingWidgets() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activePopup, setActivePopup] = useState(null); // 'wa' | 'call' | null

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

  // Close on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePopup(null);
      }
    };

    const handleDocClick = (e) => {
      if (
        !e.target.closest('.floating-quick-card') &&
        !e.target.closest('.floating-whatsapp-btn') &&
        !e.target.closest('.floating-call-btn')
      ) {
        setActivePopup(null);
      }
    };

    if (activePopup) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleDocClick);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleDocClick);
    };
  }, [activePopup]);

  const toggleWa = (e) => {
    e.stopPropagation();
    setActivePopup((prev) => (prev === 'wa' ? null : 'wa'));
  };

  const toggleCall = (e) => {
    e.stopPropagation();
    setActivePopup((prev) => (prev === 'call' ? null : 'call'));
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Semi-transparent Backdrop for smooth mobile focus */}
      <div
        className={`floating-backdrop ${activePopup ? 'active' : ''}`}
        onClick={closePopup}
        aria-hidden="true"
      />

      {/* Floating Action Container */}
      <div className="floating-actions-container">
        {/* WhatsApp Quick Support Floating Card */}
        <div
          className={`floating-quick-card floating-wa-card ${activePopup === 'wa' ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Quick Support"
        >
          <div className="quick-card-header">
            <div className="quick-card-icon wa">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div className="quick-card-title-group">
              <div className="quick-card-title">WhatsApp Quick Support</div>
              <div className="quick-card-subtitle">
                <span className="live-dot green"></span>
                <span>Instant Reply from Booking Desk</span>
              </div>
            </div>
            <button
              type="button"
              className="quick-card-close"
              onClick={closePopup}
              aria-label="Close WhatsApp options"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="quick-card-options">
            <a
              href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                'Hello VARMA CAR TRAVELS, I would like to book a car'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-card-item wa-item"
              onClick={closePopup}
            >
              <div className="item-icon-col wa-col">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="item-info-col">
                <div className="item-badge-row">
                  <span className="item-label">Primary Line</span>
                  <span className="item-tag tag-primary">Instant Reply</span>
                </div>
                <div className="item-number">+91 {PRIMARY_PHONE}</div>
              </div>
              <div className="item-arrow-col">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </a>

            <a
              href={`https://wa.me/91${SECONDARY_PHONE}?text=${encodeURIComponent(
                'Hello VARMA CAR TRAVELS, I would like to book a car'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-card-item wa-item"
              onClick={closePopup}
            >
              <div className="item-icon-col wa-col">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="item-info-col">
                <div className="item-badge-row">
                  <span className="item-label">Secondary Line</span>
                  <span className="item-tag tag-backup">24/7 Active</span>
                </div>
                <div className="item-number">+91 {SECONDARY_PHONE}</div>
              </div>
              <div className="item-arrow-col">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </a>
          </div>

          <div className="quick-card-footer">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Verified Booking Desk &bull; 24/7 Response</span>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <div className="floating-whatsapp-widget">
          <button
            type="button"
            className={`floating-whatsapp-btn ${activePopup === 'wa' ? 'active' : ''}`}
            id="floatingWaBtn"
            aria-label="Open WhatsApp Quick Support"
            title="WhatsApp Quick Support"
            aria-haspopup="dialog"
            aria-expanded={activePopup === 'wa'}
            onClick={toggleWa}
          >
            <span className="floating-whatsapp-pulse"></span>
            <i className={activePopup === 'wa' ? 'fa-solid fa-xmark' : 'fa-brands fa-whatsapp'}></i>
          </button>
        </div>

        {/* 24/7 Telephone Helpline Floating Card */}
        <div
          className={`floating-quick-card floating-call-card ${activePopup === 'call' ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="24/7 Telephone Helpline"
        >
          <div className="quick-card-header">
            <div className="quick-card-icon call">
              <i className="fa-solid fa-phone-volume"></i>
            </div>
            <div className="quick-card-title-group">
              <div className="quick-card-title">24/7 Telephone Helpline</div>
              <div className="quick-card-subtitle">
                <span className="live-dot gold"></span>
                <span>Tap any number to call immediately</span>
              </div>
            </div>
            <button
              type="button"
              className="quick-card-close"
              onClick={closePopup}
              aria-label="Close call options"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="quick-card-options">
            <a
              href={`tel:${PRIMARY_PHONE}`}
              className="quick-card-item call-item"
              onClick={closePopup}
            >
              <div className="item-icon-col call-col">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="item-info-col">
                <div className="item-badge-row">
                  <span className="item-label">Primary Line</span>
                  <span className="item-tag tag-dispatch">Direct Call</span>
                </div>
                <div className="item-number">+91 {PRIMARY_PHONE}</div>
              </div>
              <div className="item-arrow-col">
                <i className="fa-solid fa-phone-flip"></i>
              </div>
            </a>

            <a
              href={`tel:${SECONDARY_PHONE}`}
              className="quick-card-item call-item"
              onClick={closePopup}
            >
              <div className="item-icon-col call-col">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="item-info-col">
                <div className="item-badge-row">
                  <span className="item-label">Secondary Line</span>
                  <span className="item-tag tag-backup">24/7 Backup</span>
                </div>
                <div className="item-number">+91 {SECONDARY_PHONE}</div>
              </div>
              <div className="item-arrow-col">
                <i className="fa-solid fa-phone-flip"></i>
              </div>
            </a>
          </div>

          <div className="quick-card-footer">
            <i className="fa-solid fa-headset"></i>
            <span>Round the clock chauffeur dispatch & support</span>
          </div>
        </div>

        {/* Floating Call Button for Mobile Users */}
        <div className="floating-call-widget">
          <button
            type="button"
            className={`floating-call-btn ${activePopup === 'call' ? 'active' : ''}`}
            id="floatingCallBtn"
            aria-label="Open 24/7 Telephone Helpline"
            title="Call Helpline"
            aria-haspopup="dialog"
            aria-expanded={activePopup === 'call'}
            onClick={toggleCall}
          >
            <i className={activePopup === 'call' ? 'fa-solid fa-xmark' : 'fa-solid fa-phone-volume'}></i>
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
