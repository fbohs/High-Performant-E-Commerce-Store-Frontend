'use client'

import { useState, useMemo, useRef } from 'react'
import { ListItemText, Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { COUNTRIES } from '@/constants/countries'
import { useLocaleStore } from '@/stores/useLocaleStore'

export const CountrySelector: React.FC = () => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const countryCode = useLocaleStore((s) => s.countryCode)
  const setCountry = useLocaleStore((s) => s.setCountry)
  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode],
  )

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Country: ${country.name}. Change country.`}
        className="flex items-center gap-1 rounded px-2 py-1.5 text-sm text-inherit hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <span aria-hidden className="text-base leading-none">
          {country.flag}
        </span>
        <span className="hidden font-medium sm:inline">{country.code}</span>
        <KeyboardArrowDownIcon fontSize="small" />
      </button>
      <Menu
        anchorEl={triggerRef.current}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ list: { 'aria-label': 'Select country' } }}
      >
        {COUNTRIES.map((c) => (
          <MenuItem
            key={c.code}
            selected={c.code === countryCode}
            onClick={() => {
              setCountry(c.code)
              setOpen(false)
            }}
          >
            <span aria-hidden className="mr-3 text-lg leading-none">
              {c.flag}
            </span>
            <ListItemText
              primary={c.name}
              secondary={c.code}
              slotProps={{ secondary: { className: 'text-xs' } }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
