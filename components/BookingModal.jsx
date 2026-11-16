'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { useBooking, PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function BookingModal() {
  const { isModalOpen, closeBookingModal, selectedVehicle, sendWhatsAppBooking, showToast } = useBooking();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState(selectedVehicle);
  const [tripType, setTripType] = useState('Outstation Trip');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    if (selectedVehicle) {
      setVehicle(selectedVehicle);
    }
  }, [selectedVehicle]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
    setDate(today);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeBookingModal]);

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
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
        notes: notes.trim()
      },
      PRIMARY_PHONE
    );

    closeBookingModal();
    showToast('Connecting you with VARMA CAR TRAVELS on WhatsApp...');
  };

  return (
    <div className="booking-modal-overlay active" id="bookingModalOverlay" onClick={closeBookingModal}>
      <div className="booking-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 className="modal-title">Instant Ride Reservation</h3>
            <p className="modal-subtitle">Quick confirmation & transparent fare quote on WhatsApp</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            id="modalCloseBtn"
            aria-label="Close Modal"
            onClick={closeBookingModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-grid" id="modalBookingForm">
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="modalName">
                Your Full Name
              </label>
              <div className="input-with-icon">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  id="modalName"
                  className="form-control"
                  placeholder="e.g. Suresh Varma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="modalPhone">
                Mobile Number
              </label>
              <div className="input-with-icon">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  id="modalPhone"
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
              <label className="form-label" htmlFor="modalVehicle">
                Selected Vehicle
              </label>
              <div className="input-with-icon">
                <i className="fa-solid fa-car-side"></i>
                <select
                  id="modalVehicle"
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
              <label className="form-label" htmlFor="modalTripType">
                Trip Category
              </label>
              <div className="input-with-icon">
                <i className="fa-solid fa-route"></i>
                <select
                  id="modalTripType"
                  className="form-control"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option value="Outstation Trip">Outstation Trip</option>
                  <option value="Local City Travel">Local City Travel</option>
                  <option value="Airport Transfer">Airport Drop / Pickup</option>
                  <option value="One-Way Drop">One-Way Drop</option>
                  <option value="Family / Wedding Event">Family / Wedding Event</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="modalPickup">
                Pickup City / Area
              </label>
              <div className="input-with-icon">
                <i className="fa-solid fa-location-dot"></i>
                <input
                  type="text"
                  id="modalPickup"
                  className="form-control"
                  placeholder="Pickup City / Area"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="modalDrop">
                Drop / Destination
              </label>
              <div className="input-with-icon">
                <i className="fa-solid fa-flag-checkered"></i>
                <input
                  type="text"
                  id="modalDrop"
                  className="form-control"
                  placeholder="Drop Location"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modalDate">
              Date of Journey
            </label>
            <div className="input-with-icon">
              <i className="fa-solid fa-calendar-day"></i>
              <input
                type="date"
                id="modalDate"
                className="form-control"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modalNotes">
              Special Requests (Optional)
            </label>
            <div className="input-with-icon">
              <i className="fa-solid fa-message"></i>
              <input
                type="text"
                id="modalNotes"
                className="form-control"
                placeholder="e.g. Flight number, extra luggage space, child seat"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-shimmer" style={{ marginTop: '10px' }}>
            <i className="fa-brands fa-whatsapp"></i>
            <span>Confirm Booking via WhatsApp</span>
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginTop: '14px',
              fontSize: '0.85rem'
            }}
          >
            <a href={`tel:${PRIMARY_PHONE}`} style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
              <i className="fa-solid fa-phone"></i> Call {PRIMARY_PHONE}
            </a>
            <span style={{ color: 'var(--border-light)' }}>|</span>
            <a href={`tel:${SECONDARY_PHONE}`} style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
              <i className="fa-solid fa-phone"></i> Call {SECONDARY_PHONE}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
