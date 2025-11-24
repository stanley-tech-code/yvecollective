'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-30 flex justify-between items-center px-8 py-6 bg-transparent">
      <Link href="/" className="flex flex-col leading-tight">
        <span className="text-2xl md:text-3xl font-serif tracking-wide text-[#6F655C]">Yve Collective</span>
        <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#6F655C]/80">Retreats & Beyond</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 font-medium text-[#6F655C]">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/experiences" className="hover:text-white transition">Experiences</Link>
        <Link href="/journal" className="hover:text-white transition">Journal</Link>
        <Link href="/contact" className="hover:text-white transition">Contact</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[#6F655C] focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#F5F2EB]/95 z-40 flex flex-col items-center justify-center space-y-8 text-lg font-medium text-[#6F655C]">
          <div className="flex flex-col items-center mb-8">
            <span className="text-3xl font-serif tracking-wide text-[#6F655C]">Yve Collective</span>
            <span className="text-sm uppercase tracking-[0.2em] text-[#6F655C]/80">Retreats & Beyond</span>
          </div>
          <Link href="/" className="hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-white" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/experiences" className="hover:text-white" onClick={() => setIsOpen(false)}>Experiences</Link>
          <Link href="/journal" className="hover:text-white" onClick={() => setIsOpen(false)}>Journal</Link>
          <Link href="/contact" className="hover:text-white" onClick={() => setIsOpen(false)}>Contact</Link>

          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-8 text-[#6F655C]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}
