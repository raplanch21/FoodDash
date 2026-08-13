import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { TOAST_DURATION, UIContext } from './ui'
import type { Toast } from './ui'

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (message: string) => {
      const id = nextId.current++
      setToasts((current) => [...current, { id, message }])
      window.setTimeout(() => dismissToast(id), TOAST_DURATION)
    },
    [dismissToast],
  )

  const value = useMemo(
    () => ({ cartOpen, openCart, closeCart, toasts, notify, dismissToast }),
    [cartOpen, openCart, closeCart, toasts, notify, dismissToast],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
