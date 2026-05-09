import { HeroCarousel } from '@/components/molecules/HeroCarousel'
import { HERO_SLIDES } from '@/constants/heroSlides'
import { PromotionBanner } from '@/components/molecules/PromotionBanner'
import { CategoryFilter } from '@/components/molecules/CategoryFilter'

export default function HomePage() {
  return (
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
}
