'use client'

import { useState } from 'react'
import Link from 'next/link'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined'
import { Divider, Menu, MenuItem } from '@mui/material'
import { ACCOUNT_LINKS } from '@/constants/accountLinks'
import { signOutAndRevoke } from '@/services/auth'
import { useAuthStore } from '@/stores/useAuthStore'

export const NavAuth: React.FC = () => {
  const user = useAuthStore((s) => s.user)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const closeMenu = () => setAnchorEl(null)
  const onSignOut = () => {
    closeMenu()
    void signOutAndRevoke()
  }

  if (user) {
    const firstName = user.name.split(' ')[0]
    return (
      <div className="hidden items-center md:flex">
        <button
          id="account-menu-button"
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? 'account-menu' : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          className="inline-flex min-h-9 items-center gap-2 rounded-md px-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-amber-400 text-sm font-bold text-gray-900"
          >
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[10px] uppercase tracking-wider text-gray-300">
              Welcome
            </span>
            <span className="text-sm font-semibold">{firstName}</span>
          </span>
          <KeyboardArrowDownIcon
            fontSize="small"
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: { sx: { mt: 1, minWidth: 220 } },
            list: { 'aria-labelledby': 'account-menu-button' },
          }}
        >
          {ACCOUNT_LINKS.map((link) => (
            <MenuItem
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={onSignOut}>Sign out</MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <div className="hidden items-center gap-1 md:flex">
      <Link
        href="/sign-in"
        aria-label="Sign in"
        className="inline-flex min-h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <PersonOutlineIcon fontSize="small" />
        <span>Sign in</span>
      </Link>
      {/* <Link
        href="/sign-up"
        className="inline-flex min-h-9 items-center rounded-md bg-amber-400 px-3 text-sm font-semibold text-gray-900 hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        Sign up
      </Link> */}
    </div>
  )
}
