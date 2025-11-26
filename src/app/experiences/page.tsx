import Image from 'next/image';
import Link from 'next/link';
import { getCMSImage } from '@/lib/cms';

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
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
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
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#8B7355]" />
          )}
        </div>
        <div className="absolute inset-0 bg-[#6F655C]/30 backdrop-blur-sm"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Signature Experiences<br />
            <span className="text-white/90">Travel with Intention</span>
          </h2>
        </div>
      </section>

      {/* Experiences Grid */}
      {experiences.length > 0 && (
        <section className="py-20 px-6 md:px-16 text-center">
          <h3 className="text-3xl md:text-4xl font-serif mb-12 text-black">Our Signature Escapes</h3>
          <div className={`grid grid-cols-1 ${experiences.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-10 max-w-6xl mx-auto`}>
            {experiences.map((exp) => (
              <div key={exp.title} className="bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={exp.image!}
                    alt={exp.altText}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-serif mb-3 text-[#6F655C]">{exp.title}</h4>
                  <p className="text-[#6F655C]/80 leading-relaxed text-left">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Retreats */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif mb-6 text-black">Curated Retreats & Gatherings</h3>
          <p className="text-lg text-[#6F655C]/80 leading-relaxed">
            We design intentional spaces for connection — whether a wellness retreat, a creative escape, or an intimate celebration shared among friends.<br /><br />
            Every gathering is crafted with purpose, style, and care.
          </p>
        </div>
      </section>

      {/* Custom */}
      <section className="py-20 px-6 md:px-16 text-center bg-[#F5F2EB]">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif mb-6 text-black">Custom Journeys</h3>
          <p className="text-lg text-[#6F655C]/80 leading-relaxed mb-8">
            Every traveler is different. Every journey, a new story.<br /><br />
            Tell us what inspires you, and we&apos;ll craft a bespoke itinerary that reflects your vision.
          </p>
          <Link href="/contact-options" className="bg-white text-[#6F655C] px-8 py-3 rounded-full font-medium border border-[#ece7df] hover:bg-[#EAE6DD] transition inline-block">
            Start Planning
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-3xl md:text-4xl font-serif mb-6 text-black">Your next escape awaits.</h3>
        <Link href="/contact-options" className="bg-[#F5F2EB] text-[#6F655C] px-8 py-3 rounded-full font-medium hover:bg-[#EAE6DD] transition inline-block">
          Get in Touch
        </Link>
      </section>
    </>
  );
}
