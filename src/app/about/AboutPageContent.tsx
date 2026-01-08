import { getCMSImage } from '@/lib/cms';

export async function AboutPageContent() {
  const heroImage = await getCMSImage('about-hero');

  return (
    <AboutPageClient
      heroImage={heroImage?.url}
    />
  );
}

// Client component
import { AboutPageClient } from './AboutPageClient';
