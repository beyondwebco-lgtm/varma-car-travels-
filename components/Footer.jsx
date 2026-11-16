'use strict';
'use client';

import React from 'react';
import { useBooking, PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function Footer() {
  const { openBookingModal } = useBooking();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Tagline */}
          <div className="footer-brand">
            <a href="#home" className="brand-logo footer-brand-logo" aria-label="VARMA CAR TRAVELS Homepage">
              <picture>
                <source srcSet="/images/logo.webp" type="image/webp" />
                <img
                  src="/images/logo.png"
                  alt="VARMA CAR TRAVELS Logo"
                  className="brand-logo-img"
                  width="130"
                  height="65"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </a>

            <p>
              Experience safe, comfortable, and affordable journeys with VARMA CAR TRAVELS. Dedicated chauffeurs,
              well-maintained sanitized fleet, and transparent pricing.
            </p>

            <div className="footer-tagline-quote">"Your Journey, Our Responsibility!"</div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#vehicles">Our Fleet</a>
              </li>
              <li>
                <a href="#services">Our Services</a>
              </li>
              <li>
                <a href="#why-us">Why Choose Us</a>
              </li>
              <li>
                <a href="#location">Find Our Hub</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Fleet & Vehicles */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Fleet</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                  onClick={() => openBookingModal('Maruti Suzuki Dzire (4+1 Seater)')}
                >
                  Maruti Suzuki Dzire (4+1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                  onClick={() => openBookingModal('Toyota Etios (4+1 Seater)')}
                >
                  Toyota Etios (4+1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                  onClick={() => openBookingModal('Maruti Suzuki Ertiga (6+1 Seater)')}
                >
                  Maruti Suzuki Ertiga (6+1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                  onClick={() => openBookingModal('Kia Carens (6+1 Seater)')}
                >
                  Kia Carens (6+1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                  onClick={() => openBookingModal('Toyota Innova (7+1 Seater)')}
                >
                  Toyota Innova (7+1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                  onClick={() => openBookingModal('Toyota Innova Crysta (7+1 Seater)')}
                >
                  Toyota Innova Crysta (7+1)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hub Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact & Hub</h4>
            <div className="footer-contact-item">
              <i className="fa-solid fa-map-location-dot"></i>
              <span>Tanuku, Sajjapuram (16.768000, 81.681306), Andhra Pradesh</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-phone"></i>
              <span>
                <a href={`tel:${PRIMARY_PHONE}`}>+91 {PRIMARY_PHONE}</a>
                <br />
                <a href={`tel:${SECONDARY_PHONE}`}>+91 {SECONDARY_PHONE}</a>
              </span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-brands fa-whatsapp"></i>
              <a
                href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                  'Hello VARMA CAR TRAVELS, I would like to book a car'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Support: 7569526527
              </a>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:varmacartravels7@gmail.com">varmacartravels7@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} VARMA CAR TRAVELS. All Rights Reserved.</p>
          <p>
            Operating from Tanuku, Sajjapuram &bull; Serving All Destinations with Comfort & Safety.
          </p>
        </div>
      </div>
    </footer>
  );
}
