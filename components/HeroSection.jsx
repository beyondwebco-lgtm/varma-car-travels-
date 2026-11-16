'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { useBooking, PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function HeroSection() {
  const { openBookingModal, sendWhatsAppBooking, showToast } = useBooking();
  const [tripType, setTripType] = useState('Outstation Trip');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [vehicle, setVehicle] = useState('Maruti Suzuki Dzire (4+1 Seater)');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
    setDate(today);
  }, []);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!pickup.trim() || !drop.trim()) {
      alert('Please enter both pickup and destination locations.');
      return;
    }

    sendWhatsAppBooking(
      {
        name: 'Website Visitor',
        tripType,
        pickup: pickup.trim(),
        drop: drop.trim(),
        date,
        time,
        vehicle
      },
      PRIMARY_PHONE
    );

    showToast('Opening WhatsApp with your booking details...');
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay-dark"></div>
      <div className="container">
        <div className="hero-content-grid">
          {/* Left Hero Text Block */}
          <div className="hero-text-block">
            <div className="hero-badge">
              <i className="fa-solid fa-star"></i>
              <span>Premier Car Rental & Travel Partner</span>
            </div>

            <h1 className="hero-title">
              VARMA <span className="gold-gradient-text">CAR TRAVELS</span>
            </h1>

            <div className="hero-tagline">
              "Your Journey, Our Responsibility – Travel with Comfort and Confidence!"
            </div>

            <p className="hero-description">
              Experience safe, comfortable, and affordable journeys with VARMA CAR TRAVELS. Whether it's a local trip,
              outstation journey, family vacation, or business travel, we are here to make every journey memorable.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-shimmer"
                onClick={() => openBookingModal()}
              >
                <i className="fa-solid fa-calendar-check"></i>
                <span>Book Your Ride</span>
              </button>

              {/* Call Now with dropdown choice for both numbers */}
              <div className="call-btn-dropdown">
                <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-secondary btn-lg">
                  <i className="fa-solid fa-phone-volume"></i>
                  <span>Call Now</span>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.8rem', marginLeft: '4px' }}></i>
                </a>
                <div className="call-dropdown-menu">
                  <a href={`tel:${PRIMARY_PHONE}`} className="call-dropdown-item">
                    <div>
                      <div>+91 {PRIMARY_PHONE}</div>
                      <span>Primary Line</span>
                    </div>
                    <i className="fa-solid fa-phone text-gold"></i>
                  </a>
                  <a href={`tel:${SECONDARY_PHONE}`} className="call-dropdown-item">
                    <div>
                      <div>+91 {SECONDARY_PHONE}</div>
                      <span>Secondary Line</span>
                    </div>
                    <i className="fa-solid fa-phone text-gold"></i>
                  </a>
                </div>
              </div>

              {/* WhatsApp Instant Action */}
              <a
                href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                  'Hello VARMA CAR TRAVELS, I would like to book a car'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Hero Trust Badges */}
            <div className="hero-features-strip">
              <div className="hero-mini-feature">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>100% Punctual Pickup</span>
              </div>
              <div className="hero-mini-feature">
                <i className="fa-solid fa-tag"></i>
                <span>Transparent Low Pricing</span>
              </div>
              <div className="hero-mini-feature">
                <i className="fa-solid fa-shield-virus"></i>
                <span>Sanitized AC Vehicles</span>
              </div>
            </div>
          </div>

          {/* Right Quick Booking Card / Fare Calculator */}
          <div className="hero-booking-card">
            <div className="booking-card-header">
              <h2 className="booking-card-title">Book Your Journey</h2>
              <p className="booking-card-subtitle">Get Instant Availability & Best Fare Quote via WhatsApp</p>
            </div>

            {/* Trip Type Selector */}
            <div className="booking-trip-type">
              {['Outstation Trip', 'Local City Travel', 'Airport Transfer', 'One-Way Drop'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`trip-type-btn ${tripType === type ? 'active' : ''}`}
                  onClick={() => setTripType(type)}
                >
                  {type.replace(' Trip', '').replace(' Travel', '').replace(' Transfer', '').replace(' Drop', '')}
                </button>
              ))}
            </div>

            <form onSubmit={handleHeroSubmit} className="booking-form-grid">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="heroPickup">
                    Pickup Location
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-location-dot"></i>
                    <input
                      type="text"
                      id="heroPickup"
                      className="form-control"
                      placeholder="e.g. Bhimavaram / Home"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="heroDrop">
                    Destination / Drop
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-flag-checkered"></i>
                    <input
                      type="text"
                      id="heroDrop"
                      className="form-control"
                      placeholder="e.g. Vijayawada / Hyderabad"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="heroDate">
                    Travel Date
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-calendar-days"></i>
                    <input
                      type="date"
                      id="heroDate"
                      className="form-control"
                      value={date}
                      min={minDate}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="heroTime">
                    Pickup Time
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-clock"></i>
                    <input
                      type="time"
                      id="heroTime"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="heroVehicle">
                  Choose Vehicle
                </label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-car"></i>
                  <select
                    id="heroVehicle"
                    className="form-control"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                  >
                    <option value="Maruti Suzuki Dzire (4+1 Seater)">Maruti Suzuki Dzire – 4+1 Seater</option>
                    <option value="Toyota Etios (4+1 Seater)">Toyota Etios – 4+1 Seater</option>
                    <option value="Maruti Suzuki Ertiga (6+1 Seater)">Maruti Suzuki Ertiga – 6+1 Seater</option>
                    <option value="Kia Carens (6+1 Seater)">Kia Carens – 6+1 Seater</option>
                    <option value="Toyota Innova (7+1 Seater)">Toyota Innova – 7+1 Seater</option>
                    <option value="Toyota Innova Crysta (7+1 Seater)">Toyota Innova Crysta – 7+1 Seater</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-shimmer" style={{ marginTop: '6px' }}>
                <i className="fa-brands fa-whatsapp"></i>
                <span>Get Quote on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
