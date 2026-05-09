'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import type { HeroSlide } from '@/constants/heroSlides'

interface HeroCarouselProps {
  readonly slides: readonly HeroSlide[]
  readonly autoPlayMs?: number
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoPlayMs = 6000,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const total = slides.length
      const next = ((index % total) + total) % total
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
    },
    [slides.length],
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (paused || autoPlayMs <= 0 || slides.length <= 1) return
    const id = window.setInterval(() => next(), autoPlayMs)
    return () => window.clearInterval(id)
  }, [paused, autoPlayMs, slides.length, next])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const idx = Math.round(track.scrollLeft / track.clientWidth)
        setActiveIndex(idx)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      className="relative isolate"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div
        ref={trackRef}
        className="flex h-[60vw] max-h-[28rem] min-h-[16rem] snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] md:h-[42vw] md:max-h-[32rem] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <article
              key={slide.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.headline}`}
              aria-hidden={!isActive}
              className={`relative flex w-full shrink-0 snap-start items-end ${slide.bgClassName}`}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
              />
              <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 text-white md:px-8 md:py-12">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/80 md:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                    {slide.headline}
                  </h2>
                  <p className="mt-2 text-sm md:text-lg">{slide.subheadline}</p>
                  <Link
                    href={slide.ctaHref}
                    tabIndex={isActive ? 0 : -1}
                    className="mt-4 inline-flex min-h-11 items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-md transition-transform hover:scale-[1.02] hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 md:text-base"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-900 shadow-md backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-900 shadow-md backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
      >
        <ChevronRightIcon />
      </button>

      <div
        role="tablist"
        aria-label="Slide navigation"
        className="absolute inset-x-0 bottom-1 flex justify-center"
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="grid h-11 w-11 place-items-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                aria-hidden
                className={`h-2.5 rounded-full transition-all ${
                  isActive ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/90'
                }`}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
