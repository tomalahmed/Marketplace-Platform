import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturedPromptsSection from "@/components/landing/FeaturedPromptsSection";
import BrowseCategoriesSection from "@/components/landing/BrowseCategoriesSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SupportedAiToolsSection from "@/components/landing/SupportedAiToolsSection";
import PremiumTeaserSection from "@/components/landing/PremiumTeaserSection";
import TopCreatorsSection from "@/components/landing/TopCreatorsSection";
import CustomerReviewsSection from "@/components/landing/CustomerReviewsSection";
import CtaSection from "@/components/landing/CtaSection";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-10">
      <HeroSection />
      <StatsSection />
      <FeaturedPromptsSection />
      <BrowseCategoriesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <SupportedAiToolsSection />
      <PremiumTeaserSection />
      <TopCreatorsSection />
      <CustomerReviewsSection />
      <CtaSection />
    </div>
  );
}
