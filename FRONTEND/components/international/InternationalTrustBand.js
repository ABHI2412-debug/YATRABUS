import React from 'react';

export default function InternationalTrustBand() {
  return (
    <section className="w-full bg-transparent border-b border-slate-200 py-6 mb-12">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-0 lg:divide-x divide-slate-200 text-center">
          <div className="p-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">🌐</div>
            <div className="font-extrabold text-xs text-slate-900">Handpicked Destinations</div>
            <div className="text-[11px] text-slate-500">Top-rated hotels</div>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">🏷️</div>
            <div className="font-extrabold text-xs text-slate-900">Best Price Assured</div>
            <div className="text-[11px] text-slate-500">Guaranteed value</div>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">🎧</div>
            <div className="font-extrabold text-xs text-slate-900">24/7 Concierge</div>
            <div className="text-[11px] text-slate-500">WhatsApp support</div>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">🛡️</div>
            <div className="font-extrabold text-xs text-slate-900">Safe &amp; Insured</div>
            <div className="text-[11px] text-slate-500">Total protection</div>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">📅</div>
            <div className="font-extrabold text-xs text-slate-900">Custom Itineraries</div>
            <div className="text-[11px] text-slate-500">Tailored pace</div>
          </div>
          <div className="p-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">🍲</div>
            <div className="font-extrabold text-xs text-slate-900">Indian Meals</div>
            <div className="text-[11px] text-slate-500">Jain &amp; Satvik ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}
