'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

const defaultUpcomingTrips = [
  {
    id: 'YB-994821',
    operator: 'VRL Travels & Logistics',
    busType: 'Volvo B11R Multi-Axle AC Sleeper (2+1)',
    busPlate: 'MH-12-QZ-8812',
    from: 'Nagpur',
    fromStation: 'Dharampeth VedBus Terminal',
    depTime: '20:30',
    depDate: 'Tomorrow, 24 Oct',
    to: 'Pune',
    toStation: 'Swargate Express Terminal',
    arrTime: '07:00',
    arrDate: 'Friday, 25 Oct',
    seats: ['3A', '3B'],
    passengerCount: 2,
    totalFare: 1273,
    driverName: 'Sunil Sharma',
    driverPhone: '+91 98220 11223',
    currentLocation: 'Samruddhi Mahamarg (Km 142)',
    speed: '78 km/h',
    nextStop: 'Jalna Rest Stop (ETA 22:45)',
  },
  {
    id: 'YB-883102',
    operator: 'Hans Travels Devsthan Express',
    busType: 'BharatBenz 2+1 AC Sleeper',
    busPlate: 'UK-07-PA-1008',
    from: 'Delhi',
    fromStation: 'Majnu Ka Tilla Gate 3',
    depTime: '06:00',
    depDate: '15 Nov 2026',
    to: 'Haridwar',
    toStation: 'Har Ki Pauri Yatra Stand',
    arrTime: '11:30',
    arrDate: '15 Nov 2026',
    seats: ['L4'],
    passengerCount: 1,
    totalFare: 850,
    driverName: 'Rajinder Singh',
    driverPhone: '+91 98110 44556',
    currentLocation: 'Delhi Terminal (Scheduled)',
    speed: '0 km/h',
    nextStop: 'Departure in 6 Days',
  },
];

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'wallet' | 'passengers'
  const [selectedTrackBus, setSelectedTrackBus] = useState(null);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [upcomingTrips, setUpcomingTrips] = useState(defaultUpcomingTrips);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('vedbus_user_trips');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const storedIds = new Set(parsed.map(t => t.id));
            const filteredDefaults = defaultUpcomingTrips.filter(t => !storedIds.has(t.id));
            setUpcomingTrips([...parsed, ...filteredDefaults]);
          }
        }
      } catch (err) {
        console.error('Failed to load trips from localStorage:', err);
      }
    }
  }, []);

  const pastTrips = [
    {
      id: 'YB-772019',
      operator: 'Purple Metrolink Luxury Lines',
      from: 'Pune',
      to: 'Mumbai',
      date: '12 Sep 2026',
      seats: '2C, 2D',
      fare: '₹945',
      status: 'Completed',
    },
    {
      id: 'YB-661094',
      operator: 'VedBus Coastal Tours',
      from: 'Mumbai',
      to: 'Goa (Calangute)',
      date: '04 Aug 2026',
      seats: 'L1',
      fare: '₹6,999',
      status: 'Completed',
    },
  ];

  const [savedPassengers, setSavedPassengers] = useState([
    { id: 1, name: 'Rajesh Patel', age: 34, gender: 'Male', relation: 'Self / Primary' },
    { id: 2, name: 'Sneha Patel', age: 31, gender: 'Female', relation: 'Spouse' },
    { id: 3, name: 'Aarav Patel', age: 8, gender: 'Male', relation: 'Son' },
  ]);

  const [selectedPassengerIds, setSelectedPassengerIds] = useState([1, 2]);
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [passengerFormData, setPassengerFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    relation: 'Family',
  });

  const toggleSelectPassenger = (id) => {
    if (selectedPassengerIds.includes(id)) {
      setSelectedPassengerIds(selectedPassengerIds.filter((pId) => pId !== id));
    } else {
      setSelectedPassengerIds([...selectedPassengerIds, id]);
    }
  };

  const handleSelectAllPassengers = () => {
    if (selectedPassengerIds.length === savedPassengers.length && savedPassengers.length > 0) {
      setSelectedPassengerIds([]);
    } else {
      setSelectedPassengerIds(savedPassengers.map((p) => p.id));
    }
  };

  const openAddPassengerModal = () => {
    setEditingPassenger(null);
    setPassengerFormData({ name: '', age: '', gender: 'Male', relation: 'Family' });
    setIsPassengerModalOpen(true);
  };

  const openEditPassengerModal = (passenger) => {
    setEditingPassenger(passenger);
    setPassengerFormData({
      name: passenger.name,
      age: passenger.age.toString(),
      gender: passenger.gender,
      relation: passenger.relation,
    });
    setIsPassengerModalOpen(true);
  };

  const openEditSelectedPassengerModal = () => {
    const selectedId = selectedPassengerIds[0];
    const passenger = savedPassengers.find((p) => p.id === selectedId) || savedPassengers[0];
    if (passenger) {
      openEditPassengerModal(passenger);
    }
  };

  const handleDeleteSelectedPassenger = () => {
    if (selectedPassengerIds.length === 0) return;
    setSavedPassengers(savedPassengers.filter((p) => !selectedPassengerIds.includes(p.id)));
    setSelectedPassengerIds([]);
  };

  const handleDeletePassenger = (id) => {
    setSavedPassengers(savedPassengers.filter((p) => p.id !== id));
    setSelectedPassengerIds(selectedPassengerIds.filter((pId) => pId !== id));
  };

  const handleSavePassenger = (e) => {
    e.preventDefault();
    if (!passengerFormData.name.trim() || !passengerFormData.age) return;

    if (editingPassenger) {
      setSavedPassengers(
        savedPassengers.map((p) =>
          p.id === editingPassenger.id
            ? {
                ...p,
                name: passengerFormData.name.trim(),
                age: parseInt(passengerFormData.age, 10),
                gender: passengerFormData.gender,
                relation: passengerFormData.relation.trim(),
              }
            : p
        )
      );
    } else {
      const newId = Date.now();
      const newPassenger = {
        id: newId,
        name: passengerFormData.name.trim(),
        age: parseInt(passengerFormData.age, 10),
        gender: passengerFormData.gender,
        relation: passengerFormData.relation.trim() || 'Traveler',
      };
      setSavedPassengers([...savedPassengers, newPassenger]);
      setSelectedPassengerIds([...selectedPassengerIds, newId]);
    }
    setIsPassengerModalOpen(false);
  };

  const openGpsTracker = (trip) => {
    setSelectedTrackBus(trip);
    setIsGpsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* USER PROFILE HEADER BANNER WITH COMPACT CROPPED PROFILE BG */}
      <div className="relative bg-slate-900 text-slate-900 overflow-hidden shadow-sm">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/profile_bg.webp"
            alt="Profile Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/45 to-transparent pointer-events-none" />
        </div>

        {/* MAIN BANNER CONTAINER - REDUCED HEIGHT & PADDING */}
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-5 sm:py-6 lg:py-7 relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* LEFT COLUMN: AVATAR & USER DETAILS */}
          <div className="flex items-center gap-3.5 sm:gap-5 pl-2 sm:pl-4 lg:pl-6">
            <div className="relative shrink-0">
              <img
                src="/images/avatar.png"
                alt="Rajesh Patel Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
            </div>

            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-slate-950 tracking-tight">
                  Rajesh Patel
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-950 font-extrabold text-[11px] border border-amber-300 shadow-sm flex items-center gap-1 whitespace-nowrap">
                  ⭐ VIP Club Member
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-700">
                rajesh.patel@gmail.com <span className="mx-1 font-normal text-slate-400">|</span> +91 98765 43210
              </p>

              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-0.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-600 fill-1">verified</span>
                <span>Verified VedBus Account (Assigned Plate Priority)</span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => alert('Edit Profile modal opening...')}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-sm border border-slate-200 transition-all cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[14px] text-slate-600">edit</span>
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: SMALLER SLOGAN WITH RED UNDERLINE */}
          <div className="hidden xl:flex flex-col items-center justify-center text-center px-2">
            <span className="font-serif italic text-base sm:text-lg lg:text-xl font-bold text-slate-800 leading-snug drop-shadow-sm transform -rotate-1">
              New Destinations<br />Same You<br />
              <span className="relative inline-block text-slate-900 font-extrabold">
                Just Happier
                <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-red-600" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </div>

          {/* RIGHT COLUMN: 2 COMPACT FROSTED STATS CARDS */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Card 1: Upcoming Trips */}
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md hover:shadow-lg transition-all cursor-pointer text-left group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">confirmation_number</span>
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  UPCOMING TRIPS
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                  {upcomingTrips.length} Bookings
                </span>
              </div>
              <span className="material-symbols-outlined text-red-500 text-sm group-hover:translate-x-0.5 transition-transform ml-0.5">
                chevron_right
              </span>
            </button>

            {/* Card 2: Yatra Wallet */}
            <button
              type="button"
              onClick={() => setActiveTab('wallet')}
              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md hover:shadow-lg transition-all cursor-pointer text-left group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">account_balance_wallet</span>
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  YATRA WALLET
                </span>
                <span className="text-xs sm:text-sm font-black text-red-600 block leading-tight">
                  ₹1,450
                </span>
              </div>
              <span className="material-symbols-outlined text-red-500 text-sm group-hover:translate-x-0.5 transition-transform ml-0.5">
                chevron_right
              </span>
            </button>
          </div>

        </div>

        {/* BOTTOM OVERLAPPING TAB SWITCHER CAPSULE SHEET */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 relative z-20 pb-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-1.5 border border-slate-200/80 shadow-lg flex items-center justify-between overflow-x-auto no-scrollbar gap-1 sm:gap-2">
            {[
              { label: `Upcoming Trips (${upcomingTrips.length})`, key: 'upcoming', icon: 'confirmation_number' },
              { label: 'Past Journeys & Reviews', key: 'past', icon: 'history' },
              { label: 'Yatra Wallet & Points', key: 'wallet', icon: 'account_balance_wallet' },
              { label: `Saved Passengers (${savedPassengers.length})`, key: 'passengers', icon: 'group' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 min-w-[150px] sm:min-w-0 py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl sm:rounded-full font-bold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-brand-scarlet text-white shadow-md shadow-red-600/30'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8">
        
        {/* TAB 1: UPCOMING TRIPS WITH ASSIGNED BUS PLATE & LIVE GPS TRACKING */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">Your Upcoming Confirmed Bookings</h2>
              <span className="text-xs text-slate-500 font-medium">Assigned Bus Plates Locked</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {upcomingTrips.map((trip) => {
                if (trip.isPackage) {
                  const isSpiritual = trip.category?.toLowerCase().includes('spiritual') || trip.category?.toLowerCase().includes('pilgrimage');
                  return (
                    <div
                      key={trip.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      {/* TOP HEADER BAND */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                              isSpiritual
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-teal-100 text-teal-800 border-teal-300'
                            }`}>
                              {isSpiritual ? '🛕 DEVSTHAN PILGRIMAGE CIRCUIT' : '🏖️ CURATED HOLIDAY PACKAGE'}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-500">#{trip.bookingId || trip.id}</span>
                          </div>
                          <h3 className="text-lg font-serif font-bold text-slate-900">{trip.title}</h3>
                          <p className="text-xs text-slate-500 font-semibold">{trip.subtitle || trip.category}</p>
                        </div>

                        {/* CATEGORY DURATION PILL */}
                        <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center gap-3 shadow-md shrink-0">
                          <span className="material-symbols-outlined text-[24px] text-amber-400">
                            {isSpiritual ? 'temple_hindu' : 'luggage'}
                          </span>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                              TOUR DURATION
                            </span>
                            <span className="text-sm font-extrabold text-amber-300">
                              {trip.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* PACKAGE DETAILS & CUSTOMIZATION SNAPSHOT */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
                        {/* Package Thumbnail & Dates */}
                        <div className="md:col-span-4 flex items-center gap-3">
                          {trip.image && (
                            <img
                              src={trip.image}
                              alt={trip.title}
                              className="w-20 h-20 rounded-2xl object-cover shadow-sm border border-slate-200 shrink-0"
                            />
                          )}
                          <div className="space-y-1">
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Departure Date</span>
                            <div className="text-sm font-bold text-slate-900">{trip.date || trip.departureDate || 'Scheduled in 7 Days'}</div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              <span className="material-symbols-outlined text-[13px]">check_circle</span>
                              Voucher Active
                            </span>
                          </div>
                        </div>

                        {/* Custom Inclusions / Upgrades */}
                        <div className="md:col-span-5 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-brand-scarlet">hotel</span>
                            <span>Stay: <strong>{trip.hotelTier === '5star' ? '5★ Luxury Resort' : trip.hotelTier === '4star' ? '4★ Deluxe Resort' : '3★ Standard Hotel'}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-brand-scarlet">directions_bus</span>
                            <span>Vehicle: <strong>{trip.transportMode === 'private-suv' ? 'Private Innova Crysta SUV' : trip.transportMode === 'private-sedan' ? 'Private AC Sedan' : 'BharatBenz AC Pushback Coach'}</strong></span>
                          </div>
                          {trip.selectedAddons && trip.selectedAddons.length > 0 && (
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-amber-600">tune</span>
                              <span>Add-ons: <strong>{trip.selectedAddons.map(a => a.label).join(', ')}</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Price & Travelers */}
                        <div className="md:col-span-3 text-left md:text-right space-y-1">
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                            {trip.travelerCount || (trip.travelers && trip.travelers.length) || 1} Traveler(s)
                          </span>
                          <div className="text-xl font-black text-slate-900">
                            ₹{(trip.totalAmount || trip.paidAmount || 0).toLocaleString('en-IN')}
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Fully Paid
                          </span>
                        </div>
                      </div>

                      {/* BOTTOM ACTION BUTTONS */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                          <span>Instant Confirmation • All-Inclusive Guide &amp; Permits</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/customize-package/${trip.pkgId || 'chardham'}`}
                            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">tune</span>
                            <span>View / Re-Customize</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => alert(`Downloading Tour PDF Voucher & Itinerary for #${trip.bookingId || trip.id}...`)}
                            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            <span>Tour Voucher</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const shareText = `🎉 VedBus Confirmed Package #${trip.bookingId || trip.id}\nPackage: ${trip.title}\nDuration: ${trip.duration}\nHotel: ${trip.hotelTier === '5star' ? '5★ Luxury' : trip.hotelTier === '4star' ? '4★ Deluxe' : '3★ Standard'}\nAmount: ₹${(trip.totalAmount || trip.paidAmount || 0).toLocaleString('en-IN')}`;
                              if (typeof navigator !== 'undefined' && navigator.share) {
                                navigator.share({
                                  title: `VedBus Package #${trip.bookingId || trip.id}`,
                                  text: shareText,
                                  url: typeof window !== 'undefined' ? window.location.origin + '/packages' : '',
                                }).catch(() => {});
                              } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                                navigator.clipboard.writeText(shareText);
                                alert('Tour package details copied to clipboard!');
                              } else {
                                alert(shareText);
                              }
                            }}
                            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-scarlet hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
                            title="Share Tour Package"
                          >
                            <span className="material-symbols-outlined text-[18px]">share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  {/* TOP HEADER BAND */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                          CONFIRMED TICKET
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">#{trip.id}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900">{trip.operator}</h3>
                      <p className="text-xs text-slate-500">{trip.busType}</p>
                    </div>

                    {/* ASSIGNED BUS PLATE HIGHLIGHT BADGE */}
                    <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center gap-3 shadow-md shrink-0">
                      <span className="material-symbols-outlined text-[24px] text-amber-400">directions_bus</span>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                          ASSIGNED BUS REGISTRATION
                        </span>
                        <span className="text-base font-mono font-extrabold text-amber-300">
                          {trip.busPlate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ROUTE TIMELINE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2">
                    
                    {/* Departure */}
                    <div className="md:col-span-4 space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Boarding</span>
                      <div className="text-2xl font-black text-slate-900">{trip.depTime}</div>
                      <div className="text-xs font-bold text-slate-800">{trip.from}</div>
                      <div className="text-[11px] text-slate-500">{trip.fromStation}</div>
                      <div className="text-xs font-semibold text-brand-scarlet">{trip.depDate}</div>
                    </div>

                    {/* Duration / Arrow */}
                    <div className="md:col-span-4 text-center space-y-1">
                      <span className="text-xs text-slate-400 font-bold block">Assigned Seats</span>
                      <div className="inline-block px-3 py-1 rounded-xl bg-red-50 text-brand-scarlet font-extrabold text-sm border border-red-200">
                        Seats {trip.seats.join(', ')}
                      </div>
                      <div className="w-full h-0.5 bg-slate-200 my-2 relative">
                        <span className="material-symbols-outlined text-brand-scarlet text-[16px] absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1">
                          directions_bus
                        </span>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="md:col-span-4 text-left md:text-right space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Dropping</span>
                      <div className="text-2xl font-black text-slate-900">{trip.arrTime}</div>
                      <div className="text-xs font-bold text-slate-800">{trip.to}</div>
                      <div className="text-[11px] text-slate-500">{trip.toStation}</div>
                      <div className="text-xs font-semibold text-slate-600">{trip.arrDate}</div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">person</span>
                      <span>Driver: <strong>{trip.driverName}</strong> ({trip.driverPhone})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/track-bus/${trip.id}`}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">my_location</span>
                        <span>Live GPS Bus Tracking</span>
                      </Link>

                      <button
                        onClick={() => alert(`Downloading PDF Ticket for #${trip.id}...`)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span>PDF Ticket</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const shareText = `🎟️ VedBus Confirmed Ticket #${trip.id}\nRoute: ${trip.from} ➔ ${trip.to}\nDate: ${trip.depDate}\nSeats: ${trip.seats.join(', ')}\nBus Plate: ${trip.busPlate}`;
                          const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/track-bus/${trip.id}` : '';
                          if (typeof navigator !== 'undefined' && navigator.share) {
                            navigator.share({
                              title: `VedBus Ticket #${trip.id}`,
                              text: shareText,
                              url: shareUrl,
                            }).catch(() => {});
                          } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                            navigator.clipboard.writeText(`${shareText}\nTrack: ${shareUrl}`);
                            alert('Ticket details copied to clipboard!');
                          } else {
                            alert(shareText);
                          }
                        }}
                        className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-scarlet hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
                        title="Share Ticket"
                      >
                        <span className="material-symbols-outlined text-[18px]">share</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* TAB 2: PAST JOURNEYS */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">Past Completed Trips</h2>
            <div className="space-y-3">
              {pastTrips.map(trip => (
                <div key={trip.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ticket #{trip.id} • {trip.date}</span>
                    <h3 className="text-base font-serif font-bold text-slate-900 mt-0.5">{trip.from} ➔ {trip.to}</h3>
                    <p className="text-xs text-slate-500">{trip.operator} • Seats {trip.seats}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">{trip.fare}</span>
                    <button
                      onClick={() => alert(`Directing to re-book ${trip.from} to ${trip.to}...`)}
                      className="px-4 py-2 rounded-xl bg-brand-scarlet text-white font-bold text-xs shadow-sm hover:bg-brand-hover transition-all"
                    >
                      Book Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: YATRA WALLET */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex justify-between items-center shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Available Wallet Balance</span>
                <span className="text-3xl font-extrabold text-amber-400">₹1,450</span>
                <p className="text-xs text-slate-300 mt-1">Use 100% wallet balance on any bus ticket or Devsthan package booking.</p>
              </div>
              <button
                onClick={() => alert('Add Money functionality coming soon!')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                + Add Money
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SAVED PASSENGERS */}
        {activeTab === 'passengers' && (
          <div className="space-y-4 w-full">
            {/* Top Action Header Bar (Full Width matching section above) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 w-full">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900">Saved Passenger Profiles</h2>
                <p className="text-xs text-slate-500">Select a traveler to edit or delete details, or add new passenger profiles.</p>
              </div>

              {/* Action Buttons Group */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllPassengers}
                  disabled={savedPassengers.length === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {selectedPassengerIds.length === savedPassengers.length && savedPassengers.length > 0 ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>{selectedPassengerIds.length === savedPassengers.length && savedPassengers.length > 0 ? 'Deselect All' : 'Select All'}</span>
                </button>

                <button
                  type="button"
                  onClick={openAddPassengerModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs transition-all shadow-md shadow-red-600/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>+ Add New Passenger</span>
                </button>

                <button
                  type="button"
                  onClick={openEditSelectedPassengerModal}
                  disabled={savedPassengers.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  <span>Edit Passenger</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeleteSelectedPassenger}
                  disabled={savedPassengers.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  <span>Delete Passenger</span>
                </button>
              </div>
            </div>

            {/* Adjusted Width Passenger Cards List (Max Width 1090px - ~75% of Edit Passenger button) */}
            <div className="flex flex-col space-y-3 pt-2 max-w-6xl ml-3 sm:ml-4">
              {savedPassengers.length === 0 ? (
                <div className="w-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500 text-sm">
                  No saved passengers found. Click <strong>+ Add New Passenger</strong> to save details.
                </div>
              ) : (
                savedPassengers.map((p) => {
                  const isSelected = selectedPassengerIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleSelectPassenger(p.id)}
                      className={`w-full bg-white rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-brand-scarlet ring-2 ring-brand-scarlet/20 shadow-md bg-red-50/10'
                          : 'border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'border-brand-scarlet bg-brand-scarlet text-white' : 'border-slate-300 bg-slate-50'
                          }`}
                        >
                          {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                        </div>

                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
                          <span className="material-symbols-outlined text-[22px]">
                            {p.gender === 'Female' ? 'woman' : 'man'}
                          </span>
                        </div>

                        {/* Passenger Info */}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-brand-scarlet text-[10px] font-bold uppercase tracking-wider border border-red-100">
                              {p.relation}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-500">
                            {p.gender} • {p.age} Years Old • ID Verified
                          </p>
                        </div>
                      </div>

                      {/* Right Side Actions: Edit & Delete buttons first, Rightmost "Click to Select" / "Selected" Badge */}
                      <div className="flex items-center gap-2.5 sm:self-center self-end pl-11 sm:pl-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditPassengerModal(p);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                          title="Edit Passenger"
                        >
                          <span className="material-symbols-outlined text-[15px]">edit</span>
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePassenger(p.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 font-bold text-xs transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                          title="Delete Passenger"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                          <span>Delete</span>
                        </button>

                        <span
                          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-brand-scarlet text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Click to Select'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>

      {/* SIMULATED LIVE GPS BUS TRACKING MODAL */}
      {isGpsModalOpen && selectedTrackBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 text-white border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  🟢 LIVE GPS BUS FEED
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {selectedTrackBus.operator} ({selectedTrackBus.busPlate})
                </h3>
              </div>
              <button
                onClick={() => setIsGpsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* SIMULATED GPS RADAR MAP CONTAINER */}
            <div className="relative h-64 w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Grid Background Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              {/* Highway Path Animation */}
              <div className="w-3/4 h-1 bg-slate-800 relative rounded-full">
                <div className="w-1/2 h-full bg-emerald-500 rounded-full"></div>
                
                {/* Animated Bus Icon Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse">
                  <span className="material-symbols-outlined text-[20px]">directions_bus</span>
                </div>
              </div>

              {/* Status Overlay Box */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">CURRENT LOCATION</span>
                  <span className="font-bold text-white">{selectedTrackBus.currentLocation}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">CURRENT SPEED</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedTrackBus.speed}</span>
                </div>
              </div>
            </div>

            {/* DRIVER CONTACT & NEXT STOP */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">DRIVER ON DUTY</span>
                <span className="font-bold text-white text-sm">{selectedTrackBus.driverName}</span>
                <span className="text-slate-400 block text-[11px]">{selectedTrackBus.driverPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedTrackBus.driverPhone}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Call Driver</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PASSENGER MODAL */}
      {isPassengerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl space-y-5 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {editingPassenger ? 'Edit Passenger Details' : 'Add New Passenger'}
              </h3>
              <button
                onClick={() => setIsPassengerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSavePassenger} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={passengerFormData.name}
                  onChange={(e) => setPassengerFormData({ ...passengerFormData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-scarlet focus:ring-2 focus:ring-brand-scarlet/20 text-sm font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={passengerFormData.age}
                    onChange={(e) => setPassengerFormData({ ...passengerFormData, age: e.target.value })}
                    placeholder="e.g. 35"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-scarlet focus:ring-2 focus:ring-brand-scarlet/20 text-sm font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Gender *
                  </label>
                  <select
                    value={passengerFormData.gender}
                    onChange={(e) => setPassengerFormData({ ...passengerFormData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-scarlet focus:ring-2 focus:ring-brand-scarlet/20 text-sm font-semibold outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Relation / Tag *
                </label>
                <input
                  type="text"
                  required
                  value={passengerFormData.relation}
                  onChange={(e) => setPassengerFormData({ ...passengerFormData, relation: e.target.value })}
                  placeholder="e.g. Self, Spouse, Father, Friend"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-scarlet focus:ring-2 focus:ring-brand-scarlet/20 text-sm font-semibold outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPassengerModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs tracking-wide uppercase transition-all shadow-md shadow-red-600/20"
                >
                  {editingPassenger ? 'Save Changes' : 'Add Passenger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
