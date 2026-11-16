'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useBooking, PRIMARY_PHONE } from '../context/BookingContext';

export default function Navbar() {
  const { openBookingModal } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 30);

      const sectionIds = ['home', 'about', 'vehicles', 'services', 'why-us', 'location', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`} id="navbarWrapper">
        <div className="container">
          <nav className="navbar">
            {/* Logo / Brand */}
            <a href="#home" className="brand-logo" aria-label="VARMA CAR TRAVELS Homepage">
              <picture>
                <source srcSet="/images/logo.webp" type="image/webp" />
                <img
                  src="/images/logo.png"
                  alt="VARMA CAR TRAVELS Logo"
                  className="brand-logo-img"
                  width="130"
                  height="65"
                  fetchPriority="high"
                />
              </picture>
            </a>

            {/* Desktop Navigation Menu */}
            <ul className="nav-menu">
              <li>
                <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#vehicles" className={`nav-link ${activeSection === 'vehicles' ? 'active' : ''}`}>
                  Our Vehicles
                </a>
              </li>
              <li>
                <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>
                  Services
                </a>
              </li>
              <li>
                <a href="#why-us" className={`nav-link ${activeSection === 'why-us' ? 'active' : ''}`}>
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#location" className={`nav-link ${activeSection === 'location' ? 'active' : ''}`}>
                  Location
                </a>
              </li>
              <li>
                <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Action CTA Buttons */}
            <div className="nav-actions">
              <a href={`tel:${PRIMARY_PHONE}`} className="nav-phone-link" title="Call VARMA CAR TRAVELS">
                <i className="fa-solid fa-phone-volume"></i>
                <span>{PRIMARY_PHONE}</span>
              </a>
              <button
                type="button"
                className="btn btn-primary btn-shimmer"
                onClick={() => openBookingModal()}
              >
                <i className="fa-solid fa-car-side"></i>
                <span>Book Your Ride</span>
              </button>

              {/* Mobile Toggle Button */}
              <button
                className="mobile-toggle-btn"
                id="mobileToggleBtn"
                aria-label="Open Mobile Menu"
                onClick={toggleMobileMenu}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        id="mobileNavOverlay"
        onClick={closeMobileMenu}
      ></div>

      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'active' : ''}`} id="mobileNavDrawer">
        <div>
          <div className="mobile-nav-header">
            <a href="#home" className="brand-logo" onClick={closeMobileMenu} aria-label="VARMA CAR TRAVELS Homepage">
              <picture>
                <source srcSet="/images/logo.webp" type="image/webp" />
                <img
                  src="/images/logo.png"
                  alt="VARMA CAR TRAVELS Logo"
                  className="brand-logo-img"
                  width="110"
                  height="55"
                />
              </picture>
            </a>
            <button className="mobile-close-btn" id="mobileCloseBtn" aria-label="Close Menu" onClick={closeMobileMenu}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="mobile-nav-links">
            <a href="#home" className="nav-link" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="#about" className="nav-link" onClick={closeMobileMenu}>
              About Us
            </a>
            <a href="#vehicles" className="nav-link" onClick={closeMobileMenu}>
              Our Vehicles
            </a>
            <a href="#services" className="nav-link" onClick={closeMobileMenu}>
              Services
            </a>
            <a href="#why-us" className="nav-link" onClick={closeMobileMenu}>
              Why Choose Us
            </a>
            <a href="#location" className="nav-link" onClick={closeMobileMenu}>
              Location
            </a>
            <a href="#contact" className="nav-link" onClick={closeMobileMenu}>
              Contact Us
            </a>
          </div>
        </div>

        <div className="mobile-nav-footer">
          <button
            className="btn btn-primary btn-block btn-shimmer"
            onClick={() => {
              closeMobileMenu();
              openBookingModal();
            }}
          >
            <i className="fa-solid fa-car-side"></i>
            <span>Book Your Ride</span>
          </button>
          <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-secondary btn-block">
            <i className="fa-solid fa-phone"></i>
            <span>Call: {PRIMARY_PHONE}</span>
          </a>
        </div>
      </div>
    </>
  );
}
