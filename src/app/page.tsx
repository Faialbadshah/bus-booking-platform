import { clinic } from '@/data/clinic.config';
import StickyHeader from '@/components/StickyHeader';
import HeroSection from '@/components/HeroSection';
import ProblemScannerGrid from '@/components/ProblemScannerGrid';
import ProofStrip from '@/components/ProofStrip';
import WhyClinicSection from '@/components/WhyClinicSection';
import DoctorsSection from '@/components/DoctorsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FaqSection from '@/components/FaqSection';
import BookingBlock from '@/components/BookingBlock';
import Footer from '@/components/Footer';

// Everything renders from clinic.config.ts — no clinic content is hardcoded here.
export default function Home() {
  const { brand, tokens, trust, doctors, procedures, faq } = clinic;

  return (
    <>
      <StickyHeader name={brand.name} logoUrl={tokens.logoUrl} phone={brand.phone} />

      <main>
        {/* 1. Hero — image-led, before/after + headline + CTA */}
        <HeroSection brand={brand} featuredProcedure={procedures[0]} />

        {/* 2. ★ Signature: Problem-Scanner Grid — patient points at their concern */}
        <ProblemScannerGrid procedures={procedures} phone={brand.phone} />

        {/* 3. Proof strip — before/after gallery + review count */}
        <ProofStrip brand={brand} procedures={procedures} />

        {/* 4. Why this clinic — trust cards */}
        <WhyClinicSection trust={trust} clinicName={brand.name} />

        {/* 5. The doctors */}
        <DoctorsSection doctors={doctors} />

        {/* 6. How it works */}
        <HowItWorksSection />

        {/* 7. FAQ — cost, pain, time */}
        <FaqSection faq={faq} />

        {/* 8. Booking block */}
        <BookingBlock brand={brand} />
      </main>

      {/* 9. Footer — map, hours, address, phone */}
      <Footer brand={brand} logoUrl={tokens.logoUrl} />
    </>
  );
}
