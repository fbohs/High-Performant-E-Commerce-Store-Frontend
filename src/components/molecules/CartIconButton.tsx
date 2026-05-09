'use client'

import Link from 'next/link'
import { Badge } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useCartCount } from '@/stores/useCartStore'

export const CartIconButton: React.FC = () => {
  const count = useCartCount()
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      className="flex items-center gap-1 rounded p-2 text-inherit hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <Badge
        badgeContent={count}
        color="warning"
        max={99}
        overlap="circular"
        slotProps={{ badge: { className: 'font-bold' } }}
      >
        <ShoppingCartOutlinedIcon />
      </Badge>
      <span className="hidden text-sm font-medium md:inline">Cart</span>
    </Link>
  )
}
