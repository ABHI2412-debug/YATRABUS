'use client';

import React, { useState, useEffect } from 'react';
import DatePickerPopover from '@/components/ui/DatePickerPopover';

export default function SpiritualHero() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    mainText: 'Tomorrow, 24 Oct',
    subText: 'Festival Special'
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 pt-10 w-full sticky top-0 z-0" id="hero">
      <div className="absolute inset-0 z-0">
        <img
          alt="Spiritual Yatra Sacred Darshan Background"
          className="w-full h-full object-cover object-center will-change-transform transition-transform duration-100 ease-out"
          style={{ transform: `scale(${scrollScale})` }}
          src="/images/vedbus_dedicated_spiritual_yatra_sacred_darshan_booking_refined_5.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-amber-950/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div
          style={{
            transform: `translateY(${isLoaded ? textY * 0.7 : 20}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.8s ease-out 0.05s'
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-200 font-bold text-xs uppercase tracking-wider mb-4 border border-amber-400/30 shadow-lg shadow-amber-950/40"
        >
          <span className="material-symbols-outlined text-[16px] text-amber-300 animate-pulse">temple_hindu</span>
          DIVINE SPIRITUAL DARSHAN &amp; DEVSTHAN YATRAS
        </div>

        <h1
          style={{
            transform: `translateY(${isLoaded ? textY : 35}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.9s ease-out 0.2s'
          }}
          className="text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4 max-w-4xl mx-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] font-serif font-medium"
        >
          India&apos;s Dedicated <span className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent font-serif font-medium">Spiritual Yatra</span> &amp; Sacred Darshan Booking
        </h1>

        <p
          style={{
            transform: `translateY(${isLoaded ? textY * 0.85 : 35}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, opacity 0.9s ease-out 0.35s'
          }}
          className="text-base md:text-lg text-amber-100/90 max-w-2xl mx-auto mb-8 font-medium drop-shadow-md leading-relaxed"
        >
          Direct AC BharatBenz sleeper buses, guaranteed VIP Darshan passes, pure Satvik meals, and verified temple-proximate stays with assigned bus numbers.
        </p>

        {/* Search Matrix */}
        <div
          style={{
            transform: `translateY(${isLoaded ? textY * 0.5 : 45}px)`,
            opacity: isLoaded ? textOpacity : 0,
            transition: isLoaded && textY > 0
              ? 'transform 0.1s ease-out, opacity 0.1s ease-out'
              : 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, opacity 1s ease-out 0.5s'
          }}
          className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-3 md:p-4 max-w-7xl mx-auto mb-6 text-left shadow-2xl"
        >
          <form className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center">
            <div className="md:col-span-3 flex items-center bg-slate-950/60 rounded-2xl px-4 py-3 border border-amber-500/20 focus-within:border-amber-400 transition-all">
              <span className="material-symbols-outlined text-amber-400 mr-3 text-[22px]">departure_board</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80">From City</label>
                <input
                  className="w-full bg-transparent font-bold text-white text-base outline-none p-0 border-0 focus:ring-0 placeholder-white/40"
                  defaultValue="Nagpur"
                  type="text"
                />
                <p className="text-[11px] text-amber-200/60 truncate">Dharampeth, Chatrapati Sq</p>
              </div>
            </div>
            <div className="md:col-span-1 flex justify-center -my-3 md:my-0">
              <button
                className="w-10 h-10 rounded-full bg-slate-800 border border-amber-500/30 shadow-md flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </button>
            </div>
            <div className="md:col-span-3 flex items-center bg-slate-950/60 rounded-2xl px-4 py-3 border border-amber-500/20 focus-within:border-amber-400 transition-all">
              <span className="material-symbols-outlined text-amber-400 mr-3 text-[22px]">temple_hindu</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80">Select Devsthan / Circuit</label>
                <input
                  className="w-full bg-transparent font-bold text-white text-base outline-none p-0 border-0 focus:ring-0 placeholder-white/40"
                  defaultValue="Varanasi & Ayodhya"
                  type="text"
                />
                <p className="text-[11px] text-amber-200/60 truncate">Kashi Vishwanath, Ram Janmabhoomi</p>
              </div>
            </div>

            {/* DATE PICKER TRIGGER WITH FLOATING SPEECH BUBBLE */}
            <div
              className={`relative md:col-span-2 flex items-center bg-slate-950/60 hover:bg-amber-950/40 rounded-2xl px-4 py-3 border border-amber-500/20 hover:border-amber-400 cursor-pointer transition-all active:scale-[0.98] ${isDatePickerOpen ? 'z-[9999]' : 'z-10'}`}
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <span className="material-symbols-outlined text-amber-400 mr-2.5 text-[22px]">calendar_month</span>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80 cursor-pointer">Yatra Date</label>
                <div className="text-sm font-bold text-white truncate">{selectedDate.mainText}</div>
                <p className="text-[11px] text-amber-400 font-semibold truncate">{selectedDate.subText}</p>
              </div>

              {/* Floating Speech Bubble */}
              <DatePickerPopover
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={handleDateSelect}
                selectedDate={selectedDate.mainText}
                themeColor="amber"
                position="auto"
                defaultPosition="top"
              />
            </div>

            <div className="md:col-span-1 flex items-center bg-slate-950/60 rounded-2xl px-3 py-3 border border-amber-500/20 text-center cursor-pointer">
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80">Pilgrims</label>
                <div className="text-xs font-bold text-white">2 Devotees</div>
                <p className="text-[10px] text-amber-200/60">Family</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                className="w-full min-h-[58px] rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>FIND YATRAS</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges Bar */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-3 px-6 py-3.5 bg-amber-950/40 backdrop-blur-md rounded-2xl border border-amber-500/30 text-amber-100 text-xs font-semibold">
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-amber-300 text-[18px]">verified</span> Guaranteed VIP Darshan Pass</div>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-emerald-300 text-[18px]">restaurant</span> Pure Satvik Dining (No Garlic/Onion)</div>
          <span className="hidden md:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-cyan-300 text-[18px]">airline_seat_recline_extra</span> Real-Time Bus Seat Lock</div>
          <span className="hidden lg:inline text-white/40">•</span>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-pink-300 text-[18px]">support</span> Purohit &amp; Temple Escort Assist</div>
        </div>
      </div>
    </section>
  );
}
