'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Collapse, Drawer } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import { ACCOUNT_LINKS } from '@/constants/accountLinks'
import { CATEGORY_TREE } from '@/constants/categoryTree'
import { signOutAndRevoke } from '@/services/auth'
import { useAuthStore } from '@/stores/useAuthStore'

const DRAWER_ID = 'mobile-nav-drawer'
const ACCOUNT_SECTION_ID = 'mobile-nav-account-section'

export const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const [accountOpen, setAccountOpen] = useState(false)
  const user = useAuthStore((s) => s.user)

  const close = () => setOpen(false)
  const toggleExpanded = (slug: string) =>
    setExpandedSlug((cur) => (cur === slug ? null : slug))
  const onSignOut = () => {
    setAccountOpen(false)
    close()
    void signOutAndRevoke()
  }
  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={DRAWER_ID}
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded text-inherit hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <MenuIcon />
        </button>
      </div>

      <Drawer
        anchor="left"
        open={open}
        onClose={close}
        transitionDuration={250}
        slotProps={{
          paper: {
            id: DRAWER_ID,
            sx: { width: 'min(85vw, 22rem)' },
          },
        }}
      >
        <div className="flex h-full flex-col bg-white text-gray-900">
          <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
            <h2 id="mobile-nav-title" className="px-2 text-base font-semibold">
              Menu
            </h2>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="grid h-11 w-11 place-items-center rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="border-b border-gray-200 bg-slate-900 text-white">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  aria-expanded={accountOpen}
                  aria-controls={ACCOUNT_SECTION_ID}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-white/5 focus:outline-none focus-visible:bg-white/10"
                >
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-full bg-amber-400 text-base font-bold text-gray-900"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wider text-gray-300">
                      Welcome back
                    </span>
                    <span className="block truncate text-base font-semibold">
                      {user.name}
                    </span>
                  </span>
                  {accountOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
                <Collapse in={accountOpen} timeout="auto" unmountOnExit>
                  <ul id={ACCOUNT_SECTION_ID} className="bg-slate-800/60 pb-2">
                    {ACCOUNT_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={close}
                          className="flex min-h-11 items-center px-8 py-2.5 text-sm text-gray-100 hover:bg-white/10 focus:outline-none focus-visible:bg-white/10"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-white/10 pt-1">
                      <button
                        type="button"
                        onClick={onSignOut}
                        className="flex min-h-11 w-full items-center gap-2 px-8 py-2.5 text-left text-sm font-medium text-amber-300 hover:bg-white/10 focus:outline-none focus-visible:bg-white/10"
                      >
                        <LogoutIcon fontSize="small" />
                        Sign out
                      </button>
                    </li>
                  </ul>
                </Collapse>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3 px-4 py-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Hello, guest
                  </p>
                  <p className="mt-0.5 truncate text-sm">
                    Sign in for personalized deals.
                  </p>
                </div>
                <Link
                  href="/sign-in"
                  onClick={close}
                  aria-label="Sign in"
                  className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md bg-amber-400 px-3 text-sm font-semibold text-gray-900 hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <PersonOutlineIcon fontSize="small" />
                  Sign in
                </Link>
              </div>
            )}
          </div>

          <nav aria-label="Categories" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {CATEGORY_TREE.map((cat) => {
                const isExpanded = expandedSlug === cat.slug
                const hasChildren = !!cat.children?.length
                const subId = `subcat-${cat.slug.replace(/\//g, '-')}`
                return (
                  <li key={cat.slug} className="border-b border-gray-100">
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleExpanded(cat.slug)}
                          aria-expanded={isExpanded}
                          aria-controls={subId}
                          className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:bg-gray-50"
                        >
                          <span>{cat.label}</span>
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <ul id={subId} className="bg-gray-50">
                            {cat.children!.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  href={`/category/${sub.slug}`}
                                  onClick={close}
                                  className="flex min-h-11 items-center px-8 py-2.5 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </>
                    ) : (
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={close}
                        className="flex min-h-12 items-center px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:bg-gray-50"
                      >
                        {cat.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </Drawer>
    </>
  )
}
