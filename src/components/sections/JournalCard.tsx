'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface JournalCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  thumbnailImage: string | null;
  index: number;
}

export function JournalCard({ slug, title, excerpt, thumbnailImage, index }: JournalCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#8B7355]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-serif mb-3 text-[#6F655C] group-hover:text-[#4a433b] transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-[#6F655C]/80 leading-relaxed mb-5 line-clamp-3">
            {excerpt}
          </p>
        )}
        <Link 
          href={`/journal/${slug}`} 
          className="inline-flex items-center gap-2 text-[#6F655C] font-medium hover:text-[#4a433b] transition-colors group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}



