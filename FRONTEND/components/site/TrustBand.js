export default function TrustBand() {
  return (
    <section className="w-full bg-transparent border-b border-slate-200 py-3 sm:py-4 md:py-6 relative z-20">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 divide-none">
          {/* 1: Handpicked Destinations */}
          <div className="flex flex-col items-center text-center px-1 sm:px-2 md:px-4 py-1 sm:py-2 md:py-3 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center text-brand-scarlet mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-[11px] sm:text-xs md:text-[15px] leading-snug mb-0.5 sm:mb-1">Handpicked Destinations</h3>
            <p className="text-slate-500 text-[9px] sm:text-[11px] font-medium leading-relaxed max-w-[160px] line-clamp-1 sm:line-clamp-2">Curated places worth exploring</p>
          </div>
          {/* 2: Best Price Guarantee */}
          <div className="flex flex-col items-center text-center px-1 sm:px-2 md:px-4 py-1 sm:py-2 md:py-3 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center text-brand-scarlet mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" x2="7.01" y1="7" y2="7"></line>
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-[11px] sm:text-xs md:text-[15px] leading-snug mb-0.5 sm:mb-1">Best Price Guarantee</h3>
            <p className="text-slate-500 text-[9px] sm:text-[11px] font-medium leading-relaxed max-w-[160px] line-clamp-1 sm:line-clamp-2">Get the best deals always</p>
          </div>
          {/* 3: 24/7 Support */}
          <div className="flex flex-col items-center text-center px-1 sm:px-2 md:px-4 py-1 sm:py-2 md:py-3 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center text-brand-scarlet mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-[11px] sm:text-xs md:text-[15px] leading-snug mb-0.5 sm:mb-1">24/7 Support</h3>
            <p className="text-slate-500 text-[9px] sm:text-[11px] font-medium leading-relaxed max-w-[160px] line-clamp-1 sm:line-clamp-2">We’re here anytime you need</p>
          </div>
          {/* 4: Safe & Secure */}
          <div className="flex flex-col items-center text-center px-1 sm:px-2 md:px-4 py-1 sm:py-2 md:py-3 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center text-brand-scarlet mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-[11px] sm:text-xs md:text-[15px] leading-snug mb-0.5 sm:mb-1">Safe & Secure</h3>
            <p className="text-slate-500 text-[9px] sm:text-[11px] font-medium leading-relaxed max-w-[160px] line-clamp-1 sm:line-clamp-2">Your safety is our priority</p>
          </div>
          {/* 5: Custom Itineraries */}
          <div className="flex flex-col items-center text-center px-1 sm:px-2 md:px-4 py-1 sm:py-2 md:py-3 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center text-brand-scarlet mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
                <circle cx="8" cy="14" r="1"></circle>
                <circle cx="12" cy="14" r="1"></circle>
                <circle cx="16" cy="14" r="1"></circle>
                <circle cx="8" cy="18" r="1"></circle>
                <circle cx="12" cy="18" r="1"></circle>
                <circle cx="16" cy="18" r="1"></circle>
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-[11px] sm:text-xs md:text-[15px] leading-snug mb-0.5 sm:mb-1">Custom Itineraries</h3>
            <p className="text-slate-500 text-[9px] sm:text-[11px] font-medium leading-relaxed max-w-[160px] line-clamp-1 sm:line-clamp-2">Trips designed just for you</p>
          </div>
          {/* 6: Memorable Experiences */}
          <div className="flex flex-col items-center text-center px-1 sm:px-2 md:px-4 py-1 sm:py-2 md:py-3 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 flex items-center justify-center text-brand-scarlet mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-[11px] sm:text-xs md:text-[15px] leading-snug mb-0.5 sm:mb-1">Memorable Experiences</h3>
            <p className="text-slate-500 text-[9px] sm:text-[11px] font-medium leading-relaxed max-w-[160px] line-clamp-1 sm:line-clamp-2">Create memories that last</p>
          </div>
        </div>
      </div>
    </section>
  );
}
