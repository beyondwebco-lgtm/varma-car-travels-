/**
 * VARMA CAR TRAVELS - Master JavaScript File
 * High-performance, clean, modular client scripts
 */

// Global Booking Modal Trigger (available immediately to prevent pre-DOMContentLoaded errors)
window.openBookingModal = function(preselectedVehicle = '') {
  const modalOverlay = document.getElementById('bookingModalOverlay');
  const modalVehicleSelect = document.getElementById('modalVehicle');
  if (modalVehicleSelect && preselectedVehicle) {
    modalVehicleSelect.value = preselectedVehicle;
  }
  modalOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Constants & Config ---
  const PRIMARY_PHONE = '7569526527';
  const SECONDARY_PHONE = '9912196524';
  const COUNTRY_CODE = '91';

  // --- Elements Cache ---
  const navbarWrapper = document.getElementById('navbarWrapper');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');
  const tripTypeBtns = document.querySelectorAll('.trip-type-btn');
  const heroBookingForm = document.getElementById('heroBookingForm');
  const modalOverlay = document.getElementById('bookingModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBookingForm = document.getElementById('modalBookingForm');
  const contactForm = document.getElementById('contactInquiryForm');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  const floatingWaWidget = document.querySelector('.floating-whatsapp-widget');
  const floatingCallBtn = document.getElementById('floatingCallBtn');
  const floatingCallWidget = document.querySelector('.floating-call-widget');
  const mapContainer = document.getElementById('locationMapContainer');
  const loadMapBtn = document.getElementById('loadMapBtn');

  let selectedTripType = 'Outstation Journey';

  // --- Throttled Scroll Manager using requestAnimationFrame ---
  let isScrolling = false;
  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky Header
    if (scrollY > 30) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }

    // Back to Top Button
    if (scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // ScrollSpy (Active nav highlight)
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    isScrolling = false;
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleScroll);
      isScrolling = true;
    }
  }, { passive: true });

  // Initial scroll check on load
  handleScroll();

  // --- Mobile Navigation Drawer ---
  function openMobileMenu() {
    mobileNavDrawer?.classList.add('active');
    mobileNavOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNavDrawer?.classList.remove('active');
    mobileNavOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileNavOverlay?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- Vehicle Category Filter ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      vehicleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- Hero Trip Type Toggle Buttons ---
  tripTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tripTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTripType = btn.getAttribute('data-type') || btn.textContent.trim();
    });
  });

  // --- Helper: WhatsApp Message Builder & Sender ---
  function sendWhatsAppBooking(data, preferredPhone = PRIMARY_PHONE) {
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
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${COUNTRY_CODE}${preferredPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // --- Toast Notification Helper ---
  function showToast(msg) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // --- Hero Quick Booking Form Submission ---
  heroBookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pickup = document.getElementById('heroPickup')?.value.trim();
    const drop = document.getElementById('heroDrop')?.value.trim();
    const date = document.getElementById('heroDate')?.value;
    const time = document.getElementById('heroTime')?.value;
    const vehicle = document.getElementById('heroVehicle')?.value;

    if (!pickup || !drop) {
      alert('Please enter both pickup and destination locations.');
      return;
    }

    sendWhatsAppBooking({
      name: 'Website Visitor',
      tripType: selectedTripType,
      pickup,
      drop,
      date,
      time,
      vehicle
    }, PRIMARY_PHONE);

    showToast('Opening WhatsApp with your booking details...');
  });

  // --- Booking Modal Logic ---
  function closeBookingModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeBookingModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeBookingModal();
  });

  // Global ESC Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeMobileMenu();
    }
  });

  // Modal Form Submit
  modalBookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modalName')?.value.trim();
    const phone = document.getElementById('modalPhone')?.value.trim();
    const vehicle = document.getElementById('modalVehicle')?.value;
    const tripType = document.getElementById('modalTripType')?.value;
    const pickup = document.getElementById('modalPickup')?.value.trim();
    const drop = document.getElementById('modalDrop')?.value.trim();
    const date = document.getElementById('modalDate')?.value;
    const notes = document.getElementById('modalNotes')?.value.trim();

    sendWhatsAppBooking({
      name,
      phone,
      vehicle,
      tripType,
      pickup,
      drop,
      date,
      notes
    }, PRIMARY_PHONE);

    closeBookingModal();
    showToast('Connecting you with VARMA CAR TRAVELS on WhatsApp...');
  });

  // --- Contact Section Form Submission ---
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const vehicle = document.getElementById('contactVehicle')?.value;
    const tripType = document.getElementById('contactTripType')?.value;
    const pickup = document.getElementById('contactPickup')?.value.trim();
    const drop = document.getElementById('contactDrop')?.value.trim();
    const date = document.getElementById('contactDate')?.value;
    const notes = document.getElementById('contactMessage')?.value.trim();

    sendWhatsAppBooking({
      name,
      phone,
      vehicle,
      tripType,
      pickup,
      drop,
      date,
      notes
    }, PRIMARY_PHONE);

    showToast('Inquiry generated! Redirecting to WhatsApp...');
  });

  // --- Back to Top Click ---
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Floating Widgets Touch Handler ---
  floatingWaBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.innerWidth <= 768) {
      floatingWaWidget?.classList.toggle('open');
    } else {
      window.open(`https://wa.me/${COUNTRY_CODE}${PRIMARY_PHONE}?text=${encodeURIComponent('Hello VARMA CAR TRAVELS, I want to book a car ride.')}`, '_blank', 'noopener,noreferrer');
    }
  });

  floatingCallBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    floatingCallWidget?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-whatsapp-widget')) {
      floatingWaWidget?.classList.remove('open');
    }
    if (!e.target.closest('.floating-call-widget')) {
      floatingCallWidget?.classList.remove('open');
    }
  });

  // --- Date Inputs Initializer ---
  const todayStr = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.setAttribute('min', todayStr);
    if (!input.value) input.value = todayStr;
  });

  // --- Optimized Google Maps Lazy Loader ---
  let mapLoaded = false;
  function loadGoogleMap() {
    if (mapLoaded || !mapContainer) return;
    mapLoaded = true;

    const iframe = document.createElement('iframe');
    iframe.src = 'https://maps.google.com/maps?q=16.768000,81.681306&hl=en&z=15&output=embed';
    iframe.title = 'VARMA CAR TRAVELS Google Maps Location';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';

    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
  }

  loadMapBtn?.addEventListener('click', loadGoogleMap);

  // Auto-load map when location section is near viewport
  if ('IntersectionObserver' in window && mapContainer) {
    const mapObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadGoogleMap();
          observer.disconnect();
        }
      });
    }, { rootMargin: '250px' });
    mapObserver.observe(mapContainer);
  }
});
