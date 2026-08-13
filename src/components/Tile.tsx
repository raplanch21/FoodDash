import { gradientStyle } from '../lib/gradient'

type TileProps = {
  emoji: string
  gradient: [string, string]
  className?: string
}

/**
 * Stands in for food photography: a gradient square with a big emoji.
 * Keeps the demo self-contained with no image requests.
 */
export function Tile({ emoji, gradient, className = '' }: TileProps) {
  return (
    <div
      className={`tile ${className}`}
      style={gradientStyle(gradient)}
      aria-hidden="true"
    >
      {emoji}
    </div>
  )
}
