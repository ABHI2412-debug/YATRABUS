import React from 'react';

export default function HowItWorks() {
  return (
    <section className="w-full py-16 bg-white border-y border-slate-200" id="howItWorks">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Easy 3 Steps</span>
        <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight mt-1 mb-2 font-serif font-semibold">
          Plan Your Dream Holiday in 3 Simple Steps
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto mb-12">
          Zero complexity. From customized flight routing to Indian meals on tour, VedBus takes care of every detail.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-lift">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">1. Tell Us Your Dream</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pick your wishlist destination, group size, meal preferences (Veg/Jain), and target travel dates. We listen closely.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-lift">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">2. Get a Tailored Plan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our certified global destination experts craft your day-by-day itinerary with guaranteed flights, stays, and fast-track visas.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-lift">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">3. Pack &amp; Travel Relaxed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Airport meet &amp; greet, pre-booked private luxury coaches, curated Indian meals, and 24x7 WhatsApp concierge all the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
