export interface HeroSlide {
  readonly id: string
  readonly eyebrow: string
  readonly headline: string
  readonly subheadline: string
  readonly ctaLabel: string
  readonly ctaHref: string
  readonly bgClassName: string
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 'summer-collection',
    eyebrow: 'Limited time',
    headline: 'Summer Collection 2026',
    subheadline: "Up to 40% off the season's freshest picks. Free returns.",
    ctaLabel: 'Shop the sale',
    ctaHref: '/deals',
    bgClassName: 'bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600',
  },
  {
    id: 'electronics-launch',
    eyebrow: 'New arrivals',
    headline: 'Tech that fits your life',
    subheadline: 'Latest drops from your favourite brands. Free shipping on $50+.',
    ctaLabel: 'Explore electronics',
    ctaHref: '/category/electronics',
    bgClassName: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700',
  },
  {
    id: 'home-essentials',
    eyebrow: 'For the home',
    headline: 'Refresh your space',
    subheadline: 'Cozy textiles, smart kitchen finds, and statement décor.',
    ctaLabel: 'Browse home',
    ctaHref: '/category/home-kitchen',
    bgClassName: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900',
  },
]
