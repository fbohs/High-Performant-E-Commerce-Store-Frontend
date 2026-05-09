const PAYMENT_METHODS: readonly string[] = [
  'Visa',
  'Mastercard',
  'Amex',
  'PayPal',
  'Apple Pay',
  'Google Pay',
]

export const PaymentMethods: React.FC = () => (
  <ul
    aria-label="Accepted payment methods"
    className="flex flex-wrap items-center gap-2"
  >
    {PAYMENT_METHODS.map((method) => (
      <li
        key={method}
        className="rounded border border-white/20 bg-white/5 px-2 py-1 text-xs font-medium text-gray-200"
      >
        {method}
      </li>
    ))}
  </ul>
)
