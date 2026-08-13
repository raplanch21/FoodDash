import type { CSSProperties } from 'react'

/**
 * Exposes a restaurant's two gradient stops as CSS custom properties, so the
 * stylesheet owns the actual gradient.
 */
export function gradientStyle(gradient: [string, string]): CSSProperties {
  return {
    '--tile-from': gradient[0],
    '--tile-to': gradient[1],
  } as CSSProperties
}
