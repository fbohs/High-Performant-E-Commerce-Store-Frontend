import Link from 'next/link'
import type { FooterSection } from '@/constants/footerNav'

interface FooterLinkColumnProps {
  readonly section: FooterSection
}

export const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({ section }) => (
  <div>
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
      {section.title}
    </h3>
    <ul className="flex flex-col gap-2">
      {section.links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:underline"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
