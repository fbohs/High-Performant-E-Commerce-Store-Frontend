import { CategoryFilter } from '@/components/molecules/CategoryFilter'
import { HeroCarousel } from '@/components/molecules/HeroCarousel'
import { PromotionBanner } from '@/components/molecules/PromotionBanner'
import { SearchBar } from '@/components/molecules/SearchBar'
import { HERO_SLIDES } from '@/constants/heroSlides'

export const Hero: React.FC = () => (
  <section aria-label="Hero" className="flex flex-col gap-8 md:gap-10">
    <HeroCarousel slides={HERO_SLIDES} />

    <div className="px-4">
      <div className="mx-auto w-full max-w-3xl">
        <SearchBar />
      </div>
    </div>

    <div className="mx-auto w-full max-w-7xl md:px-4">
      <CategoryFilter />
    </div>

    <div className="mx-auto w-full max-w-7xl px-4">
      <PromotionBanner />
    </div>
  </section>
)
