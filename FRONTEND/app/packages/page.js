'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Testimonials from '@/components/site/Testimonials';
import PackageDetailModal from '@/components/site/PackageDetailModal';

const spiritualPackagesData = [
  {
    id: 'chardham',
    category: 'spiritual',
    title: 'Char Dham Yatra & Haridwar Special',
    duration: '10 Days / 9 Nights',
    destinations: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
    badge: 'VIP Darshan & Helicopter Assist',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Complete Himalayan circuit with 2x2 BharatBenz AC Pushback transit, verified warm Himalayan stays, hot Satvik meals, and medical oxygen kit onboard.',
    highlights: ['Deluxe Stays', 'Pure Satvik Food', 'Har Ki Pauri Aarti', 'Helicopter Pass Assistance'],
    price: '₹24,499'
  },
  {
    id: 'kashi-ayodhya',
    category: 'spiritual',
    title: 'Ayodhya Shri Ram Mandir & Kashi Corridor',
    duration: '4 Days / 3 Nights',
    destinations: 'Ayodhya • Varanasi • Prayagraj Sangam',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_10.jpg',
    badge: 'Ram Lalla & Kashi Corridor Pass',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Experience grand Ram Mandir darshan in Ayodhya, holy Triveni Sangam snan in Prayagraj, and private reserved boat for evening Varanasi Ganga Aarti.',
    highlights: ['3★ AC Hotel', 'Ganga Boat Included', 'Sugam Darshan Entry', 'Banarasi Pure Veg Thali'],
    price: '₹6,499'
  },
  {
    id: 'tirupati-south',
    category: 'spiritual',
    title: 'Tirupati Balaji & Meenakshi Amman',
    duration: '5 Days / 4 Nights',
    destinations: 'Tirupati • Madurai • Rameshwaram',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_11.jpg',
    badge: '₹300 Seeghra Darshan & Laddu Prasadam',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Pre-booked Tirumala special entry darshan, tonsure assistance, holy snan at 22 teerthams of Rameshwaram, and Madurai Meenakshi temple guide.',
    highlights: ['VIP Laddu Combo', 'Uphill AC Transit', '22 Teertham Snan', 'Banana Leaf Satvik Meals'],
    price: '₹8,950'
  },
  {
    id: 'maharashtra-5jyotirlinga',
    category: 'spiritual',
    title: 'Maharashtra 5 Jyotirlinga Darshan Circuit',
    duration: '7 Days / 6 Nights',
    destinations: 'Trimbak • Bhimashankar • Grishneshwar • Aundha • Parli',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_6.jpg',
    badge: 'Complete Maharashtra Shiv Teerth',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Holy circumambulation covering all five sacred Jyotirlingas in Maharashtra with Shirdi Sai Baba darshan included. Pre-booked Rudrabhishek slots.',
    highlights: ['Direct AC Sleeper', 'Pundit Escort', 'VIP Rudrabhishek', 'Shirdi Sai Darshan'],
    price: '₹11,499'
  }
];

