import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import XIcon from '@mui/icons-material/X'
import YouTubeIcon from '@mui/icons-material/YouTube'
import type { SvgIconComponent } from '@mui/icons-material'

export interface SocialLink {
  readonly platform: string
  readonly href: string
  readonly Icon: SvgIconComponent
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: 'Facebook', href: 'https://facebook.com/shophub', Icon: FacebookIcon },
  { platform: 'Instagram', href: 'https://instagram.com/shophub', Icon: InstagramIcon },
  { platform: 'X', href: 'https://x.com/shophub', Icon: XIcon },
  { platform: 'YouTube', href: 'https://youtube.com/shophub', Icon: YouTubeIcon },
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/shophub', Icon: LinkedInIcon },
]
