import './globals.css';
import { BookingProvider } from '../context/BookingContext';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import FloatingWidgets from '../components/FloatingWidgets';
import Toast from '../components/Toast';

export const metadata = {
  metadataBase: new URL('https://varmacartravels.com'),
  title: 'VARMA CAR TRAVELS | Safe, Comfortable & Affordable Car Rentals',
  description:
    'VARMA CAR TRAVELS - Your Journey, Our Responsibility! 24/7 safe, comfortable, and affordable car rental & taxi service in Tanuku. Fleet includes Dzire, Etios, Ertiga, Carens, Innova & Innova Crysta.',
  keywords: [
    'VARMA CAR TRAVELS',
    'car rental Tanuku',
    'taxi service Tanuku',
    'outstation cabs',
    'airport drop',
    'Dzire rental',
    'Ertiga rental',
    'Innova Crysta rental',
    'car travels Andhra Pradesh'
  ],
  authors: [{ name: 'VARMA CAR TRAVELS' }],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://varmacartravels.com/'
  },
  openGraph: {
    type: 'website',
    url: 'https://varmacartravels.com/',
    title: 'VARMA CAR TRAVELS | Safe, Comfortable & Affordable Car Rentals',
    description:
      '24/7 luxury car rentals, outstation cabs, airport transfers, and wedding packages. Call 7569526527 / 9912196524.',
    siteName: 'VARMA CAR TRAVELS',
    locale: 'en_IN',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 256,
        alt: 'VARMA CAR TRAVELS Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VARMA CAR TRAVELS | Safe, Comfortable & Affordable Car Rentals',
    description:
      '24/7 luxury car rentals, outstation cabs, airport transfers, and wedding packages. Call 7569526527 / 9912196524.',
    images: ['/images/logo.png']
  },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  name: 'VARMA CAR TRAVELS',
  alternateName: 'Varma Travels',
  url: 'https://varmacartravels.com/',
  logo: 'https://varmacartravels.com/images/logo.png',
  image: 'https://varmacartravels.com/images/logo.png',
  description:
    'Premium 24/7 car rental, taxi service, outstation cabs, and airport transfers in Tanuku, Andhra Pradesh. Fleet includes Dzire, Etios, Ertiga, Carens, Innova, and Innova Crysta.',
  telephone: ['+917569526527', '+919912196524'],
  email: 'varmacartravels7@gmail.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sajjapuram',
    addressLocality: 'Tanuku',
    addressRegion: 'Andhra Pradesh',
    postalCode: '534211',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 16.768,
    longitude: 81.681306
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59'
  },
  areaServed: ['Tanuku', 'Bhimavaram', 'Tadepalligudem', 'Rajahmundry', 'Vijayawada', 'Andhra Pradesh', 'Telangana'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Rental Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maruti Suzuki Dzire 4+1 Seater Car Rental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Toyota Etios 4+1 Seater Car Rental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maruti Suzuki Ertiga 6+1 Seater MPV Rental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kia Carens 6+1 Seater Luxury MPV Rental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Toyota Innova 7+1 Seater Travel Rental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Toyota Innova Crysta 7+1 Seater Premium Rental' } }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0B0E17" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preload Logo */}
        <link rel="preload" as="image" href="/images/logo.webp" type="image/webp" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome 6 Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <BookingProvider>
          <TopBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingModal />
          <FloatingWidgets />
          <Toast />
        </BookingProvider>
      </body>
    </html>
  );
}