const internationalPackagesData = [
  {
    id: 'dubai-marina',
    category: 'international',
    title: 'Dubai Desert Safari & Marina Skyline',
    duration: '5 Days / 4 Nights',
    destinations: 'Dubai • Abu Dhabi • Desert Safari',
    image: '/images/vedbus_international_holiday_travel_packages_1.jpg',
    badge: '4-Star Marina Hotel & Visa Included',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Bask in luxury with Burj Khalifa 124th floor entry, 4x4 Dune Bashing, BBQ Desert Camp with Tanoura Show, and Dhow Cruise Marina Dinner.',
    highlights: ['Burj Khalifa 124th Floor', 'Dhow Dinner Cruise', '4x4 Desert Safari', 'Instant Express eVisa'],
    price: '₹48,999'
  },
  {
    id: 'singapore-malaysia',
    category: 'international',
    title: 'Singapore Gardens & Genting Highlands',
    duration: '7 Days / 6 Nights',
    destinations: 'Singapore • Kuala Lumpur • Genting Highlands',
    image: '/images/vedbus_international_holiday_travel_packages_2.jpg',
    badge: 'Universal Studios & Cable Car Pass',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Thrilling dual-country expedition featuring Universal Studios Singapore, Gardens by the Bay, Night Safari, Batu Caves, and Genting Cable Car.',
    highlights: ['Universal Studios Pass', 'Gardens by the Bay', 'Genting Cable Car', 'Dual Country Transfers'],
    price: '₹62,500'
  },
  {
    id: 'thailand-phuket',
    category: 'international',
    title: 'Thailand Phuket & Krabi Beach Getaway',
    duration: '6 Days / 5 Nights',
    destinations: 'Phuket • Phi Phi Islands • Krabi 4-Islands',
    image: '/images/vedbus_international_holiday_travel_packages_3.jpg',
    badge: 'Speedboat Island Hopping & Coral Reefs',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Tropical getaway to Phi Phi Islands by speedboat, Maya Bay snorkeling, James Bond Island tour, beachfront pool resort, and authentic Thai dining.',
    highlights: ['Phi Phi Speedboat Tour', 'James Bond Island', 'Beachfront Resort', 'Coral Snorkeling'],
    price: '₹38,999'
  },
  {
    id: 'europe-classic',
    category: 'international',
    title: 'Swiss Alps & Paris Eiffel Highlights',
    duration: '8 Days / 7 Nights',
    destinations: 'Paris • Zurich • Lucerne • Mt. Titlis',
    image: '/images/vedbus_international_holiday_travel_packages_4.jpg',
    badge: 'Eiffel Tower Pass & Mt. Titlis Cable Car',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Romantic European dream journey combining Paris Eiffel Tower 2nd level, Seine river cruise, Mount Titlis revolving cable car, and Lucerne lake tour.',
    highlights: ['Eiffel Tower Entry', 'Mt. Titlis Cable Car', 'Lucerne Lake Cruise', 'Schengen Visa Escort'],
    price: '₹1,24,999'
  }
];

const domesticPackagesData = [
  {
    id: 'himachal-manali',
    category: 'domestic',
    title: 'Himachal Manali & Solang Valley Snow Special',
    duration: '5 Days / 4 Nights',
    destinations: 'Shimla • Kullu • Manali • Solang Valley',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_4.jpg',
    badge: 'Atal Tunnel & Snow Activity Pass',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Snowy Himalayan retreat with Volvo AC sleeper Delhi-Manali transit, Solang Valley sports pass, Atal Tunnel excursion, and bonfire night dinner.',
    highlights: ['Atal Tunnel Tour', 'Solang Snow Sports', 'Delhi-Manali Volvo', 'Valley View Resort'],
    price: '₹9,499'
  },
  {
    id: 'kerala-backwaters',
    category: 'domestic',
    title: 'Kerala Munnar Tea Hills & Alleppey Houseboat',
    duration: '6 Days / 5 Nights',
    destinations: 'Kochi • Munnar • Thekkady • Alleppey',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_5.jpg',
    badge: 'Private Deluxe Houseboat & All Meals',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'God’s Own Country experience featuring Munnar tea garden estate stays, spice plantation walk, Periyar jungle safari, and private Alleppey houseboat cruise.',
    highlights: ['Private Houseboat', 'Munnar Tea Estate', 'Spice Garden Pass', 'Authentic Karimeen Meals'],
    price: '₹13,850'
  },
  {
    id: 'goa-coastal',
    category: 'domestic',
    title: 'Goa Coastal Beaches & Mandovi Sunset Cruise',
    duration: '4 Days / 3 Nights',
    destinations: 'North Goa • South Goa • Dudhsagar Waterfalls',
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_7.jpg',
    badge: 'Beach Resort & Mandovi Cruise Pass',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Sun, sand & sea getaway with Calangute beach resort stay, Dudhsagar waterfall jeep safari, Old Goa churches tour, and Mandovi river sunset cruise with DJ.',
    highlights: ['Pool Beach Resort', 'Mandovi DJ Cruise', 'Dudhsagar Jeep Safari', 'Scooter Rental Discount'],
    price: '₹7,999'
  },
  {
    id: 'kashmir-gulmarg',
    category: 'domestic',
    title: 'Kashmir Paradise Valley & Gulmarg Gondola',
    duration: '6 Days / 5 Nights',
    destinations: 'Srinagar • Gulmarg • Pahalgam • Sonmarg',
    image: '/images/vedbus_india_local_holiday_travel_packages_1.jpg',
    badge: 'Luxury Dal Lake Houseboat Stay',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Heaven on Earth journey with Shikara rides on Dal Lake, Phase 1 & 2 Gondola ride in snow-clad Gulmarg, and Betaab Valley pony rides.',
    highlights: ['Dal Lake Shikara', 'Gulmarg Gondola Ride', 'Pahalgam Betaab Valley', 'Carved Cedar Houseboat'],
    price: '₹14,999'
  }
];

