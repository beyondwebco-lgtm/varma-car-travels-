'use strict';
'use client';

import React from 'react';
import { useBooking } from '../context/BookingContext';

const SERVICES = [
  {
    icon: 'fa-route',
    title: 'Outstation Travels',
    desc: 'Customized round-trip and multi-day packages to Tirupati, Hyderabad, Vizag, Vijayawada, Bangalore, Chennai, and all destinations.',
    vehicle: 'Toyota Innova Crysta (7+1 Seater)',
    cta: 'Book Outstation'
  },
  {
    icon: 'fa-city',
    title: 'Local City Travel',
    desc: 'Flexible hourly and full-day rental packages for city meetings, shopping, medical visits, family outings, and personal errands.',
    vehicle: 'Maruti Suzuki Dzire (4+1 Seater)',
    cta: 'Book Local Ride'
  },
  {
    icon: 'fa-plane-departure',
    title: 'Airport Transfers',
    desc: 'Prompt 24/7 on-time drops and pickups to Vijayawada (Gannavaram) and Rajahmundry Airports with flight-tracking precision.',
    vehicle: 'Toyota Etios (4+1 Seater)',
    cta: 'Book Airport Drop'
  },
  {
    icon: 'fa-people-roof',
    title: 'Family Trips',
    desc: 'Cherish happy family memories in spacious 6+1 and 7+1 MPVs. Tailored for family weddings, religious functions, and holiday outings.',
    vehicle: 'Maruti Suzuki Ertiga (6+1 Seater)',
    cta: 'Plan Family Trip'
  },
  {
    icon: 'fa-building',
    title: 'Corporate Travels',
    desc: 'Executive chauffeur service for corporate guests, delegates, business conferences, site inspections, and VIP clients.',
    vehicle: 'Toyota Innova Crysta (7+1 Seater)',
    cta: 'Corporate Booking'
  },
  {
    icon: 'fa-map-location-dot',
    title: 'Tourist Packages',
    desc: 'Custom holiday packages to Godavari river cruises, Papikondalu, Dindi backwaters, Araku Valley, Tirupati Balaji, and coastal attractions.',
    vehicle: 'Toyota Innova (7+1 Seater)',
    cta: 'View Tour Packages'
  },
  {
    icon: 'fa-arrow-right-long',
    title: 'One-Way Trips',
    desc: 'Pay only for the single-way distance! Economical one-way drop services between cities without paying return or double-toll expenses.',
    vehicle: 'Maruti Suzuki Dzire (4+1 Seater)',
    cta: 'Check One-Way'
  },
  {
    icon: 'fa-champagne-glasses',
    title: 'Special Occasions',
    desc: 'Premium decorated wedding car convoys, VIP receptions, temple pilgrimages, and ceremonial gatherings with dedicated coordination.',
    vehicle: 'Kia Carens (6+1 Seater)',
    cta: 'Reserve for Event'
  }
];

export default function ServicesSection() {
  const { openBookingModal } = useBooking();

  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-bell-concierge"></i>
            <span>Tailored For You</span>
          </div>
          <h2 className="section-title">
            Our Core <span className="gold-gradient-text">Services</span>
          </h2>
          <p className="section-desc">
            From short intra-city trips to multi-day holiday packages, explore how VARMA CAR TRAVELS caters to all your
            travel requirements.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon-box">
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <button
                type="button"
                className="service-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => openBookingModal(s.vehicle)}
              >
                <span>{s.cta}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
