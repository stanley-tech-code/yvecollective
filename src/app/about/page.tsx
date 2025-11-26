import Image from 'next/image';
import Link from 'next/link';
import { getCMSImage } from '@/lib/cms';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ArrowRight } from 'lucide-react';

// Disable caching to always fetch fresh data from database
export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const heroImg = await getCMSImage('about-hero');

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 w-full h-full">
          {heroImg?.url ? (
            <Image
              src={heroImg.url}
              alt={heroImg.altText || "About Yve Collective"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] via-[#8B7355] to-[#A69580]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-white drop-shadow-lg">
            Intentional Travel.
            <br />
            Inspired Living.
            <br />
            <span className="text-white/90">The Collective Spirit.</span>
          </h1>
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2EB] to-transparent" />
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 md:px-20 bg-[#F5F2EB] text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#333232]">Our Story</h2>
          </ScrollReveal>
          
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed text-[#6F655C]">
                Yve Collective was founded from a love for beautiful spaces and the desire to travel with meaning.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed text-[#6F655C]">
                We believe that true luxury lies in authenticity, in unhurried moments, natural beauty, and the quiet comfort of well-chosen details.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className="text-lg md:text-xl leading-relaxed text-[#6F655C]">
                Each experience we craft is guided by a sense of place and purpose. Whether you&apos;re seeking solitude in the wild, connection with loved ones, or the warmth of community through curated retreats, Yve Collective creates journeys that linger long after you&apos;ve returned home.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values - Using client component with Lucide icons */}
      <ValuesSection />

      {/* CTA */}
      <section className="py-24 bg-[#F5F2EB] text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/50 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h3 className="text-3xl md:text-5xl font-serif mb-8 text-[#333232] leading-tight">
              Yve Collective
              <br />
              <span className="text-[#6F655C]">where travel meets intention.</span>
            </h3>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Link 
              href="/contact-options" 
              className="group inline-flex items-center gap-3 bg-[#6F655C] text-white px-8 py-4 rounded-full font-medium hover:bg-[#5a534b] transition-all duration-300 hover:shadow-xl hover:shadow-[#6F655C]/20"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
