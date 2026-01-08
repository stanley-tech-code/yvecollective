import { getCMSImage } from '@/lib/cms';

export async function ExperiencesPageContent() {
  const heroImage = await getCMSImage('experiences-hero');
  const safariImg = await getCMSImage('experience-safari');
  const coastalImg = await getCMSImage('experience-coastal');
  const mountainImg = await getCMSImage('experience-mountain');

  return (
    <ExperiencesPageClient
      heroImage={heroImage?.url}
      safariImg={safariImg?.url}
      coastalImg={coastalImg?.url}
      mountainImg={mountainImg?.url}
    />
  );
}

// Client component
import { ExperiencesPageClient } from './ExperiencesPageClient';
