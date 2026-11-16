'use strict';
'use client';

import React, { useState } from 'react';
import { useBooking, PRIMARY_PHONE } from '../context/BookingContext';

const VEHICLES = [
  {
    id: 'dzire',
    name: 'Maruti Suzuki Dzire',
    seating: '4 + 1 Seater',
    category: 'sedan',
    categoryTag: 'Compact Sedan',
    desc: 'Comfortable, highly fuel-efficient, and smooth-riding compact sedan. Ideal for couples, solo corporate trips, airport transfers, and swift city travel.',
    imageWebp: '/images/cars/dzire.webp',
    imageJpg: '/images/cars/dzire.jpg',
    alt: 'Maruti Suzuki Dzire 4+1 Seater Sedan',
    specs: [
      { icon: 'fa-snowflake', text: 'Chilled AC' },
      { icon: 'fa-suitcase', text: '378L Boot' },
      { icon: 'fa-music', text: 'Audio System' },
      { icon: 'fa-shield', text: 'Dual Airbags' }
    ]
  },
  {
    id: 'etios',
    name: 'Toyota Etios',
    seating: '4 + 1 Seater',
    category: 'sedan',
    categoryTag: 'Executive Sedan',
    desc: 'Famous for best-in-class rear legroom and an enormous 592L boot space. Perfect for outstation travel, family airport luggage, and long highway journeys.',
    imageWebp: '/images/cars/etios.webp',
    imageJpg: '/images/cars/etios.jpg',
    alt: 'Toyota Etios 4+1 Seater Sedan',
    specs: [
      { icon: 'fa-snowflake', text: 'Chilled AC' },
      { icon: 'fa-suitcase-rolling', text: '592L Mega Boot' },
      { icon: 'fa-expand', text: 'Extra Legroom' },
      { icon: 'fa-route', text: 'Highway Cruiser' }
    ]
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    seating: '6 + 1 Seater',
    category: 'family-mpv',
    categoryTag: 'Smart Hybrid MPV',
    desc: "India's favorite 7-seater MPV with 3-row comfort, dual roof AC vents, and adaptable boot. Best choice for family vacations, temple tours, and functions.",
    imageWebp: '/images/cars/ertiga.webp',
    imageJpg: '/images/cars/ertiga.jpg',
    alt: 'Maruti Suzuki Ertiga 6+1 Seater MPV',
    specs: [
      { icon: 'fa-wind', text: 'Dual Roof AC' },
      { icon: 'fa-users', text: '6+1 Seating' },
      { icon: 'fa-battery-half', text: 'Smart Hybrid' },
      { icon: 'fa-chair', text: 'Reclining Rows' }
    ]
  },
  {
    id: 'carens',
    name: 'Kia Carens',
    seating: '6 + 1 Seater',
    category: 'family-mpv',
    categoryTag: 'Luxury Tech MPV',
    desc: 'Futuristic, ultra-quiet, and tech-loaded luxury MPV. Features 6 airbags, ambient cabin lighting, push-button tumble seats, and premium leatherette comfort.',
    imageAvif: '/images/cars/carens.avif',
    imageWebp: '/images/cars/carens.webp',
    imageJpg: '/images/cars/carens.jpg',
    alt: 'Kia Carens 6+1 Seater Luxury MPV',
    specs: [
      { icon: 'fa-fan', text: 'Auto Climate AC' },
      { icon: 'fa-shield-halved', text: '6 Airbags' },
      { icon: 'fa-bolt', text: 'Type-C Ports' },
      { icon: 'fa-star', text: 'VIP Luxury' }
    ]
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    seating: '7 + 1 Seater',
    category: 'suv',
    categoryTag: 'Highway Legend',
    desc: 'The undisputed sovereign of long-distance Indian journeys. Unmatched ride stability, bulletproof reliability, heavy-duty suspension, and royal 7+1 capacity.',
    imageWebp: '/images/cars/innova.webp',
    imageJpg: '/images/cars/innova.jpg',
    alt: 'Toyota Innova 7+1 Seater Highway Cruiser',
    specs: [
      { icon: 'fa-snowflake', text: 'Chilled Dual AC' },
      { icon: 'fa-users', text: '7+1 Seater' },
      { icon: 'fa-mountain', text: 'Rugged & Tough' },
      { icon: 'fa-truck-ramp-box', text: 'Roof Carrier' }
    ]
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    seating: '7 + 1 Seater',
    category: 'suv',
    categoryTag: 'Premium VIP MPV',
    desc: 'The peak of executive chauffeured travel. Plush pushback captain seats, whisper-quiet soundproofing, rear ambient lighting, and elite highway comfort.',
    imageWebp: '/images/cars/innova-crysta.webp',
    imageJpg: '/images/cars/innova-crysta.jpg',
    alt: 'Toyota Innova Crysta 7+1 Seater VIP MUV',
    specs: [
      { icon: 'fa-couch', text: 'Captain Seats' },
      { icon: 'fa-shield', text: '7 Airbags' },
      { icon: 'fa-lightbulb', text: 'Ambient Lighting' },
      { icon: 'fa-crown', text: 'Presidential Ride' }
    ]
  }
];

export default function VehiclesSection() {
  const { openBookingModal } = useBooking();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredVehicles = activeFilter === 'all'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === activeFilter);

  return (
    <section className="vehicles-section section-padding" id="vehicles">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-car"></i>
            <span>Our Premium Fleet</span>
          </div>
          <h2 className="section-title">
            Our <span className="gold-gradient-text">Vehicles</span>
          </h2>
          <p className="section-desc">
            Choose from our meticulously maintained fleet of compact sedans, spacious family MPVs, and luxury SUVs
            tailored for every journey need.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="vehicle-filters">
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Vehicles (6)
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'sedan' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sedan')}
          >
            4+1 Sedans
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'family-mpv' ? 'active' : ''}`}
            onClick={() => setActiveFilter('family-mpv')}
          >
            6+1 Family MPVs
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'suv' ? 'active' : ''}`}
            onClick={() => setActiveFilter('suv')}
          >
            7+1 Premium MUVs
          </button>
        </div>

        {/* Vehicles Cards Grid */}
        <div className="vehicles-grid">
          {filteredVehicles.map((car) => (
            <div key={car.id} className="vehicle-card" data-category={car.category}>
              <div className="vehicle-card-img-wrap has-photo">
                <span className="vehicle-card-badge">{car.seating}</span>
                <picture>
                  {car.imageAvif && <source srcSet={car.imageAvif} type="image/avif" />}
                  <source srcSet={car.imageWebp} type="image/webp" />
                  <img
                    src={car.imageJpg}
                    alt={car.alt}
                    width={400}
                    height={260}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="vehicle-card-body">
                <span className="vehicle-category-tag">{car.categoryTag}</span>
                <h3 className="vehicle-card-title">{car.name}</h3>
                <p className="vehicle-card-desc">{car.desc}</p>

                <div className="vehicle-specs-list">
                  {car.specs.map((spec, i) => (
                    <span key={i} className="spec-chip">
                      <i className={`fa-solid ${spec.icon}`}></i> {spec.text}
                    </span>
                  ))}
                </div>

                <div className="vehicle-card-footer">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-shimmer"
                    onClick={() => openBookingModal(`${car.name} (${car.seating.replace(/\s*\+\s*/g, '+')})`)}
                  >
                    <i className="fa-solid fa-bolt"></i>
                    <span>Book Now</span>
                  </button>
                  <a
                    href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                      `Hello VARMA CAR TRAVELS, I want to book the ${car.name} (${car.seating})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    title="WhatsApp Inquiry"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
