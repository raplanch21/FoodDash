import { useEffect, useState } from 'react'

/**
 * A ticking clock for time-derived UI, such as order tracking.
 * Pass `active: false` once the value stops changing to drop the interval.
 */
export function useNow(intervalMs = 1000, active = true): number {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, active])

  return now
}
