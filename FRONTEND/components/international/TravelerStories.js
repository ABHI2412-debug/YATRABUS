import React from 'react';

export default function TravelerStories() {
  return (
    <section className="w-full py-16 bg-white border-b border-slate-200 overflow-hidden" id="travelerStories">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-serif italic text-teal-600 font-semibold text-sm tracking-wide block mb-1">
              Voices of Our Explorers
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-slate-900 tracking-tight font-semibold">
              Stories From Across The Continents
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Real experiences from Indian globetrotters who trusted VedBus for seamless visas, 5★ stays, and pure vegetarian &amp; Jain cuisine worldwide.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 bg-teal-50 border border-teal-200 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center text-amber-500 text-sm">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div className="text-xs text-slate-700 font-bold border-l border-teal-200 pl-3">
              <span className="text-teal-700 font-extrabold">4.92 / 5</span> from 4,850+ Travelers
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 card-lift flex flex-col justify-between relative group hover:border-teal-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-extrabold text-[10px] tracking-wide uppercase">
                  Dubai &amp; Abu Dhabi
                </span>
                <div className="flex items-center text-amber-500 text-xs gap-0.5">★★★★★</div>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 font-serif">
                "The Jain dining arrangements in Dubai were extraordinary."
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                "Traveling with my elderly parents, finding hot Gujarati and Jain food was our biggest worry. VedBus handled everything from our 24-hour visa processing to Marriott Marquis check-in and private desert dune banquet. 10/10 experience!"
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-teal-500/30">
                  RM
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    Rajesh &amp; Sunita Mehta{' '}
                    <span className="material-symbols-outlined text-teal-600 text-[14px]">verified</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Mumbai • Traveled Oct 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 card-lift flex flex-col justify-between relative group hover:border-teal-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-extrabold text-[10px] tracking-wide uppercase">
                  Santorini &amp; Athens
                </span>
                <div className="flex items-center text-amber-500 text-xs gap-0.5">★★★★★</div>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 font-serif">
                "Effortless Greek honeymoon with private sunset yacht."
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                "From our cliffside caldera suite to pre-arranged vegetarian sunset catamaran cruise, every single day followed the blueprint flawlessly. The WhatsApp concierge responded in under 2 minutes whenever we had questions."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-teal-500/30">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    Ananya &amp; Kabir Roy{' '}
                    <span className="material-symbols-outlined text-teal-600 text-[14px]">verified</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Bangalore • Honeymoon Escape</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 card-lift flex flex-col justify-between relative group hover:border-teal-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-extrabold text-[10px] tracking-wide uppercase">
                  Swiss Alps &amp; Paris
                </span>
                <div className="flex items-center text-amber-500 text-xs gap-0.5">★★★★★</div>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 font-serif">
                "Schengen visa was granted in 6 days without stress."
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                "The visa concierge team took complete ownership of our appointment documentation. Having a Hindi-speaking tour escort in Interlaken and Mt. Titlis made the entire family feel at home in Europe."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-teal-500/30">
                  VS
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    Vikram Singhania &amp; Family{' '}
                    <span className="material-symbols-outlined text-teal-600 text-[14px]">verified</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">New Delhi • Autumn 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
