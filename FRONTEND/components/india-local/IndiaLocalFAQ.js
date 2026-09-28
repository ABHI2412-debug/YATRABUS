'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Does VedBus include intercity bus and local sightseeing transfers?',
    answer:
      'Yes, our all-inclusive holiday packages bundle intercity premium AC Volvo / BharatBenz coach tickets or flights, along with dedicated private cabs (Dzire/Innova) for all local sightseeing, pickup, and drop-offs as outlined in your selected package blueprint.'
  },
  {
    question: 'Can we get pure vegetarian and Jain food during the tour?',
    answer:
      'Absolutely. We take special pride in catering to regional dietary preferences. All our partner hotels and private houseboats cater to pure vegetarian and strict Jain meals (without onion, garlic, or root vegetables) upon request prior to journey start.'
  },
  {
    question: 'Are hotel rooms pre-screened and senior-citizen friendly?',
    answer:
      'Yes. Every property in our portfolio is physically inspected by VedBus hospitality audits for hygiene, lift access, ground-floor accessibility for senior family members, clean hot water facilities, and responsive room service.'
  },
  {
    question: 'What is the cancellation and rescheduling policy?',
    answer:
      'We offer 100% free date modification up to 10 days before departure on all our domestic holiday packages. Cancellations made 7+ days prior are eligible for standard refund or future tour credit with minimal administrative processing fees.'
  }
];

export default function IndiaLocalFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60" data-purpose="faq-accordion" id="faq">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-10">
          <span className="text-teal-700 text-xs font-extrabold uppercase tracking-widest">Got Questions?</span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">Domestic Travel FAQ</h2>
          <p className="text-slate-500 text-xs mt-1">Everything you need to know about intercity buses, stays, dietary needs, and bookings.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`text-teal-700 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
