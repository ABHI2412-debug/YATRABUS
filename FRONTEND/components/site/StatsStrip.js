export default function StatsStrip() {
  return (
    <section className="w-full bg-white border-b border-slate-200 py-3 sm:py-4 md:py-6">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 items-center divide-none md:divide-x divide-slate-200">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-red-100 text-brand-scarlet flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px] md:text-[26px]">directions_bus</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm md:text-xl font-extrabold text-slate-900 leading-tight">15+ Luxury Fleet</div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-slate-500 font-medium leading-tight truncate sm:whitespace-normal">BharatBenz & Volvo Coaches</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 md:pl-6 lg:pl-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px] md:text-[26px]">alt_route</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm md:text-xl font-extrabold text-slate-900 leading-tight">45+ Daily Routes</div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-slate-500 font-medium leading-tight truncate sm:whitespace-normal">Direct Highway Corridors</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 md:pl-6 lg:pl-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px] md:text-[26px]">groups</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm md:text-xl font-extrabold text-slate-900 leading-tight">1,20,000+</div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-slate-500 font-medium leading-tight truncate sm:whitespace-normal">Happy Pilgrims & Guests</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 md:pl-6 lg:pl-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px] md:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm md:text-xl font-extrabold text-slate-900 leading-tight">4.8 ★ Rated</div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-slate-500 font-medium leading-tight truncate sm:whitespace-normal">Verified Passenger Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
