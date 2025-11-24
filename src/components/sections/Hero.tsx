'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://assets.micontenthub.com/traveloffers/travel-tips/rabat_3Z4Gi9csM.jpg",
  "https://nataniatravel.com/wp-content/uploads/2023/09/Dubai-Desert-Safari-ft-1030x562.jpg",
  "https://i.ibb.co/vx9Bpk4g/IMG-4296.jpg",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {slides.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-white/25"></div>
      <div className="relative z-10 px-6 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-black">
          Curated Escapes.<br />
          Effortless Travel.<br />
          <span className="text-white">The Yve Collective Way.</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-md">
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
