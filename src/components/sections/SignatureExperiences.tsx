import Image from 'next/image';
import { getCMSImage } from '@/lib/cms';

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
    <section id="experiences" className="py-20 px-6 md:px-16 text-center">
      <h3 className="text-3xl md:text-4xl font-serif mb-12 text-black">Signature Experiences</h3>
      <p className="max-w-3xl mx-auto mb-12 text-[#6F655C]/90">
        At Yve Collective, we believe travel should feel intentional, calm, inspired, and deeply personal. From private safaris to boutique retreats, every journey is thoughtfully curated to reflect a refined sense of place and the beauty of slow discovery.
      </p>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${experiences.length >= 4 ? 'lg:grid-cols-4' : experiences.length === 3 ? 'lg:grid-cols-3' : ''} gap-8`}>
        {experiences.map((exp) => (
          <div key={exp.title} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src={exp.image!}
                alt={exp.altText}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <h4 className="text-xl font-serif mt-4 mb-2 text-[#6F655C]">{exp.title}</h4>
            <p className="text-[#6F655C]/80 px-4 pb-4">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
