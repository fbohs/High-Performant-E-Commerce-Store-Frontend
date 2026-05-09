'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import { CATEGORIES } from '@/constants/categories'

export const SearchBar: React.FC = () => {
  const router = useRouter()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [query, setQuery] = useState('')
  const [categorySlug, setCategorySlug] = useState(CATEGORIES[0].slug)
  const [open, setOpen] = useState(false)
  const category =
    CATEGORIES.find((c) => c.slug === categorySlug) ?? CATEGORIES[0]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    const trimmed = query.trim()
    if (trimmed) params.set('q', trimmed)
    if (categorySlug !== 'all') params.set('category', categorySlug)
    const qs = params.toString()
    router.push(qs ? `/search?${qs}` : '/search')
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="flex w-full items-stretch overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-amber-400"
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Category: ${category.label}. Change category.`}
        className="flex shrink-0 items-center gap-1 border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100"
      >
        <span className="max-w-[6rem] truncate sm:max-w-[10rem]">
          {category.label}
        </span>
        <KeyboardArrowDownIcon fontSize="small" />
      </button>
      <Menu
        anchorEl={triggerRef.current}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ list: { 'aria-label': 'Select search category' } }}
      >
        {CATEGORIES.map((c) => (
          <MenuItem
            key={c.slug}
            selected={c.slug === categorySlug}
            onClick={() => {
              setCategorySlug(c.slug)
              setOpen(false)
            }}
          >
            {c.label}
          </MenuItem>
        ))}
      </Menu>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ShopHub"
        aria-label="Search products"
        className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="flex shrink-0 items-center justify-center bg-amber-400 px-3 text-gray-900 hover:bg-amber-500 focus:outline-none focus-visible:bg-amber-500 sm:px-4"
      >
        <SearchIcon fontSize="small" />
      </button>
    </form>
  )
}
