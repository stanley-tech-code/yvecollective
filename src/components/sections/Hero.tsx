import { getCMSImage } from '@/lib/cms';

export async function Hero() {
  // Fetch dynamic images or fall back to defaults
  const slide1 = await getCMSImage('hero-slide-1');
  const slide2 = await getCMSImage('hero-slide-2');
  const slide3 = await getCMSImage('hero-slide-3');
  const slide4 = await getCMSImage('hero-slide-4');
  const slide5 = await getCMSImage('hero-slide-5');

  const slides = [
    slide1?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    slide2?.url || "https://assets.micontenthub.com/traveloffers/travel-tips/rabat_3Z4Gi9csM.jpg",
    slide3?.url || "https://nataniatravel.com/wp-content/uploads/2023/09/Dubai-Desert-Safari-ft-1030x562.jpg",
    slide4?.url || "https://i.ibb.co/vx9Bpk4g/IMG-4296.jpg",
    slide5?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  ];

  return <HeroClient slides={slides} />;
}

// Client component for interactivity
import { HeroClient } from './HeroClient';
