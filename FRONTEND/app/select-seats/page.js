'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

// Simulated Bus Layout Data for 2+2 Executive Seater (Matching Reference Image Layout)
const seater2x2Seats = [
  // Row 1
  { id: '1A', name: '1A', row: 1, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '1B', name: '1B', row: 1, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '1C', name: '1C', row: 1, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '1D', name: '1D', row: 1, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },

  // Row 2
  { id: '2A', name: '2A', row: 2, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '2B', name: '2B', row: 2, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '2C', name: '2C', row: 2, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '2D', name: '2D', row: 2, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },

  // Row 3 (Pre-selected green like image preview)
  { id: '3A', name: '3A', row: 3, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '3B', name: '3B', row: 3, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '3C', name: '3C', row: 3, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '3D', name: '3D', row: 3, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },

  // Row 4
  { id: '4A', name: '4A', row: 4, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '4B', name: '4B', row: 4, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '4C', name: '4C', row: 4, col: 3, side: 'right', price: 450, status: 'booked', isWindow: false, isSolo: false },
  { id: '4D', name: '4D', row: 4, col: 4, side: 'right', price: 450, status: 'booked', isWindow: true, isSolo: true },

  // Row 5
  { id: '5A', name: '5A', row: 5, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '5B', name: '5B', row: 5, col: 2, side: 'left', price: 450, status: 'female', isWindow: false, isSolo: false },
  { id: '5C', name: '5C', row: 5, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '5D', name: '5D', row: 5, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },

  // Row 6
  { id: '6A', name: '6A', row: 6, col: 1, side: 'left', price: 450, status: 'female', isWindow: true, isSolo: true },
  { id: '6B', name: '6B', row: 6, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '6C', name: '6C', row: 6, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '6D', name: '6D', row: 6, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },

  // Row 7
  { id: '7A', name: '7A', row: 7, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '7B', name: '7B', row: 7, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '7C', name: '7C', row: 7, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '7D', name: '7D', row: 7, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },

  // Row 8
  { id: '8A', name: '8A', row: 8, col: 1, side: 'left', price: 450, status: 'available', isWindow: true, isSolo: true },
  { id: '8B', name: '8B', row: 8, col: 2, side: 'left', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '8C', name: '8C', row: 8, col: 3, side: 'right', price: 450, status: 'available', isWindow: false, isSolo: false },
  { id: '8D', name: '8D', row: 8, col: 4, side: 'right', price: 450, status: 'available', isWindow: true, isSolo: true },
];

const sleeperLowerDeck = [
  { id: 'L1', name: 'L1', row: 1, col: 1, side: 'left', price: 1299, status: 'available', isWindow: true, isSolo: true },
  { id: 'L2', name: 'L2', row: 2, col: 1, side: 'left', price: 1299, status: 'booked', isWindow: true, isSolo: true },
  { id: 'L3', name: 'L3', row: 3, col: 1, side: 'left', price: 1299, status: 'female', isWindow: true, isSolo: true },
  { id: 'L4', name: 'L4', row: 4, col: 1, side: 'left', price: 1299, status: 'available', isWindow: true, isSolo: true },
  { id: 'L5', name: 'L5', row: 5, col: 1, side: 'left', price: 1299, status: 'available', isWindow: true, isSolo: true },
  { id: 'L6', name: 'L6', row: 1, col: 3, side: 'right', price: 1199, status: 'available', isWindow: false, isSolo: false },
  { id: 'L7', name: 'L7', row: 1, col: 4, side: 'right', price: 1199, status: 'available', isWindow: true, isSolo: true },
  { id: 'L8', name: 'L8', row: 2, col: 3, side: 'right', price: 1199, status: 'booked', isWindow: false, isSolo: false },
  { id: 'L9', name: 'L9', row: 2, col: 4, side: 'right', price: 1199, status: 'booked', isWindow: true, isSolo: true },
  { id: 'L10', name: 'L10', row: 3, col: 3, side: 'right', price: 1199, status: 'available', isWindow: false, isSolo: false },
  { id: 'L11', name: 'L11', row: 3, col: 4, side: 'right', price: 1199, status: 'female', isWindow: true, isSolo: true },
  { id: 'L12', name: 'L12', row: 4, col: 3, side: 'right', price: 1199, status: 'available', isWindow: false, isSolo: false },
  { id: 'L13', name: 'L13', row: 4, col: 4, side: 'right', price: 1199, status: 'available', isWindow: true, isSolo: true },
  { id: 'L14', name: 'L14', row: 5, col: 3, side: 'right', price: 1199, status: 'available', isWindow: false, isSolo: false },
  { id: 'L15', name: 'L15', row: 5, col: 4, side: 'right', price: 1199, status: 'available', isWindow: true, isSolo: true },
];

