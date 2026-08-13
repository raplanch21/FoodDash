/**
 * Ephemeral UI state that several unrelated screens need to reach: the cart
 * drawer's visibility and the toast queue. Deliberately not persisted.
 *
 * The provider component lives in UIProvider.tsx.
 */

import { createContext, useContext } from 'react'

export type Toast = {
  id: number
  message: string
}

export type UIContextValue = {
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toasts: Toast[]
  notify: (message: string) => void
  dismissToast: (id: number) => void
}

export const TOAST_DURATION = 2600

export const UIContext = createContext<UIContextValue | null>(null)

export function useUI(): UIContextValue {
  const value = useContext(UIContext)
  if (!value) throw new Error('useUI must be used inside UIProvider')
  return value
}
