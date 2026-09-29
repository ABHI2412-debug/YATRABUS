'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function CheckoutPage() {
  const [bookingData, setBookingData] = useState(null);
  const [passengers, setPassengers] = useState([
    { seat: '3A', name: 'Rajesh Patel', age: '34', gender: 'male' },
    { seat: '3B', name: 'Sneha Patel', age: '31', gender: 'female' },
  ]);

  const [contactEmail, setContactEmail] = useState('rajesh.patel@gmail.com');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [whatsappSync, setWhatsappSync] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeCabPickup, setIncludeCabPickup] = useState(false);
  const [includeSatvikMeal, setIncludeSatvikMeal] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState('YB-994821');
  const [shareToast, setShareToast] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vedbus_pending_booking');
        if (saved) {
          const parsed = JSON.parse(saved);
          setBookingData(parsed);
          if (parsed.selectedSeats && parsed.selectedSeats.length > 0) {
            setPassengers(
              parsed.selectedSeats.map((s, idx) => ({
                seat: s.name,
                name: idx === 0 ? 'Rajesh Patel' : '',
                age: idx === 0 ? '34' : '',
                gender: idx === 0 ? 'male' : 'female',
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to load pending booking:', err);
      }
    }
  }, []);

  const baseFare = bookingData?.baseFare || 900;
  const insuranceCost = includeInsurance ? 15 * passengers.length : 0;
  const cabCost = includeCabPickup ? 199 : 0;
  const mealCost = includeSatvikMeal ? 149 * passengers.length : 0;
  const subtotal = baseFare + insuranceCost + cabCost + mealCost;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + taxes;

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    const newId = `YB-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedTicketId(newId);

    if (typeof window !== 'undefined') {
      const newTrip = {
        id: newId,
        operator: bookingData?.operator || 'VRL Travels Express',
        busType: bookingData?.busType || 'Volvo B11R AC Sleeper',
        busPlate: bookingData?.busPlate || 'MH-12-QZ-8812',
        from: bookingData?.from || 'Nagpur',
        fromStation: bookingData?.boardingPoint?.location || 'Dharampeth VedBus Terminal',
        depTime: bookingData?.depTime || '20:30',
        depDate: bookingData?.date || 'Tomorrow, 24 Oct',
        to: bookingData?.to || 'Pune',
        toStation: bookingData?.droppingPoint?.location || 'Swargate Express Terminal',
        arrTime: bookingData?.arrTime || '07:00',
        arrDate: 'Next Day',
        seats: passengers.map(p => p.seat),
        passengerCount: passengers.length,
        passengers: passengers,
        totalFare: grandTotal,
        driverName: 'Sunil Sharma',
        driverPhone: '+91 98220 11223',
        currentLocation: 'Terminal Bay (Scheduled)',
        speed: '0 km/h',
        nextStop: 'Departure Scheduled',
        status: 'Confirmed',
        bookedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('vedbus_user_trips') || '[]');
        localStorage.setItem('vedbus_user_trips', JSON.stringify([newTrip, ...existing]));
      } catch (err) {
        console.error('Failed to save trip to localStorage:', err);
      }
    }

    setIsSuccessModalOpen(true);
  };

  const handleShareTicket = async () => {
    const routeTitle = `${bookingData?.from || 'Nagpur'} ➔ ${bookingData?.to || 'Pune'}`;
    const seatList = passengers.map(p => p.seat).join(', ');
    const shareText = `🎟️ VedBus Boarding Pass #${createdTicketId}\nRoute: ${routeTitle}\nDate: ${bookingData?.date || 'Tomorrow, 24 Oct'}\nSeats: ${seatList}\nBus: ${bookingData?.busPlate || 'MH-12-QZ-8812'} (${bookingData?.operator || 'VRL Travels Express'})\nTotal Paid: ₹${grandTotal}`;
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/track-bus/${createdTicketId}` : '';

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `VedBus Ticket #${createdTicketId}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User dismissed share dialog
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${shareText}\nTrack: ${shareUrl}`);
        setShareToast('Ticket details copied to clipboard!');
        setTimeout(() => setShareToast(''), 3000);
      } catch (err) {
        alert(shareText);
      }
    } else {
      alert(shareText);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      {/* TOP STEPPER HEADER */}
      <div className="bg-white border-b border-slate-200/90 shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-18 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/select-seats"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-brand-scarlet border border-slate-200 flex items-center justify-center transition-all shadow-sm"
              title="Back to Seat Picker"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-lg font-serif font-bold text-slate-900">Checkout &amp; Booking Confirmation</h1>
              <p className="text-xs text-slate-500">
                {bookingData?.from || 'Nagpur'} ➔ {bookingData?.to || 'Pune'} • {bookingData?.busType || 'Volvo B11R AC'} ({bookingData?.busPlate || 'MH-12-QZ-8812'})
              </p>
            </div>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              ✓ Seats Selected ({passengers.map(p => p.seat).join(', ')})
            </span>
            <span className="text-slate-300">➔</span>
            <span className="px-3 py-1 rounded-full bg-brand-scarlet text-white shadow-sm">
              Passenger &amp; Payment
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CHECKOUT ARENA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PASSENGER FORM, ADDONS, PAYMENT */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* JOURNEY SNAPSHOT BANNER */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-extrabold text-brand-scarlet uppercase tracking-wider">
                  {bookingData?.operator || 'VRL Travels Express'}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono font-bold">
                  {bookingData?.busPlate || 'MH-12-QZ-8812'}
                </span>
              </div>
              <div className="text-base font-serif font-bold text-slate-900">
                {bookingData?.from || 'Nagpur'} ({bookingData?.depTime || '20:30'}, {bookingData?.boardingPoint?.location || 'Dharampeth'}) ➔ {bookingData?.to || 'Pune'} ({bookingData?.arrTime || '07:00'}, {bookingData?.droppingPoint?.location || 'Swargate'})
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {bookingData?.date || 'Thursday, 24 Oct'} • Reserved Seats: <strong className="text-slate-900">{passengers.map(p => p.seat).join(', ')}</strong>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shrink-0 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
              <span>0% Aggregator Markup Guarantee</span>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-brand-scarlet">contact_mail</span>
              <span>Contact Information (For Ticket &amp; WhatsApp Sync)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 text-xs font-bold focus:border-brand-scarlet outline-none"
                  placeholder="your.name@gmail.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Mobile Number (WhatsApp)</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 text-xs font-bold focus:border-brand-scarlet outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappSync}
                onChange={(e) => setWhatsappSync(e.target.checked)}
                className="w-4 h-4 rounded text-brand-scarlet focus:ring-brand-scarlet"
              />
              <span>Send instant WhatsApp PDF ticket &amp; .ics calendar invite to this mobile number</span>
            </label>
          </div>

          {/* PASSENGER DETAILS FORM */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-brand-scarlet">group</span>
                <span>Passenger Details</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  const autofilled = passengers.map((p, i) => {
                    if (i === 0) return { ...p, name: 'Rajesh Patel', age: '34', gender: 'male' };
                    if (i === 1) return { ...p, name: 'Sneha Patel', age: '31', gender: 'female' };
                    return { ...p, name: `Traveler ${i + 1}`, age: '28', gender: 'male' };
                  });
                  setPassengers(autofilled);
                }}
                className="text-[11px] font-bold text-brand-scarlet hover:underline cursor-pointer"
              >
                Autofill Saved Profile
              </button>
            </div>

            <div className="space-y-4">
              {passengers.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-brand-scarlet bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      Passenger {idx + 1} — Seat {p.seat}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {idx === 0 ? 'Primary Traveler' : 'Co-Traveler'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-6 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                        className="w-full bg-white text-slate-900 rounded-xl px-3 py-2 border border-slate-200 text-xs font-bold outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Age</label>
                      <input
                        type="number"
                        value={p.age}
                        onChange={(e) => updatePassenger(idx, 'age', e.target.value)}
                        className="w-full bg-white text-slate-900 rounded-xl px-3 py-2 border border-slate-200 text-xs font-bold outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Gender</label>
                      <select
                        value={p.gender}
                        onChange={(e) => updatePassenger(idx, 'gender', e.target.value)}
                        className="w-full bg-white text-slate-900 rounded-xl px-3 py-2 border border-slate-200 text-xs font-bold outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ADD-ON SERVICES SELECTION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-brand-scarlet">extension</span>
              <span>Enhance Your Journey (Add-ons)</span>
            </h3>

            <div className="space-y-3">
              {/* Insurance */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-scarlet transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-brand-scarlet focus:ring-brand-scarlet"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">🛡️ Travel Insurance Protection</span>
                    <span className="text-xs font-bold text-brand-scarlet">+₹15 / person</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Covers accidental medical expenses up to ₹5,00,000 &amp; lost baggage assistance during journey.
                  </p>
                </div>
              </label>

              {/* Satvik Meal Box */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-scarlet transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSatvikMeal}
                  onChange={(e) => setIncludeSatvikMeal(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-brand-scarlet focus:ring-brand-scarlet"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">🍱 Hot Pure Satvik Dinner Box</span>
                    <span className="text-xs font-bold text-brand-scarlet">+₹149 / meal</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Fresh 100% Satvik veg dinner (paneer sabzi, roti, rice, sweet) delivered at bus boarding gate.
                  </p>
                </div>
              </label>

              {/* Hotel Pickup Cab */}
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-scarlet transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCabPickup}
                  onChange={(e) => setIncludeCabPickup(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-brand-scarlet focus:ring-brand-scarlet"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">🚕 Doorstep Cab Pickup (Nagpur)</span>
                    <span className="text-xs font-bold text-brand-scarlet">+₹199 total</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Private AC Sedan pick-up from your doorstep in Nagpur directly to Dharampeth boarding terminal.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* PAYMENT METHOD MATRIX */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-brand-scarlet">payments</span>
              <span>Select Payment Method</span>
            </h3>

            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'bg-brand-scarlet text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>⚡ Instant UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'bg-brand-scarlet text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>💳 Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'netbanking'
                    ? 'bg-brand-scarlet text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🏦 NetBanking</span>
              </button>
            </div>

            {/* UPI Simulated Scanner */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-24 h-24 rounded-2xl bg-white p-2 border border-slate-300 shadow-sm shrink-0 flex items-center justify-center">
                  {/* Mock QR graphic */}
                  <div className="w-full h-full bg-slate-900 rounded-lg p-1 text-white font-mono text-[8px] flex items-center justify-center text-center">
                    [ GPay / PhonePe / Paytm QR ]
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Scan &amp; Pay via Any UPI App</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Google Pay, PhonePe, Paytm, or BHIM. Zero processing fee charged.
                  </p>
                  <div className="mt-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                    UPI ID: vedbus@icici
                  </div>
                </div>
              </div>
            )}

            {/* Credit Card Simulated Inputs */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8892"
                    className="w-full bg-white text-slate-900 rounded-xl px-3 py-2 border border-slate-200 text-xs font-bold font-mono outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08 / 28"
                      className="w-full bg-white text-slate-900 rounded-xl px-3 py-2 border border-slate-200 text-xs font-bold font-mono outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">CVV</label>
                    <input
                      type="password"
                      defaultValue="782"
                      className="w-full bg-white text-slate-900 rounded-xl px-3 py-2 border border-slate-200 text-xs font-bold font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NetBanking Bank Selection */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map((bank, i) => (
                  <button
                    key={i}
                    type="button"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-brand-scarlet text-center transition-all"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: FINAL FARE BREAKDOWN & PAY BUTTON */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 sticky top-36">
            <h3 className="text-base font-serif font-bold text-slate-900 pb-3 border-b border-slate-100">
              Fare Breakdown
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Seats Fare ({passengers.length} {passengers.length === 1 ? 'Seat' : 'Seats'})</span>
                <span className="font-bold text-slate-900">₹{baseFare}</span>
              </div>

              {includeInsurance && (
                <div className="flex justify-between">
                  <span>Travel Insurance ({passengers.length}x ₹15)</span>
                  <span className="font-bold text-slate-900">₹{insuranceCost}</span>
                </div>
              )}

              {includeSatvikMeal && (
                <div className="flex justify-between">
                  <span>Pure Satvik Dinner Box ({passengers.length}x ₹149)</span>
                  <span className="font-bold text-slate-900">₹{mealCost}</span>
                </div>
              )}

              {includeCabPickup && (
                <div className="flex justify-between">
                  <span>Doorstep Cab Pickup</span>
                  <span className="font-bold text-slate-900">₹{cabCost}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-bold text-slate-900">₹{taxes}</span>
              </div>

              <div className="flex justify-between text-emerald-700 font-bold">
                <span>VedBus Aggregator Markup</span>
                <span>₹0 (FREE)</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between text-xl font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span className="text-brand-scarlet">₹{grandTotal}</span>
              </div>
            </div>

            {/* CONFIRMATION PAY BUTTON */}
            <button
              onClick={handlePayNow}
              className="w-full py-4 rounded-2xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>PAY ₹{grandTotal} &amp; CONFIRM TICKET</span>
            </button>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              🔒 256-bit SSL Encrypted Transaction. Instant WhatsApp PDF ticket dispatch.
            </div>
          </div>
        </div>
      </main>

      {/* SIMULATED SUCCESS TICKET CONFIRMATION MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center border border-slate-200 shadow-2xl space-y-4">
            
            {/* SUCCESS CHECKMARK ANIMATION */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md animate-bounce">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div>
              <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block">Booking Confirmed!</span>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">Ticket #{createdTicketId} Locked</h2>
              <p className="text-xs text-slate-500 mt-1">
                Your luxury berths <strong>{passengers.map(p => p.seat).join(', ')}</strong> on {bookingData?.busType || 'Volvo B11R AC'} (<strong className="text-slate-800">{bookingData?.busPlate || 'MH-12-QZ-8812'}</strong>) have been reserved.
              </p>
            </div>

            {/* DETAILS BAND */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5 font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Bus Operator:</span>
                <span className="text-slate-900 font-bold">{bookingData?.operator || 'VRL Travels Express'}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Plate:</span>
                <span className="font-mono text-brand-scarlet font-bold">{bookingData?.busPlate || 'MH-12-QZ-8812'}</span>
              </div>
              <div className="flex justify-between">
                <span>Boarding Time:</span>
                <span className="text-slate-900 font-bold">
                  {bookingData?.date || 'Tomorrow'}, {bookingData?.depTime || '20:30'} ({bookingData?.boardingPoint?.location || 'Dharampeth'})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="text-emerald-700 font-extrabold">₹{grandTotal}</span>
              </div>
            </div>

            {shareToast && (
              <div className="py-1 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fadeIn">
                {shareToast}
              </div>
            )}

            {/* DISPATCH & NAVIGATION ACTION BUTTONS */}
            <div className="space-y-2 pt-2">
              <Link
                href="/profile"
                className="w-full py-3 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
                <span>VIEW MY JOURNEYS &amp; TICKETS</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  <span>Go to Home Page</span>
                </Link>

                <Link
                  href={`/track-bus/${createdTicketId}`}
                  className="py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-300 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">my_location</span>
                  <span>Track Bus Live</span>
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-500 font-semibold">
                <button
                  type="button"
                  onClick={handleShareTicket}
                  className="hover:text-brand-scarlet text-slate-700 flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
                  title="Share ticket details"
                >
                  <span className="material-symbols-outlined text-[16px] text-brand-scarlet">share</span>
                  <span>Share Ticket</span>
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => alert('Calendar event (.ics) synced to your device calendar!')}
                  className="hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">calendar_add_on</span>
                  <span>Sync Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
