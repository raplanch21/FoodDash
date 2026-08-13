import { useUI } from '../lib/ui'

export function Toasts() {
  const { toasts } = useUI()

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span aria-hidden="true">✓</span>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
