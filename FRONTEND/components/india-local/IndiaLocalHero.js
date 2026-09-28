'use client';

import React, { useState, useEffect } from 'react';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function IndiaLocalHero() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Nov - Dec 2026',
    subText: 'Winter Getaway'
  });
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

  const handleDateSelect = (dateResult) => {
    setSelectedDate({
      mainText: dateResult.mainText,
      subText: dateResult.subText
    });
  };

  return (
    <>
      {/* HERO BANNER */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pb-28 pt-12 sticky top-0 z-0" data-purpose="hero-banner">
        <div className="absolute inset-0 z-0">
          <img
            alt="Breathtaking cinematic travel photography of an iconic Indian coastal temple shore at sunrise"
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
            style={{ transform: `scale(${scrollScale})` }}
            src="/images/vedbus_india_local_holiday_travel_packages_1.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-emerald-900/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div
            style={{
              transform: `translateY(${isLoaded ? textY * 0.7 : 20}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.8s ease-out 0.05s'
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-200 text-xs font-semibold tracking-wider uppercase mb-5 shadow-lg shadow-teal-950/30"
          >
            <span className="text-amber-300 animate-pulse">✨</span> Explore Incredible Bharat • Curated Domestic Getaways
          </div>
          <h1
            style={{
              transform: `translateY(${isLoaded ? textY : 35}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.9s ease-out 0.2s'
            }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-[1.15] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
          >
            Discover India. Unpack Wonders.
            <span className="block italic font-serif font-normal bg-gradient-to-r from-emerald-100 via-teal-200 to-cyan-100 bg-clip-text text-transparent drop-shadow-md mt-1">
              Memories Last Forever.
            </span>
          </h1>
          <p
            style={{
              transform: `translateY(${isLoaded ? textY * 0.85 : 35}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, opacity 0.9s ease-out 0.35s'
            }}
            className="mt-5 text-base sm:text-lg text-slate-200 max-w-3xl font-light leading-relaxed drop-shadow-md"
          >
            Curated domestic holiday packages across coastal retreats, serene backwaters, and misty Himalayan valleys. Direct BharatBenz &amp; Volvo coach transfers, handpicked 4★ &amp; 5★ luxury stays, and regional culinary excellence.
          </p>
          <div
            style={{
              transform: `translateY(${isLoaded ? textY * 0.7 : 35}px)`,
              opacity: isLoaded ? textOpacity : 0,
              transition: isLoaded && textY > 0
                ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
                : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, opacity 0.9s ease-out 0.45s'
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              className="px-7 py-3.5 bg-teal-700 hover:bg-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-teal-700/40 transition duration-200 flex items-center gap-2 text-sm tracking-wide"
              href="#curated-packages"
            >
              Explore Domestic Getaways
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </a>
            <a
              className="px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 transition duration-200 flex items-center gap-2 text-sm"
              href="#how-it-works"
            >
              <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path>
              </svg>
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING SEARCH WIDGET */}
      <div
        style={{
          transform: `translateY(${isLoaded ? 0 : 45}px)`,
          opacity: isLoaded ? 1 : 0,
          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, opacity 1s ease-out 0.55s'
        }}
        className="relative -mt-20 z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-purpose="search-and-fixed-departures"
      >
        <div className="bg-white rounded-2xl shadow-custom-card border border-slate-100 p-4 sm:p-6 lg:p-7 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">📍</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Goa, Kerala, Himachal, Kashmir..."
                />
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">🚌</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Departure From</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="Mumbai, Pune, Delhi, Bangalore..."
                />
              </div>
            </div>

            {/* DATE PICKER TRIGGER WITH FLOATING SPEECH BUBBLE */}
            <div
              className={`relative border border-slate-200 hover:border-teal-600 rounded-xl p-3 transition flex items-center gap-3 cursor-pointer hover:bg-teal-50/50 ${isDatePickerOpen ? 'z-[9999]' : 'z-10'}`}
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <div className="text-teal-700 text-xl pl-1">🗓️</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer">Travel Month</span>
                <div className="text-xs font-bold text-slate-800 truncate">{selectedDate.mainText}</div>
              </div>

              {/* Floating Speech Bubble */}
              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="teal"
                position="auto"
                defaultPosition="top"
              />
            </div>

            <div className="border border-slate-200 rounded-xl p-3 hover:border-teal-600 transition flex items-center gap-3">
              <div className="text-teal-700 text-xl pl-1">👥</div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travelers</span>
                <input
                  className="w-full text-xs font-bold text-slate-800 p-0 border-0 focus:ring-0 truncate cursor-pointer bg-transparent"
                  readOnly
                  type="text"
                  defaultValue="2 Adults, 1 Room"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button className="w-full h-full min-h-[52px] bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                </svg>
                <span className="text-sm">Search Holidays</span>
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <span className="text-teal-700">⚡</span>
              <span>Upcoming Fixed Departures:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full font-semibold hover:bg-red-100 transition flex items-center gap-1.5" href="#fixed-batches">
                <span>Nov 29:</span> Goa Weekend Special
                <span className="bg-red-200 text-red-800 text-[10px] px-1.5 rounded-full font-bold">4 Seats Left</span>
              </a>
              <a className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-semibold hover:bg-amber-100 transition flex items-center gap-1.5" href="#fixed-batches">
                <span>Dec 06:</span> Kerala Backwaters
                <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 rounded-full font-bold">Fast Filling</span>
              </a>
              <a className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full font-semibold hover:bg-teal-100 transition flex items-center gap-1.5" href="#fixed-batches">
                <span>Dec 14:</span> Manali Snow Escape
                <span className="bg-teal-200 text-teal-900 text-[10px] px-1.5 rounded-full font-bold">Guaranteed Batch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
