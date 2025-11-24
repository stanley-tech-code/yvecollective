import Link from 'next/link';

export function CTA() {
  return (
    <section id="contact" className="py-20 bg-white text-center text-[#6F655C]">
      <h3 className="text-3xl md:text-4xl font-serif mb-6">
        Wherever your journey leads, we’ll curate the experience.
      </h3>
      <Link
        href="/contact-options"
        className="bg-[#F5F2EB] text-[#6F655C] px-8 py-3 rounded-full font-medium hover:bg-[#F0EDE5] transition inline-block"
      >
        Get in Touch
      </Link>
    </section>
  );
}