const sleeperUpperDeck = [
  { id: 'U1', name: 'U1', row: 1, col: 1, side: 'left', price: 1399, status: 'available', isWindow: true, isSolo: true },
  { id: 'U2', name: 'U2', row: 2, col: 1, side: 'left', price: 1399, status: 'female', isWindow: true, isSolo: true },
  { id: 'U3', name: 'U3', row: 3, col: 1, side: 'left', price: 1399, status: 'available', isWindow: true, isSolo: true },
  { id: 'U4', name: 'U4', row: 4, col: 1, side: 'left', price: 1399, status: 'available', isWindow: true, isSolo: true },
  { id: 'U5', name: 'U5', row: 5, col: 1, side: 'left', price: 1399, status: 'booked', isWindow: true, isSolo: true },
  { id: 'U6', name: 'U6', row: 1, col: 3, side: 'right', price: 1299, status: 'available', isWindow: false, isSolo: false },
  { id: 'U7', name: 'U7', row: 1, col: 4, side: 'right', price: 1299, status: 'available', isWindow: true, isSolo: true },
  { id: 'U8', name: 'U8', row: 2, col: 3, side: 'right', price: 1299, status: 'available', isWindow: false, isSolo: false },
  { id: 'U9', name: 'U9', row: 2, col: 4, side: 'right', price: 1299, status: 'booked', isWindow: true, isSolo: true },
  { id: 'U10', name: 'U10', row: 3, col: 3, side: 'right', price: 1299, status: 'female', isWindow: false, isSolo: false },
  { id: 'U11', name: 'U11', row: 3, col: 4, side: 'right', price: 1299, status: 'female', isWindow: true, isSolo: true },
  { id: 'U12', name: 'U12', row: 4, col: 3, side: 'right', price: 1299, status: 'available', isWindow: false, isSolo: false },
  { id: 'U13', name: 'U13', row: 4, col: 4, side: 'right', price: 1299, status: 'available', isWindow: true, isSolo: true },
  { id: 'U14', name: 'U14', row: 5, col: 3, side: 'right', price: 1299, status: 'available', isWindow: false, isSolo: false },
  { id: 'U15', name: 'U15', row: 5, col: 4, side: 'right', price: 1299, status: 'available', isWindow: true, isSolo: true },
];

const boardingPointsData = [
  { id: 'b1', location: 'Dharampeth - VedBus Terminal', time: '20:30' },
  { id: 'b2', location: 'Chatrapati Sq - Flyover Gate', time: '20:50' },
  { id: 'b3', location: 'Wadi - National Highway Junction', time: '21:15' },
];

const droppingPointsData = [
  { id: 'd1', location: 'Viman Nagar - Hyatt Regency Stop', time: '06:15' },
  { id: 'd2', location: 'Wakad Bridge - Ginger Hotel', time: '06:45' },
  { id: 'd3', location: 'Swargate - VedBus Express Bay', time: '07:00' },
];

function CinemaSeatBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const busInfo = {
    id: searchParams.get('busId') || '1',
    operator: searchParams.get('operator') || 'VRL Travels & Logistics',
    busPlate: searchParams.get('busPlate') || 'MH-31-AP-4921',
    busType: searchParams.get('busType') || 'BharatBenz AC Sleeper (2+1)',
    category: searchParams.get('category') || 'sleeper',
    price: parseInt(searchParams.get('price')) || 850,
    from: searchParams.get('from') || 'Nagpur',
    to: searchParams.get('to') || 'Pune',
    date: searchParams.get('date') || 'Tomorrow, 24 Oct',
    depTime: searchParams.get('depTime') || '20:30',
    arrTime: searchParams.get('arrTime') || '07:00',
    depLocation: searchParams.get('depLocation') || 'Dharampeth, Nagpur',
    arrLocation: searchParams.get('arrLocation') || 'Wakad, Pune',
  };

  const isSleeper = busInfo.category === 'sleeper';
  const [layoutMode, setLayoutMode] = useState(isSleeper ? 'sleeper' : 'seater');
  const [sleeperDeck, setSleeperDeck] = useState('lower');
  const [filterLadiesOnly, setFilterLadiesOnly] = useState(false);
  const [filterSoloWindow, setFilterSoloWindow] = useState(false);

  // Pre-select first available seats based on bus type
  const [selectedSeats, setSelectedSeats] = useState(
    isSleeper
      ? [sleeperLowerDeck.find(s => s.id === 'L1') || sleeperLowerDeck[0]]
      : [seater2x2Seats.find(s => s.id === '3A') || seater2x2Seats[0]]
  );

  const [boardingPoint, setBoardingPoint] = useState({
    id: 'b1',
    location: `${busInfo.depLocation} - VedBus Terminal`,
    time: busInfo.depTime,
  });
  const [droppingPoint, setDroppingPoint] = useState({
    id: 'd1',
    location: `${busInfo.arrLocation} - VedBus Drop Bay`,
    time: busInfo.arrTime,
  });

  const seatsData =
    layoutMode === 'seater'
      ? seater2x2Seats
      : sleeperDeck === 'lower'
      ? sleeperLowerDeck
      : sleeperUpperDeck;

  const toggleSeatSelection = (seat) => {
    if (seat.status === 'booked') return;
    if (selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatSelected = (seatId) => selectedSeats.some(s => s.id === seatId);

  const calculateSubtotal = () => selectedSeats.reduce((acc, s) => acc + (s?.price || 0), 0);
  const taxes = selectedSeats.length > 0 ? Math.round(calculateSubtotal() * 0.05) : 0;
  const totalAmount = calculateSubtotal() + taxes;

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) return;
    const bookingPayload = {
      busId: busInfo.id,
      operator: busInfo.operator,
      busPlate: busInfo.busPlate,
      busType: busInfo.busType,
      category: layoutMode,
      from: busInfo.from,
      to: busInfo.to,
      date: busInfo.date,
      depTime: busInfo.depTime,
      arrTime: busInfo.arrTime,
      depLocation: busInfo.depLocation,
      arrLocation: busInfo.arrLocation,
      boardingPoint: boardingPoint,
      droppingPoint: droppingPoint,
      selectedSeats: selectedSeats.map(s => ({ id: s.id, name: s.name, price: s.price, isWindow: s.isWindow })),
      baseFare: calculateSubtotal(),
      taxes: taxes,
      totalAmount: totalAmount,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('vedbus_pending_booking', JSON.stringify(bookingPayload));
    }
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* LIGHT THEME TOP ROUTE HEADER BAR */}
      <div className="bg-white border-b border-slate-200/90 shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-18 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/search?from=${encodeURIComponent(busInfo.from)}&to=${encodeURIComponent(busInfo.to)}&date=${encodeURIComponent(busInfo.date)}`}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-brand-scarlet border border-slate-200 flex items-center justify-center transition-all shadow-sm"
              title="Back to Bus Search"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-extrabold text-brand-scarlet uppercase tracking-widest">{busInfo.from} ⇄ {busInfo.to}</span>
                <span className="text-xs text-slate-400">• {busInfo.date}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>{busInfo.operator} ({busInfo.busType})</span>
                <span className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {busInfo.busPlate}
                </span>
              </h1>
            </div>
          </div>

          {/* TRUST BADGES & NO SURCHARGE TAG */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200/80 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Assigned Bus Plate</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
              <span className="material-symbols-outlined text-[16px]">money_off</span>
              <span>0% Aggregator Markup</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SEAT SELECTION ARENA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT & CENTER: BUS FLOOR PLAN LAYOUT MATCHING EXACT USER ATTACHED IMAGE */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col items-center">
          
          {/* LAYOUT MODE SWITCHER (2+2 SEATER vs 2+1 SLEEPER) */}
          <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-6 w-full max-w-md">
            <button
              onClick={() => {
                setLayoutMode('seater');
                setSelectedSeats([
                  seater2x2Seats.find(s => s.id === '3A'),
                  seater2x2Seats.find(s => s.id === '3B'),
                  seater2x2Seats.find(s => s.id === '4A'),
                ]);
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                layoutMode === 'seater'
                  ? 'bg-brand-scarlet text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">event_seat</span>
              <span>2+2 Seater Deck</span>
            </button>

            <button
              onClick={() => {
                setLayoutMode('sleeper');
                setSelectedSeats([]);
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                layoutMode === 'sleeper'
                  ? 'bg-brand-scarlet text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">single_bed</span>
              <span>2+1 Sleeper Deck</span>
            </button>
          </div>

          {/* SLEEPER SUB-DECK TAB SELECTOR (LOWER DECK VS UPPER DECK) */}
          {layoutMode === 'sleeper' && (
            <div className="flex items-center gap-3 mb-6 p-1 bg-slate-50 rounded-xl border border-slate-200">
              <button
                onClick={() => setSleeperDeck('lower')}
                className={`px-5 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                  sleeperDeck === 'lower'
                    ? 'bg-slate-900 text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                <span>Lower Deck (L1 - L15)</span>
              </button>

              <button
                onClick={() => setSleeperDeck('upper')}
                className={`px-5 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                  sleeperDeck === 'upper'
                    ? 'bg-slate-900 text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                <span>Upper Deck (U1 - U15)</span>
              </button>
            </div>
          )}

          {/* SEAT LOCK QUICK FILTERS (LADIES-ONLY & SOLO WINDOW SEATS) */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <button
              onClick={() => setFilterLadiesOnly(!filterLadiesOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                filterLadiesOnly
                  ? 'bg-pink-500 text-white border-pink-600 shadow-md shadow-pink-500/20'
                  : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
              }`}
            >
              <span>♀️</span>
              <span>{filterLadiesOnly ? 'Showing Ladies Seats Only' : 'Highlight Ladies Reserved Seats'}</span>
            </button>

            <button
              onClick={() => setFilterSoloWindow(!filterSoloWindow)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                filterSoloWindow
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">window</span>
              <span>{filterSoloWindow ? 'Showing Solo Window Seats Only' : 'Highlight Solo Window Seats'}</span>
            </button>
          </div>

          {/* LIGHT THEME SEAT LEGEND BAR */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700 mb-8 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 w-full">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-white border-2 border-slate-300 shadow-sm inline-block"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-500 border-2 border-emerald-600 shadow-md inline-block"></span>
              <span className="text-emerald-900 font-bold">Selected (Green)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-pink-100 border-2 border-pink-400 text-pink-700 flex items-center justify-center text-[10px] font-bold">♀</span>
              <span className="text-pink-900 font-bold">Ladies Reserved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-200 border-2 border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-bold">✕</span>
              <span>Booked</span>
            </div>
          </div>

          {/* BUS CONTAINER CARD WITH DRIVER STEERING WHEEL AT TOP RIGHT EXACTLY LIKE IMAGE */}
          <div className="w-full max-w-md bg-white rounded-[2.5rem] p-6 border-2 border-slate-300 shadow-lg relative">
            
            {/* DRIVER STEERING WHEEL ANCHOR AT TOP RIGHT */}
            <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-dashed border-slate-200">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">meeting_room</span>
                <span>ENTRY GATE</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">DRIVER</span>
                <span className="material-symbols-outlined text-[24px] text-slate-900">directions_bus</span>
              </div>
            </div>

            {/* SEAT GRID matching 2 + 2 Layout from Reference Image */}
            <div className="space-y-3.5 relative">
              
              {/* VERTICAL GANGWAY AISLE RUNNING DOWN THE CENTER */}
              <div className="absolute left-[45%] top-0 bottom-0 w-8 border-x border-dashed border-slate-200 flex items-center justify-center pointer-events-none">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-300 -rotate-90">
                  AISLE
                </span>
              </div>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((rowNum) => {
                if (layoutMode === 'seater') {
                  const s1 = seatsData.find(s => s.row === rowNum && s.col === 1);
                  const s2 = seatsData.find(s => s.row === rowNum && s.col === 2);
                  const s3 = seatsData.find(s => s.row === rowNum && s.col === 3);
                  const s4 = seatsData.find(s => s.row === rowNum && s.col === 4);

                  return (
                    <div key={rowNum} className="flex items-center justify-between gap-2">
                      {/* LEFT 2 COLUMNS */}
                      <div className="flex items-center gap-2.5 w-[42%]">
                        {s1 && renderSeaterCard(s1)}
                        {s2 && renderSeaterCard(s2)}
                      </div>

                      {/* AISLE GAP */}
                      <div className="w-8 text-center text-[10px] text-slate-400 font-mono font-bold">
                        R{rowNum}
                      </div>

                      {/* RIGHT 2 COLUMNS */}
                      <div className="flex items-center gap-2.5 w-[42%]">
                        {s3 && renderSeaterCard(s3)}
                        {s4 && renderSeaterCard(s4)}
                      </div>
                    </div>
                  );
                } else {
                  // SLEEPER LAYOUT
                  if (rowNum > 5) return null;
                  const single = seatsData.find(s => s.row === rowNum && s.col === 1);
                  const d1 = seatsData.find(s => s.row === rowNum && s.col === 3);
                  const d2 = seatsData.find(s => s.row === rowNum && s.col === 4);

                  return (
                    <div key={rowNum} className="flex items-center justify-between gap-2">
                      <div className="w-[30%]">
                        {single && renderSleeperCard(single)}
                      </div>
                      <div className="w-8 text-center text-[10px] text-slate-400 font-mono font-bold">
                        {sleeperDeck === 'lower' ? 'L' : 'U'}{rowNum}
                      </div>
                      <div className="flex items-center gap-2 w-[55%]">
                        {d1 && renderSleeperCard(d1)}
                        {d2 && renderSleeperCard(d2)}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LIGHT THEME BOOKING DOCK */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* BOARDING & DROPPING POINT PICKER */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-brand-scarlet">pin_drop</span>
              <span>Boarding &amp; Dropping Points</span>
            </h3>

            {/* Boarding Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Boarding Point (Nagpur)</label>
              <select
                value={boardingPoint.id}
                onChange={(e) => setBoardingPoint(boardingPointsData.find(b => b.id === e.target.value))}
                className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 text-xs font-bold focus:border-brand-scarlet outline-none"
              >
                {boardingPointsData.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.time} — {b.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropping Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Dropping Point (Pune)</label>
              <select
                value={droppingPoint.id}
                onChange={(e) => setDroppingPoint(droppingPointsData.find(d => d.id === e.target.value))}
                className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 text-xs font-bold focus:border-brand-scarlet outline-none"
              >
                {droppingPointsData.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.time} — {d.location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SELECTED SEATS & FARE SUMMARY DOCK */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">Selected Seats</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-200">
                {selectedSeats.length} Seats
              </span>
            </div>

            {/* Selected Seats Badges */}
            {selectedSeats.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                Tap on any available seat in the bus layout to reserve.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <div key={seat?.id} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <span>Seat {seat?.name}</span>
                    <button onClick={() => toggleSeatSelection(seat)} className="text-emerald-700 hover:text-emerald-950 font-extrabold">✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100 text-slate-600">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span className="font-bold text-slate-900">₹{calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-900">₹{taxes}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>VedBus Markup</span>
                <span>₹0 (FREE)</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-lg font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span className="text-brand-scarlet">₹{totalAmount}</span>
              </div>
            </div>

            {/* PROCEED TO CHECKOUT BUTTON */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                selectedSeats.length > 0
                  ? 'bg-brand-scarlet hover:bg-brand-hover text-white cursor-pointer shadow-red-600/20 active:scale-[0.99]'
                  : 'bg-slate-200 text-slate-400 pointer-events-none'
              }`}
            >
              <span>PROCEED TO CHECKOUT ({selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'})</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );

  // RENDER SEATER SEAT CARD (Matching exact graphic in reference image)
  function renderSeaterCard(seat) {
    const selected = isSeatSelected(seat.id);
    const isBooked = seat.status === 'booked';
    const isFemale = seat.status === 'female';
    const isSoloWindow = seat.isSolo && filterSoloWindow;
    const isHighlightedFemale = filterLadiesOnly && isFemale;

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isBooked}
        onClick={() => toggleSeatSelection(seat)}
        title={`Seat ${seat.name} - ₹${seat.price} ${isFemale ? '(Booked by Female)' : ''}`}
        className={`w-full h-14 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center relative shadow-sm ${
          selected
            ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/30 scale-105 z-10'
            : isBooked
            ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
            : isFemale
            ? 'bg-pink-100 text-pink-900 border-pink-400 hover:border-pink-500 font-bold'
            : isSoloWindow
            ? 'bg-emerald-50 text-emerald-900 border-emerald-400 ring-2 ring-emerald-400 animate-pulse'
            : isHighlightedFemale
            ? 'bg-pink-200 text-pink-900 border-pink-500 ring-2 ring-pink-400'
            : 'bg-white text-slate-800 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50'
        }`}
      >
        {/* SEAT CHAIR BACKREST ACCENT GRAPHIC */}
        <div className={`w-3/4 h-1.5 rounded-t-md mb-1 ${
          selected ? 'bg-white/40' : isBooked ? 'bg-slate-300' : isFemale ? 'bg-pink-300' : 'bg-slate-200'
        }`}></div>

        <span className="text-xs font-extrabold leading-none flex items-center gap-0.5">
          {isFemale && <span className="text-[10px]">♀</span>}
          {seat.name}
        </span>
        
        {/* SIDE ARMREST ACCENTS */}
        <div className={`absolute top-2 left-0.5 bottom-2 w-1 rounded-r-sm ${selected ? 'bg-emerald-600' : isFemale ? 'bg-pink-300' : 'bg-slate-200'}`}></div>
        <div className={`absolute top-2 right-0.5 bottom-2 w-1 rounded-l-sm ${selected ? 'bg-emerald-600' : isFemale ? 'bg-pink-300' : 'bg-slate-200'}`}></div>
      </button>
    );
  }

  // RENDER SLEEPER BERTH CARD
  function renderSleeperCard(seat) {
    const selected = isSeatSelected(seat.id);
    const isBooked = seat.status === 'booked';
    const isFemale = seat.status === 'female';
    const isSoloWindow = seat.isSolo && filterSoloWindow;
    const isHighlightedFemale = filterLadiesOnly && isFemale;

    return (
      <button
        key={seat.id}
        type="button"
        disabled={isBooked}
        onClick={() => toggleSeatSelection(seat)}
        className={`w-full h-16 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between p-2 text-left relative ${
          selected
            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 z-10'
            : isBooked
            ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
            : isFemale
            ? 'bg-pink-100 text-pink-900 border-pink-400 font-bold'
            : isSoloWindow
            ? 'bg-emerald-50 text-emerald-900 border-emerald-400 ring-2 ring-emerald-400 animate-pulse'
            : isHighlightedFemale
            ? 'bg-pink-200 text-pink-900 border-pink-500 ring-2 ring-pink-400'
            : 'bg-white text-slate-800 border-slate-300 hover:border-emerald-500'
        }`}
      >
        <div className={`h-2.5 w-full rounded-md ${selected ? 'bg-white/40' : isFemale ? 'bg-pink-300' : 'bg-slate-200'}`}></div>
        <div className="flex items-center justify-between text-[11px] font-extrabold mt-1">
          <span className="flex items-center gap-0.5">
            {isFemale && <span className="text-[10px]">♀</span>}
            {seat.name}
          </span>
          <span>₹{seat.price}</span>
        </div>
      </button>
    );
  }
}

export default function CinemaSeatBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-brand-scarlet border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-slate-700">Loading Bus Layout...</p>
          </div>
        </div>
      }
    >
      <CinemaSeatBookingContent />
    </Suspense>
  );
}

