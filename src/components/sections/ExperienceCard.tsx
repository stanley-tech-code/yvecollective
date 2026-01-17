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

export function ExperienceCard({ title, description, image, altText, index, href }: ExperienceCardProps) {
  // Generate href from title if not provided
  const linkHref = href || `/experiences/${titleToSlug(title)}`;

  return (
    <Link href={linkHref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1]
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="group bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
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
          <div className="mt-4 flex items-center gap-2 text-[#6F655C] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Featured Listings</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}






