import { Logo } from '@/components/atoms/Logo'
import { CartIconButton } from '@/components/Navbar/CartIconButton'
import { CountrySelector } from '@/components/Navbar/CountrySelector'
import { SearchBar } from '@/components/Navbar/SearchBar'

export const Navbar: React.FC = () => (
  <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-sm">
    <nav
      aria-label="Primary"
      className="mx-auto max-w-7xl px-3 py-2 md:px-6 md:py-3"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:flex-nowrap md:gap-4">
        <Logo />

        <div className="order-1 ml-auto flex shrink-0 items-center gap-1 md:order-3 md:ml-0 md:gap-2">
          <CountrySelector />
          <CartIconButton />
        </div>

        <div className="order-2 w-full md:flex-1">
          <SearchBar />
        </div>
      </div>
    </nav>
  </header>
)