export default function CuratedPackagesMasterPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [scrollScale, setScrollScale] = useState(1);
  const [textY, setTextY] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const calculatedScale = 1 + Math.min(Math.max(scrollY, 0) / 800, 1) * 0.25;
          const calculatedY = Math.min(Math.max(scrollY, 0) * 0.35, 150);
          const calculatedOpacity = Math.max(1 - Math.max(scrollY, 0) / 550, 0);

          setScrollScale(calculatedScale);
          setTextY(calculatedY);
          setTextOpacity(calculatedOpacity);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenDetails = (pkg) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  const matchesSearch = (pkg) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(q) ||
      pkg.destinations.toLowerCase().includes(q) ||
      pkg.description.toLowerCase().includes(q)
    );
  };

  const filteredSpiritual = spiritualPackagesData.filter(matchesSearch);
  const filteredInternational = internationalPackagesData.filter(matchesSearch);
  const filteredDomestic = domesticPackagesData.filter(matchesSearch);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* HERO MASTER BANNER - STICKY WITH SCROLL ZOOM & PARALLAX */}
      <div className="relative bg-slate-950 text-white pt-10 pb-20 sm:pt-12 sm:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden min-h-screen flex items-center justify-center sticky top-0 z-0">
        {/* HERO BACKGROUND IMAGE WITH SCROLL SCALE ZOOM */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            alt="VedBus Curated Travel Highway Banner"
            src="/images/screen.png"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-brand-scarlet/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div
          className="max-w-[1800px] w-full mx-auto relative z-10 text-center"
          style={{
            transform: `translateY(${isLoaded ? textY * 0.8 - 70 : -70}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out'
          }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 font-bold text-xs uppercase tracking-wider mb-3 sm:mb-4 border border-white/15 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">explore</span>
            VedBus Curated Travel Portal
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-3 sm:mb-4 max-w-4xl mx-auto leading-tight">
            Explore All Curated Travel Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium mb-6 sm:mb-8">
            Discover divine spiritual teerthams, luxurious international holidays, and breathtaking Indian domestic retreats with guaranteed bus connectivity & transparent pricing.
          </p>

          {/* SEARCH & FILTER CONTROLS - REFINED SLEEK SIZE */}
          <div className="max-w-3xl sm:max-w-[820px] mx-auto bg-white/10 backdrop-blur-2xl p-1.5 sm:p-2 rounded-2xl md:rounded-full border border-white/20 shadow-xl flex flex-col md:flex-row items-center gap-1.5 sm:gap-2">
            <div className="flex-1 flex items-center bg-white/15 rounded-xl md:rounded-full px-4 py-2.5 sm:py-2.5 w-full border border-white/15 text-white">
              <span className="material-symbols-outlined text-amber-300 mr-2.5 text-[21px] shrink-0">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination (e.g. Kedarnath, Dubai, Manali)..."
                className="w-full bg-transparent text-white font-medium text-xs sm:text-sm placeholder-white/60 outline-none p-0 border-0 focus:ring-0 leading-normal"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-white/70 hover:text-white text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-all shrink-0 ml-1.5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* TAB SELECTOR CHIPS */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 px-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 sm:py-2.5 rounded-lg md:rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-brand-scarlet text-white shadow-md shadow-red-600/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Packages
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('spiritual')}
                className={`px-4 py-2 sm:py-2.5 rounded-lg md:rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'spiritual'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Spiritual
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('international')}
                className={`px-4 py-2 sm:py-2.5 rounded-lg md:rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'international'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                International
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('domestic')}
                className={`px-4 py-2 sm:py-2.5 rounded-lg md:rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'domestic'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                India Local
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CATALOG CONTENT - OVERLAPPING SHEET EFFECT */}
      <main className="relative z-10 bg-slate-50 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4rem] shadow-[0_-25px_60px_rgba(15,23,42,0.35)] border-t border-slate-200/80 -mt-12 sm:-mt-16 pt-10 sm:pt-14 pb-16 w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-16">
        
        {/* SECTION 1: SPIRITUAL YATRAS */}
        {(activeTab === 'all' || activeTab === 'spiritual') && (
          <section id="spiritualSection" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200/80 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                  <span className="material-symbols-outlined text-[16px]">temple_hindu</span>
                  Sacred Devsthans & Teerthams
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Spiritual Yatras & Darshan Circuits
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                  12 Jyotirlinga, Char Dham, Shirdi Sai Baba, and Ayodhya Ram Mandir packages with VIP Darshan passes & Satvik meals.
                </p>
              </div>

              <Link
                href="/spiritual"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wide shadow-md transition-all shrink-0 self-start sm:self-auto hover:scale-105"
              >
                <span>View All Spiritual Packages</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {filteredSpiritual.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 font-medium">
                No spiritual packages match &quot;{searchQuery}&quot;. Try a different search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSpiritual.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => handleOpenDetails(pkg)}>
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />
                      <div className="absolute top-3.5 left-3.5 right-3.5 text-[11px] font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-1">
                        {pkg.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-amber-400/30 shadow-md">
                        {pkg.duration}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1 line-clamp-1">
                          📍 {pkg.destinations}
                        </p>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Starting From</span>
                          <span className="text-lg font-extrabold text-amber-700">{pkg.price}</span>
                          <span className="text-[10px] text-slate-500 font-medium"> / person</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(pkg)}
                            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition-colors"
                          >
                            Details
                          </button>
                          <Link
                            href={`/customize-package/${pkg.id}`}
                            className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm"
                          >
                            Customize
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION 2: INTERNATIONAL PACKAGES */}
        {(activeTab === 'all' || activeTab === 'international') && (
          <section id="internationalSection" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-teal-200/80 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 mb-2">
                  <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
                  Overseas Escapes & Holidays
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  International Travel Packages
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                  Dubai, Singapore, Malaysia, Thailand, Bali, and Europe holidays with flight, visa assistance, and luxury stays.
                </p>
              </div>

              <Link
                href="/international"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs tracking-wide shadow-md transition-all shrink-0 self-start sm:self-auto hover:scale-105"
              >
                <span>View All International Packages</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {filteredInternational.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 font-medium">
                No international packages match &quot;{searchQuery}&quot;. Try a different search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredInternational.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl border border-teal-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => handleOpenDetails(pkg)}>
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />
                      <div className="absolute top-3.5 left-3.5 right-3.5 text-[11px] font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-1">
                        {pkg.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 font-bold text-xs border border-teal-400/30 shadow-md">
                        {pkg.duration}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1 line-clamp-1">
                          📍 {pkg.destinations}
                        </p>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Starting From</span>
                          <span className="text-lg font-extrabold text-teal-700">{pkg.price}</span>
                          <span className="text-[10px] text-slate-500 font-medium"> / person</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(pkg)}
                            className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors"
                          >
                            Details
                          </button>
                          <Link
                            href={`/customize-package/${pkg.id}`}
                            className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm"
                          >
                            Customize
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: DOMESTIC PACKAGES */}
        {(activeTab === 'all' || activeTab === 'domestic') && (
          <section id="domesticSection" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-200/80 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  <span className="material-symbols-outlined text-[16px]">landscape</span>
                  Domestic Retreats & Circuits
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Domestic Holiday Packages
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                  Himachal snow peaks, Kerala emerald backwaters, Goa beach resorts, and Kashmir valley packages with direct bus transit.
                </p>
              </div>

              <Link
                href="/domestic"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md transition-all shrink-0 self-start sm:self-auto hover:scale-105"
              >
                <span>View All Domestic Packages</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {filteredDomestic.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 font-medium">
                No domestic packages match &quot;{searchQuery}&quot;. Try a different search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDomestic.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl border border-emerald-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => handleOpenDetails(pkg)}>
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />
                      <div className="absolute top-3.5 left-3.5 right-3.5 text-[11px] font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-1">
                        {pkg.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 font-bold text-xs border border-emerald-400/30 shadow-md">
                        {pkg.duration}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1 line-clamp-1">
                          📍 {pkg.destinations}
                        </p>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Starting From</span>
                          <span className="text-lg font-extrabold text-emerald-700">{pkg.price}</span>
                          <span className="text-[10px] text-slate-500 font-medium"> / person</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(pkg)}
                            className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors"
                          >
                            Details
                          </button>
                          <Link
                            href={`/customize-package/${pkg.id}`}
                            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                          >
                            Customize
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Testimonials />

      {/* PACKAGE DETAIL POPUP MODAL SHEET */}
      <PackageDetailModal
        pkg={selectedPkg}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPkg(null);
        }}
      />

      <Footer />
    </div>
  );
}
