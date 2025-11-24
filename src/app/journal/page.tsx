import Image from 'next/image';
import Link from 'next/link';

const posts = [
  {
    slug: "amboseli-at-dawn",
    title: "Amboseli at Dawn The Soul of the Savannah",
    excerpt: "A quiet morning wrapped in golden light, wandering elephants, and the timeless rhythm of the plains.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "designing-perfect-beach-retreat",
    title: "Designing the Perfect Beach Retreat",
    excerpt: "From location choice to intention setting, here's how we shape meaningful travel experiences.",
    image: "https://i.ibb.co/RpnRMML3/IMG-4354.jpg",
  },
  {
    slug: "guide-to-cape-town",
    title: "A Guide to Cape town Hidden Escapes",
    excerpt: "Curated retreats for travelers seeking quiet luxury, intimate stays, and unforgettable hideaways.",
    image: "https://i.ibb.co/LHbd1r0/IMG-8249-1.jpg",
  },
];

export default function JournalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center text-center pt-20 md:pt-0">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://i.ibb.co/ksz5ZFvT/IMG-4377.jpg"
            alt="Journal Inspiration"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-white/25"></div>
        <div className="relative z-10 px-6 mt-10 md:mt-0">
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-snug">
            Journal / Inspiration
          </h2>
          <p className="mt-3 text-sm md:text-xl text-white/90 max-w-xl mx-auto leading-relaxed md:leading-relaxed md:max-w-2xl">
            Stories, travel notes & soulful reflections from our journeys across hidden landscapes and intentional escapes.
          </p>
        </div>
      </section>

      {/* Journal Articles */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-3 text-[#6F655C]">{post.title}</h3>
                <p className="text-[#6F655C]/90 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link href={`/journal/${post.slug}`} className="text-[#6F655C] hover:text-white bg-transparent hover:bg-[#6F655C] px-4 py-2 rounded-full border border-[#6F655C] inline-block transition">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
