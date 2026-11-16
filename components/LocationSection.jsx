'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PRIMARY_PHONE, SECONDARY_PHONE } from '../context/BookingContext';

export default function LocationSection() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !mapContainerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '250px' }
    );

    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="location-section section-padding" id="location">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-location-crosshairs"></i>
            <span>Find Us Easily</span>
          </div>
          <h2 className="section-title">
            Our Hub & <span className="gold-gradient-text">Location</span>
          </h2>
          <p className="section-desc">
            Strategically located in Andhra Pradesh to serve Bhimavaram, Tanuku, Tadepalligudem, and the entire
            Godavari delta with swift dispatch.
          </p>
        </div>

        <div className="location-wrapper">
          {/* Location Info Panel */}
          <div className="location-info-panel">
            <div className="location-coord-badge">
              <i className="fa-solid fa-compass"></i>
              <span>Sajjapuram, Tanuku • GPS: 16.768000, 81.681306</span>
            </div>

            <h3 className="location-title">VARMA CAR TRAVELS</h3>
            <p className="location-desc">
              Visit our operations hub at Tanuku, Sajjapuram or request car pickup directly from your doorstep, hotel,
              railway station, or airport. We are ready 24/7!
            </p>

            <div className="location-details-list">
              <div className="loc-detail-item">
                <i className="fa-solid fa-map-pin"></i>
                <div>
                  <h5>Operational Hub Coordinates</h5>
                  <p>
                    <strong>Tanuku, Sajjapuram</strong> &bull; Latitude: 16.768000, Longitude: 81.681306
                  </p>
                </div>
              </div>

              <div className="loc-detail-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h5>Direct Helpline Numbers</h5>
                  <p>
                    <a href={`tel:${PRIMARY_PHONE}`} style={{ color: 'var(--gold-400)' }}>
                      {PRIMARY_PHONE}
                    </a>{' '}
                    &bull;{' '}
                    <a href={`tel:${SECONDARY_PHONE}`} style={{ color: 'var(--gold-400)' }}>
                      {SECONDARY_PHONE}
                    </a>
                  </p>
                </div>
              </div>

              <div className="loc-detail-item">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <h5>Working Hours</h5>
                  <p>Open 24 Hours / 7 Days a Week (All 365 Days)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="location-actions-group">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=16.768000,81.681306"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-shimmer"
              >
                <i className="fa-solid fa-diamond-turn-right"></i>
                <span>Get Directions</span>
              </a>
              <a
                href="https://www.google.com/maps?q=16.768000,81.681306"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map Panel with Lazy Loading */}
          <div className="location-map-panel" ref={mapContainerRef} id="locationMapContainer">
            {mapLoaded ? (
              <iframe
                src="https://maps.google.com/maps?q=16.768000,81.681306&hl=en&z=15&output=embed"
                title="VARMA CAR TRAVELS Google Maps Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '100%', border: 0 }}
              ></iframe>
            ) : (
              <div className="map-placeholder">
                <div className="map-placeholder-content">
                  <i className="fa-solid fa-map-location-dot map-placeholder-icon"></i>
                  <h4>VARMA CAR TRAVELS</h4>
                  <p>Tanuku, Sajjapuram (GPS: 16.768000, 81.681306)</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-shimmer"
                    onClick={() => setMapLoaded(true)}
                  >
                    <i className="fa-solid fa-layer-group"></i>
                    <span>Load Interactive Map</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
