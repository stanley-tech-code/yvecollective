'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      id="contact" 
      className="py-24 md:py-32 bg-white text-center relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F5F2EB] rounded-full opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F5F2EB] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif mb-8 text-[#333232] leading-tight"
        >
          Wherever your journey leads,
          <br />
          <span className="text-[#6F655C]">we&apos;ll curate the experience.</span>
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/contact-options"
            className="group inline-flex items-center gap-3 bg-[#6F655C] text-white px-8 py-4 rounded-full font-medium hover:bg-[#5a534b] transition-all duration-300 hover:shadow-xl hover:shadow-[#6F655C]/20 hover:-translate-y-0.5"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
