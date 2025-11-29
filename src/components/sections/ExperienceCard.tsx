'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
  altText: string;
  index: number;
}

export function ExperienceCard({ title, description, image, altText, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="group bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5">
        <h4 className="text-xl font-serif mb-2 text-[#6F655C] group-hover:text-[#4a433b] transition-colors">
          {title}
        </h4>
        <p className="text-[#6F655C]/80 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}





