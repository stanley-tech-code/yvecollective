'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import TerrainScene to avoid SSR issues
const TerrainScene = dynamic(
  () => import('../three/TerrainScene').then((mod) => mod.TerrainScene),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-[#6F655C] via-[#8B7355] to-[#D4C4B0]" />
    )
  }
);

interface Slide {
  url: string;
  altText: string;
}

interface HeroClientProps {
  slides: Slide[];
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2 + 0.5,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.3,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export function HeroClient({ slides }: HeroClientProps) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const hasSlides = slides.length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        {hasSlides ? (
          // Image slideshow
          slides.map((slide, index) => (
            <Image
              key={slide.url}
              src={slide.url}
              alt={slide.altText || `Scenic travel destination slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        ) : mounted ? (
          // 3D Terrain fallback when no images
          <Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-[#6F655C] via-[#8B7355] to-[#D4C4B0]" />
          }>
            <TerrainScene />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#6F655C] via-[#8B7355] to-[#D4C4B0]" />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2EB] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl">
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight text-white"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={0}
        >
          <span className="drop-shadow-lg">Curated Escapes.</span>
          <br />
          <motion.span 
            className="drop-shadow-lg"
            variants={textVariants}
            custom={1}
          >
            Effortless Travel.
          </motion.span>
          <br />
          <motion.span 
            className="text-white/90 drop-shadow-lg"
            variants={textVariants}
            custom={2}
          >
            The Yve Collective Way.
          </motion.span>
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl mb-10 text-white/90 drop-shadow-md font-light max-w-2xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          Intimate, beautifully considered getaways across Kenya and beyond — experiences that inspire connection, rest, and renewal.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <Link 
            href="/contact" 
            className="group relative bg-white text-[#6F655C] px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Plan Your Escape
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
            <div className="absolute inset-0 bg-[#6F655C] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              Plan Your Escape
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          
          <Link 
            href="/experiences" 
            className="group text-white border-2 border-white/30 px-8 py-4 rounded-full font-medium backdrop-blur-sm hover:border-white/60 hover:bg-white/10 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Explore Experiences
              <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators (only when there are images) */}
      {hasSlides && slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
