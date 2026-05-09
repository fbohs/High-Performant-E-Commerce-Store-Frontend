import { SOCIAL_LINKS } from '@/constants/socialLinks'

export const SocialLinks: React.FC = () => (
  <ul aria-label="Follow us on social media" className="flex items-center gap-2">
    {SOCIAL_LINKS.map(({ platform, href, Icon }) => (
      <li key={platform}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`ShopHub on ${platform}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <Icon fontSize="small" />
        </a>
      </li>
    ))}
  </ul>
)
