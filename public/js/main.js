/**
 * VARMA CAR TRAVELS - Master JavaScript File
 * Luxury Car Rental & Travel Services
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Config ---
  const PRIMARY_PHONE = '7569526527';
  const SECONDARY_PHONE = '9912196524';
  const COUNTRY_CODE = '91';

  // --- Sticky Header Effect ---
  const navbarWrapper = document.getElementById('navbarWrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }
  });

  // --- Mobile Drawer Menu ---
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

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
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // --- Smooth Scroll & Active Nav Spy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // --- Vehicle Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');

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
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- Hero Trip Type Toggle Buttons ---
  const tripTypeBtns = document.querySelectorAll('.trip-type-btn');
  let selectedTripType = 'Outstation Journey';

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
    window.open(url, '_blank');
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
  const heroBookingForm = document.getElementById('heroBookingForm');
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
  const modalOverlay = document.getElementById('bookingModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalVehicleSelect = document.getElementById('modalVehicle');
  const modalBookingForm = document.getElementById('modalBookingForm');

  window.openBookingModal = function(preselectedVehicle = '') {
    if (modalVehicleSelect && preselectedVehicle) {
      modalVehicleSelect.value = preselectedVehicle;
    }
    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeBookingModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeBookingModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeBookingModal();
  });

  // Handle escape key
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
  const contactForm = document.getElementById('contactInquiryForm');
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

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Mobile Touch Toggle for Floating Widgets ---
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  const floatingWaWidget = document.querySelector('.floating-whatsapp-widget');
  floatingWaBtn?.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      floatingWaWidget?.classList.toggle('open');
    } else {
      // Direct open on desktop
      window.open(`https://wa.me/${COUNTRY_CODE}${PRIMARY_PHONE}?text=${encodeURIComponent('Hello VARMA CAR TRAVELS, I want to book a car ride.')}`, '_blank');
    }
  });

  const floatingCallBtn = document.getElementById('floatingCallBtn');
  const floatingCallWidget = document.querySelector('.floating-call-widget');
  floatingCallBtn?.addEventListener('click', () => {
    floatingCallWidget?.classList.toggle('open');
  });

  // Set default min date for date inputs to today
  const todayStr = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.setAttribute('min', todayStr);
    if (!input.value) input.value = todayStr;
  });
});
