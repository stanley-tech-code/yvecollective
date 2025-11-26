import Image from 'next/image';
import Link from 'next/link';
import { getCMSImage } from '@/lib/cms';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ExperienceCard } from '@/components/sections/ExperienceCard';
import { ArrowRight, Compass, Users, Sparkles } from 'lucide-react';

// Disable caching to always fetch fresh data from database
export const dynamic = 'force-dynamic';

interface Experience {
  title: string;
  description: string;
  image: string | null;
  altText: string;
}

export default async function ExperiencesPage() {
  // Fetch all images from CMS - no fallbacks
  const [heroImg, safariImg, coastalImg, mountainImg] = await Promise.all([
    getCMSImage('experiences-hero'),
    getCMSImage('experience-safari'),
    getCMSImage('experience-coastal'),
    getCMSImage('experience-mountain'),
  ]);

  const allExperiences: Experience[] = [
    {
      title: "Safari Escapes",
      description: "Wake to golden light across vast savannahs and the rhythm of the wild at your doorstep. Our safari experiences balance adventure and tranquility — intimate camps, exceptional guides, and evenings beneath a sky of endless stars.",
      image: safariImg?.url || null,
      altText: safariImg?.altText || "Safari Escapes",
    },
    {
      title: "Coastal Retreats",
      description: "Along coastlines, we curate stays that blend barefoot luxury with timeless charm. Drift through warm days and ocean breezes from the soulful stillness of the elegant shores.",
      image: coastalImg?.url || null,
      altText: coastalImg?.altText || "Coastal Retreats",
    },
    {
      title: "Mountain & Cabin Getaways",
      description: "In the highlands and forests, find peace in simplicity. Our curated cabins and lodges offer quiet refuge — a place to slow down, breathe deeply, and reconnect with nature's rhythm.",
      image: mountainImg?.url || null,
      altText: mountainImg?.altText || "Mountain & Cabin Getaways",
    },
  ];

  // Filter to only show experiences with uploaded images
  const experiences = allExperiences.filter((exp) => exp.image !== null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {heroImg?.url ? (
            <Image
              src={heroImg.url}
              alt={heroImg.altText || "Signature Experiences"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] via-[#8B7355] to-[#A69580]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight drop-shadow-lg">
            Signature Experiences
            <br />
            <span className="text-white/90">Travel with Intention</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Each journey is thoughtfully curated to reflect a refined sense of place and the beauty of slow discovery.
          </p>
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2EB] to-transparent" />
      </section>

      {/* Experiences Grid */}
      {experiences.length > 0 && (
        <section className="py-24 px-6 md:px-16 text-center bg-[#F5F2EB]">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#333232]">Our Signature Escapes</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[#6F655C]/80 max-w-2xl mx-auto mb-16">
              Discover extraordinary destinations that speak to your soul
            </p>
          </ScrollReveal>
          
          <div className={`grid grid-cols-1 ${experiences.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-10 max-w-6xl mx-auto`}>
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.title}
                title={exp.title}
                description={exp.description}
                image={exp.image!}
                altText={exp.altText}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {/* Retreats */}
      <section className="py-24 px-6 md:px-16 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5F2EB]/50 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5F2EB]/50 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F5F2EB] flex items-center justify-center">
              <Users className="w-8 h-8 text-[#6F655C]" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#333232]">
              Curated Retreats & Gatherings
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#6F655C]/80 leading-relaxed">
              We design intentional spaces for connection — whether a wellness retreat, a creative escape, or an intimate celebration shared among friends.
            </p>
            <p className="text-lg md:text-xl text-[#6F655C]/80 leading-relaxed mt-4">
              Every gathering is crafted with purpose, style, and care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Custom Journeys */}
      <section className="py-24 px-6 md:px-16 text-center bg-[#F5F2EB] relative">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
              <Compass className="w-8 h-8 text-[#6F655C]" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#333232]">Custom Journeys</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#6F655C]/80 leading-relaxed mb-4">
              Every traveler is different. Every journey, a new story.
            </p>
            <p className="text-lg md:text-xl text-[#6F655C]/80 leading-relaxed mb-10">
              Tell us what inspires you, and we&apos;ll craft a bespoke itinerary that reflects your vision.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Link 
              href="/contact-options" 
              className="group inline-flex items-center gap-3 bg-white text-[#6F655C] px-8 py-4 rounded-full font-medium border border-[#ece7df] hover:bg-[#6F655C] hover:text-white hover:border-[#6F655C] transition-all duration-300 hover:shadow-lg"
            >
              Start Planning
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5F2EB]/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <Sparkles className="w-10 h-10 mx-auto mb-6 text-[#6F655C]" />
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#333232]">
              Your next escape awaits.
            </h2>
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
