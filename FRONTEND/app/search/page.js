'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

const popularCities = [
  'Nagpur',
  'Pune',
  'Mumbai',
  'Delhi',
  'Haridwar',
  'Indore',
  'Goa',
  'Shirdi',
  'Bengaluru',
];

const sampleBuses = [
  {
    id: 1,
    operator: 'VRL Travels & Logistics',
    rating: '4.8',
    reviews: '1,420',
    busType: 'BharatBenz AC Sleeper (2+1)',
    busPlate: 'MH-31-AP-4921',
    badge: 'Most Popular',
    depTime: '20:30',
    depLocation: 'Dharampeth, Nagpur',
    duration: '10h 30m',
    arrTime: '07:00',
    arrLocation: 'Wakad, Pune',
    routeVia: 'Samruddhi Mahamarg',
    seatsLeft: 4,
    price: 850,
    category: 'sleeper',
    timeSlot: 'night',
    amenities: ['wifi', 'blanket', 'charging', 'water', 'gps'],
  },
  {
    id: 2,
    operator: 'Purple Metrolink Luxury Lines',
    rating: '4.9',
    reviews: '2,180',
    busType: 'Multi-Axle Volvo B11R AC Seater (2+2)',
    busPlate: 'MH-12-QZ-8812',
    badge: 'High Speed Express',
    depTime: '06:00',
    depLocation: 'Chatrapati Sq, Nagpur',
    duration: '9h 45m',
    arrTime: '15:45',
    arrLocation: 'Swargate, Pune',
    routeVia: 'Expressway Direct',
    seatsLeft: 14,
    price: 450,
    category: 'seater',
    timeSlot: 'morning',
    amenities: ['wifi', 'charging', 'water', 'gps'],
  },
  {
    id: 3,
    operator: 'Orange Tours & Travels',
    rating: '4.7',
    reviews: '950',
    busType: 'Volvo AC Sleeper Multi-Axle (2+1)',
    busPlate: 'MH-14-BT-9900',
    badge: 'Top Safety Rated',
    depTime: '21:15',
    depLocation: 'Wadi Naka, Nagpur',
    duration: '10h 15m',
    arrTime: '07:30',
    arrLocation: 'Viman Nagar, Pune',
    routeVia: 'Samruddhi Mahamarg',
    seatsLeft: 8,
    price: 950,
    category: 'sleeper',
    timeSlot: 'night',
    amenities: ['wifi', 'blanket', 'charging', 'water', 'sos', 'gps'],
  },
  {
    id: 4,
    operator: 'Hans Travels & Devsthan Express',
    rating: '4.6',
    reviews: '670',
    busType: 'BharatBenz Executive AC Seater (2+2)',
    busPlate: 'MH-31-EX-5544',
    badge: 'Budget Choice',
    depTime: '14:00',
    depLocation: 'Dharampeth, Nagpur',
    duration: '10h 00m',
    arrTime: '00:00',
    arrLocation: 'Shivajinagar, Pune',
    routeVia: 'NH-6 Highway',
    seatsLeft: 18,
    price: 599,
    category: 'seater',
    timeSlot: 'afternoon',
    amenities: ['charging', 'water', 'gps'],
  },
  {
    id: 5,
    operator: 'Neeta Tours & Travels',
    rating: '4.8',
    reviews: '1,890',
    busType: 'Scania Metrolink AC Sleeper (2+1)',
    busPlate: 'MH-12-NT-3321',
    badge: 'Premium Comfort',
    depTime: '22:00',
    depLocation: 'Chatrapati Sq, Nagpur',
    duration: '9h 30m',
    arrTime: '07:30',
    arrLocation: 'Wakad Bridge, Pune',
    routeVia: 'Samruddhi Mahamarg',
    seatsLeft: 3,
    price: 1199,
    category: 'sleeper',
    timeSlot: 'night',
    amenities: ['wifi', 'blanket', 'charging', 'water', 'sos', 'gps'],
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialFrom = searchParams.get('from') || 'Nagpur';
  const initialTo = searchParams.get('to') || 'Pune';
  const initialDate = searchParams.get('date') || 'Tomorrow, 24 Oct';

  const [buses, setBuses] = useState(sampleBuses);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('cheapest');

  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [selectedDate, setSelectedDate] = useState({
    mainText: initialDate,
    subText: 'Scheduled Journey',
  });
  const [passengerCount, setPassengerCount] = useState(1);

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    triggerToast(`Swapped: ${toCity} ➔ ${temp}`);
  };

  const handleDateSelect = (dateResult) => {
    setSelectedDate({
      mainText: dateResult.mainText,
      subText: dateResult.subText,
    });
    triggerToast(`Date set to ${dateResult.mainText}`);
  };

  const closeAllDropdowns = () => {
    setIsFromOpen(false);
    setIsToOpen(false);
    setIsDatePickerOpen(false);
    setIsPassengerOpen(false);
  };

  const filteredBuses = buses.filter((bus) => {
    if (selectedTimeSlots.length > 0 && !selectedTimeSlots.includes(bus.timeSlot)) {
      return false;
    }
    if (selectedCategory !== 'all' && bus.category !== selectedCategory) {
      return false;
    }
    if (parseFloat(bus.rating) < minRating) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'departure') return a.depTime.localeCompare(b.depTime);
    return 0;
  });

  const toggleTimeSlot = (slot) => {
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(s => s !== slot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, slot]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />

      <div className="bg-white border-b border-slate-200/90 shadow-sm py-4 px-4 sm:px-6 lg:px-8 sticky top-16 sm:top-18 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsFromOpen(!isFromOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">departure_board</span>
                <span>From: <strong className="text-slate-900">{fromCity}</strong></span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {isFromOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Select Departure City
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1 space-y-0.5">
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setFromCity(city);
                          setIsFromOpen(false);
                          triggerToast(`Origin updated: ${city}`);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          fromCity === city
                            ? 'bg-red-50 text-brand-scarlet'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{city}</span>
                        {fromCity === city && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSwapCities}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 border border-slate-200 text-brand-scarlet flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-sm"
              title="Swap Departure & Destination"
            >
              <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsToOpen(!isToOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">pin_drop</span>
                <span>To: <strong className="text-slate-900">{toCity}</strong></span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {isToOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Select Destination City
                  </div>
                  <div className="max-h-48 overflow-y-auto py-1 space-y-0.5">
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setToCity(city);
                          setIsToOpen(false);
                          triggerToast(`Destination updated: ${city}`);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          toCity === city
                            ? 'bg-red-50 text-brand-scarlet'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{city}</span>
                        {toCity === city && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={`relative ${isDatePickerOpen ? 'z-[9999]' : 'z-10'}`}>
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">calendar_month</span>
                <span>{selectedDate.mainText} <span className="text-slate-400 font-normal">({selectedDate.subText})</span></span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="red"
                position="bottom"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllDropdowns();
                  setIsPassengerOpen(!isPassengerOpen);
                }}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50/50 px-3.5 py-2 rounded-2xl border border-slate-200 hover:border-brand-scarlet text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-brand-scarlet text-[18px]">group</span>
                <span>{passengerCount} {passengerCount === 1 ? 'Passenger' : 'Passengers'}</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
              </button>

              {isPassengerOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Select Passenger Count
                  </div>
                  <div className="py-1 space-y-0.5">
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => {
                          setPassengerCount(count);
                          setIsPassengerOpen(false);
                          triggerToast(`Passengers set to ${count}`);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                          passengerCount === count
                            ? 'bg-red-50 text-brand-scarlet'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{count} {count === 1 ? 'Passenger' : 'Passengers'}</span>
                        {passengerCount === count && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {toastMessage && (
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn">
                ✓ {toastMessage}
              </span>
            )}
            
            <button
              type="button"
              onClick={() => {
                closeAllDropdowns();
                triggerToast(`Buses refreshed for ${fromCity} ➔ ${toCity}`);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span>Update Search</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-brand-scarlet">tune</span>
                <span>Filter Buses</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedTimeSlots([]);
                  setSelectedCategory('all');
                  setMinRating(0);
                }}
                className="text-[11px] font-bold text-slate-400 hover:text-brand-scarlet uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Departure Time
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => toggleTimeSlot('morning')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeSlots.includes('morning')
                      ? 'bg-brand-scarlet text-white border-brand-scarlet shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  ☀️ Morning<br /><span className="text-[10px] opacity-75 font-normal">06:00 - 12:00</span>
                </button>
                <button
                  onClick={() => toggleTimeSlot('afternoon')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeSlots.includes('afternoon')
                      ? 'bg-brand-scarlet text-white border-brand-scarlet shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🌤️ Afternoon<br /><span className="text-[10px] opacity-75 font-normal">12:00 - 18:00</span>
                </button>
                <button
                  onClick={() => toggleTimeSlot('night')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTimeSlots.includes('night')
                      ? 'bg-brand-scarlet text-white border-brand-scarlet shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🌙 Evening/Night<br /><span className="text-[10px] opacity-75 font-normal">18:00 - 24:00</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Bus Type
              </label>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { label: 'All Bus Types', key: 'all' },
                  { label: 'AC Sleeper (2+1)', key: 'sleeper' },
                  { label: 'Volvo Seater (2+2)', key: 'seater' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedCategory(item.key)}
                    className={`w-full py-2 px-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedCategory === item.key
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedCategory === item.key && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Operator Rating
              </label>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { label: 'Any Rating', value: 0 },
                  { label: '4.5★ & Above Top Operators', value: 4.5 },
                  { label: '4.0★ & Above Verified', value: 4.0 },
                ].map(r => (
                  <button
                    key={r.value}
                    onClick={() => setMinRating(r.value)}
                    className={`w-full py-2 px-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      minRating === r.value
                        ? 'bg-amber-500 text-white border-amber-600 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{r.label}</span>
                    {minRating === r.value && <span>★</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>VedBus Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                0% aggregator surcharge markup on all direct fleet tickets with assigned bus plate numbers.
              </p>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-base font-bold text-slate-900 font-serif">
                {filteredBuses.length} Buses Available
              </span>
              <span className="text-xs text-slate-500 block">Nagpur to Pune • Direct Express Fleet</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Sort By:</span>
              {[
                { label: 'Cheapest', key: 'cheapest' },
                { label: 'Top Rated', key: 'rating' },
                { label: 'Departure', key: 'departure' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    sortBy === s.key
                      ? 'bg-brand-scarlet text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredBuses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <span className="material-symbols-outlined text-[48px] text-slate-300">directions_bus</span>
                <h3 className="text-lg font-bold text-slate-800 font-serif">No Buses Match Your Selected Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your departure time slots or rating filters to see more luxury buses.
                </p>
                <button
                  onClick={() => {
                    setSelectedTimeSlots([]);
                    setSelectedCategory('all');
                    setMinRating(0);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-brand-scarlet text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-scarlet transition-colors font-serif">
                          {bus.operator}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200 flex items-center gap-1">
                          <span>★</span> {bus.rating} <span className="text-slate-400 font-normal">({bus.reviews})</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{bus.busType}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-700">
                          {bus.busPlate}
                        </span>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest block">
                        0% Aggregator Surcharge
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-slate-900">₹{bus.price}</span>
                        <span className="text-xs text-slate-400 font-normal">/ seat</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4">
                      <div className="text-xl font-black text-slate-900">{bus.depTime}</div>
                      <div className="text-xs font-bold text-slate-700">{bus.depLocation}</div>
                    </div>

                    <div className="md:col-span-4 text-center">
                      <span className="text-[11px] font-semibold text-slate-400 block">{bus.duration}</span>
                      <div className="w-full h-0.5 bg-slate-200 my-1.5 relative">
                        <span className="material-symbols-outlined text-brand-scarlet text-[16px] absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-1">
                          directions_bus
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Via {bus.routeVia}
                      </span>
                    </div>

                    <div className="md:col-span-4 text-left md:text-right">
                      <div className="text-xl font-black text-slate-900">{bus.arrTime}</div>
                      <div className="text-xs font-bold text-slate-700">{bus.arrLocation}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {bus.amenities.includes('wifi') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-blue-600">wifi</span> High-Speed Wi-Fi
                        </span>
                      )}
                      {bus.amenities.includes('blanket') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-purple-600">bed</span> Blanket &amp; Pillow
                        </span>
                      )}
                      {bus.amenities.includes('charging') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-amber-600">power</span> USB Socket
                        </span>
                      )}
                      {bus.amenities.includes('water') && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-cyan-600">water_drop</span> Mineral Water
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                        {bus.seatsLeft} Seats Left
                      </span>
                      <Link
                        href={`/select-seats?busId=${bus.id}&operator=${encodeURIComponent(bus.operator)}&busPlate=${encodeURIComponent(bus.busPlate)}&busType=${encodeURIComponent(bus.busType)}&price=${bus.price}&category=${bus.category}&from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${encodeURIComponent(selectedDate.mainText)}&depTime=${encodeURIComponent(bus.depTime)}&arrTime=${encodeURIComponent(bus.arrTime)}&depLocation=${encodeURIComponent(bus.depLocation)}&arrLocation=${encodeURIComponent(bus.arrLocation)}`}
                        className="px-5 py-2.5 rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 active:scale-95"
                      >
                        <span>SELECT SEATS</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-brand-scarlet border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-bold text-slate-700">Loading Available Buses...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
