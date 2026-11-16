'use strict';
'use client';

import React from 'react';
import { PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-left">
          <div className="top-badge-pulse">
            <span className="pulse-dot"></span>
            <span>24/7 Car Travel Service</span>
          </div>
          <div className="top-bar-item hide-mobile">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Sanitized Fleet & Verified Chauffeurs</span>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="top-bar-item">
            <i className="fa-solid fa-phone"></i>
            <span>
              Call: <a href={`tel:${PRIMARY_PHONE}`}>{PRIMARY_PHONE}</a> |{' '}
              <a href={`tel:${SECONDARY_PHONE}`}>{SECONDARY_PHONE}</a>
            </span>
          </div>
          <div className="top-bar-item hide-mobile">
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:varmacartravels7@gmail.com">varmacartravels7@gmail.com</a>
          </div>
          <div className="top-bar-item hide-mobile">
            <i className="fa-brands fa-whatsapp"></i>
            <a
              href={`https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(
                'Hello VARMA CAR TRAVELS, I would like to book a car'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
