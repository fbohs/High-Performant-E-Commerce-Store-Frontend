import Link from 'next/link'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

export const Logo: React.FC = () => (
  <Link
    href="/"
    aria-label="ShopHub home"
    className="flex shrink-0 items-center gap-2 text-inherit no-underline"
  >
    <ShoppingBagIcon fontSize="medium" />
    <span className="text-lg font-bold tracking-tight md:text-xl">ShopHub</span>
  </Link>
)
