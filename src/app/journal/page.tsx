import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getCMSImage } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function JournalPage() {
  // Fetch hero image and published posts from database
  const [heroImg, posts] = await Promise.all([
    getCMSImage('journal-hero'),
    prisma.journalPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        thumbnailImage: true,
      },
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center text-center pt-20 md:pt-0">
        <div className="absolute inset-0 w-full h-full">
          {heroImg?.url ? (
            <Image
              src={heroImg.url}
              alt={heroImg.altText || "Journal Inspiration"}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#8B7355]" />
          )}
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
        {posts.length > 0 ? (
          <div className={`max-w-6xl mx-auto grid grid-cols-1 ${posts.length >= 3 ? 'md:grid-cols-3' : posts.length === 2 ? 'md:grid-cols-2' : ''} gap-10`}>
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  {post.thumbnailImage ? (
                    <Image
                      src={post.thumbnailImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#8B7355]" />
                  )}
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
        ) : (
          <div className="max-w-6xl mx-auto text-center py-12">
            <p className="text-[#6F655C]/70 text-lg">No journal posts yet. Check back soon for travel stories and inspiration.</p>
          </div>
        )}
      </section>
    </>
  );
}
