'use strict';
'use client';

import React from 'react';
import { useBooking } from '../context/BookingContext';

export default function AboutSection() {
  const { openBookingModal } = useBooking();

  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Text Block */}
          <div className="about-text-col">
            <div className="section-badge">
              <i className="fa-solid fa-circle-info"></i>
              <span>About Our Company</span>
            </div>

            <h2 className="section-title">
              About <span className="gold-gradient-text">VARMA CAR TRAVELS</span>
            </h2>

            <p className="about-lead">
              At <strong>VARMA CAR TRAVELS</strong>, we believe that traveling is more than just reaching a
              destination—it is about enjoying peace of mind, comfort, and reliability every kilometer of the way.
            </p>

            <p className="about-body-text">
              Based in Andhra Pradesh, we provide dependable, luxury, and economical cab rental services for local
              errands, airport transfers, temple pilgrimages, corporate trips, and outstation tours. Whether you need a
              swift compact sedan like the Dzire or Etios, or a spacious family carrier like the Ertiga, Carens, Innova,
              or Innova Crysta, we ensure an executive travel experience.
            </p>

            {/* 4 Pillars Highlights */}
            <div className="about-pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon">
                  <i className="fa-solid fa-sparkles"></i>
                </div>
                <div>
                  <h4 className="pillar-title">Sanitized & Spotless Fleet</h4>
                  <p className="pillar-desc">Deep cleaned, deodorized, and fully air-conditioned after every ride.</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <h4 className="pillar-title">Punctual & Dedicated Chauffeurs</h4>
                  <p className="pillar-desc">Courteous, verified, well-trained drivers who prioritize your safety.</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <div>
                  <h4 className="pillar-title">Clear & Transparent Pricing</h4>
                  <p className="pillar-desc">Honest per-km and package rates with zero hidden or surprise charges.</p>
                </div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div>
                  <h4 className="pillar-title">Round-The-Clock 24/7 Availability</h4>
                  <p className="pillar-desc">Always ready for early morning flights, late arrivals, or urgent trips.</p>
                </div>
              </div>
            </div>

            <div className="about-cta-row">
              <button
                type="button"
                className="btn btn-primary btn-shimmer"
                onClick={() => openBookingModal()}
              >
                <i className="fa-solid fa-car"></i>
                <span>Explore Fleet & Book</span>
              </button>
              <div className="about-tagline-quote">
                "Your Journey, Our Responsibility!"
              </div>
            </div>
          </div>

          {/* Right Visual Stats Card */}
          <div className="about-visual-col">
            <div className="about-badge-card">
              <div className="about-badge-header">
                <i className="fa-solid fa-shield-halved"></i>
                <div>
                  <h4>Certified Travel Excellence</h4>
                  <span>Licensed & Verified Travel Operators</span>
                </div>
              </div>

              <div className="about-stats-grid">
                <div className="stat-box">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Verified Chauffeurs</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Instant Support</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">5.0 ★</span>
                  <span className="stat-label">Rider Satisfaction</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Hidden Surprises</span>
                </div>
              </div>

              <div className="about-feature-list">
                <div className="about-feature-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Doorstep Pickup & Drop Across Andhra Pradesh</span>
                </div>
                <div className="about-feature-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Modern Fleet with Chilled Dual AC & Clean Interiors</span>
                </div>
                <div className="about-feature-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>One-Way Drops & Outstation Packages Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
