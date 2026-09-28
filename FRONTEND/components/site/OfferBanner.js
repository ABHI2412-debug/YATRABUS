'use client';

import React from 'react';

export default function OfferBanner() {
  return (
    <section className="w-full py-8">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 group min-h-[260px] md:min-h-[280px] flex items-center">
          {/* Warm Golden Sunset Travel Image */}
          <img
            src="/images/international.jpg"
            alt="Breathtaking Santorini sunset view"
            className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700"
          />

          {/* Deep Dark Navy Left Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/90 md:via-[#0A0F1D]/80 to-transparent"></div>

          {/* Main Content Layout */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Column: Text & Red CTA Button */}
            <div className="max-w-xl text-white">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 block mb-2 font-mono">
                LIMITED TIME OFFER
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-none mb-1 font-normal">
                Upto 25% Off
              </h2>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white/95 font-normal tracking-tight mb-3">
                on International Packages
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans max-w-md">
                Make 2026 the year of more stamps on your passport. Book early and save big on flights, 5★ stays, and visas.
              </p>

              {/* Vibrant Opaque Red CTA Button */}
              <a
                href="#internationalPackagesSection"
                style={{ backgroundColor: '#FF4D5E', color: '#FFFFFF', opacity: 1 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wide shadow-xl shadow-red-600/40 hover:bg-[#E03A4C] transition-all hover:scale-105 active:scale-95 cursor-pointer border-0"
              >
                <span>Explore International Trips</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            {/* Right Column: Authentic Circular Passport Stamp Badge ("TRAVEL MORE • LIVE BETTER") */}
            <div className="hidden lg:flex items-center justify-center shrink-0 pr-8 z-10 pointer-events-none select-none">
              <div className="relative flex items-center justify-center w-36 h-36">
                <svg viewBox="0 0 140 140" className="w-36 h-36 text-slate-900 shrink-0">
                  <defs>
                    {/* Top Arc Path for "TRAVEL MORE" */}
                    <path id="stampTopArc" d="M 22,70 A 48,48 0 1,1 118,70" />
                    {/* Bottom Arc Path for "LIVE BETTER" */}
                    <path id="stampBottomArc" d="M 118,70 A 48,48 0 1,1 22,70" />
                  </defs>

                  {/* Outer Dashed Double Rings */}
                  <circle
                    cx="70"
                    cy="70"
                    r="65"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    opacity="0.85"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="58"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    opacity="0.9"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    opacity="0.6"
                  />

                  {/* Center Airplane Icon */}
                  <g transform="translate(56, 52) rotate(-35 14 14)">
                    <path
                      fill="currentColor"
                      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                    />
                  </g>

                  {/* Curved Text Along Top Arc */}
                  <text fill="currentColor" fontSize="9.5" fontWeight="800" letterSpacing="3">
                    <textPath href="#stampTopArc" startOffset="50%" textAnchor="middle">
                      TRAVEL MORE
                    </textPath>
                  </text>

                  {/* Curved Text Along Bottom Arc */}
                  <text fill="currentColor" fontSize="9.5" fontWeight="800" letterSpacing="3">
                    <textPath href="#stampBottomArc" startOffset="50%" textAnchor="middle">
                      LIVE BETTER
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
