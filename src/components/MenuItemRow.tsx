import type { MenuItem, Restaurant } from '../data/restaurants'
import { money } from '../lib/format'
import { QuantityStepper } from './QuantityStepper'
import { Tile } from './Tile'

type MenuItemRowProps = {
  item: MenuItem
  restaurant: Restaurant
  /** Quantity already in the cart, used to swap Add for a stepper. */
  quantity: number
  onAdd: (item: MenuItem) => void
  onQuantityChange: (item: MenuItem, quantity: number) => void
}

export function MenuItemRow({
  item,
  restaurant,
  quantity,
  onAdd,
  onQuantityChange,
}: MenuItemRowProps) {
  return (
    <li className={`menu-item${quantity > 0 ? ' is-in-cart' : ''}`}>
      <Tile
        emoji={item.emoji}
        gradient={restaurant.gradient}
        className="menu-item__tile"
      />

      <div className="menu-item__text">
        <div className="menu-item__name">
          <strong>{item.name}</strong>
          {item.popular && <span className="badge badge--hot">Popular</span>}
          {item.vegetarian && <span className="badge badge--veg">Veg</span>}
          {item.spicy && (
            <span className="badge" title="Spicy">
              🌶️ Spicy
            </span>
          )}
        </div>
        <p className="menu-item__description">{item.description}</p>
        <p className="menu-item__price">{money(item.price)}</p>
      </div>

      <div className="menu-item__action">
        {quantity > 0 ? (
          <QuantityStepper
            quantity={quantity}
            itemName={item.name}
            onChange={(next) => onQuantityChange(item, next)}
          />
        ) : (
          <button
            type="button"
            className="button button--secondary"
            onClick={() => onAdd(item)}
          >
            Add
          </button>
        )}
      </div>
    </li>
  )
}
