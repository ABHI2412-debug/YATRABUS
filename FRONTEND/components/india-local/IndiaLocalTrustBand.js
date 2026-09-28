import React from 'react';

export default function IndiaLocalTrustBand() {
  return (
    <section className="py-8 border-b border-slate-200 bg-transparent" data-purpose="trust-badges">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl mb-3 shadow-sm border border-teal-100">
              🏨
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">Handpicked Stays</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Heritage &amp; 4★/5★ Resorts</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-3 shadow-sm border border-amber-100">
              🏷️
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">Best Price Guarantee</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">No hidden charges</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl mb-3 shadow-sm border border-teal-100">
              💬
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">24/7 Trip Concierge</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Instant WhatsApp assistance</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl mb-3 shadow-sm border border-indigo-100">
              🚌
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">Luxury Coach Fleet</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">BharatBenz &amp; Volvo AC</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl mb-3 shadow-sm border border-emerald-100">
              🗺️
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">Tailored Itineraries</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Relaxed, balanced pacing</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center text-xl mb-3 shadow-sm border border-rose-100">
              🍲
            </div>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">Authentic Regional Meals</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Pure Veg &amp; Jain available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
