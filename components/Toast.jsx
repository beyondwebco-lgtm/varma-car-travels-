'use strict';
'use client';

import React from 'react';
import { useBooking } from '../context/BookingContext';

export default function Toast() {
  const { isToastVisible, toastMessage } = useBooking();

  return (
    <div
      id="toastNotice"
      className={`toast-notice ${isToastVisible ? 'show' : ''}`}
    >
      <i className="fa-solid fa-circle-check"></i>
      <span>{toastMessage}</span>
    </div>
  );
}
