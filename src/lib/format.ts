/** Formatting helpers. Money is always handled as whole cents. */

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function money(cents: number): string {
  return usd.format(cents / 100)
}

/** "Free" reads better than "$0.00" on a delivery fee. */
export function fee(cents: number): string {
  return cents === 0 ? 'Free' : money(cents)
}

export function priceLevel(level: number): string {
  return '$'.repeat(level)
}

export function clockTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function dayAndTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Groups a card number into 4s and caps it at 16 digits, as you type. */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})(?=.)/g, '$1 ')
}

/** Turns typed digits into MM/YY without fighting the caret. */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}
