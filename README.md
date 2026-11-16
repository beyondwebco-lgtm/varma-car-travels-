# VARMA CAR TRAVELS - Premium Car Rental & Travel Services

A production-grade, ultra-fast, and fully responsive website built for **VARMA CAR TRAVELS** using **Next.js (App Router), React 19, and Modern CSS**.

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 🌟 Key Features

### 1. Theme & Design
- **Luxury Aesthetic**: High-end black, white, and golden yellow palette (`#0B0E17`, `#F59E0B`, `#FBBF24`, `#FFFFFF`).
- **Modern Typography**: Google Fonts (*Outfit* for luxury bold titles, *Plus Jakarta Sans* for ultra-clean readability) and FontAwesome 6 icons.
- **Glassmorphism & Micro-Interactions**: Translucent backdrop blur cards, glowing buttons, smooth hover transitions, and subtle gold accents.
- **100% Fully Responsive**: Pixel-perfect layout across mobile phones, tablets, laptops, and ultra-wide desktops.

### 2. Header & Navigation
- Sticky header with glassmorphism on scroll.
- Brand logo with custom luxury SVG emblem for **VARMA CAR TRAVELS**.
- Navigation links with smooth scroll:
  - Home
  - About Us
  - Our Vehicles
  - Services
  - Why Choose Us
  - Location
  - Contact Us
- Highlighted **Book Your Ride** button with shimmering pulse animation.
- Responsive mobile drawer navigation with animated hamburger button.

### 3. Hero Section
- Full-width hero banner with premium automotive backdrop.
- Main Heading: **VARMA CAR TRAVELS**
- Tagline: *"Your Journey, Our Responsibility – Travel with Comfort and Confidence!"*
- Description: *"Experience safe, comfortable, and affordable journeys with VARMA CAR TRAVELS. Whether it's a local trip, outstation journey, family vacation, or business travel, we are here to make every journey memorable."*
- Action buttons: **Book Your Ride**, **Call Now** (with dropdown selector for both numbers), and **WhatsApp**.
- **Interactive Quick Booking / Fare Quote Wizard**:
  - Filter by Outstation, Local City, Airport Drop, One-Way.
  - Pickup Location, Destination, Date, Time, and Vehicle Selector.
  - Generates instant formatted WhatsApp booking requests.

### 4. About Us
- Detailed company background prioritizing reliability, comfort, and punctuality.
- **4 Key Highlight Pillars**:
  1. Comfortable Vehicles
  2. Professional Service
  3. Affordable Pricing
  4. Safe & Reliable Journeys
- Operational milestones counter (10+ Years, 15,000+ Trips, 100% On-Time Record).

### 5. Our Vehicles
Individual vehicle cards with realistic vector graphics, seating badges, specs, and booking triggers:
1. **Maruti Suzuki Dzire** – 4+1 Seater (Compact Sedan)
2. **Toyota Etios** – 4+1 Seater (Executive Sedan with 592L boot)
3. **Maruti Suzuki Ertiga** – 6+1 Seater (Family Smart Hybrid MPV)
4. **Kia Carens** – 6+1 Seater (Modern Luxury Tech MPV)
5. **Toyota Innova** – 7+1 Seater (Highway Legend MUV)
6. **Toyota Innova Crysta** – 7+1 Seater (Premium VIP MPV)

- Interactive category filter tabs (All Vehicles, 4+1 Sedans, 6+1 Family MPVs, 7+1 Luxury MUVs).
- Direct "Book Now" buttons that auto-select the chosen car in the booking dialog.

### 6. Our Services
Attractive service cards with golden icon boxes and direct booking links:
- **Local City Travels**
- **Outstation Travels**
- **Airport Pickup & Drop**
- **Family Trips**
- **Corporate Travels**
- **Tourist Packages**
- **One-Way Trips**
- **Round Trips**

### 7. Why Choose Us?
6 core value pillars:
- Clean and Comfortable Cars
- Affordable Travel Services
- Experienced Drivers
- On-Time Pickup and Drop
- Friendly Customer Support
- Reliable Transportation

### 8. Google Maps Location
- Dedicated responsive location section.
- Exact GPS Coordinates: **Latitude: 16.768000, Longitude: 81.681306**
- Embedded responsive Google Map iframe.
- Functional **Get Directions** button.
- Functional **View on Google Maps** button.

### 9. Contact Us
- Company Name: **VARMA CAR TRAVELS**
- Contact Numbers:
  - **7569526527** (Clickable `tel:` and WhatsApp links)
  - **9912196524** (Clickable `tel:` and WhatsApp links)
- Functional call and WhatsApp click-to-chat buttons.
- Interactive booking inquiry form that formats user details and sends them directly to WhatsApp.

### 10. Footer
- Brand info and tagline: *"Your Journey, Our Responsibility!"*
- Quick navigation links.
- Fleet model shortcuts.
- Contact numbers: `7569526527 | 9912196524`.
- Copyright: `© 2026 VARMA CAR TRAVELS. All Rights Reserved.`

### 11. Additional Interactive Features
- **Floating WhatsApp button** at bottom-right with pulsating aura and direct chat options for both numbers.
- **Floating Call button** at bottom-left for mobile users.
- **Quick Booking Modal Dialog** accessible from any button across the page.
- **Back-to-Top** smooth scroll button.
- Toast feedback notifications.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended).

### Run Locally

1. Open your terminal in the project directory:
   ```bash
   cd "d:\static\varma car"
   ```

2. Start the local server:
   ```bash
   npm start
   ```
   *(or run `node server.js` directly)*

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
d:\static\varma car\
├── package.json          # Node.js project configuration & start script
├── server.js             # High-performance static web server
├── README.md             # Project documentation & guide
└── public/               # Public web assets root
    ├── index.html        # Main HTML5 page with all sections
    ├── css/
    │   └── style.css     # Luxury theme styles, responsive layout & animations
    ├── js/
    │   └── main.js       # Interactive UI logic, filters & WhatsApp generator
    └── images/
        ├── logo.svg      # High-definition VARMA CAR TRAVELS vector logo
        ├── hero-bg.svg   # Atmospheric automotive hero background
        └── cars/
            ├── dzire.svg         # Maruti Suzuki Dzire (4+1)
            ├── etios.svg         # Toyota Etios (4+1)
            ├── ertiga.svg        # Maruti Suzuki Ertiga (6+1)
            ├── carens.svg        # Kia Carens (6+1)
            ├── innova.svg        # Toyota Innova (7+1)
            └── innova-crysta.svg # Toyota Innova Crysta (7+1)
```

---

## 📞 Company Contact Details

- **Company**: VARMA CAR TRAVELS
- **Email**: [varmacartravels7@gmail.com](mailto:varmacartravels7@gmail.com)
- **Helplines**: `+91 7569526527` & `+91 9912196524`
- **Location**: Tanuku, Sajjapuram, Andhra Pradesh (Latitude: `16.768000`, Longitude: `81.681306` — [View on Google Maps](https://www.google.com/maps?q=16.768000,81.681306))
- **Operating Hours**: 24/7 Available (All 365 Days)
