import { getCMSImage } from '@/lib/cms';
import { HeroClient } from './HeroClient';

export async function Hero() {
  // Fetch dynamic images from CMS - no fallbacks
  const [slide1, slide2, slide3, slide4, slide5] = await Promise.all([
    getCMSImage('hero-slide-1'),
    getCMSImage('hero-slide-2'),
    getCMSImage('hero-slide-3'),
    getCMSImage('hero-slide-4'),
    getCMSImage('hero-slide-5'),
  ]);

  // Filter out undefined slides - only show uploaded images
  const slides = [slide1, slide2, slide3, slide4, slide5]
    .filter((slide): slide is { url: string; altText: string } => slide !== null && !!slide.url)
    .map((slide) => ({ url: slide.url, altText: slide.altText }));

  return <HeroClient slides={slides} />;
}
