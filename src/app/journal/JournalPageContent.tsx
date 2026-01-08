import { getCMSImage } from '@/lib/cms';

export async function JournalPageContent() {
  const heroImage = await getCMSImage('journal-hero');

  return (
    <JournalPageClient
      heroImage={heroImage?.url}
    />
  );
}

// Client component
import { JournalPageClient } from './JournalPageClient';
