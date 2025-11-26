import { Hero } from "@/components/sections/Hero";
import { SignatureExperiences } from "@/components/sections/SignatureExperiences";
import { CTA } from "@/components/sections/CTA";

// Disable caching to always fetch fresh data from database
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <SignatureExperiences />
      <CTA />
    </>
  );
}
