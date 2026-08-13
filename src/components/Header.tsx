import { NavLink } from 'react-router-dom'
import { useCart } from '../lib/store'
import { useUI } from '../lib/ui'
import { money } from '../lib/format'

export function Header() {
  const cart = useCart()
  const { openCart } = useUI()

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `header__link${isActive ? ' is-active' : ''}`

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="logo">
          <span className="logo__mark" aria-hidden="true">
            🥡
          </span>
          Takeout
        </NavLink>

        <nav className="header__nav">
          <NavLink to="/" className={navClass} end>
            Browse
          </NavLink>
          <NavLink to="/orders" className={navClass}>
            Orders
          </NavLink>
        </nav>

        <div className="header__spacer" />

        <button type="button" className="cart-button" onClick={openCart}>
          <span aria-hidden="true">🛒</span>
          <span>{cart.isEmpty ? 'Cart' : money(cart.subtotal)}</span>
          {!cart.isEmpty && (
            <span className="cart-button__count">{cart.itemCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
