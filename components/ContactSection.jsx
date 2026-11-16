'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { useBooking, PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function ContactSection() {
  const { sendWhatsAppBooking, showToast } = useBooking();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('Toyota Innova Crysta (7+1 Seater)');
  const [tripType, setTripType] = useState('Outstation Trip');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
    setDate(today);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!pickup.trim() || !drop.trim()) {
      alert('Please specify both pickup and destination locations.');
      return;
    }

    sendWhatsAppBooking(
      {
        name: name.trim() || 'Valued Customer',
        phone: phone.trim() || 'Provided on WhatsApp',
        vehicle,
        tripType,
        pickup: pickup.trim(),
        drop: drop.trim(),
        date,
        notes: message.trim()
      },
      PRIMARY_PHONE
    );

    showToast('Inquiry generated! Redirecting to WhatsApp...');
  };

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-envelope-open-text"></i>
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Contact <span className="gold-gradient-text">VARMA CAR TRAVELS</span>
          </h2>
          <p className="section-desc">
            We are here for you 24/7. Reach out via phone call, WhatsApp, or submit the booking form below for quick
            assistance.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Contact Details & Quick Channels */}
          <div className="contact-info-col">
            <div className="contact-channel-card">
              <div className="channel-icon phone">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div className="channel-text">
                <span>Direct Phone Helplines</span>
                <h4>+91 {PRIMARY_PHONE}</h4>
                <p>Secondary Support: +91 {SECONDARY_PHONE}</p>
              </div>
              <div className="contact-action-btns">
                <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-secondary btn-sm" title="Call Primary Line">
                  <i className="fa-solid fa-phone"></i>
                  <span>Call 1</span>
                </a>
                <a href={`tel:${SECONDARY_PHONE}`} className="btn btn-secondary btn-sm" title="Call Secondary Line">
                  <i className="fa-solid fa-phone"></i>
                  <span>Call 2</span>
                </a>
              </div>
            </div>

            <div className="contact-channel-card">
              <div className="channel-icon whatsapp">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="channel-text">
                <span>Instant WhatsApp Chat</span>
                <h4>+91 {PRIMARY_PHONE}</h4>
                <p>Real-time booking confirmations & driver details</p>
              </div>
              <a
                href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                  'Hello VARMA CAR TRAVELS, I have an inquiry about booking a car'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span>Chat Now</span>
              </a>
            </div>

            <div className="contact-channel-card">
              <div className="channel-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="channel-text">
                <span>Official Email Inquiries</span>
                <h4 style={{ fontSize: '1rem', wordBreak: 'break-all' }}>varmacartravels7@gmail.com</h4>
                <p>For corporate contracts, bulk tours, and queries</p>
              </div>
              <a href="mailto:varmacartravels7@gmail.com" className="btn btn-secondary btn-sm">
                <i className="fa-solid fa-paper-plane"></i>
                <span>Email Us</span>
              </a>
            </div>

            <div className="contact-channel-card">
              <div className="channel-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' }}>
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <div className="channel-text">
                <span>Main Operations Hub</span>
                <h4>Tanuku, Sajjapuram</h4>
                <p>West Godavari District, Andhra Pradesh (16.768000, 81.681306)</p>
              </div>
              <a
                href="https://www.google.com/maps?q=16.768000,81.681306"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <i className="fa-solid fa-location-arrow"></i>
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Booking Form */}
          <div className="contact-form-panel">
            <h3 className="contact-form-title">Send a Quick Booking Request</h3>
            <p className="contact-form-subtitle">
              Fill out this quick form to initiate an instant WhatsApp confirmation with our booking team.
            </p>

            <form onSubmit={handleContactSubmit} className="contact-form-inner">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">
                    Your Full Name
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-user"></i>
                    <input
                      type="text"
                      id="contactName"
                      className="form-control"
                      placeholder="e.g. Rajesh Varma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactPhone">
                    Phone / Mobile Number
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-phone"></i>
                    <input
                      type="tel"
                      id="contactPhone"
                      className="form-control"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactVehicle">
                    Vehicle Choice
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-car-side"></i>
                    <select
                      id="contactVehicle"
                      className="form-control"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                    >
                      <option value="Maruti Suzuki Dzire (4+1 Seater)">Maruti Suzuki Dzire (4+1 Seater)</option>
                      <option value="Toyota Etios (4+1 Seater)">Toyota Etios (4+1 Seater)</option>
                      <option value="Maruti Suzuki Ertiga (6+1 Seater)">Maruti Suzuki Ertiga (6+1 Seater)</option>
                      <option value="Kia Carens (6+1 Seater)">Kia Carens (6+1 Seater)</option>
                      <option value="Toyota Innova (7+1 Seater)">Toyota Innova (7+1 Seater)</option>
                      <option value="Toyota Innova Crysta (7+1 Seater)">Toyota Innova Crysta (7+1 Seater)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactTripType">
                    Trip Type
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-route"></i>
                    <select
                      id="contactTripType"
                      className="form-control"
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                    >
                      <option value="Outstation Trip">Outstation Trip (Round / Multi-day)</option>
                      <option value="Local City Travel">Local City Travel (Hourly Package)</option>
                      <option value="Airport Transfer">Airport Drop / Pickup</option>
                      <option value="One-Way Drop">One-Way Drop Service</option>
                      <option value="Family / Wedding Package">Family / Wedding Package</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactPickup">
                    Pickup City / Area
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-location-dot"></i>
                    <input
                      type="text"
                      id="contactPickup"
                      className="form-control"
                      placeholder="e.g. Tanuku / Bhimavaram"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactDrop">
                    Drop / Destination
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-flag-checkered"></i>
                    <input
                      type="text"
                      id="contactDrop"
                      className="form-control"
                      placeholder="e.g. Vijayawada / Hyderabad"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactDate">
                  Travel Date
                </label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-calendar-day"></i>
                  <input
                    type="date"
                    id="contactDate"
                    className="form-control"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactMessage">
                  Special Instructions or Requirements (Optional)
                </label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-comment-dots"></i>
                  <textarea
                    id="contactMessage"
                    rows="3"
                    className="form-control"
                    placeholder="e.g. Pickup at 5:00 AM, need roof carrier for luggage, AC on throughout"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-shimmer" style={{ marginTop: '8px' }}>
                <i className="fa-brands fa-whatsapp"></i>
                <span>Submit Inquiry via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
