import type { ReactNode } from 'react'

type EmptyStateProps = {
  emoji: string
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  emoji,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__emoji" aria-hidden="true">
        {emoji}
      </span>
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
      {action}
    </div>
  )
}
