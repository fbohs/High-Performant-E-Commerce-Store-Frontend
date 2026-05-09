export interface Promotion {
  readonly id: string
  readonly icon: string
  readonly title: string
  readonly subtitle: string
}

export const PROMOTIONS: readonly Promotion[] = [
  { id: 'free-shipping', icon: '🚚', title: 'Free Shipping', subtitle: 'On orders over $50' },
  { id: 'returns', icon: '↩️', title: 'Easy Returns', subtitle: '30-day window' },
  { id: 'support', icon: '💬', title: '24/7 Support', subtitle: "We're here to help" },
  { id: 'rewards', icon: '⭐', title: 'Member Rewards', subtitle: 'Earn on every order' },
]
