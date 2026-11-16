'use strict';
'use client';

import React from 'react';

const REASONS = [
  {
    num: '01',
    icon: 'fa-stopwatch-20',
    title: '100% Punctual Pickups',
    desc: 'Never miss a flight, train, or meeting again. Our chauffeurs report 15 minutes before your scheduled departure time.'
  },
  {
    num: '02',
    icon: 'fa-pump-medical',
    title: 'Sanitized & Spotless Fleet',
    desc: 'Each car undergoes intensive vacuum cleaning, cabin sanitization, and air fragrance checks before picking you up.'
  },
  {
    num: '03',
    icon: 'fa-id-badge',
    title: 'Professional Chauffeurs',
    desc: 'Background-verified drivers with extensive highway experience, defensive driving skills, and patient customer etiquette.'
  },
  {
    num: '04',
    icon: 'fa-hand-holding-dollar',
    title: 'Transparent Low Fares',
    desc: 'Upfront clear pricing with zero hidden surcharges or post-trip surprise fees. What we quote is exactly what you pay.'
  },
  {
    num: '05',
    icon: 'fa-clock-rotate-left',
    title: '24/7 Rapid Dispatch',
    desc: 'Day or midnight, our helpline is always active. Instant emergency dispatches, airport rides, and late-night travel.'
  },
  {
    num: '06',
    icon: 'fa-shield-halved',
    title: 'Safety & Comfort Assured',
    desc: 'All vehicles undergo routine mechanical inspections and tire diagnostics to guarantee an uninterrupted, smooth highway voyage.'
  }
];

export default function WhyUsSection() {
  return (
    <section className="why-us-section section-padding" id="why-us">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-crown"></i>
            <span>The VARMA Difference</span>
          </div>
          <h2 className="section-title">
            Why Choose <span className="gold-gradient-text">VARMA CAR TRAVELS</span>
          </h2>
          <p className="section-desc">
            Discover why hundreds of families, tourists, and corporate executives make us their preferred car rental
            partner.
          </p>
        </div>

        <div className="why-us-grid">
          {REASONS.map((r, idx) => (
            <div key={idx} className="why-us-card">
              <span className="why-us-number">{r.num}</span>
              <div className="why-us-icon">
                <i className={`fa-solid ${r.icon}`}></i>
              </div>
              <h3 className="why-us-title">{r.title}</h3>
              <p className="why-us-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
