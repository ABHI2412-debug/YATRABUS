'use client';

import { useState } from 'react';

const spiritualFaqs = [
  {
    q: 'How does VIP Darshan pass assistance work on VedBus packages?',
    a: 'Our pilgrimage packages include pre-registered temple trust queue slots (such as Tirumala ₹300 Seeghra Darshan, Kashi Vishwanath Sugam Darshan, and Shirdi Sai VIP entry). A designated VedBus purohit escort meets your group at the temple gate with physical RFID bands or verified barcode passes, accompanying elderly pilgrims directly to priority queues.'
  },
  {
    q: 'Are the meals strictly Satvik and suitable for Ekadashi or fasting (Vrat)?',
    a: 'Yes! All hotels and kitchen caterers on VedBus spiritual circuits operate strictly pure-vegetarian kitchens with zero onion and garlic. On auspicious fasting days (Ekadashi, Pradosham, Navratri), special Vrat thalis (Sabudana Khichdi, fresh seasonal fruits, dairy curd, and rock-salt preparations) are served upon advance request at no extra charge.'
  },
  {
    q: 'Can senior citizens get wheelchair support or lower-berth bus allocation?',
    a: 'Absolutely. When booking, simply check the Senior Citizen / Lower Berth Priority option. We guarantee lower deck sleeper berths with wider mattresses. At temple premises (such as Kedarnath pony/palki coordination or Tirumala battery cars), our local attendants arrange wheelchairs and battery car permits directly.'
  },
  {
    q: 'What if a temple schedule or Aarti timing gets modified by the trust?',
    a: 'Because we operate direct buses and maintain on-ground depot coordinators in pilgrim towns like Shirdi, Varanasi, and Ujjain, our coach departure timings dynamically adapt if an Aarti is delayed or VIP temple protocol shifts, ensuring devotees never miss a single sacred ritual.'
  },
  {
    q: 'Is the bus vehicle number and driver contact provided in advance?',
    a: 'Yes, unlike online aggregators who reveal bus numbers only 30 minutes prior, VedBus assigns your fleet vehicle registration number right at booking confirmation. Full driver contact and live GPS tracking links are sent via automated WhatsApp 4 hours prior to boarding.'
  }
];

export default function SpiritualFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full py-16 bg-white border-t border-amber-200" id="spiritualFaq">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-brand-scarlet uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Devotee Assistance
          </span>
          <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tight mt-3 font-serif font-bold">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600 mt-2">Everything you need to know about our pilgrimage passes, Satvik arrangements, and elder accommodations.</p>
        </div>

        <div className="space-y-4">
          {spiritualFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border border-amber-200 rounded-2xl overflow-hidden bg-[#FFFDF9]">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between gap-4 select-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className="material-symbols-outlined text-brand-scarlet text-[20px] transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-amber-150 pt-3">
                    {faq.a}
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
