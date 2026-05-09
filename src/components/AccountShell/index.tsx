'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'

interface NavItem {
  readonly href: string
  readonly label: string
  readonly icon: React.ReactNode
  // When true, the link is active for any URL that starts with `href` —
  // used for /account so /account/change-password also keeps Account selected.
  readonly matchPrefix?: boolean
}

const NAV: readonly NavItem[] = [
  {
    href: '/account',
    label: 'Account',
    icon: <PersonOutlineIcon fontSize="small" />,
    matchPrefix: true,
  },
  {
    href: '/orders',
    label: 'Orders',
    icon: <ReceiptLongOutlinedIcon fontSize="small" />,
  },
  {
    href: '/wishlist',
    label: 'Wishlist',
    icon: <FavoriteBorderIcon fontSize="small" />,
  },
  {
    href: '/addresses',
    label: 'Addresses',
    icon: <LocationOnOutlinedIcon fontSize="small" />,
  },
]

const linkClass = (active: boolean): string =>
  [
    'flex min-h-10 items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition',
    active
      ? 'bg-amber-100 text-amber-900'
      : 'text-gray-700 hover:bg-gray-100',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
  ].join(' ')

export const AccountShell: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname() ?? ''

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
      <aside>
        <nav aria-label="Account sections">
          <ul className="-mx-1 flex flex-row gap-1 overflow-x-auto px-1 md:flex-col md:overflow-visible">
            {NAV.map((item) => {
              const active = item.matchPrefix
                ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                : pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={linkClass(active)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  )
}
