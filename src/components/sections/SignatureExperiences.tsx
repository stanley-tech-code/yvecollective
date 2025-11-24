import Image from 'next/image';

const experiences = [
  {
    title: "Safari Escapes",
    description: "A return to the wild, where comfort meets adventure under endless skies.",
    image: "https://soroi.com/wp-content/uploads/2025/02/Leopards-Lair.jpg",
  },
  {
    title: "Coastal Retreats",
    description: "Serenity by the sea; sun-drenched days, soft breezes, and unhurried living.",
    image: "https://azuravilla.com/wp-content/uploads/2023/10/887A3435-jpg.webp",
  },
  {
    title: "Mountain & Cabin Getaways",
    description: "Immersed in nature, surrounded by stillness and fresh open air.",
    image: "https://forrestnaromoru.com/wp-content/uploads/2018/07/DSC00464-scaled.jpg",
  },
  {
    title: "Curated Group Retreats",
    description: "Thoughtfully designed gatherings that bring people together in extraordinary ways.",
    image: "https://bookretreats.com/cdn-cgi/image/width=1200,quality=65,f=auto,sharpen=1,fit=cover,gravity=auto/assets/photo/retreat/0m/60k/60444/p_2248707/1000_1760309551.jpg",
  },
];

export function SignatureExperiences() {
  return (
    <section id="experiences" className="py-20 px-6 md:px-16 text-center">
      <h3 className="text-3xl md:text-4xl font-serif mb-12 text-black">Signature Experiences</h3>
      <p className="max-w-3xl mx-auto mb-12 text-[#6F655C]/90">
        At Yve Collective, we believe travel should feel intentional, calm, inspired, and deeply personal. From private safaris to boutique retreats, every journey is thoughtfully curated to reflect a refined sense of place and the beauty of slow discovery.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {experiences.map((exp) => (
          <div key={exp.title} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
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
