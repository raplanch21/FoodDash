const STORAGE_KEY = '_anon_vid'

/**
 * Creates an anonymous ID that remains recognizable in Pendo.
 *
 * `crypto.randomUUID()` requires a secure context, so plain HTTP development
 * sessions fall back to a random string instead of blocking app startup.
 */
function createId(): string {
  const unique =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36)

  return `anon-${unique}`
}

/**
 * Returns a stable anonymous visitor ID for the current browser.
 *
 * If browser storage is blocked or full, this falls back to a session ID so
 * analytics initialization can't prevent the app from rendering.
 */
export function getVisitorId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored

    const id = createId()
    localStorage.setItem(STORAGE_KEY, id)
    return id
  } catch {
    return createId()
  }
}
