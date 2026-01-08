'use client';

import Image from 'next/image';
import Link from 'next/link';

interface AboutPageClientProps {
  heroImage?: string;
}

export function AboutPageClient({ heroImage }: AboutPageClientProps) {
  if (!heroImage) {
    return (
      <>
        {/* Our Story */}
        <section className="py-20 px-6 md:px-20 bg-[#F5F2EB] text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-serif mb-6 text-[#333232]">Our Story</h3>
            <p className="text-lg leading-relaxed text-[#333232]">Yve Collective was founded from a love for beautiful spaces and the desire to travel with meaning.</p>
            <p className="text-lg leading-relaxed mt-6 text-[#333232]">We believe that true luxury lies in authenticity, in unhurried moments, natural beauty, and the quiet comfort of well-chosen details.</p>
            <p className="text-lg leading-relaxed mt-6 text-[#333232]">Each experience we craft is guided by a sense of place and purpose. Whether you&apos;re seeking solitude in the wild, connection with loved ones, or the warmth of community through curated retreats, Yve Collective creates journeys that linger long after you&apos;ve returned home.</p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 md:px-20 bg-white text-center">
          <h3 className="text-3xl md:text-4xl font-serif mb-12 text-[#333232]">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl bg-white text-[#333232] border border-[#6F655C]/10">🌿</div>
              <h4 className="text-xl font-serif mb-2 text-[#333232]">Authenticity</h4>
              <p className="max-w-xs text-[#333232]/80">Every destination we feature has been personally experienced and chosen for its genuine charm and soul.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl bg-white text-[#333232] border border-[#6F655C]/10">🤍</div>
              <h4 className="text-xl font-serif mb-2 text-[#333232]">Connection</h4>
              <p className="max-w-xs text-[#333232]/80">We design journeys that nurture meaningful encounters and shared experiences.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl bg-white text-[#333232] border border-[#6F655C]/10">✨</div>
              <h4 className="text-xl font-serif mb-2 text-[#333232]">Curation</h4>
              <p className="max-w-xs text-[#333232]/80">Every detail, from landscape to lodging, is thoughtfully selected to reflect elegance and ease.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-center text-[#333232]">
          <h3 className="text-3xl md:text-4xl font-serif mb-6">Yve Collective where travel meets intention.</h3>
          <Link href="/contact-options" className="bg-[#F5F2EB] text-[#6F655C] px-8 py-3 rounded-full font-medium hover:bg-white transition inline-block">
            Get in Touch
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroImage}
            alt="About Yve Collective"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-white/25"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-black">
            Intentional Travel.<br /> Inspired Living.<br />
            <span className="text-[#333232]">The Collective Spirit.</span>
          </h2>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-20 bg-[#F5F2EB] text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif mb-6 text-[#333232]">Our Story</h3>
          <p className="text-lg leading-relaxed text-[#333232]">Yve Collective was founded from a love for beautiful spaces and the desire to travel with meaning.</p>
          <p className="text-lg leading-relaxed mt-6 text-[#333232]">We believe that true luxury lies in authenticity, in unhurried moments, natural beauty, and the quiet comfort of well-chosen details.</p>
          <p className="text-lg leading-relaxed mt-6 text-[#333232]">Each experience we craft is guided by a sense of place and purpose. Whether you’re seeking solitude in the wild, connection with loved ones, or the warmth of community through curated retreats, Yve Collective creates journeys that linger long after you’ve returned home.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-20 bg-white text-center">
        <h3 className="text-3xl md:text-4xl font-serif mb-12 text-[#333232]">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl bg-white text-[#333232] border border-[#6F655C]/10">🌿</div>
            <h4 className="text-xl font-serif mb-2 text-[#333232]">Authenticity</h4>
            <p className="max-w-xs text-[#333232]/80">Every destination we feature has been personally experienced and chosen for its genuine charm and soul.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl bg-white text-[#333232] border border-[#6F655C]/10">🤍</div>
            <h4 className="text-xl font-serif mb-2 text-[#333232]">Connection</h4>
            <p className="max-w-xs text-[#333232]/80">We design journeys that nurture meaningful encounters and shared experiences.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl bg-white text-[#333232] border border-[#6F655C]/10">✨</div>
            <h4 className="text-xl font-serif mb-2 text-[#333232]">Curation</h4>
            <p className="max-w-xs text-[#333232]/80">Every detail, from landscape to lodging, is thoughtfully selected to reflect elegance and ease.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center text-[#333232]">
        <h3 className="text-3xl md:text-4xl font-serif mb-6">Yve Collective where travel meets intention.</h3>
        <Link href="/contact-options" className="bg-[#F5F2EB] text-[#6F655C] px-8 py-3 rounded-full font-medium hover:bg-white transition inline-block">
          Get in Touch
        </Link>
      </section>
    </>
  );
}
