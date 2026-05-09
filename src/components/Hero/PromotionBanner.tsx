import { PROMOTIONS } from '@/constants/promotions'

export const PromotionBanner: React.FC = () => (
  <ul
    aria-label="Store benefits"
    className="grid grid-cols-2 gap-3 md:grid-cols-4"
  >
    {PROMOTIONS.map((p) => (
      <li
        key={p.id}
        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
      >
        <span aria-hidden className="text-2xl">
          {p.icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {p.title}
          </p>
          <p className="truncate text-xs text-gray-500">{p.subtitle}</p>
        </div>
      </li>
    ))}
  </ul>
)
