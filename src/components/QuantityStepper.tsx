type QuantityStepperProps = {
  quantity: number
  itemName: string
  onChange: (quantity: number) => void
}

/** Decrementing to zero removes the line, which the parent handles. */
export function QuantityStepper({
  quantity,
  itemName,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className="stepper">
      <button
        type="button"
        className="stepper__button"
        aria-label={quantity === 1 ? `Remove ${itemName}` : `One less ${itemName}`}
        onClick={() => onChange(quantity - 1)}
      >
        {quantity === 1 ? '🗑' : '−'}
      </button>
      <span className="stepper__value" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="stepper__button"
        aria-label={`One more ${itemName}`}
        onClick={() => onChange(quantity + 1)}
      >
        +
      </button>
    </div>
  )
}
