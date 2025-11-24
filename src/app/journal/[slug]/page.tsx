import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { journalPosts } from '@/data/journal';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function JournalPost({ params }: { params: { slug: string } }) {
  const post = journalPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl text-white mb-4 font-serif">{post.title}</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl">
            {post.subtitle}
          </p>
        </div>
      </section>

      {/* Article */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 lg:px-0 py-20 space-y-20">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="leading-relaxed text-lg text-[#6F655C]">
            {post.intro}
          </p>
        </div>

        {/* Sections */}
        {post.sections.map((section, index) => (
          <div key={index} className={cn("grid md:grid-cols-2 gap-10 items-center", section.reverse && "md:flex-row-reverse")}>
            <div className="relative h-[340px] w-full">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="rounded-xl shadow-md object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-4 text-[#6F655C]">{section.title}</h2>
              <p className="leading-relaxed text-lg text-[#6F655C]">
                {section.content}
              </p>
            </div>
          </div>
        ))}

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {post.gallery.map((img, index) => (
            <div key={index} className="relative h-64 w-full">
              <Image
                src={img}
                alt={`Gallery image ${index + 1}`}
                fill
                className="rounded-lg shadow object-cover"
              />
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4 text-[#6F655C]">{post.conclusion.title}</h2>
          <p className="leading-relaxed text-lg text-[#6F655C]">
            {post.conclusion.content}
          </p>
        </div>

        {/* Final Image */}
        <div className="relative h-[420px] w-full">
          <Image
            src={post.conclusion.image}
            alt="Conclusion"
            fill
            className="object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="text-center mt-10">
          <Link href="/journal" className="inline-block text-[#6F655C] hover:text-white bg-transparent hover:bg-[#6F655C] px-8 py-3 rounded-full border border-[#6F655C] transition">
            ← Back to Journal
          </Link>
        </div>
      </section>
    </>
  );
}
