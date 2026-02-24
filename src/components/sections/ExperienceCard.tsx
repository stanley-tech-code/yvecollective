'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
  altText: string;
  index: number;
  href?: string;
  ctaText?: string;
}

// Convert title to URL slug
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export function ExperienceCard({ title, description, image, altText, index, href, ctaText }: ExperienceCardProps) {
  const linkHref = href || `/experiences/${titleToSlug(title)}`;

  return (
    <Link href={linkHref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="text-lg font-semibold text-[#1a1a1a] group-hover:text-[#6F655C] transition-colors mb-1.5 leading-snug">
            {title}
          </h4>
          <p className="text-sm text-[#717171] leading-relaxed line-clamp-3">{description}</p>
          <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>{ctaText || 'View Listings'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
