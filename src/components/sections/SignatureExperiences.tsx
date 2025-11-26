import { getCMSImage } from '@/lib/cms';
import { ExperienceCard } from './ExperienceCard';
import { ScrollReveal } from '../animations/ScrollReveal';

interface Experience {
  title: string;
  description: string;
  image: string | null;
  altText: string;
}

export async function SignatureExperiences() {
  // Fetch images from CMS - no fallbacks
  const [safariImg, coastalImg, mountainImg, groupImg] = await Promise.all([
    getCMSImage('experience-safari'),
    getCMSImage('experience-coastal'),
    getCMSImage('experience-mountain'),
    getCMSImage('experience-group'),
  ]);

  const allExperiences: Experience[] = [
    {
      title: "Safari Escapes",
      description: "A return to the wild, where comfort meets adventure under endless skies.",
      image: safariImg?.url || null,
      altText: safariImg?.altText || "Safari Escapes",
    },
    {
      title: "Coastal Retreats",
      description: "Serenity by the sea; sun-drenched days, soft breezes, and unhurried living.",
      image: coastalImg?.url || null,
      altText: coastalImg?.altText || "Coastal Retreats",
    },
    {
      title: "Mountain & Cabin Getaways",
      description: "Immersed in nature, surrounded by stillness and fresh open air.",
      image: mountainImg?.url || null,
      altText: mountainImg?.altText || "Mountain & Cabin Getaways",
    },
    {
      title: "Curated Group Retreats",
      description: "Thoughtfully designed gatherings that bring people together in extraordinary ways.",
      image: groupImg?.url || null,
      altText: groupImg?.altText || "Curated Group Retreats",
    },
  ];

  // Filter to only show experiences with uploaded images
  const experiences = allExperiences.filter((exp) => exp.image !== null);

  // Don't render section if no experiences have images
  if (experiences.length === 0) {
    return null;
  }

  return (
    <section id="experiences" className="py-24 px-6 md:px-16 text-center bg-[#F5F2EB]">
      <ScrollReveal>
        <h3 className="text-3xl md:text-5xl font-serif mb-6 text-[#333232]">
          Signature Experiences
        </h3>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <p className="max-w-3xl mx-auto mb-16 text-lg text-[#6F655C]/90 leading-relaxed">
          At Yve Collective, we believe travel should feel intentional, calm, inspired, and deeply personal. From private safaris to boutique retreats, every journey is thoughtfully curated to reflect a refined sense of place and the beauty of slow discovery.
        </p>
      </ScrollReveal>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 ${experiences.length >= 4 ? 'lg:grid-cols-4' : experiences.length === 3 ? 'lg:grid-cols-3' : ''} gap-8 max-w-7xl mx-auto`}>
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
  );
}
