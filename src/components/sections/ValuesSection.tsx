'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Heart, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Authenticity',
    description: 'Every destination we feature has been personally experienced and chosen for its genuine charm and soul.',
  },
  {
    icon: Heart,
    title: 'Connection',
    description: 'We design journeys that nurture meaningful encounters and shared experiences.',
  },
  {
    icon: Sparkles,
    title: 'Curation',
    description: 'Every detail, from landscape to lodging, is thoughtfully selected to reflect elegance and ease.',
  },
];

export function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-6 md:px-20 bg-white text-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#F5F2EB]/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F5F2EB]/30 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-serif mb-16 text-[#333232]"
        >
          Our Values
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15 + 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group flex flex-col items-center"
              >
                {/* Icon container with hover effect */}
                <motion.div 
                  className="relative w-20 h-20 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#6F655C]/20 group-hover:border-[#6F655C]/40 transition-colors duration-300" />
                  <motion.div 
                    className="absolute inset-1 rounded-full bg-gradient-to-br from-[#F5F2EB] to-[#E8E2D8]"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.8 }}
                  />
                  <Icon 
                    className="relative z-10 w-8 h-8 text-[#6F655C] group-hover:text-[#4a433b] transition-colors duration-300" 
                    strokeWidth={1.5}
                  />
                </motion.div>
                
                <h4 className="text-2xl font-serif mb-3 text-[#333232] group-hover:text-[#6F655C] transition-colors duration-300">
                  {value.title}
                </h4>
                
                <p className="max-w-xs text-[#6F655C]/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

