'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const getHref = (hash) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 text-xs xl:text-[13px] 2xl:text-sm font-semibold text-white/90 tracking-wide">
      {/* 1. Popular Routes */}
      <Link
        className="hover:text-white transition-colors duration-200 py-1 px-2 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10"
        href={getHref('#popularRoutesSection')}
      >
        <span>Popular Routes</span>
      </Link>

      {/* 2. Curated Packages */}
      <Link
        className={`hover:text-white transition-colors duration-200 py-1 px-2 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 ${
          pathname.startsWith('/packages') ? 'text-brand-scarlet font-bold' : ''
        }`}
        href="/packages"
      >
        <span>Curated Packages</span>
      </Link>

      {/* 3. About Us */}
      <Link
        className={`hover:text-white transition-colors duration-200 py-1 px-2 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 ${
          pathname === '/about' ? 'text-brand-scarlet font-bold' : ''
        }`}
        href="/about"
      >
        <span>About Us</span>
      </Link>

      {/* 4. FAQs */}
      <Link
        className="hover:text-white transition-colors duration-200 py-1 px-2 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10"
        href={getHref('#faqSection')}
      >
        <span>FAQs</span>
      </Link>

      {/* 5. Contact Us */}
      <Link
        className={`hover:text-white transition-colors duration-200 py-1 px-2 flex items-center gap-1 drop-shadow-sm whitespace-nowrap rounded-lg hover:bg-white/10 ${
          pathname === '/contact' ? 'text-brand-scarlet font-bold' : ''
        }`}
        href="/contact"
      >
        <span>Contact Us</span>
      </Link>
    </nav>
  );
}
