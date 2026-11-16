'use strict';
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext(null);

export const PRIMARY_PHONE = '7569526527';
export const SECONDARY_PHONE = '9912196524';
export const COUNTRY_CODE = '91';

export function BookingProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('Maruti Suzuki Dzire (4+1 Seater)');
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3500);
  }, []);

  const openBookingModal = useCallback((vehicle = '') => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    setIsModalOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  const sendWhatsAppBooking = useCallback((data, phone = PRIMARY_PHONE) => {
    const lines = [
      `*🚗 NEW CAR BOOKING INQUIRY - VARMA CAR TRAVELS*`,
      `----------------------------------------`,
      `👤 *Customer Name:* ${data.name || 'Traveler'}`,
      `📞 *Phone Number:* ${data.phone || 'Provided via WhatsApp'}`,
      `🚘 *Vehicle Choice:* ${data.vehicle || 'Any Suitable Vehicle'}`,
      `🔄 *Trip Type:* ${data.tripType || 'Outstation'}`,
      `📍 *Pickup Location:* ${data.pickup || 'To be specified'}`,
      `🏁 *Drop / Destination:* ${data.drop || 'To be specified'}`,
      `📅 *Date & Time:* ${data.date || 'Earliest available'} ${data.time ? 'at ' + data.time : ''}`,
      data.notes ? `📝 *Notes/Requirements:* ${data.notes}` : '',
      `----------------------------------------`,
      `_Please check availability and share the best fare quotation. Thank you!_`
    ].filter(Boolean);

    const message = lines.join('\n');
    const url = `https://wa.me/${COUNTRY_CODE}${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        selectedVehicle,
        openBookingModal,
        closeBookingModal,
        sendWhatsAppBooking,
        showToast,
        toastMessage,
        isToastVisible
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
