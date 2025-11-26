import Image from 'next/image';
import { prisma } from '@/lib/db';
import { getCMSImage } from '@/lib/cms';
import { JournalCard } from '@/components/sections/JournalCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { BookOpen } from 'lucide-react';

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
      <section className="relative h-[65vh] flex items-center justify-center text-center pt-20 md:pt-0 overflow-hidden">
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
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] via-[#8B7355] to-[#A69580]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight drop-shadow-lg">
            Journal
            <span className="block text-white/90 text-3xl md:text-4xl lg:text-5xl mt-2">& Inspiration</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Stories, travel notes & soulful reflections from our journeys across hidden landscapes and intentional escapes.
          </p>
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2EB] to-transparent" />
      </section>

      {/* Journal Articles */}
      <section className="py-24 px-6 md:px-16 bg-[#F5F2EB]">
        {posts.length > 0 ? (
          <>
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#333232] mb-4">Latest Stories</h2>
              <p className="text-[#6F655C]/70 max-w-xl mx-auto">
                Explore our collection of travel stories and curated experiences
              </p>
            </ScrollReveal>
            
            <div className={`max-w-6xl mx-auto grid grid-cols-1 ${posts.length >= 3 ? 'md:grid-cols-3' : posts.length === 2 ? 'md:grid-cols-2' : ''} gap-10`}>
              {posts.map((post, index) => (
                <JournalCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  thumbnailImage={post.thumbnailImage}
                  index={index}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-16">
            <ScrollReveal>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-[#6F655C]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#333232] mb-4">
                Stories Coming Soon
              </h2>
              <p className="text-[#6F655C]/70 text-lg">
                We&apos;re crafting beautiful travel stories and inspiration for you. Check back soon for our latest journal entries.
              </p>
            </ScrollReveal>
          </div>
        )}
      </section>
    </>
  );
}
