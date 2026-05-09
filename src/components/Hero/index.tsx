import { CategoryFilter } from '@/components/Hero/CategoryFilter'
import { HeroCarousel } from '@/components/Hero/HeroCarousel'
import { PromotionBanner } from '@/components/Hero/PromotionBanner'
import { HERO_SLIDES } from '@/constants/heroSlides'

export const Hero: React.FC = () => (
  <section aria-label="Hero" className="flex flex-col gap-8 md:gap-10">
    <HeroCarousel slides={HERO_SLIDES} />

    <div className="mx-auto w-full max-w-7xl md:px-4">
      <CategoryFilter />
    </div>

    <div className="mx-auto w-full max-w-7xl px-4">
      <PromotionBanner />
    </div>
  </section>
)
