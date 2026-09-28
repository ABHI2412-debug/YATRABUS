'use client';

export default function DevoteeCare() {
  return (
    <section className="w-full py-16 bg-white border-y border-amber-200" id="devoteeCare">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-brand-scarlet uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200">Devotional Pilgrimage Care</span>
          <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight mt-3 font-serif font-bold">The VedBus Sacred Hospitality Standard</h2>
          <p className="text-sm text-slate-600 mt-2">Specially engineered for elderly parents, joint families, and devout pilgrims seeking a divine atmosphere without logistical exhaustion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-amber-200/90 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-brand-scarlet flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Pure Satvik Dining</h3>
            <p className="text-xs text-slate-600 leading-relaxed">100% pure vegetarian kitchens. Freshly cooked Satvik meals strictly prepared without onion and garlic. Includes fasting (Upvas/Vrat) meal options and sealed mineral water bottles.</p>
            <span className="text-[11px] text-amber-700 font-bold block mt-3">No Onion • No Garlic Guarantee</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-amber-200/90 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-brand-scarlet flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">pin_drop</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Temple Proximity Stays</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Pre-screened 3-star AC hotels situated within 5–15 minutes walking radius of main Mandir gates, eliminating arduous auto-rickshaw transfers or long walks for elders.</p>
            <span className="text-[11px] text-amber-700 font-bold block mt-3">Under 500m to Main Gates</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-amber-200/90 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-brand-scarlet flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Early Bus Check-In Priority</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Rooms synchronized to overnight express sleeper arrival schedules (guaranteed 6:00 AM freshen-up access). Never wait in cold hotel lobbies before morning darshan.</p>
            <span className="text-[11px] text-amber-700 font-bold block mt-3">Synced 06:00 AM Room Entry</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-amber-200/90 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-brand-scarlet flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[24px]">elderly</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Senior Pilgrim Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Wheelchair coordination at temple entrances, verified Pandit/Purohit escort for pujas, lower berth reservation priority on coaches, and first-aid kits on every bus.</p>
            <span className="text-[11px] text-amber-700 font-bold block mt-3">Wheelchair & Pandit Assist</span>
          </div>
        </div>

        {/* Trust Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950 rounded-3xl p-6 text-white text-center shadow-xl">
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400">99.4%</div>
            <div className="text-xs text-slate-400 font-medium">On-Time Darshan Guarantee</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400">40,000+</div>
            <div className="text-xs text-slate-400 font-medium">Senior Devotees Hosted</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs text-slate-400 font-medium">On-Ground Audited Hotels</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400">4.9 / 5.0</div>
            <div className="text-xs text-slate-400 font-medium">Pilgrim Satisfaction Score</div>
          </div>
        </div>
      </div>
    </section>
  );
}
