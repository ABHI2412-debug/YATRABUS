import React from 'react';

export default function IndiaLocalStories() {
  return (
    <section className="py-20 bg-white" data-purpose="traveler-stories">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-teal-700 text-xs font-extrabold uppercase tracking-widest">Voices of Our Explorers</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">Stories From Across Incredible Bharat</h2>
            <p className="text-slate-500 text-sm mt-1">Real experiences from Indian families &amp; couples who trust VedBus for seamless holidays.</p>
          </div>
          <div className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-2xl flex items-center gap-2 self-start md:self-auto">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <span className="text-xs font-black text-teal-900">4.92 / 5</span>
            <span className="text-slate-500 text-[11px]">from 6,400+ Travelers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-teal-100/70 text-teal-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded">KERALA BACKWATERS</span>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">
                "The private houseboat in Alleppey was pristine and our parents loved every moment."
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Travelling with elderly parents can often be stressful, but VedBus made it completely smooth. Pure vegetarian freshly cooked food, smooth luxury BharatBenz transfers, and prompt responses on WhatsApp.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-700 text-white font-black text-xs flex items-center justify-center">
                AS
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Amit &amp; Preeti Sharma</p>
                <p className="text-[10px] text-slate-400">Mumbai • Traveled Oct 2024</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-teal-100/70 text-teal-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded">GOA COASTAL RETREAT</span>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">
                "Zero hassles with vehicle booking or resort check-in."
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                The assigned driver was punctual, civilized, and knew all the hidden local spots in South Goa. The 4★ Candolim villa matched the exact photos shared in our booking blueprint. Superb pricing!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                RD
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Rohan Deshmukh</p>
                <p className="text-[10px] text-slate-400">Pune • Honeymoon Getaway</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-teal-100/70 text-teal-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded">HIMACHAL SNOW TOUR</span>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">
                "Volvo coach was spotless, heated room in Manali, and friendly coordinator throughout."
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                We took our kids for their first snow vacation to Solang Valley. Everything from warm snow boots rentals to prompt morning breakfast was handled thoughtfully by the VedBus coordinator.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center">
                KJ
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Kavita Joshi &amp; Family</p>
                <p className="text-[10px] text-slate-400">Nagpur • Autumn 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
