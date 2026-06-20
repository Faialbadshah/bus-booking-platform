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
import MobileBookingBar from '@/components/MobileBookingBar';

export default function Home() {
  const { brand, tokens, stats, trust, doctors, procedures, testimonials, faq } = clinic;

  return (
    <>
      <StickyHeader name={brand.name} logoUrl={tokens.logoUrl} phone={brand.phone} />

      <main>
        <HeroSection brand={brand} featuredProcedure={procedures[0]} stats={stats} />
        <ProblemScannerGrid procedures={procedures} phone={brand.phone} />
        <ProofStrip brand={brand} procedures={procedures} stats={stats} testimonials={testimonials} />
        <WhyClinicSection trust={trust} clinicName={brand.name} />
        <DoctorsSection doctors={doctors} />
        <HowItWorksSection />
        <FaqSection faq={faq} />
        <BookingBlock brand={brand} />
      </main>

      <Footer brand={brand} logoUrl={tokens.logoUrl} />

      {/* Sticky mobile CTA — shows after hero, hides near #book */}
      <MobileBookingBar phone={brand.phone} clinicName={brand.name} />
    </>
  );
}
