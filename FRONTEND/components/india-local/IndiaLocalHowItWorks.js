import React from 'react';

export default function IndiaLocalHowItWorks() {
  return (
    <section className="py-20 bg-white" data-purpose="step-by-step-process" id="how-it-works">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <span className="text-teal-700 text-xs font-extrabold uppercase tracking-widest">Easy 3 Steps</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
          Plan Your Dream Holiday in 3 Simple Steps
        </h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl mx-auto">
          Zero complexity. From customized BharatBenz bus departures to regional Indian meals on tour, VedBus takes care of every detail.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Step 1 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-teal-300 transition duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 font-black text-lg flex items-center justify-center mb-6 group-hover:bg-teal-700 group-hover:text-white transition">
              1
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">1. Tell Us Your Dream Destination</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Pick your wishlisted domestic region, group size, meal preferences (Veg/Jain), and target travel dates. We listen closely to your family’s comfort requirements.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-teal-300 transition duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 font-black text-lg flex items-center justify-center mb-6 group-hover:bg-teal-700 group-hover:text-white transition">
              2
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">2. Get a Tailored Plan</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Our certified domestic destination experts craft your day-by-day itinerary with guaranteed stays, pre-arranged AC Volvo/BharatBenz bus travel, and local cab sightseeings.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-teal-300 transition duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 font-black text-lg flex items-center justify-center mb-6 group-hover:bg-teal-700 group-hover:text-white transition">
              3
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">3. Pack &amp; Travel Relaxed</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Doorstep or designated terminal pickup, verified clean hotels, curated Indian hot meals, and 24x7 WhatsApp concierge service throughout your entire vacation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
