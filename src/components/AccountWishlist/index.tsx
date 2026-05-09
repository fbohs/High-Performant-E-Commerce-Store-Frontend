'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const AccountWishlist: React.FC = () => (
  <section className="flex flex-col gap-4">
    <header>
      <h1 className="text-2xl font-semibold text-gray-900">Your wishlist</h1>
      <p className="text-sm text-gray-600">Items you saved for later.</p>
    </header>

    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
      <FavoriteBorderIcon className="text-gray-400" fontSize="large" />
      <p className="text-base font-medium text-gray-900">Your wishlist is empty</p>
      <p className="max-w-sm text-sm text-gray-600">
        When you save items for later, they&apos;ll show up here.
      </p>
    </div>
  </section>
)
