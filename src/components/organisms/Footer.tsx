import Link from 'next/link'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { FOOTER_SECTIONS, LEGAL_LINKS } from '@/constants/footerNav'
import { FooterLinkColumn } from '@/components/molecules/FooterLinkColumn'
import { NewsletterSignup } from '@/components/molecules/NewsletterSignup'
import { PaymentMethods } from '@/components/molecules/PaymentMethods'
import { SocialLinks } from '@/components/molecules/SocialLinks'

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="ShopHub home"
              className="flex items-center gap-2 text-inherit no-underline"
            >
              <ShoppingBagIcon />
              <span className="text-xl font-bold tracking-tight">ShopHub</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-300">
              Curated essentials and everyday finds, shipped fast across the globe.
            </p>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8"
          >
            {FOOTER_SECTIONS.map((section) => (
              <FooterLinkColumn key={section.title} section={section} />
            ))}
          </nav>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SocialLinks />
          <PaymentMethods />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-gray-400 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {year} ShopHub, Inc. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white focus:outline-none focus-visible:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
