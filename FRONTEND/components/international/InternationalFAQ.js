'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Does VedBus handle the Visa application process?',
    answer:
      'Yes, our dedicated in-house international visa concierge team assists with document verification, appointment bookings, biometric scheduling (for Schengen/UK/US), and direct e-visa issuance for Dubai, Singapore, Thailand, and Bali.'
  },
  {
    question: 'Is authentic Indian (Veg & Jain) food guaranteed on the trip?',
    answer:
      'Absolutely. Every VedBus package is designed keeping Indian dietary preferences at the core. We partner with vetted, authentic Indian restaurants across Europe, UAE, and Southeast Asia offering fresh Gujarati, North Indian, South Indian, and strictly Jain meal spreads.'
  },
  {
    question: 'Can I customize dates, hotel tiers, or add extra days?',
    answer:
      'Yes! All packages are fully customizable. Whether you wish to upgrade to an overwater villa in Maldives, extend your stay in Switzerland, or travel in a private Mercedes van, our tour consultants adapt the schedule to your exact rhythm.'
  },
  {
    question: 'What happens in case of flight delays or on-trip emergencies?',
    answer:
      'You receive 24x7 real-time WhatsApp & hotline concierge support with local ground representatives stationed in each major destination. All packages include comprehensive travel protection insurance covering flight delays, medical assistance, and baggage safety.'
  }
];

export default function InternationalFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-[#F8FAFB]" id="intlFaq">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight mt-1 font-serif font-semibold">
            International Travel FAQ
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Everything you need to know about passports, visas, Indian food abroad, and payments.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  className="w-full p-5 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between gap-4"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-teal-600 text-[20px] transition-transform ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
