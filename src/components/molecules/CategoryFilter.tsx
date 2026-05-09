import Link from 'next/link'
import { CATEGORY_TILES } from '@/constants/categoryTiles'

export const CategoryFilter: React.FC = () => (
  <section aria-labelledby="categories-heading">
    <h2 id="categories-heading" className="sr-only">
      Shop by category
    </h2>
    <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-8 [&::-webkit-scrollbar]:hidden">
      {CATEGORY_TILES.map((c) => (
        <li key={c.slug} className="shrink-0 snap-start md:shrink">
          <Link
            href={`/category/${c.slug}`}
            className="flex h-[88px] w-[88px] flex-col items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white px-2 text-center shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 md:h-auto md:w-auto md:py-4"
          >
            <span aria-hidden className="text-2xl md:text-3xl">
              {c.emoji}
            </span>
            <span className="text-xs font-medium text-gray-700 md:text-sm">
              {c.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)
