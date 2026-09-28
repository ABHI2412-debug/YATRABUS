'use client';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-14 bg-slate-50 scroll-mt-28 sm:scroll-mt-32" id="faqSection">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-brand-scarlet uppercase tracking-wider">Clear Answers</span>
          <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight mt-1 font-serif font-semibold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          <div className="faq-item bg-white border border-slate-200 rounded-2xl p-5 shadow-sm cursor-pointer transition-all" onClick={() => toggleFaq(0)}>
            <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center justify-between select-none">
              <span className="">How do I know my assigned bus vehicle number plate?</span>
              <span className="material-symbols-outlined text-brand-scarlet text-[20px] transition-transform duration-200 faq-icon" style={{ transform: openIndex === 0 ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
            </h3>
            <p className={`text-xs md:text-sm text-slate-600 mt-2 leading-relaxed ${openIndex === 0 ? '' : 'hidden'}`}>Unlike aggregators, VedBus allocates and prints your exact fleet registration number (e.g. MH-31-AP-4921) right on your digital pass upon booking. If a fleet swap occurs at the depot, an automated SMS alerts you 2 hours before departure.</p>
          </div>
          <div className="faq-item bg-white border border-slate-200 rounded-2xl p-5 shadow-sm cursor-pointer transition-all" onClick={() => toggleFaq(1)}>
            <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center justify-between select-none">
              <span className="">Can I select single sleeper berths or female-only rows?</span>
              <span className="material-symbols-outlined text-brand-scarlet text-[20px] transition-transform duration-200 faq-icon" style={{ transform: openIndex === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
            </h3>
            <p className={`text-xs md:text-sm text-slate-600 mt-2 leading-relaxed ${openIndex === 1 ? '' : 'hidden'}`}>Yes! Our seat selection layout allows you to view upper and lower deck berths, including single sleeper rows and female-reserved berths marked in pink.</p>
          </div>
          <div className="faq-item bg-white border border-slate-200 rounded-2xl p-5 shadow-sm cursor-pointer transition-all" onClick={() => toggleFaq(2)}>
            <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center justify-between select-none">
              <span className="">What is included in the 3 package types?</span>
              <span className="material-symbols-outlined text-brand-scarlet text-[20px] transition-transform duration-200 faq-icon" style={{ transform: openIndex === 2 ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
            </h3>
            <p className={`text-xs md:text-sm text-slate-600 mt-2 leading-relaxed ${openIndex === 2 ? '' : 'hidden'}`}>Spiritual packages include VIP temple passes and satvik dining. International packages bundle roundtrip flights, 4–5 star stays, and visa assistance. Domestic packages feature comfortable bus transfers and handpicked resort stays.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
