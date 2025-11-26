'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  url: string;
  altText: string;
}

interface HeroClientProps {
  slides: Slide[];
}

export function HeroClient({ slides }: HeroClientProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <Image
              key={slide.url}
              src={slide.url}
              alt={slide.altText || `Scenic travel destination slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#8B7355]" />
        )}
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 px-6 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-white drop-shadow-lg">
          Curated Escapes.<br />
          Effortless Travel.<br />
          <span className="text-white">The Yve Collective Way.</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-md font-medium">
          Yve Collective designs intimate, beautifully considered getaways across Kenya and beyond — experiences that inspire connection, rest, and renewal.
        </p>
        <div className="space-x-4">
          <Link href="/contact" className="bg-white text-[#6F655C] px-6 py-3 rounded-full font-medium hover:bg-[#F0EDE5] transition">
            Plan Your Next Escape
          </Link>
        </div>
      </div>
    </section>
  );
}
